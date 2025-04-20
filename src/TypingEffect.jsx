import Typewriter from "typewriter-effect";

const TypingEffect = ({setShowIcons}) => {
    return (
      <>
        <Typewriter
          options={{
            loop: false,
            delay: 60,
          }}
          onInit={(typewriter) => {
            typewriter
              .pauseFor(1000)
              .typeString("I'm here to discover and understand")
              .typeString("<br />")
              .typeString("all the <i>wonderful</i> things in life.")
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
}

export default TypingEffect;