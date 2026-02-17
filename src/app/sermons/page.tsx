"use client";

import { useState, useEffect, useMemo } from "react";
import SectionHeader from "@/components/SectionHeader";
import {
  BookOpen,
  Play,
  Video,
  Calendar,
  FileText,
  ChevronDown,
  ChevronUp,
  ChevronLeft,
  ChevronRight,
  User,
  Search,
  X,
} from "lucide-react";

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

export default function SermonsPage() {
  const [sermons, setSermons] = useState<Sermon[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [pastorFilter, setPastorFilter] = useState("");

  useEffect(() => {
    fetch("/api/sermons")
      .then((res) => res.json())
      .then((data) => {
        // Sort by date descending (newest first)
        const sorted = [...data].sort(
          (a: Sermon, b: Sermon) => (b.date || "").localeCompare(a.date || "")
        );
        setSermons(sorted);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  // Unique pastors for the filter dropdown
  const pastors = useMemo(() => {
    const set = new Set(sermons.map((s) => s.pastor).filter(Boolean));
    return Array.from(set).sort();
  }, [sermons]);

  // Filtered sermons
  const filtered = useMemo(() => {
    let result = sermons;

    if (pastorFilter) {
      result = result.filter((s) => s.pastor === pastorFilter);
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(
        (s) =>
          s.title.toLowerCase().includes(q) ||
          s.pastor.toLowerCase().includes(q) ||
          s.scripture.toLowerCase().includes(q) ||
          s.summary.toLowerCase().includes(q)
      );
    }

    return result;
  }, [sermons, pastorFilter, searchQuery]);

  // Pagination
  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const safeCurrentPage = Math.min(currentPage, totalPages);
  const paginatedSermons = filtered.slice(
    (safeCurrentPage - 1) * PAGE_SIZE,
    safeCurrentPage * PAGE_SIZE
  );

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
    setExpandedId(null);
  }, [searchQuery, pastorFilter]);

  function toggleExpand(id: string) {
    setExpandedId(expandedId === id ? null : id);
  }

  function goToPage(page: number) {
    setCurrentPage(page);
    setExpandedId(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  const isExpanded = (id: string) => expandedId === id;
  const hasFilters = searchQuery.trim() !== "" || pastorFilter !== "";

  return (
    <>
      {/* Header */}
      <section className="bg-gradient-to-br from-luther-blue to-luther-blue-dark text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-3">
            <BookOpen className="w-9 h-9 text-luther-gold" />
            <h1 className="text-3xl md:text-4xl font-bold">Archivo de Sermones</h1>
          </div>
          <p className="text-blue-200 text-base max-w-2xl">
            Predicaciones y mensajes de nuestra congregación. Explore los resúmenes
            y expanda para ver la descripción completa o la transcripción.
          </p>
        </div>
      </section>

      {/* Sermons List */}
      <section className="py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            title="Mensajes Recientes"
            subtitle="Escuche o vea las predicaciones de nuestros servicios"
          />

          {/* Search & Filters */}
          {!loading && sermons.length > 0 && (
            <div className="mb-8 space-y-3">
              <div className="flex flex-col sm:flex-row gap-3">
                {/* Search */}
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Buscar por título, predicador, o texto bíblico..."
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

                {/* Pastor filter */}
                {pastors.length > 1 && (
                  <select
                    value={pastorFilter}
                    onChange={(e) => setPastorFilter(e.target.value)}
                    className="px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-luther-blue focus:border-luther-blue outline-none bg-white text-gray-700 min-w-[180px]"
                  >
                    <option value="">Todos los predicadores</option>
                    {pastors.map((p) => (
                      <option key={p} value={p}>
                        {p}
                      </option>
                    ))}
                  </select>
                )}
              </div>

              {/* Results count + clear */}
              {hasFilters && (
                <div className="flex items-center justify-between">
                  <p className="text-sm text-gray-500">
                    {filtered.length === 0
                      ? "No se encontraron sermones"
                      : `${filtered.length} sermón${filtered.length !== 1 ? "es" : ""} encontrado${filtered.length !== 1 ? "s" : ""}`}
                  </p>
                  <button
                    onClick={() => {
                      setSearchQuery("");
                      setPastorFilter("");
                    }}
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
              <p className="text-gray-500">Cargando sermones...</p>
            </div>
          )}

          {/* Sermon Cards */}
          {!loading && paginatedSermons.length > 0 && (
            <div className="space-y-4">
              {paginatedSermons.map((sermon) => (
                <div
                  key={sermon.id}
                  className={`bg-white rounded-xl border transition-all ${
                    isExpanded(sermon.id)
                      ? "border-luther-blue/20 shadow-md"
                      : "border-gray-100 shadow-sm hover:shadow-md"
                  }`}
                >
                  {/* Compact Summary Row */}
                  <button
                    onClick={() => toggleExpand(sermon.id)}
                    className="w-full text-left p-5 md:p-6"
                  >
                    <div className="flex items-start gap-4">
                      {/* Date badge */}
                      <div className="shrink-0 hidden sm:block">
                        <div className="w-14 h-14 bg-luther-blue/5 rounded-xl flex flex-col items-center justify-center border border-luther-blue/10">
                          <span className="text-xs text-luther-blue font-medium uppercase">
                            {sermon.date
                              ? new Date(sermon.date + "T12:00:00").toLocaleDateString("es-PR", { month: "short" })
                              : ""}
                          </span>
                          <span className="text-lg font-bold text-luther-blue leading-tight">
                            {sermon.date ? new Date(sermon.date + "T12:00:00").getDate() : ""}
                          </span>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-3">
                          <div className="min-w-0">
                            <h3 className="text-lg font-bold text-gray-900 leading-snug">
                              {sermon.title}
                            </h3>
                            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-1.5 text-sm text-gray-500">
                              <span className="flex items-center gap-1">
                                <User className="w-3.5 h-3.5" />
                                {sermon.pastor}
                              </span>
                              <span className="sm:hidden flex items-center gap-1">
                                <Calendar className="w-3.5 h-3.5" />
                                {formatDate(sermon.date)}
                              </span>
                              {sermon.scripture && (
                                <span className="flex items-center gap-1">
                                  <BookOpen className="w-3.5 h-3.5" />
                                  {sermon.scripture}
                                </span>
                              )}
                            </div>
                          </div>

                          {/* Expand indicator + badges */}
                          <div className="flex items-center gap-2 shrink-0">
                            <div className="hidden md:flex items-center gap-1.5">
                              {sermon.videoUrl && (
                                <span
                                  className="w-7 h-7 bg-luther-blue/10 rounded-full flex items-center justify-center"
                                  title="Video disponible"
                                >
                                  <Video className="w-3.5 h-3.5 text-luther-blue" />
                                </span>
                              )}
                              {sermon.audioUrl && (
                                <span
                                  className="w-7 h-7 bg-luther-gold/15 rounded-full flex items-center justify-center"
                                  title="Audio disponible"
                                >
                                  <Play className="w-3.5 h-3.5 text-luther-gold-dark" />
                                </span>
                              )}
                              {sermon.transcript && (
                                <span
                                  className="w-7 h-7 bg-green-50 rounded-full flex items-center justify-center"
                                  title="Transcripción disponible"
                                >
                                  <FileText className="w-3.5 h-3.5 text-green-600" />
                                </span>
                              )}
                            </div>
                            <div className="w-7 h-7 bg-gray-100 rounded-full flex items-center justify-center">
                              {isExpanded(sermon.id) ? (
                                <ChevronUp className="w-4 h-4 text-gray-500" />
                              ) : (
                                <ChevronDown className="w-4 h-4 text-gray-500" />
                              )}
                            </div>
                          </div>
                        </div>

                        {/* Summary text */}
                        {sermon.summary && !isExpanded(sermon.id) && (
                          <p className="text-gray-600 text-sm mt-2 line-clamp-2">
                            {sermon.summary}
                          </p>
                        )}
                      </div>
                    </div>
                  </button>

                  {/* Expanded Content */}
                  {isExpanded(sermon.id) && (
                    <div className="px-5 md:px-6 pb-6 pt-0">
                      <div className="border-t border-gray-100 pt-5 sm:ml-18">
                        {/* Summary (shown prominently when expanded) */}
                        {sermon.summary && (
                          <p className="text-gray-700 text-base leading-relaxed mb-5 italic border-l-3 border-luther-gold pl-4">
                            {sermon.summary}
                          </p>
                        )}

                        {/* Full date when expanded */}
                        <p className="text-sm text-gray-500 mb-4 hidden sm:block">
                          <Calendar className="w-3.5 h-3.5 inline mr-1" />
                          {formatDate(sermon.date)}
                        </p>

                        {/* Description */}
                        {sermon.description && (
                          <div className="mb-5">
                            <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">
                              Descripción
                            </h4>
                            <div
                              className="prose prose-sm max-w-none text-gray-700 [&>p]:mb-2 [&>h3]:text-base [&>h3]:font-bold [&>h3]:mt-3 [&>h3]:mb-1 [&>h4]:text-sm [&>h4]:font-semibold [&>h4]:mt-2 [&>h4]:mb-1 [&>ul]:list-disc [&>ul]:pl-5 [&>ol]:list-decimal [&>ol]:pl-5"
                              dangerouslySetInnerHTML={{ __html: sermon.description }}
                            />
                          </div>
                        )}

                        {/* Transcript */}
                        {sermon.transcript && (
                          <div className="mb-5">
                            <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                              <FileText className="w-3.5 h-3.5" />
                              Transcripción del Mensaje
                            </h4>
                            <div
                              className="prose prose-sm max-w-none text-gray-700 [&>p]:mb-3 [&>h3]:text-lg [&>h3]:font-bold [&>h3]:mt-6 [&>h3]:mb-2 [&>h4]:text-base [&>h4]:font-semibold [&>h4]:mt-4 [&>h4]:mb-2 [&>ul]:list-disc [&>ul]:pl-5 [&>ul]:mb-3 [&>ol]:list-decimal [&>ol]:pl-5 [&>ol]:mb-3 [&>hr]:my-6 [&>hr]:border-gray-200"
                              dangerouslySetInnerHTML={{ __html: sermon.transcript }}
                            />
                          </div>
                        )}

                        {/* Media buttons */}
                        <div className="flex flex-wrap gap-3 pt-2">
                          {sermon.videoUrl && (
                            <a
                              href={sermon.videoUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={(e) => e.stopPropagation()}
                              className="inline-flex items-center gap-2 bg-luther-blue text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-luther-blue-light transition-colors"
                            >
                              <Video className="w-4 h-4" />
                              Ver Video
                            </a>
                          )}
                          {sermon.audioUrl && (
                            <a
                              href={sermon.audioUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={(e) => e.stopPropagation()}
                              className="inline-flex items-center gap-2 bg-luther-gold text-luther-blue-dark px-4 py-2 rounded-lg text-sm font-semibold hover:bg-luther-gold-light transition-colors"
                            >
                              <Play className="w-4 h-4" />
                              Escuchar Audio
                            </a>
                          )}
                          {!sermon.videoUrl && !sermon.audioUrl && !sermon.transcript && !sermon.description && (
                            <span className="text-gray-400 text-sm italic">
                              Contenido adicional no disponible
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Empty state - no sermons at all */}
          {!loading && sermons.length === 0 && (
            <div className="text-center py-16">
              <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                No hay sermones disponibles
              </h3>
              <p className="text-gray-500">
                Próximamente estarán disponibles las grabaciones de nuestros sermones.
              </p>
            </div>
          )}

          {/* Empty state - filters returned nothing */}
          {!loading && sermons.length > 0 && filtered.length === 0 && (
            <div className="text-center py-16">
              <Search className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                No se encontraron sermones
              </h3>
              <p className="text-gray-500 mb-4">
                Intente con otros términos de búsqueda o cambie los filtros.
              </p>
              <button
                onClick={() => {
                  setSearchQuery("");
                  setPastorFilter("");
                }}
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
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
                // Show first, last, current, and neighbors
                const showPage =
                  page === 1 ||
                  page === totalPages ||
                  Math.abs(page - safeCurrentPage) <= 1;
                const showEllipsisBefore =
                  page === safeCurrentPage - 2 && safeCurrentPage > 3;
                const showEllipsisAfter =
                  page === safeCurrentPage + 2 && safeCurrentPage < totalPages - 2;

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
              })}

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
              Página {safeCurrentPage} de {totalPages} · {filtered.length} sermones
            </p>
          )}
        </div>
      </section>

      {/* Info */}
      <section className="py-10 bg-luther-cream">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-luther-blue font-medium">
            Los sermones se graban durante el Servicio de Adoración dominical a las 11:00 a.m.
            Visítenos en persona o sintonícenos en línea.
          </p>
        </div>
      </section>
    </>
  );
}
