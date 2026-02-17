import SectionHeader from "@/components/SectionHeader";
import { getSiteData } from "@/lib/data";
import type { ScheduleItem } from "@/lib/data";

export const dynamic = "force-dynamic";

const dayLabels: Record<string, string> = {
  sunday: "Domingo",
  monday: "Lunes",
  tuesday: "Martes",
  wednesday: "Miércoles",
  thursday: "Jueves",
  saturday: "Sábado",
};

const dayOrder = ["sunday", "monday", "tuesday", "wednesday", "thursday", "saturday"];

export default function SchedulePage() {
  const { serviceSchedule } = getSiteData();

  return (
    <>
      {/* Header */}
      <section className="bg-gradient-to-br from-luther-blue to-gray-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Horario Semanal</h1>
          <p className="text-luther-gold-light text-lg max-w-2xl">
            Nuestras actividades y servicios durante la semana. Todos son bienvenidos.
          </p>
        </div>
      </section>

      {/* Schedule */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            title="Programa Semanal"
            subtitle="Programa sujeto a cambios. Contáctenos para confirmar."
          />

          <div className="max-w-3xl mx-auto space-y-6">
            {dayOrder.map((day) => {
              const items = serviceSchedule[day as keyof typeof serviceSchedule] as ScheduleItem[];
              if (!items || items.length === 0) return null;

              return (
                <div key={day} className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
                  <div className="bg-luther-blue text-white px-6 py-3">
                    <h3 className="font-bold text-lg">{dayLabels[day]}</h3>
                  </div>
                  <div className="divide-y divide-gray-50">
                    {items.map((item, i) => (
                      <div key={i} className="px-6 py-4 flex items-start gap-4">
                        <div className="shrink-0 w-40">
                          <span className="text-luther-blue font-semibold text-sm">
                            {item.time}
                          </span>
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900">{item.name}</p>
                          <p className="text-gray-500 text-sm">{item.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="max-w-3xl mx-auto mt-8 bg-luther-cream rounded-xl p-6 border border-luther-cream-dark">
            <p className="text-luther-blue-dark text-sm text-center">
              <strong>Nota:</strong> El programa está sujeto a cambios. Para
              confirmar horarios o información adicional, comuníquese con nuestra
              oficina al <strong>(787) 785-2008</strong>.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
