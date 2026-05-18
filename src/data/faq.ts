import type { Locale } from '@/lib/i18n';

export type FaqItem = {
  id: string;
  category: 'reservation' | 'arrival' | 'comfort' | 'accessibility' | 'family-pets' | 'outdoor' | 'payment' | 'around';
  question: string;
  answer: string;
};

const faqItems: Record<Locale, FaqItem[]> = {
  fr: [
    { id: 'how-to-book', category: 'reservation', question: 'Comment réserver ?', answer: 'Vous pouvez réserver via WhatsApp, via le formulaire de réservation du site ou via Airbnb.' },
    { id: 'one-night', category: 'reservation', question: 'Peut-on réserver pour une seule nuit ?', answer: 'Oui, il est possible de réserver pour une nuit, selon les disponibilités.' },
    { id: 'direct-booking', category: 'reservation', question: 'Y a-t-il un avantage à réserver via le site ?', answer: 'Oui, en réservant directement via le site, vous pouvez bénéficier d’une promotion ou d’un avantage direct selon la période. Contactez-nous pour connaître les conditions disponibles pour vos dates.' },
    { id: 'cleaning', category: 'payment', question: 'Les frais de ménage sont-ils inclus ?', answer: 'Oui, les frais de ménage sont inclus.' },
    { id: 'pets', category: 'family-pets', question: 'Les animaux sont-ils acceptés ?', answer: 'Les animaux peuvent être acceptés sur demande. Contactez-nous avant votre réservation afin de vérifier ensemble si le séjour est adapté.' },
    { id: 'children', category: 'family-pets', question: 'Les enfants sont-ils acceptés ?', answer: 'Les gîtes sont pensés avant tout pour un séjour à deux, mais les enfants sont acceptés. N’hésitez pas à nous préciser votre situation lors de la réservation.' },
    { id: 'arrival', category: 'arrival', question: 'Comment se passe l’arrivée ?', answer: 'L’arrivée se fait entre 16h et 21h, avec un accueil humain et en personne. Nous convenons avec vous de votre heure d’arrivée afin de vous accueillir dans les meilleures conditions.' },
    { id: 'reduced-mobility', category: 'accessibility', question: 'La Brassinne est-elle adaptée PMR ?', answer: 'Oui, La Brassinne est adaptée PMR et de plain-pied. Pour toute question spécifique liée à l’accessibilité, contactez-nous avant votre séjour afin de confirmer que le logement correspond bien à vos besoins.' },
    { id: 'ev-charging', category: 'comfort', question: 'Le logement dispose-t-il d’une borne de recharge électrique ?', answer: 'Oui, une borne de recharge électrique est disponible. Son utilisation est payante.' },
    { id: 'garden', category: 'outdoor', question: 'Les gîtes disposent-ils d’un jardin ?', answer: 'La Bergerie dispose d’un jardin à l’arrière et d’une petite terrasse à l’avant. La Brassinne dispose d’un jardin à l’avant et d’un jardin à l’arrière.' },
    { id: 'both-gites', category: 'reservation', question: 'Peut-on louer les deux gîtes ensemble ?', answer: 'Oui. La Bergerie et La Brassinne sont situées l’une à côté de l’autre, mais restent totalement indépendantes. C’est idéal si vous souhaitez venir avec des amis tout en conservant l’intimité de chaque gîte.' },
    { id: 'kitchen-equipped', category: 'comfort', question: 'La cuisine est-elle équipée ?', answer: 'Oui, la cuisine est équipée, avec notamment un presse-jus.' },
    { id: 'barbecue', category: 'outdoor', question: 'Y a-t-il un barbecue ?', answer: 'Oui, un barbecue est disponible. Les conditions d’utilisation peuvent dépendre de la saison et de la météo.' },
    { id: 'wifi', category: 'comfort', question: 'Le Wi-Fi est-il disponible ?', answer: 'Oui, le Wi-Fi est disponible dans les gîtes.' },
    { id: 'linen', category: 'comfort', question: 'Le linge est-il fourni ?', answer: 'Oui, le linge est fourni.' },
    { id: 'bed-ready', category: 'comfort', question: 'Le lit est-il préparé à l’arrivée ?', answer: 'Oui, le lit est préparé pour votre arrivée.' },
    { id: 'parking', category: 'comfort', question: 'Y a-t-il un parking ?', answer: 'Oui, un parking est disponible.' },
    { id: 'around', category: 'around', question: 'Où trouver des restaurants et activités proches ?', answer: 'Vous pouvez consulter la page Expériences & alentours pour découvrir nos restaurants favoris, promenades, activités par beau temps ou en cas de pluie, villages et idées de sorties autour de Libin.' },
    { id: 'late-arrival', category: 'arrival', question: 'Peut-on arriver tard ?', answer: 'L’arrivée est prévue entre 16h et 21h. Si vous pensez arriver en fin de plage, mieux vaut prévenir.' },
    { id: 'waste', category: 'comfort', question: 'Comment gérer les déchets ?', answer: 'Le tri est demandé. Vous pouvez laisser les sacs devant la porte en le signalant, puis l’hôte s’occupe du reste.' },
    { id: 'host-contact', category: 'arrival', question: 'Y a-t-il quelqu’un à joindre facilement en cas de souci ?', answer: 'Oui. L’hôte est disponible en cas de besoin, et la maison attenante permet une aide rapide si nécessaire.' },
  ],
  en: [
    { id: 'how-to-book', category: 'reservation', question: 'How do we book?', answer: 'You can book through WhatsApp, through the website booking form or through Airbnb.' },
    { id: 'one-night', category: 'reservation', question: 'Can we book for one night?', answer: 'Yes, it is possible to book for one night, depending on availability.' },
    { id: 'direct-booking', category: 'reservation', question: 'Is there an advantage to booking through the website?', answer: 'Yes, when booking directly through the website, you may benefit from a promotion or a direct advantage depending on the period. Contact us to check what is available for your dates.' },
    { id: 'cleaning', category: 'payment', question: 'Are cleaning fees included?', answer: 'Yes, cleaning fees are included.' },
    { id: 'pets', category: 'family-pets', question: 'Are pets accepted?', answer: 'Pets may be accepted on request. Please contact us before booking so we can check together whether the stay is suitable.' },
    { id: 'children', category: 'family-pets', question: 'Are children accepted?', answer: 'The gites are designed first and foremost for a stay for two, but children are accepted. Feel free to explain your situation when booking.' },
    { id: 'arrival', category: 'arrival', question: 'How does check-in work?', answer: 'Check-in is between 4 pm and 9 pm, with a warm in-person welcome. We agree on your arrival time with you so we can welcome you in the best conditions.' },
    { id: 'reduced-mobility', category: 'accessibility', question: 'Is La Brassinne suitable for guests with reduced mobility?', answer: 'Yes, La Brassinne is suitable for guests with reduced mobility and is all on one level. For any specific accessibility question, please contact us before your stay so we can confirm that the accommodation matches your needs.' },
    { id: 'ev-charging', category: 'comfort', question: 'Is there an electric vehicle charging point?', answer: 'Yes, an electric vehicle charging point is available. Use of the charging point is paid.' },
    { id: 'garden', category: 'outdoor', question: 'Do the gites have a garden?', answer: 'La Bergerie has a garden at the back and a small terrace at the front. La Brassinne has a garden at the front and a garden at the back.' },
    { id: 'both-gites', category: 'reservation', question: 'Can we book both gites together?', answer: 'Yes. La Bergerie and La Brassinne are located next to each other while remaining fully independent. This is ideal if you want to come with friends while keeping the privacy of each gite.' },
    { id: 'kitchen-equipped', category: 'comfort', question: 'Is the kitchen equipped?', answer: 'Yes, the kitchen is equipped, including a juicer.' },
    { id: 'barbecue', category: 'outdoor', question: 'Is there a barbecue?', answer: 'Yes, a barbecue is available. Conditions of use may depend on the season and the weather.' },
    { id: 'wifi', category: 'comfort', question: 'Is Wi-Fi available?', answer: 'Yes, Wi-Fi is available in the gites.' },
    { id: 'linen', category: 'comfort', question: 'Is linen provided?', answer: 'Yes, linen is provided.' },
    { id: 'bed-ready', category: 'comfort', question: 'Is the bed prepared on arrival?', answer: 'Yes, the bed is prepared for your arrival.' },
    { id: 'parking', category: 'comfort', question: 'Is there parking?', answer: 'Yes, parking is available.' },
    { id: 'around', category: 'around', question: 'Where can we find nearby restaurants and activities?', answer: 'You can visit the Experiences & surroundings page to discover our favourite restaurants, walks, sunny-day and rainy-day activities, villages and outing ideas around Libin.' },
    { id: 'late-arrival', category: 'arrival', question: 'Can we arrive late?', answer: 'Check-in is planned between 4 pm and 9 pm. If you expect to arrive towards the end of that window, it is best to let the host know.' },
    { id: 'waste', category: 'comfort', question: 'How should we handle waste?', answer: 'Guests are asked to sort waste. Bags can be left in front of the door after informing the host, who then handles the rest.' },
    { id: 'host-contact', category: 'arrival', question: 'Is someone easy to reach if there is a problem?', answer: 'Yes. The host remains available, and the attached house allows quick support if needed.' },
  ],
  nl: [
    { id: 'how-to-book', category: 'reservation', question: 'Hoe reserveren we?', answer: 'U kunt reserveren via WhatsApp, via het reserveringsformulier op de website of via Airbnb.' },
    { id: 'one-night', category: 'reservation', question: 'Kunnen we voor één nacht reserveren?', answer: 'Ja, reserveren voor één nacht is mogelijk, afhankelijk van de beschikbaarheid.' },
    { id: 'direct-booking', category: 'reservation', question: 'Is er een voordeel als we via de website reserveren?', answer: 'Ja, wanneer u rechtstreeks via de website reserveert, kunt u afhankelijk van de periode een promotie of rechtstreeks voordeel krijgen. Contacteer ons om te bekijken wat mogelijk is voor uw data.' },
    { id: 'cleaning', category: 'payment', question: 'Zijn de schoonmaakkosten inbegrepen?', answer: 'Ja, de schoonmaakkosten zijn inbegrepen.' },
    { id: 'pets', category: 'family-pets', question: 'Zijn huisdieren toegestaan?', answer: 'Huisdieren kunnen op aanvraag worden toegelaten. Contacteer ons voor uw reservatie zodat we samen kunnen nagaan of het verblijf geschikt is.' },
    { id: 'children', category: 'family-pets', question: 'Zijn kinderen welkom?', answer: 'De gîtes zijn in de eerste plaats bedacht voor een verblijf met twee, maar kinderen zijn welkom. Geef uw situatie gerust door bij de reservatie.' },
    { id: 'arrival', category: 'arrival', question: 'Hoe verloopt de aankomst?', answer: 'Aankomst is mogelijk tussen 16u en 21u, met een persoonlijk en warm onthaal. We spreken samen uw aankomstuur af zodat we u in de beste omstandigheden kunnen verwelkomen.' },
    { id: 'reduced-mobility', category: 'accessibility', question: 'Is La Brassinne geschikt voor personen met beperkte mobiliteit?', answer: 'Ja, La Brassinne is geschikt voor personen met beperkte mobiliteit en is volledig gelijkvloers. Voor specifieke vragen over toegankelijkheid kunt u ons voor uw verblijf contacteren, zodat we kunnen bevestigen dat de accommodatie aan uw noden beantwoordt.' },
    { id: 'ev-charging', category: 'comfort', question: 'Is er een laadpunt voor elektrische wagens?', answer: 'Ja, er is een laadpunt voor elektrische wagens beschikbaar. Het gebruik ervan is betalend.' },
    { id: 'garden', category: 'outdoor', question: 'Hebben de gîtes een tuin?', answer: 'La Bergerie heeft een tuin aan de achterkant en een klein terras aan de voorkant. La Brassinne heeft een tuin aan de voorkant en een tuin aan de achterkant.' },
    { id: 'both-gites', category: 'reservation', question: 'Kunnen we beide gîtes samen huren?', answer: 'Ja. La Bergerie en La Brassinne liggen naast elkaar, maar blijven volledig onafhankelijk. Dat is ideaal als u met vrienden wilt komen en toch de privacy van elke gîte wilt behouden.' },
    { id: 'kitchen-equipped', category: 'comfort', question: 'Is de keuken uitgerust?', answer: 'Ja, de keuken is uitgerust, onder andere met een citruspers.' },
    { id: 'barbecue', category: 'outdoor', question: 'Is er een barbecue?', answer: 'Ja, er is een barbecue beschikbaar. De gebruiksvoorwaarden kunnen afhangen van het seizoen en het weer.' },
    { id: 'wifi', category: 'comfort', question: 'Is er Wi-Fi beschikbaar?', answer: 'Ja, Wi-Fi is beschikbaar in de gîtes.' },
    { id: 'linen', category: 'comfort', question: 'Is het linnen voorzien?', answer: 'Ja, het linnen is voorzien.' },
    { id: 'bed-ready', category: 'comfort', question: 'Is het bed opgemaakt bij aankomst?', answer: 'Ja, het bed is opgemaakt voor uw aankomst.' },
    { id: 'parking', category: 'comfort', question: 'Is er parking?', answer: 'Ja, er is parking beschikbaar.' },
    { id: 'around', category: 'around', question: 'Waar vinden we restaurants en activiteiten in de buurt?', answer: 'Op de pagina Ervaringen & omgeving vindt u onze favoriete restaurants, wandelingen, activiteiten bij mooi weer of regen, dorpen en uitstaptips rond Libin.' },
    { id: 'late-arrival', category: 'arrival', question: 'Kunnen we laat aankomen?', answer: 'Aankomst is voorzien tussen 16u en 21u. Als u aan het einde van die periode aankomt, meldt u dit best even.' },
    { id: 'waste', category: 'comfort', question: 'Hoe doen we het met afval?', answer: 'Gasten sorteren het afval. Zakjes mogen voor de deur staan nadat de host verwittigd is, waarna de host de rest regelt.' },
    { id: 'host-contact', category: 'arrival', question: 'Is er makkelijk iemand bereikbaar bij een probleem?', answer: 'Ja. De host blijft beschikbaar en de aanpalende woning maakt snelle hulp mogelijk.' },
  ],
};

const bookingFaqIds = ['how-to-book', 'one-night', 'both-gites', 'direct-booking', 'cleaning', 'pets', 'children', 'reduced-mobility', 'arrival'];

export const faqSectionText: Record<Locale, { bookingEyebrow: string; bookingTitle: string; bookingDescription: string; guideLink: string }> = {
  fr: {
    bookingEyebrow: 'Questions utiles',
    bookingTitle: 'Avant de réserver',
    bookingDescription: 'Les réponses rapides aux points qui reviennent le plus souvent avant de choisir vos dates.',
    guideLink: 'Voir le guide pratique',
  },
  en: {
    bookingEyebrow: 'Useful questions',
    bookingTitle: 'Before booking',
    bookingDescription: 'Quick answers to the questions guests most often ask before choosing their dates.',
    guideLink: 'View the practical guide',
  },
  nl: {
    bookingEyebrow: 'Nuttige vragen',
    bookingTitle: 'Voor u reserveert',
    bookingDescription: 'Snelle antwoorden op de vragen die gasten het vaakst stellen voor ze hun data kiezen.',
    guideLink: 'Bekijk de praktische gids',
  },
};

function selectByIds(locale: Locale, ids: string[]) {
  return ids.map((id) => faqItems[locale].find((item) => item.id === id)).filter((item): item is FaqItem => Boolean(item));
}

export function getBookingFaq(locale: Locale) {
  return selectByIds(locale, bookingFaqIds);
}

export function getGuideFaq(locale: Locale) {
  return faqItems[locale];
}
