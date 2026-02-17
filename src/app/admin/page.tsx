"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  CalendarDays,
  Clock,
  Megaphone,
  Settings,
  LogOut,
  ChevronRight,
  BookOpen,
  Camera,
  Heart,
  Mail,
  Users,
} from "lucide-react";
import LutherRose from "@/components/LutherRose";

interface DashboardStats {
  events: number;
  announcements: number;
  activeAnnouncements: number;
  sermons: number;
  photos: number;
  ministries: number;
  subscribers: number;
}

export default function AdminDashboard() {
  const router = useRouter();
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const [eventsRes, announcementsRes, sermonsRes, galleryRes, ministriesRes, newsletterRes] = await Promise.all([
          fetch("/api/events"),
          fetch("/api/announcements"),
          fetch("/api/sermons"),
          fetch("/api/gallery"),
          fetch("/api/ministries"),
          fetch("/api/newsletter"),
        ]);
        const events = await eventsRes.json();
        const announcements = await announcementsRes.json();
        const sermons = await sermonsRes.json();
        const gallery = await galleryRes.json();
        const ministries = await ministriesRes.json();
        const subscribers = newsletterRes.ok ? await newsletterRes.json() : [];

        setStats({
          events: events.length,
          announcements: announcements.length,
          activeAnnouncements: announcements.filter(
            (a: { active: boolean }) => a.active
          ).length,
          sermons: sermons.length,
          photos: gallery.length,
          ministries: ministries.length,
          subscribers: subscribers.length,
        });
      } catch {
        router.push("/admin/login");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [router]);

  async function handleLogout() {
    await fetch("/api/auth", { method: "DELETE" });
    router.push("/admin/login");
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-gray-500">Cargando...</div>
      </div>
    );
  }

  const menuItems = [
    {
      href: "/admin/events",
      icon: <CalendarDays className="w-6 h-6" />,
      title: "Eventos",
      desc: "Administrar eventos y actividades",
      stat: stats ? `${stats.events} eventos` : "",
    },
    {
      href: "/admin/hours",
      icon: <Clock className="w-6 h-6" />,
      title: "Horarios",
      desc: "Administrar horarios de servicios y oficina",
      stat: "",
    },
    {
      href: "/admin/ministries",
      icon: <Users className="w-6 h-6" />,
      title: "Ministerios",
      desc: "Administrar ministerios de la iglesia",
      stat: stats ? `${stats.ministries} ministerios` : "",
    },
    {
      href: "/admin/announcements",
      icon: <Megaphone className="w-6 h-6" />,
      title: "Anuncios",
      desc: "Administrar anuncios del sitio",
      stat: stats ? `${stats.activeAnnouncements} activos` : "",
    },
    {
      href: "/admin/sermons",
      icon: <BookOpen className="w-6 h-6" />,
      title: "Sermones",
      desc: "Administrar archivo de sermones",
      stat: stats ? `${stats.sermons} sermones` : "",
    },
    {
      href: "/admin/gallery",
      icon: <Camera className="w-6 h-6" />,
      title: "Galería",
      desc: "Administrar fotos de la iglesia",
      stat: stats ? `${stats.photos} fotos` : "",
    },
    {
      href: "/admin/prayer-requests",
      icon: <Heart className="w-6 h-6" />,
      title: "Peticiones de Oración",
      desc: "Aprobar y moderar peticiones",
      stat: "",
    },
    {
      href: "/admin/newsletter",
      icon: <Mail className="w-6 h-6" />,
      title: "Boletín Semanal",
      desc: "Suscriptores y boletines publicados",
      stat: stats ? `${stats.subscribers} suscriptores` : "",
    },
    {
      href: "/admin/settings",
      icon: <Settings className="w-6 h-6" />,
      title: "Configuración",
      desc: "Información general, enlaces de transmisión en vivo",
      stat: "",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Admin header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <LutherRose size={40} />
            <div>
              <h1 className="font-bold text-gray-900">Panel de Administración</h1>
              <p className="text-sm text-gray-500">IELA Sión</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="text-sm text-gray-500 hover:text-gray-700 transition-colors"
            >
              Ver sitio
            </Link>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 text-sm text-red-600 hover:text-red-700 transition-colors"
            >
              <LogOut className="w-4 h-4" />
              Salir
            </button>
          </div>
        </div>
      </header>

      {/* Dashboard */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          Bienvenido, Administrador
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {menuItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="bg-white rounded-xl p-6 border border-gray-200 hover:border-luther-gold/50 hover:shadow-md transition-all group"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-luther-cream rounded-lg flex items-center justify-center text-luther-blue group-hover:bg-luther-cream-dark transition-colors">
                    {item.icon}
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900">{item.title}</h3>
                    <p className="text-sm text-gray-500 mt-0.5">{item.desc}</p>
                    {item.stat && (
                      <p className="text-sm text-luther-blue font-medium mt-2">
                        {item.stat}
                      </p>
                    )}
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-300 group-hover:text-luther-gold transition-colors" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
