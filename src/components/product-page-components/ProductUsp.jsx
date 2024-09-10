import { FaArrowAltCircleLeft, FaTruck } from "react-icons/fa";

export default function ProductUsp() {
  return (
    <div className="flex flex-col mt-4 mb-20">
      <div className="flex items-center space-x-3 space-y-1">
        <FaTruck size={20} />
        <h3 className="font-normal">Free shipping on orders over 450kr</h3>
      </div>
      <div className="flex items-center space-x-3 space-y-1">
        <FaArrowAltCircleLeft size={20} />
        <h3 className="font-normal">100 day return</h3>
      </div>
    </div>
  );
}
