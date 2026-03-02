import React from "react";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaYoutube,
  FaPinterestP,
  FaLinkedinIn
} from "react-icons/fa";

import mainLogo from "../../assets/main-icon.png"; // adjust path if needed

const Footer = () => {
  return (
    <footer className="bg-[#333545] text-white py-12 px-6">
      <div className="max-w-screen-xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between border-b border-gray-600 pb-8 mb-8">
          <div className="flex items-center gap-4 mb-6 md:mb-0">
            <img src={mainLogo} alt="Logo" className="h-10 opacity-80" />
            <h2 className="text-2xl font-bold tracking-tight">BOOKMY<span className="text-[#f84464]">SCREEN</span></h2>
          </div>

          <div className="flex gap-4">
            {[FaFacebookF, FaTwitter, FaInstagram, FaYoutube, FaPinterestP, FaLinkedinIn].map((Icon, index) => (
              <div key={index} className="w-10 h-10 rounded-full bg-[#1f212a] flex items-center justify-center hover:bg-[#f84464] transition-all cursor-pointer transform hover:-translate-y-1 shadow-md">
                <Icon className="w-5 h-5" />
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12 text-sm text-gray-400">
          <div className="space-y-3">
            <h4 className="text-white font-bold uppercase tracking-wider text-xs">Quick Links</h4>
            <p className="hover:text-white cursor-pointer transition-colors">Movies Near You</p>
            <p className="hover:text-white cursor-pointer transition-colors">Latest Events</p>
            <p className="hover:text-white cursor-pointer transition-colors">Upcoming Plays</p>
          </div>
          <div className="space-y-3">
            <h4 className="text-white font-bold uppercase tracking-wider text-xs">Support</h4>
            <p className="hover:text-white cursor-pointer transition-colors">Help Center</p>
            <p className="hover:text-white cursor-pointer transition-colors">Terms of Service</p>
            <p className="hover:text-white cursor-pointer transition-colors">Privacy Policy</p>
          </div>
          <div className="space-y-3">
            <h4 className="text-white font-bold uppercase tracking-wider text-xs">Business</h4>
            <p className="hover:text-white cursor-pointer transition-colors">Partner With Us</p>
            <p className="hover:text-white cursor-pointer transition-colors">Corporate Booking</p>
            <p className="hover:text-white cursor-pointer transition-colors">Gift Cards</p>
          </div>
          <div className="space-y-3">
            <div className="bg-[#4a4d5e] p-4 rounded-lg">
              <p className="text-white font-bold mb-1">Customer Support</p>
              <p>24/7 Assistance for all your booking queries.</p>
            </div>
          </div>
        </div>

        <div className="text-center pt-8 border-t border-gray-700">
          <p className="text-xs text-gray-500 leading-relaxed max-w-4xl mx-auto">
            Copyright 2026 © BookMyScreen Pvt Ltd. All Rights Reserved.
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
