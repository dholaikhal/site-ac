// The example apps: the businesses from the demo, finished. Everything here is invented and every
// page says so; the prompts are the ones the demo builds them from.
// Set once every example answers on its subdomain: the main site links to them only then.
export const LIVE = true;

export type Kind = "shop" | "kitchen" | "salon" | "clinic";
export type Item = { id: string; name: string; price: number; photo?: string; icon?: string; desc: string; meta?: string; cat?: string; options?: string[] };
export type App = {
  slug: string; kind: Kind; name: string; tagline: string; prompt: string;
  brand: string; ink: string; tint: string; radius: string;
  head: string; body: string; fonts: string;
  area: string; address: string; hours: string; closed?: number; // closed: weekday, 0 = Sunday
  hero: { title: string; sub: string; cta: string; photo?: string };
  intro: string; story: [string, string][];
  cats?: string[]; items: Item[]; notes: [string, string][];
  fee?: { label: string; amount: number; note: string };
  delivery?: { label: string; price: number }[];
  slots?: string[];
};

export const APPS: Record<string, App> = {
  goldweave: {
    slug: "goldweave", kind: "shop", name: "Goldweave", tagline: "Jute bags, woven by hand",
    prompt: "A store for my handmade bags with bKash payment, delivery, and an SMS when the order ships",
    brand: "#9a4a24", ink: "#5c2a12", tint: "#f6ece2", radius: "14px",
    head: "Fraunces", body: "DM Sans", fonts: "family=Fraunces:opsz,wght@9..144,600;9..144,800&family=DM+Sans:wght@400;500;700",
    area: "Mirpur 10, Dhaka", address: "House 12, Road 5, Mirpur 10, Dhaka", hours: "Orders every day · dispatch Saturday to Thursday",
    hero: { title: "The golden fibre, woven by hand", sub: "Jute totes, handbags and pouches. Delivered across Bangladesh.", cta: "Shop the bags", photo: "bag-printed" },
    intro: "New this week",
    story: [["Made in small batches", "Every bag is woven and stitched by hand, a few dozen at a time."], ["Jute, not plastic", "Strong, washable and it lasts for years. When it's done, it goes back to the soil."], ["Sent the day you order", "Orders before 4 pm leave the same day, with the courier's tracking by SMS."]],
    cats: ["All", "Totes", "Handbags", "Pouches"],
    items: [
      { id: "market-tote", name: "Market tote", price: 1450, photo: "bag-tote", cat: "Totes", meta: "38 × 42 cm", desc: "Our everyday tote: tightly woven jute in a warm tan, with a cotton lining and an inside pocket. Big enough for a day's shopping.", options: ["Natural tan", "Chocolate", "Indigo"] },
      { id: "printed-tote", name: "Printed tote", price: 1250, photo: "bag-printed", cat: "Totes", meta: "36 × 40 cm", desc: "Natural jute with a printed cotton trim. Light, sturdy and folds flat into a drawer.", options: ["Red trim", "Blue trim"] },
      { id: "woven-handbag", name: "Woven handbag", price: 1850, photo: "bag-woven", cat: "Handbags", meta: "30 × 24 cm", desc: "A colourful handbag woven in bands of dyed jute, with a zip top and a lined inside.", options: ["As shown"] },
      { id: "jute-pouch", name: "Jute pouch", price: 350, photo: "bag-pouch", cat: "Pouches", meta: "20 × 25 cm", desc: "A drawstring pouch for coins, chargers or a gift. Ask about a dozen for weddings and events.", options: ["Natural"] },
    ],
    delivery: [{ label: "Inside Dhaka · 1–2 days", price: 80 }, { label: "Outside Dhaka · 2–4 days", price: 130 }],
    notes: [["Delivery", "Inside Dhaka Tk 80, outside Tk 130, by courier"], ["Returns", "Unused bags within 7 days"], ["Payment", "bKash, Nagad or card"]],
  },
  shorshekitchen: {
    slug: "shorshekitchen", kind: "kitchen", name: "Shorshe Kitchen", tagline: "Home-cooked in Mohammadpur",
    prompt: "Orders for my home kitchen: kacchi biryani and cakes, with a delivery time and bKash payment",
    brand: "#b03a2e", ink: "#6e1f17", tint: "#fbefe6", radius: "10px",
    head: "Lora", body: "Work Sans", fonts: "family=Lora:wght@600;700&family=Work+Sans:wght@400;500;700",
    area: "Mohammadpur, Dhaka", address: "House 7, Road 3, Mohammadpur, Dhaka", hours: "Saturday to Thursday · delivery 12 to 9 pm", closed: 5,
    hero: { title: "Kacchi every day but Friday", sub: "Cooked at home in small pots, delivered hot around Mohammadpur.", cta: "See today's menu", photo: "food-biryani-plate" },
    intro: "Today's menu",
    story: [["Cooked to order", "Every pot is started after the orders come in. Nothing waits under a heat lamp."], ["Order a day ahead", "Cakes and big orders need a day. Biryani can be ordered the same morning."], ["Delivered by our own rider", "Inside Mohammadpur and nearby, in a sealed box."]],
    cats: ["All", "Biryani", "Cakes", "Sides"],
    items: [
      { id: "kacchi", name: "Kacchi biryani", price: 450, photo: "food-biryani-plate", cat: "Biryani", meta: "Serves one", desc: "Mutton and potato slow-cooked with fragrant rice, with borhani on the side." },
      { id: "chicken-biryani", name: "Chicken biryani", price: 320, photo: "food-biryani-bowl", cat: "Biryani", meta: "Serves one", desc: "Chicken biryani with a boiled egg and salad." },
      { id: "chocolate-cake", name: "Chocolate cake", price: 850, photo: "food-cake", cat: "Cakes", meta: "1 lb · order a day ahead", desc: "A dark, moist chocolate cake. Ask for a name on top." },
      { id: "borhani", name: "Borhani", price: 80, icon: "drop", cat: "Sides", meta: "500 ml", desc: "Spiced yoghurt drink, made fresh with every biryani batch." },
      { id: "firni", name: "Firni", price: 120, icon: "sparkle", cat: "Sides", meta: "Clay pot", desc: "Rice pudding set in a small clay pot." },
      { id: "roast", name: "Chicken roast", price: 280, icon: "star", cat: "Sides", meta: "Two pieces", desc: "Wedding-style roast in a rich, sweet gravy." },
    ],
    slots: ["12–1 pm", "1–2 pm", "2–3 pm", "7–8 pm", "8–9 pm"],
    delivery: [{ label: "Mohammadpur and nearby", price: 60 }],
    notes: [["Delivery", "Tk 60 around Mohammadpur, 12 to 9 pm"], ["Closed", "Fridays"], ["Payment", "bKash, Nagad or card"]],
  },
  glowroom: {
    slug: "glowroom", kind: "salon", name: "Glow Room", tagline: "Hair, skin and nails in Banani",
    prompt: "Online bookings for my salon with a deposit paid by bKash and a reminder SMS",
    brand: "#6a3d8f", ink: "#3f2257", tint: "#f3edf8", radius: "999px",
    head: "DM Serif Display", body: "Manrope", fonts: "family=DM+Serif+Display&family=Manrope:wght@400;500;700",
    area: "Banani, Dhaka", address: "Level 2, House 30, Road 17, Banani, Dhaka", hours: "Every day, 11 am to 8 pm · closed Tuesdays", closed: 2,
    hero: { title: "Book your chair in a minute", sub: "Pick a service and a time. A Tk 300 deposit holds it; the rest is paid at the salon.", cta: "Book a time" },
    intro: "Services",
    story: [["Women-only salon", "Private rooms for facials and bridal make-up."], ["A reminder the day before", "By SMS at 6 pm, with a link to change the time."], ["Deposits come off the bill", "Cancel a day ahead and it moves to your next visit."]],
    items: [
      { id: "haircut", name: "Haircut", price: 600, icon: "scissors", meta: "45 min", desc: "Wash, cut and blow-dry." },
      { id: "hair-colour", name: "Hair colour", price: 2200, icon: "drop", meta: "2 hr", desc: "Full colour with a gloss. Longer hair may cost more." },
      { id: "facial", name: "Facial", price: 1500, icon: "sparkle", meta: "1 hr", desc: "Deep cleanse, mask and massage." },
      { id: "manicure", name: "Manicure", price: 700, icon: "hand", meta: "40 min", desc: "Shape, cuticles and polish." },
      { id: "pedicure", name: "Pedicure", price: 900, icon: "hand", meta: "50 min", desc: "Soak, scrub and polish." },
      { id: "threading", name: "Threading", price: 150, icon: "sparkle", meta: "15 min", desc: "Eyebrows or upper lip." },
    ],
    slots: ["11:00 am", "12:30 pm", "2:00 pm", "3:30 pm", "4:30 pm", "6:00 pm", "7:15 pm"],
    fee: { label: "Deposit", amount: 300, note: "The rest is paid at the salon." },
    notes: [["Deposit", "Tk 300 by bKash, Nagad or card"], ["Reminder", "SMS the day before at 6 pm"], ["Closed", "Tuesdays"]],
  },
  carepoint: {
    slug: "carepoint", kind: "clinic", name: "CarePoint Clinic", tagline: "Evening chamber in Shyamoli",
    prompt: "Serial booking for my clinic's evening chamber, with a booking fee by bKash and the serial number by SMS",
    brand: "#0f7a6c", ink: "#084c43", tint: "#e8f4f1", radius: "8px",
    head: "Source Serif 4", body: "Source Sans 3", fonts: "family=Source+Serif+4:opsz,wght@8..60,600;8..60,700&family=Source+Sans+3:wght@400;600;700",
    area: "Shyamoli, Dhaka", address: "Ring Road, Shyamoli, Dhaka", hours: "Saturday to Thursday, 5 to 9 pm", closed: 5,
    hero: { title: "Get your serial before you leave home", sub: "Choose a doctor and a day. Pay the Tk 200 booking fee and your serial number comes by SMS.", cta: "Get a serial" },
    intro: "Doctors this week",
    story: [["No queue at the desk", "Come at your expected time; we text you when three patients are left before you."], ["Booking fee only", "The consultation fee is paid at the chamber after you see the doctor."], ["Twenty serials a doctor", "So every patient gets the doctor's time."]],
    items: [
      { id: "rahman", name: "Dr. A. Rahman", price: 800, icon: "AR", meta: "Medicine", desc: "General medicine, diabetes and blood pressure." },
      { id: "akter", name: "Dr. S. Akter", price: 700, icon: "SA", meta: "Paediatrics", desc: "Children's health, vaccines and growth checks." },
      { id: "hossain", name: "Dr. M. Hossain", price: 1000, icon: "MH", meta: "Gynaecology", desc: "Women's health and pregnancy care." },
      { id: "islam", name: "Dr. N. Islam", price: 900, icon: "NI", meta: "Dermatology", desc: "Skin, hair and allergy." },
    ],
    fee: { label: "Booking fee", amount: 200, note: "The consultation fee is paid at the chamber." },
    notes: [["Booking fee", "Tk 200 by bKash, Nagad or card"], ["Serials", "20 per doctor each evening"], ["Closed", "Fridays"]],
  },
};
