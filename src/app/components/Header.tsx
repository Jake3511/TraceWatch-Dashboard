'use client'
import React from "react"
import Image from "next/image";
import Link from "next/link";

const Header: React.FC = () => {
  return (
    <header className="w-full border-b border-gray-200">
      {/* Top Banner */}
      <div className="w-full bg-gradient-to-r from-slate-800 to-purple-700 text-white text-center py-2 text-sm font-medium">
        Introducing TraceWatch: Unified metrics, logs, and performance insights
      </div>

      {/* Main Nav */}
      <div className="relative flex items-center justify-between max-w-7xl mx-auto px-6 py-4 pb-4">

        {/* Left Nav */}
        <nav className="flex items-center gap-8 text-sm font-semibold text-slate-900">
          <Link href="#">PRODUCT</Link>
          <Link href="#">CONTACT</Link>
        </nav>

        {/* Center Logo (absolute centered) */}
        <div className="absolute left-1/2 -translate-x-1/2">
          <Link href="/">
            <Image
              src= "/TraceWatch_Logo.png"
              alt="Logo"
              width={60}
              height={60}
            />
          </Link>
        </div>

        {/* Right Nav */}
        <nav className="flex items-center gap-6 text-sm font-semibold text-slate-900">
          <Link href="/about">ABOUT</Link>
          <Link href="#">DOCS</Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
