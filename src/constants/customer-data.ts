export interface MockQuotationItem {
  id: string;
  quoteNumber: string;
  vendorId: string;
  vendorName: string;
  vendorCategory: string;
  vendorRating: number;
  amount: number;
  taxAmount: number;
  totalAmount: number;
  currency: string;
  validUntil: string;
  status: "sent" | "accepted" | "rejected" | "draft" | "expired";
  terms: string;
  items: Array<{
    id: string;
    description: string;
    quantity: number;
    unitPrice: number;
    total: number;
  }>;
}

export const MOCK_CUSTOMER_EVENTS = [
  {
    id: "evt-1",
    title: "Audrey & Liam's Grand Matrimony",
    eventDate: "2026-10-18",
    locationCity: "New York, NY",
    locationVenue: "The Plaza Hotel",
    guestCount: 180,
    budget: 65000,
    status: "active" as const,
    notes: "Black tie optional. Monochromatic white floral theme with candlelit reception.",
  },
  {
    id: "evt-2",
    title: "Intimate Sunset Rehearsal Dinner",
    eventDate: "2026-10-17",
    locationCity: "Brooklyn, NY",
    locationVenue: "The River Café Pavilion",
    guestCount: 50,
    budget: 15000,
    status: "planning" as const,
    notes: "Acoustic jazz quartet and customized family-style Italian dining.",
  },
];

export const MOCK_QUOTATIONS: MockQuotationItem[] = [
  {
    id: "quote-1",
    quoteNumber: "QT-2026-081",
    vendorId: "v2",
    vendorName: "Aura Cinematic Stories",
    vendorCategory: "Photography & Cinema",
    vendorRating: 4.98,
    amount: 3800,
    taxAmount: 304,
    totalAmount: 4104,
    currency: "USD",
    validUntil: "2026-11-20",
    status: "sent",
    terms: "30% deposit upon signature. Balance due 14 days prior to celebration.",
    items: [
      { id: "1", description: "Lead Cinematographer & 1 Associate (10 hrs)", quantity: 1, unitPrice: 2800, total: 2800 },
      { id: "2", description: "FAA Certified 4K Drone Aerial Coverage", quantity: 1, unitPrice: 600, total: 600 },
      { id: "3", description: "10-12 Minute Cinematic Feature Film + Raw Footage Drive", quantity: 1, unitPrice: 400, total: 400 },
    ],
  },
  {
    id: "quote-2",
    quoteNumber: "QT-2026-094",
    vendorId: "v3",
    vendorName: "Maison de Fleurs Couture",
    vendorCategory: "Haute Floral & Decor",
    vendorRating: 4.95,
    amount: 4200,
    taxAmount: 336,
    totalAmount: 4536,
    currency: "USD",
    validUntil: "2026-11-22",
    status: "sent",
    terms: "50% non-refundable retainer for flower sourcing. Final guest count 3 weeks prior.",
    items: [
      { id: "1", description: "Grand Ceremony Floral Archway (White Peonies & Roses)", quantity: 1, unitPrice: 2200, total: 2200 },
      { id: "2", description: "High-Table Centerpieces & Floating Candelabras (18 Tables)", quantity: 18, unitPrice: 85, total: 1530 },
      { id: "3", description: "Bespoke Bridal Bouquet & Groom Boutonnière", quantity: 1, unitPrice: 470, total: 470 },
    ],
  },
  {
    id: "quote-3",
    quoteNumber: "QT-2026-112",
    vendorId: "v4",
    vendorName: "Gourmet Symphony Collective",
    vendorCategory: "Artisanal Catering",
    vendorRating: 4.97,
    amount: 14400,
    taxAmount: 1152,
    totalAmount: 15552,
    currency: "USD",
    validUntil: "2026-11-25",
    status: "accepted",
    terms: "Full multi-course tasting conducted in advance. 30% milestone deposit.",
    items: [
      { id: "1", description: "4-Course Plated Michelin Experience (120 guests)", quantity: 120, unitPrice: 95, total: 11400 },
      { id: "2", description: "Craft Mixology Open Bar & Sommelier Wine Pairing (5 hrs)", quantity: 120, unitPrice: 25, total: 3000 },
    ],
  },
];

export const MOCK_BOOKINGS = [
  {
    id: "book-1",
    bookingReference: "BK-2026-7841",
    vendorName: "Villa Ephrussi & Estates",
    category: "Luxury Venues",
    eventTitle: "Audrey & Liam's Grand Matrimony",
    totalAmount: 12000,
    depositAmount: 3600,
    confirmedDate: "2026-10-18",
    status: "confirmed" as const,
    city: "Saint-Jean-Cap-Ferrat, France",
  },
  {
    id: "book-2",
    bookingReference: "BK-2026-9214",
    vendorName: "Gourmet Symphony Collective",
    category: "Artisanal Catering",
    eventTitle: "Audrey & Liam's Grand Matrimony",
    totalAmount: 15552,
    depositAmount: 4665,
    confirmedDate: "2026-10-18",
    status: "pending_confirmation" as const,
    city: "New York, US",
  },
];
