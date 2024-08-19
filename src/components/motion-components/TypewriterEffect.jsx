"use client";

import { cn } from "../../lib/utils";
import { motion, stagger, useAnimate, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const TypewriterEffect = ({ words, className, cursorClassName }) => {
  // Split the words into an array of characters
  const wordsArray = words.split(" ");

  const [scope, animate] = useAnimate();
  const inViewRef = useRef(null);
  const isInView = useInView(inViewRef);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (isInView && !hasAnimated) {
      animate(
        "span",
        {
          display: "inline-block",
          opacity: 1,
          width: "fit-content",
        },
        {
          duration: 0.1,
          delay: stagger(0.05),
          ease: "easeInOut",
        }
      );
      setHasAnimated(true);
    }
  }, [isInView, hasAnimated]);

  const renderWords = () => {
    return (
      <motion.div ref={scope} className="inline">
        {wordsArray.map((word, idx) => (
          <span key={`word-${idx}`} className="inline-block">
            {word.split("").map((char, charIdx) => (
              <motion.span
                initial={{}}
                key={`char-${charIdx}`}
                className="opacity-0"
              >
                {char}
              </motion.span>
            ))}
            &nbsp;
          </span>
        ))}
      </motion.div>
    );
  };

  return (
    <div className={cn(className)} ref={inViewRef}>
      {renderWords()}
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          duration: 0.5,
          repeat: Infinity,
          repeatType: "reverse",
        }}
       
      ></motion.span>
    </div>
  );
};

export default TypewriterEffect;
