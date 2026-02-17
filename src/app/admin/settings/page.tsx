"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Save } from "lucide-react";

interface ChurchInfo {
  name: string;
  shortName: string;
  tagline: string;
  pastor: string;
  address: string;
  mailingAddress: string;
  phone: string;
  email: string;
  facebook: string;
  youtube: string;
  officeHours: string;
  givingInfo: string;
  athMovil: string;
  livestreamUrl: string;
}

export default function AdminSettingsPage() {
  const router = useRouter();
  const [form, setForm] = useState<ChurchInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch("/api/church");
        if (!res.ok) throw new Error();
        setForm(await res.json());
      } catch {
        router.push("/admin/login");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [router]);

  async function handleSave() {
    setSaving(true);
    setSaved(false);
    try {
      await fetch("/api/church", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } finally {
      setSaving(false);
    }
  }

  function update(field: keyof ChurchInfo, value: string) {
    if (!form) return;
    setForm({ ...form, [field]: value });
  }

  if (loading || !form) {
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
            <h1 className="font-bold text-gray-900">Configuración General</h1>
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

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Church Info */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="font-bold text-lg mb-6">Información de la Iglesia</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {([
              { key: "name" as const, label: "Nombre de la Iglesia" },
              { key: "shortName" as const, label: "Nombre Corto" },
              { key: "tagline" as const, label: "Lema / Descripción Corta", span: true },
              { key: "pastor" as const, label: "Pastor(a)" },
              { key: "phone" as const, label: "Teléfono" },
              { key: "email" as const, label: "Correo Electrónico" },
              { key: "officeHours" as const, label: "Horas de Oficina" },
              { key: "address" as const, label: "Dirección Física", span: true },
              { key: "mailingAddress" as const, label: "Dirección Postal", span: true },
            ]).map((f) => (
              <div key={f.key} className={"span" in f && f.span ? "md:col-span-2" : ""}>
                <label className="block text-sm font-medium text-gray-700 mb-1">{f.label}</label>
                <input
                  type="text"
                  value={form[f.key]}
                  onChange={(e) => update(f.key, e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-luther-blue focus:border-luther-blue outline-none"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Social & Streaming */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="font-bold text-lg mb-6">Redes Sociales y Transmisión</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Facebook URL</label>
              <input
                type="url"
                value={form.facebook}
                onChange={(e) => update("facebook", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-luther-blue focus:border-luther-blue outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">YouTube URL</label>
              <input
                type="url"
                value={form.youtube}
                onChange={(e) => update("youtube", e.target.value)}
                placeholder="https://youtube.com/@..."
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-luther-blue focus:border-luther-blue outline-none"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                URL de Transmisión en Vivo (YouTube embed o similar)
              </label>
              <input
                type="url"
                value={form.livestreamUrl}
                onChange={(e) => update("livestreamUrl", e.target.value)}
                placeholder="https://www.youtube.com/embed/..."
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-luther-blue focus:border-luther-blue outline-none"
              />
            </div>
          </div>
        </div>

        {/* Giving */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="font-bold text-lg mb-6">Ofrendas y Donaciones</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Información de Ofrendas (texto que aparece en la página de donaciones)
              </label>
              <textarea
                value={form.givingInfo}
                onChange={(e) => update("givingInfo", e.target.value)}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-luther-blue focus:border-luther-blue outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                ATH Móvil (número o enlace)
              </label>
              <input
                type="text"
                value={form.athMovil}
                onChange={(e) => update("athMovil", e.target.value)}
                placeholder="Número o enlace de ATH Móvil"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-luther-blue focus:border-luther-blue outline-none"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
