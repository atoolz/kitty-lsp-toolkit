export interface KittyOption {
  name: string;
  type: "string" | "number" | "boolean" | "color" | "enum" | "font";
  default: string;
  description: string;
  values?: string[];
  category: string;
}

export const kittyOptions: KittyOption[] = [
  // ── Fonts ──────────────────────────────────────────────────────
  {
    name: "font_family",
    type: "font",
    default: "monospace",
    description:
      "The font family to use. You can specify a generic family name like monospace or a specific font name.",
    category: "Fonts",
  },
  {
    name: "bold_font",
    type: "font",
    default: "auto",
    description:
      "Font family for bold text. Set to `auto` to let kitty pick based on the main font.",
    category: "Fonts",
  },
  {
    name: "italic_font",
    type: "font",
    default: "auto",
    description:
      "Font family for italic text. Set to `auto` to let kitty pick based on the main font.",
    category: "Fonts",
  },
  {
    name: "bold_italic_font",
    type: "font",
    default: "auto",
    description:
      "Font family for bold+italic text. Set to `auto` to let kitty pick based on the main font.",
    category: "Fonts",
  },
  {
    name: "font_size",
    type: "number",
    default: "11.0",
    description: "Font size in points.",
    category: "Fonts",
  },
  {
    name: "force_ltr",
    type: "boolean",
    default: "no",
    description:
      "Force left-to-right text rendering. Useful for languages that mix LTR and RTL scripts.",
    category: "Fonts",
  },
  {
    name: "adjust_line_height",
    type: "string",
    default: "0",
    description:
      "Change the line height. Positive values increase, negative values decrease. Use a percentage suffix (e.g. 110%) for relative adjustment.",
    category: "Fonts",
  },
  {
    name: "adjust_column_width",
    type: "string",
    default: "0",
    description:
      "Change the column width. Positive values increase, negative values decrease. Use a percentage suffix (e.g. 110%) for relative adjustment.",
    category: "Fonts",
  },
  {
    name: "disable_ligatures",
    type: "enum",
    default: "never",
    description:
      "When to disable font ligatures. `never` keeps them always on, `cursor` disables at the cursor position, `always` disables everywhere.",
    values: ["never", "cursor", "always"],
    category: "Fonts",
  },

  // ── Cursor ─────────────────────────────────────────────────────
  {
    name: "cursor_shape",
    type: "enum",
    default: "block",
    description: "The shape of the cursor.",
    values: ["block", "beam", "underline"],
    category: "Cursor",
  },
  {
    name: "cursor_beam_thickness",
    type: "number",
    default: "1.5",
    description: "The thickness of the beam cursor in points.",
    category: "Cursor",
  },
  {
    name: "cursor_underline_thickness",
    type: "number",
    default: "2.0",
    description: "The thickness of the underline cursor in points.",
    category: "Cursor",
  },
  {
    name: "cursor_blink_interval",
    type: "number",
    default: "-1",
    description:
      "Cursor blink interval in seconds. Set to 0 to disable blinking, -1 to use the system default.",
    category: "Cursor",
  },
  {
    name: "cursor_stop_blinking_after",
    type: "number",
    default: "15.0",
    description:
      "Stop blinking the cursor after this many seconds of keyboard inactivity. Set to 0 to never stop.",
    category: "Cursor",
  },
  {
    name: "cursor_trail",
    type: "number",
    default: "0",
    description:
      "Number of cells for the cursor trail effect. Set to 0 to disable.",
    category: "Cursor",
  },
  {
    name: "cursor_trail_decay",
    type: "string",
    default: "0.1 0.4",
    description:
      "Two space-separated floats controlling cursor trail fade-out speed (start end).",
    category: "Cursor",
  },
  {
    name: "cursor_trail_start_threshold",
    type: "number",
    default: "2",
    description:
      "Minimum number of cells the cursor must move before the trail is shown.",
    category: "Cursor",
  },

  // ── Scrollback ─────────────────────────────────────────────────
  {
    name: "scrollback_lines",
    type: "number",
    default: "2000",
    description:
      "Number of lines of scrollback history to keep. A large value uses more RAM.",
    category: "Scrollback",
  },
  {
    name: "scrollback_pager",
    type: "string",
    default: "less --chop-long-lines --RAW-CONTROL-CHARS +INPUT_LINE_NUMBER",
    description:
      "Program to use for viewing scrollback in a pager. The INPUT_LINE_NUMBER placeholder is replaced by the line number.",
    category: "Scrollback",
  },
  {
    name: "scrollback_pager_history_size",
    type: "number",
    default: "0",
    description:
      "Size in MB of scrollback to store for the pager. 0 means the full scrollback is stored.",
    category: "Scrollback",
  },
  {
    name: "scrollback_fill_enlarged_window",
    type: "boolean",
    default: "no",
    description:
      "Fill the window with scrollback content when the window is enlarged.",
    category: "Scrollback",
  },

  // ── Mouse ──────────────────────────────────────────────────────
  {
    name: "mouse_hide_wait",
    type: "number",
    default: "3.0",
    description:
      "Seconds of keyboard inactivity after which the mouse cursor is hidden. Set to 0 to disable, -1 to hide immediately.",
    category: "Mouse",
  },
  {
    name: "url_color",
    type: "color",
    default: "#0087bd",
    description: "Color used to highlight detected URLs.",
    category: "Mouse",
  },
  {
    name: "url_style",
    type: "enum",
    default: "curly",
    description: "Style of underline for detected URLs.",
    values: ["none", "straight", "double", "curly", "dotted", "dashed"],
    category: "Mouse",
  },
  {
    name: "open_url_with",
    type: "string",
    default: "default",
    description:
      "Program to open clicked URLs with. `default` uses the OS default handler.",
    category: "Mouse",
  },
  {
    name: "url_prefixes",
    type: "string",
    default:
      "file ftp ftps gemini git gopher http https irc ircs kitty mailto news sftp ssh",
    description: "Space-separated list of URL prefixes to detect.",
    category: "Mouse",
  },
  {
    name: "detect_urls",
    type: "boolean",
    default: "yes",
    description: "Detect URLs and make them clickable.",
    category: "Mouse",
  },
  {
    name: "copy_on_select",
    type: "enum",
    default: "no",
    description:
      "Copy text to clipboard on selection. `clipboard` copies to the system clipboard.",
    values: ["yes", "no", "clipboard"],
    category: "Mouse",
  },
  {
    name: "focus_follows_mouse",
    type: "boolean",
    default: "no",
    description:
      "When enabled, the kitty window under the mouse gets focus automatically.",
    category: "Mouse",
  },

  // ── Performance ────────────────────────────────────────────────
  {
    name: "repaint_delay",
    type: "number",
    default: "10",
    description:
      "Delay in milliseconds between screen repaints. Lower values give smoother rendering but use more CPU.",
    category: "Performance",
  },
  {
    name: "input_delay",
    type: "number",
    default: "3",
    description:
      "Delay in milliseconds before processing input. Helps batch keystrokes for better performance.",
    category: "Performance",
  },
  {
    name: "sync_to_monitor",
    type: "boolean",
    default: "yes",
    description:
      "Sync rendering to the monitor refresh rate to prevent tearing.",
    category: "Performance",
  },

  // ── Terminal Bell ──────────────────────────────────────────────
  {
    name: "enable_audio_bell",
    type: "boolean",
    default: "yes",
    description: "Enable or disable the terminal bell sound.",
    category: "Terminal Bell",
  },
  {
    name: "visual_bell_duration",
    type: "number",
    default: "0.0",
    description:
      "Duration of the visual bell flash in seconds. Set to 0 to disable.",
    category: "Terminal Bell",
  },
  {
    name: "visual_bell_color",
    type: "color",
    default: "none",
    description:
      "Color for the visual bell flash. Use `none` to use the default.",
    category: "Terminal Bell",
  },
  {
    name: "window_alert_on_bell",
    type: "boolean",
    default: "yes",
    description:
      "Request window attention from the OS when the bell sounds (taskbar flash, etc.).",
    category: "Terminal Bell",
  },
  {
    name: "bell_on_tab",
    type: "string",
    default: "\u{1f514} ",
    description:
      "Text displayed on a tab when a bell occurs in it while it is not the active tab.",
    category: "Terminal Bell",
  },
  {
    name: "command_on_bell",
    type: "string",
    default: "none",
    description:
      "Command to run when the bell sounds. Use `none` to disable.",
    category: "Terminal Bell",
  },

  // ── Window Layout ──────────────────────────────────────────────
  {
    name: "remember_window_size",
    type: "boolean",
    default: "yes",
    description: "Remember the last used window size on restart.",
    category: "Window Layout",
  },
  {
    name: "initial_window_width",
    type: "string",
    default: "640",
    description:
      "Initial window width in pixels or cells (use `c` suffix for cells, e.g. `80c`).",
    category: "Window Layout",
  },
  {
    name: "initial_window_height",
    type: "string",
    default: "400",
    description:
      "Initial window height in pixels or cells (use `c` suffix for cells, e.g. `24c`).",
    category: "Window Layout",
  },
  {
    name: "window_border_width",
    type: "string",
    default: "0.5pt",
    description:
      "Width of window borders. Supports pt (points) and px (pixels) suffixes.",
    category: "Window Layout",
  },
  {
    name: "window_margin_width",
    type: "number",
    default: "0",
    description:
      "Margin width in points around the edges of the OS window.",
    category: "Window Layout",
  },
  {
    name: "window_padding_width",
    type: "number",
    default: "0",
    description:
      "Padding width in points between the window border and the cell area.",
    category: "Window Layout",
  },
  {
    name: "active_border_color",
    type: "color",
    default: "#00ff00",
    description: "Color of the border for the active window.",
    category: "Window Layout",
  },
  {
    name: "inactive_border_color",
    type: "color",
    default: "#cccccc",
    description: "Color of the border for inactive windows.",
    category: "Window Layout",
  },
  {
    name: "placement_strategy",
    type: "enum",
    default: "center",
    description:
      "Where to place extra padding when the terminal cell area is smaller than the OS window.",
    values: ["center", "top-left"],
    category: "Window Layout",
  },
  {
    name: "hide_window_decorations",
    type: "enum",
    default: "no",
    description:
      "Hide window title bar and borders. `titlebar-only` keeps borders but hides the title bar.",
    values: ["yes", "no", "titlebar-only"],
    category: "Window Layout",
  },
  {
    name: "confirm_os_window_close",
    type: "number",
    default: "0",
    description:
      "Ask for confirmation when closing an OS window with at least this many tabs. 0 disables.",
    category: "Window Layout",
  },

  // ── Tab Bar ────────────────────────────────────────────────────
  {
    name: "tab_bar_edge",
    type: "enum",
    default: "bottom",
    description: "Position of the tab bar.",
    values: ["top", "bottom"],
    category: "Tab Bar",
  },
  {
    name: "tab_bar_style",
    type: "enum",
    default: "fade",
    description: "Visual style of the tab bar.",
    values: ["fade", "hidden", "powerline", "separator", "slant", "custom"],
    category: "Tab Bar",
  },
  {
    name: "tab_bar_align",
    type: "enum",
    default: "left",
    description: "Horizontal alignment of the tab bar.",
    values: ["left", "center", "right"],
    category: "Tab Bar",
  },
  {
    name: "tab_bar_min_tabs",
    type: "number",
    default: "2",
    description:
      "Minimum number of tabs before the tab bar is shown.",
    category: "Tab Bar",
  },
  {
    name: "tab_switch_strategy",
    type: "enum",
    default: "previous",
    description:
      "Which tab to switch to when the current tab is closed.",
    values: ["previous", "left", "right", "last"],
    category: "Tab Bar",
  },
  {
    name: "tab_title_template",
    type: "string",
    default:
      "{fmt.fg.red}{bell_symbol}{activity_symbol}{fmt.fg.tab}{title}",
    description:
      "Template for tab titles. Supports {title}, {index}, {bell_symbol}, {activity_symbol} and fmt variables.",
    category: "Tab Bar",
  },
  {
    name: "active_tab_title_template",
    type: "string",
    default: "none",
    description:
      "Template for the active tab title. Set to `none` to use `tab_title_template`.",
    category: "Tab Bar",
  },

  // ── Colors ─────────────────────────────────────────────────────
  {
    name: "foreground",
    type: "color",
    default: "#dddddd",
    description: "Default foreground (text) color.",
    category: "Colors",
  },
  {
    name: "background",
    type: "color",
    default: "#000000",
    description: "Default background color.",
    category: "Colors",
  },
  {
    name: "background_opacity",
    type: "number",
    default: "1.0",
    description:
      "Background opacity from 0.0 (fully transparent) to 1.0 (fully opaque). Requires a compositor.",
    category: "Colors",
  },
  {
    name: "selection_foreground",
    type: "color",
    default: "#000000",
    description: "Foreground color for selected text.",
    category: "Colors",
  },
  {
    name: "selection_background",
    type: "color",
    default: "#fffacd",
    description: "Background color for selected text.",
    category: "Colors",
  },

  // ── Advanced ───────────────────────────────────────────────────
  {
    name: "shell",
    type: "string",
    default: ".",
    description:
      "Shell program to run. Set to `.` to use the default login shell from the OS.",
    category: "Advanced",
  },
  {
    name: "editor",
    type: "string",
    default: ".",
    description:
      "Editor to use for the `edit-config` action. Set to `.` to use the VISUAL or EDITOR environment variable.",
    category: "Advanced",
  },
  {
    name: "close_on_child_death",
    type: "boolean",
    default: "no",
    description:
      "Close the window when the child process (shell) exits.",
    category: "Advanced",
  },
  {
    name: "allow_remote_control",
    type: "enum",
    default: "no",
    description:
      "Allow other programs to control kitty via the remote control protocol.",
    values: ["yes", "no", "socket-only", "socket", "password"],
    category: "Advanced",
  },
  {
    name: "listen_on",
    type: "string",
    default: "none",
    description:
      "Socket path for remote control. Set to `none` to disable.",
    category: "Advanced",
  },
  {
    name: "term",
    type: "string",
    default: "xterm-kitty",
    description:
      "Value of the TERM environment variable set in the terminal.",
    category: "Advanced",
  },
  {
    name: "clipboard_control",
    type: "string",
    default:
      "write-clipboard write-primary read-clipboard-ask read-primary-ask",
    description:
      "Space-separated list of allowed clipboard operations for programs running in the terminal.",
    category: "Advanced",
  },
  {
    name: "clipboard_max_size",
    type: "number",
    default: "512",
    description: "Maximum size in MB for clipboard content.",
    category: "Advanced",
  },
];

// Generate color0 through color255 entries
for (let i = 0; i <= 255; i++) {
  kittyOptions.push({
    name: `color${i}`,
    type: "color",
    default: "",
    description: `ANSI color ${i}. Colors 0-7 are normal, 8-15 are bright, 16-255 are extended.`,
    category: "Colors",
  });
}

/** Special directives that are not key-value options */
export const kittyDirectives = [
  {
    name: "map",
    description:
      "Define a keyboard shortcut. Syntax: `map key action`",
    category: "Directives",
  },
  {
    name: "mouse_map",
    description:
      "Define a mouse binding. Syntax: `mouse_map button event modes action`",
    category: "Directives",
  },
  {
    name: "include",
    description:
      "Include another config file. Relative paths are resolved from the kitty config directory.",
    category: "Directives",
  },
  {
    name: "globinclude",
    description:
      "Include config files matching a glob pattern.",
    category: "Directives",
  },
  {
    name: "env",
    description:
      "Set an environment variable for child processes. Syntax: `env KEY=VALUE`",
    category: "Directives",
  },
];

/** Common kitty actions for map completions */
export const kittyActions = [
  "copy_to_clipboard",
  "paste_from_clipboard",
  "paste_from_selection",
  "scroll_line_up",
  "scroll_line_down",
  "scroll_page_up",
  "scroll_page_down",
  "scroll_home",
  "scroll_end",
  "scroll_to_prompt",
  "show_scrollback",
  "new_window",
  "new_window_with_cwd",
  "close_window",
  "next_window",
  "previous_window",
  "move_window_forward",
  "move_window_backward",
  "start_resizing_window",
  "first_window",
  "second_window",
  "third_window",
  "fourth_window",
  "fifth_window",
  "sixth_window",
  "seventh_window",
  "eighth_window",
  "ninth_window",
  "tenth_window",
  "new_tab",
  "new_tab_with_cwd",
  "close_tab",
  "next_tab",
  "previous_tab",
  "move_tab_forward",
  "move_tab_backward",
  "set_tab_title",
  "next_layout",
  "goto_layout",
  "last_used_layout",
  "toggle_layout",
  "change_font_size",
  "increase_font_size",
  "decrease_font_size",
  "restore_font_size",
  "open_url_with_hints",
  "insert_text",
  "send_text",
  "select_tab",
  "detach_window",
  "detach_tab",
  "close_other_windows_in_tab",
  "toggle_fullscreen",
  "toggle_maximized",
  "input_unicode_character",
  "edit_config_file",
  "kitty_shell",
  "load_config_file",
  "debug_config",
  "clear_terminal",
  "reset_terminal",
  "no_op",
  "combine",
  "discard_event",
  "launch",
  "kitten",
  "create_marker",
  "remove_marker",
  "toggle_marker",
  "scroll_to_mark",
  "show_kitty_env_vars",
  "set_background_opacity",
  "set_colors",
  "neighboring_window",
  "move_window",
  "nth_window",
  "focus_visible_window",
  "swap_with_window",
  "goto_tab",
  "set_spacing",
  "resize_window",
  "signal_child",
  "remote_control",
];

/**
 * Map of all known option names for quick lookup.
 */
export const knownOptionNames = new Set(kittyOptions.map((o) => o.name));

/**
 * All known key names (options + directives).
 */
export const allKnownKeys = new Set([
  ...knownOptionNames,
  ...kittyDirectives.map((d) => d.name),
]);

const optionMap = new Map<string, KittyOption>(
  kittyOptions.map((o) => [o.name, o]),
);

const directiveMap = new Map<string, (typeof kittyDirectives)[number]>(
  kittyDirectives.map((d) => [d.name, d]),
);

export function findOption(name: string): KittyOption | undefined {
  return optionMap.get(name);
}

export function findDirective(
  name: string,
): (typeof kittyDirectives)[number] | undefined {
  return directiveMap.get(name);
}
