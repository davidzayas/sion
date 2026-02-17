"use client";

import { useState, useEffect } from "react";
import SectionHeader from "@/components/SectionHeader";
import { Cross, Heart, Send, User } from "lucide-react";

interface PrayerRequest {
  id: string;
  name: string;
  request: string;
  date: string;
  approved: boolean;
}

export default function PrayerWallPage() {
  const [requests, setRequests] = useState<PrayerRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [name, setName] = useState("");
  const [request, setRequest] = useState("");

  useEffect(() => {
    fetch("/api/prayer-wall")
      .then((res) => res.json())
      .then((data) => {
        setRequests(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !request.trim()) return;

    setSubmitting(true);
    try {
      const res = await fetch("/api/prayer-wall", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: name.trim(), request: request.trim() }),
      });

      if (res.ok) {
        setSubmitted(true);
        setName("");
        setRequest("");
        setTimeout(() => setSubmitted(false), 5000);
      }
    } catch {
      // silently handle error
    } finally {
      setSubmitting(false);
    }
  };

  // The API already returns only approved requests
  const approvedRequests = requests;

  return (
    <>
      {/* Header */}
      <section className="bg-gradient-to-br from-luther-blue to-luther-blue-dark text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 bg-white/10 rounded-full flex items-center justify-center">
              <Cross className="w-10 h-10 text-luther-gold" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Muro de Oraci&oacute;n</h1>
          <p className="text-luther-gold-light text-lg max-w-2xl mx-auto">
            Comparta su petici&oacute;n de oraci&oacute;n y ore por las necesidades de otros hermanos.
            &ldquo;Oren unos por otros&rdquo; &mdash; Santiago 5:16
          </p>
        </div>
      </section>

      {/* Submit Form */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto">
            <SectionHeader
              title="Enviar Petici&oacute;n de Oraci&oacute;n"
              subtitle="Comparta su necesidad y nuestra comunidad orar&aacute; por usted"
            />

            {submitted && (
              <div className="mb-6 bg-green-50 border border-green-200 rounded-xl p-4 text-center">
                <p className="text-green-800 font-medium">
                  &iexcl;Gracias! Su petici&oacute;n ha sido enviada. Ser&aacute; publicada
                  una vez sea aprobada.
                </p>
              </div>
            )}

            <form
              onSubmit={handleSubmit}
              className="bg-white rounded-2xl p-6 md:p-8 border border-gray-100 shadow-sm"
            >
              <div className="space-y-5">
                <div>
                  <label
                    htmlFor="prayer-name"
                    className="block text-sm font-semibold text-gray-900 mb-2"
                  >
                    Su Nombre
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      id="prayer-name"
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Nombre o &laquo;An&oacute;nimo&raquo;"
                      className="w-full pl-11 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-luther-blue/20 focus:border-luther-blue outline-none transition-colors"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="prayer-request"
                    className="block text-sm font-semibold text-gray-900 mb-2"
                  >
                    Petici&oacute;n de Oraci&oacute;n
                  </label>
                  <textarea
                    id="prayer-request"
                    value={request}
                    onChange={(e) => setRequest(e.target.value)}
                    placeholder="Escriba su petici&oacute;n de oraci&oacute;n aqu&iacute;..."
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-luther-blue/20 focus:border-luther-blue outline-none transition-colors resize-none"
                    required
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full flex items-center justify-center gap-2 bg-luther-blue text-white py-3 rounded-lg font-semibold hover:bg-luther-blue-light transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send className="w-5 h-5" />
                  {submitting ? "Enviando..." : "Enviar Petici&oacute;n"}
                </button>
              </div>

              <p className="mt-4 text-xs text-gray-500 text-center">
                Las peticiones son revisadas antes de ser publicadas para proteger su privacidad.
              </p>
            </form>
          </div>
        </div>
      </section>

      {/* Prayer Requests */}
      <section className="py-16 bg-luther-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            title="Peticiones de Oraci&oacute;n"
            subtitle="Ore por las necesidades de nuestros hermanos y hermanas"
          />

          {loading && (
            <div className="text-center py-12">
              <div className="w-8 h-8 border-4 border-luther-blue/30 border-t-luther-blue rounded-full animate-spin mx-auto mb-4" />
              <p className="text-gray-500">Cargando peticiones...</p>
            </div>
          )}

          {!loading && approvedRequests.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {approvedRequests.map((pr) => (
                <div
                  key={pr.id}
                  className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm"
                >
                  <div className="flex items-center gap-2 mb-3">
                    <Heart className="w-4 h-4 text-luther-red" />
                    <span className="font-semibold text-gray-900 text-sm">
                      {pr.name}
                    </span>
                    <span className="text-xs text-gray-400 ml-auto">{pr.date}</span>
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed">{pr.request}</p>
                </div>
              ))}
            </div>
          )}

          {!loading && approvedRequests.length === 0 && (
            <div className="text-center py-12">
              <Cross className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                No hay peticiones publicadas
              </h3>
              <p className="text-gray-500">
                Sea el primero en compartir su petici&oacute;n de oraci&oacute;n.
              </p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
