"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Plus, Pencil, Trash2, X, Camera } from "lucide-react";

interface Photo {
  id: string;
  title: string;
  description: string;
  category: string;
  imageUrl: string;
  date: string;
}

const emptyPhoto = {
  title: "",
  description: "",
  category: "iglesia",
  imageUrl: "",
  date: "",
};

const categories = [
  { value: "iglesia", label: "Iglesia" },
  { value: "eventos", label: "Eventos" },
  { value: "comunidad", label: "Comunidad" },
  { value: "juventud", label: "Juventud" },
];

export default function AdminGalleryPage() {
  const router = useRouter();
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [editing, setEditing] = useState<Photo | null>(null);
  const [creating, setCreating] = useState(false);
  const [form, setForm] = useState(emptyPhoto);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPhotos();
  }, []);

  async function fetchPhotos() {
    try {
      const res = await fetch("/api/gallery");
      if (!res.ok) throw new Error();
      setPhotos(await res.json());
    } catch {
      router.push("/admin/login");
    } finally {
      setLoading(false);
    }
  }

  async function handleSave() {
    const method = editing ? "PUT" : "POST";
    const body = editing ? { ...form, id: editing.id } : form;

    const res = await fetch("/api/gallery", {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    if (res.ok) {
      closeForm();
      fetchPhotos();
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("¿Estás seguro de eliminar esta foto?")) return;
    await fetch(`/api/gallery?id=${id}`, { method: "DELETE" });
    fetchPhotos();
  }

  function openEdit(photo: Photo) {
    setEditing(photo);
    setCreating(false);
    setForm({
      title: photo.title,
      description: photo.description,
      category: photo.category,
      imageUrl: photo.imageUrl,
      date: photo.date,
    });
  }

  function openCreate() {
    setCreating(true);
    setEditing(null);
    setForm(emptyPhoto);
  }

  function closeForm() {
    setEditing(null);
    setCreating(false);
    setForm(emptyPhoto);
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
            <h1 className="font-bold text-gray-900">Administrar Galería</h1>
          </div>
          <button
            onClick={openCreate}
            className="flex items-center gap-2 bg-luther-blue text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-luther-blue-light transition-colors"
          >
            <Plus className="w-4 h-4" /> Nueva Foto
          </button>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Form */}
        {(creating || editing) && (
          <div className="bg-white rounded-xl border border-gray-200 p-6 mb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-bold text-lg">
                {editing ? "Editar Foto" : "Nueva Foto"}
              </h2>
              <button onClick={closeForm} className="text-gray-400 hover:text-gray-600">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Título</label>
                <input
                  type="text"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-luther-blue focus:border-luther-blue outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Categoría</label>
                <select
                  value={form.category}
                  onChange={(e) => setForm({ ...form, category: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-luther-blue focus:border-luther-blue outline-none"
                >
                  {categories.map((c) => (
                    <option key={c.value} value={c.value}>{c.label}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">URL de Imagen</label>
                <input
                  type="text"
                  value={form.imageUrl}
                  onChange={(e) => setForm({ ...form, imageUrl: e.target.value })}
                  placeholder="/uploads/foto.jpg o URL externa"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-luther-blue focus:border-luther-blue outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Fecha</label>
                <input
                  type="date"
                  value={form.date}
                  onChange={(e) => setForm({ ...form, date: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-luther-blue focus:border-luther-blue outline-none"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Descripción</label>
                <textarea
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  rows={2}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-luther-blue focus:border-luther-blue outline-none"
                />
              </div>
            </div>
            <div className="flex justify-end gap-3 mt-4">
              <button onClick={closeForm} className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800">
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

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {photos.map((photo) => (
            <div key={photo.id} className="bg-white rounded-xl border border-gray-200 overflow-hidden">
              <div className="h-40 bg-gray-100 flex items-center justify-center">
                {photo.imageUrl && !photo.imageUrl.includes("placeholder") ? (
                  <img src={photo.imageUrl} alt={photo.title} className="w-full h-full object-cover" />
                ) : (
                  <Camera className="w-10 h-10 text-gray-300" />
                )}
              </div>
              <div className="p-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-gray-900 text-sm">{photo.title}</h3>
                  <span className="text-xs bg-luther-cream text-luther-blue px-2 py-0.5 rounded-full">
                    {photo.category}
                  </span>
                </div>
                <p className="text-xs text-gray-500 mt-1">{photo.description}</p>
                <div className="flex items-center gap-1 mt-3">
                  <button
                    onClick={() => openEdit(photo)}
                    className="p-1.5 text-gray-400 hover:text-luther-blue transition-colors"
                  >
                    <Pencil className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => handleDelete(photo.id)}
                    className="p-1.5 text-gray-400 hover:text-red-600 transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
          {photos.length === 0 && (
            <div className="col-span-full text-center py-12 text-gray-400">
              No hay fotos. Agrega una nueva para comenzar.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
