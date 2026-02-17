import SectionHeader from "@/components/SectionHeader";
import { getSiteData } from "@/lib/data";

export const dynamic = "force-dynamic";

export default function HistoryPage() {
  const { history } = getSiteData();

  return (
    <>
      {/* Header */}
      <section className="bg-gradient-to-br from-luther-blue to-gray-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Nuestra Historia</h1>
          <p className="text-luther-gold-light text-lg max-w-2xl">
            Más de un siglo de fe, servicio y comunidad en Bayamón.
          </p>
        </div>
      </section>

      {/* Intro */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <SectionHeader
              title={`Desde ${history.founded}`}
              subtitle="Un recorrido por los momentos más importantes de nuestra congregación"
            />
            <p className="text-gray-600 text-lg">
              La Iglesia Evangélica Luterana Sión tiene sus raíces en una misión
              que comenzó en 1907 y ha crecido hasta convertirse en un pilar de
              fe en la comunidad de Bayamón.
            </p>
          </div>

          {/* Timeline */}
          <div className="max-w-3xl mx-auto">
            <div className="relative">
              {/* Vertical line */}
              <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-luther-gold-light" />

              <div className="space-y-8">
                {history.timeline.map((entry, i) => (
                  <div key={i} className="relative flex gap-6">
                    {/* Year badge */}
                    <div className="relative z-10 shrink-0">
                      <div className="w-16 h-16 bg-luther-blue text-white rounded-full flex items-center justify-center font-bold text-sm shadow-lg">
                        {entry.year}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm flex-1 mt-1">
                      <p className="text-gray-700">{entry.event}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Legacy */}
      <section className="py-16 bg-luther-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Nuestro Legado</h2>
          <p className="text-gray-700 text-lg max-w-2xl mx-auto">
            Por más de 100 años, Sión ha sido un faro de esperanza y fe en Bayamón.
            Miramos hacia el futuro con la misma dedicación y amor que nos ha
            sostenido desde aquel 29 de noviembre de 1907.
          </p>
        </div>
      </section>
    </>
  );
}
