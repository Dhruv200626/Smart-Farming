import React from "react";
import { motion } from "framer-motion";
import { Link, useLocation } from "react-router-dom";

function Navbar() {
  const location = useLocation();

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Crop", path: "/crop" }
  ];

  return (
    <div className="sticky top-0 left-0 w-full z-50 px-6 py-4">

      <div className="max-w-7xl mx-auto flex justify-between items-center 
        backdrop-blur-lg bg-white/5 border border-white/10 
        rounded-2xl px-6 py-3 shadow-lg">

        {/* Logo */}
        <h1 className="text-xl font-bold tracking-wide">
          🌾 SmartAI
        </h1>

        {/* Links */}
        <div className="flex gap-8 relative">
          {navItems.map((item) => (
            <Link key={item.path} to={item.path} className="relative">

              <span className="text-gray-300 hover:text-white transition">
                {item.name}
              </span>

              {location.pathname === item.path && (
                <motion.div
                  layoutId="underline"
                  className="absolute left-0 right-0 -bottom-1 h-[2px] bg-green-400 rounded"
                />
              )}

            </Link>
          ))}
        </div>

      </div>
    </div>
  );
}

export default Navbar;