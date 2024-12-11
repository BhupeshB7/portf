import React from "react";
import Spline from "@splinetool/react-spline";
import LeftSide from "./Home/LeftSide";
import RightSide from "./Home/RightSide";
function SplineComponent() {
  return (
    <main >
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
          <button className="work-button p-3 mt-4  pt-3 pb-2">
            {" "}
            Latest Work ↓
          </button>
        </div>
      </div>
    </main>
  );
}

export default SplineComponent;
