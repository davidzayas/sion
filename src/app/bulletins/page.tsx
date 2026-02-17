"use client";

import { useState, useEffect, useMemo } from "react";
import SectionHeader from "@/components/SectionHeader";
import NewsletterSignup from "@/components/NewsletterSignup";
import {
  Newspaper,
  Calendar,
  ChevronDown,
  ChevronUp,
  ChevronLeft,
  ChevronRight,
  Search,
  X,
} from "lucide-react";

interface Bulletin {
  id: string;
  title: string;
  date: string;
  summary: string;
  content: string;
  published: boolean;
}

const PAGE_SIZE = 10;

function formatDate(dateStr: string) {
  if (!dateStr) return "";
  const d = new Date(dateStr + "T12:00:00");
  return d.toLocaleDateString("es-PR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function BulletinsPage() {
  const [bulletins, setBulletins] = useState<Bulletin[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetch("/api/bulletins")
      .then((res) => res.json())
      .then((data) => {
        // Sort by date descending (newest first)
        const sorted = [...data].sort(
          (a: Bulletin, b: Bulletin) =>
            (b.date || "").localeCompare(a.date || "")
        );
        setBulletins(sorted);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  // Filtered bulletins
  const filtered = useMemo(() => {
    let result = bulletins;

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(
        (b) =>
          b.title.toLowerCase().includes(q) ||
          b.summary.toLowerCase().includes(q)
      );
    }

    return result;
  }, [bulletins, searchQuery]);

  // Pagination
  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const safeCurrentPage = Math.min(currentPage, totalPages);
  const paginatedBulletins = filtered.slice(
    (safeCurrentPage - 1) * PAGE_SIZE,
    safeCurrentPage * PAGE_SIZE
  );

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
    setExpandedId(null);
  }, [searchQuery]);

  function toggleExpand(id: string) {
    setExpandedId(expandedId === id ? null : id);
  }

  function goToPage(page: number) {
    setCurrentPage(page);
    setExpandedId(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  const isExpanded = (id: string) => expandedId === id;
  const hasFilters = searchQuery.trim() !== "";

  return (
    <>
      {/* Hero Header */}
      <section className="bg-gradient-to-br from-luther-blue to-luther-blue-dark text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-3">
            <Newspaper className="w-9 h-9 text-luther-gold" />
            <h1 className="text-3xl md:text-4xl font-bold">
              Boletín Semanal
            </h1>
          </div>
          <p className="text-blue-200 text-base max-w-2xl">
            Manténgase conectado con nuestra congregación. Aquí encontrará los
            boletines semanales con anuncios, actividades y reflexiones.
          </p>
        </div>
      </section>

      {/* Bulletin List */}
      <section className="py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            title="Boletines Publicados"
            subtitle="Consulte los boletines de nuestros servicios semanales"
          />

          {/* Search */}
          {!loading && bulletins.length > 0 && (
            <div className="mb-8 space-y-3">
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Buscar por título o contenido..."
                    className="w-full pl-10 pr-9 py-2.5 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-luther-blue focus:border-luther-blue outline-none bg-white"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery("")}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>

              {/* Results count + clear */}
              {hasFilters && (
                <div className="flex items-center justify-between">
                  <p className="text-sm text-gray-500">
                    {filtered.length === 0
                      ? "No se encontraron boletines"
                      : `${filtered.length} boletín${filtered.length !== 1 ? "es" : ""} encontrado${filtered.length !== 1 ? "s" : ""}`}
                  </p>
                  <button
                    onClick={() => setSearchQuery("")}
                    className="text-sm text-luther-blue hover:text-luther-blue-light font-medium"
                  >
                    Limpiar filtros
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Loading */}
          {loading && (
            <div className="text-center py-12">
              <div className="w-8 h-8 border-4 border-luther-blue/30 border-t-luther-blue rounded-full animate-spin mx-auto mb-4" />
              <p className="text-gray-500">Cargando boletines...</p>
            </div>
          )}

          {/* Bulletin Cards */}
          {!loading && paginatedBulletins.length > 0 && (
            <div className="space-y-4">
              {paginatedBulletins.map((b) => (
                <div
                  key={b.id}
                  className={`bg-white rounded-xl border transition-all ${
                    isExpanded(b.id)
                      ? "border-luther-blue/20 shadow-md"
                      : "border-gray-100 shadow-sm hover:shadow-md"
                  }`}
                >
                  {/* Compact Summary Row */}
                  <button
                    onClick={() => toggleExpand(b.id)}
                    className="w-full text-left p-5 md:p-6"
                  >
                    <div className="flex items-start gap-4">
                      {/* Date badge */}
                      <div className="shrink-0 hidden sm:block">
                        <div className="w-14 h-14 bg-luther-blue/5 rounded-xl flex flex-col items-center justify-center border border-luther-blue/10">
                          <span className="text-xs text-luther-blue font-medium uppercase">
                            {b.date
                              ? new Date(b.date + "T12:00:00").toLocaleDateString(
                                  "es-PR",
                                  { month: "short" }
                                )
                              : ""}
                          </span>
                          <span className="text-lg font-bold text-luther-blue leading-tight">
                            {b.date
                              ? new Date(b.date + "T12:00:00").getDate()
                              : ""}
                          </span>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-3">
                          <div className="min-w-0">
                            <h3 className="text-lg font-bold text-gray-900 leading-snug">
                              {b.title}
                            </h3>
                            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-1.5 text-sm text-gray-500">
                              <span className="sm:hidden flex items-center gap-1">
                                <Calendar className="w-3.5 h-3.5" />
                                {formatDate(b.date)}
                              </span>
                            </div>
                          </div>

                          {/* Expand indicator */}
                          <div className="flex items-center gap-2 shrink-0">
                            <div className="w-7 h-7 bg-gray-100 rounded-full flex items-center justify-center">
                              {isExpanded(b.id) ? (
                                <ChevronUp className="w-4 h-4 text-gray-500" />
                              ) : (
                                <ChevronDown className="w-4 h-4 text-gray-500" />
                              )}
                            </div>
                          </div>
                        </div>

                        {/* Summary text */}
                        {b.summary && !isExpanded(b.id) && (
                          <p className="text-gray-600 text-sm mt-2 line-clamp-2">
                            {b.summary}
                          </p>
                        )}
                      </div>
                    </div>
                  </button>

                  {/* Expanded Content */}
                  {isExpanded(b.id) && (
                    <div className="px-5 md:px-6 pb-6 pt-0">
                      <div className="border-t border-gray-100 pt-5 sm:ml-18">
                        <p className="text-sm text-gray-500 mb-4">
                          <Calendar className="w-3.5 h-3.5 inline mr-1" />
                          {formatDate(b.date)}
                        </p>
                        <div
                          className="prose prose-sm max-w-none text-gray-700 [&>p]:mb-3 [&>h3]:text-lg [&>h3]:font-bold [&>h3]:mt-6 [&>h3]:mb-2 [&>h4]:text-base [&>h4]:font-semibold [&>h4]:mt-4 [&>h4]:mb-2 [&>ul]:list-disc [&>ul]:pl-5 [&>ul]:mb-3 [&>ol]:list-decimal [&>ol]:pl-5 [&>ol]:mb-3"
                          dangerouslySetInnerHTML={{ __html: b.content }}
                        />
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Empty state - no bulletins at all */}
          {!loading && bulletins.length === 0 && (
            <div className="text-center py-16">
              <Newspaper className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                No hay boletines disponibles
              </h3>
              <p className="text-gray-500">
                Próximamente publicaremos nuestro boletín semanal.
              </p>
            </div>
          )}

          {/* Empty state - search returned nothing */}
          {!loading && bulletins.length > 0 && filtered.length === 0 && (
            <div className="text-center py-16">
              <Search className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                No se encontraron boletines
              </h3>
              <p className="text-gray-500 mb-4">
                Intente con otros términos de búsqueda.
              </p>
              <button
                onClick={() => setSearchQuery("")}
                className="text-luther-blue font-semibold text-sm hover:text-luther-blue-light"
              >
                Limpiar filtros
              </button>
            </div>
          )}

          {/* Pagination */}
          {!loading && totalPages > 1 && (
            <nav className="mt-10 flex items-center justify-center gap-1">
              {/* Previous */}
              <button
                onClick={() => goToPage(safeCurrentPage - 1)}
                disabled={safeCurrentPage === 1}
                className="p-2 rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-50 hover:text-gray-700 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                aria-label="Página anterior"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              {/* Page numbers */}
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (page) => {
                  const showPage =
                    page === 1 ||
                    page === totalPages ||
                    Math.abs(page - safeCurrentPage) <= 1;
                  const showEllipsisBefore =
                    page === safeCurrentPage - 2 && safeCurrentPage > 3;
                  const showEllipsisAfter =
                    page === safeCurrentPage + 2 &&
                    safeCurrentPage < totalPages - 2;

                  if (showEllipsisBefore || showEllipsisAfter) {
                    return (
                      <span
                        key={page}
                        className="w-9 h-9 flex items-center justify-center text-gray-400 text-sm"
                      >
                        ...
                      </span>
                    );
                  }

                  if (!showPage) return null;

                  return (
                    <button
                      key={page}
                      onClick={() => goToPage(page)}
                      className={`w-9 h-9 rounded-lg text-sm font-medium transition-colors ${
                        page === safeCurrentPage
                          ? "bg-luther-blue text-white"
                          : "border border-gray-200 text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                      }`}
                    >
                      {page}
                    </button>
                  );
                }
              )}

              {/* Next */}
              <button
                onClick={() => goToPage(safeCurrentPage + 1)}
                disabled={safeCurrentPage === totalPages}
                className="p-2 rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-50 hover:text-gray-700 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                aria-label="Página siguiente"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </nav>
          )}

          {/* Page info */}
          {!loading && filtered.length > PAGE_SIZE && (
            <p className="text-center text-xs text-gray-400 mt-3">
              Página {safeCurrentPage} de {totalPages} · {filtered.length}{" "}
              boletines
            </p>
          )}
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="py-12 bg-luther-cream">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-luther-blue mb-2 text-center">
            Suscríbase al Boletín
          </h2>
          <p className="text-gray-600 text-center mb-6">
            Reciba noticias y anuncios directamente en su correo.
          </p>
          <NewsletterSignup />
        </div>
      </section>
    </>
  );
}
