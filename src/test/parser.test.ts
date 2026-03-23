import * as assert from "assert";
import { getKittyContext, isKittyConfig, parseConfigKeys } from "../parser";

describe("parseConfigKeys", () => {
  it("parses standard key-value pairs", () => {
    const lines = [
      "font_size 12.0",
      "cursor_shape block",
    ];
    const pairs = parseConfigKeys(lines);
    assert.strictEqual(pairs.length, 2);
    assert.strictEqual(pairs[0].key, "font_size");
    assert.strictEqual(pairs[0].value, "12.0");
    assert.strictEqual(pairs[1].key, "cursor_shape");
    assert.strictEqual(pairs[1].value, "block");
  });

  it("skips comments and empty lines", () => {
    const lines = [
      "# this is a comment",
      "",
      "font_size 12.0",
      "   # indented comment",
      "",
    ];
    const pairs = parseConfigKeys(lines);
    assert.strictEqual(pairs.length, 1);
    assert.strictEqual(pairs[0].key, "font_size");
  });

  it("handles key without value", () => {
    const lines = ["some_key"];
    const pairs = parseConfigKeys(lines);
    assert.strictEqual(pairs.length, 1);
    assert.strictEqual(pairs[0].key, "some_key");
    assert.strictEqual(pairs[0].value, "");
  });

  it("handles indented lines", () => {
    const lines = ["  font_size 12.0"];
    const pairs = parseConfigKeys(lines);
    assert.strictEqual(pairs.length, 1);
    assert.strictEqual(pairs[0].key, "font_size");
    assert.strictEqual(pairs[0].value, "12.0");
  });

  it("handles tab-separated key-value pairs", () => {
    const lines = ["font_size\t12.0"];
    const pairs = parseConfigKeys(lines);
    assert.strictEqual(pairs.length, 1);
    assert.strictEqual(pairs[0].key, "font_size");
    assert.strictEqual(pairs[0].value, "12.0");
  });

  it("handles values with multiple spaces", () => {
    const lines = ["scrollback_pager less --chop-long-lines --RAW-CONTROL-CHARS"];
    const pairs = parseConfigKeys(lines);
    assert.strictEqual(pairs.length, 1);
    assert.strictEqual(pairs[0].key, "scrollback_pager");
    assert.strictEqual(pairs[0].value, "less --chop-long-lines --RAW-CONTROL-CHARS");
  });

  it("preserves line numbers", () => {
    const lines = [
      "# comment",
      "",
      "font_size 12.0",
      "cursor_shape block",
    ];
    const pairs = parseConfigKeys(lines);
    assert.strictEqual(pairs[0].line, 2);
    assert.strictEqual(pairs[1].line, 3);
  });

  it("parses a full config file", () => {
    const fs = require("fs");
    const path = require("path");
    const content = fs.readFileSync(
      path.resolve(__dirname, "../../test-fixtures/kitty.conf"),
      "utf-8",
    );
    const lines = content.split("\n");
    const pairs = parseConfigKeys(lines);
    assert.ok(pairs.length > 40, `Expected 40+ pairs, got ${pairs.length}`);
    assert.ok(pairs.some((p) => p.key === "font_family"));
    assert.ok(pairs.some((p) => p.key === "map"));
    assert.ok(pairs.some((p) => p.key === "include"));
    assert.ok(pairs.some((p) => p.key === "env"));
  });
});

describe("getKittyContext", () => {
  it("returns empty context for comments", () => {
    const ctx = getKittyContext("# comment", 3);
    assert.strictEqual(ctx.currentKey, "");
    assert.strictEqual(ctx.inValue, false);
  });

  it("returns empty context for blank lines", () => {
    const ctx = getKittyContext("", 0);
    assert.strictEqual(ctx.currentKey, "");
  });

  it("identifies key when cursor is on key", () => {
    const ctx = getKittyContext("font_size 12.0", 3);
    assert.strictEqual(ctx.currentKey, "font_size");
    assert.strictEqual(ctx.inValue, false);
  });

  it("identifies value when cursor is past the key", () => {
    const ctx = getKittyContext("font_size 12.0", 11);
    assert.strictEqual(ctx.currentKey, "font_size");
    assert.strictEqual(ctx.currentValue, "12.0");
    assert.strictEqual(ctx.inValue, true);
  });

  it("detects map lines", () => {
    const ctx = getKittyContext("map ctrl+shift+c copy_to_clipboard", 20);
    assert.strictEqual(ctx.isMapLine, true);
    assert.strictEqual(ctx.currentKey, "map");
  });

  it("detects mouse_map lines", () => {
    const ctx = getKittyContext("mouse_map left click ungrabbed mouse_handle_click", 15);
    assert.strictEqual(ctx.isMapLine, true);
  });

  it("detects include directives", () => {
    const ctx = getKittyContext("include theme.conf", 12);
    assert.strictEqual(ctx.isInclude, true);
  });

  it("detects globinclude directives", () => {
    const ctx = getKittyContext("globinclude *.conf", 14);
    assert.strictEqual(ctx.isInclude, true);
  });

  it("handles key-only line", () => {
    const ctx = getKittyContext("font_size", 5);
    assert.strictEqual(ctx.currentKey, "font_size");
    assert.strictEqual(ctx.currentValue, "");
    assert.strictEqual(ctx.inValue, false);
  });

  it("handles indented lines correctly", () => {
    const ctx = getKittyContext("  font_size 12.0", 5);
    assert.strictEqual(ctx.currentKey, "font_size");
    assert.strictEqual(ctx.inValue, false);
  });

  it("cursor at space between key and value is not inValue", () => {
    // "font_size 12.0" - space is at index 9
    const ctx = getKittyContext("font_size 12.0", 9);
    assert.strictEqual(ctx.inValue, false);
  });

  it("cursor right after space is inValue", () => {
    const ctx = getKittyContext("font_size 12.0", 10);
    assert.strictEqual(ctx.inValue, true);
  });
});

describe("isKittyConfig", () => {
  it("matches kitty.conf", () => {
    assert.strictEqual(isKittyConfig("/home/user/.config/kitty/kitty.conf"), true);
  });

  it("matches .conf files in kitty directory", () => {
    assert.strictEqual(isKittyConfig("/home/user/.config/kitty/theme.conf"), true);
  });

  it("matches by languageId", () => {
    assert.strictEqual(isKittyConfig("/some/file.txt", "kitty"), true);
  });

  it("rejects unrelated .conf files", () => {
    assert.strictEqual(isKittyConfig("/home/user/.config/other/app.conf"), false);
  });

  it("rejects non-conf files", () => {
    assert.strictEqual(isKittyConfig("/home/user/file.txt"), false);
  });
});
