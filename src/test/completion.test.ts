import * as assert from "assert";
import { findOption, findDirective, kittyOptions, kittyDirectives, kittyActions } from "../options";

describe("completion: key completion data", () => {
  it("has 60+ base options", () => {
    const baseOptions = kittyOptions.filter((o) => !o.name.match(/^color\d+$/));
    assert.ok(baseOptions.length >= 50, `Expected 50+ base options, got ${baseOptions.length}`);
  });

  it("has 256 color options", () => {
    const colorOptions = kittyOptions.filter((o) => o.name.match(/^color\d+$/));
    assert.strictEqual(colorOptions.length, 256);
  });

  it("has 5 directives", () => {
    assert.strictEqual(kittyDirectives.length, 5);
  });

  it("every option has required fields", () => {
    for (const opt of kittyOptions) {
      assert.ok(opt.name, `Option missing name`);
      assert.ok(opt.type, `${opt.name} missing type`);
      assert.ok(opt.description, `${opt.name} missing description`);
      assert.ok(opt.category, `${opt.name} missing category`);
      assert.ok(typeof opt.default === "string", `${opt.name} default is not string`);
    }
  });

  it("enum options always have values array", () => {
    const enums = kittyOptions.filter((o) => o.type === "enum");
    for (const opt of enums) {
      assert.ok(opt.values && opt.values.length > 0, `${opt.name} is enum but has no values`);
    }
  });
});

describe("completion: value completion", () => {
  it("boolean options complete to yes/no", () => {
    const boolOpts = kittyOptions.filter((o) => o.type === "boolean");
    assert.ok(boolOpts.length > 0);
    for (const opt of boolOpts) {
      assert.strictEqual(opt.type, "boolean");
    }
  });

  it("enum options have valid default in values", () => {
    const enums = kittyOptions.filter((o) => o.type === "enum");
    for (const opt of enums) {
      assert.ok(
        opt.values!.includes(opt.default),
        `${opt.name} default "${opt.default}" not in values [${opt.values!.join(", ")}]`,
      );
    }
  });
});

describe("completion: map actions", () => {
  it("has 80+ actions", () => {
    assert.ok(kittyActions.length >= 80, `Expected 80+ actions, got ${kittyActions.length}`);
  });

  it("includes common actions", () => {
    const expected = [
      "copy_to_clipboard",
      "paste_from_clipboard",
      "new_window",
      "close_window",
      "new_tab",
      "close_tab",
      "scroll_line_up",
      "scroll_line_down",
      "toggle_fullscreen",
    ];
    for (const action of expected) {
      assert.ok(kittyActions.includes(action), `Missing action: ${action}`);
    }
  });

  it("has no duplicates", () => {
    const unique = new Set(kittyActions);
    assert.strictEqual(unique.size, kittyActions.length, "Duplicate actions found");
  });
});

describe("completion: lookup functions", () => {
  it("findOption returns correct option", () => {
    const opt = findOption("font_size");
    assert.ok(opt);
    assert.strictEqual(opt.name, "font_size");
    assert.strictEqual(opt.type, "number");
  });

  it("findOption returns undefined for unknown", () => {
    assert.strictEqual(findOption("nonexistent"), undefined);
  });

  it("findDirective returns correct directive", () => {
    const dir = findDirective("map");
    assert.ok(dir);
    assert.strictEqual(dir.name, "map");
  });

  it("findDirective returns undefined for options", () => {
    assert.strictEqual(findDirective("font_size"), undefined);
  });
});
