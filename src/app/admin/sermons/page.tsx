"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Plus, Pencil, Trash2, X, BookOpen, FileText } from "lucide-react";
import SimpleEditor from "@/components/SimpleEditor";

interface Sermon {
  id: string;
  title: string;
  pastor: string;
  date: string;
  scripture: string;
  summary: string;
  description: string;
  transcript: string;
  videoUrl: string;
  audioUrl: string;
}

const emptySermon = {
  title: "",
  pastor: "",
  date: "",
  scripture: "",
  summary: "",
  description: "",
  transcript: "",
  videoUrl: "",
  audioUrl: "",
};

export default function AdminSermonsPage() {
  const router = useRouter();
  const [sermons, setSermons] = useState<Sermon[]>([]);
  const [editing, setEditing] = useState<Sermon | null>(null);
  const [creating, setCreating] = useState(false);
  const [form, setForm] = useState(emptySermon);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"details" | "transcript">("details");

  useEffect(() => {
    fetchSermons();
  }, []);

  async function fetchSermons() {
    try {
      const res = await fetch("/api/sermons");
      if (!res.ok) throw new Error();
      setSermons(await res.json());
    } catch {
      router.push("/admin/login");
    } finally {
      setLoading(false);
    }
  }

  async function handleSave() {
    const method = editing ? "PUT" : "POST";
    const body = editing ? { ...form, id: editing.id } : form;

    const res = await fetch("/api/sermons", {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    if (res.ok) {
      closeForm();
      fetchSermons();
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("¿Estás seguro de eliminar este sermón?")) return;
    await fetch(`/api/sermons?id=${id}`, { method: "DELETE" });
    fetchSermons();
  }

  function openEdit(sermon: Sermon) {
    setEditing(sermon);
    setCreating(false);
    setForm({
      title: sermon.title,
      pastor: sermon.pastor,
      date: sermon.date,
      scripture: sermon.scripture,
      summary: sermon.summary || "",
      description: sermon.description,
      transcript: sermon.transcript || "",
      videoUrl: sermon.videoUrl,
      audioUrl: sermon.audioUrl,
    });
    setActiveTab("details");
  }

  function openCreate() {
    setCreating(true);
    setEditing(null);
    setForm(emptySermon);
    setActiveTab("details");
  }

  function closeForm() {
    setEditing(null);
    setCreating(false);
    setForm(emptySermon);
    setActiveTab("details");
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
            <h1 className="font-bold text-gray-900">Administrar Sermones</h1>
          </div>
          <button
            onClick={openCreate}
            className="flex items-center gap-2 bg-luther-blue text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-luther-blue-light transition-colors"
          >
            <Plus className="w-4 h-4" /> Nuevo Sermón
          </button>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Form */}
        {(creating || editing) && (
          <div className="bg-white rounded-xl border border-gray-200 p-6 mb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-bold text-lg">
                {editing ? "Editar Sermón" : "Nuevo Sermón"}
              </h2>
              <button onClick={closeForm} className="text-gray-400 hover:text-gray-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Tabs */}
            <div className="flex gap-1 mb-6 border-b border-gray-200">
              <button
                onClick={() => setActiveTab("details")}
                className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === "details"
                    ? "border-luther-blue text-luther-blue"
                    : "border-transparent text-gray-500 hover:text-gray-700"
                }`}
              >
                <span className="flex items-center gap-2">
                  <BookOpen className="w-4 h-4" />
                  Detalles del Sermón
                </span>
              </button>
              <button
                onClick={() => setActiveTab("transcript")}
                className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === "transcript"
                    ? "border-luther-blue text-luther-blue"
                    : "border-transparent text-gray-500 hover:text-gray-700"
                }`}
              >
                <span className="flex items-center gap-2">
                  <FileText className="w-4 h-4" />
                  Transcripción
                  {form.transcript && (
                    <span className="w-2 h-2 bg-green-500 rounded-full" />
                  )}
                </span>
              </button>
            </div>

            {/* Details Tab */}
            {activeTab === "details" && (
              <div className="space-y-4">
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
                    <label className="block text-sm font-medium text-gray-700 mb-1">Predicador</label>
                    <input
                      type="text"
                      value={form.pastor}
                      onChange={(e) => setForm({ ...form, pastor: e.target.value })}
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
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Texto Bíblico</label>
                    <input
                      type="text"
                      value={form.scripture}
                      onChange={(e) => setForm({ ...form, scripture: e.target.value })}
                      placeholder="ej: Juan 3:16"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-luther-blue focus:border-luther-blue outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">URL Video (YouTube)</label>
                    <input
                      type="url"
                      value={form.videoUrl}
                      onChange={(e) => setForm({ ...form, videoUrl: e.target.value })}
                      placeholder="https://youtube.com/..."
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-luther-blue focus:border-luther-blue outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">URL Audio</label>
                    <input
                      type="url"
                      value={form.audioUrl}
                      onChange={(e) => setForm({ ...form, audioUrl: e.target.value })}
                      placeholder="https://..."
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-luther-blue focus:border-luther-blue outline-none"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Resumen
                  </label>
                  <textarea
                    value={form.summary}
                    onChange={(e) => setForm({ ...form, summary: e.target.value })}
                    placeholder="Escriba 1-2 oraciones que resuman el mensaje del sermón. Este resumen aparece en la lista de sermones."
                    rows={2}
                    maxLength={300}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-luther-blue focus:border-luther-blue outline-none text-sm"
                  />
                  <p className="text-xs text-gray-400 mt-1">
                    Máximo 300 caracteres. Se muestra en la tarjeta del sermón en la página pública.
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Descripción Completa
                  </label>
                  <SimpleEditor
                    value={form.description}
                    onChange={(val) => setForm({ ...form, description: val })}
                    placeholder="Escriba la descripción detallada del sermón..."
                    minHeight="120px"
                  />
                  <p className="text-xs text-gray-400 mt-1">
                    Contenido detallado que se muestra al expandir el sermón. Use la barra de herramientas para dar formato.
                  </p>
                </div>
              </div>
            )}

            {/* Transcript Tab */}
            {activeTab === "transcript" && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Transcripción del Mensaje
                </label>
                <p className="text-xs text-gray-500 mb-2">
                  Pegue o escriba la transcripción completa del sermón. Puede dar formato con negrita, cursiva, subtítulos y listas.
                </p>
                <SimpleEditor
                  value={form.transcript}
                  onChange={(val) => setForm({ ...form, transcript: val })}
                  placeholder="Pegue o escriba la transcripción del sermón aquí..."
                  minHeight="400px"
                />
              </div>
            )}

            <div className="flex justify-end gap-3 mt-6">
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

        {/* List */}
        <div className="space-y-3">
          {sermons.map((sermon) => (
            <div
              key={sermon.id}
              className="bg-white rounded-xl border border-gray-200 p-5 flex items-start justify-between"
            >
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-luther-cream rounded-lg flex items-center justify-center shrink-0">
                  <BookOpen className="w-5 h-5 text-luther-blue" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-gray-900">{sermon.title}</h3>
                    {sermon.transcript && (
                      <span className="flex items-center gap-1 text-xs bg-green-50 text-green-700 px-2 py-0.5 rounded-full">
                        <FileText className="w-3 h-3" />
                        Transcripción
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-500 mt-0.5">
                    {sermon.pastor} &middot; {sermon.date} &middot; {sermon.scripture}
                  </p>
                  {sermon.summary && (
                    <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                      {sermon.summary}
                    </p>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-2 shrink-0 ml-4">
                <button
                  onClick={() => openEdit(sermon)}
                  className="p-2 text-gray-400 hover:text-luther-blue transition-colors"
                >
                  <Pencil className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDelete(sermon.id)}
                  className="p-2 text-gray-400 hover:text-red-600 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
          {sermons.length === 0 && (
            <div className="text-center py-12 text-gray-400">
              No hay sermones. Crea uno nuevo para comenzar.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
