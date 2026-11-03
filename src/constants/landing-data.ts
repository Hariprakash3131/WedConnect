export interface LandingCategory {
  id: string;
  name: string;
  slug: string;
  description: string;
  count: number;
  startingPrice: number;
  imageUrl: string;
  icon: string;
}

export const LANDING_CATEGORIES: LandingCategory[] = [
  {
    id: "1",
    name: "Luxury Venues & Estates",
    slug: "venues",
    description: "Historic villas, grand ballrooms, oceanside cliffs & private estates",
    count: 340,
    startingPrice: 5000,
    imageUrl: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?q=80&w=1200&auto=format&fit=crop",
    icon: "Building2",
  },
  {
    id: "2",
    name: "Editorial Photography & Cinema",
    slug: "photography",
    description: "Vogue-featured photographers, cinematic 4K aerials & documentary storytellers",
    count: 512,
    startingPrice: 2800,
    imageUrl: "https://images.unsplash.com/photo-1537633552985-df8429e8048b?q=80&w=1200&auto=format&fit=crop",
    icon: "Camera",
  },
  {
    id: "3",
    name: "Haute Floral & Event Design",
    slug: "decoration",
    description: "Bespoke floral installations, crystal chandeliers & immersive thematic worlds",
    count: 285,
    startingPrice: 3500,
    imageUrl: "https://images.unsplash.com/photo-1520854221256-17451cc331bf?q=80&w=1200&auto=format&fit=crop",
    icon: "Sparkles",
  },
  {
    id: "4",
    name: "Michelin & Artisanal Catering",
    slug: "catering",
    description: "Multi-course tasting menus, bespoke molecular mixology & artisanal patisserie",
    count: 198,
    startingPrice: 75,
    imageUrl: "https://images.unsplash.com/photo-1555244162-803834f70033?q=80&w=1200&auto=format&fit=crop",
    icon: "Utensils",
  },
  {
    id: "5",
    name: "Celebrity Bridal Styling & Makeup",
    slug: "bridal-makeup",
    description: "Flawless HD bridal beauty, bespoke hair contouring & couture draping",
    count: 320,
    startingPrice: 1200,
    imageUrl: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?q=80&w=1200&auto=format&fit=crop",
    icon: "Gem",
  },
  {
    id: "6",
    name: "Live Orchestras, DJs & Sound",
    slug: "entertainment",
    description: "Symphony string quartets, international headliner DJs & concert lighting",
    count: 210,
    startingPrice: 2000,
    imageUrl: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=1200&auto=format&fit=crop",
    icon: "Music",
  },
  {
    id: "7",
    name: "Turnkey Wedding Planners",
    slug: "planners",
    description: "Full-scale production management, 3D floor plans & worldwide destination logistics",
    count: 165,
    startingPrice: 4500,
    imageUrl: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=1200&auto=format&fit=crop",
    icon: "CalendarCheck",
  },
  {
    id: "8",
    name: "Custom Stationery & Bespoke Favors",
    slug: "invitations",
    description: "Gold-foil letterpress, wax seals, digital portals & hand-engraved luxury gifts",
    count: 140,
    startingPrice: 850,
    imageUrl: "https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=1200&auto=format&fit=crop",
    icon: "Mail",
  },
];

export interface FeaturedVendorItem {
  id: string;
  businessName: string;
  tagline: string;
  category: string;
  categorySlug: string;
  city: string;
  country: string;
  rating: number;
  reviewsCount: number;
  startingPrice: number;
  currency: string;
  imageUrl: string;
  isVerified: boolean;
  isFeatured: boolean;
  yearsOfExperience: number;
}

export const FEATURED_VENDORS: FeaturedVendorItem[] = [
  {
    id: "v1",
    businessName: "Villa Ephrussi & Estates",
    tagline: "Riviera waterfront palaces with neoclassical gardens & panoramic sea views",
    category: "Luxury Venues",
    categorySlug: "venues",
    city: "Saint-Jean-Cap-Ferrat",
    country: "France",
    rating: 5.0,
    reviewsCount: 142,
    startingPrice: 12000,
    currency: "USD",
    imageUrl: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?q=80&w=1000&auto=format&fit=crop",
    isVerified: true,
    isFeatured: true,
    yearsOfExperience: 18,
  },
  {
    id: "v2",
    businessName: "Aura Cinematic Stories",
    tagline: "Master wedding cinematographers capturing raw emotion in 4K anamorphic style",
    category: "Photography & Cinema",
    categorySlug: "photography",
    city: "New York",
    country: "US",
    rating: 4.98,
    reviewsCount: 215,
    startingPrice: 3800,
    currency: "USD",
    imageUrl: "https://images.unsplash.com/photo-1537633552985-df8429e8048b?q=80&w=1000&auto=format&fit=crop",
    isVerified: true,
    isFeatured: true,
    yearsOfExperience: 11,
  },
  {
    id: "v3",
    businessName: "Maison de Fleurs Couture",
    tagline: "Architectural floral sculptures, hanging wisteria gardens & botanical artistry",
    category: "Haute Decor",
    categorySlug: "decoration",
    city: "Paris",
    country: "France",
    rating: 4.95,
    reviewsCount: 98,
    startingPrice: 4200,
    currency: "USD",
    imageUrl: "https://images.unsplash.com/photo-1520854221256-17451cc331bf?q=80&w=1000&auto=format&fit=crop",
    isVerified: true,
    isFeatured: true,
    yearsOfExperience: 9,
  },
  {
    id: "v4",
    businessName: "Gourmet Symphony Collective",
    tagline: "Michelin-starred culinary experiences, live caviar stations & sommelier pairing",
    category: "Artisanal Catering",
    categorySlug: "catering",
    city: "San Francisco",
    country: "US",
    rating: 4.97,
    reviewsCount: 164,
    startingPrice: 140,
    currency: "USD",
    imageUrl: "https://images.unsplash.com/photo-1555244162-803834f70033?q=80&w=1000&auto=format&fit=crop",
    isVerified: true,
    isFeatured: true,
    yearsOfExperience: 14,
  },
  {
    id: "v5",
    businessName: "Sartorial Bridal Artistry",
    tagline: "Celebrity red-carpet stylists specializing in radiant, timeless bridal aesthetics",
    category: "Bridal Styling",
    categorySlug: "bridal-makeup",
    city: "London",
    country: "UK",
    rating: 4.99,
    reviewsCount: 188,
    startingPrice: 1650,
    currency: "USD",
    imageUrl: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?q=80&w=1000&auto=format&fit=crop",
    isVerified: true,
    isFeatured: true,
    yearsOfExperience: 12,
  },
  {
    id: "v6",
    businessName: "The Grand Opus String Ensemble",
    tagline: "Contemporary 12-piece classical orchestra blending pop anthems & timeless symphonies",
    category: "Live Entertainment",
    categorySlug: "entertainment",
    city: "Chicago",
    country: "US",
    rating: 4.94,
    reviewsCount: 112,
    startingPrice: 2400,
    currency: "USD",
    imageUrl: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=1000&auto=format&fit=crop",
    isVerified: true,
    isFeatured: false,
    yearsOfExperience: 8,
  },
];

export const TIMELINE_STEPS = [
  {
    step: "01",
    title: "Define Your Celebration",
    description:
      "Select your celebration type, date, location, guest headcount, and aesthetic budget in a clean guided interface.",
    badge: "Create Event",
    icon: "Calendar",
  },
  {
    step: "02",
    title: "Intelligent Vendor Matching",
    description:
      "Our matching algorithm links you with vetted wedding professionals tailored strictly to your aesthetic and date availability.",
    badge: "Smart Match",
    icon: "Sparkles",
  },
  {
    step: "03",
    title: "Direct Chat & Quote Comparison",
    description:
      "Exchange inspirations, message vendors directly in real-time, and compare detailed itemized quotations side-by-side.",
    badge: "Realtime Chat",
    icon: "MessageSquare",
  },
  {
    step: "04",
    title: "Confirmed Booking & Seamless Delivery",
    description:
      "Accept quotes, secure dates with milestone contracts, and execute your celebration with complete peace of mind.",
    badge: "Booking Confirmed",
    icon: "CheckCircle",
  },
];

export const STATS_METRICS = [
  {
    value: "10,000+",
    label: "Celebrations Hosted",
    description: "Across 42 countries worldwide",
  },
  {
    value: "4.98 / 5",
    label: "Average Review Score",
    description: "From over 28,000 verified couples",
  },
  {
    value: "100%",
    label: "Verified Elite Vendors",
    description: "Strict portfolio & license vetting",
  },
  {
    value: "99.4%",
    label: "Quotation Delivery Rate",
    description: "Guaranteed vendor response within 24 hours",
  },
];

export const TESTIMONIALS = [
  {
    id: "t1",
    names: "Camilla & Sebastian",
    event: "Lake Como Villa Matrimony",
    quote:
      "WedConnect completely transformed our destination wedding planning. Being able to compare quotes from top Italian cinematographers and florists in one place saved us dozens of hours and immense stress.",
    rating: 5,
    city: "Lake Como, Italy",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop",
  },
  {
    id: "t2",
    names: "Marcus & Julian",
    event: "Hudson Valley Modern Estate Gala",
    quote:
      "The quotation comparison tool alone is worth gold. We hired our Michelin caterer and 8-piece jazz band in under a week. Every vendor was punctual, verified, and unbelievably talented.",
    rating: 5,
    city: "New York, US",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop",
  },
  {
    id: "t3",
    names: "Elena & David",
    event: "Santorini Cliffside Sunset Ceremony",
    quote:
      "As an international couple, trusting vendors from afar was daunting. WedConnect’s verified badges, reviews, and secure chat gave us absolute confidence. Our wedding day was pure magic.",
    rating: 5,
    city: "Santorini, Greece",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop",
  },
];

export const FAQ_ITEMS = [
  {
    question: "How does WedConnect guarantee vendor quality and reliability?",
    answer:
      "Every vendor profile on WedConnect undergoes a comprehensive 4-stage verification process: portfolio inspection, legitimate business license verification, client references review, and insurance confirmation before receiving our 'Verified Pro' badge.",
  },
  {
    question: "Can I receive and compare multiple quotations for my celebration?",
    answer:
      "Yes! When you create an event or send an enquiry, matched vendors submit formal itemized quotations. Our Quotation Comparison engine displays line items, included deliverables, payment milestones, and taxes side-by-side.",
  },
  {
    question: "Is there any cost for couples to use WedConnect?",
    answer:
      "WedConnect is 100% free for couples and event hosts. You can explore vendors, create events, message wedding professionals, and compare quotations with zero hidden platform fees.",
  },
  {
    question: "How do vendors join the WedConnect platform?",
    answer:
      "Wedding professionals can apply by creating a Vendor account. Once registered, vendors submit their portfolio, service packages, and credentials. Our curation committee reviews and approves profiles within 48 business hours.",
  },
  {
    question: "How does the direct messaging and booking confirmation work?",
    answer:
      "Our real-time chat enables couples and vendors to exchange inspiration photos, negotiate scope, and answer questions. Once a quote is accepted and confirmed by the vendor, a confirmed booking reference is created.",
  },
];

