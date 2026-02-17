import SectionHeader from "@/components/SectionHeader";
import LutherRose from "@/components/LutherRose";
import { getSiteData } from "@/lib/data";
import { Heart, Smartphone, Building2, HandCoins } from "lucide-react";

export const dynamic = "force-dynamic";

export default function GivingPage() {
  const { church } = getSiteData();

  return (
    <>
      {/* Header */}
      <section className="bg-gradient-to-br from-luther-blue to-luther-blue-dark text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4 mb-4">
            <LutherRose size={56} />
            <h1 className="text-4xl md:text-5xl font-bold">Ofrendas y Diezmos</h1>
          </div>
          <p className="text-luther-gold-light text-lg max-w-2xl">
            Su generosidad permite que la obra de Dios continue en nuestra comunidad.
          </p>
        </div>
      </section>

      {/* Biblical Verse */}
      <section className="py-12 bg-luther-cream">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Heart className="w-10 h-10 text-luther-red mx-auto mb-4" />
          <blockquote className="text-xl md:text-2xl text-luther-blue font-serif italic leading-relaxed">
            &ldquo;Cada uno d&eacute; como propuso en su coraz&oacute;n: no con tristeza,
            ni por necesidad, porque Dios ama al dador alegre.&rdquo;
          </blockquote>
          <p className="mt-4 text-luther-blue-light font-semibold">
            2 Corintios 9:7
          </p>
        </div>
      </section>

      {/* Giving Info */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            title="Formas de Ofrendar"
            subtitle="Existen varias maneras en que puede contribuir a la obra de nuestra iglesia"
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* ATH Movil */}
            <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm text-center hover:shadow-md transition-shadow">
              <div className="w-16 h-16 bg-luther-blue/10 rounded-full flex items-center justify-center mx-auto mb-5">
                <Smartphone className="w-8 h-8 text-luther-blue" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">ATH M&oacute;vil</h3>
              <p className="text-gray-600 mb-4">
                Realice su ofrenda de forma r&aacute;pida y segura a trav&eacute;s de ATH M&oacute;vil.
              </p>
              {church.athMovil ? (
                <p className="text-luther-blue font-semibold">
                  N&uacute;mero: {church.athMovil}
                </p>
              ) : (
                <p className="text-gray-500 text-sm italic">
                  Comun&iacute;quese con la oficina para obtener el n&uacute;mero de ATH M&oacute;vil.
                </p>
              )}
            </div>

            {/* Bank Transfer */}
            <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm text-center hover:shadow-md transition-shadow">
              <div className="w-16 h-16 bg-luther-gold/10 rounded-full flex items-center justify-center mx-auto mb-5">
                <Building2 className="w-8 h-8 text-luther-gold-dark" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Transferencia Bancaria</h3>
              <p className="text-gray-600 mb-4">
                Puede realizar una transferencia directa a la cuenta bancaria de la iglesia.
              </p>
              <p className="text-gray-500 text-sm italic">
                Comun&iacute;quese con la oficina al {church.phone} para obtener los datos bancarios.
              </p>
            </div>

            {/* In Person */}
            <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm text-center hover:shadow-md transition-shadow">
              <div className="w-16 h-16 bg-luther-red/10 rounded-full flex items-center justify-center mx-auto mb-5">
                <HandCoins className="w-8 h-8 text-luther-red" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">En Persona</h3>
              <p className="text-gray-600 mb-4">
                Entregue su ofrenda durante los servicios dominicales o en la oficina parroquial.
              </p>
              <p className="text-luther-blue text-sm font-medium">
                Domingos: 11:00 a.m. - Servicio de Adoraci&oacute;n
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Additional Info */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <SectionHeader
              title="Informaci&oacute;n Adicional"
              subtitle="Todo lo que necesita saber sobre sus contribuciones"
            />

            <div className="space-y-6">
              <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
                <h3 className="font-bold text-lg text-gray-900 mb-2">
                  &iquest;Para qu&eacute; se utilizan las ofrendas?
                </h3>
                <p className="text-gray-600">
                  Sus contribuciones apoyan el mantenimiento de la iglesia, los ministerios
                  comunitarios, la obra misionera, los programas educativos y el servicio
                  pastoral. Cada ofrenda es una inversi&oacute;n en el Reino de Dios.
                </p>
              </div>

              <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
                <h3 className="font-bold text-lg text-gray-900 mb-2">
                  Recibos y Certificaciones
                </h3>
                <p className="text-gray-600">
                  La iglesia emite certificaciones anuales de sus ofrendas y diezmos
                  para prop&oacute;sitos contributivos. Comun&iacute;quese con la oficina para solicitar su
                  certificaci&oacute;n.
                </p>
              </div>

              <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
                <h3 className="font-bold text-lg text-gray-900 mb-2">
                  Contacto
                </h3>
                <p className="text-gray-600">
                  Para preguntas sobre ofrendas o diezmos, comun&iacute;quese con la oficina
                  parroquial al <strong>{church.phone}</strong> o por correo
                  electr&oacute;nico a <strong>{church.email}</strong>.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-luther-blue text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Gracias por Su Generosidad</h2>
          <p className="text-luther-gold-light text-lg max-w-2xl mx-auto mb-8">
            Su apoyo fiel hace posible que continuemos sirviendo a nuestra comunidad
            y compartiendo el amor de Cristo en Bayam&oacute;n.
          </p>
          <a
            href={`mailto:${church.email}?subject=Consulta sobre Ofrendas`}
            className="inline-block bg-luther-gold text-luther-blue-dark px-8 py-3 rounded-lg font-bold hover:bg-luther-gold-light transition-colors"
          >
            Cont&aacute;ctenos
          </a>
        </div>
      </section>
    </>
  );
}
