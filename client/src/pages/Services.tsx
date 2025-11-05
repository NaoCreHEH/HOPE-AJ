import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { trpc } from "@/lib/trpc";

const defaultServices = [
  {
    title: "Trivial Pursuit Géant – Version extérieure",
    subtitle: "Jeu pédagogique grandeur nature",
    flower: null,
    flowerMeaning: null,
    description:
      "Jeu grandeur nature en cour de récréation pour sensibiliser au vivre-ensemble et au respect. Déplacements en équipes avec dé géant, questions et défis.",
    targetAudience: "Fin primaire (5e–6e) et début secondaire (1re–2e)",
    duration: "4h (1h installation – 2h30 de jeu – 30 min débrief)",
    price: "80€",
    icon: "🎲",
  },
  {
    title: "Trivial Pursuit Géant – Version intérieure (plan B)",
    subtitle: "Adaptation en salle",
    flower: null,
    flowerMeaning: null,
    description:
      "Adaptation en salle (plateau ~1m x 1m) en cas de mauvais temps, mêmes objectifs et mécaniques que la version extérieure.",
    targetAudience: "Fin primaire (5e–6e) et début secondaire (1re–2e)",
    duration: "3h30 (30 min installation – 2h30 de jeu – 30 min débrief)",
    price: "60€",
    icon: "🏫",
  },
  {
    title: "Sensibilisation au harcèlement – débats/discussions",
    subtitle: "Cercle de paroles en classe",
    flower: null,
    flowerMeaning: null,
    description:
      "Échanges sur le harcèlement, histoires personnelles, réseaux sociaux, hypersensibilité, rôle de la famille. Conclusion positive et bienveillante.",
    targetAudience: "Primaire et secondaire (max 20 élèves/groupe)",
    duration: "1h",
    price: "20€ par classe (15€ si ≥ 3 classes/jour)",
    icon: "🗣️",
  },
  {
    title: "Cyber-Aventure – Mission contre le cyberharcèlement (élèves)",
    subtitle: "Atelier interactif",
    flower: null,
    flowerMeaning: null,
    description:
      "Atelier mêlant théorie, jeux, défis en équipes et restitution finale pour comprendre et prévenir le cyberharcèlement.",
    targetAudience: "Élèves du secondaire",
    duration: "1h30",
    price: "40€ par classe",
    icon: "🛡️",
  },
  {
    title: "Formation sur le cyberharcèlement – Parents d’élèves",
    subtitle: "Comprendre & protéger",
    flower: null,
    flowerMeaning: null,
    description:
      "Comprendre le (cyber)harcèlement, les risques des usages numériques et les outils concrets pour protéger ses enfants.",
    targetAudience: "Parents d’élèves",
    duration: "1h30",
    price: "80€ par session",
    icon: "👨‍👩‍👧",
  },
  {
    title: "Formation sur le cyberharcèlement – Professeurs du secondaire",
    subtitle: "Cadre, repérage, prévention",
    flower: null,
    flowerMeaning: null,
    description:
      "Mécanismes, signalements, cadre légal et responsabilités ; inclut 1h de sensibilisation via fiches pédagogiques multi-matières.",
    targetAudience: "Professeurs du secondaire",
    duration: "1h30",
    price: "80€ par session",
    icon: "🏫",
  },
  {
    title: "Projets sur mesure – Activités personnalisées",
    subtitle: "Conception adaptée à vos besoins",
    flower: null,
    flowerMeaning: null,
    description:
      "Événements, formations, sensibilisations : on adapte contenu, durée et objectifs selon votre contexte.",
    targetAudience:
      "Élèves (primaire, secondaire, HE/uni) & adultes (professeurs, équipes pédagogiques, parents…)",
    duration: "Variable",
    price: "À partir de 20€ / heure",
    icon: "🧩",
  },
  {
    title: "Présence lors de vos événements",
    subtitle: "Stand / présentation – Gratuit",
    flower: null,
    flowerMeaning: null,
    description:
      "Présence gratuite lors d’événements, JPO ou présentations : découverte des services et échanges avec les participants.",
    targetAudience: "Écoles, associations, organisateurs d’événements",
    duration: "Variable",
    price: "Gratuit",
    icon: "🤝",
  },
];


export default function Services() {
  const { data: servicesFromDb, isLoading } = trpc.services.list.useQuery();
  const services = servicesFromDb && servicesFromDb.length > 0 ? servicesFromDb : defaultServices;

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />

      {/* Hero Section */}
      <section className="bg-hope-yellow text-black py-16">
        <div className="container">
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-6">
            Nos services
          </h1>
          <p className="text-xl text-center max-w-4xl mx-auto leading-relaxed">
            L'ASBL Hope Action Jeunesse propose des services personnalisés
            adaptés aux besoins spécifiques des écoles, centres et
            institutions. Nous offrons des animations sur mesure, qu'il
            s'agisse d'intervenir auprès d'une centaine d'élèves en une journée
            ou d'organiser une semaine complète de sensibilisation sur des
            thématiques comme le harcèlement.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 bg-white">
        <div className="container">
          {isLoading ? (
            <div className="text-center py-12">
              <p className="text-xl text-gray-600">Chargement...</p>
            </div>
          ) : (
          <div className="grid md:grid-cols-1 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <Card
                key={'id' in service ? (service as any).id : index}
                className="border-2 border-hope-purple hover:shadow-xl transition-shadow"
              >
                <CardHeader className="bg-gradient-purple-blue text-white">
                  {('imageUrl' in service && service.imageUrl) ? (
                    <div className="w-full h-48 overflow-hidden rounded-t-lg mb-4">
                      <img
                        src={service.imageUrl}
                        alt={service.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ) : (
                    <div className="text-5xl text-center mb-4">
                      {'icon' in service ? service.icon : '🌺'}
                    </div>
                  )}
                  <CardTitle className="text-2xl text-center">
                    {service.title}
                  </CardTitle>
                  {'subtitle' in service && (
                    <p className="text-center text-sm opacity-90">
                      {service.subtitle}
                    </p>
                  )}
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="mb-4">
                    <p className="font-semibold text-hope-purple mb-1">
                      Fleur symbolique :
                    </p>
                    <p className="text-sm text-gray-700 italic">
                      {service.flower}
                    </p>
                    <p className="text-sm text-gray-600 mt-2">
                      {service.flowerMeaning}
                    </p>
                  </div>

                  <div className="mb-4">
                    <p className="font-semibold text-hope-purple mb-1">
                      Description :
                    </p>
                    <p className="text-sm text-gray-700">
                      {service.description}
                    </p>
                  </div>

                  <div className="space-y-2 text-sm">
                    <div>
                      <span className="font-semibold text-hope-purple">
                        Public :
                      </span>{" "}
                      {service.targetAudience}
                    </div>
                    <div>
                      <span className="font-semibold text-hope-purple">
                        Durée :
                      </span>{" "}
                      {service.duration}
                    </div>
                    <div>
                      <span className="font-semibold text-hope-purple">
                        Prix :
                      </span>{" "}
                      {service.price}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
