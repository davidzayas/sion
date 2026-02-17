import SectionHeader from "@/components/SectionHeader";
import { getSiteData } from "@/lib/data";
import { CalendarDays, RotateCw } from "lucide-react";

export const dynamic = "force-dynamic";

export default function EventsPage() {
  const { events } = getSiteData();

  const recurring = events.filter((e) => e.recurring);
  const special = events.filter((e) => !e.recurring);

  return (
    <>
      {/* Header */}
      <section className="bg-gradient-to-br from-luther-blue to-gray-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Eventos</h1>
          <p className="text-luther-gold-light text-lg max-w-2xl">
            Actividades regulares y eventos especiales de nuestra congregación.
          </p>
        </div>
      </section>

      {/* Recurring Events */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            title="Actividades Regulares"
            subtitle="Eventos que se celebran de forma recurrente"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {recurring.map((e) => (
              <div
                key={e.id}
                className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm"
              >
                <div className="flex items-center gap-2 text-luther-blue mb-3">
                  <RotateCw className="w-4 h-4" />
                  <span className="text-sm font-medium">Recurrente</span>
                </div>
                <h3 className="font-bold text-lg text-gray-900 mb-2">{e.title}</h3>
                <p className="text-luther-blue text-sm font-medium mb-1">{e.date}</p>
                <p className="text-gray-500 text-sm mb-2">{e.time}</p>
                <p className="text-gray-600 text-sm">{e.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Special Events */}
      {special.length > 0 && (
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeader
              title="Eventos Especiales"
              subtitle="Próximas actividades especiales de la iglesia"
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {special.map((e) => (
                <div
                  key={e.id}
                  className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm"
                >
                  <div className="flex items-center gap-2 text-luther-blue mb-3">
                    <CalendarDays className="w-4 h-4" />
                    <span className="text-sm font-medium">{e.date}</span>
                  </div>
                  <h3 className="font-bold text-lg text-gray-900 mb-2">{e.title}</h3>
                  <p className="text-gray-500 text-sm mb-2">{e.time}</p>
                  <p className="text-gray-600 text-sm">{e.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* No special events placeholder */}
      {special.length === 0 && (
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <CalendarDays className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-900 mb-2">Eventos Especiales</h3>
            <p className="text-gray-500">
              No hay eventos especiales programados por el momento. Visita esta
              página regularmente para mantenerte informado.
            </p>
          </div>
        </section>
      )}
    </>
  );
}
