import React, { useState } from "react";
import "./card.css";

const Card = ({
  header,
  content,
  image,
  cardBorderColor,
  cardBoxshadow,
  isEven,
  icon,
  projectCardFlex,
}) => {
  const [styles, setStyles] = useState({
    transform: "rotateX(0deg) rotateY(0deg)",
    borderTop: "none",
    borderRight: "none",
    borderBottom: "none",
    borderLeft: "none",
  });
  const [shadowStyle, setShadowStyle] = useState({
    left: "50%",
    top: "50%",
    opacity: 0,
    width: "0px",
    height: "0px",
    blur: "0px",
  });

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * 20;
    const rotateY = ((x - centerX) / centerX) * 20;

    const shadowSize = Math.max(rect.width, rect.height) / 2;

    setShadowStyle({
      left: `${x - shadowSize / 4}px`,
      top: `${y - shadowSize / 4}px`,
      opacity: 1,
      width: `${shadowSize / 2}px`,
      height: `${shadowSize / 2}px`,
      blur: `${shadowSize}px`,
    });

    const isTop = y < rect.height / 4;
    const isBottom = y > (3 * rect.height) / 4;
    const isLeft = x < rect.width / 4;
    const isRight = x > (3 * rect.width) / 4;

    setStyles({
      transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
      borderTop:
        isTop || (isTop && (isLeft || isRight))
          ? `2px solid ${cardBorderColor}`
          : "none",
      borderBottom:
        isBottom || (isBottom && (isLeft || isRight))
          ? `2px solid ${cardBorderColor}`
          : "none",
      borderLeft:
        isLeft || (isLeft && (isTop || isBottom))
          ? `2px solid ${cardBorderColor}`
          : "none",
      borderRight:
        isRight || (isRight && (isTop || isBottom))
          ? `2px solid ${cardBorderColor}`
          : "none",
    });
  };

  const handleMouseLeave = () => {
    setStyles({
      transform: "rotateX(0deg) rotateY(0deg)",
      borderTop: "none",
      borderRight: "none",
      borderBottom: "none",
      borderLeft: "none",
    });
    setShadowStyle((prev) => ({ ...prev, opacity: 0 }));
  };

  return (
    <div
      className={`flex ${
        projectCardFlex
          ? isEven
            ? "md:flex-row-reverse md:gap-48 gap-12 flex-col"
            : "md:flex-row md:gap-48 gap-12 flex-col-reverse"
          : isEven
          ? "flex-col-reverse gap-6"
          : "flex-col gap-6"
      } items-center  p-6 rounded-xl shadow-lg transition-transform duration-300`}
      style={styles}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div
        className="absolute rounded-full pointer-events-none blur-xl"
        style={{
          ...shadowStyle,
          boxShadow: `${shadowStyle.left}px ${shadowStyle.top}px ${shadowStyle.blur} ${cardBoxshadow}`,
          backgroundColor: `${cardBorderColor}`,
        }}
      ></div>
      {icon && (
        <div
          style={{
            position: "absolute",
            left: "5px",
            top: "5px",
            border: `2px solid ${cardBorderColor}`,
            borderRadius: "50%",
            padding: "5px",
            zIndex: "1000 !important",
          }}
        >
          <img src={icon} alt={header} className="cardImg w-10 h-10 p-2 m-1" />
        </div>
      )}

      <>
        <div className="flex flex-col items-center justify-center">
          <p className="text-gray-300 text-lg card-content mt-2">{header}</p>
          <p className="text-gray-300 card-content mt-2">{content}</p>
        </div>
        {image && (
          <img
            src={image}
            alt={header}
            className={`text-sm mt-5 cardImg ${
              projectCardFlex ? "md:min-h-[500px]" : ""
            }`}
          />
        )}
      </>
    </div>
  );
};

export default Card;
