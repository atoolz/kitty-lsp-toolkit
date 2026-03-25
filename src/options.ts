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
    name: "symbol_map",
    type: "string",
    default: "",
    description:
      "Map a Unicode range to a specific font. Can be specified multiple times. Syntax: `symbol_map U+E0A0-U+E0A3 Font Name`.",
    category: "Fonts",
  },
  {
    name: "narrow_symbols",
    type: "string",
    default: "",
    description:
      "Force narrow rendering for ambiguous-width Unicode characters. Can be specified multiple times. Syntax: `narrow_symbols U+E0A0-U+E0A3 1`.",
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
  {
    name: "font_features",
    type: "string",
    default: "none",
    description:
      "OpenType font features to enable/disable. Can be specified multiple times for different fonts. Syntax: `font_features FontName +liga +calt`.",
    category: "Fonts",
  },
  {
    name: "modify_font",
    type: "string",
    default: "",
    description:
      "Modify font metrics (line height, cell width, baseline, underline, strikethrough). Can be specified multiple times. Syntax: `modify_font underline_position 2`.",
    category: "Fonts",
  },
  {
    name: "box_drawing_scale",
    type: "string",
    default: "0.001, 1, 1.5, 2",
    description:
      "Four comma-separated floats controlling the thickness of box-drawing characters (thin, normal, thick, very thick).",
    category: "Fonts",
  },
  {
    name: "undercurl_style",
    type: "enum",
    default: "thin-sparse",
    description: "Style of undercurl rendering.",
    values: ["thin-sparse", "thin-dense", "thick-sparse", "thick-dense"],
    category: "Fonts",
  },
  {
    name: "underline_exclusion",
    type: "string",
    default: "1",
    description:
      "Pixels of exclusion zone around text for underlines, to avoid them touching the text.",
    category: "Fonts",
  },
  {
    name: "text_composition_strategy",
    type: "string",
    default: "platform",
    description:
      "Strategy for rendering text with sub-pixel antialiasing. Use `platform` for OS default, `legacy` for older behavior, or a float between 0 and 1.",
    category: "Fonts",
  },
  {
    name: "text_fg_override_threshold",
    type: "number",
    default: "0",
    description:
      "Luminosity threshold below which the foreground color is overridden. 0 disables.",
    category: "Fonts",
  },

  // ── Cursor ─────────────────────────────────────────────────────
  {
    name: "cursor",
    type: "color",
    default: "#cccccc",
    description: "Default cursor color. If set to `none`, uses a reverse video effect.",
    category: "Cursor",
  },
  {
    name: "cursor_text_color",
    type: "color",
    default: "#111111",
    description:
      "Color of text under the cursor. Set to `background` to use the current background color.",
    category: "Cursor",
  },
  {
    name: "cursor_shape",
    type: "enum",
    default: "block",
    description: "The shape of the cursor.",
    values: ["block", "beam", "underline"],
    category: "Cursor",
  },
  {
    name: "cursor_shape_unfocused",
    type: "enum",
    default: "hollow",
    description: "The shape of the cursor when the terminal window is not focused.",
    values: ["hollow", "block", "beam", "underline", "unchanged"],
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
  {
    name: "cursor_trail_color",
    type: "color",
    default: "none",
    description:
      "Color of the cursor trail. Set to `none` to use the cursor color.",
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
    name: "scrollbar",
    type: "enum",
    default: "scrolled",
    description: "When to show the scrollbar.",
    values: ["scrolled", "always", "never", "hovered", "scrolled-and-hovered"],
    category: "Scrollback",
  },
  {
    name: "scrollbar_interactive",
    type: "boolean",
    default: "yes",
    description: "Allow clicking and dragging the scrollbar to scroll.",
    category: "Scrollback",
  },
  {
    name: "scrollbar_jump_on_click",
    type: "boolean",
    default: "yes",
    description: "Jump to the clicked position in the scrollbar track.",
    category: "Scrollback",
  },
  {
    name: "scrollbar_width",
    type: "number",
    default: "0.5",
    description: "Width of the scrollbar in cells.",
    category: "Scrollback",
  },
  {
    name: "scrollbar_hover_width",
    type: "number",
    default: "1",
    description: "Width of the scrollbar in cells when hovered.",
    category: "Scrollback",
  },
  {
    name: "scrollbar_handle_opacity",
    type: "number",
    default: "0.5",
    description: "Opacity of the scrollbar handle (0.0 to 1.0).",
    category: "Scrollback",
  },
  {
    name: "scrollbar_radius",
    type: "number",
    default: "0.3",
    description: "Corner radius of the scrollbar handle in cells.",
    category: "Scrollback",
  },
  {
    name: "scrollbar_gap",
    type: "number",
    default: "0.1",
    description: "Gap between the scrollbar and the window edge in cells.",
    category: "Scrollback",
  },
  {
    name: "scrollbar_min_handle_height",
    type: "number",
    default: "1",
    description: "Minimum height of the scrollbar handle in cells.",
    category: "Scrollback",
  },
  {
    name: "scrollbar_hitbox_expansion",
    type: "number",
    default: "0.25",
    description: "Extra width added to the scrollbar hitbox for easier clicking.",
    category: "Scrollback",
  },
  {
    name: "scrollbar_track_opacity",
    type: "number",
    default: "0",
    description: "Opacity of the scrollbar track (0.0 to 1.0).",
    category: "Scrollback",
  },
  {
    name: "scrollbar_track_hover_opacity",
    type: "number",
    default: "0.1",
    description: "Opacity of the scrollbar track when hovered.",
    category: "Scrollback",
  },
  {
    name: "scrollbar_handle_color",
    type: "string",
    default: "foreground",
    description:
      "Color of the scrollbar handle. Can be a hex color or `foreground`/`background`.",
    category: "Scrollback",
  },
  {
    name: "scrollbar_track_color",
    type: "string",
    default: "foreground",
    description:
      "Color of the scrollbar track. Can be a hex color or `foreground`/`background`.",
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
  {
    name: "wheel_scroll_multiplier",
    type: "number",
    default: "5.0",
    description: "Number of lines to scroll per mouse wheel notch.",
    category: "Scrollback",
  },
  {
    name: "wheel_scroll_min_lines",
    type: "number",
    default: "1",
    description: "Minimum number of lines to scroll per wheel event.",
    category: "Scrollback",
  },
  {
    name: "touch_scroll_multiplier",
    type: "number",
    default: "1.0",
    description: "Multiplier for touchpad scroll distance.",
    category: "Scrollback",
  },
  {
    name: "pixel_scroll",
    type: "boolean",
    default: "yes",
    description: "Enable pixel-level scrolling for smooth scroll on supported hardware.",
    category: "Scrollback",
  },
  {
    name: "momentum_scroll",
    type: "number",
    default: "0.96",
    description:
      "Momentum scroll deceleration factor. Set to 0 to disable momentum scrolling. Values closer to 1.0 mean longer coast.",
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
    name: "url_excluded_characters",
    type: "string",
    default: "",
    description: "Characters that should not be considered part of a URL.",
    category: "Mouse",
  },
  {
    name: "show_hyperlink_targets",
    type: "boolean",
    default: "no",
    description: "Show the actual URL target when hovering over a hyperlink.",
    category: "Mouse",
  },
  {
    name: "underline_hyperlinks",
    type: "enum",
    default: "hover",
    description: "When to underline hyperlinks.",
    values: ["hover", "always", "never"],
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
    name: "clear_selection_on_clipboard_loss",
    type: "boolean",
    default: "no",
    description:
      "Clear the selection when another program claims the clipboard.",
    category: "Mouse",
  },
  {
    name: "paste_actions",
    type: "string",
    default: "quote-urls-at-prompt,confirm",
    description:
      "Comma-separated list of actions to take when pasting text. Options: quote-urls-at-prompt, confirm, filter, replace-dangerous-control-codes, replace-newline, no-op.",
    category: "Mouse",
  },
  {
    name: "strip_trailing_spaces",
    type: "enum",
    default: "never",
    description:
      "Strip trailing spaces when copying text. `smart` strips them when the line is not wrapped.",
    values: ["always", "never", "smart"],
    category: "Mouse",
  },
  {
    name: "select_by_word_characters",
    type: "string",
    default: "@-./_~?&=%+#",
    description:
      "Characters considered part of a word for double-click selection.",
    category: "Mouse",
  },
  {
    name: "select_by_word_characters_forward",
    type: "string",
    default: "",
    description:
      "Additional characters considered part of a word when extending selection forward. Empty means same as select_by_word_characters.",
    category: "Mouse",
  },
  {
    name: "click_interval",
    type: "number",
    default: "-1.0",
    description:
      "Maximum interval in seconds between clicks for multi-click selection. -1 uses the system default.",
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
  {
    name: "pointer_shape_when_grabbed",
    type: "enum",
    default: "arrow",
    description:
      "Mouse pointer shape when the terminal program grabs the mouse.",
    values: ["arrow", "beam", "hand"],
    category: "Mouse",
  },
  {
    name: "default_pointer_shape",
    type: "enum",
    default: "beam",
    description: "Default mouse pointer shape.",
    values: ["arrow", "beam", "hand"],
    category: "Mouse",
  },
  {
    name: "pointer_shape_when_dragging",
    type: "string",
    default: "beam crosshair",
    description:
      "Mouse pointer shape when dragging. Two space-separated values: shape for text selection, shape for other dragging.",
    category: "Mouse",
  },

  // ── Mouse Actions ──────────────────────────────────────────────
  {
    name: "clear_all_mouse_actions",
    type: "boolean",
    default: "no",
    description:
      "Remove all default mouse actions, allowing you to define your own from scratch.",
    category: "Mouse Actions",
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
  {
    name: "macos_dock_badge_on_bell",
    type: "boolean",
    default: "yes",
    description: "Show a badge on the macOS dock icon when the bell rings.",
    category: "Terminal Bell",
  },
  {
    name: "bell_path",
    type: "string",
    default: "none",
    description:
      "Path to a custom audio file to play as the bell sound. Use `none` for the system default.",
    category: "Terminal Bell",
  },
  {
    name: "linux_bell_theme",
    type: "string",
    default: "__custom",
    description:
      "Sound theme to use for the bell on Linux. `__custom` uses the bell_path setting.",
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
    name: "remember_window_position",
    type: "boolean",
    default: "no",
    description: "Remember the window position from the last session.",
    category: "Window Layout",
  },
  {
    name: "enabled_layouts",
    type: "string",
    default: "*",
    description:
      "Comma-separated list of enabled layouts. Use `*` for all. Available: fat, grid, horizontal, splits, stack, tall, vertical.",
    category: "Window Layout",
  },
  {
    name: "window_resize_step_cells",
    type: "number",
    default: "2",
    description: "Step size in cells when resizing kitty windows.",
    category: "Window Layout",
  },
  {
    name: "window_resize_step_lines",
    type: "number",
    default: "2",
    description: "Step size in lines when resizing kitty windows.",
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
    name: "draw_minimal_borders",
    type: "boolean",
    default: "yes",
    description:
      "Draw only the minimum needed borders between windows, rather than full borders.",
    category: "Window Layout",
  },
  {
    name: "draw_window_borders_for_single_window",
    type: "boolean",
    default: "no",
    description:
      "Draw window borders even when there is only a single window visible.",
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
    name: "single_window_margin_width",
    type: "string",
    default: "-1",
    description:
      "Margin width for a single window. -1 uses window_margin_width. Supports 1, 2, 3, or 4 values (top, right, bottom, left).",
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
    name: "single_window_padding_width",
    type: "string",
    default: "-1",
    description:
      "Padding width for a single window. -1 uses window_padding_width. Supports 1, 2, 3, or 4 values.",
    category: "Window Layout",
  },
  {
    name: "placement_strategy",
    type: "enum",
    default: "center",
    description:
      "Where to place extra padding when the terminal cell area is smaller than the OS window.",
    values: [
      "top-left",
      "top",
      "top-right",
      "left",
      "center",
      "right",
      "bottom-left",
      "bottom",
      "bottom-right",
    ],
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
    name: "bell_border_color",
    type: "color",
    default: "#ff5a00",
    description: "Color of the border for windows where a bell has occurred.",
    category: "Window Layout",
  },
  {
    name: "inactive_text_alpha",
    type: "number",
    default: "1.0",
    description:
      "Opacity of text in inactive windows (0.0 to 1.0). 1.0 means fully opaque.",
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
    name: "window_logo_path",
    type: "string",
    default: "none",
    description:
      "Path to a PNG image to display as a logo in the window background. Use `none` to disable.",
    category: "Window Layout",
  },
  {
    name: "window_logo_position",
    type: "enum",
    default: "bottom-right",
    description: "Position of the window logo.",
    values: [
      "top-left",
      "top",
      "top-right",
      "left",
      "center",
      "right",
      "bottom-left",
      "bottom",
      "bottom-right",
    ],
    category: "Window Layout",
  },
  {
    name: "window_logo_alpha",
    type: "number",
    default: "0.5",
    description: "Opacity of the window logo (0.0 to 1.0).",
    category: "Window Layout",
  },
  {
    name: "window_logo_scale",
    type: "string",
    default: "0",
    description:
      "Scale of the window logo as a percentage of the window size. 0 means auto-scale.",
    category: "Window Layout",
  },
  {
    name: "resize_debounce_time",
    type: "string",
    default: "0.1 0.5",
    description:
      "Two space-separated floats. First is debounce time in seconds when resizing, second is debounce time for remote connections.",
    category: "Window Layout",
  },
  {
    name: "resize_in_steps",
    type: "boolean",
    default: "no",
    description:
      "Resize the OS window in cell-sized steps rather than pixel-by-pixel.",
    category: "Window Layout",
  },
  {
    name: "visual_window_select_characters",
    type: "string",
    default: "1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    description:
      "Characters used to label windows in visual window select mode.",
    category: "Window Layout",
  },
  {
    name: "confirm_os_window_close",
    type: "number",
    default: "-1",
    description:
      "Ask for confirmation when closing an OS window with at least this many kitty windows. 0 disables, -1 uses the number of windows.",
    category: "Window Layout",
  },
  {
    name: "window_drag_tolerance",
    type: "number",
    default: "2",
    description:
      "Minimum distance in pixels to drag before starting a window move/resize.",
    category: "Window Layout",
  },
  {
    name: "window_title_bar",
    type: "enum",
    default: "top",
    description: "Position of the window title bar.",
    values: ["top", "bottom"],
    category: "Window Layout",
  },
  {
    name: "window_title_bar_min_windows",
    type: "number",
    default: "0",
    description:
      "Minimum number of windows before the title bar is shown. 0 means always show.",
    category: "Window Layout",
  },
  {
    name: "window_title_template",
    type: "string",
    default:
      "{fmt.fg.red}{bell_symbol}{activity_symbol}{fmt.fg.window}{progress_percent}{title}",
    description:
      "Template for the OS window title. Supports {title}, {bell_symbol}, {activity_symbol}, {progress_percent} and fmt variables.",
    category: "Window Layout",
  },
  {
    name: "active_window_title_template",
    type: "string",
    default: "none",
    description:
      "Template for the active window title in the title bar. Set to `none` to use window_title_template.",
    category: "Window Layout",
  },
  {
    name: "window_title_bar_active_foreground",
    type: "color",
    default: "none",
    description:
      "Foreground color for the active window title bar. Use `none` for auto.",
    category: "Window Layout",
  },
  {
    name: "window_title_bar_active_background",
    type: "color",
    default: "none",
    description:
      "Background color for the active window title bar. Use `none` for auto.",
    category: "Window Layout",
  },
  {
    name: "window_title_bar_inactive_foreground",
    type: "color",
    default: "none",
    description:
      "Foreground color for the inactive window title bar. Use `none` for auto.",
    category: "Window Layout",
  },
  {
    name: "window_title_bar_inactive_background",
    type: "color",
    default: "none",
    description:
      "Background color for the inactive window title bar. Use `none` for auto.",
    category: "Window Layout",
  },
  {
    name: "window_title_bar_align",
    type: "enum",
    default: "center",
    description: "Alignment of text in the window title bar.",
    values: ["left", "center", "right"],
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
    name: "tab_bar_margin_width",
    type: "number",
    default: "0.0",
    description: "Horizontal margin in points on each side of the tab bar.",
    category: "Tab Bar",
  },
  {
    name: "tab_bar_margin_height",
    type: "string",
    default: "0.0 0.0",
    description:
      "Two space-separated values: margin above and below the tab bar in points.",
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
    name: "tab_bar_filter",
    type: "string",
    default: "",
    description: "Filter pattern for which tabs to show in the tab bar.",
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
    name: "tab_fade",
    type: "string",
    default: "0.25 0.5 0.75 1",
    description:
      "Space-separated opacity values for the fade tab bar style. Controls the fade effect from tab edge to center.",
    category: "Tab Bar",
  },
  {
    name: "tab_separator",
    type: "string",
    default: " \u2507",
    description:
      "Separator string between tabs when using the `separator` tab bar style.",
    category: "Tab Bar",
  },
  {
    name: "tab_powerline_style",
    type: "enum",
    default: "angled",
    description: "Style of the powerline separator in the tab bar.",
    values: ["angled", "round", "slanted"],
    category: "Tab Bar",
  },
  {
    name: "tab_activity_symbol",
    type: "string",
    default: "none",
    description:
      "Symbol displayed on a tab when there is activity. Use `none` to disable.",
    category: "Tab Bar",
  },
  {
    name: "tab_title_max_length",
    type: "number",
    default: "0",
    description:
      "Maximum length of tab titles in characters. 0 means no limit.",
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
  {
    name: "active_tab_foreground",
    type: "color",
    default: "#000",
    description: "Foreground color for the active tab.",
    category: "Tab Bar",
  },
  {
    name: "active_tab_background",
    type: "color",
    default: "#eee",
    description: "Background color for the active tab.",
    category: "Tab Bar",
  },
  {
    name: "active_tab_font_style",
    type: "string",
    default: "bold-italic",
    description:
      "Font style for the active tab. Options: normal, bold, italic, bold-italic.",
    category: "Tab Bar",
  },
  {
    name: "inactive_tab_foreground",
    type: "color",
    default: "#444",
    description: "Foreground color for inactive tabs.",
    category: "Tab Bar",
  },
  {
    name: "inactive_tab_background",
    type: "color",
    default: "#999",
    description: "Background color for inactive tabs.",
    category: "Tab Bar",
  },
  {
    name: "inactive_tab_font_style",
    type: "string",
    default: "normal",
    description:
      "Font style for inactive tabs. Options: normal, bold, italic, bold-italic.",
    category: "Tab Bar",
  },
  {
    name: "tab_bar_background",
    type: "color",
    default: "none",
    description:
      "Background color for the tab bar. Use `none` to use the terminal background.",
    category: "Tab Bar",
  },
  {
    name: "tab_bar_margin_color",
    type: "color",
    default: "none",
    description:
      "Color for the tab bar margin area. Use `none` to use the terminal background.",
    category: "Tab Bar",
  },
  {
    name: "tab_bar_drag_threshold",
    type: "number",
    default: "5",
    description:
      "Minimum distance in pixels to drag before reordering tabs.",
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
    name: "background_blur",
    type: "number",
    default: "0",
    description:
      "Blur radius for the background when using transparency. 0 disables blur.",
    category: "Colors",
  },
  {
    name: "transparent_background_colors",
    type: "string",
    default: "",
    description:
      "Space-separated colors that should be treated as transparent in the background.",
    category: "Colors",
  },
  {
    name: "dynamic_background_opacity",
    type: "boolean",
    default: "no",
    description:
      "Allow changing the background opacity at runtime via remote control.",
    category: "Colors",
  },
  {
    name: "background_image",
    type: "string",
    default: "none",
    description:
      "Path to a PNG image to use as the background. Use `none` to disable.",
    category: "Colors",
  },
  {
    name: "background_image_layout",
    type: "enum",
    default: "tiled",
    description: "How to lay out the background image.",
    values: ["mirror-tiled", "scaled", "tiled", "clamped", "centered", "cscaled"],
    category: "Colors",
  },
  {
    name: "background_image_linear",
    type: "boolean",
    default: "no",
    description:
      "Use linear interpolation when scaling the background image.",
    category: "Colors",
  },
  {
    name: "background_tint",
    type: "number",
    default: "0.0",
    description:
      "How much to tint the background image with the background color (0.0 to 1.0).",
    category: "Colors",
  },
  {
    name: "background_tint_gaps",
    type: "number",
    default: "1.0",
    description:
      "How much to tint the background in window gaps (0.0 to 1.0).",
    category: "Colors",
  },
  {
    name: "dim_opacity",
    type: "number",
    default: "0.4",
    description:
      "Opacity of dimmed text (using the dim escape code). 0.0 to 1.0.",
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
    name: "remote_control_password",
    type: "string",
    default: "",
    description:
      "Password for remote control access. Can be specified multiple times for multiple passwords with different permissions.",
    category: "Advanced",
  },
  {
    name: "allow_remote_control",
    type: "enum",
    default: "no",
    description:
      "Allow other programs to control kitty via the remote control protocol.",
    values: ["yes", "y", "true", "no", "n", "false", "socket-only", "socket", "password"],
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
    name: "filter_notification",
    type: "string",
    default: "",
    description:
      "Filter notifications from programs. Can be specified multiple times.",
    category: "Advanced",
  },
  {
    name: "watcher",
    type: "string",
    default: "",
    description:
      "Path to a Python file that will be loaded as a watcher to receive events. Can be specified multiple times.",
    category: "Advanced",
  },
  {
    name: "exe_search_path",
    type: "string",
    default: "",
    description:
      "Extra directories to search for executables. Can be specified multiple times.",
    category: "Advanced",
  },
  {
    name: "update_check_interval",
    type: "number",
    default: "24",
    description:
      "Interval in hours between checking for updates. 0 disables update checks.",
    category: "Advanced",
  },
  {
    name: "startup_session",
    type: "string",
    default: "none",
    description:
      "Path to a session file to load on startup. Use `none` to disable.",
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
  {
    name: "file_transfer_confirmation_bypass",
    type: "string",
    default: "",
    description:
      "Password to bypass file transfer confirmation dialogs.",
    category: "Advanced",
  },
  {
    name: "allow_hyperlinks",
    type: "boolean",
    default: "yes",
    description:
      "Allow programs running in the terminal to create hyperlinks using the OSC 8 escape sequence.",
    category: "Advanced",
  },
  {
    name: "shell_integration",
    type: "string",
    default: "enabled",
    description:
      "Enable shell integration features. Options: enabled, disabled, no-cursor, no-title, no-cwd, no-prompt-mark, no-complete, no-sudo.",
    category: "Advanced",
  },
  {
    name: "allow_cloning",
    type: "enum",
    default: "ask",
    description:
      "Allow cloning of kitty windows using the clone-in-kitty command.",
    values: ["yes", "y", "true", "no", "n", "false", "ask"],
    category: "Advanced",
  },
  {
    name: "clone_source_strategies",
    type: "string",
    default: "venv,conda,env_var,path",
    description:
      "Comma-separated strategies for cloning shell environment in new windows.",
    category: "Advanced",
  },
  {
    name: "notify_on_cmd_finish",
    type: "string",
    default: "never",
    description:
      "Send a desktop notification when a long-running command finishes. Format: `duration [options]` or `never`.",
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
    name: "terminfo_type",
    type: "enum",
    default: "path",
    description:
      "How to set the terminfo for child processes.",
    values: ["path", "direct", "none"],
    category: "Advanced",
  },
  {
    name: "forward_stdio",
    type: "boolean",
    default: "no",
    description:
      "Forward stdin/stdout/stderr of the kitty process to the child process.",
    category: "Advanced",
  },
  {
    name: "menu_map",
    type: "string",
    default: "",
    description:
      "Define custom menu entries. Can be specified multiple times. Syntax: `menu_map global \"Menu/Item\" action`.",
    category: "Advanced",
  },

  // ── OS Specific Tweaks ─────────────────────────────────────────
  {
    name: "wayland_titlebar_color",
    type: "color",
    default: "system",
    description:
      "Color of the title bar on Wayland. Use `system` for the system default, `background` for the terminal background color.",
    category: "OS Specific Tweaks",
  },
  {
    name: "macos_titlebar_color",
    type: "color",
    default: "system",
    description:
      "Color of the title bar on macOS. Use `system` for the system default, `background` for the terminal background color.",
    category: "OS Specific Tweaks",
  },
  {
    name: "macos_option_as_alt",
    type: "enum",
    default: "no",
    description:
      "Treat the Option key as Alt on macOS, allowing Alt+key combinations.",
    values: ["yes", "no", "left", "right", "both"],
    category: "OS Specific Tweaks",
  },
  {
    name: "macos_hide_from_tasks",
    type: "boolean",
    default: "no",
    description: "Hide kitty from the macOS task switcher (Cmd+Tab).",
    category: "OS Specific Tweaks",
  },
  {
    name: "macos_quit_when_last_window_closed",
    type: "boolean",
    default: "no",
    description: "Quit kitty when the last window is closed on macOS.",
    category: "OS Specific Tweaks",
  },
  {
    name: "macos_window_resizable",
    type: "boolean",
    default: "yes",
    description: "Allow the kitty window to be resized on macOS.",
    category: "OS Specific Tweaks",
  },
  {
    name: "macos_thicken_font",
    type: "number",
    default: "0",
    description:
      "Thicken font strokes on macOS for better readability on Retina displays. Values like 0.25 or 0.5 work well.",
    category: "OS Specific Tweaks",
  },
  {
    name: "macos_traditional_fullscreen",
    type: "boolean",
    default: "no",
    description:
      "Use traditional (non-native) fullscreen mode on macOS.",
    category: "OS Specific Tweaks",
  },
  {
    name: "macos_show_window_title_in",
    type: "enum",
    default: "all",
    description: "Where to show the window title on macOS.",
    values: ["all", "menubar", "none", "window"],
    category: "OS Specific Tweaks",
  },
  {
    name: "macos_menubar_title_max_length",
    type: "number",
    default: "0",
    description:
      "Maximum length of the title shown in the macOS menu bar. 0 means no limit.",
    category: "OS Specific Tweaks",
  },
  {
    name: "macos_custom_beam_cursor",
    type: "boolean",
    default: "no",
    description: "Use a custom beam cursor on macOS instead of the system default.",
    category: "OS Specific Tweaks",
  },
  {
    name: "macos_colorspace",
    type: "enum",
    default: "srgb",
    description: "Color space to use on macOS.",
    values: ["srgb", "default", "displayp3"],
    category: "OS Specific Tweaks",
  },
  {
    name: "linux_display_server",
    type: "enum",
    default: "auto",
    description:
      "Which display server to use on Linux.",
    values: ["auto", "wayland", "x11"],
    category: "OS Specific Tweaks",
  },
  {
    name: "wayland_enable_ime",
    type: "boolean",
    default: "yes",
    description: "Enable input method editor (IME) support on Wayland.",
    category: "OS Specific Tweaks",
  },

  // ── Keyboard Shortcuts ─────────────────────────────────────────
  {
    name: "kitty_mod",
    type: "string",
    default: "ctrl+shift",
    description:
      "The modifier key combination used as the kitty modifier in keyboard shortcuts.",
    category: "Keyboard Shortcuts",
  },
  {
    name: "clear_all_shortcuts",
    type: "boolean",
    default: "no",
    description:
      "Remove all default keyboard shortcuts, allowing you to define your own from scratch.",
    category: "Keyboard Shortcuts",
  },
  {
    name: "map_timeout",
    type: "number",
    default: "0.0",
    description:
      "Timeout in seconds to wait for additional keys in multi-key shortcuts. 0 disables.",
    category: "Keyboard Shortcuts",
  },
  {
    name: "action_alias",
    type: "string",
    default: "launch_tab launch --type=tab --cwd=current",
    description:
      "Define an alias for a complex action. Can be specified multiple times. Syntax: `action_alias alias_name actual_action`.",
    category: "Keyboard Shortcuts",
  },
  {
    name: "kitten_alias",
    type: "string",
    default: "hints hints --hints-offset=0",
    description:
      "Define an alias for a kitten. Can be specified multiple times. Syntax: `kitten_alias alias_name kitten_name args`.",
    category: "Keyboard Shortcuts",
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

// Generate mark color entries
for (let i = 1; i <= 3; i++) {
  kittyOptions.push({
    name: `mark${i}_foreground`,
    type: "color",
    default: "black",
    description: `Foreground color for mark ${i} highlights.`,
    category: "Colors",
  });
  kittyOptions.push({
    name: `mark${i}_background`,
    type: "color",
    default: i === 1 ? "#98d3cb" : i === 2 ? "#f2dcd3" : "#f274bc",
    description: `Background color for mark ${i} highlights.`,
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
