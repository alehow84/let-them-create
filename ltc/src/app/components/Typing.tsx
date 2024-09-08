"use client";
import { TypeAnimation } from "react-type-animation";

export default function Typing({ text }: { text: string }) {
  return (
    <TypeAnimation
      sequence={[`${text}`, 500]}
      wrapper="span"
      speed={5}
      preRenderFirstString={false}
      style={{
        fontSize: "3.5em",
        color: "#022136",
        lineHeight: "1.5em",
        display: "block",
        fontWeight: "medium",
      }}
      cursor={false}
    />
  );
}
