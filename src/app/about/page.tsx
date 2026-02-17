import SectionHeader from "@/components/SectionHeader";
import { getSiteData } from "@/lib/data";
import { Church, Users, BookOpen, Heart } from "lucide-react";

export const dynamic = "force-dynamic";

export default function AboutPage() {
  const { church } = getSiteData();

  return (
    <>
      {/* Header */}
      <section className="bg-gradient-to-br from-luther-blue to-gray-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Quiénes Somos</h1>
          <p className="text-luther-gold-light text-lg max-w-2xl">
            Conoce nuestra iglesia, nuestra misión y nuestro equipo pastoral.
          </p>
        </div>
      </section>

      {/* About */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <SectionHeader
              title="Nuestra Iglesia"
              subtitle="Una comunidad de fe con raíces profundas"
            />

            <div className="prose prose-lg max-w-none text-gray-700 space-y-4">
              <p>
                La <strong>{church.name}</strong> es una congregación luterana ubicada
                en Bayamón, Puerto Rico. Desde nuestra fundación en 1907, hemos servido
                fielmente a nuestra comunidad, proclamando el Evangelio de Jesucristo
                y sirviendo a los necesitados.
              </p>
              <p>
                Somos parte de la tradición luterana, fundamentados en las enseñanzas
                de la Reforma y comprometidos con la proclamación de la gracia de Dios.
                Nuestros servicios combinan la rica tradición litúrgica con una
                adoración viva y relevante.
              </p>
              <p>
                Nuestra congregación es dirigida por el Consejo Congregacional, que
                incluye un Comité Ejecutivo, consejales y delegados del Área de Bayamón,
                todos trabajando juntos para cumplir la misión de la iglesia.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pastor */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <SectionHeader title="Nuestra Pastora" />
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
              <div className="w-24 h-24 bg-luther-cream rounded-full flex items-center justify-center mx-auto mb-4">
                <Church className="w-10 h-10 text-luther-blue" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">{church.pastor}</h3>
              <p className="text-luther-blue font-medium mb-4">Pastora</p>
              <p className="text-gray-600 max-w-lg mx-auto">
                La Rvda. Vivian J. Dávila, una hija de Sión, fue instalada como pastora
                de la congregación en el año 2005. Su liderazgo continúa la rica tradición
                de servicio y dedicación pastoral de nuestra iglesia.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            title="Nuestros Valores"
            subtitle="Los principios que guían nuestro caminar de fe"
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              {
                icon: <BookOpen className="w-8 h-8" />,
                title: "Fe en la Palabra",
                desc: "Fundamentamos nuestra fe en las Escrituras y la tradición luterana, proclamando la gracia de Dios.",
              },
              {
                icon: <Heart className="w-8 h-8" />,
                title: "Servicio al Prójimo",
                desc: "Servimos a nuestra comunidad con amor, llevando el mensaje de esperanza a quienes más lo necesitan.",
              },
              {
                icon: <Users className="w-8 h-8" />,
                title: "Comunidad Unida",
                desc: "Somos una familia de fe donde todos son bienvenidos, cultivando relaciones de amor y apoyo mutuo.",
              },
            ].map((v) => (
              <div key={v.title} className="text-center">
                <div className="text-luther-gold flex justify-center mb-3">{v.icon}</div>
                <h3 className="font-bold text-lg mb-2">{v.title}</h3>
                <p className="text-gray-600 text-sm">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
