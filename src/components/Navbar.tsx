"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import LutherRose from "./LutherRose";

const links = [
  { href: "/", label: "Inicio" },
  { href: "/about", label: "Quiénes Somos" },
  { href: "/history", label: "Historia" },
  { href: "/ministries", label: "Ministerios" },
  { href: "/schedule", label: "Horario" },
  { href: "/events", label: "Eventos" },
  { href: "/sermons", label: "Sermones" },
  { href: "/new-visitor", label: "Soy Nuevo" },
  { href: "/contact", label: "Contacto" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="bg-white/95 backdrop-blur-sm shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center gap-2 text-luther-blue font-bold text-lg">
            <LutherRose size={32} />
            <span className="hidden sm:inline">IELA Sión</span>
          </Link>

          {/* Desktop */}
          <div className="hidden lg:flex items-center gap-0.5">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="px-2.5 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-luther-blue hover:bg-luther-cream transition-colors"
              >
                {l.label}
              </Link>
            ))}
            <Link
              href="/giving"
              className="ml-2 px-4 py-2 rounded-md text-sm font-semibold bg-luther-gold text-white hover:bg-luther-gold-dark transition-colors"
            >
              Ofrendar
            </Link>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setOpen(!open)}
            className="lg:hidden p-2 rounded-md text-gray-700 hover:bg-luther-cream"
            aria-label="Toggle menu"
          >
            {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="lg:hidden border-t bg-white">
          <div className="px-4 py-3 space-y-1">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-luther-blue hover:bg-luther-cream"
              >
                {l.label}
              </Link>
            ))}
            <Link
              href="/giving"
              onClick={() => setOpen(false)}
              className="block px-3 py-2 rounded-md text-base font-semibold text-luther-gold-dark hover:bg-luther-cream"
            >
              Ofrendar
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
