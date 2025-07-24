import React from "react";
import "../../css/PopupStyles.css";

const CategoryPopup = ({ onSelectCategory }) => {
  // Include all available legal form categories
  const categories = [
    "Contract",
    "Divorce",
    // "Real Estate",
    "Land Purchase",
    "Criminal",
    "Civil"
  ];

  return (
    <div className="popup-container">
      <h2>Select Case Category</h2>
      <div className="category-buttons">
        {categories.map((category) => (
          <button
            key={category}
            className="popup-button"
            onClick={() => onSelectCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategoryPopup;
