// Social proof for the home page: a wall of businesses that sell with Amader Cloud, and owners' stories.
//
// PLACEHOLDER CONTENT. Every business, person and quote below is invented, to agree the design on. None of it may
// be published: `live` stays false, so the sections render only in the dev preview (marked "Placeholder") and are
// left out of the built site. To launch: replace these with real businesses that have agreed to be shown (logo
// files in public/assets/customers/, quotes approved by the person quoted), then set `live` to true.
export const live = false;

export type Logo = { name: string; kind: string; mark: "serif" | "script" | "slab" | "round" | "condensed" | "mono"; icon: string };
export const logos: Logo[] = [
  { name: "Nokshi Ghor", kind: "Hand-stitched kantha", mark: "serif", icon: "heart" },
  { name: "Dough & Doi", kind: "Home bakery", mark: "script", icon: "star" },
  { name: "Meghna Agro", kind: "Rice and dal packs", mark: "slab", icon: "box" },
  { name: "Shapla Pharma", kind: "3 pharmacies", mark: "round", icon: "pill" },
  { name: "Kantha Kotha", kind: "Saree page", mark: "serif", icon: "tag" },
  { name: "Brightline Coaching", kind: "400 students", mark: "condensed", icon: "book" },
  { name: "Cha Adda", kind: "Tea and snacks", mark: "round", icon: "chat" },
  { name: "Rangdhanu Kids", kind: "Kids' clothing", mark: "script", icon: "sparkle" },
  { name: "Padma Fresh Fish", kind: "Fish to order", mark: "slab", icon: "truck" },
  { name: "Thread & Loom BD", kind: "Garment wholesale", mark: "mono", icon: "grid" },
  { name: "Glowup Studio", kind: "Salon", mark: "serif", icon: "scissors" },
  { name: "Cool Point Services", kind: "AC repairs", mark: "condensed", icon: "snow" },
];

export type Story = { quote: string; name: string; role: string; business: string; area: string; scale: string; tone: string };
export const stories: Story[] = [
  { quote: "I used to sit up till one in the morning answering 'price?' in the inbox. Now the cake is ordered, paid by bKash and the delivery time chosen before I wake up.",
    name: "Farhana Akter", role: "Owner", business: "Dough & Doi", area: "Mohammadpur", scale: "Home bakery", tone: "#b03a2e" },
  { quote: "Half my cash-on-delivery parcels used to come back. With bKash at checkout, people who order really want the saree, and the courier is booked by itself.",
    name: "Sharmin Nahar", role: "Seller", business: "Kantha Kotha", area: "Facebook page, Narayanganj", scale: "Facebook seller", tone: "#9a4a24" },
  { quote: "Office regulars pre-order their tea and singara for 4 pm. I make what's ordered, nothing goes to waste, and the money is in before they arrive.",
    name: "Abdul Karim", role: "Owner", business: "Cha Adda", area: "Motijheel", scale: "Tea stall", tone: "#0b5d3b" },
  { quote: "Three branches, one app. Customers upload the prescription, the nearest branch packs it, and I see every branch's sales from my phone at night.",
    name: "Dr. Mahmudul Hasan", role: "Managing partner", business: "Shapla Pharma", area: "Chattogram", scale: "3 pharmacies", tone: "#1d5fa8" },
  { quote: "Collecting fees from 400 students was two people's full-time job. Now guardians pay by bKash or Nagad and get the receipt by SMS. The late list makes itself.",
    name: "Tanvir Rahman", role: "Director", business: "Brightline Coaching", area: "Rajshahi", scale: "400 students", tone: "#6a3d8f" },
  { quote: "Buyers in Gazipur and Narayanganj order surplus lots straight from the catalogue. Our team asked for bulk pricing in a sentence and had it the same afternoon.",
    name: "Nasrin Sultana", role: "Head of sales", business: "Thread & Loom BD", area: "Gazipur", scale: "Garment wholesale", tone: "#14213d" },
];
