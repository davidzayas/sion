"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Plus, Pencil, Trash2, X } from "lucide-react";

interface ChurchEvent {
  id: string;
  title: string;
  date: string;
  time: string;
  description: string;
  recurring: boolean;
}

const emptyEvent: Omit<ChurchEvent, "id"> = {
  title: "",
  date: "",
  time: "",
  description: "",
  recurring: false,
};

export default function AdminEventsPage() {
  const router = useRouter();
  const [events, setEvents] = useState<ChurchEvent[]>([]);
  const [editing, setEditing] = useState<ChurchEvent | null>(null);
  const [creating, setCreating] = useState(false);
  const [form, setForm] = useState(emptyEvent);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEvents();
  }, []);

  async function fetchEvents() {
    try {
      const res = await fetch("/api/events");
      if (!res.ok) throw new Error();
      setEvents(await res.json());
    } catch {
      router.push("/admin/login");
    } finally {
      setLoading(false);
    }
  }

  async function handleSave() {
    const method = editing ? "PUT" : "POST";
    const body = editing ? { ...form, id: editing.id } : form;

    const res = await fetch("/api/events", {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    if (res.ok) {
      setEditing(null);
      setCreating(false);
      setForm(emptyEvent);
      fetchEvents();
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("¿Estás seguro de eliminar este evento?")) return;
    await fetch(`/api/events?id=${id}`, { method: "DELETE" });
    fetchEvents();
  }

  function openEdit(event: ChurchEvent) {
    setEditing(event);
    setCreating(false);
    setForm({
      title: event.title,
      date: event.date,
      time: event.time,
      description: event.description,
      recurring: event.recurring,
    });
  }

  function openCreate() {
    setCreating(true);
    setEditing(null);
    setForm(emptyEvent);
  }

  function closeForm() {
    setEditing(null);
    setCreating(false);
    setForm(emptyEvent);
  }

  if (loading) {
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
            <h1 className="font-bold text-gray-900">Administrar Eventos</h1>
          </div>
          <button
            onClick={openCreate}
            className="flex items-center gap-2 bg-luther-blue text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-luther-blue-light transition-colors"
          >
            <Plus className="w-4 h-4" /> Nuevo Evento
          </button>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Form */}
        {(creating || editing) && (
          <div className="bg-white rounded-xl border border-gray-200 p-6 mb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-bold text-lg">
                {editing ? "Editar Evento" : "Nuevo Evento"}
              </h2>
              <button onClick={closeForm} className="text-gray-400 hover:text-gray-600">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Título
                </label>
                <input
                  type="text"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-luther-blue focus:border-luther-blue outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Fecha
                </label>
                <input
                  type="text"
                  value={form.date}
                  onChange={(e) => setForm({ ...form, date: e.target.value })}
                  placeholder="ej: 2026-03-15 o Todos los domingos"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-luther-blue focus:border-luther-blue outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Hora
                </label>
                <input
                  type="text"
                  value={form.time}
                  onChange={(e) => setForm({ ...form, time: e.target.value })}
                  placeholder="ej: 11:00 a.m."
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-luther-blue focus:border-luther-blue outline-none"
                />
              </div>
              <div className="flex items-center gap-2 pt-6">
                <input
                  type="checkbox"
                  id="recurring"
                  checked={form.recurring}
                  onChange={(e) => setForm({ ...form, recurring: e.target.checked })}
                  className="w-4 h-4 text-luther-blue border-gray-300 rounded focus:ring-luther-blue"
                />
                <label htmlFor="recurring" className="text-sm font-medium text-gray-700">
                  Evento recurrente
                </label>
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Descripción
                </label>
                <textarea
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-luther-blue focus:border-luther-blue outline-none"
                />
              </div>
            </div>
            <div className="flex justify-end gap-3 mt-4">
              <button
                onClick={closeForm}
                className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800"
              >
                Cancelar
              </button>
              <button
                onClick={handleSave}
                className="px-6 py-2 bg-luther-blue text-white rounded-lg text-sm font-semibold hover:bg-luther-blue-light transition-colors"
              >
                Guardar
              </button>
            </div>
          </div>
        )}

        {/* List */}
        <div className="space-y-3">
          {events.map((event) => (
            <div
              key={event.id}
              className="bg-white rounded-xl border border-gray-200 p-5 flex items-start justify-between"
            >
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-bold text-gray-900">{event.title}</h3>
                  {event.recurring && (
                    <span className="text-xs bg-luther-cream text-luther-blue px-2 py-0.5 rounded-full">
                      Recurrente
                    </span>
                  )}
                </div>
                <p className="text-sm text-gray-500 mt-1">
                  {event.date} &middot; {event.time}
                </p>
                <p className="text-sm text-gray-600 mt-1">{event.description}</p>
              </div>
              <div className="flex items-center gap-2 shrink-0 ml-4">
                <button
                  onClick={() => openEdit(event)}
                  className="p-2 text-gray-400 hover:text-luther-blue transition-colors"
                  title="Editar"
                >
                  <Pencil className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDelete(event.id)}
                  className="p-2 text-gray-400 hover:text-red-600 transition-colors"
                  title="Eliminar"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}

          {events.length === 0 && (
            <div className="text-center py-12 text-gray-400">
              No hay eventos. Crea uno nuevo para comenzar.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
