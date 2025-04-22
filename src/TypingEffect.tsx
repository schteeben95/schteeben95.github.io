import React from "react";
import Typewriter, { Options } from "typewriter-effect";

interface TypingEffectProps {
  setShowIcons: React.Dispatch<React.SetStateAction<boolean>>;
}

const TypingEffect: React.FC<TypingEffectProps> = ({ setShowIcons }) => {
  const options: Options = {
    loop: false,
    delay: 60,
  };

  return (
    <>
      <Typewriter
        options={options}
        onInit={(typewriter) => {
          typewriter
            .pauseFor(1000)
            .typeString("I'm here to discover and understand")
            .typeString("<br />")
            .typeString(
              "all the <i class='wonderful-text'>wonderful</i> things in life."
            )
            .pauseFor(2000)
            .typeString("<br />")
            .pauseFor(50)
            .typeString("<br />")
            .pauseFor(50)
            .typeString("<br />")
            .typeString("Find me here:")
            .pauseFor(200)
            .callFunction(() => setShowIcons(true))
            .pauseFor(100)
            .callFunction(() =>
              document
                .getElementsByClassName("Typewriter__cursor")[0]
                .setAttribute("style", "color: transparent")
            )
            .start();
        }}
      />
    </>
  );
};

export default TypingEffect;
