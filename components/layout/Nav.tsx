"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Works", href: "#works" },
  { label: "Blog", href: "#blog" },
  { label: "Contact", href: "#contact" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex justify-center px-4 pt-4">
      <nav
        className={`flex w-full max-w-5xl items-center justify-between rounded-2xl px-5 py-3 transition-all duration-300 ${
          scrolled
            ? "bg-white/80 shadow-lg shadow-black/[0.04] backdrop-blur-xl"
            : "bg-transparent"
        }`}
      >
        {/* Logo */}
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          className="flex items-center gap-2"
        >
          <Image
            src="/icon.webp"
            alt="おま"
            width={32}
            height={32}
            className="h-8 w-8 rounded-xl object-cover"
          />
          <span className="text-sm font-semibold tracking-tight text-text-primary">
            おまポートフォリオ
          </span>
        </a>

        {/* Desktop Links */}
        <div className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => (
            <button
              key={link.href}
              onClick={() => handleNavClick(link.href)}
              className="rounded-xl px-3.5 py-2 text-sm font-medium text-text-secondary transition-colors hover:bg-black/[0.04] hover:text-text-primary"
            >
              {link.label}
            </button>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="flex h-9 w-9 items-center justify-center rounded-xl transition-colors hover:bg-black/[0.04] md:hidden"
          aria-label="メニュー"
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
            className="text-text-primary"
          >
            {mobileOpen ? (
              <path
                d="M4.5 4.5L13.5 13.5M4.5 13.5L13.5 4.5"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            ) : (
              <>
                <path
                  d="M3 5.5H15"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
                <path
                  d="M3 9H15"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
                <path
                  d="M3 12.5H15"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </>
            )}
          </svg>
        </button>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="absolute top-[72px] left-4 right-4 z-40 rounded-2xl bg-white/90 p-2 shadow-lg shadow-black/[0.06] backdrop-blur-xl md:hidden"
          >
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => handleNavClick(link.href)}
                className="block w-full rounded-xl px-4 py-3 text-left text-sm font-medium text-text-secondary transition-colors hover:bg-black/[0.04] hover:text-text-primary"
              >
                {link.label}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
