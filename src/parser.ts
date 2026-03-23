export interface KittyContext {
  currentKey: string;
  currentValue: string;
  inValue: boolean;
  isMapLine: boolean;
  isInclude: boolean;
}

export interface ConfigPair {
  key: string;
  value: string;
  line: number;
}

export function getKittyContext(
  lineText: string,
  character: number,
): KittyContext {
  const trimmed = lineText.trim();

  const ctx: KittyContext = {
    currentKey: "",
    currentValue: "",
    inValue: false,
    isMapLine: false,
    isInclude: false,
  };

  if (trimmed === "" || trimmed.startsWith("#")) {
    return ctx;
  }

  const spaceIndex = trimmed.search(/[ \t]/);
  if (spaceIndex === -1) {
    ctx.currentKey = trimmed;
    return ctx;
  }

  ctx.currentKey = trimmed.substring(0, spaceIndex);
  ctx.currentValue = trimmed.substring(spaceIndex + 1);

  const leadingSpaces = lineText.length - lineText.trimStart().length;
  const keyEndPos = leadingSpaces + spaceIndex;
  ctx.inValue = character > keyEndPos;

  ctx.isMapLine = ctx.currentKey === "map" || ctx.currentKey === "mouse_map";
  ctx.isInclude =
    ctx.currentKey === "include" || ctx.currentKey === "globinclude";

  return ctx;
}

export function isKittyConfig(uri: string, languageId?: string): boolean {
  if (uri.endsWith("kitty.conf")) {
    return true;
  }
  if (
    uri.endsWith(".conf") &&
    (uri.includes("/kitty/") || uri.includes("\\kitty\\"))
  ) {
    return true;
  }
  if (languageId === "kitty") {
    return true;
  }
  return false;
}

export function parseConfigKeys(lines: string[]): ConfigPair[] {
  const pairs: ConfigPair[] = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    if (line === "" || line.startsWith("#")) continue;

    const spaceIndex = line.search(/[ \t]/);
    if (spaceIndex === -1) {
      pairs.push({ key: line, value: "", line: i });
      continue;
    }

    const key = line.substring(0, spaceIndex);
    const value = line.substring(spaceIndex + 1).trim();
    pairs.push({ key, value, line: i });
  }

  return pairs;
}
