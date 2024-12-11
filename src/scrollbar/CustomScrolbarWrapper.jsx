import React, { useState, useEffect, useRef } from "react";
import "./CustomScrollbar.css";

const CustomScrollbarWrapper = ({ children }) => {
  const [isScrolling, setIsScrolling] = useState(false);
  const scrollContainerRef = useRef(null);
  const scrollTimeoutRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolling(true);
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);

      // Hide scrollbar after 1 second of no scrolling
      scrollTimeoutRef.current = setTimeout(() => {
        setIsScrolling(false);
      }, 1000);

      if (scrollContainerRef.current) {
        const scrollTop = scrollContainerRef.current.scrollTop;
        const scrollHeight = scrollContainerRef.current.scrollHeight;
        const clientHeight = scrollContainerRef.current.clientHeight;

        const scrollbarThumbHeight = (clientHeight / scrollHeight) * 100;
        const thumbPosition = (scrollTop / scrollHeight) * 100;

        document.documentElement.style.setProperty(
          "--thumb-height",
          `${scrollbarThumbHeight}%`
        );
        document.documentElement.style.setProperty(
          "--thumb-position",
          `${thumbPosition}%`
        );
      }
    };

    const scrollContainer = scrollContainerRef.current;
    scrollContainer?.addEventListener("scroll", handleScroll);

    return () => {
      scrollContainer?.removeEventListener("scroll", handleScroll);
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
    };
  }, []);

  return (
    <div
      className="custom-scroll-wrapper"
      ref={scrollContainerRef}
      style={{ scrollSnapType: "y mandatory" }} // Enable snap scrolling
    >
      <div className={`custom-scrollbar ${isScrolling ? "show" : ""}`}>
        <div className={`custom-scrollbar-thumb`} />
      </div>
      {children}
    </div>
  );
};

export default CustomScrollbarWrapper;
