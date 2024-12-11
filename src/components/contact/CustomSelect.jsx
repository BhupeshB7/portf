import React, { useState } from "react";
import "./CustomStyles.css";

const CustomSelect = ({ options, onChange, placeholder }) => {
  const [selectedOption, setSelectedOption] = useState("");
  const [showOptions, setShowOptions] = useState(false);

  const handleSelect = (option) => {
    setSelectedOption(option.label);
    setShowOptions(false);
    onChange(option.value);
  };

  return (
    <div className="custom-select-container">
      <div
        className="custom-select"
        onClick={() => setShowOptions(!showOptions)}
      >
        {selectedOption || placeholder}
      </div>
      {showOptions && (
        <div className="custom-options">
          {options.map((option, index) => (
            <div
              key={index}
              className="custom-option"
              onClick={() => handleSelect(option)}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CustomSelect;
