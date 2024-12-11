import React from "react";
import CustomScrollbarWrapper from "./scrollbar/CustomScrolbarWrapper";
import NeonCursor from "./components/NeonCursor"; 
import useSmoothScroll from "./hooks/useSmoothScroll";
import Hero from "./components/Home/Hero";
import "./App.css";
import Work from "./components/Work";
function App() {
  useSmoothScroll();
  return (
    <div>
      <NeonCursor /> 
      <Hero />
      <Work />
    </div>
  );
}

export default App;
