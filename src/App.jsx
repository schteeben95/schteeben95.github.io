import { faLinkedinIn } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { motion } from "motion/react";
import Typewriter from "typewriter-effect";
import "./App.css";

import TextFlipAnimation from "./TextFlipAnimation";

const roles = [
  "🧑‍💻 Technology Consultant",
  "🏘️ NFP Board Member",
  "📀 Data Specialist",
  "🥷 Cyber Enthusiast",
  "🚑 First Responder",
  "🧱 Solutions Architect",
  "🐶 Dog Dad",
  "🏃 Runner",
]
  .map((value) => ({ value, sort: Math.random() }))
  .sort((a, b) => a.sort - b.sort)
  .map(({ value }) => value);

function App() {
  const [showIcons, setShowIcons] = useState(false);

  const TypingEffect = () => {
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
  };

  return (
    <div className="App">
      <header className="App-header">
        <p className="intro-text">Hello, my name is Steven</p>
        <br />
        <div className="d-flex align-items-center mb-2">
          <p className="intro-text">I'm a</p>
          <TextFlipAnimation texts={roles} interval={5000} />
        </div>
        <TypingEffect />
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
      </header>
    </div>
  );
}

export default App;
