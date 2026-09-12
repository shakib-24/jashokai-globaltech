import { Font } from "@react-pdf/renderer";

let registered = false;

export function ensureFontsRegistered(): void {
  if (registered) return;
  registered = true;

  Font.register({
    family: "NotoSansJP",
    fonts: [
      { src: "/fonts/NotoSansJP-Regular.ttf", fontWeight: "normal" },
      { src: "/fonts/NotoSansJP-Bold.ttf", fontWeight: "bold" },
    ],
  });

  // Japanese text has no spaces to break on — disable the default
  // English-style hyphenation so words/characters are never split oddly.
  Font.registerHyphenationCallback((word) => [word]);
}
