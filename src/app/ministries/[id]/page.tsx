import SectionHeader from "@/components/SectionHeader";
import { getSiteData } from "@/lib/data";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  MessageCircle,
  Heart,
  HandHeart,
  BookOpen,
  Music,
  Users,
  Church,
  Sparkles,
  Star,
  Clock,
  MapPin,
  Calendar,
  User,
  Mail,
  Phone,
  ArrowLeft,
} from "lucide-react";

export const dynamic = "force-dynamic";

const iconComponents: Record<string, React.ReactNode> = {
  MessageCircle: <MessageCircle className="w-16 h-16" />,
  Heart: <Heart className="w-16 h-16" />,
  HandHeart: <HandHeart className="w-16 h-16" />,
  BookOpen: <BookOpen className="w-16 h-16" />,
  Music: <Music className="w-16 h-16" />,
  Users: <Users className="w-16 h-16" />,
  Church: <Church className="w-16 h-16" />,
  Sparkles: <Sparkles className="w-16 h-16" />,
  Star: <Star className="w-16 h-16" />,
};

interface Props {
  params: Promise<{ id: string }>;
}

export default async function MinistryDetailPage({ params }: Props) {
  const { id } = await params;
  const { ministries } = getSiteData();
  const ministry = ministries.find((m: { id: string }) => m.id === id);

  if (!ministry || !ministry.active) {
    notFound();
  }

  return (
    <>
      {/* Back Link */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <Link
          href="/ministries"
          className="inline-flex items-center gap-2 text-luther-blue hover:text-luther-blue-light transition-colors font-medium"
        >
          <ArrowLeft className="w-4 h-4" />
          Volver a Ministerios
        </Link>
      </div>

      {/* Hero Header */}
      <section className="bg-gradient-to-br from-luther-blue to-gray-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4 mb-4">
            <div className="text-luther-gold">
              {iconComponents[ministry.icon] || <Users className="w-16 h-16" />}
            </div>
            <h1 className="text-4xl md:text-5xl font-bold">{ministry.name}</h1>
          </div>
          <p className="text-luther-gold-light text-lg max-w-2xl">
            {ministry.description}
          </p>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg max-w-4xl mx-auto text-gray-700">
            <p>{ministry.content || ministry.description}</p>
          </div>
        </div>
      </section>

      {/* Meeting Info Card */}
      {(ministry.meetingDay || ministry.meetingTime || ministry.leader) && (
        <section className="pb-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-luther-cream rounded-2xl p-8 max-w-4xl mx-auto">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Información de Reunión
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {ministry.meetingDay && (
                  <div className="flex items-start gap-3">
                    <Calendar className="w-6 h-6 text-luther-gold-dark flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm text-gray-500 font-medium">Día</p>
                      <p className="text-luther-blue font-bold text-lg">
                        {ministry.meetingDay}
                      </p>
                    </div>
                  </div>
                )}
                {ministry.meetingTime && (
                  <div className="flex items-start gap-3">
                    <Clock className="w-6 h-6 text-luther-gold-dark flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm text-gray-500 font-medium">Hora</p>
                      <p className="text-luther-blue font-bold text-lg">
                        {ministry.meetingTime}
                      </p>
                    </div>
                  </div>
                )}
                {ministry.location && (
                  <div className="flex items-start gap-3">
                    <MapPin className="w-6 h-6 text-luther-gold-dark flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm text-gray-500 font-medium">Lugar</p>
                      <p className="text-luther-blue font-bold text-lg">
                        {ministry.location}
                      </p>
                    </div>
                  </div>
                )}
                {ministry.leader && (
                  <div className="flex items-start gap-3">
                    <User className="w-6 h-6 text-luther-gold-dark flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm text-gray-500 font-medium">Líder</p>
                      <p className="text-luther-blue font-bold text-lg">
                        {ministry.leader}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Activities Grid */}
      {ministry.activities && ministry.activities.length > 0 && (
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeader
              title="Actividades y Programas"
              subtitle="Lo que hacemos en este ministerio"
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {ministry.activities.map(
                (activity: { name: string; description: string }) => (
                  <div
                    key={activity.name}
                    className="bg-white rounded-xl p-6 border border-gray-100"
                  >
                    <h3 className="font-bold text-gray-900 mb-2">
                      {activity.name}
                    </h3>
                    <p className="text-gray-600 text-sm">
                      {activity.description}
                    </p>
                  </div>
                )
              )}
            </div>
          </div>
        </section>
      )}

      {/* Contact CTA Section */}
      <section className="bg-luther-blue-dark text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">
            ¿Quieres participar en este ministerio?
          </h2>
          <p className="text-luther-cream text-lg mb-6 max-w-2xl mx-auto">
            Contáctanos para más información sobre cómo puedes
            unirte y servir.
          </p>

          {(ministry.contactEmail || ministry.contactPhone) && (
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
              {ministry.contactEmail && (
                <a
                  href={`mailto:${ministry.contactEmail}`}
                  className="inline-flex items-center gap-2 text-luther-gold-light hover:text-luther-gold transition-colors"
                >
                  <Mail className="w-5 h-5" />
                  {ministry.contactEmail}
                </a>
              )}
              {ministry.contactPhone && (
                <a
                  href={`tel:${ministry.contactPhone.replace(/[^0-9]/g, "")}`}
                  className="inline-flex items-center gap-2 text-luther-gold-light hover:text-luther-gold transition-colors"
                >
                  <Phone className="w-5 h-5" />
                  {ministry.contactPhone}
                </a>
              )}
            </div>
          )}

          <Link
            href="/contact"
            className="inline-block bg-white text-luther-blue-dark px-8 py-3 rounded-lg font-semibold hover:bg-luther-cream transition-colors"
          >
            Contáctanos
          </Link>
        </div>
      </section>
    </>
  );
}
