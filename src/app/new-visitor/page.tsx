import SectionHeader from "@/components/SectionHeader";
import LutherRose from "@/components/LutherRose";
import { getSiteData } from "@/lib/data";
import {
  Music,
  Shirt,
  Baby,
  Car,
  Clock,
  MapPin,
  Phone,
  Mail,
  HelpCircle,
} from "lucide-react";

export const dynamic = "force-dynamic";

export default function NewVisitorPage() {
  const { church, serviceSchedule } = getSiteData();

  const sundayServices = serviceSchedule.sunday || [];

  return (
    <>
      {/* Header */}
      <section className="bg-gradient-to-br from-luther-blue to-luther-blue-dark text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <LutherRose size={72} className="mx-auto mb-6" />
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            &iexcl;Bienvenido a Si&oacute;n!
          </h1>
          <p className="text-luther-gold-light text-lg max-w-2xl mx-auto">
            Nos alegra que est&eacute; considerando visitarnos. Aqu&iacute; encontrar&aacute;
            todo lo que necesita saber para su primera visita.
          </p>
        </div>
      </section>

      {/* What to Expect */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            title="&iquest;Qu&eacute; Puede Esperar?"
            subtitle="Queremos que se sienta c&oacute;modo y bienvenido desde el primer momento"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm text-center">
              <div className="w-14 h-14 bg-luther-blue/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Music className="w-7 h-7 text-luther-blue" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Estilo de Adoraci&oacute;n</h3>
              <p className="text-gray-600 text-sm">
                Nuestros servicios combinan la rica tradici&oacute;n lit&uacute;rgica luterana
                con himnos cl&aacute;sicos y m&uacute;sica coral. La celebraci&oacute;n eucar&iacute;stica
                es el centro de nuestra adoraci&oacute;n dominical.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm text-center">
              <div className="w-14 h-14 bg-luther-gold/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shirt className="w-7 h-7 text-luther-gold-dark" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Vestimenta</h3>
              <p className="text-gray-600 text-sm">
                Venga como se sienta c&oacute;modo. Algunos miembros visten formal y
                otros casual. Lo importante es que est&eacute; aqu&iacute;, no lo que vista.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm text-center">
              <div className="w-14 h-14 bg-luther-red/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Baby className="w-7 h-7 text-luther-red" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Ni&ntilde;os Bienvenidos</h3>
              <p className="text-gray-600 text-sm">
                Los ni&ntilde;os son una bendici&oacute;n y siempre son bienvenidos.
                Tenemos Escuela B&iacute;blica dominical para ni&ntilde;os y adultos
                a las 10:00 a.m.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm text-center">
              <div className="w-14 h-14 bg-luther-blue/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Car className="w-7 h-7 text-luther-blue" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Estacionamiento</h3>
              <p className="text-gray-600 text-sm">
                Contamos con estacionamiento disponible en las facilidades de la
                iglesia. Nuestros ujieres le ayudar&aacute;n a encontrar espacio.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Plan Your Visit */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            title="Planifique Su Visita"
            subtitle="Horarios y ubicaci&oacute;n de nuestros servicios"
          />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Service Times */}
            <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm">
              <div className="flex items-center gap-3 mb-6">
                <Clock className="w-6 h-6 text-luther-gold-dark" />
                <h3 className="text-xl font-bold text-gray-900">Horario Dominical</h3>
              </div>
              <div className="space-y-4">
                {sundayServices.map((service, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-3 p-3 rounded-lg bg-luther-cream/50"
                  >
                    <div className="shrink-0 mt-0.5">
                      <div className="w-2.5 h-2.5 bg-luther-gold rounded-full" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">{service.name}</p>
                      <p className="text-luther-blue text-sm font-medium">
                        {service.time}
                      </p>
                      <p className="text-gray-500 text-sm">{service.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Location */}
            <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm">
              <div className="flex items-center gap-3 mb-6">
                <MapPin className="w-6 h-6 text-luther-red" />
                <h3 className="text-xl font-bold text-gray-900">Ubicaci&oacute;n</h3>
              </div>
              <div className="space-y-4">
                <div>
                  <p className="font-semibold text-gray-900 mb-1">Direcci&oacute;n F&iacute;sica</p>
                  <p className="text-gray-600">{church.address}</p>
                </div>
                <div>
                  <p className="font-semibold text-gray-900 mb-1">Tel&eacute;fono</p>
                  <p className="text-gray-600">{church.phone}</p>
                </div>
                <div>
                  <p className="font-semibold text-gray-900 mb-1">Correo Electr&oacute;nico</p>
                  <p className="text-gray-600">{church.email}</p>
                </div>
                <div>
                  <p className="font-semibold text-gray-900 mb-1">Horas de Oficina</p>
                  <p className="text-gray-600">{church.officeHours}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            title="Preguntas Frecuentes"
            subtitle="Respuestas a las preguntas m&aacute;s comunes de nuestros visitantes"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {[
              {
                q: "&iquest;Necesito ser luterano para asistir?",
                a: "No. Todos son bienvenidos a nuestros servicios sin importar su trasfondo religioso. Nos encanta recibir visitantes y nuevos amigos.",
              },
              {
                q: "&iquest;Cu&aacute;nto dura el servicio?",
                a: "El Servicio de Adoraci&oacute;n dominical dura aproximadamente 1 hora y 30 minutos, de 11:00 a.m. a 12:30 p.m.",
              },
              {
                q: "&iquest;Puedo participar de la Santa Cena?",
                a: "La Santa Cena est&aacute; abierta a todos los cristianos bautizados que creen en la presencia real de Cristo en el sacramento. Si tiene preguntas, hable con la pastora.",
              },
              {
                q: "&iquest;Tienen actividades para j&oacute;venes?",
                a: "S&iacute;. Nuestra Liga Juvenil se re&uacute;ne los domingos a las 7:30 p.m. con actividades, estudio b&iacute;blico y confraternidad para j&oacute;venes.",
              },
              {
                q: "&iquest;En qu&eacute; idioma son los servicios?",
                a: "Nuestros servicios se llevan a cabo en espa&ntilde;ol.",
              },
              {
                q: "&iquest;C&oacute;mo puedo involucrarme?",
                a: "Hay muchas formas de participar: coro, grupo de drama, sociedades, liga juvenil y m&aacute;s. Pregunte a cualquier miembro o a la pastora despu&eacute;s del servicio.",
              },
            ].map((faq, i) => (
              <div
                key={i}
                className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm"
              >
                <div className="flex items-start gap-3">
                  <HelpCircle className="w-5 h-5 text-luther-gold-dark shrink-0 mt-0.5" />
                  <div>
                    <h3
                      className="font-bold text-gray-900 mb-2"
                      dangerouslySetInnerHTML={{ __html: faq.q }}
                    />
                    <p
                      className="text-gray-600 text-sm"
                      dangerouslySetInnerHTML={{ __html: faq.a }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-luther-blue text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">
            &iexcl;Le Esperamos Este Domingo!
          </h2>
          <p className="text-luther-gold-light text-lg max-w-2xl mx-auto mb-8">
            Venga y conozca nuestra comunidad de fe. Ser&aacute; recibido con los
            brazos abiertos.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={`mailto:${church.email}?subject=Soy Visitante Nuevo`}
              className="inline-flex items-center justify-center gap-2 bg-luther-gold text-luther-blue-dark px-8 py-3 rounded-lg font-bold hover:bg-luther-gold-light transition-colors"
            >
              <Mail className="w-5 h-5" />
              Escr&iacute;banos
            </a>
            <a
              href={`tel:${church.phone.replace(/[^0-9]/g, "")}`}
              className="inline-flex items-center justify-center gap-2 bg-white/10 text-white px-8 py-3 rounded-lg font-bold hover:bg-white/20 transition-colors border border-white/20"
            >
              <Phone className="w-5 h-5" />
              Ll&aacute;menos
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
