import Link from "next/link";
import {
  Heart,
  Users,
  ArrowRight,
  CalendarDays,
  HandHeart,
  MessageCircle,
  Music,
  BookOpen,
  Video,
} from "lucide-react";
import Hero from "@/components/Hero";
import SectionHeader from "@/components/SectionHeader";
import NewsletterSignup from "@/components/NewsletterSignup";
import LutherRose from "@/components/LutherRose";
import { getSiteData } from "@/lib/data";

export const dynamic = "force-dynamic";

export default function HomePage() {
  const data = getSiteData();
  const { church, ministries, announcements, events } = data;

  const activeAnnouncements = announcements.filter((a) => a.active);

  const iconMap: Record<string, React.ReactNode> = {
    MessageCircle: <MessageCircle className="w-8 h-8" />,
    Heart: <Heart className="w-8 h-8" />,
    HandHeart: <HandHeart className="w-8 h-8" />,
    BookOpen: <BookOpen className="w-8 h-8" />,
    Music: <Music className="w-8 h-8" />,
    Users: <Users className="w-8 h-8" />,
  };

  return (
    <>
      <Hero />

      {/* Announcements banner */}
      {activeAnnouncements.length > 0 && (
        <section className="bg-luther-cream border-b border-luther-cream-dark">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            {activeAnnouncements.map((a) => (
              <div key={a.id} className="flex items-start gap-3">
                <CalendarDays className="w-5 h-5 text-luther-blue mt-0.5 shrink-0" />
                <div>
                  <p className="font-semibold text-luther-blue-dark">{a.title}</p>
                  <p className="text-sm text-gray-700">{a.content}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Pastor welcome */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <SectionHeader
              title="Bienvenidos"
              subtitle="Un mensaje de nuestra pastora"
            />
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
              <div className="flex justify-center mb-4">
                <LutherRose size={56} />
              </div>
              <p className="text-gray-700 text-lg leading-relaxed mb-6">
                Les damos la más cordial bienvenida a la Iglesia Evangélica
                Luterana Sión. Somos una familia de fe que ha servido a la
                comunidad de Bayamón por más de un siglo. Nuestras puertas están
                abiertas para todos los que buscan crecer en la Palabra de Dios y
                encontrar una comunidad de amor y apoyo.
              </p>
              <p className="font-semibold text-luther-blue">{church.pastor}</p>
              <p className="text-sm text-gray-500">Pastora</p>
            </div>
          </div>
        </div>
      </section>

      {/* Ministries Preview */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            title="Nuestros Ministerios"
            subtitle="Áreas de servicio donde puedes participar y crecer"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {ministries.filter((m) => m.active).map((m) => (
              <Link
                key={m.id}
                href={"/ministries/" + m.id}
                className="group bg-gray-50 rounded-xl p-6 border border-gray-100 hover:border-luther-gold/40 hover:shadow-md transition-all"
              >
                <div className="text-luther-blue mb-3">
                  {iconMap[m.icon] || <Users className="w-8 h-8" />}
                </div>
                <h3 className="font-bold text-lg mb-2">{m.name}</h3>
                <p className="text-gray-600 text-sm">{m.description}</p>
              </Link>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link
              href="/ministries"
              className="inline-flex items-center gap-2 text-luther-blue font-semibold hover:text-luther-blue-light"
            >
              Conoce todos nuestros ministerios <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Upcoming Events */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            title="Próximos Eventos"
            subtitle="Actividades y servicios de nuestra iglesia"
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {events.slice(0, 3).map((e) => (
              <div
                key={e.id}
                className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm"
              >
                <div className="text-luther-gold-dark font-semibold text-sm mb-1">
                  {e.date}
                </div>
                <h3 className="font-bold text-lg mb-2">{e.title}</h3>
                <p className="text-gray-500 text-sm mb-2">{e.time}</p>
                <p className="text-gray-600 text-sm">{e.description}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link
              href="/events"
              className="inline-flex items-center gap-2 text-luther-blue font-semibold hover:text-luther-blue-light"
            >
              Ver todos los eventos <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Live Stream CTA */}
      <section className="py-12 bg-luther-blue text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <Video className="w-10 h-10 text-luther-gold" />
            <div>
              <h3 className="text-xl font-bold">Servicio en Vivo</h3>
              <p className="text-blue-200 text-sm">Únete a nuestro servicio dominical desde cualquier lugar.</p>
            </div>
          </div>
          <Link
            href="/livestream"
            className="bg-luther-gold text-white px-6 py-3 rounded-lg font-semibold hover:bg-luther-gold-dark transition-colors"
          >
            Ver En Vivo
          </Link>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center">
            <SectionHeader
              title="Boletín Semanal"
              subtitle="Recibe noticias, devocionales y anuncios directamente en tu correo."
            />
            <NewsletterSignup />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-luther-blue-dark text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <LutherRose size={64} className="mx-auto mb-6" />
          <h2 className="text-3xl font-bold mb-4">¿Primera vez visitándonos?</h2>
          <p className="text-blue-100 text-lg mb-8 max-w-2xl mx-auto">
            Te invitamos a ser parte de nuestra familia. Ven y comparte con
            nosotros un servicio dominical.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/new-visitor"
              className="bg-luther-gold text-white px-8 py-3 rounded-lg font-semibold hover:bg-luther-gold-dark transition-colors"
            >
              Información para Visitantes
            </Link>
            <Link
              href="/contact"
              className="border-2 border-luther-gold/50 text-white px-8 py-3 rounded-lg font-semibold hover:bg-white/10 transition-colors"
            >
              Contáctanos
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
