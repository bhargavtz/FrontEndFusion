"use client";

import { Fragment } from "react";
import DecryptedText from "@/components/react-bits/DecryptedText";

const parts = [
  { text: "Learn frontend.", em: false },
  { text: "Understand the code.", em: true },
  { text: "Preview the result.", em: false },
  { text: "Build real projects.", em: false },
];

/** Hero headline: one decode-on-load moment. Screen readers get the plain text. */
export function HeroTitle() {
  return (
    <h1 id="hero-title">
      {parts.map((part, index) => (
        <Fragment key={part.text}>
          {index > 0 && " "}
          <DecryptedText
            text={part.text}
            animateOn="view"
            sequential
            revealDirection="start"
            speed={28}
            characters="01<>/{}[]=;$#_"
            parentClassName={part.em ? "hero__em" : undefined}
            encryptedClassName="hero__cipher"
          />
        </Fragment>
      ))}
    </h1>
  );
}
