"use client";

import { useState, useEffect } from "react";
import SectionHeader from "@/components/SectionHeader";
import { Camera } from "lucide-react";

interface GalleryPhoto {
  id: string;
  title: string;
  description: string;
  category: string;
  imageUrl: string;
  date: string;
}

const categories = [
  { key: "todas", label: "Todas" },
  { key: "iglesia", label: "Iglesia" },
  { key: "eventos", label: "Eventos" },
  { key: "comunidad", label: "Comunidad" },
  { key: "juventud", label: "Juventud" },
];

export default function GalleryPage() {
  const [photos, setPhotos] = useState<GalleryPhoto[]>([]);
  const [activeCategory, setActiveCategory] = useState("todas");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/gallery")
      .then((res) => res.json())
      .then((data) => {
        setPhotos(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const filtered =
    activeCategory === "todas"
      ? photos
      : photos.filter((p) => p.category === activeCategory);

  return (
    <>
      {/* Header */}
      <section className="bg-gradient-to-br from-luther-blue to-luther-blue-dark text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Galer&iacute;a de Fotos</h1>
          <p className="text-luther-gold-light text-lg max-w-2xl">
            Im&aacute;genes de nuestra congregaci&oacute;n, eventos y vida comunitaria.
          </p>
        </div>
      </section>

      {/* Gallery */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            title="Nuestras Fotos"
            subtitle="Momentos especiales de nuestra familia de fe"
          />

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {categories.map((cat) => (
              <button
                key={cat.key}
                onClick={() => setActiveCategory(cat.key)}
                className={`px-5 py-2 rounded-full text-sm font-semibold transition-colors ${
                  activeCategory === cat.key
                    ? "bg-luther-blue text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-luther-blue/10 hover:text-luther-blue"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Loading */}
          {loading && (
            <div className="text-center py-12">
              <div className="w-8 h-8 border-4 border-luther-blue/30 border-t-luther-blue rounded-full animate-spin mx-auto mb-4" />
              <p className="text-gray-500">Cargando fotos...</p>
            </div>
          )}

          {/* Photo Grid */}
          {!loading && filtered.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((photo) => (
                <div
                  key={photo.id}
                  className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
                >
                  {/* Image placeholder */}
                  {photo.imageUrl && !photo.imageUrl.includes("placeholder") ? (
                    <div className="aspect-[4/3] overflow-hidden">
                      <img
                        src={photo.imageUrl}
                        alt={photo.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ) : (
                    <div className="aspect-[4/3] bg-gray-200 flex flex-col items-center justify-center">
                      <Camera className="w-12 h-12 text-gray-400 mb-2" />
                      <span className="text-gray-400 text-sm">Foto</span>
                    </div>
                  )}

                  <div className="p-5">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-luther-blue/10 text-luther-blue capitalize">
                        {photo.category}
                      </span>
                      <span className="text-xs text-gray-400">{photo.date}</span>
                    </div>
                    <h3 className="font-bold text-gray-900 mb-1">{photo.title}</h3>
                    <p className="text-gray-600 text-sm">{photo.description}</p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Empty state */}
          {!loading && filtered.length === 0 && (
            <div className="text-center py-16">
              <Camera className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                No hay fotos disponibles
              </h3>
              <p className="text-gray-500">
                {activeCategory === "todas"
                  ? "A&uacute;n no se han a&ntilde;adido fotos a la galer&iacute;a."
                  : "No hay fotos en esta categor&iacute;a."}
              </p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
