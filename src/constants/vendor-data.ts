export interface VendorStats {
  monthlyRevenue: number;
  revenueGrowth: number;
  activeBookings: number;
  pendingEnquiries: number;
  conversionRate: number;
  profileImpressions: number;
  avgRating: number;
  reviewsCount: number;
}

export interface VendorServiceItem {
  id: string;
  title: string;
  category: string;
  price: number;
  priceType: "fixed" | "hourly" | "custom";
  description: string;
  isActive: boolean;
}

export interface VendorPackageItem {
  id: string;
  title: string;
  price: number;
  description: string;
  deliverables: string[];
  isPopular: boolean;
  isActive: boolean;
}

export interface VendorPortfolioItem {
  id: string;
  title: string;
  caption: string;
  mediaType: "image" | "video";
  mediaUrl: string;
  thumbnailUrl?: string;
  category: "Ceremony" | "Reception" | "Portraits" | "Cinematography" | "Aerial";
  featured: boolean;
}

export interface VendorAvailabilitySlot {
  date: string; // YYYY-MM-DD
  status: "available" | "booked" | "blocked";
  note?: string;
  clientName?: string;
}

export interface VendorEnquiryItem {
  id: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  customerAvatar?: string;
  eventType: string;
  preferredDate: string;
  guestCount: number;
  budget: number;
  message: string;
  status: "pending" | "quoted" | "responded" | "declined";
  createdAt: string;
}

export interface VendorQuotationItem {
  id: string;
  quoteNumber: string;
  customerName: string;
  customerEmail: string;
  eventTitle: string;
  eventDate: string;
  validUntil: string;
  amount: number;
  taxAmount: number;
  totalAmount: number;
  status: "draft" | "sent" | "accepted" | "rejected" | "expired";
  items: Array<{
    description: string;
    quantity: number;
    unitPrice: number;
    total: number;
  }>;
  terms: string;
  createdAt: string;
}

export interface VendorBookingItem {
  id: string;
  bookingReference: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  eventTitle: string;
  eventDate: string;
  locationVenue: string;
  locationCity: string;
  packageTitle: string;
  totalAmount: number;
  depositAmount: number;
  depositPaid: boolean;
  status: "confirmed" | "in_progress" | "completed" | "cancelled";
  notes: string;
  milestones: Array<{
    title: string;
    amount: number;
    dueDate: string;
    status: "paid" | "due" | "upcoming";
  }>;
}

export interface VendorReviewItem {
  id: string;
  customerName: string;
  customerAvatar?: string;
  rating: number;
  comment: string;
  eventDate: string;
  createdAt: string;
  vendorResponse?: string | null;
  respondedAt?: string | null;
  categories: {
    professionalism: number;
    qualityOfWork: number;
    communication: number;
    value: number;
  };
}

export const CURRENT_VENDOR = {
  id: "v2",
  userId: "user-vendor-002",
  businessName: "Aura Cinematic Stories",
  slug: "aura-cinematic-stories",
  tagline: "Editorial wedding cinematography & luxury heirloom films",
  description:
    "We specialize in crafting timeless, filmic wedding stories captured on 4K cinema cameras and vintage 16mm analog film. Based in Manhattan and available for destination celebrations worldwide. Every frame is hand-graded for true-to-life tones, emotional resonance, and timeless luxury.",
  primaryCategory: "Photography & Cinema",
  yearsOfExperience: 9,
  priceStartingAt: 4500,
  currency: "USD",
  city: "New York",
  state: "NY",
  country: "United States",
  address: "450 Lexington Ave, Suite 1800, New York, NY 10017",
  latitude: 40.7527,
  longitude: -73.9772,
  coverImageUrl:
    "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1600&q=80",
  avatarUrl:
    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80",
  websiteUrl: "https://auracinematics.example.com",
  instagramUrl: "https://instagram.com/auracinematics",
  facebookUrl: "https://facebook.com/auracinematicstories",
  verificationStatus: "verified" as const,
  isFeatured: true,
  ratingAverage: 4.98,
  reviewsCount: 142,
};

export const VENDOR_STATS: VendorStats = {
  monthlyRevenue: 28400,
  revenueGrowth: 23.5,
  activeBookings: 8,
  pendingEnquiries: 5,
  conversionRate: 41.2,
  profileImpressions: 4890,
  avgRating: 4.98,
  reviewsCount: 142,
};

export const INITIAL_VENDOR_SERVICES: VendorServiceItem[] = [
  {
    id: "srv-1",
    title: "10-Hour Master Cinematographer Coverage",
    category: "Cinema",
    price: 3800,
    priceType: "fixed",
    description: "Lead master cinematographer covering bride & groom prep, full ceremony, cocktail reception, and evening dancing.",
    isActive: true,
  },
  {
    id: "srv-2",
    title: "Secondary Cinematographer",
    category: "Cinema",
    price: 1200,
    priceType: "fixed",
    description: "Dedicated second angle operator for comprehensive guest reactions and multi-camera ceremony capture.",
    isActive: true,
  },
  {
    id: "srv-3",
    title: "FAA Licensed 4K Aerial Drone Coverage",
    category: "Drone",
    price: 650,
    priceType: "fixed",
    description: "Sweeping architectural and landscape establishing shots of your luxury venue and cocktail lawn.",
    isActive: true,
  },
  {
    id: "srv-4",
    title: "Same-Day Edit Reception Teaser",
    category: "Editing",
    price: 1500,
    priceType: "fixed",
    description: "A 90-second cinematic film premiered during the reception dinner for you and your guests.",
    isActive: true,
  },
  {
    id: "srv-5",
    title: "Vintage 16mm Analog Film Reel",
    category: "Specialty",
    price: 950,
    priceType: "fixed",
    description: "Authentic Kodak 16mm analog motion film hand-developed for nostalgic golden-hour nostalgia.",
    isActive: true,
  },
  {
    id: "srv-6",
    title: "Hourly Overtime Master Coverage",
    category: "Add-on",
    price: 350,
    priceType: "hourly",
    description: "Additional late-night afterparty coverage beyond contracted 10 hours.",
    isActive: true,
  },
];

export const INITIAL_VENDOR_PACKAGES: VendorPackageItem[] = [
  {
    id: "pkg-1",
    title: "The Signature Cinematic Collection",
    price: 6500,
    description: "Our most requested luxury wedding cinema suite crafted for grand celebrations.",
    deliverables: [
      "10 Hours Lead Master Cinematographer & Senior Assistant",
      "FAA Part 107 Certified 4K Aerial Drone Cinematography",
      "6-8 Minute Editorial Highlight Film in 4K HDR",
      "Full Multi-Camera Ceremony & Speeches Documentary Edit",
      "Private Online Heirloom Film Gallery & High-Res USB Box",
      "All Raw Footage delivered on High-Speed SSD",
    ],
    isPopular: true,
    isActive: true,
  },
  {
    id: "pkg-2",
    title: "The Grand Couture Heirloom Suite",
    price: 9800,
    description: "The ultimate cinema experience with multi-day coverage and analog 16mm film.",
    deliverables: [
      "Full Weekend Coverage: Rehearsal Dinner + 12-Hour Wedding Day",
      "Two Master Cinematographers + Aerial Drone Pilot",
      "Authentic 16mm Kodak Vintage Film Reel Inclusion",
      "10-12 Minute Featurette Film with Custom Orchestral Score",
      "Same-Day Edit (SDE) premiered during Reception Dinner",
      "Physical Custom Embossed Leather Keepsake Drive",
    ],
    isPopular: false,
    isActive: true,
  },
  {
    id: "pkg-3",
    title: "Intimate Editorial Film",
    price: 4500,
    description: "Designed for intimate weddings, elopements, and micro-luxury celebrations under 60 guests.",
    deliverables: [
      "6 Hours Master Cinematographer Coverage",
      "4-5 Minute Cinematic Highlight Film",
      "Full Ceremony & Vows Audio / Video Recording",
      "High-Resolution Digital Delivery with 10-Year Cloud Archive",
    ],
    isPopular: false,
    isActive: true,
  },
];

export const INITIAL_VENDOR_PORTFOLIO: VendorPortfolioItem[] = [
  {
    id: "port-1",
    title: "Sunset Vows on Lake Como",
    caption: "Villa del Balbianello, Italy with golden sunset ceremony and vintage wooden Riva boat departure.",
    mediaType: "image",
    mediaUrl: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80",
    category: "Ceremony",
    featured: true,
  },
  {
    id: "port-2",
    title: "Château de Chantilly Grand Ballroom",
    caption: "A candlelit ballroom reception with a 14-piece orchestra and floating white floral installations.",
    mediaType: "image",
    mediaUrl: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=1200&q=80",
    category: "Reception",
    featured: true,
  },
  {
    id: "port-3",
    title: "The Plaza Hotel Editorial Cinema",
    caption: "Black-tie bridal party portraits on 5th Avenue and grand terrace evening fireworks.",
    mediaType: "image",
    mediaUrl: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=1200&q=80",
    category: "Portraits",
    featured: true,
  },
  {
    id: "port-4",
    title: "Aerial Coastal Panorama at Newport Manor",
    caption: "4K drone sweep capturing oceanfront cliffside ceremony in Rhode Island.",
    mediaType: "image",
    mediaUrl: "https://images.unsplash.com/photo-1469371670807-013ccf25f16a?auto=format&fit=crop&w=1200&q=80",
    category: "Aerial",
    featured: false,
  },
  {
    id: "port-5",
    title: "Monochrome 16mm Vintage Wedding Reel",
    caption: "Slow-motion grain and analog elegance of the couple's first dance under fairy lights.",
    mediaType: "image",
    mediaUrl: "https://images.unsplash.com/photo-1544077960-604201fe74bc?auto=format&fit=crop&w=1200&q=80",
    category: "Cinematography",
    featured: false,
  },
  {
    id: "port-6",
    title: "Champagne Tower Spectacular",
    caption: "7-tier crystal champagne tower moment with pyrotechnic fountain sparklers.",
    mediaType: "image",
    mediaUrl: "https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=1200&q=80",
    category: "Reception",
    featured: false,
  },
];

export const INITIAL_VENDOR_AVAILABILITY: VendorAvailabilitySlot[] = [
  { date: "2026-10-18", status: "booked", note: "Audrey & Liam Grand Wedding", clientName: "Audrey Hepburn & Liam" },
  { date: "2026-10-24", status: "booked", note: "The Plaza Hotel Black Tie Gala", clientName: "Sophia & Alexander" },
  { date: "2026-10-25", status: "blocked", note: "Scheduled Post-Production & Editing Blackout" },
  { date: "2026-11-07", status: "booked", note: "Marcus & Elena Fall Nuptials", clientName: "Elena Rostova" },
  { date: "2026-11-14", status: "available" },
  { date: "2026-11-21", status: "available" },
  { date: "2026-11-28", status: "blocked", note: "Thanksgiving Family Holiday" },
  { date: "2026-12-05", status: "available" },
  { date: "2026-12-12", status: "booked", note: "Winter Solstice Estate Wedding", clientName: "Charlotte & James" },
];

export const INITIAL_VENDOR_ENQUIRIES: VendorEnquiryItem[] = [
  {
    id: "enq-101",
    customerName: "Audrey Hepburn",
    customerEmail: "audrey@example.com",
    customerPhone: "+1 (555) 234-5678",
    customerAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
    eventType: "Luxury Wedding",
    preferredDate: "2026-10-18",
    guestCount: 220,
    budget: 8500,
    message: "We adore your editorial style! Looking for full day coverage with aerial drone and 16mm film for our ceremony at The Plaza Hotel.",
    status: "quoted",
    createdAt: "Today, 10:15 AM",
  },
  {
    id: "enq-102",
    customerName: "Sophia Van Der Bilt",
    customerEmail: "sophia@example.com",
    customerPhone: "+1 (555) 345-6789",
    customerAvatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80",
    eventType: "Autumn Nuptials",
    preferredDate: "2026-11-14",
    guestCount: 180,
    budget: 7000,
    message: "Are you available on November 14? We are hosting our ceremony at Oheka Castle and would love to review your packages.",
    status: "pending",
    createdAt: "Yesterday, 3:45 PM",
  },
  {
    id: "enq-103",
    customerName: "Elena Rostova",
    customerEmail: "elena@example.com",
    customerPhone: "+1 (555) 456-7890",
    customerAvatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80",
    eventType: "Black-Tie Gala Wedding",
    preferredDate: "2026-12-05",
    guestCount: 300,
    budget: 12000,
    message: "Hi Aura Cinema team, we are planning a 2-day wedding weekend in Manhattan with a rehearsal dinner film. Can you quote your Grand Couture Suite?",
    status: "responded",
    createdAt: "2 days ago",
  },
  {
    id: "enq-104",
    customerName: "Julian & Clara Thorne",
    customerEmail: "julian@example.com",
    customerPhone: "+1 (555) 567-8901",
    customerAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
    eventType: "Intimate Elopement",
    preferredDate: "2026-12-18",
    guestCount: 35,
    budget: 4500,
    message: "Seeking a 6-hour intimate celebration film in Upstate New York Catskills with drone footage.",
    status: "pending",
    createdAt: "3 days ago",
  },
];

export const INITIAL_VENDOR_QUOTATIONS: VendorQuotationItem[] = [
  {
    id: "qt-2026-081",
    quoteNumber: "QT-2026-081",
    customerName: "Audrey Hepburn",
    customerEmail: "audrey@example.com",
    eventTitle: "Audrey & Liam Grand Wedding",
    eventDate: "2026-10-18",
    validUntil: "2026-11-20",
    amount: 6500,
    taxAmount: 576.88,
    totalAmount: 7076.88,
    status: "sent",
    items: [
      { description: "The Signature Cinematic Collection (10 Hours Lead Master + Senior Assistant)", quantity: 1, unitPrice: 6500, total: 6500 },
      { description: "FAA Part 107 Aerial 4K Drone Filming", quantity: 1, unitPrice: 0, total: 0 },
      { description: "4K HDR Master Delivery + High-Speed SSD Drive", quantity: 1, unitPrice: 0, total: 0 },
    ],
    terms: "50% non-refundable retainer due upon signature. Balance due 14 days prior to wedding day. Includes full copyright usage for personal archival.",
    createdAt: "2026-10-22",
  },
  {
    id: "qt-2026-074",
    quoteNumber: "QT-2026-074",
    customerName: "Sophia Van Der Bilt",
    customerEmail: "sophia@example.com",
    eventTitle: "Sophia & Alexander Autumn Nuptials",
    eventDate: "2026-10-24",
    validUntil: "2026-10-30",
    amount: 9800,
    taxAmount: 869.75,
    totalAmount: 10669.75,
    status: "accepted",
    items: [
      { description: "The Grand Couture Heirloom Suite (Rehearsal + 12 Hours Wedding)", quantity: 1, unitPrice: 9800, total: 9800 },
      { description: "Authentic 16mm Analog Kodak Motion Film Reel", quantity: 1, unitPrice: 0, total: 0 },
      { description: "Same-Day Edit Reception Premiere", quantity: 1, unitPrice: 0, total: 0 },
    ],
    terms: "50% initial retainer paid. Contract executed on October 25, 2026.",
    createdAt: "2026-10-15",
  },
  {
    id: "qt-2026-068",
    quoteNumber: "QT-2026-068",
    customerName: "Elena Rostova",
    customerEmail: "elena@example.com",
    eventTitle: "Elena & Marcus Nuptials",
    eventDate: "2026-11-07",
    validUntil: "2026-10-20",
    amount: 4500,
    taxAmount: 399.38,
    totalAmount: 4899.38,
    status: "accepted",
    items: [
      { description: "Intimate Editorial 6-Hour Film Package", quantity: 1, unitPrice: 4500, total: 4500 },
    ],
    terms: "Standard wedding agreement signed.",
    createdAt: "2026-10-05",
  },
];

export const INITIAL_VENDOR_BOOKINGS: VendorBookingItem[] = [
  {
    id: "bk-2026-7841",
    bookingReference: "BK-2026-7841",
    customerName: "Sophia Van Der Bilt",
    customerEmail: "sophia@example.com",
    customerPhone: "+1 (555) 345-6789",
    eventTitle: "Sophia & Alexander Nuptials",
    eventDate: "2026-10-24",
    locationVenue: "Oheka Castle",
    locationCity: "Huntington, NY",
    packageTitle: "The Grand Couture Heirloom Suite",
    totalAmount: 10669.75,
    depositAmount: 5334.88,
    depositPaid: true,
    status: "confirmed",
    notes: "Coordination with planner Chloe Sterling. Drone clearance approved with FAA. Rehearsal starts at 5:00 PM Friday.",
    milestones: [
      { title: "50% Booking Retainer", amount: 5334.88, dueDate: "2026-10-25", status: "paid" },
      { title: "Final Balance", amount: 5334.87, dueDate: "2026-10-10", status: "upcoming" },
    ],
  },
  {
    id: "bk-2026-6912",
    bookingReference: "BK-2026-6912",
    customerName: "Elena Rostova",
    customerEmail: "elena@example.com",
    customerPhone: "+1 (555) 456-7890",
    eventTitle: "Elena & Marcus Nuptials",
    eventDate: "2026-11-07",
    locationVenue: "The Rainbow Room",
    locationCity: "New York, NY",
    packageTitle: "The Signature Cinematic Collection",
    totalAmount: 7076.88,
    depositAmount: 3538.44,
    depositPaid: true,
    status: "confirmed",
    notes: "Audio tie-in approved with Rainbow Room sound technician. Timeline calls for golden hour portraits at Top of the Rock.",
    milestones: [
      { title: "50% Booking Retainer", amount: 3538.44, dueDate: "2026-10-06", status: "paid" },
      { title: "Final Balance", amount: 3538.44, dueDate: "2026-10-24", status: "due" },
    ],
  },
];

export const VENDOR_ANALYTICS_DATA = {
  monthlyRevenue: [
    { month: "May", currentYear: 18500, previousYear: 14200 },
    { month: "Jun", currentYear: 24200, previousYear: 19800 },
    { month: "Jul", currentYear: 29500, previousYear: 22400 },
    { month: "Aug", currentYear: 31000, previousYear: 25100 },
    { month: "Sep", currentYear: 36800, previousYear: 27900 },
    { month: "Oct", currentYear: 28400, previousYear: 21300 },
  ],
  funnelData: [
    { stage: "Profile Views", count: 4890, rate: "100%" },
    { stage: "Inquiries Received", count: 82, rate: "1.68%" },
    { stage: "Quotations Sent", count: 54, rate: "65.8%" },
    { stage: "Contracts Signed", count: 34, rate: "62.9%" },
  ],
  packagePerformance: [
    { name: "Signature Cinematic Collection", revenue: 97500, bookings: 15, percentage: 55 },
    { name: "Grand Couture Suite", revenue: 58800, bookings: 6, percentage: 33 },
    { name: "Intimate Editorial Film", revenue: 22500, bookings: 5, percentage: 12 },
  ],
  sources: [
    { name: "WedConnect Matchmaker", value: 45, color: "#2563EB" },
    { name: "Direct Search", value: 30, color: "#7C3AED" },
    { name: "Featured Spotlight", value: 15, color: "#F59E0B" },
    { name: "Instagram / External", value: 10, color: "#10B981" },
  ],
};

export const INITIAL_VENDOR_REVIEWS: VendorReviewItem[] = [
  {
    id: "rev-1",
    customerName: "Camilla & Harrison Vane",
    customerAvatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80",
    rating: 5,
    comment:
      "Aura Cinematic Stories produced what is without question the greatest heirloom we will ever own. Watching our highlight film brings tears to our eyes every single time. They were quiet, respectful, incredibly stylish, and made everyone look like royalty.",
    eventDate: "September 14, 2026",
    createdAt: "2 weeks ago",
    vendorResponse:
      "Camilla & Harrison, capturing your celebration at Villa Ephrussi was an absolute dream. Thank you for placing your trust in our cinematic vision!",
    respondedAt: "1 week ago",
    categories: {
      professionalism: 5,
      qualityOfWork: 5,
      communication: 5,
      value: 5,
    },
  },
  {
    id: "rev-2",
    customerName: "Devon & Beatrice Montgomery",
    customerAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
    rating: 5,
    comment:
      "The 16mm film footage is absolutely breathtaking. It has a nostalgic quality that digital video simply cannot replicate. The drone footage of our venue at golden hour is something out of a Hollywood movie. 100/10 recommend.",
    eventDate: "August 28, 2026",
    createdAt: "1 month ago",
    vendorResponse:
      "Thank you Devon & Beatrice! The analog film footage turned out spectacularly in the late summer light. Wishing you a lifetime of happiness!",
    respondedAt: "3 weeks ago",
    categories: {
      professionalism: 5,
      qualityOfWork: 5,
      communication: 5,
      value: 5,
    },
  },
  {
    id: "rev-3",
    customerName: "Vivienne & Thomas Sinclair",
    customerAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
    rating: 5,
    comment:
      "From our first consultation call to the final film delivery, everything was seamless. They listened to our musical preferences and edited the film to perfection. Worth every single penny.",
    eventDate: "July 19, 2026",
    createdAt: "2 months ago",
    vendorResponse: null,
    categories: {
      professionalism: 5,
      qualityOfWork: 5,
      communication: 5,
      value: 4.9,
    },
  },
];

