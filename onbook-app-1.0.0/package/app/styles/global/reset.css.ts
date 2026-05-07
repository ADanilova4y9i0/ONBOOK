// reset.css.ts
import { globalStyle } from "@vanilla-extract/css";

// Box-sizing
globalStyle("*, *::before, *::after", {
  boxSizing: "border-box",
});

// Remove default margins
globalStyle("body, h1, h2, h3, h4, p, figure, blockquote, dl, dd", {
  margin: 0,
});

// Body defaults
globalStyle("body", {
  minHeight: "100vh",
  textRendering: "optimizeLegibility",
  lineHeight: 1.5,
});

// Make images easier to work with
globalStyle("img, picture", {
  maxWidth: "100%",
  display: "block",
});

// Forms
globalStyle("input, button, textarea, select", {
  font: "inherit",
});

// Remove built-in button styles (optional)
globalStyle("button", {
  background: "none",
  border: "none",
});

globalStyle("input", {
  background: "none",
  border: "none",
  outline: "none",
  color: "currentColor",

  padding: 0,
});

globalStyle("a", {
  display: "block",
  lineHeight: "normal",
  textDecoration: "none",
});
