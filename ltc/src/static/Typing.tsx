"use client";
import { TypeAnimation } from "react-type-animation";

export default function Typing() {
  return (
    <TypeAnimation
      sequence={[
        "podcast enthusiast",
        500,
        "consumer of memes",
        500,
        "patron of puns",
        500,
        "mother of cats",
      ]}
      wrapper="span"
      speed={10}
      preRenderFirstString={true}
      style={{
        fontSize: "3em",
        color: "#022136",
        lineHeight: "1.5em",
        display: "block",
        fontWeight: "bold",
      }}
      repeat={2}
    />
  );
}
