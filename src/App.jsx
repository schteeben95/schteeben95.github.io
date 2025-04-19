import { faLinkedinIn } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Typewriter from "typewriter-effect";
import "./App.css";

import TextFlipAnimation from "./TextFlipAnimation";

function App() {
  const TypingEffect = () => {
    const [showIcons, setShowIcons] = useState(false);

    return (
      <>
        <p className="intro-text">Hello, my name is Steven</p>
        <br />
        <p
          className="intro-text"
        >
          I'm a
          <TextFlipAnimation
            texts={[
              "🧑‍💻 Technology Consultant",
              "🏘️ NFP Board Member",
              "📀 Data Specialist",
              "🚑 First Responder",
              "🕋 Solutions Architect",
              "🐶 Dog Dad",
              "🏃 Runner",
            ]
              .map((value) => ({ value, sort: Math.random() }))
              .sort((a, b) => a.sort - b.sort)
              .map(({ value }) => value)}
            interval={4000}
          />
        </p>
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
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: showIcons ? 1 : 0 }}
        >
          <div className="contact-icons-ctr">
            <a
              href="https://www.linkedin.com/in/stevenxhan/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FontAwesomeIcon icon={faLinkedinIn} size="1x" />
            </a>
            <a
              href="mailto:steven@stevenhan.net"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FontAwesomeIcon icon={faEnvelope} size="1x" />
            </a>
          </div>
        </motion.div>
      </>
    );
  };

  return (
    <div className="App">
      <header className="App-header">
        <TypingEffect />
      </header>
    </div>
  );
}

export default App;
