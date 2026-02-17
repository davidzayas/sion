import SectionHeader from "@/components/SectionHeader";
import { getSiteData } from "@/lib/data";
import {
  BookOpen,
  Mountain,
  Heart,
  Users,
  Clock,
  MapPin,
  Mail,
  Phone,
  Sparkles,
} from "lucide-react";

export const dynamic = "force-dynamic";

export default function YouthPage() {
  const { church, serviceSchedule } = getSiteData();

  const sundaySchedule = serviceSchedule.sunday || [];
  const ligaJuvenil = sundaySchedule.find(
    (s) => s.name.toLowerCase().includes("liga juvenil") || s.name.toLowerCase().includes("juventud")
  );

  return (
    <>
      {/* Header */}
      <section className="bg-gradient-to-br from-luther-blue via-luther-blue-light to-luther-blue text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-4">
            <Sparkles className="w-10 h-10 text-luther-gold" />
            <h1 className="text-4xl md:text-5xl font-bold">Liga Juvenil</h1>
          </div>
          <p className="text-luther-gold-light text-lg max-w-2xl">
            Un espacio donde los j&oacute;venes crecen en fe, amistad y servicio.
            &iexcl;&Uacute;nete a nuestra familia joven!
          </p>
        </div>
      </section>

      {/* About Liga Juvenil */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <SectionHeader
              title="&iquest;Qu&eacute; es la Liga Juvenil?"
              subtitle="Una comunidad de j&oacute;venes comprometidos con Cristo"
            />

            <div className="prose prose-lg max-w-none text-gray-700 space-y-4">
              <p>
                La <strong>Liga Juvenil Luterana</strong> de la Iglesia Evang&eacute;lica
                Luterana Si&oacute;n tiene una rica historia que se remonta a 1912, incluso
                antes de que la congregaci&oacute;n se organizara formalmente. Somos un
                grupo de j&oacute;venes apasionados por servir a Dios y a nuestra comunidad.
              </p>
              <p>
                Nos reunimos cada domingo para compartir, aprender y crecer juntos
                en la fe. Nuestras actividades incluyen estudio b&iacute;blico, retiros,
                servicio comunitario y mucho m&aacute;s.
              </p>
            </div>

            {/* Meeting Info */}
            <div className="mt-8 bg-luther-cream rounded-2xl p-6 border border-luther-cream-dark">
              <div className="flex items-center gap-3 mb-4">
                <Clock className="w-6 h-6 text-luther-gold-dark" />
                <h3 className="text-lg font-bold text-gray-900">Nos Reunimos</h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500 font-medium">D&iacute;a y Hora</p>
                  <p className="text-luther-blue font-bold text-lg">
                    Domingos, {ligaJuvenil ? ligaJuvenil.time : "7:30 p.m."}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 font-medium">Lugar</p>
                  <p className="text-luther-blue font-bold text-lg flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    {church.shortName}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Activities */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            title="Nuestras Actividades"
            subtitle="Todo lo que hacemos juntos como j&oacute;venes de Si&oacute;n"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm text-center hover:shadow-md transition-shadow">
              <div className="w-14 h-14 bg-luther-blue/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <BookOpen className="w-7 h-7 text-luther-blue" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Estudio B&iacute;blico</h3>
              <p className="text-gray-600 text-sm">
                Exploramos la Palabra de Dios juntos, aprendiendo c&oacute;mo aplicarla
                a nuestra vida diaria como j&oacute;venes.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm text-center hover:shadow-md transition-shadow">
              <div className="w-14 h-14 bg-luther-gold/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Mountain className="w-7 h-7 text-luther-gold-dark" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Retiros</h3>
              <p className="text-gray-600 text-sm">
                Retiros espirituales y campamentos donde fortalecemos nuestra fe
                y creamos recuerdos inolvidables.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm text-center hover:shadow-md transition-shadow">
              <div className="w-14 h-14 bg-luther-red/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="w-7 h-7 text-luther-red" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Servicio Comunitario</h3>
              <p className="text-gray-600 text-sm">
                Servimos a nuestra comunidad con amor, participando en proyectos
                de alcance y ayuda al pr&oacute;jimo.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm text-center hover:shadow-md transition-shadow">
              <div className="w-14 h-14 bg-luther-blue/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-7 h-7 text-luther-blue" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Confraternidad</h3>
              <p className="text-gray-600 text-sm">
                Actividades sociales, juegos y momentos de convivencia que
                fortalecen nuestros lazos de amistad.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA for Parents and Youth */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* For Youth */}
            <div className="bg-luther-blue rounded-2xl p-8 text-white">
              <Sparkles className="w-8 h-8 text-luther-gold mb-4" />
              <h3 className="text-2xl font-bold mb-3">Para J&oacute;venes</h3>
              <p className="text-luther-gold-light mb-6">
                &iquest;Est&aacute;s buscando un lugar donde pertenecer? &iexcl;La Liga Juvenil
                es para ti! Ven y conoce a otros j&oacute;venes que comparten tu fe.
                No importa si es tu primera vez, te recibiremos con los brazos
                abiertos.
              </p>
              <a
                href={`mailto:${church.email}?subject=Quiero unirme a la Liga Juvenil`}
                className="inline-flex items-center gap-2 bg-luther-gold text-luther-blue-dark px-6 py-3 rounded-lg font-bold hover:bg-luther-gold-light transition-colors"
              >
                <Mail className="w-5 h-5" />
                &iexcl;Quiero Unirme!
              </a>
            </div>

            {/* For Parents */}
            <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm">
              <Users className="w-8 h-8 text-luther-blue mb-4" />
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Para Padres</h3>
              <p className="text-gray-600 mb-6">
                La Liga Juvenil es un espacio seguro y supervisado donde sus
                hijos pueden crecer espiritualmente mientras desarrollan
                amistades saludables. Nuestra pastora y l&iacute;deres juveniles gu&iacute;an
                cada actividad con dedicaci&oacute;n y amor.
              </p>
              <a
                href={`tel:${church.phone.replace(/[^0-9]/g, "")}`}
                className="inline-flex items-center gap-2 bg-luther-blue text-white px-6 py-3 rounded-lg font-bold hover:bg-luther-blue-light transition-colors"
              >
                <Phone className="w-5 h-5" />
                M&aacute;s Informaci&oacute;n
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
