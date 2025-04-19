import { useEffect, useState } from "react";
import { useSpring, animated } from "@react-spring/web";

const TextFlipAnimation = ({ texts, interval = 3000 }) => {
    const [index, setIndex] = useState(0);
  
    const [styles, api] = useSpring(() => ({
      rotateX: 0,
      translateY: 0,
      translateZ: 0, // Added translateZ for depth effect
      opacity: 1,
      config: { tension: 300, friction: 25 },
    }));
  
    useEffect(() => {
      if (texts.length <= 1) return;
  
      const timer = setInterval(() => {
        // Step 1: Flip up: rotateX from 0 → 90 and lift the bottom edge
        api.start({
          rotateX: 90,
          translateY: -30, // 👈 lift the bottom edge
          translateZ: -30, // 👈 move the top edge away from the viewer
          opacity: 0,
          onRest: () => {
            // Step 2: Change text while hidden
            setIndex((i) => (i + 1) % texts.length);
  
            // Step 3: Instantly move new text below and back (off-screen)
            api.start({
              rotateX: -90,
              translateY: 30,
              translateZ: -30, // 👈 simulate coming from far back
              opacity: 0,
              immediate: true,
            });
  
            // Step 4: Animate new text flipping up and into view
            api.start({
              rotateX: 0,
              translateY: 0,
              translateZ: 0,
              opacity: 1,
            });
          },
        });
      }, interval);
  
      return () => clearInterval(timer);
    }, [texts, interval, api]);
  
    return (
      <div
        style={{
          perspective: "1000px",
        //   height: "60px",
          overflow: "hidden",
          display: "inline-flex",
          alignItems: "flex-end",
          position: "relative",
        }}
      >
        <animated.div
          style={{
            transform: styles.rotateX.to((rx) => `rotateX(${rx}deg)`),
            transformOrigin: "bottom center",
            transformStyle: "preserve-3d",
            backfaceVisibility: "hidden",
            translateY: styles.translateY.to((y) => `${y}px`),
            translateZ: styles.translateZ.to((z) => `${z}px`), // 🛠️ Add translateZ to move top edge away
            opacity: styles.opacity,
          }}
        >
          <div
            style={{
            //   fontSize: "2rem",
              fontWeight: "bold",
              padding: "0 10px",
            }}
          >
            {texts[index]}
          </div>
        </animated.div>
      </div>
    );
  };

  export default TextFlipAnimation