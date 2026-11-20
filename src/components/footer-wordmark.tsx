"use client";

import DecryptedText from "@/components/react-bits/DecryptedText";
import LetterGlitch from "@/components/react-bits/LetterGlitch";
import { useSiteTheme } from "@/lib/use-site-theme";

/**
 * The closing moment of every page: a field of code glyphs the cursor can stir,
 * behind an oversized wordmark that decodes as it scrolls into view.
 * Purely decorative; the brand name is already in the footer text.
 */
export function FooterWordmark() {
  const theme = useSiteTheme();
  const light = theme === "light";

  return (
    <div className="footer-mark" aria-hidden="true">
      <LetterGlitch
        key={theme}
        className="footer-mark__field"
        lightMode={light}
        glitchColors={light ? ["#15803d", "#16a34a", "#4ade80"] : ["#166534", "#22c55e", "#86efac"]}
        characters="<>/{}[]();=+-*&|!?#$01"
        fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace"
        fontSize={14}
        baseOpacity={light ? 0.12 : 0.14}
        glitchAmount={0.45}
        speed={0.8}
        cursorRadius={160}
        clickEffect="burst"
        edgeFade={0.35}
        centerFade={0.2}
      />
      <p className="footer-mark__word">
        <DecryptedText
          text="FrontEndFusion"
          animateOn="inViewHover"
          sequential
          revealDirection="center"
          speed={32}
          characters="01<>/{}[]=;$#_"
          encryptedClassName="footer-mark__cipher"
        />
      </p>
    </div>
  );
}
