import {
  createConnection,
  TextDocuments,
  ProposedFeatures,
  InitializeResult,
  TextDocumentSyncKind,
  DiagnosticSeverity,
  CompletionItemKind,
  InsertTextFormat,
  MarkupKind,
} from "vscode-languageserver/node";
import { TextDocument } from "vscode-languageserver-textdocument";
import { getKittyContext, isKittyConfig, parseConfigKeys } from "./parser";
import {
  allKnownKeys,
  findOption,
  findDirective,
  kittyOptions,
  kittyDirectives,
  kittyActions,
} from "./options";

import type {
  Diagnostic,
  CompletionItem,
  Hover,
  TextDocumentPositionParams,
  CompletionParams,
} from "vscode-languageserver/node";

const hasTransportArg = process.argv.some(arg =>
  arg === '--stdio' || arg === '--node-ipc' || arg.startsWith('--socket') || arg.startsWith('--pipe')
);
if (!hasTransportArg) {
  process.argv.push('--stdio');
}
const connection = createConnection(ProposedFeatures.all);
const documents = new TextDocuments(TextDocument);

connection.onInitialize((): InitializeResult => {
  return {
    capabilities: {
      textDocumentSync: TextDocumentSyncKind.Incremental,
      completionProvider: {
        triggerCharacters: [" ", "#"],
      },
      hoverProvider: true,
    },
  };
});

// ── Diagnostics ──────────────────────────────────────────────────

function validate(document: TextDocument): void {
  if (!isKittyConfig(document.uri, document.languageId)) {
    return;
  }

  const text = document.getText();
  const lines = text.split("\n");
  const pairs = parseConfigKeys(lines);
  const diagnostics: Diagnostic[] = [];

  for (const pair of pairs) {
    if (!allKnownKeys.has(pair.key)) {
      addUnknownKeyDiagnostic(lines, pair, diagnostics);
      continue;
    }

    const opt = findOption(pair.key);
    if (opt && pair.value) {
      validateValue(lines, pair, opt, diagnostics);
    }
  }

  connection.sendDiagnostics({ uri: document.uri, diagnostics });
}

function addUnknownKeyDiagnostic(
  lines: string[],
  pair: { key: string; value: string; line: number },
  diagnostics: Diagnostic[],
): void {
  const lineText = lines[pair.line];
  const keyStart = lineText.length - lineText.trimStart().length;

  diagnostics.push({
    severity: DiagnosticSeverity.Warning,
    range: {
      start: { line: pair.line, character: keyStart },
      end: { line: pair.line, character: keyStart + pair.key.length },
    },
    message: `Unknown kitty config option: "${pair.key}"`,
    source: "kitty-lsp",
  });
}

function validateValue(
  lines: string[],
  pair: { key: string; value: string; line: number },
  opt: { name: string; type: string; values?: string[] },
  diagnostics: Diagnostic[],
): void {
  const value = pair.value.trim();
  if (value === "" || value === "none") return;

  const lineText = lines[pair.line];
  const keyStart = lineText.length - lineText.trimStart().length;
  const valueStart = lineText.indexOf(value, keyStart + pair.key.length);
  if (valueStart < 0) return;

  const range = {
    start: { line: pair.line, character: valueStart },
    end: { line: pair.line, character: valueStart + value.length },
  };

  switch (opt.type) {
    case "boolean":
      if (value !== "yes" && value !== "no") {
        diagnostics.push({
          severity: DiagnosticSeverity.Error,
          range,
          message: `Invalid boolean value for "${opt.name}": expected "yes" or "no", got "${value}"`,
          source: "kitty-lsp",
        });
      }
      break;

    case "number":
      if (!/^-?\d+(\.\d+)?$/.test(value)) {
        diagnostics.push({
          severity: DiagnosticSeverity.Error,
          range,
          message: `Invalid number value for "${opt.name}": "${value}"`,
          source: "kitty-lsp",
        });
      }
      break;

    case "enum":
      if (opt.values && !opt.values.includes(value)) {
        diagnostics.push({
          severity: DiagnosticSeverity.Error,
          range,
          message: `Invalid value for "${opt.name}": "${value}". Allowed values: ${opt.values.join(", ")}`,
          source: "kitty-lsp",
        });
      }
      break;

    case "color":
      if (
        !/^#[0-9a-fA-F]{6}([0-9a-fA-F]{2})?$/.test(value) &&
        !/^[a-zA-Z][a-zA-Z0-9_-]*$/.test(value)
      ) {
        diagnostics.push({
          severity: DiagnosticSeverity.Warning,
          range,
          message: `Invalid color value for "${opt.name}": "${value}". Expected #rrggbb, #rrggbbaa, named color, or "none"`,
          source: "kitty-lsp",
        });
      }
      break;
  }
}

documents.onDidChangeContent((change) => {
  validate(change.document);
});

// ── Hover ────────────────────────────────────────────────────────

const DOC_URL = "https://sw.kovidgoyal.net/kitty/conf/";

connection.onHover((params: TextDocumentPositionParams): Hover | null => {
  const document = documents.get(params.textDocument.uri);
  if (!document) return null;
  if (!isKittyConfig(document.uri, document.languageId)) return null;

  const lineText = document.getText({
    start: { line: params.position.line, character: 0 },
    end: { line: params.position.line + 1, character: 0 },
  }).replace(/\n$/, "");

  const trimmed = lineText.trim();
  if (trimmed === "" || trimmed.startsWith("#")) return null;

  const ctx = getKittyContext(lineText, params.position.character);
  if (ctx.inValue || !ctx.currentKey) return null;

  const leadingSpaces = lineText.length - lineText.trimStart().length;
  const keyStart = leadingSpaces;
  const keyEnd = keyStart + ctx.currentKey.length;

  if (params.position.character < keyStart || params.position.character >= keyEnd) {
    return null;
  }

  const opt = findOption(ctx.currentKey);
  if (opt) {
    let md = `**\`${opt.name}\`** : \`${opt.type}\`\n\n`;
    md += `${opt.description}\n\n`;
    md += `**Category:** ${opt.category}\n\n`;
    md += `**Default:** \`${opt.default || "unset"}\`\n\n`;
    if (opt.values && opt.values.length > 0) {
      md += `**Allowed values:** ${opt.values.map((v) => `\`${v}\``).join(", ")}\n\n`;
    }
    md += `[Kitty Documentation](${DOC_URL})`;
    return {
      contents: { kind: MarkupKind.Markdown, value: md },
    };
  }

  const dir = findDirective(ctx.currentKey);
  if (dir) {
    let md = `**\`${dir.name}\`** (directive)\n\n`;
    md += `${dir.description}\n\n`;
    md += `[Kitty Documentation](${DOC_URL})`;
    return {
      contents: { kind: MarkupKind.Markdown, value: md },
    };
  }

  return null;
});

// ── Completions ──────────────────────────────────────────────────

connection.onCompletion((params: CompletionParams): CompletionItem[] => {
  const document = documents.get(params.textDocument.uri);
  if (!document) return [];
  if (!isKittyConfig(document.uri, document.languageId)) return [];

  const lineText = document.getText({
    start: { line: params.position.line, character: 0 },
    end: { line: params.position.line + 1, character: 0 },
  }).replace(/\n$/, "");

  const trimmed = lineText.trim();
  if (trimmed.startsWith("#")) return [];

  const ctx = getKittyContext(lineText, params.position.character);

  if (ctx.isMapLine && ctx.inValue) {
    return completeMapActions();
  }

  if (ctx.inValue) {
    return completeValue(ctx);
  }

  return completeKey();
});

function completeKey(): CompletionItem[] {
  const items: CompletionItem[] = [];

  for (const opt of kittyOptions) {
    const item: CompletionItem = {
      label: opt.name,
      kind: CompletionItemKind.Property,
      detail: `${opt.type} (default: ${opt.default || "unset"}) [${opt.category}]`,
      documentation: {
        kind: MarkupKind.Markdown,
        value: `${opt.description}\n\n[Documentation](${DOC_URL})`,
      },
      insertText: keyValueSnippet(opt),
      insertTextFormat: InsertTextFormat.Snippet,
      sortText: opt.name.match(/^color\d+$/)
        ? `zzz_${opt.name.padStart(10, "0")}`
        : opt.name,
    };
    items.push(item);
  }

  for (const dir of kittyDirectives) {
    const item: CompletionItem = {
      label: dir.name,
      kind: CompletionItemKind.Keyword,
      detail: `Directive [${dir.category}]`,
      documentation: {
        kind: MarkupKind.Markdown,
        value: `${dir.description}\n\n[Documentation](${DOC_URL})`,
      },
      insertText: directiveSnippet(dir.name),
      insertTextFormat: InsertTextFormat.Snippet,
    };
    items.push(item);
  }

  return items;
}

function completeValue(ctx: {
  currentKey: string;
  currentValue: string;
}): CompletionItem[] {
  const items: CompletionItem[] = [];
  const opt = findOption(ctx.currentKey);
  if (!opt) return items;

  switch (opt.type) {
    case "boolean":
      items.push(valueItem("yes", "Boolean value"));
      items.push(valueItem("no", "Boolean value"));
      break;

    case "enum":
      if (opt.values) {
        for (const val of opt.values) {
          const item = valueItem(
            val,
            val === opt.default ? `Option for ${opt.name} (default)` : `Option for ${opt.name}`,
          );
          items.push(item);
        }
      }
      break;

    case "color":
      items.push(valueItem("none", "No color / transparent"));
      for (const [hex, label] of COMMON_COLORS) {
        items.push({
          label: hex,
          kind: CompletionItemKind.Color,
          detail: label,
        });
      }
      items.push({
        label: "#hex",
        kind: CompletionItemKind.Color,
        detail: "Custom hex color",
        insertText: "#${1:000000}",
        insertTextFormat: InsertTextFormat.Snippet,
      });
      break;

    case "font":
      for (const [name, desc] of COMMON_FONTS) {
        items.push(valueItem(name, desc));
      }
      break;
  }

  return items;
}

function completeMapActions(): CompletionItem[] {
  return kittyActions.map((action) => ({
    label: action,
    kind: CompletionItemKind.Function,
    detail: "Kitty action",
  }));
}

function valueItem(value: string, detail: string): CompletionItem {
  return {
    label: value,
    kind: CompletionItemKind.Value,
    detail,
  };
}

function keyValueSnippet(opt: {
  name: string;
  type: string;
  default: string;
  values?: string[];
}): string {
  switch (opt.type) {
    case "boolean":
      return `${opt.name} \${1|yes,no|}`;
    case "enum":
      if (opt.values && opt.values.length > 0) {
        return `${opt.name} \${1|${opt.values.join(",")}|}`;
      }
      return `${opt.name} \${1:${opt.default}}`;
    case "color":
      return `${opt.name} \${1:${opt.default || "#000000"}}`;
    default:
      return `${opt.name} \${1:${opt.default}}`;
  }
}

function directiveSnippet(name: string): string {
  switch (name) {
    case "map":
      return "map ${1:ctrl+shift+c} ${2:copy_to_clipboard}";
    case "mouse_map":
      return "mouse_map ${1:left} ${2:click} ${3:ungrabbed} ${4:mouse_handle_click} ${5:selection link prompt}";
    case "include":
      return "include ${1:file.conf}";
    case "globinclude":
      return "globinclude ${1:*.conf}";
    case "env":
      return "env ${1:KEY}=${2:VALUE}";
    default:
      return `${name} \${1}`;
  }
}

const COMMON_COLORS: Array<[string, string]> = [
  ["#000000", "Black"],
  ["#ffffff", "White"],
  ["#ff0000", "Red"],
  ["#00ff00", "Green"],
  ["#0000ff", "Blue"],
  ["#ffff00", "Yellow"],
  ["#ff00ff", "Magenta"],
  ["#00ffff", "Cyan"],
  ["#282828", "Gruvbox dark bg"],
  ["#ebdbb2", "Gruvbox light fg"],
  ["#1e1e2e", "Catppuccin Mocha bg"],
  ["#cdd6f4", "Catppuccin Mocha fg"],
  ["#282a36", "Dracula bg"],
  ["#f8f8f2", "Dracula fg"],
  ["#002b36", "Solarized Dark bg"],
  ["#839496", "Solarized Dark fg"],
];

const COMMON_FONTS: Array<[string, string]> = [
  ["auto", "Auto-detect font"],
  ["monospace", "Generic monospace font"],
  ["FiraCode Nerd Font", "Popular programming font"],
  ["JetBrains Mono", "JetBrains programming font"],
  ["Cascadia Code", "Microsoft programming font"],
  ["Hack", "Source code font"],
  ["Iosevka", "Versatile monospace font"],
  ["Source Code Pro", "Adobe Source Code Pro"],
  ["Inconsolata", "Monospace font by Raph Levien"],
  ["Ubuntu Mono", "Ubuntu monospace font"],
  ["Droid Sans Mono", "Droid Sans Mono"],
  ["DejaVu Sans Mono", "DejaVu Sans Mono"],
];

// ── Start ────────────────────────────────────────────────────────

documents.listen(connection);
connection.listen();
