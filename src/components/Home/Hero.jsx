import React, { useRef } from "react";
import Spline from "@splinetool/react-spline";
import LeftSide from "./LeftSide";
import RightSide from "./RightSide";
import Project from "../Project";

function Hero() {
  const containerRef = useRef(null);
const handleScrollToTop = () => {
  containerRef.current.scrollIntoView({ behavior: "smooth" });
};
  return (
    <main>
      <Spline
        scene="https://prod.spline.design/BcLhsK4dHXqwrbZB/scene.splinecode"
        style={{ width: "100vw", height: "100vh" }}
      />
      <div>
        <div className="absolute inset-0 flex flex-col">
          <div className="hero flex flex-col  md:flex-row gap-16 md:gap-16 lg:gap-48 items-center justify-center h-[80%] lg:h-[90%] w-full">
            <LeftSide />
            <RightSide />
          </div>
          <button
            className="work-button p-3 mt-4  pt-3 pb-2"
            onClick={handleScrollToTop}
          >
            {" "}
            Latest Work ↓
          </button>
        </div>
      </div>
      <Project containerRef={containerRef} />
    </main>
  );
}

export default Hero;
