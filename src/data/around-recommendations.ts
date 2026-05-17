export type RecommendationCategory = 'restaurant' | 'walk' | 'activity' | 'village' | 'bike';
export type WeatherTag = 'beau-temps' | 'pluie' | 'indoor' | 'outdoor';
export type RecommendationDifficulty = 'facile' | 'moyen' | 'sportif' | 'difficile';
export type RecommendationPriceRange = '€' | '€€' | '€€€' | '€€€€';

export type AroundRecommendation = {
  id: string;
  aliases: string[];
  category: RecommendationCategory;
  section: 'restaurants' | 'promenades' | 'beau-temps' | 'pluie' | 'villages-patrimoine' | 'velo';
  locationLabel?: string;
  distanceFromGite?: string;
  duration?: string;
  walkDistance?: string;
  routeDistance?: string;
  difficulty?: RecommendationDifficulty;
  cuisineType?: string;
  priceRange?: RecommendationPriceRange;
  activityType?: string;
  weatherTags?: WeatherTag[];
  routeType?: string;
  websiteUrl?: string;
  mapsUrl?: string;
  phone?: string;
  tags?: string[];
  notesForAdmin?: string;
};

export const aroundRecommendations: AroundRecommendation[] = [
  {
    id: 'restaurant-le-tcheste',
    aliases: ['Le Tchesté'],
    category: 'restaurant',
    section: 'restaurants',
    locationLabel: 'Neufchâteau',
    distanceFromGite: 'Environ 20 min',
    cuisineType: 'Brasserie, burgers maison, grillades',
    priceRange: '€€',
    tags: ['convivial', 'burgers', 'brasserie'],
    websiteUrl: 'https://letcheste.be/',
    mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Le%20Tchest%C3%A9%20Rue%20des%20Tanneries%201%206840%20Neufch%C3%A2teau',
    phone: 'tel:+3261469509',
    notesForAdmin: 'Source trouvée : site officiel + fiche Gites Ardenne. Vérifier si le numéro +32 61 46 95 09 est toujours le bon avant mise en production.',
  },
  {
    id: 'restaurant-au-brichpotes',
    aliases: ["Au Brichpot'es", 'Au Brichpot’es', 'Le Relais de Mirwart'],
    category: 'restaurant',
    section: 'restaurants',
    locationLabel: 'Mirwart',
    distanceFromGite: 'Environ 20 min',
    cuisineType: 'Cuisine belge, terroir, brasserie',
    priceRange: '€€',
    tags: ['ardennais', 'terroir', 'mirwart'],
    websiteUrl: 'https://www.brichpotes.be/',
    mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Au%20Brichpot%27es%20Place%20communale%2035%206870%20Mirwart',
    phone: 'tel:+3284213685',
    notesForAdmin: 'Le site officiel indique +32 84 21 36 85. Certaines sources mentionnent aussi un mobile +32 499 41 39 19. À vérifier selon le numéro préféré.',
  },
  {
    id: 'restaurant-les-frangins',
    aliases: ['Les Frangins', 'A local table in Libin', 'Een lokaal adres in Libin'],
    category: 'restaurant',
    section: 'restaurants',
    locationLabel: 'Libin',
    distanceFromGite: 'Environ 5 min',
    cuisineType: 'Brasserie, grill, terroir',
    priceRange: '€€',
    tags: ['libin', 'grillade', 'brasserie'],
    websiteUrl: 'https://www.lesfrangins.be/',
    mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Les%20Frangins%20Rue%20du%20Commerce%2039%206890%20Libin',
    phone: 'tel:+32460965461',
    notesForAdmin: 'Le site officiel indique Rue du Commerce 39, Libin, téléphone +32 460 96 54 61, ouvert tous les jours 11h-22h.',
  },
  {
    id: 'restaurant-le-cor-de-chasse',
    aliases: ['Le Cor de Chasse'],
    category: 'restaurant',
    section: 'restaurants',
    locationLabel: 'Saint-Hubert',
    distanceFromGite: 'Environ 20 min',
    cuisineType: 'Restaurant, cuisine de saison, produits locaux',
    priceRange: '€€€',
    tags: ['classe', 'occasion spéciale', 'saint-hubert'],
    websiteUrl: 'https://www.lecordechasserestaurant.be/page-d-accueil',
    mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Le%20Cor%20de%20Chasse%20Restaurant%20Avenue%20Nestor%20Martin%203%206870%20Saint-Hubert',
    phone: 'tel:+32471926314',
    notesForAdmin: 'Attention : ne pas confondre le site hôtel et le site restaurant. Pour le restaurant, la source trouvée indique +32 471 92 63 14.',
  },
  {
    id: 'walk-balade-du-bourgmestre',
    aliases: ['Balade du Bourgmestre', 'Promenade du bourgmestre', 'Walking near Libin', 'Wandelen bij Libin'],
    category: 'walk',
    section: 'promenades',
    locationLabel: 'Libin',
    distanceFromGite: 'Sur place',
    walkDistance: '8,8 km',
    duration: 'Environ 2h30',
    difficulty: 'moyen',
    tags: ['proche', 'forêt', 'boucle'],
    websiteUrl: 'https://www.foretdesainthubert-tourisme.be/details/LOD-A0-002D-0G1R&type=8/',
    mapsUrl: 'https://www.google.com/maps/search/?api=1&query=%C3%89glise%20de%20Libin%206890%20Libin',
    notesForAdmin: "Départ depuis l'église de Libin. Distance 8,8 km. Durée 2h27 selon Ardennes-étape ; la source touristique parle d'une boucle d'environ 8,7/8,8 km.",
  },
  {
    id: 'walk-domaine-de-mirwart',
    aliases: ['Domaine de Mirwart', 'Mirwart estate', 'Domein van Mirwart'],
    category: 'walk',
    section: 'promenades',
    locationLabel: 'Mirwart',
    distanceFromGite: 'Environ 20 min',
    walkDistance: 'Environ 4,2 à 4,3 km',
    duration: 'Environ 1h à 1h30',
    difficulty: 'facile',
    tags: ['château', 'village', 'forêt'],
    websiteUrl: 'https://fr.ardennes-etape.be/experience/balade/mirwart-parc-sh27',
    mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Domaine%20provincial%20de%20Mirwart%20Rue%20du%20Moulin%2016%206870%20Mirwart',
    notesForAdmin: "Il existe plusieurs promenades à Mirwart. Cette entrée semble correspondre à la promenade du Parc, environ 4,2/4,3 km. Vérifier si c'est bien celle voulue.",
  },
  {
    id: 'walk-redu-passage-des-chevres',
    aliases: ['Redu', 'Around Redu', 'Rond Redu', 'Redu - Passage des Chèvres', 'Redu — Passage des Chèvres'],
    category: 'walk',
    section: 'promenades',
    locationLabel: 'Redu',
    distanceFromGite: 'Environ 10 min',
    walkDistance: '5,1 km',
    duration: 'Environ 1h30',
    difficulty: 'moyen',
    tags: ['livres', 'balade douce', 'village'],
    websiteUrl: 'https://fr.ardennes-etape.be/experience/balade/redu-variante-du-passage-des-chevres-li05',
    mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Redu%20Village%20du%20Livre%206890%20Libin',
    notesForAdmin: 'Le site de Libin mentionne aussi Le Passage des Chèvres 8,1 km ou variante 5,1 km. Ici, on utilise la variante courte de 5,1 km.',
  },
  {
    id: 'walk-bois-de-saint-hubert',
    aliases: ['Bois de Saint-Hubert', 'Saint-Hubert nature side', 'Saint-Hubert en natuur'],
    category: 'walk',
    section: 'promenades',
    locationLabel: 'Saint-Hubert',
    distanceFromGite: 'Environ 15 min',
    walkDistance: 'Environ 3,4 km',
    duration: 'Environ 45 min à 1h',
    difficulty: 'facile',
    tags: ['patrimoine', 'nature', 'forêt'],
    websiteUrl: 'https://www.foretdesainthubert-tourisme.be/se-promener/',
    mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Bois%20de%20Saint-Hubert%20Belgique',
    notesForAdmin: 'La page générale de la Maison du Tourisme est plus fiable pour le territoire. La distance 3,4 km vient d’AllTrails. Vérifier le parcours exact à recommander.',
  },
  {
    id: 'activity-kayak-lesse',
    aliases: ['Kayak sur la Lesse'],
    category: 'activity',
    section: 'beau-temps',
    locationLabel: 'Houyet / Anseremme',
    distanceFromGite: 'Environ 40 à 55 min selon le point de départ',
    duration: '2h à 5h selon le parcours',
    activityType: 'Kayak',
    weatherTags: ['beau-temps', 'outdoor'],
    tags: ['nature', 'rivière', 'sport'],
    websiteUrl: 'https://www.dinant-evasion.be/fr/kayak-sur-la-lesse',
    mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Dinant%20Evasion%20Kayak%20Lesse%20Anseremme',
    notesForAdmin: 'Dinant Évasion propose notamment 9 km, 12 km et 21 km. Vérifier le point de départ à conseiller selon le public.',
  },
  {
    id: 'activity-paintball',
    aliases: ['Paintball'],
    category: 'activity',
    section: 'beau-temps',
    locationLabel: 'À préciser',
    distanceFromGite: 'À vérifier',
    duration: 'Environ 2h',
    activityType: 'Paintball',
    weatherTags: ['beau-temps', 'outdoor'],
    tags: ['groupe', 'fun', 'sport'],
    websiteUrl: 'https://www.paintballexperience.be/fr/',
    mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Paintball%20Experience%20Belgique%20Ardenne',
    notesForAdmin: "À valider : le site actuel du site mentionne seulement Paintball sans nommer l'opérateur. Paintball Experience semble être une option proche/régionale, mais il faut confirmer que c'est bien celui que les propriétaires veulent recommander. Alternative trouvée : Ferme Aventure à La Roche-en-Ardenne.",
  },
  {
    id: 'activity-baignade-lesse',
    aliases: ['Se baigner dans la Lesse'],
    category: 'activity',
    section: 'beau-temps',
    locationLabel: 'Zones officielles de baignade',
    distanceFromGite: 'Selon la zone choisie',
    activityType: 'Baignade nature',
    weatherTags: ['beau-temps', 'outdoor'],
    tags: ['rivière', 'été', 'sécurité'],
    websiteUrl: 'https://www.crlesse.be/baignade/',
    mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Zone%20de%20baignade%20La%20Lesse%20%C3%A0%20Houyet',
    notesForAdmin: 'Important : éviter de recommander une baignade libre non contrôlée. La page doit parler de zones officielles et rappeler de vérifier les conditions sanitaires/sécurité.',
  },
  {
    id: 'activity-foret-libin',
    aliases: ['Balade en forêt autour de Libin'],
    category: 'activity',
    section: 'beau-temps',
    locationLabel: 'Libin',
    distanceFromGite: 'Sur place / quelques minutes',
    activityType: 'Balade nature',
    weatherTags: ['beau-temps', 'outdoor'],
    tags: ['nature', 'forêt', 'proche'],
    websiteUrl: 'https://www.libin.be/nos-promenades-balisees',
    mapsUrl: 'https://www.google.com/maps/search/?api=1&query=promenades%20balis%C3%A9es%20Libin',
    notesForAdmin: 'Lien utile vers les promenades balisées de Libin. Peut aussi être remplacé par la Maison du Tourisme de la Forêt de Saint-Hubert.',
  },
  {
    id: 'activity-brasserie-de-la-lesse',
    aliases: ['Brasserie de la Lesse', 'Dégustation à la Brasserie de la Lesse'],
    category: 'activity',
    section: 'pluie',
    locationLabel: 'Éprave / Rochefort',
    distanceFromGite: 'Environ 30 à 35 min',
    duration: 'Visite environ 1h30',
    activityType: 'Dégustation',
    weatherTags: ['pluie', 'indoor'],
    tags: ['bière', 'dégustation', 'artisanal'],
    websiteUrl: 'https://www.brasseriedelalesse.be/',
    mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Brasserie%20de%20la%20Lesse%20%C3%89prave%20Rochefort',
    notesForAdmin: 'La source officielle indique visite + dégustation 12€/personne, visite seule 7€, durée environ 1h30. Vérifier horaires avant affichage détaillé.',
  },
  {
    id: 'activity-bowling-libramont',
    aliases: ['Bowling à Libramont'],
    category: 'activity',
    section: 'pluie',
    locationLabel: 'Libramont',
    distanceFromGite: 'Environ 15 à 20 min',
    activityType: 'Bowling',
    weatherTags: ['pluie', 'indoor'],
    tags: ['bowling', 'arcade', 'indoor'],
    websiteUrl: 'https://fungalaxy.be/',
    mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Fun%20Galaxy%20Libramont',
    notesForAdmin: "Le bowling semble être Fun Galaxy Libramont. Le site mentionne bowling, laser game, mini-golf, arcades, billards. Vérifier que c'est bien l'établissement voulu.",
  },
  {
    id: 'activity-euro-space-center',
    aliases: ['Euro Space Center'],
    category: 'activity',
    section: 'pluie',
    locationLabel: 'Transinne',
    distanceFromGite: 'Environ 5 à 10 min',
    duration: 'Environ 6h pour la visite complète',
    activityType: 'Musée / expérience',
    weatherTags: ['pluie', 'indoor'],
    tags: ['espace', 'famille', 'indoor'],
    websiteUrl: 'https://www.eurospacecenter.be/',
    mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Euro%20Space%20Center%201%20rue%20devant%20les%20H%C3%AAtres%206890%20Transinne',
    notesForAdmin: 'Adresse officielle : 1, rue devant les Hêtres, B-6890 Transinne. La page infos indique parking gratuit et durée indicative 6h.',
  },
  {
    id: 'activity-spa-bulles-do',
    aliases: ["Spa Bulles d'O", 'Spa Bulles d’O'],
    category: 'activity',
    section: 'pluie',
    locationLabel: 'Bertrix',
    distanceFromGite: 'Environ 20 à 25 min',
    activityType: 'Spa privatif',
    weatherTags: ['pluie', 'indoor'],
    tags: ['spa', 'bien-être', 'privatif'],
    websiteUrl: 'https://bullesdo.be/',
    mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Bulles%20d%27O%20Rue%20de%20la%20Gare%20164%206880%20Bertrix',
    notesForAdmin: "Sources secondaires indiquent Rue de la Gare 164, 6880 Bertrix. Vérifier l'adresse et les prestations exactes avant affichage public.",
  },
  {
    id: 'village-bouillon',
    aliases: ['Bouillon'],
    category: 'village',
    section: 'villages-patrimoine',
    locationLabel: 'Bouillon',
    distanceFromGite: 'Environ 45 à 50 min',
    tags: ['château', 'patrimoine', 'semois'],
    websiteUrl: 'https://www.paysdebouillon.be/',
    mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Bouillon%20Belgique',
    notesForAdmin: 'Possibilité de lier aussi directement le Château fort : https://www.chateaudebouillon.com/',
  },
  {
    id: 'village-chassepierre',
    aliases: ['Chassepierre'],
    category: 'village',
    section: 'villages-patrimoine',
    locationLabel: 'Chassepierre',
    distanceFromGite: 'Environ 45 à 50 min',
    tags: ['village', 'patrimoine', 'semois'],
    websiteUrl: 'https://beauxvillages.be/villages/chassepierre/',
    mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Chassepierre%20Belgique',
    notesForAdmin: 'Lien à vérifier selon la page officielle souhaitée : Beaux Villages ou tourisme local.',
  },
  {
    id: 'village-mirwart',
    aliases: ['Mirwart'],
    category: 'village',
    section: 'villages-patrimoine',
    locationLabel: 'Mirwart',
    distanceFromGite: 'Environ 20 min',
    tags: ['village', 'château', 'forêt'],
    websiteUrl: 'https://beauxvillages.be/villages/mirwart/',
    mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Mirwart%20Belgique',
    notesForAdmin: 'Mirwart est aussi lié au Domaine provincial et aux promenades.',
  },
  {
    id: 'village-redu',
    aliases: ['Redu'],
    category: 'village',
    section: 'villages-patrimoine',
    locationLabel: 'Redu',
    distanceFromGite: 'Environ 10 min',
    tags: ['village du livre', 'librairies', 'balade'],
    websiteUrl: 'https://www.redu-villagedulivre.be/',
    mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Redu%20Village%20du%20Livre',
    notesForAdmin: 'Vérifier le site officiel préféré. Alternative : page tourisme de Libin ou Beaux Villages.',
  },
  {
    id: 'bike-boucle-saint-hubert',
    aliases: ['Boucle de Saint-Hubert'],
    category: 'bike',
    section: 'velo',
    locationLabel: 'Saint-Hubert',
    distanceFromGite: 'Environ 15 min',
    routeType: 'Boucle à préciser',
    tags: ['vélo', 'forêt', 'saint-hubert'],
    websiteUrl: 'https://www.foretdesainthubert-tourisme.be/se-promener/',
    mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Saint-Hubert%20Belgique',
    notesForAdmin: "À compléter avec l'itinéraire vélo exact, distance, durée et difficulté.",
  },
  {
    id: 'bike-la-roche',
    aliases: ['La Roche'],
    category: 'bike',
    section: 'velo',
    locationLabel: 'La Roche-en-Ardenne',
    distanceFromGite: 'Environ 45 à 50 min',
    routeType: 'Parcours sportif à préciser',
    tags: ['vélo', 'ardenne', 'sportif'],
    websiteUrl: 'https://www.coeurdelardenne.be/',
    mapsUrl: 'https://www.google.com/maps/search/?api=1&query=La%20Roche-en-Ardenne',
    notesForAdmin: "À compléter avec l'itinéraire vélo exact. Le lien est une base tourisme régionale.",
  },
  {
    id: 'bike-le-long-de-la-lesse',
    aliases: ['Le long de la Lesse'],
    category: 'bike',
    section: 'velo',
    locationLabel: 'Vallée de la Lesse',
    routeType: "Au fil de l'eau",
    tags: ['vélo', 'lesse', 'nature'],
    websiteUrl: 'https://www.foretdesainthubert-tourisme.be/se-promener/',
    mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Vall%C3%A9e%20de%20la%20Lesse%20Belgique',
    notesForAdmin: 'À compléter avec un itinéraire vélo exact.',
  },
  {
    id: 'bike-ravel-libin-redu',
    aliases: ['Le RAVeL Libin-Redu'],
    category: 'bike',
    section: 'velo',
    locationLabel: 'Libin / Redu',
    distanceFromGite: 'Sur place / environ 10 min',
    routeType: 'RAVeL',
    tags: ['vélo', 'ravel', 'redu'],
    websiteUrl: 'https://ravel.wallonie.be/',
    mapsUrl: 'https://www.google.com/maps/search/?api=1&query=RAVeL%20Libin%20Redu',
    notesForAdmin: "À vérifier : confirmer l'intitulé exact, le tracé, la distance et la difficulté.",
  },
];

const mapsSearch = (query: string) => `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;

const normalize = (value: string) =>
  value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, ' ')
    .trim();

export function getAroundRecommendation(sectionKey: string, itemName: string) {
  const normalizedName = normalize(itemName);

  return aroundRecommendations.find((recommendation) => {
    if (sectionKey === 'villages' && recommendation.category !== 'village') {
      return false;
    }

    if (sectionKey === 'walks' && recommendation.category !== 'walk') {
      return false;
    }

    if (sectionKey === 'cycling' && recommendation.category !== 'bike') {
      return false;
    }

    return recommendation.aliases.some((alias) => normalize(alias) === normalizedName);
  });
}

export function getFallbackMapsUrl(name: string, location?: string) {
  return mapsSearch([name, location, 'Belgique'].filter(Boolean).join(' '));
}
