"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Plus, Pencil, Trash2, X } from "lucide-react";

interface MinistryActivity {
  name: string;
  description: string;
}

interface Ministry {
  id: string;
  name: string;
  icon: string;
  description: string;
  content: string;
  leader: string;
  meetingDay: string;
  meetingTime: string;
  location: string;
  contactEmail: string;
  contactPhone: string;
  imageUrl: string;
  active: boolean;
  activities: MinistryActivity[];
}

const iconOptions = [
  "MessageCircle",
  "Heart",
  "HandHeart",
  "BookOpen",
  "Music",
  "Users",
  "Church",
  "Sparkles",
  "Star",
  "Clock",
  "MapPin",
];

const emptyMinistry: Omit<Ministry, "id"> = {
  name: "",
  icon: "Heart",
  description: "",
  content: "",
  leader: "",
  meetingDay: "",
  meetingTime: "",
  location: "",
  contactEmail: "",
  contactPhone: "",
  imageUrl: "",
  active: true,
  activities: [],
};

export default function AdminMinistriesPage() {
  const router = useRouter();
  const [ministries, setMinistries] = useState<Ministry[]>([]);
  const [editing, setEditing] = useState<Ministry | null>(null);
  const [creating, setCreating] = useState(false);
  const [form, setForm] = useState(emptyMinistry);
  const [loading, setLoading] = useState(true);
  const [activityName, setActivityName] = useState("");
  const [activityDescription, setActivityDescription] = useState("");

  useEffect(() => {
    fetchMinistries();
  }, []);

  async function fetchMinistries() {
    try {
      const res = await fetch("/api/ministries");
      if (!res.ok) throw new Error();
      setMinistries(await res.json());
    } catch {
      router.push("/admin/login");
    } finally {
      setLoading(false);
    }
  }

  async function handleSave() {
    const method = editing ? "PUT" : "POST";
    const body = editing ? { ...form, id: editing.id } : form;

    const res = await fetch("/api/ministries", {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    if (res.ok) {
      setEditing(null);
      setCreating(false);
      setForm(emptyMinistry);
      fetchMinistries();
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("¿Estás seguro de eliminar este ministerio?")) return;
    await fetch(`/api/ministries?id=${id}`, { method: "DELETE" });
    fetchMinistries();
  }

  function openEdit(ministry: Ministry) {
    setEditing(ministry);
    setCreating(false);
    setForm({
      name: ministry.name,
      icon: ministry.icon,
      description: ministry.description,
      content: ministry.content,
      leader: ministry.leader,
      meetingDay: ministry.meetingDay,
      meetingTime: ministry.meetingTime,
      location: ministry.location,
      contactEmail: ministry.contactEmail,
      contactPhone: ministry.contactPhone,
      imageUrl: ministry.imageUrl,
      active: ministry.active,
      activities: ministry.activities ?? [],
    });
    setActivityName("");
    setActivityDescription("");
  }

  function openCreate() {
    setCreating(true);
    setEditing(null);
    setForm(emptyMinistry);
    setActivityName("");
    setActivityDescription("");
  }

  function closeForm() {
    setEditing(null);
    setCreating(false);
    setForm(emptyMinistry);
    setActivityName("");
    setActivityDescription("");
  }

  function addActivity() {
    if (!activityName.trim()) return;
    setForm({
      ...form,
      activities: [
        ...form.activities,
        { name: activityName.trim(), description: activityDescription.trim() },
      ],
    });
    setActivityName("");
    setActivityDescription("");
  }

  function removeActivity(index: number) {
    setForm({
      ...form,
      activities: form.activities.filter((_, i) => i !== index),
    });
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
            <h1 className="font-bold text-gray-900">Administrar Ministerios</h1>
          </div>
          <button
            onClick={openCreate}
            className="flex items-center gap-2 bg-luther-blue text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-luther-blue-light transition-colors"
          >
            <Plus className="w-4 h-4" /> Nuevo Ministerio
          </button>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Form */}
        {(creating || editing) && (
          <div className="bg-white rounded-xl border border-gray-200 p-6 mb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-bold text-lg">
                {editing ? "Editar Ministerio" : "Nuevo Ministerio"}
              </h2>
              <button onClick={closeForm} className="text-gray-400 hover:text-gray-600">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Row 1: Nombre | Icono */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nombre
                </label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-luther-blue focus:border-luther-blue outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Icono
                </label>
                <select
                  value={form.icon}
                  onChange={(e) => setForm({ ...form, icon: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-luther-blue focus:border-luther-blue outline-none bg-white"
                >
                  {iconOptions.map((icon) => (
                    <option key={icon} value={icon}>
                      {icon}
                    </option>
                  ))}
                </select>
              </div>

              {/* Row 2: Líder | Ubicación */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Líder/Coordinador
                </label>
                <input
                  type="text"
                  value={form.leader}
                  onChange={(e) => setForm({ ...form, leader: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-luther-blue focus:border-luther-blue outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Ubicación
                </label>
                <input
                  type="text"
                  value={form.location}
                  onChange={(e) => setForm({ ...form, location: e.target.value })}
                  placeholder="ej: Salón Parroquial"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-luther-blue focus:border-luther-blue outline-none"
                />
              </div>

              {/* Row 3: Día de Reunión | Hora de Reunión */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Día de Reunión
                </label>
                <input
                  type="text"
                  value={form.meetingDay}
                  onChange={(e) => setForm({ ...form, meetingDay: e.target.value })}
                  placeholder="ej: Domingos"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-luther-blue focus:border-luther-blue outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Hora de Reunión
                </label>
                <input
                  type="text"
                  value={form.meetingTime}
                  onChange={(e) => setForm({ ...form, meetingTime: e.target.value })}
                  placeholder="ej: 7:30 p.m."
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-luther-blue focus:border-luther-blue outline-none"
                />
              </div>

              {/* Row 4: Email | Teléfono */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email de Contacto
                </label>
                <input
                  type="email"
                  value={form.contactEmail}
                  onChange={(e) => setForm({ ...form, contactEmail: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-luther-blue focus:border-luther-blue outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Teléfono de Contacto
                </label>
                <input
                  type="text"
                  value={form.contactPhone}
                  onChange={(e) => setForm({ ...form, contactPhone: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-luther-blue focus:border-luther-blue outline-none"
                />
              </div>

              {/* Row 5: URL de Imagen (full width) */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  URL de Imagen
                </label>
                <input
                  type="text"
                  value={form.imageUrl}
                  onChange={(e) => setForm({ ...form, imageUrl: e.target.value })}
                  placeholder="https://..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-luther-blue focus:border-luther-blue outline-none"
                />
              </div>

              {/* Row 6: Descripción Corta (full width) */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Descripción Corta
                </label>
                <textarea
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  rows={2}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-luther-blue focus:border-luther-blue outline-none"
                />
              </div>

              {/* Row 7: Contenido Detallado (full width) */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Contenido Detallado
                </label>
                <textarea
                  value={form.content}
                  onChange={(e) => setForm({ ...form, content: e.target.value })}
                  rows={5}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-luther-blue focus:border-luther-blue outline-none"
                />
              </div>

              {/* Row 8: Activo checkbox */}
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="active"
                  checked={form.active}
                  onChange={(e) => setForm({ ...form, active: e.target.checked })}
                  className="w-4 h-4 text-luther-blue border-gray-300 rounded focus:ring-luther-blue"
                />
                <label htmlFor="active" className="text-sm font-medium text-gray-700">
                  Activo
                </label>
              </div>
            </div>

            {/* Activities sub-section */}
            <div className="mt-6 border-t border-gray-200 pt-4">
              <h3 className="font-bold text-gray-900 mb-3">Actividades</h3>

              {/* Current activities list */}
              {form.activities.length > 0 && (
                <div className="space-y-2 mb-4">
                  {form.activities.map((activity, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between bg-gray-50 rounded-lg px-3 py-2"
                    >
                      <div>
                        <span className="font-medium text-gray-900 text-sm">
                          {activity.name}
                        </span>
                        {activity.description && (
                          <span className="text-gray-500 text-sm ml-2">
                            &mdash; {activity.description}
                          </span>
                        )}
                      </div>
                      <button
                        onClick={() => removeActivity(index)}
                        className="text-red-400 hover:text-red-600 transition-colors shrink-0 ml-2"
                        title="Eliminar actividad"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {/* Add activity inputs */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <input
                  type="text"
                  value={activityName}
                  onChange={(e) => setActivityName(e.target.value)}
                  placeholder="Nombre de Actividad"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-luther-blue focus:border-luther-blue outline-none text-sm"
                />
                <input
                  type="text"
                  value={activityDescription}
                  onChange={(e) => setActivityDescription(e.target.value)}
                  placeholder="Descripción de Actividad"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-luther-blue focus:border-luther-blue outline-none text-sm"
                />
              </div>
              <button
                onClick={addActivity}
                className="mt-3 px-4 py-2 bg-green-600 text-white rounded-lg text-sm font-semibold hover:bg-green-700 transition-colors"
              >
                Agregar
              </button>
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
          {ministries.map((ministry) => (
            <div
              key={ministry.id}
              className="bg-white rounded-xl border border-gray-200 p-5 flex items-start justify-between"
            >
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-bold text-gray-900">{ministry.name}</h3>
                  <span
                    className={`text-xs px-2 py-0.5 rounded-full ${
                      ministry.active
                        ? "bg-luther-cream text-luther-blue"
                        : "bg-gray-100 text-gray-500"
                    }`}
                  >
                    {ministry.active ? "Activo" : "Inactivo"}
                  </span>
                </div>
                {ministry.leader && (
                  <p className="text-sm text-gray-500 mt-1">
                    Coordinador: {ministry.leader}
                  </p>
                )}
                {ministry.description && (
                  <p className="text-sm text-gray-600 mt-1">{ministry.description}</p>
                )}
              </div>
              <div className="flex items-center gap-2 shrink-0 ml-4">
                <button
                  onClick={() => openEdit(ministry)}
                  className="p-2 text-gray-400 hover:text-luther-blue transition-colors"
                  title="Editar"
                >
                  <Pencil className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDelete(ministry.id)}
                  className="p-2 text-gray-400 hover:text-red-600 transition-colors"
                  title="Eliminar"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}

          {ministries.length === 0 && (
            <div className="text-center py-12 text-gray-400">
              No hay ministerios. Crea uno nuevo para comenzar.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
