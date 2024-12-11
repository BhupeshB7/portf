import React, { useEffect, useRef } from "react";
import Typewriter from "typewriter-effect";
import { motion, useAnimation, useInView } from "framer-motion";
// import { useNavigate } from "react-router-dom";
const LeftSide = () => {
  // const navigate=useNavigate();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start({ opacity: 1, y: 0, scale: 1 });
    } else {
      controls.start({ opacity: 0, y: 75, scale: 1.4 });
    }
  }, [isInView, controls]);
  const downloadCv = () => {
    window.open("https://drive.google.com/file/d/1-g_5jP8B4E8Q0tL9k-RjyDmtjBkFors1/view?usp=drive_link", "_blank");

  };

  return (
    <div ref={ref} className="flex flex-col items-center max-h[300px] mt-5">
      <motion.h5
        initial={{ opacity: 0, y: 75, scale: 1.4 }}
        animate={controls}
        transition={{
          duration: 0.5,
          ease: "easeInOut",
          times: [0, 0.2, 0.5, 0.8, 1],
        }}
      >
        <motion.div className="min-h-[70px]  text-white text-xl ml-3  lg:mt-4 ">
          <span className="text-5xl p-2">👋</span> I'm
        </motion.div>
        <motion.p className="min-h-[100px] text-2xl lg:text-5xl xl:text-6xl 2xl:text-7xl bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent font-semibold">
          Bhupesh Kumar
        </motion.p>
      </motion.h5>
      <motion.h1 className="relative text-white text-lg mt-4">
        <Typewriter
          options={{
            strings: [
              "Fullstack developer",
              "MERN developer",
              "Javascript developer",
            ],
            autoStart: true,
            loop: true,
            cursor: "",
            wrapperClassName: "typewriter-text",
          }}
        />
      </motion.h1> 
      <button
        className="download-cv-button mt-4 rounded-xl"
        onClick={downloadCv}
      >
        View CV
      </button> 
    </div>
  );
};

export default LeftSide;
