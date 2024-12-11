import React from "react"; 
import Projects from "./Projects";
function Work() {
  return (
    <div className="relative h-full w-full bg-black">
      {/* Background */}
      <div className="absolute inset-0   h-full w-full bg-[linear-gradient(to_right,#0a0a0a_1px,transparent_1px),linear-gradient(to_bottom,#0b0b0b_1px,transparent_1px)] bg-[size:6rem_4rem]">
        <div className="absolute bottom-0 left-0 right-0 top-0 bg-[radial-gradient(circle_500px_at_50%_200px,#0f1d26,transparent)]"></div>
      </div> 
  <Projects/>
    </div>
  );
}

export default Work;
