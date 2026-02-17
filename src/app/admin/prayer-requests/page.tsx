"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Trash2, Check, X as XIcon } from "lucide-react";

interface PrayerRequest {
  id: string;
  name: string;
  request: string;
  date: string;
  approved: boolean;
}

export default function AdminPrayerRequestsPage() {
  const router = useRouter();
  const [requests, setRequests] = useState<PrayerRequest[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRequests();
  }, []);

  async function fetchRequests() {
    try {
      // Use the church data API to get all requests (including unapproved)
      const res = await fetch("/api/prayer-wall?all=true");
      if (!res.ok) throw new Error();
      setRequests(await res.json());
    } catch {
      router.push("/admin/login");
    } finally {
      setLoading(false);
    }
  }

  async function toggleApproval(req: PrayerRequest) {
    await fetch("/api/prayer-wall", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: req.id, approved: !req.approved }),
    });
    fetchRequests();
  }

  async function handleDelete(id: string) {
    if (!confirm("¿Eliminar esta petición de oración?")) return;
    await fetch(`/api/prayer-wall?id=${id}`, { method: "DELETE" });
    fetchRequests();
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-gray-500">Cargando...</div>
      </div>
    );
  }

  const pending = requests.filter((r) => !r.approved);
  const approved = requests.filter((r) => r.approved);

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center gap-3">
          <Link href="/admin" className="text-gray-400 hover:text-gray-600">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <h1 className="font-bold text-gray-900">Peticiones de Oración</h1>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Pending */}
        <h2 className="font-bold text-lg mb-4 text-gray-900">
          Pendientes de Aprobación ({pending.length})
        </h2>
        {pending.length === 0 ? (
          <p className="text-gray-400 text-sm mb-8">No hay peticiones pendientes.</p>
        ) : (
          <div className="space-y-3 mb-8">
            {pending.map((req) => (
              <div
                key={req.id}
                className="bg-white rounded-xl border-2 border-yellow-200 p-5 flex items-start justify-between"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-gray-900">{req.name}</h3>
                    <span className="text-xs bg-yellow-50 text-yellow-700 px-2 py-0.5 rounded-full">
                      Pendiente
                    </span>
                  </div>
                  <p className="text-sm text-gray-500 mt-0.5">{req.date}</p>
                  <p className="text-sm text-gray-700 mt-2">{req.request}</p>
                </div>
                <div className="flex items-center gap-1 shrink-0 ml-4">
                  <button
                    onClick={() => toggleApproval(req)}
                    className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                    title="Aprobar"
                  >
                    <Check className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => handleDelete(req.id)}
                    className="p-2 text-red-400 hover:bg-red-50 rounded-lg transition-colors"
                    title="Eliminar"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Approved */}
        <h2 className="font-bold text-lg mb-4 text-gray-900">
          Aprobadas ({approved.length})
        </h2>
        {approved.length === 0 ? (
          <p className="text-gray-400 text-sm">No hay peticiones aprobadas.</p>
        ) : (
          <div className="space-y-3">
            {approved.map((req) => (
              <div
                key={req.id}
                className="bg-white rounded-xl border border-gray-200 p-5 flex items-start justify-between"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-gray-900">{req.name}</h3>
                    <span className="text-xs bg-green-50 text-green-700 px-2 py-0.5 rounded-full">
                      Visible
                    </span>
                  </div>
                  <p className="text-sm text-gray-500 mt-0.5">{req.date}</p>
                  <p className="text-sm text-gray-700 mt-2">{req.request}</p>
                </div>
                <div className="flex items-center gap-1 shrink-0 ml-4">
                  <button
                    onClick={() => toggleApproval(req)}
                    className="p-2 text-gray-400 hover:text-yellow-600 transition-colors"
                    title="Ocultar"
                  >
                    <XIcon className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(req.id)}
                    className="p-2 text-gray-400 hover:text-red-600 transition-colors"
                    title="Eliminar"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
