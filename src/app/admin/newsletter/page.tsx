"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Plus, Pencil, Trash2, X, Mail, FileText, Download, Eye, EyeOff } from "lucide-react";
import SimpleEditor from "@/components/SimpleEditor";

interface Subscriber {
  email: string;
  subscribedAt: string;
}

interface Bulletin {
  id: string;
  title: string;
  date: string;
  summary: string;
  content: string;
  published: boolean;
}

const emptyBulletin = { title: "", date: "", summary: "", content: "", published: false };

export default function AdminNewsletterPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"subscribers" | "bulletins">("subscribers");
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [bulletins, setBulletins] = useState<Bulletin[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Bulletin | null>(null);
  const [creating, setCreating] = useState(false);
  const [form, setForm] = useState(emptyBulletin);

  useEffect(() => {
    fetchAll();
  }, []);

  async function fetchAll() {
    try {
      const [subsRes, bullRes] = await Promise.all([
        fetch("/api/newsletter"),
        fetch("/api/bulletins"),
      ]);
      if (!subsRes.ok && !bullRes.ok) throw new Error();
      if (subsRes.ok) setSubscribers(await subsRes.json());
      if (bullRes.ok) setBulletins(await bullRes.json());
    } catch {
      router.push("/admin/login");
    } finally {
      setLoading(false);
    }
  }

  async function fetchSubscribers() {
    try {
      const res = await fetch("/api/newsletter");
      if (!res.ok) throw new Error();
      setSubscribers(await res.json());
    } catch {
      router.push("/admin/login");
    }
  }

  async function fetchBulletins() {
    try {
      const res = await fetch("/api/bulletins");
      if (!res.ok) throw new Error();
      setBulletins(await res.json());
    } catch {
      router.push("/admin/login");
    }
  }

  async function handleDeleteSubscriber(email: string) {
    if (!confirm(`¿Estás seguro de eliminar al suscriptor ${email}?`)) return;
    await fetch(`/api/newsletter?email=${encodeURIComponent(email)}`, { method: "DELETE" });
    fetchSubscribers();
  }

  function exportCSV() {
    const header = "email,subscribedAt\n";
    const rows = subscribers.map((s) => `${s.email},${s.subscribedAt}`).join("\n");
    const blob = new Blob([header + rows], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "suscriptores.csv";
    link.click();
    URL.revokeObjectURL(url);
  }

  async function handleSaveBulletin() {
    const method = editing ? "PUT" : "POST";
    const body = editing ? { ...form, id: editing.id } : form;

    const res = await fetch("/api/bulletins", {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    if (res.ok) {
      closeForm();
      fetchBulletins();
    }
  }

  async function handleDeleteBulletin(id: string) {
    if (!confirm("¿Estás seguro de eliminar este boletín?")) return;
    await fetch(`/api/bulletins?id=${id}`, { method: "DELETE" });
    fetchBulletins();
  }

  function openEditBulletin(bulletin: Bulletin) {
    setEditing(bulletin);
    setCreating(false);
    setForm({
      title: bulletin.title,
      date: bulletin.date,
      summary: bulletin.summary,
      content: bulletin.content,
      published: bulletin.published,
    });
  }

  function openCreateBulletin() {
    setCreating(true);
    setEditing(null);
    setForm({ ...emptyBulletin, date: new Date().toISOString().split("T")[0] });
  }

  function closeForm() {
    setEditing(null);
    setCreating(false);
    setForm(emptyBulletin);
  }

  function formatDate(dateStr: string) {
    try {
      return new Date(dateStr).toLocaleDateString("es-PR", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    } catch {
      return dateStr;
    }
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
            <h1 className="font-bold text-gray-900">Boletín Semanal</h1>
          </div>
          {activeTab === "bulletins" && (
            <button
              onClick={openCreateBulletin}
              className="flex items-center gap-2 bg-luther-blue text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-luther-blue-light transition-colors"
            >
              <Plus className="w-4 h-4" /> Nuevo Boletín
            </button>
          )}
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tabs */}
        <div className="flex gap-1 mb-6 border-b border-gray-200">
          <button
            onClick={() => setActiveTab("subscribers")}
            className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
              activeTab === "subscribers"
                ? "border-luther-blue text-luther-blue"
                : "border-transparent text-gray-500 hover:text-gray-700"
            }`}
          >
            <span className="flex items-center gap-2">
              <Mail className="w-4 h-4" />
              Suscriptores
            </span>
          </button>
          <button
            onClick={() => setActiveTab("bulletins")}
            className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
              activeTab === "bulletins"
                ? "border-luther-blue text-luther-blue"
                : "border-transparent text-gray-500 hover:text-gray-700"
            }`}
          >
            <span className="flex items-center gap-2">
              <FileText className="w-4 h-4" />
              Boletines
            </span>
          </button>
        </div>

        {/* Subscribers Tab */}
        {activeTab === "subscribers" && (
          <div>
            <div className="flex items-center justify-between mb-4">
              <p className="text-sm text-gray-600">
                {subscribers.length} suscriptores
              </p>
              {subscribers.length > 0 && (
                <button
                  onClick={exportCSV}
                  className="flex items-center gap-2 bg-luther-blue text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-luther-blue-light transition-colors"
                >
                  <Download className="w-4 h-4" /> Exportar CSV
                </button>
              )}
            </div>

            <div className="space-y-3">
              {subscribers.map((sub) => (
                <div
                  key={sub.email}
                  className="bg-white rounded-xl border border-gray-200 p-5 flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-luther-cream rounded-lg flex items-center justify-center shrink-0">
                      <Mail className="w-5 h-5 text-luther-blue" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{sub.email}</p>
                      <p className="text-sm text-gray-500">
                        Suscrito el {formatDate(sub.subscribedAt)}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => handleDeleteSubscriber(sub.email)}
                    className="p-2 text-gray-400 hover:text-red-600 transition-colors"
                    title="Eliminar"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}

              {subscribers.length === 0 && (
                <div className="text-center py-12 text-gray-400">
                  No hay suscriptores aún.
                </div>
              )}
            </div>
          </div>
        )}

        {/* Bulletins Tab */}
        {activeTab === "bulletins" && (
          <div>
            {/* Bulletin Form */}
            {(creating || editing) && (
              <div className="bg-white rounded-xl border border-gray-200 p-6 mb-8">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="font-bold text-lg">
                    {editing ? "Editar Boletín" : "Nuevo Boletín"}
                  </h2>
                  <button onClick={closeForm} className="text-gray-400 hover:text-gray-600">
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="space-y-4">
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
                        type="date"
                        value={form.date}
                        onChange={(e) => setForm({ ...form, date: e.target.value })}
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
                      rows={2}
                      maxLength={300}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-luther-blue focus:border-luther-blue outline-none text-sm"
                    />
                    <p className="text-xs text-gray-400 mt-1">
                      Máximo 300 caracteres. Se muestra en la lista pública de boletines.
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Contenido
                    </label>
                    <SimpleEditor
                      value={form.content}
                      onChange={(val) => setForm({ ...form, content: val })}
                      placeholder="Escriba el contenido del boletín..."
                      minHeight="300px"
                    />
                  </div>

                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="published"
                      checked={form.published}
                      onChange={(e) => setForm({ ...form, published: e.target.checked })}
                      className="w-4 h-4 text-luther-blue border-gray-300 rounded focus:ring-luther-blue"
                    />
                    <label htmlFor="published" className="text-sm font-medium text-gray-700">
                      Publicar (visible en la página pública)
                    </label>
                  </div>
                </div>

                <div className="flex justify-end gap-3 mt-6">
                  <button
                    onClick={closeForm}
                    className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800"
                  >
                    Cancelar
                  </button>
                  <button
                    onClick={handleSaveBulletin}
                    className="px-6 py-2 bg-luther-blue text-white rounded-lg text-sm font-semibold hover:bg-luther-blue-light transition-colors"
                  >
                    Guardar
                  </button>
                </div>
              </div>
            )}

            {/* Bulletin List */}
            <div className="space-y-3">
              {bulletins.map((bulletin) => (
                <div
                  key={bulletin.id}
                  className="bg-white rounded-xl border border-gray-200 p-5 flex items-start justify-between"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-luther-cream rounded-lg flex items-center justify-center shrink-0">
                      <FileText className="w-5 h-5 text-luther-blue" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-bold text-gray-900">{bulletin.title}</h3>
                        <span
                          className={`text-xs px-2 py-0.5 rounded-full ${
                            bulletin.published
                              ? "bg-green-50 text-green-700"
                              : "bg-gray-100 text-gray-500"
                          }`}
                        >
                          {bulletin.published ? "Publicado" : "Borrador"}
                        </span>
                      </div>
                      <p className="text-sm text-gray-500 mt-0.5">
                        {formatDate(bulletin.date)}
                      </p>
                      {bulletin.summary && (
                        <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                          {bulletin.summary}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-2 shrink-0 ml-4">
                    <button
                      onClick={() => openEditBulletin(bulletin)}
                      className="p-2 text-gray-400 hover:text-luther-blue transition-colors"
                      title="Editar"
                    >
                      <Pencil className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDeleteBulletin(bulletin.id)}
                      className="p-2 text-gray-400 hover:text-red-600 transition-colors"
                      title="Eliminar"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}

              {bulletins.length === 0 && (
                <div className="text-center py-12 text-gray-400">
                  No hay boletines. Crea uno nuevo para comenzar.
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
