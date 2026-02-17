"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Plus, Pencil, Trash2, X, Eye, EyeOff } from "lucide-react";

interface Announcement {
  id: string;
  title: string;
  content: string;
  date: string;
  active: boolean;
}

const emptyAnnouncement = { title: "", content: "", active: true };

export default function AdminAnnouncementsPage() {
  const router = useRouter();
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [editing, setEditing] = useState<Announcement | null>(null);
  const [creating, setCreating] = useState(false);
  const [form, setForm] = useState(emptyAnnouncement);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  async function fetchAnnouncements() {
    try {
      const res = await fetch("/api/announcements");
      if (!res.ok) throw new Error();
      setAnnouncements(await res.json());
    } catch {
      router.push("/admin/login");
    } finally {
      setLoading(false);
    }
  }

  async function handleSave() {
    const method = editing ? "PUT" : "POST";
    const body = editing ? { ...form, id: editing.id } : form;

    const res = await fetch("/api/announcements", {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    if (res.ok) {
      closeForm();
      fetchAnnouncements();
    }
  }

  async function toggleActive(a: Announcement) {
    await fetch("/api/announcements", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: a.id, active: !a.active }),
    });
    fetchAnnouncements();
  }

  async function handleDelete(id: string) {
    if (!confirm("¿Estás seguro de eliminar este anuncio?")) return;
    await fetch(`/api/announcements?id=${id}`, { method: "DELETE" });
    fetchAnnouncements();
  }

  function openEdit(a: Announcement) {
    setEditing(a);
    setCreating(false);
    setForm({ title: a.title, content: a.content, active: a.active });
  }

  function openCreate() {
    setCreating(true);
    setEditing(null);
    setForm(emptyAnnouncement);
  }

  function closeForm() {
    setEditing(null);
    setCreating(false);
    setForm(emptyAnnouncement);
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
            <h1 className="font-bold text-gray-900">Administrar Anuncios</h1>
          </div>
          <button
            onClick={openCreate}
            className="flex items-center gap-2 bg-luther-blue text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-luther-blue-light transition-colors"
          >
            <Plus className="w-4 h-4" /> Nuevo Anuncio
          </button>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Form */}
        {(creating || editing) && (
          <div className="bg-white rounded-xl border border-gray-200 p-6 mb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-bold text-lg">
                {editing ? "Editar Anuncio" : "Nuevo Anuncio"}
              </h2>
              <button onClick={closeForm} className="text-gray-400 hover:text-gray-600">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-4">
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
                  Contenido
                </label>
                <textarea
                  value={form.content}
                  onChange={(e) => setForm({ ...form, content: e.target.value })}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-luther-blue focus:border-luther-blue outline-none"
                />
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="active"
                  checked={form.active}
                  onChange={(e) => setForm({ ...form, active: e.target.checked })}
                  className="w-4 h-4 text-luther-blue border-gray-300 rounded focus:ring-luther-blue"
                />
                <label htmlFor="active" className="text-sm font-medium text-gray-700">
                  Anuncio activo (visible en el sitio)
                </label>
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
          {announcements.map((a) => (
            <div
              key={a.id}
              className={`bg-white rounded-xl border p-5 flex items-start justify-between ${
                a.active ? "border-gray-200" : "border-gray-100 opacity-60"
              }`}
            >
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-bold text-gray-900">{a.title}</h3>
                  <span
                    className={`text-xs px-2 py-0.5 rounded-full ${
                      a.active
                        ? "bg-green-50 text-green-700"
                        : "bg-gray-100 text-gray-500"
                    }`}
                  >
                    {a.active ? "Activo" : "Inactivo"}
                  </span>
                </div>
                <p className="text-sm text-gray-500 mt-1">{a.date}</p>
                <p className="text-sm text-gray-600 mt-1">{a.content}</p>
              </div>
              <div className="flex items-center gap-1 shrink-0 ml-4">
                <button
                  onClick={() => toggleActive(a)}
                  className="p-2 text-gray-400 hover:text-luther-blue transition-colors"
                  title={a.active ? "Desactivar" : "Activar"}
                >
                  {a.active ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
                <button
                  onClick={() => openEdit(a)}
                  className="p-2 text-gray-400 hover:text-luther-blue transition-colors"
                  title="Editar"
                >
                  <Pencil className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDelete(a.id)}
                  className="p-2 text-gray-400 hover:text-red-600 transition-colors"
                  title="Eliminar"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}

          {announcements.length === 0 && (
            <div className="text-center py-12 text-gray-400">
              No hay anuncios. Crea uno nuevo para comenzar.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
