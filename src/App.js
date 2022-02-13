import { faLinkedinIn } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from "react";
import { Motion, spring } from "react-motion";
import Typewriter from 'typewriter-effect';
import './App.css';


function App() {

    const TypingEffect = () => {

        const [showIcons, setShowIcons] = useState(false)

        return (
            <>
                <Typewriter
                    options={{
                        loop: false,
                        delay: "60"
                    }}
                    onInit={(typewriter) => {
                        typewriter
                            .pauseFor(1000)
                            .typeString("Hello, ")
                            .pauseFor(1000)
                            .typeString("my name is Steven.")
                            .pauseFor(1000)
                            .typeString("<br />")
                            .typeString("I am a management consultant")
                            .pauseFor(200)
                            .typeString("<br />")
                            .typeString(" with experience across")
                            .typeString("<br />")
                            .typeString("federal and state governments.")
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
                            .callFunction(() => document.getElementsByClassName("Typewriter__cursor")[0].setAttribute("style", "color: transparent"))
                            .start()
                    }}
                />
                <Motion style={{ currentOpacity: spring(showIcons ? 1 : 0, { stiffness: 80, damping: 50 }) }}>
                    {({ currentOpacity }) =>
                        <div style={{ opacity: currentOpacity }}>
                            <div className="contact-icons-ctr">
                                <a href="https://www.linkedin.com/in/stevenxhan/" target="_blank" rel="noopener noreferrer">
                                    <FontAwesomeIcon icon={faLinkedinIn} size="1x" />
                                </a>
                                <a href="mailto:steven@stevenhan.net" target="_blank" rel="noopener noreferrer">
                                    <FontAwesomeIcon icon={faEnvelope} size="1x" /></a>
                            </div>
                        </div>
                    }
                </Motion>
            </>
        )
    }

    return (
        <div className="App">
            <header className="App-header">
                <TypingEffect />
            </header>
        </div>
    );
}

export default App;
