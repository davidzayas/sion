"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Plus, Trash2, Save } from "lucide-react";

interface ScheduleItem {
  time: string;
  name: string;
  description: string;
}

interface Schedule {
  sunday: ScheduleItem[];
  monday: ScheduleItem[];
  tuesday: ScheduleItem[];
  wednesday: ScheduleItem[];
  thursday: ScheduleItem[];
  saturday: ScheduleItem[];
}

const dayLabels: Record<string, string> = {
  sunday: "Domingo",
  monday: "Lunes",
  tuesday: "Martes",
  wednesday: "Miércoles",
  thursday: "Jueves",
  saturday: "Sábado",
};

const dayOrder = ["sunday", "monday", "tuesday", "wednesday", "thursday", "saturday"];

export default function AdminHoursPage() {
  const router = useRouter();
  const [schedule, setSchedule] = useState<Schedule | null>(null);
  const [officeHours, setOfficeHours] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch("/api/hours");
        if (!res.ok) throw new Error();
        const data = await res.json();
        setSchedule(data.serviceSchedule);
        setOfficeHours(data.church.officeHours);
      } catch {
        router.push("/admin/login");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [router]);

  function updateItem(day: string, idx: number, field: string, value: string) {
    if (!schedule) return;
    const newSchedule = { ...schedule };
    const items = [...(newSchedule[day as keyof Schedule] as ScheduleItem[])];
    items[idx] = { ...items[idx], [field]: value };
    (newSchedule as Record<string, ScheduleItem[]>)[day] = items;
    setSchedule(newSchedule);
  }

  function addItem(day: string) {
    if (!schedule) return;
    const newSchedule = { ...schedule };
    const items = [...(newSchedule[day as keyof Schedule] as ScheduleItem[])];
    items.push({ time: "", name: "", description: "" });
    (newSchedule as Record<string, ScheduleItem[]>)[day] = items;
    setSchedule(newSchedule);
  }

  function removeItem(day: string, idx: number) {
    if (!schedule) return;
    const newSchedule = { ...schedule };
    const items = [...(newSchedule[day as keyof Schedule] as ScheduleItem[])];
    items.splice(idx, 1);
    (newSchedule as Record<string, ScheduleItem[]>)[day] = items;
    setSchedule(newSchedule);
  }

  async function handleSave() {
    setSaving(true);
    setSaved(false);
    try {
      await fetch("/api/hours", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ serviceSchedule: schedule, officeHours }),
      });
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } finally {
      setSaving(false);
    }
  }

  if (loading || !schedule) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-gray-500">Cargando...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/admin" className="text-gray-400 hover:text-gray-600">
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <h1 className="font-bold text-gray-900">Administrar Horarios</h1>
          </div>
          <button
            onClick={handleSave}
            disabled={saving}
            className="flex items-center gap-2 bg-luther-blue text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-luther-blue-light transition-colors disabled:opacity-50"
          >
            <Save className="w-4 h-4" />
            {saving ? "Guardando..." : saved ? "Guardado" : "Guardar Cambios"}
          </button>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Office Hours */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 mb-8">
          <h2 className="font-bold text-lg mb-4">Horas de Oficina</h2>
          <input
            type="text"
            value={officeHours}
            onChange={(e) => setOfficeHours(e.target.value)}
            className="w-full max-w-md px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-luther-blue focus:border-luther-blue outline-none"
          />
        </div>

        {/* Weekly Schedule */}
        <h2 className="font-bold text-xl mb-4">Programa Semanal</h2>
        <div className="space-y-6">
          {dayOrder.map((day) => {
            const items = schedule[day as keyof Schedule] as ScheduleItem[];
            return (
              <div key={day} className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                <div className="bg-luther-cream px-6 py-3 flex items-center justify-between">
                  <h3 className="font-bold text-luther-blue-dark">{dayLabels[day]}</h3>
                  <button
                    onClick={() => addItem(day)}
                    className="flex items-center gap-1 text-sm text-luther-blue hover:text-luther-blue-light"
                  >
                    <Plus className="w-4 h-4" /> Agregar
                  </button>
                </div>
                <div className="p-4 space-y-3">
                  {items.map((item, idx) => (
                    <div key={idx} className="flex gap-3 items-start">
                      <input
                        type="text"
                        value={item.time}
                        onChange={(e) => updateItem(day, idx, "time", e.target.value)}
                        placeholder="Hora"
                        className="w-40 px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-luther-blue focus:border-luther-blue outline-none"
                      />
                      <input
                        type="text"
                        value={item.name}
                        onChange={(e) => updateItem(day, idx, "name", e.target.value)}
                        placeholder="Nombre"
                        className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-luther-blue focus:border-luther-blue outline-none"
                      />
                      <input
                        type="text"
                        value={item.description}
                        onChange={(e) => updateItem(day, idx, "description", e.target.value)}
                        placeholder="Descripción"
                        className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-luther-blue focus:border-luther-blue outline-none"
                      />
                      <button
                        onClick={() => removeItem(day, idx)}
                        className="p-2 text-gray-400 hover:text-red-600 transition-colors shrink-0"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                  {items.length === 0 && (
                    <p className="text-sm text-gray-400 text-center py-2">
                      No hay actividades para este día
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
