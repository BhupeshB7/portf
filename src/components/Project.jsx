import React from "react";
import Card from "./Card";
import skillsImg from "../assets/skills.png";
import skills1Img from "../assets/skills1.png";
import about1 from "../assets/about1.png";
import Lenis from "@studio-freight/lenis";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
function Project({containerRef}) {
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
      image:skillsImg,
      cardBorderColor: "#63f355",
      cardBoxshadow: "#63f355",
      isEven: false, 
    },
    {
      header: "Frontend Developer",
      content:
        "A frontend developer specializes in creating engaging and interactive web interfaces.",
      image: skills1Img,
      cardBorderColor: "#ffa948",
      cardBoxshadow: "#ffc380",
      isEven: true, 
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
    <div ref={containerRef} className="relative h-full w-full bg-black  overflow-y-hidden   overflow-x-hidden">
      <div className="absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"></div>
      <div className="absolute left-0 right-0 top-[-10%] h-full w-[100%] rounded-full bg-[radial-gradient(circle_400px_at_50%_300px,#fbfbfb36,#000)]"></div>

      <div className="h-full grid grid-cols-1 md:grid-cols-2 gap-8 mx-auto py-8 max-w-[95%] lg:max-w-[90%] lg:px-16 lg:py-16">
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
            >
              <Card {...card} />
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

export default Project;
