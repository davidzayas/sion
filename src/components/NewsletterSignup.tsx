"use client";

import { useState } from "react";
import { Mail, CheckCircle } from "lucide-react";

export default function NewsletterSignup() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (!res.ok) {
        const data = await res.json();
        setError(data.error || "Error al suscribirse");
        return;
      }

      setSubmitted(true);
      setEmail("");
    } catch {
      setError("Error de conexión. Intente nuevamente.");
    }
  }

  if (submitted) {
    return (
      <div className="flex items-center gap-3 text-green-700 bg-green-50 px-6 py-4 rounded-xl">
        <CheckCircle className="w-5 h-5 shrink-0" />
        <p className="font-medium">Gracias por suscribirte al boletín semanal.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
      <div className="relative flex-1">
        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Tu correo electrónico"
          required
          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-luther-blue focus:border-luther-blue outline-none"
        />
      </div>
      <button
        type="submit"
        className="bg-luther-blue text-white px-6 py-3 rounded-lg font-semibold hover:bg-luther-blue-light transition-colors shrink-0"
      >
        Suscribirse
      </button>
      {error && <p className="text-red-600 text-sm">{error}</p>}
    </form>
  );
}
