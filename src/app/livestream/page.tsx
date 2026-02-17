import SectionHeader from "@/components/SectionHeader";
import { getSiteData } from "@/lib/data";
import { Radio, Youtube, Facebook, Clock, MonitorPlay } from "lucide-react";

export const dynamic = "force-dynamic";

export default function LivestreamPage() {
  const { church, serviceSchedule } = getSiteData();

  const sundayServices = serviceSchedule.sunday || [];
  const mainService = sundayServices.find(
    (s) =>
      s.name.toLowerCase().includes("adoraci") ||
      s.name.toLowerCase().includes("servicio")
  );

  const hasLivestream = !!church.livestreamUrl;

  return (
    <>
      {/* Header */}
      <section className="bg-gradient-to-br from-luther-blue to-luther-blue-dark text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-4">
            <Radio className="w-10 h-10 text-luther-red" />
            <h1 className="text-4xl md:text-5xl font-bold">Transmisi&oacute;n en Vivo</h1>
          </div>
          <p className="text-luther-gold-light text-lg max-w-2xl">
            Sinton&iacute;ce nuestros servicios en l&iacute;nea desde cualquier lugar.
          </p>
        </div>
      </section>

      {/* Live Stream Embed */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            title="Servicio en Vivo"
            subtitle={
              mainService
                ? `Domingos a las ${mainService.time}`
                : "Domingos - Servicio de Adoraci\u00f3n"
            }
          />

          <div className="max-w-4xl mx-auto">
            {hasLivestream ? (
              <div className="aspect-video rounded-2xl overflow-hidden border border-gray-200 shadow-lg">
                <iframe
                  src={church.livestreamUrl}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  title="Transmisi&oacute;n en vivo - Iglesia Evang&eacute;lica Luterana Si&oacute;n"
                />
              </div>
            ) : (
              <div className="aspect-video bg-gray-900 rounded-2xl flex flex-col items-center justify-center text-center border border-gray-700">
                <MonitorPlay className="w-20 h-20 text-gray-600 mb-6" />
                <h3 className="text-2xl font-bold text-white mb-3">
                  No hay transmisi&oacute;n en vivo en este momento
                </h3>
                <p className="text-gray-400 max-w-md mb-2">
                  Nuestro pr&oacute;ximo servicio ser&aacute; transmitido en vivo:
                </p>
                {mainService && (
                  <div className="flex items-center gap-2 text-luther-gold text-lg font-semibold">
                    <Clock className="w-5 h-5" />
                    <span>Domingo, {mainService.time}</span>
                  </div>
                )}
                <p className="text-gray-500 text-sm mt-4">
                  {church.name}
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Links */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            title="S&iacute;ganos en L&iacute;nea"
            subtitle="Encuentre nuestras transmisiones en las siguientes plataformas"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
            {/* YouTube */}
            <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm text-center hover:shadow-md transition-shadow">
              <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-5">
                <Youtube className="w-8 h-8 text-red-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">YouTube</h3>
              <p className="text-gray-600 text-sm mb-5">
                Vea nuestros servicios grabados y transmisiones en vivo en nuestro
                canal de YouTube.
              </p>
              {church.youtube ? (
                <a
                  href={church.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-red-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors"
                >
                  <Youtube className="w-5 h-5" />
                  Ver Canal
                </a>
              ) : (
                <p className="text-gray-400 text-sm italic">
                  Canal de YouTube pr&oacute;ximamente
                </p>
              )}
            </div>

            {/* Facebook */}
            <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm text-center hover:shadow-md transition-shadow">
              <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-5">
                <Facebook className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Facebook</h3>
              <p className="text-gray-600 text-sm mb-5">
                Siga nuestra p&aacute;gina de Facebook para transmisiones en vivo,
                noticias y actualizaciones de la iglesia.
              </p>
              {church.facebook ? (
                <a
                  href={church.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                >
                  <Facebook className="w-5 h-5" />
                  Ver P&aacute;gina
                </a>
              ) : (
                <p className="text-gray-400 text-sm italic">
                  P&aacute;gina de Facebook pr&oacute;ximamente
                </p>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Service Info */}
      <section className="py-12 bg-luther-cream">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="text-lg font-bold text-luther-blue mb-2">
            Horario de Servicios Dominicales
          </h3>
          <div className="space-y-1">
            {sundayServices.map((service, i) => (
              <p key={i} className="text-luther-blue-light">
                <strong>{service.time}</strong> &mdash; {service.name}
              </p>
            ))}
          </div>
          <p className="mt-4 text-sm text-gray-500">
            {church.address} &middot; {church.phone}
          </p>
        </div>
      </section>
    </>
  );
}
