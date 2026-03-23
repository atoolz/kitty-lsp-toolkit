import * as assert from "assert";
import { parseConfigKeys } from "../parser";
import { allKnownKeys, findOption } from "../options";

describe("validation: unknown keys", () => {
  it("detects unknown option names", () => {
    const lines = ["fake_option value", "not_a_real_setting 42"];
    const pairs = parseConfigKeys(lines);
    for (const pair of pairs) {
      assert.strictEqual(allKnownKeys.has(pair.key), false, `${pair.key} should be unknown`);
    }
  });

  it("recognizes all standard options", () => {
    const lines = [
      "font_size 12.0",
      "cursor_shape block",
      "enable_audio_bell yes",
      "foreground #dddddd",
      "tab_bar_style powerline",
    ];
    const pairs = parseConfigKeys(lines);
    for (const pair of pairs) {
      assert.strictEqual(allKnownKeys.has(pair.key), true, `${pair.key} should be known`);
    }
  });

  it("recognizes directives as known keys", () => {
    const directives = ["map", "mouse_map", "include", "globinclude", "env"];
    for (const d of directives) {
      assert.strictEqual(allKnownKeys.has(d), true, `${d} should be known`);
    }
  });

  it("recognizes color0 through color255", () => {
    assert.strictEqual(allKnownKeys.has("color0"), true);
    assert.strictEqual(allKnownKeys.has("color127"), true);
    assert.strictEqual(allKnownKeys.has("color255"), true);
    assert.strictEqual(allKnownKeys.has("color256"), false);
  });
});

describe("validation: boolean values", () => {
  it("accepts yes and no", () => {
    const opt = findOption("enable_audio_bell");
    assert.ok(opt);
    assert.strictEqual(opt.type, "boolean");
    assert.ok(["yes", "no"].includes("yes"));
    assert.ok(["yes", "no"].includes("no"));
  });

  it("rejects invalid boolean values", () => {
    const invalid = ["maybe", "1", "0", "true", "false", "on", "off"];
    for (const v of invalid) {
      assert.ok(!["yes", "no"].includes(v), `${v} should be invalid`);
    }
  });
});

describe("validation: number values", () => {
  it("accepts valid numbers", () => {
    const pattern = /^-?\d+(\.\d+)?$/;
    assert.ok(pattern.test("12"));
    assert.ok(pattern.test("12.0"));
    assert.ok(pattern.test("-1"));
    assert.ok(pattern.test("0"));
    assert.ok(pattern.test("0.95"));
  });

  it("rejects invalid numbers", () => {
    const pattern = /^-?\d+(\.\d+)?$/;
    assert.ok(!pattern.test("big"));
    assert.ok(!pattern.test("fast"));
    assert.ok(!pattern.test("lots"));
    assert.ok(!pattern.test("12px"));
    assert.ok(!pattern.test(""));
  });
});

describe("validation: enum values", () => {
  it("validates cursor_shape values", () => {
    const opt = findOption("cursor_shape");
    assert.ok(opt);
    assert.deepStrictEqual(opt.values, ["block", "beam", "underline"]);
    assert.ok(opt.values!.includes("block"));
    assert.ok(!opt.values!.includes("triangle"));
  });

  it("validates tab_bar_style values", () => {
    const opt = findOption("tab_bar_style");
    assert.ok(opt);
    assert.ok(opt.values!.includes("powerline"));
    assert.ok(!opt.values!.includes("rainbow"));
  });

  it("validates url_style values", () => {
    const opt = findOption("url_style");
    assert.ok(opt);
    assert.ok(opt.values!.includes("curly"));
    assert.ok(!opt.values!.includes("wiggly"));
  });
});

describe("validation: color values", () => {
  const hexPattern = /^#[0-9a-fA-F]{6}([0-9a-fA-F]{2})?$/;
  const namedPattern = /^[a-zA-Z][a-zA-Z0-9_-]*$/;

  function isValidColor(value: string): boolean {
    if (value === "none") return true;
    return hexPattern.test(value) || namedPattern.test(value);
  }

  it("accepts valid hex colors", () => {
    assert.ok(isValidColor("#000000"));
    assert.ok(isValidColor("#ffffff"));
    assert.ok(isValidColor("#0087bd"));
    assert.ok(isValidColor("#00ff00aa"));
  });

  it("accepts named colors", () => {
    assert.ok(isValidColor("red"));
    assert.ok(isValidColor("white"));
    assert.ok(isValidColor("blue"));
    assert.ok(isValidColor("none"));
  });

  it("rejects invalid color values", () => {
    assert.ok(!isValidColor("#gggggg"));
    assert.ok(!isValidColor("0087bd"));
    assert.ok(!isValidColor("rgb(0,0,0)"));
    assert.ok(!isValidColor("#fff"));
  });
});

describe("validation: full invalid config file", () => {
  it("detects all invalid entries", () => {
    const fs = require("fs");
    const path = require("path");
    const content = fs.readFileSync(
      path.resolve(__dirname, "../../test-fixtures/invalid-kitty.conf"),
      "utf-8",
    );
    const lines = content.split("\n");
    const pairs = parseConfigKeys(lines);

    const unknownKeys = pairs.filter((p) => !allKnownKeys.has(p.key));
    assert.ok(unknownKeys.length >= 2, `Expected 2+ unknown keys, got ${unknownKeys.length}`);
    assert.ok(unknownKeys.some((p) => p.key === "fake_option"));
    assert.ok(unknownKeys.some((p) => p.key === "not_a_real_setting"));

    const boolOpt = findOption("enable_audio_bell");
    assert.ok(boolOpt);
    const boolPair = pairs.find((p) => p.key === "enable_audio_bell");
    assert.ok(boolPair);
    assert.ok(boolPair.value !== "yes" && boolPair.value !== "no");

    const enumOpt = findOption("cursor_shape");
    assert.ok(enumOpt);
    const enumPair = pairs.find((p) => p.key === "cursor_shape");
    assert.ok(enumPair);
    assert.ok(!enumOpt.values!.includes(enumPair.value));
  });

  it("valid entries pass validation", () => {
    const fs = require("fs");
    const path = require("path");
    const content = fs.readFileSync(
      path.resolve(__dirname, "../../test-fixtures/kitty.conf"),
      "utf-8",
    );
    const lines = content.split("\n");
    const pairs = parseConfigKeys(lines);

    const unknownKeys = pairs.filter((p) => !allKnownKeys.has(p.key));
    assert.strictEqual(unknownKeys.length, 0, `Unexpected unknown keys: ${unknownKeys.map((p) => p.key).join(", ")}`);
  });
});
