export default function Footer() {
  return (
    <footer className="bg-[#043ddb] text-white py-8 mt-24">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <div className="mb-4 md:mb-0">
          <h3 className="text-lg font-bold">Micke&Micke</h3>
          <p className="text-sm">© 2024 Micke&Micke. All rights reserved.</p>
        </div>

        {/* Links */}
        <div className="flex space-x-6 ">
          <a
            href="/about"
            className=" text-white hover:text-gray-400 hover:no-underline"
          >
            About Us
          </a>
          <a
            href="/services"
            className="text-white hover:text-gray-400 hover:no-underline"
          >
            Products
          </a>
          <a
            href="/contact"
            className="text-white hover:text-gray-400 hover:no-underline"
          >
            Contact
          </a>
        </div>
      </div>
    </footer>
  );
}
