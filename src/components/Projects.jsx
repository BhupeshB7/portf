import React from "react";
import { motion, useAnimation } from "framer-motion";
import Lenis from "@studio-freight/lenis";
import Card from "./Card";
import { useInView } from "react-intersection-observer";
import img1 from "../assets/skills.png";

const Projects = () => {
  const lenis = React.useRef(
    new Lenis({
      duration: 1.2,
      easing: (t) => t * (2 - t),
    })
  );

  const animateScroll = (time) => {
    lenis.current.raf(time);
    requestAnimationFrame(animateScroll);
  };

  React.useEffect(() => {
    requestAnimationFrame(animateScroll);
    return () => {
      lenis.current.destroy();
    };
  }, []);

  const cardData = [
    {
      header: "Frontend Developer",
      content:
        "A frontend developer specializes in creating engaging and interactive web interfaces.",
      image: img1,
      cardBorderColor: "#47ffa3",
      cardBoxshadow: "#9bffcd",
      isEven: false,
      projectCardFlex: true,
    },
    {
      header: "Frontend Developer",
      content:
        "A frontend developer specializes in creating engaging and interactive web interfaces.",
      image: img1,
      cardBorderColor: "#6f42c1",
      cardBoxshadow: "#b791ff",
      isEven: true,
      projectCardFlex: true,
    },
  ];

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.9, y: 50 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
    exit: { opacity: 0, scale: 0.9, y: -50 },
  };

  return (
    <div 
      className="h-[100%] w-full flex flex-col items-center gap-6 mt-5"
      style={{ zIndex: "1000 !important" }}
    >
      {cardData.map((card, index) => {
        const controls = useAnimation();
        const [ref, inView] = useInView({ threshold: 0.7 });

        React.useEffect(() => {
          if (inView) {
            controls.start("visible");
          } else {
            controls.start("hidden");
          }
        }, [controls, inView]);

        return (
          <motion.div
            key={index}
            ref={ref}
            variants={cardVariants}
            initial="hidden"
            animate={controls}
            className="w-full  max-w-[90%] min-h-[400px]"
          >
            <Card {...card} />
          </motion.div>
        );
      })}
    </div>
  );
};

export default Projects;
