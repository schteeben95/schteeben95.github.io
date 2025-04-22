import { faLinkedinIn } from "@fortawesome/free-brands-svg-icons";
import { faBars, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { AnimatePresence, motion } from "framer-motion"; // corrected import
import { JSX, useEffect, useRef, useState } from "react";
import TextFlipAnimation from "./TextFlipAnimation";
import TypingEffect from "./TypingEffect";

import "./App.css";

const roles: string[] = [
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

function App(): JSX.Element {
  const [showIcons, setShowIcons] = useState<boolean>(false);
  const [menuOpen, setMenuOpen] = useState<boolean>(false);

  const menuRef = useRef<HTMLDivElement | null>(null);
  const buttonRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <div className="burger-container">
          <button
            className="burger-button"
            onClick={() => setMenuOpen(!menuOpen)}
            ref={buttonRef}
          >
            <FontAwesomeIcon icon={faBars} />
          </button>
          <AnimatePresence>
            {menuOpen && (
              <motion.div
                ref={menuRef}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="dropdown-menu"
              >
                <a
                  href="https://airgap-express.vercel.app/"
                  rel="noreferrer"
                  target="_blank"
                  title="Peek at some cool stuff I've built"
                >
                  AirGap Express
                </a>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        <p className="intro-text">Hello, my name is Steven</p>
        <br />
        <div className="d-flex align-items-center mb-2">
          <p className="intro-text">I'm a</p>
          <TextFlipAnimation texts={roles} interval={4000} />
        </div>
        <TypingEffect setShowIcons={setShowIcons} />
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
