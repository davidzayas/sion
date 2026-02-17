import Link from "next/link";
import { Clock, MapPin, Phone } from "lucide-react";
import LutherRose from "./LutherRose";
import { getSiteData } from "@/lib/data";

export default function Hero() {
  const { church, serviceSchedule } = getSiteData();
  const sundayService = serviceSchedule.sunday[1];

  return (
    <section className="relative bg-gradient-to-br from-luther-blue via-luther-blue-dark to-gray-900 text-white overflow-hidden">
      {/* Luther Rose watermark */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/4 opacity-[0.06]">
        <LutherRose size={500} />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 md:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 items-center">
          {/* Left: Main content */}
          <div className="lg:col-span-3">
            <div className="flex items-center gap-3 mb-4">
              <LutherRose size={40} />
              <div className="h-7 w-px bg-luther-gold/40" />
              <p className="text-luther-gold-light font-medium tracking-wide uppercase text-xs">
                Sirviendo a Bayamón desde 1907
              </p>
            </div>
            <h1 className="text-3xl md:text-5xl font-bold mb-4 leading-tight">
              Iglesia Evangélica<br />Luterana Sión
            </h1>
            <p className="text-base md:text-lg text-blue-100/90 mb-6 max-w-xl">
              Una comunidad de fe donde todos son bienvenidos. Únete a nosotros cada domingo para crecer juntos en la Palabra de Dios.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/new-visitor"
                className="bg-luther-gold text-white px-5 py-2.5 rounded-lg font-semibold text-sm hover:bg-luther-gold-dark transition-colors shadow-lg"
              >
                Soy Nuevo
              </Link>
              <Link
                href="/schedule"
                className="border-2 border-luther-gold/50 text-white px-5 py-2.5 rounded-lg font-semibold text-sm hover:bg-white/10 transition-colors"
              >
                Horario de Servicios
              </Link>
            </div>
          </div>

          {/* Right: Key info card */}
          <div className="lg:col-span-2">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/15 space-y-4">
              {sundayService && (
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 bg-luther-gold/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Clock className="w-5 h-5 text-luther-gold" />
                  </div>
                  <div>
                    <p className="text-xs text-blue-200/70 uppercase font-medium tracking-wide">Servicio Dominical</p>
                    <p className="text-white font-bold">{sundayService.time}</p>
                    <p className="text-blue-100/70 text-sm">{sundayService.description}</p>
                  </div>
                </div>
              )}
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 bg-luther-gold/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-5 h-5 text-luther-gold" />
                </div>
                <div>
                  <p className="text-xs text-blue-200/70 uppercase font-medium tracking-wide">Ubicación</p>
                  <p className="text-white font-bold text-sm">{church.address}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 bg-luther-gold/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Phone className="w-5 h-5 text-luther-gold" />
                </div>
                <div>
                  <p className="text-xs text-blue-200/70 uppercase font-medium tracking-wide">Contacto</p>
                  <p className="text-white font-bold">{church.phone}</p>
                  <p className="text-blue-100/70 text-sm">Oficina: {church.officeHours}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
