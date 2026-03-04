import React from "react";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaYoutube,
  FaPinterestP,
  FaLinkedinIn
} from "react-icons/fa";

import mainLogo from "../../assets/VenueFy.png"; // adjust path if needed

const Footer = () => {
  return (
    <footer className="bg-[#333545] text-white py-12 px-6">
      <div className="max-w-screen-xl mx-auto">
        <div className="text-center pt-8 border-t border-gray-700">
          <p className="text-xs text-gray-500 leading-relaxed max-w-4xl mx-auto">
            Copyright 2026 © VenueFy Pvt Ltd. All Rights Reserved.
            <br className="my-2" />
            The content and images used on this site are copyright protected and copyrights vests with the respective owners.
            The usage of the content and images on this website is intended to promote the works and no endorsement of the artist shall be implied.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
