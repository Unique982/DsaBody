"use client";

import { Mail, Phone, MapPin, Send } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-white text-gray-700 pt-16 pb-10 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        <div>
          <h2 className="text-2xl font-extrabold text-sky-600 mb-3">
            CodeStudio
          </h2>
          <p className="text-gray-600 leading-relaxed">
            Build, run, and test code in 20+ languages with our powerful online
            code editor. Fast, modern, and made for developers & students.
          </p>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Quick Links
          </h3>

          <ul className="space-y-2">
            <li>
              <a href="#" className="hover:text-sky-600 transition">
                Home
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-sky-600 transition">
                About Us
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-sky-600 transition">
                Features
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-sky-600 transition">
                Tutorials
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-sky-600 transition">
                Contact
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Contact Us
          </h3>

          <ul className="space-y-3 text-gray-700">
            <li className="flex items-start gap-2">
              <MapPin size={20} className="text-sky-600 mt-1" />
              <span>Kathmandu, Nepal</span>
            </li>

            <li className="flex items-start gap-2">
              <Phone size={20} className="text-sky-600 mt-1" />
              <span>+977 9864728224</span>
            </li>

            <li className="flex items-start gap-2">
              <Mail size={20} className="text-sky-600 mt-1" />
              <span>support@dsa.body.com</span>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Subscribe
          </h3>

          <p className="text-gray-600 mb-3">
            Get coding tutorials, DSA problems, and project ideas every week.
          </p>

          <div className="flex items-center bg-gray-100 rounded-xl overflow-hidden border border-gray-300">
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full px-4 py-3 bg-transparent text-gray-700 focus:outline-none"
            />
            <button className="bg-sky-600 hover:bg-sky-700 px-4 py-3 flex items-center justify-center transition">
              <Send size={18} className="text-white" />
            </button>
          </div>
        </div>
      </div>
      <div className="mt-14 border-t border-gray-300 pt-6 text-center text-gray-500">
        © 2025 CodeStudio. All Rights Reserved.
      </div>
    </footer>
  );
}
