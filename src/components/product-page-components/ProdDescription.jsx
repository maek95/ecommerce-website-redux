import { useState } from "react";

export default function ProdDescription({ description }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="w-full mx-auto">
      <button
        onClick={toggleAccordion}
        className=" p-4 bg-blue-500 text-white text-left rounded hover:bg-blue-700 focus:outline-none"
      >
        {isOpen ? "Hide Product Description" : "Show Product Description"}
      </button>
      {isOpen && (
        <div className="p-4 border border-t-0 border-blue-500 rounded-b bg-white">
          <p>{description}</p>
        </div>
      )}
    </div>
  );
}
