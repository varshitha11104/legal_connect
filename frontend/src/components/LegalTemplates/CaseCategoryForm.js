// components/CaseCategoryForm.js
import React, { useState } from "react";
import CategoryPopup from "./CategoryPopup";
import ContractForm from "./ContractForm";
import DivorceForm from "./DivorceForm";
import RealEstateForm from "./RealEstateForm";
import LandPurchaseForm from "./LandPurchaseForm";
import CriminalForm from "./CriminalForm";
import CivilForm from "./CivilForm";

const CaseCategoryForm = () => {
  const [selectedCategory, setSelectedCategory] = useState("");

  const handleSelectCategory = (category) => {
    setSelectedCategory(category);
  };

  return (
    <div>
      {!selectedCategory && <CategoryPopup onSelectCategory={handleSelectCategory} />}
      {selectedCategory === "Contract" && <ContractForm onSelectCategory={handleSelectCategory}/>}
      {selectedCategory === "Divorce" && <DivorceForm onSelectCategory={handleSelectCategory} />}
      {selectedCategory === "Land Purchase" && <LandPurchaseForm onSelectCategory={handleSelectCategory} />}
      {selectedCategory === "Real Estate" && <RealEstateForm onSelectCategory={handleSelectCategory} />}
      {selectedCategory === "Criminal" && <CriminalForm onSelectCategory={handleSelectCategory} />}
      {selectedCategory === "Civil" && <CivilForm onSelectCategory={handleSelectCategory} />}
    </div>
  );
};

export default CaseCategoryForm;
