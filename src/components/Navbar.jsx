"use client";

import { useState } from "react";
import Link from "next/link";
import { RxHamburgerMenu } from "react-icons/rx";
import {
  FiSearch,
  FiMapPin,
  FiUser,
  FiHeart,
  FiShoppingBag,
} from "react-icons/fi";
import { useSelector } from "react-redux";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isPopupVisible, setPopupVisible] = useState(false);

  // Get cartProductsArr from redux store
  const { reduxCartProductsArr } = useSelector(state => state.products);
  const totalItems = reduxCartProductsArr.length; // Calculate the total amount of items in cart

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLinkClick = () => {
    setPopupVisible(true);
  };

  const closePopup = () => {
    setPopupVisible(false);
  };

  return (
    <>
      <nav
        style={navStyles}
        className="bg-white shadow-md border-b sticky top-0 left-0 right-0"
      >
        <div style={leftContainerStyles} className="flex items-center">
          <RxHamburgerMenu
            style={iconStyles}
            className="text-2xl text-gray-700 cursor-pointer"
            onClick={toggleMenu}
          />
        </div>
        <div style={brandStyles} className="text-xl font-bold text-blue-700">
          <Link href="/" style={{ color: "inherit", textDecoration: "none" }}>
            Micke&Micke
          </Link>
        </div>
        <div
          style={rightContainerStyles}
          className="flex items-center gap-4 text-xl text-gray-700"
        >
          <FiSearch style={iconStyles} />
          <FiMapPin style={iconStyles} />
          <FiUser style={iconStyles} />
          <FiHeart style={iconStyles} />
          <div style={{ position: "relative" }}>
            <Link href={"/cart-page"}>
              <FiShoppingBag style={iconStyles} />
            </Link>
            {totalItems > 0 && (
              <span
                style={{
                  position: "absolute",
                  top: "-10px",
                  right: "-10px",
                  backgroundColor: "red",
                  color: "white",
                  borderRadius: "50%",
                  padding: "2px 6px",
                  fontSize: "0.8rem",
                }}
              >
                {totalItems}
              </span>
            )}
          </div>
        </div>

        {/* Burger Menu Content */}
        {isOpen && (
          <div
            style={menuStyles}
            className="absolute top-14 left-0 w-48 bg-white border rounded-lg shadow-lg p-2"
          >
            <ul className="flex flex-col">
              <ol className="py-2 px-4 hover:bg-gray-100 rounded-md">
                <button
                  onClick={handleLinkClick}
                  className="block text-blue-700 font-bold hover:underline-none"
                >
                  Kläder
                </button>
              </ol>
              <ol className="py-2 px-4 hover:bg-gray-100 rounded-md">
                <button
                  onClick={handleLinkClick}
                  className="block text-blue-700 font-bold hover:underline-none"
                >
                  Nyheter
                </button>
              </ol>
              <ol className="py-2 px-4 hover:bg-gray-100 rounded-md">
                <button
                  onClick={handleLinkClick}
                  className="block text-blue-700 font-bold hover:underline-none"
                >
                  Skor
                </button>
              </ol>
              <ol className="py-2 px-4 hover:bg-gray-100 rounded-md">
                <button
                  onClick={handleLinkClick}
                  className="block text-blue-700 font-bold hover:underline-none"
                >
                  Junior
                </button>
              </ol>
            </ul>
          </div>
        )}
      </nav>

      {/* Popup Modal */}
      {isPopupVisible && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50"
          onClick={closePopup}
        >
          <div
            className="bg-white p-6 rounded-lg shadow-lg transform scale-0 animate-grow"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-lg font-bold">Product Details</h2>
            <p>Pop up</p>
            <button
              onClick={closePopup}
              className="mt-4 bg-red-500 text-white px-4 py-2 rounded"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
}

// Existing inline styling retained
const navStyles = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "10px 20px",
  backgroundColor: "#fff",
  borderBottom: "1px solid #ddd",
};

const leftContainerStyles = {
  display: "flex",
  alignItems: "center",
};

const brandStyles = {
  fontSize: "1.5rem",
  fontWeight: "bold",
  color: "#0052cc",
};

const rightContainerStyles = {
  display: "flex",
  alignItems: "center",
  gap: "20px",
};

const iconStyles = {
  fontSize: "1.5rem",
  cursor: "pointer",
  color: "#333",
};

const menuStyles = {
  position: "absolute",
  top: "60px",
  left: "0",
  width: "200px",
  backgroundColor: "#fff",
  boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
  padding: "10px",
};
