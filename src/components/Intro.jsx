import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import ButtonIcon from "./IconComponents/ButtonIcon";
import SpinnerIcon from "./IconComponents/SpinnerIcon";
import CustomButton from "./CustomButton";
import {useSelector} from 'react-redux';

const circleVariants = {
  animate: {
    scale: [1, 1.2, 1], // Animate the scale for pulsating effect
    transition: {
      duration: 3,
      repeat: Infinity,
      repeatType: "mirror",
      ease: "easeInOut",
    },
  },
};

const textVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 300, damping: 24, duration: 1.5 }, // Increased duration
  },
};

const imageVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { type: "spring", stiffness: 300, damping: 24, duration: 1.5 }, // Increased duration
  },
};

const Intro = ({ profilePicture, profileBio, profileDescription }) => {
  const userData = useSelector(state => state.user);
  const {firstName, lastName} = userData;
  const { ref, inView } = useInView({
    triggerOnce: true, // Trigger animation only once
    threshold: 0.3, // Trigger when 30% of the component is visible
  });

  return (
    <div className="relative bg-[#242a2d] py-16 overflow-hidden" ref={ref}>
      <div className="absolute inset-0 flex justify-center items-center">
        <motion.svg
          variants={circleVariants}
          animate="animate"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 100 100"
          className="w-64 h-64 absolute"
          style={{
            top: "50%",
            left: "35%",
            transform: "translate(-50%, -50%)",
          }}
        >
          <circle cx="50" cy="50" r="30" fill="#2b799b" opacity="0.7" />
        </motion.svg>
        <motion.svg
          variants={circleVariants}
          animate="animate"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 100 100"
          className="w-48 h-48 absolute"
          style={{ top: "20%", left: "30%" }}
        >
          <circle cx="50" cy="50" r="30" fill="#2b799b" opacity="0.5" />
        </motion.svg>
        <motion.svg
          variants={circleVariants}
          animate="animate"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 100 100"
          className="w-32 h-32 absolute"
          style={{ top: "70%", left: "20%" }}
        >
          <circle cx="50" cy="50" r="30" fill="#2b799b" opacity="0.4" />
        </motion.svg>
      </div>
      <motion.div
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        variants={{
          visible: {
            transition: {
              staggerChildren: 0.3,
            },
          },
        }}
        className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            <motion.h2
              variants={textVariants}
              className="text-3xl font-poppins text-gray-100 mb-4"
            >
              <div className="flex items-center justify-center mb-4">
                <SpinnerIcon width="100" height="100" arrowColor="white" textColor="white"/>
                <h1 className="text-4xl font-nanum text-white font-bold ml-4">
                  {firstName} {lastName}                 
                </h1>
              </div>
              {profileBio}
            </motion.h2>
            <motion.p
              variants={textVariants}
              className="text-2xl font-jakarta font-normal text-gray-300 mb-6 leading-relaxed"
            >
              {profileDescription}
            </motion.p>
            <motion.div variants={textVariants}>
              <CustomButton text={"Message Me"} link={'contact'}/>
            </motion.div>
          </div>
          <motion.div variants={imageVariants} className="flex justify-center">
            <img
              src={profilePicture}
              alt="Profile Picture"
              className="w-full max-w-md rounded-lg shadow-lg"
            />
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default Intro;
