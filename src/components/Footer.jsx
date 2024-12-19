// FooterComponent.js
import React from "react";
import { FaFacebookF, FaTwitter, FaGithub, FaLinkedinIn, FaInstagram } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-stone-950 text-gray-600">
      <div className="flex justify-center py-6">
        <button className=" text-white px-6 py-2 rounded-lg text-xl md:text-2xl shadow border border-amber-700">
          Join Our Community
        </button>
      </div>

      <div className="container mx-auto px-6 text-center">
        <div className="flex flex-col items-center space-y-4">
        <div className="-mx-5">
   <span className="relative left-5  bg-red-600 px-3 py-1 rounded-r-3xl rounded-l-lg text-black font-semibold">
      SOBUJ
    </span>
    <span className="bg-green-600 pl-6 pr-2 py-1 rounded-lg text-black font-semibold">
      BANGLA
    </span>
   </div>
          <ul className="flex space-x-2 md:space-x-6">
            {[
              "About",
              "Review",
              "Services",
              "Partners",
              "Help",
              "Terms",
            ].map((link) => (
              <li key={link} className="hover:text-blue-600 cursor-pointer">
                {link}
              </li>
            ))}
          </ul>
        </div>

        {/* Social Media Icons */}
        <div className="flex justify-center space-x-6 py-6">
          <a href="#" className="text-gray-600 hover:text-blue-600">
            <FaFacebookF size={20} />
          </a>
          <a href="#" className="text-gray-600 hover:text-blue-600">
            <FaTwitter size={20} />
          </a>
          <a href="#" className="text-gray-600 hover:text-blue-600">
            <FaGithub size={20} />
          </a>
          <a href="#" className="text-gray-600 hover:text-blue-600">
            <FaLinkedinIn size={20} />
          </a>
          <a href="#" className="text-gray-600 hover:text-blue-600">
            <FaInstagram size={20} />
          </a>
        </div>

        {/* Footer Copyright */}
        <p className="text-sm text-gray-500">
          Sobuj Bangla restaurant established in 2010. All rights reserved.
        </p> 
      </div>
    </footer>
  );
};

export default Footer;
