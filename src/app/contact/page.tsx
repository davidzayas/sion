import SectionHeader from "@/components/SectionHeader";
import { getSiteData } from "@/lib/data";
import { MapPin, Phone, Mail, Clock, Facebook } from "lucide-react";

export const dynamic = "force-dynamic";

export default function ContactPage() {
  const { church } = getSiteData();

  return (
    <>
      {/* Header */}
      <section className="bg-gradient-to-br from-luther-blue to-gray-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Contáctenos</h1>
          <p className="text-luther-gold-light text-lg max-w-2xl">
            Estamos aquí para servirle. No dude en comunicarse con nosotros.
          </p>
        </div>
      </section>

      {/* Contact Info + Map */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Details */}
            <div>
              <SectionHeader title="Información de Contacto" centered={false} />

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-luther-cream rounded-lg flex items-center justify-center shrink-0">
                    <MapPin className="w-6 h-6 text-luther-blue" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">Dirección Física</h3>
                    <p className="text-gray-600">{church.address}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-luther-cream rounded-lg flex items-center justify-center shrink-0">
                    <Mail className="w-6 h-6 text-luther-blue" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">Dirección Postal</h3>
                    <p className="text-gray-600">{church.mailingAddress}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-luther-cream rounded-lg flex items-center justify-center shrink-0">
                    <Phone className="w-6 h-6 text-luther-blue" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">Teléfono / Fax</h3>
                    <p className="text-gray-600">{church.phone}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-luther-cream rounded-lg flex items-center justify-center shrink-0">
                    <Mail className="w-6 h-6 text-luther-blue" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">Correo Electrónico</h3>
                    <p className="text-gray-600">{church.email}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-luther-cream rounded-lg flex items-center justify-center shrink-0">
                    <Clock className="w-6 h-6 text-luther-blue" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">Horas de Oficina</h3>
                    <p className="text-gray-600">{church.officeHours}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-luther-cream rounded-lg flex items-center justify-center shrink-0">
                    <Facebook className="w-6 h-6 text-luther-blue" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">Redes Sociales</h3>
                    <a
                      href={church.facebook}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-luther-blue hover:text-luther-blue-dark font-medium"
                    >
                      Síguenos en Facebook
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Map placeholder */}
            <div>
              <SectionHeader title="Ubicación" centered={false} />
              <div className="bg-gray-100 rounded-2xl overflow-hidden h-96 border border-gray-200">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3784.8!2d-66.15!3d18.4!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sBayam%C3%B3n%2C+Puerto+Rico!5e0!3m2!1sen!2sus!4v1"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Ubicación de la iglesia"
                />
              </div>
              <p className="text-gray-500 text-sm mt-3">
                Calle Dr. Hiram González #211, Bayamón, PR 00959
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Prayer Request */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center">
            <SectionHeader
              title="Petición de Oración"
              subtitle="¿Necesitas oración? Estamos aquí para ti."
            />
            <p className="text-gray-600 mb-6">
              Si deseas que oremos por ti o por un ser querido, no dudes en
              comunicarte con nuestra oficina. Tu petición será tratada con
              confidencialidad y amor.
            </p>
            <a
              href={`mailto:${church.email}?subject=Petición de Oración`}
              className="inline-block bg-luther-blue text-white px-8 py-3 rounded-lg font-semibold hover:bg-luther-blue-dark transition-colors"
            >
              Enviar Petición
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
