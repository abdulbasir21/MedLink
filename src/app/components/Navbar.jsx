"use client";

import { useState } from "react";
import Link from "next/link";
import { IoMdMenu, IoMdClose } from "react-icons/io";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Doctors", href: "/AllDoctors" },
    { name: "About", href: "/AboutPage" },
  ];

  return (
    <nav className="bg-white shadow-md fixed w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="flex items-center" onClick={() => setIsOpen(false)}>
              <span className="font-bold text-xl text-blue-600">MedLink</span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-6 items-center">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-gray-700 hover:text-blue-600"
              >
                {link.name}
              </Link>
            ))}
            <Link
              href="/appointment"
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
            >
              Book Appointment
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? (
                <IoMdClose className="h-6 w-6 text-gray-700" />
              ) : (
                <IoMdMenu className="h-6 w-6 text-gray-700" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white shadow-md">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)} // ✅ closes menu
                className="block px-3 py-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-gray-100"
              >
                {link.name}
              </Link>
            ))}
            <Link
              href="/appointment"
              onClick={() => setIsOpen(false)} // ✅ closes menu
              className="block px-3 py-2 rounded-md bg-blue-600 text-white text-center hover:bg-blue-700"
            >
              Book Appointment
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
