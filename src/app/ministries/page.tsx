import Link from "next/link";
import SectionHeader from "@/components/SectionHeader";
import { getSiteData } from "@/lib/data";
import { BookOpen, Heart, Users, MessageCircle, Music, HandHeart, ArrowRight } from "lucide-react";

export const dynamic = "force-dynamic";

const iconComponents: Record<string, React.ReactNode> = {
  MessageCircle: <MessageCircle className="w-10 h-10" />,
  Heart: <Heart className="w-10 h-10" />,
  HandHeart: <HandHeart className="w-10 h-10" />,
  BookOpen: <BookOpen className="w-10 h-10" />,
  Music: <Music className="w-10 h-10" />,
  Users: <Users className="w-10 h-10" />,
};

export default function MinistriesPage() {
  const { ministries } = getSiteData();
  const activeMinistries = ministries.filter((m) => m.active);

  return (
    <>
      {/* Header */}
      <section className="bg-gradient-to-br from-luther-blue to-gray-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Ministerios</h1>
          <p className="text-luther-gold-light text-lg max-w-2xl">
            Áreas de servicio donde puedes participar, crecer y servir a otros.
          </p>
        </div>
      </section>

      {/* Ministries Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            title="Nuestros Ministerios"
            subtitle="Cada ministerio es una oportunidad para servir a Dios y a nuestra comunidad"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {activeMinistries.map((m) => (
              <Link
                key={m.id}
                href={"/ministries/" + m.id}
                className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm hover:shadow-lg hover:border-luther-gold/40 transition-all group"
              >
                <div className="text-luther-blue mb-4">
                  {iconComponents[m.icon] || <Users className="w-10 h-10" />}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-1 group-hover:text-luther-blue transition-colors">{m.name}</h3>
                {m.leader && (
                  <p className="text-sm text-gray-400 mb-3">{m.leader}</p>
                )}
                <p className="text-gray-600 leading-relaxed mb-4">{m.description}</p>
                <span className="inline-flex items-center gap-1 text-luther-blue text-sm font-medium group-hover:gap-2 transition-all">
                  Ver más <ArrowRight className="w-4 h-4" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Get Involved CTA */}
      <section className="py-16 bg-luther-blue-dark text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">¿Quieres participar?</h2>
          <p className="text-luther-cream text-lg mb-6 max-w-2xl mx-auto">
            Hay un lugar para ti en nuestros ministerios. Contáctanos para
            saber cómo puedes servir.
          </p>
          <a
            href="/contact"
            className="inline-block bg-white text-luther-blue-dark px-8 py-3 rounded-lg font-semibold hover:bg-luther-cream transition-colors"
          >
            Contáctanos
          </a>
        </div>
      </section>
    </>
  );
}
