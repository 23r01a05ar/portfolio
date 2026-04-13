"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, Terminal } from "lucide-react";

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Stories", href: "#stories" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${
        scrolled ? "border-b-4 border-black bg-neo-bg" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-16">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 border-4 border-black bg-neo-accent px-3 py-1 shadow-neo-sm hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all duration-100"
        >
          <Terminal size={18} strokeWidth={3} />
          <span className="font-black text-sm uppercase tracking-widest">VALLABHA</span>
        </Link>

        {/* Desktop nav */}
        <ul className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="font-bold text-sm uppercase tracking-wider px-3 py-2 border-4 border-transparent hover:border-black hover:bg-neo-secondary hover:shadow-neo-sm transition-all duration-100"
              >
                {link.label}
              </a>
            </li>
          ))}
          <li>
            <Link
              href="/admin/login"
              className="ml-2 font-black text-xs uppercase tracking-widest px-3 py-2 border-4 border-black bg-neo-dark text-neo-bg hover:bg-neo-accent hover:text-black shadow-neo-sm active:translate-x-1 active:translate-y-1 active:shadow-none transition-all duration-100"
            >
              Admin
            </Link>
          </li>
        </ul>

        {/* Mobile hamburger */}
        <button
          className="md:hidden border-4 border-black p-2 shadow-neo-sm bg-white active:translate-x-1 active:translate-y-1 active:shadow-none transition-all duration-100"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X size={20} strokeWidth={3} /> : <Menu size={20} strokeWidth={3} />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden border-t-4 border-black bg-neo-bg">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="block font-bold text-sm uppercase tracking-wider px-6 py-4 border-b-4 border-black hover:bg-neo-secondary transition-colors"
            >
              {link.label}
            </a>
          ))}
          <Link
            href="/admin/login"
            className="block font-black text-sm uppercase tracking-widest px-6 py-4 bg-neo-dark text-neo-bg hover:bg-neo-accent hover:text-black transition-colors"
          >
            Admin Panel
          </Link>
        </div>
      )}
    </nav>
  );
}
