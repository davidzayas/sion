import Link from "next/link";
import { Phone, Mail, MapPin, Facebook, Youtube } from "lucide-react";
import LutherRose from "./LutherRose";

export default function Footer() {
  return (
    <footer className="bg-luther-blue-dark text-blue-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <LutherRose size={40} />
              <span className="text-white font-bold text-lg">IELA Sión</span>
            </div>
            <p className="text-sm text-blue-200/70 mb-4">
              Una comunidad de fe sirviendo a Bayamón desde 1907.
            </p>
            <div className="flex items-center gap-3">
              <a
                href="https://www.facebook.com/Iglesia-Evangélica-Luterana-Sion"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-200/70 hover:text-luther-gold transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="text-blue-200/70 hover:text-luther-gold transition-colors"
                aria-label="YouTube"
              >
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Iglesia</h3>
            <ul className="space-y-2 text-sm">
              {[
                { href: "/about", label: "Quiénes Somos" },
                { href: "/history", label: "Historia" },
                { href: "/ministries", label: "Ministerios" },
                { href: "/sermons", label: "Sermones" },
                { href: "/gallery", label: "Galería" },
              ].map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="hover:text-luther-gold transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* More links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Visitantes</h3>
            <ul className="space-y-2 text-sm">
              {[
                { href: "/new-visitor", label: "Soy Nuevo" },
                { href: "/schedule", label: "Horario Semanal" },
                { href: "/events", label: "Eventos" },
                { href: "/giving", label: "Ofrendar" },
                { href: "/prayer-wall", label: "Muro de Oración" },
                { href: "/youth", label: "Jóvenes" },
                { href: "/livestream", label: "En Vivo" },
              ].map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="hover:text-luther-gold transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold mb-4">Contacto</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 mt-0.5 text-luther-gold shrink-0" />
                <span>Calle Dr. Hiram González #211, Bayamón, PR 00959</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-luther-gold shrink-0" />
                <span>(787) 785-2008</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-luther-gold shrink-0" />
                <span>ielasion@hotmail.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-blue-800/50 mt-8 pt-8 text-center text-sm text-blue-300/50">
          © {new Date().getFullYear()} Iglesia Evangélica Luterana Sión. Todos los derechos reservados.
        </div>
      </div>
    </footer>
  );
}
