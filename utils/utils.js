import {
  ShieldPlus,
  Activity,
  Heart,
  Leaf,
  Droplets,
  Pill,
  FlaskConical,
  TestTube,
  Package,
  Sparkles,
  Wind,
  PersonStanding,
  Brain,
  Smile,
  Zap,
  Stethoscope,
} from "lucide-react";

// ─── THERAPY FILTERS ────────────────────────────────────────────────────────
export const therapyFilters = [
  { id: "immunity", label: "Immunity & Wellness", icon: ShieldPlus, count: 22 },
  { id: "digestion", label: "Digestive Health", icon: Activity, count: 14 },
  { id: "joint-care", label: "Joint & Muscle Care", icon: Zap, count: 8 },
  { id: "respiratory", label: "Respiratory Care", icon: Wind, count: 5 },
  {
    id: "womens-health",
    label: "Women's Health",
    icon: PersonStanding,
    count: 5,
  },
  { id: "hair-skin", label: "Hair & Skin Care", icon: Sparkles, count: 5 },
  { id: "cardiac", label: "Cardiac & BP", icon: Heart, count: 3 },
  { id: "diabetic", label: "Sugar Care", icon: Leaf, count: 8 },
  { id: "liver", label: "Liver & Detox", icon: Stethoscope, count: 3 },
  { id: "bone-health", label: "Bone Health", icon: Activity, count: 2 },
  { id: "oral-care", label: "Oral & Dental Care", icon: Smile, count: 2 },
  { id: "mental", label: "Mental Wellness", icon: Brain, count: 4 },
];

// ─── DOSAGE FORM FILTERS ─────────────────────────────────────────────────────
export const dosageFilters = [
  {
    id: "churna",
    label: "Churna, Powder & Granules",
    icon: Package,
    count: 18,
  },
  { id: "syrup", label: "Syrups, Kadha & Ras", icon: FlaskConical, count: 22 },
  { id: "vati", label: "Vati & Guggulu", icon: Pill, count: 10 },
  { id: "asava", label: "Asava & Arishta", icon: Droplets, count: 8 },
  { id: "avaleh", label: "Avaleh & Pak", icon: Leaf, count: 4 },
  { id: "juice", label: "Juices & Ras", icon: Droplets, count: 15 },
  { id: "oil", label: "Oils & Gels", icon: Droplets, count: 14 },
  { id: "capsule", label: "Capsules & Tablets", icon: Pill, count: 28 },
  { id: "bhasma", label: "Bhasma & Pishti", icon: TestTube, count: 4 },
];

// ─── THERAPY COLOR MAP (used in page for badges) ──────────────────────────────
export const therapyColorMap = {
  immunity: { bg: "#e8f5e9", text: "#2A5C32", dot: "#4caf50" },
  digestion: { bg: "#fff8e1", text: "#e65100", dot: "#ffa726" },
  "joint-care": { bg: "#e3f2fd", text: "#1565c0", dot: "#42a5f5" },
  respiratory: { bg: "#e0f7fa", text: "#00695c", dot: "#26c6da" },
  "womens-health": { bg: "#fce4ec", text: "#880e4f", dot: "#f06292" },
  "hair-skin": { bg: "#f3e5f5", text: "#6a1b9a", dot: "#ab47bc" },
  cardiac: { bg: "#ffebee", text: "#b71c1c", dot: "#ef5350" },
  diabetic: { bg: "#f1f8e9", text: "#33691e", dot: "#7cb342" },
  liver: { bg: "#fff3e0", text: "#bf360c", dot: "#ffa726" },
  "bone-health": { bg: "#e8eaf6", text: "#283593", dot: "#7986cb" },
  "oral-care": { bg: "#e0f2f1", text: "#004d40", dot: "#26a69a" },
  mental: { bg: "#ede7f6", text: "#4527a0", dot: "#9575cd" },
};

// ─── ALL PRODUCTS ────────────────────────────────────────────────────────────
export const allProducts = [
  // ── ORIGINAL PRODUCTS (fixed categories) ──────────────────────
  {
    id: 1,
    name: "Spiruactive",
    genericName: "Spirulina Herbal Supplement",
    therapy: "immunity",
    dosageForm: "capsule",
    packaging: "30 Cap",
    tag: "Best Seller",
    tagColor: "#2A5C32",
    description:
      "Premium spirulina-based herbal supplement for daily wellness, energy boost, and cellular rejuvenation.",
  },
  {
    id: 2,
    name: "Giloya Churna",
    genericName: "Tinospora Cordifolia Powder",
    therapy: "immunity",
    dosageForm: "churna",
    packaging: "100 gm",
    tag: "Immunity",
    tagColor: "#1d6fa4",
    description:
      "Powerful Ayurvedic herb for boosting immunity, fighting infections and chronic fever.",
  },
  {
    id: 3,
    name: "Neem, Karela & Jamun Churna",
    genericName: "Herbal Bitter Blend",
    therapy: "diabetic",
    dosageForm: "churna",
    packaging: "100 gm",
    description:
      "Potent three-herb blend for natural blood sugar management and pancreatic support.",
  },
  {
    id: 4,
    name: "Panchamrit Tulsi Drop",
    genericName: "Five Tulsi Extract",
    therapy: "respiratory",
    dosageForm: "juice",
    packaging: "30 ml",
    tag: "Essential",
    tagColor: "#2A5C32",
    description:
      "Concentrated extract of 5 varieties of Tulsi for respiratory health and immunity.",
  },
  {
    id: 5,
    name: "Dr. Artho King Oil",
    genericName: "Pain Relief Herbal Oil",
    therapy: "joint-care",
    dosageForm: "oil",
    packaging: "60 ml",
    tag: "Fast Relief",
    tagColor: "#b22222",
    description:
      "Effective herbal oil for quick relief from joint and muscle pain, arthritis and stiffness.",
  },
  {
    id: 6,
    name: "Digivin Syrup",
    genericName: "Ayurvedic Digestive Tonic",
    therapy: "digestion",
    dosageForm: "syrup",
    packaging: "200 ml",
    image: "/product/digivin-syrup-ingredients.jpg",
    description:
      "Ayurvedic syrup for improved digestion, appetite enhancement and relief from gas.",
  },
  {
    id: 7,
    name: "Dant Aushdhi",
    genericName: "Herbal Tooth Powder",
    therapy: "oral-care",
    dosageForm: "churna",
    packaging: "40 gm",
    description:
      "Traditional herbal manjan for strong teeth, healthy gums, and fresh breath.",
  },
  {
    id: 8,
    name: "Ashokarishta",
    genericName: "Ashoka Fermented Liquid",
    therapy: "womens-health",
    dosageForm: "asava",
    packaging: "450 ml",
    tag: "Women's Care",
    tagColor: "#d81b60",
    description:
      "Classical Ayurvedic tonic for complete women's health, hormonal balance and vitality.",
  },
  {
    id: 9,
    name: "Dashmoolarishta",
    genericName: "Ten Roots Fermented Liquid",
    therapy: "immunity",
    dosageForm: "asava",
    packaging: "450 ml",
    description:
      "Strengthens the body, relieves weakness and fatigue, balances Vata dosha.",
  },
  {
    id: 10,
    name: "Yograj Guggulu",
    genericName: "Commiphora Mukul Blend",
    therapy: "joint-care",
    dosageForm: "vati",
    packaging: "80 Vati",
    tag: "Joint Care",
    tagColor: "#2A5C32",
    description:
      "Classical Ayurvedic tablets for joint mobility, muscle comfort and Vata disorders.",
  },
  {
    id: 11,
    name: "Chandraprabha Vati",
    genericName: "Multi-herb Compound Tablet",
    therapy: "diabetic",
    dosageForm: "vati",
    packaging: "80 Vati",
    description:
      "Supports urinary tract health and helps maintain healthy blood sugar levels.",
  },
  {
    id: 12,
    name: "Chyawanprash Special",
    genericName: "Amla & Herb Herbal Jam",
    therapy: "immunity",
    dosageForm: "avaleh",
    packaging: "500 gm",
    tag: "Premium",
    tagColor: "#e65100",
    description:
      "Rich antioxidant-packed herbal jam for year-round immunity, vitality and rejuvenation.",
  },
  {
    id: 13,
    name: "Sitopaladi Churna",
    genericName: "Mishri & Herbs Blend",
    therapy: "respiratory",
    dosageForm: "churna",
    packaging: "100 gm",
    description:
      "Effective natural remedy for cough, cold, chest congestion and respiratory allergies.",
  },
  {
    id: 14,
    name: "Abhayarishta",
    genericName: "Haritaki Fermented Liquid",
    therapy: "digestion",
    dosageForm: "asava",
    packaging: "450 ml",
    description:
      "Promotes healthy bowel movements, relieves constipation and improves overall digestion.",
  },
  {
    id: 15,
    name: "Swarna Bhasma",
    genericName: "Incinerated Gold Preparation",
    therapy: "immunity",
    dosageForm: "bhasma",
    packaging: "1 gm",
    tag: "Rare",
    tagColor: "#f9a825",
    description:
      "Highly potent Ayurvedic formulation for strength, immunity and overall vitality.",
  },

  // ── NEW PRODUCTS FROM BROCHURE ──────────────────────────────────

  // Hair & Skin
  {
    id: 16,
    name: "Kesh Prabal Hair Oil",
    genericName: "Herbal Bio-Enhancer Hair Oil",
    therapy: "hair-skin",
    dosageForm: "oil",
    packaging: "100 ml",
    tag: "Hair Care",
    tagColor: "#6a1b9a",
    description:
      "Formulated with Amla, Bhringraj, Brahmi and 12+ herbs for healthy, long and lustrous hair. Repairs damage and ensures growth.",
  },
  {
    id: 17,
    name: "Neem Tel",
    genericName: "Neem Seed Oil",
    therapy: "hair-skin",
    dosageForm: "oil",
    packaging: "100 ml",
    description:
      "Antibiotic and anti-itching herbal oil for healthy, disease-free skin. Relieves itches, rashes and skin infections.",
  },

  // Joint Care
  {
    id: 18,
    name: "Sido Act Gel",
    genericName: "Medicated Anti-Inflammatory Gel",
    therapy: "joint-care",
    dosageForm: "oil",
    packaging: "30 gm",
    tag: "Topical",
    tagColor: "#1565c0",
    description:
      "Medicated cow-ghee based gel with Wintergreen, Prasarini and Camphor for chronic inflammation and joint health.",
  },
  {
    id: 19,
    name: "Sido Act Oil",
    genericName: "Mahanarayan & Prasarini Oil",
    therapy: "joint-care",
    dosageForm: "oil",
    packaging: "100 ml",
    description:
      "Potent herbal oil with Mahanarayan Tel and Mahavisgarbh Tel for joint pain, spasm relief and bone mineral density.",
  },

  // Bone Health
  {
    id: 20,
    name: "Calci Amrit Syrup",
    genericName: "Calcium & Herb Tonic",
    therapy: "bone-health",
    dosageForm: "syrup",
    packaging: "200 ml",
    tag: "Bone Health",
    tagColor: "#283593",
    description:
      "Medicated cow-ghee formula with Ashwagandha, Guduchi, Shatavari and Shilajit for natural calcium absorption and joint flexibility.",
  },

  // Liver & Detox
  {
    id: 21,
    name: "Livo Act Syrup",
    genericName: "Hepato-Protective Herbal Tonic",
    therapy: "liver",
    dosageForm: "syrup",
    packaging: "200 ml",
    image: "/product/livo-act-herbal-ingredients.jpg",
    tag: "Liver Care",
    tagColor: "#bf360c",
    description:
      "Natural liver tonic with Guduchi, Punarnava, Himsara and Amla for healthy liver function, jaundice care and immunity boost.",
  },

  // Digestion
  {
    id: 22,
    name: "Udarvikar Ras",
    genericName: "Digestive Herbal Liquid",
    therapy: "digestion",
    dosageForm: "syrup",
    packaging: "200 ml",
    description:
      "Natural blend with Barley Grass, Tulsi and Ghrut Kumari for ulcers, acidity, IBS, gas and indigestion.",
  },
  {
    id: 23,
    name: "Gas O Act Syrup",
    genericName: "Herbal Antacid Syrup",
    therapy: "digestion",
    dosageForm: "syrup",
    packaging: "100 ml",
    description:
      "Ayurvedic syrup with Adarak, Haritaki, Triphala for stomach infection, acidity, vomiting and uneasiness.",
  },
  {
    id: 24,
    name: "Piloact Syrup",
    genericName: "Piles Relief Herbal Syrup",
    therapy: "digestion",
    dosageForm: "syrup",
    packaging: "200 ml",
    image: "/product/piloact-ayurvedic-herbs.png",
    description:
      "Natural piles remedy with Pipal, Amla, Harad and Ark Ghansatva to shrink piles, stop bleeding and reduce swelling.",
  },
  {
    id: 25,
    name: "Piloact Granules",
    genericName: "Piles Herbal Granules",
    therapy: "digestion",
    dosageForm: "churna",
    packaging: "100 gm",
    description:
      "Herbal granule blend with Nimboli, Zimikand, Rasaut and Kutki effective for all types of piles.",
  },
  {
    id: 26,
    name: "Laxiactive Granules",
    genericName: "Constipation Relief Granules",
    therapy: "digestion",
    dosageForm: "churna",
    packaging: "100 gm",
    description:
      "Non-habit forming Ayurvedic granules with Sennai, Ajwain, Mulethi for constipation relief and regular bowel movement.",
  },
  {
    id: 27,
    name: "Triphala Juice",
    genericName: "Three-Fruit Digestive Juice",
    therapy: "digestion",
    dosageForm: "juice",
    packaging: "500 ml",
    description:
      "Classic three-fruit blend (Haritaki, Amla, Baheda) as a mild laxative, digestion booster and antioxidant rejuvenator.",
  },

  // Pain / Joint
  {
    id: 28,
    name: "Vednantak Oil",
    genericName: "Multi-Herb Pain Relief Oil",
    therapy: "joint-care",
    dosageForm: "oil",
    packaging: "100 ml",
    tag: "Pain Relief",
    tagColor: "#b22222",
    description:
      "Unique blend of 35+ classical herbs including Ashwagandha, Mahanarayan and Bala for body aches, gout, sprain and arthritis.",
  },

  // Respiratory
  {
    id: 29,
    name: "Tulsi Adusa Amrit Syrup",
    genericName: "Respiratory Herbal Syrup",
    therapy: "respiratory",
    dosageForm: "syrup",
    packaging: "100 ml",
    image: "/product/tulsi-adusamrit-ingredients.jpg",
    description:
      "Ayurvedic formula with Adusa, Haridra and Tulsi for dry cough, sore throat and chest congestion.",
  },

  // Women's Health
  {
    id: 30,
    name: "Femiactive Syrup",
    genericName: "Women's Health Tonic",
    therapy: "womens-health",
    dosageForm: "syrup",
    packaging: "200 ml",
    tag: "Women's Care",
    tagColor: "#880e4f",
    description:
      "Medicated cow-ghee based tonic with Ashoka, Shatavari, Nagkeshar for menstrual regulation, strength and vitality.",
  },
  {
    id: 31,
    name: "Lucroact Syrup",
    genericName: "Leucorrhoea Relief Syrup",
    therapy: "womens-health",
    dosageForm: "syrup",
    packaging: "200 ml",
    description:
      "Unique antifungal and antibacterial combination with Ashwagandha, Lodhra and Baelgiri for leucorrhoea relief.",
  },

  // Cardiac
  {
    id: 32,
    name: "Hridaya Rakshak Syrup",
    genericName: "Cardiac Herbal Tonic",
    therapy: "cardiac",
    dosageForm: "syrup",
    packaging: "200 ml",
    image: "/product/cardio-act-syrup.jpg",
    tag: "Heart Care",
    tagColor: "#b71c1c",
    description:
      "Ginger, Garlic, Lemon, Apple Cider Vinegar and Honey blend for cardiac function, breathlessness and chest health.",
  },

  // Diabetic
  {
    id: 33,
    name: "Madhumaar Kadha",
    genericName: "Diabetes Management Kadha",
    therapy: "diabetic",
    dosageForm: "syrup",
    packaging: "200 ml",
    image: "/product/madhumaar-kadha.jpg",
    tag: "Sugar Control",
    tagColor: "#33691e",
    description:
      "Special herb combo with Amalaki, Methi, Ashwagandha and Guduchi to activate pancreas, balance insulin and boost immunity.",
  },
  {
    id: 34,
    name: "Daiboact Juice",
    genericName: "Diabetic Support Juice",
    therapy: "diabetic",
    dosageForm: "juice",
    packaging: "500 ml",
    description:
      "Potent juice blend with Jambu, Karela, Guduchi, Neem, Fenugreek and Turmeric for healthy blood glucose levels.",
  },

  // Immunity – Juices
  {
    id: 35,
    name: "Aloe Vera Juice",
    genericName: "Pure Aloe Barbadensis Juice",
    therapy: "immunity",
    dosageForm: "juice",
    packaging: "500 ml",
    tag: "Detox",
    tagColor: "#2A5C32",
    description:
      "Handpicked fresh Aloevera for healthy metabolism, indigestion relief, arthritis, menstrual regulation and thalassemia support.",
  },
  {
    id: 36,
    name: "Awla Juice",
    genericName: "Fresh Amla (Gooseberry) Juice",
    therapy: "immunity",
    dosageForm: "juice",
    packaging: "500 ml",
    description:
      "Nutrient-rich detoxifying Amla juice for improved skin, hair, metabolism, protein synthesis and antioxidant activity.",
  },
  {
    id: 37,
    name: "Chandrayu Trimo",
    genericName: "Trimohills Weight Management Juice",
    therapy: "immunity",
    dosageForm: "juice",
    packaging: "500 ml",
    image: "/product/fat-reducer-ayurvedic-herbs.png",
    description:
      "Orange peel, Garcinia, Triphala and Shuddha Guggul blend for weight management and healthy lipid metabolism.",
  },
  {
    id: 38,
    name: "Bottle Gourd Juice",
    genericName: "Fresh Dudhi & Tulsi Juice",
    therapy: "immunity",
    dosageForm: "juice",
    packaging: "500 ml",
    description:
      "Bottle gourd with Tulsi and Aloe Vera – immune booster, antioxidant and cholesterol management juice.",
  },
  {
    id: 39,
    name: "Chandrayu Noni",
    genericName: "Noni & Garcinia Wellness Juice",
    therapy: "immunity",
    dosageForm: "juice",
    packaging: "500 ml",
    description:
      "Noni juice with Garcinia, Amla and Wheatgrass for digestive and immune system regulation and body fat management.",
  },

  // Mental
  {
    id: 40,
    name: "Maalkangini Oil",
    genericName: "Celastrus Paniculatus Oil",
    therapy: "mental",
    dosageForm: "oil",
    packaging: "100 ml",
    description:
      "Unique Ayurvedic oil for mental debility, concentration and brain health. Apply 2-4 drops twice daily with milk.",
  },

  // Immunity – Joint
  {
    id: 41,
    name: "Kalaunji Oil",
    genericName: "Nigella Sativa (Kalonji) Oil",
    therapy: "immunity",
    dosageForm: "oil",
    packaging: "100 ml",
    description:
      "Formulated with Black Seed (Nigella Sativa) for allergy, infections, arthritis, joint pain and constipation.",
  },

  // Organic Green Food
  {
    id: 42,
    name: "Wheatgrass Powder",
    genericName: "Wheat-0-Power Organic Powder",
    therapy: "immunity",
    dosageForm: "churna",
    packaging: "100 gm / 500 gm / 1 kg",
    tag: "Organic",
    tagColor: "#2A5C32",
    description:
      "100% Triticum Aestivum powder for metabolic support, detoxification, immunity, blood sugar control and blood quality.",
  },
  {
    id: 43,
    name: "Spirulina Tablets",
    genericName: "Arthrospira Platensis Tablet",
    therapy: "immunity",
    dosageForm: "capsule",
    packaging: "60 / 900 Tabs",
    description:
      "Spirulina algae (500mg/tab) for cellular rejuvenation, immunity, energy and antioxidant protection.",
  },

  // Oral Care
  {
    id: 44,
    name: "Herbal Mouth Freshener",
    genericName: "Ayurvedic Oral Care Blend",
    therapy: "oral-care",
    dosageForm: "churna",
    packaging: "50 gm",
    description:
      "Traditional herbal formulation for fresh breath, healthy gums and oral hygiene maintenance.",
  },

  // Single Herbal Capsules
  {
    id: 45,
    name: "Chandrayu Ashwagandha",
    genericName: "Withania Somnifera Extract Cap",
    therapy: "immunity",
    dosageForm: "capsule",
    packaging: "60 Cap",
    tag: "Stress Relief",
    tagColor: "#2A5C32",
    description:
      "Standardised Ashwagandha (0.5% Withanolides) for stress management, energy, strength and adrenal support.",
  },
  {
    id: 46,
    name: "Chandrayu Brahmi",
    genericName: "Bacopa Monnieri Extract Cap",
    therapy: "mental",
    dosageForm: "capsule",
    packaging: "60 Cap",
    description:
      "Standardised Brahmi (25% Total Bacosides) for brain health, memory enhancement and mental clarity.",
  },
  {
    id: 47,
    name: "Chandrayu Shankhpushpi",
    genericName: "Convolvulus Pluricaulis Cap",
    therapy: "mental",
    dosageForm: "capsule",
    packaging: "60 Cap",
    description:
      "Shankhpushpi (5% Bitter) for memory support, concentration, and neuroprotective action.",
  },
  {
    id: 48,
    name: "Chandrayu Arjuna",
    genericName: "Terminalia Arjuna Extract Cap",
    therapy: "cardiac",
    dosageForm: "capsule",
    packaging: "60 Cap",
    description:
      "Standardised Arjuna bark extract (12% Tannins) for heart health, BP management and cardiac strength.",
  },
  {
    id: 49,
    name: "Chandrayu Shallaki",
    genericName: "Boswellia Serrata Extract Cap",
    therapy: "joint-care",
    dosageForm: "capsule",
    packaging: "60 Cap",
    description:
      "Potent Shallaki (65% Boswellic Acid) for joint care, inflammation reduction and improved mobility.",
  },
  {
    id: 50,
    name: "Chandrayu Gurmar",
    genericName: "Gymnema Sylvestre Extract Cap",
    therapy: "diabetic",
    dosageForm: "capsule",
    packaging: "60 Cap",
    description:
      "Gurmar (25% Gymnemic Acid) to support healthy blood glucose levels and pancreatic function.",
  },
  {
    id: 51,
    name: "Chandrayu Karela",
    genericName: "Momordica Charantia Extract Cap",
    therapy: "diabetic",
    dosageForm: "capsule",
    packaging: "60 Cap",
    description:
      "Bitter Melon extract (2% Bitter) for natural blood sugar management and metabolic balance.",
  },
  {
    id: 52,
    name: "Chandrayu Shatavari",
    genericName: "Asparagus Racemosus Extract Cap",
    therapy: "womens-health",
    dosageForm: "capsule",
    packaging: "60 Cap",
    description:
      "Standardised Shatavari (30% Saponins) as a female health tonic for hormonal balance and reproductive wellness.",
  },
  {
    id: 53,
    name: "Chandrayu Shilajit",
    genericName: "Purified Asphaltum Cap",
    therapy: "immunity",
    dosageForm: "capsule",
    packaging: "60 Cap",
    tag: "Vitality",
    tagColor: "#2A5C32",
    description:
      "Purified Shilajit (1% Fulvic Acid) for vitality, revitalisation, strength and antioxidant support.",
  },
  {
    id: 54,
    name: "Chandrayu Triphala",
    genericName: "Three-Fruit Compound Tablet",
    therapy: "digestion",
    dosageForm: "capsule",
    packaging: "60 Tab",
    description:
      "Triphala (26% Tannins) for healthy digestion, mild laxative action and intestinal cleansing.",
  },
  {
    id: 55,
    name: "Chandrayu Neem",
    genericName: "Azadirachta Indica Extract Cap",
    therapy: "hair-skin",
    dosageForm: "capsule",
    packaging: "60 Cap",
    description:
      "Neem extract (3.5% Bitter) for body cleansing, skin health, blood purification and anti-bacterial action.",
  },
  {
    id: 56,
    name: "Puroact Syrup",
    genericName: "Skin Purifying Herbal Syrup",
    therapy: "hair-skin",
    dosageForm: "syrup",
    packaging: "200 ml",
    image: "/product/puro-act-natural-formula-ingredients.jpg",
    description:
      "Sariva, Giloy, Manjistha, Neem and Khadir blend for skin infection, allergies, inflammation and healthy glowing skin.",
  },
  {
    id: 57,
    name: "Chandrayu Turmeric",
    genericName: "Curcuma Longa Extract Cap",
    therapy: "immunity",
    dosageForm: "capsule",
    packaging: "60 Cap",
    description:
      "Turmeric extract (3% Curcuminoids) for immune defence, anti-inflammatory action and antioxidant protection.",
  },

  // ── PRODUCTS FROM PDF BROCHURE (CHANDRAYAN HERBAL PRODUCT LIST CHURN) ──────

  // Churna / Powder
  {
    id: 58,
    name: "Moringa Powder",
    genericName: "Moringa Oleifera Leaf Powder",
    therapy: "immunity",
    dosageForm: "churna",
    packaging: "100 gm",
    description:
      "Nutrient-dense Moringa powder for overall nutrition, immunity strengthening and general wellness.",
  },
  {
    id: 59,
    name: "Gudmar Churna",
    genericName: "Gymnema Sylvestre Powder",
    therapy: "diabetic",
    dosageForm: "churna",
    packaging: "50 gm / 100 gm / 1 kg",
    description:
      "Beneficial for diabetes management, blood sugar control, improving digestion and managing hunger-related issues.",
  },
  {
    id: 60,
    name: "Safeed Moosli Churna",
    genericName: "Chlorophytum Borivilianum Powder",
    therapy: "immunity",
    dosageForm: "churna",
    packaging: "50 gm / 100 gm",
    description:
      "Vata-balancing, strengthening churna for energy improvement and relief from general body weakness.",
  },
  {
    id: 61,
    name: "Karela Churna",
    genericName: "Momordica Charantia Powder",
    therapy: "diabetic",
    dosageForm: "churna",
    packaging: "50 gm / 100 gm / 1 kg",
    description:
      "Beneficial for diabetes management, improving digestion and boosting immunity.",
  },
  {
    id: 62,
    name: "Trikatu Churna",
    genericName: "Tri-Spice Herbal Blend",
    therapy: "digestion",
    dosageForm: "churna",
    packaging: "50 gm / 100 gm / 1 kg",
    description:
      "Improves digestion, relieves Vata disorders and reduces Kapha-related issues.",
  },
  {
    id: 63,
    name: "Mulethi Churna",
    genericName: "Glycyrrhiza Glabra Powder",
    therapy: "respiratory",
    dosageForm: "churna",
    packaging: "50 gm / 100 gm / 1 kg",
    description:
      "Beneficial for throat inflammation, cough relief and improving respiratory health.",
  },
  {
    id: 64,
    name: "Arjun Churna",
    genericName: "Terminalia Arjuna Bark Powder",
    therapy: "cardiac",
    dosageForm: "churna",
    packaging: "50 gm / 100 gm / 1 kg",
    description:
      "Supports heart health, respiratory wellness, blood pressure regulation and overall cardiac care.",
  },
  {
    id: 65,
    name: "Shitopaladi Churna",
    genericName: "Sugar & Herb Respiratory Blend",
    therapy: "respiratory",
    dosageForm: "churna",
    packaging: "50 gm / 100 gm / 1 kg",
    description:
      "Beneficial for cough, cold, Kapha disorders and respiratory problems.",
  },
  {
    id: 66,
    name: "Shatavari Churna",
    genericName: "Asparagus Racemosus Powder",
    therapy: "womens-health",
    dosageForm: "churna",
    packaging: "50 gm / 100 gm / 1 kg",
    description:
      "Supports women's health, reproductive wellness and hormonal balance.",
  },
  {
    id: 67,
    name: "Mahasudarshan Churna",
    genericName: "Multi-Herb Fever & Immunity Blend",
    therapy: "immunity",
    dosageForm: "churna",
    packaging: "50 gm / 100 gm / 1 kg",
    description:
      "Highly effective for fever management, infections and boosting immunity.",
  },
  {
    id: 68,
    name: "Baheda Churna",
    genericName: "Terminalia Bellirica Powder",
    therapy: "digestion",
    dosageForm: "churna",
    packaging: "50 gm / 100 gm / 1 kg",
    description:
      "Improves digestion, reduces Kapha and strengthens immunity.",
  },
  {
    id: 69,
    name: "Kaunch Churna",
    genericName: "Mucuna Pruriens Powder",
    therapy: "immunity",
    dosageForm: "churna",
    packaging: "50 gm / 100 gm / 1 kg",
    description:
      "Strengthening and nourishing churna for muscle building, vitality and mental wellness.",
  },
  {
    id: 70,
    name: "Dashang Laip",
    genericName: "Ten-Herb Paste Powder",
    therapy: "hair-skin",
    dosageForm: "churna",
    packaging: "50 gm / 100 gm / 1 kg",
    description:
      "Beneficial for skin diseases, inflammation and various skin-related problems.",
  },
  {
    id: 71,
    name: "Panch Nimb Churna",
    genericName: "Five Neem Parts Blend",
    therapy: "digestion",
    dosageForm: "churna",
    packaging: "50 gm / 100 gm / 1 kg",
    description:
      "Aids digestion, body detoxification and blood purification.",
  },
  {
    id: 72,
    name: "Bhuamla Churna",
    genericName: "Phyllanthus Niruri Powder",
    therapy: "liver",
    dosageForm: "churna",
    packaging: "50 gm / 100 gm / 1 kg",
    description:
      "Improves digestive strength, supports liver health and reduces inflammation.",
  },
  {
    id: 73,
    name: "Nagarmotha Churna",
    genericName: "Cyperus Rotundus Powder",
    therapy: "digestion",
    dosageForm: "churna",
    packaging: "50 gm / 100 gm / 1 kg",
    description:
      "Improves digestion, acts as an appetite stimulant and reduces body toxicity.",
  },
  {
    id: 74,
    name: "Triphala Churna",
    genericName: "Three-Fruit Herbal Blend",
    therapy: "digestion",
    dosageForm: "churna",
    packaging: "50 gm / 100 gm / 1 kg",
    description:
      "Improves digestion, relieves constipation and eliminates body toxins.",
  },
  {
    id: 75,
    name: "Nagkesar Churna",
    genericName: "Mesua Ferrea Powder",
    therapy: "digestion",
    dosageForm: "churna",
    packaging: "50 gm / 100 gm / 1 kg",
    description:
      "Beneficial for urinary disorders, inflammation and blood pressure management.",
  },
  {
    id: 76,
    name: "Chopchini Churna",
    genericName: "Smilax China Powder",
    therapy: "digestion",
    dosageForm: "churna",
    packaging: "50 gm / 100 gm / 1 kg",
    description:
      "Improves digestion, relieves constipation and general body weakness.",
  },
  {
    id: 77,
    name: "Bakuchi Churna",
    genericName: "Psoralea Corylifolia Powder",
    therapy: "hair-skin",
    dosageForm: "churna",
    packaging: "50 gm / 100 gm / 1 kg",
    description:
      "Beneficial for skin diseases, itching and improving skin complexion.",
  },
  {
    id: 78,
    name: "Avipatikar Churna",
    genericName: "Multi-Herb Digestive Blend",
    therapy: "digestion",
    dosageForm: "churna",
    packaging: "50 gm / 100 gm / 1 kg",
    description:
      "Effective for acidity, indigestion and digestive disorders.",
  },
  {
    id: 79,
    name: "Sanay Patti Churna",
    genericName: "Cassia Angustifolia Powder",
    therapy: "joint-care",
    dosageForm: "churna",
    packaging: "50 gm / 100 gm / 1 kg",
    description:
      "Beneficial for nerve-related disorders, joint pain and bone weakness.",
  },
  {
    id: 80,
    name: "Chirayta Churna",
    genericName: "Swertia Chirata Powder",
    therapy: "respiratory",
    dosageForm: "churna",
    packaging: "50 gm / 100 gm / 1 kg",
    description:
      "Reduces Kapha, improves digestion and overall health.",
  },
  {
    id: 81,
    name: "Tulsi Powder",
    genericName: "Ocimum Sanctum Leaf Powder",
    therapy: "immunity",
    dosageForm: "churna",
    packaging: "50 gm / 100 gm / 1 kg",
    tag: "Immunity",
    tagColor: "#2A5C32",
    description:
      "Boosts immunity, relieves cold, cough and stress.",
  },
  {
    id: 82,
    name: "Panchaskar Churna",
    genericName: "Five-Herb Digestive Blend",
    therapy: "digestion",
    dosageForm: "churna",
    packaging: "50 gm / 100 gm / 1 kg",
    description:
      "Improves digestion, relieves constipation and eliminates body toxins.",
  },
  {
    id: 83,
    name: "Shivashar Pachan Churna",
    genericName: "Digestive & Antacid Churna",
    therapy: "digestion",
    dosageForm: "churna",
    packaging: "50 gm / 100 gm / 1 kg",
    description:
      "Effective for improving digestion, relieving gas and acidity.",
  },
  {
    id: 84,
    name: "Hingavastak Churna",
    genericName: "Asafoetida & Herb Blend",
    therapy: "digestion",
    dosageForm: "churna",
    packaging: "50 gm / 100 gm / 1 kg",
    description:
      "Effective for digestion, gas and stomach pain relief.",
  },
  {
    id: 85,
    name: "Talisadi Churna",
    genericName: "Talispatra & Herb Blend",
    therapy: "respiratory",
    dosageForm: "churna",
    packaging: "50 gm / 100 gm / 1 kg",
    description:
      "Beneficial for cough, Kapha and respiratory problems.",
  },
  {
    id: 86,
    name: "Harad Churna",
    genericName: "Terminalia Chebula Powder",
    therapy: "digestion",
    dosageForm: "churna",
    packaging: "50 gm / 100 gm / 1 kg",
    description:
      "Improves digestion, relieves constipation and purifies blood.",
  },
  {
    id: 87,
    name: "Punarnava Churna",
    genericName: "Boerhavia Diffusa Powder",
    therapy: "liver",
    dosageForm: "churna",
    packaging: "50 gm / 100 gm / 1 kg",
    description:
      "Beneficial for kidney health, reducing inflammation and body detoxification.",
  },
  {
    id: 88,
    name: "Swadisht Virechan Churna",
    genericName: "Tasty Purgative Herbal Blend",
    therapy: "digestion",
    dosageForm: "churna",
    packaging: "50 gm / 100 gm / 1 kg",
    description:
      "Improves digestion, relieves constipation and eliminates body toxins.",
  },
  {
    id: 89,
    name: "Bhaskar Lavang Churna",
    genericName: "Clove & Herb Digestive Blend",
    therapy: "digestion",
    dosageForm: "churna",
    packaging: "50 gm / 100 gm / 1 kg",
    description:
      "Effective for digestion, indigestion and acidity relief.",
  },
  {
    id: 90,
    name: "Ajmodadi Churna",
    genericName: "Apium Graveolens Herb Blend",
    therapy: "digestion",
    dosageForm: "churna",
    packaging: "50 gm / 100 gm / 1 kg",
    description:
      "Beneficial for digestive disorders, gas and indigestion.",
  },
  {
    id: 91,
    name: "Panchcol Churna",
    genericName: "Five Root Digestive Blend",
    therapy: "digestion",
    dosageForm: "churna",
    packaging: "50 gm / 100 gm / 1 kg",
    description:
      "Improves digestion, relieves gas and constipation.",
  },
  {
    id: 92,
    name: "Neem Churna",
    genericName: "Azadirachta Indica Powder",
    therapy: "hair-skin",
    dosageForm: "churna",
    packaging: "100 gm / 1 kg",
    description:
      "Beneficial for skin diseases, blood purification and immunity boosting.",
  },
  {
    id: 93,
    name: "Pushyanug Churna",
    genericName: "Classical Gynaecological Blend",
    therapy: "womens-health",
    dosageForm: "churna",
    packaging: "100 gm / 1 kg",
    description:
      "Classical Ayurvedic formulation for menorrhagia, menstrual disorders and abnormal uterine bleeding.",
  },
  {
    id: 94,
    name: "Saraswat Churna",
    genericName: "Memory & Nerve Tonic Blend",
    therapy: "mental",
    dosageForm: "churna",
    packaging: "100 gm / 1 kg",
    description:
      "Beneficial for psychiatric disorders, epilepsy and mental weakness.",
  },
  {
    id: 95,
    name: "Shiwakshaar Paachan Churna",
    genericName: "Alkaline Digestive Blend",
    therapy: "digestion",
    dosageForm: "churna",
    packaging: "50 gm / 1 kg",
    description:
      "Effective for constipation, bloating, hiccups and vomiting.",
  },
  {
    id: 96,
    name: "Shrinagyadi Churna",
    genericName: "Respiratory Herbal Blend",
    therapy: "respiratory",
    dosageForm: "churna",
    packaging: "50 gm / 1 kg",
    description:
      "Beneficial for asthma, Kapha cough, hiccups and other respiratory disorders.",
  },
  {
    id: 97,
    name: "Veeryashodhan Churna",
    genericName: "Male Reproductive Health Blend",
    therapy: "immunity",
    dosageForm: "churna",
    packaging: "100 gm / 1 kg",
    description:
      "Beneficial for semen disorders, spermatorrhoea and dhatu dosha.",
  },
  {
    id: 98,
    name: "Walshwanar Churna",
    genericName: "Digestive & Rheumatic Blend",
    therapy: "joint-care",
    dosageForm: "churna",
    packaging: "100 gm / 1 kg",
    description:
      "Effective for rheumatoid arthritis, Shool-Mulvridhi and duodenal ulcers.",
  },
  {
    id: 99,
    name: "Anwala Churna",
    genericName: "Amla Powder",
    therapy: "immunity",
    dosageForm: "churna",
    packaging: "100 gm / 200 gm / 500 gm / 1 ltr",
    description:
      "Beneficial for acidity, blood disorders and diabetes management.",
  },
  {
    id: 100,
    name: "Ajmoda Churna",
    genericName: "Carom & Herb Digestive Blend",
    therapy: "digestion",
    dosageForm: "churna",
    packaging: "100 gm / 1 kg",
    description:
      "Effective for rheumatoid arthritis, stomach pain and vomiting.",
  },
  {
    id: 101,
    name: "Kamdeal Churna",
    genericName: "Male Vitality Herbal Blend",
    therapy: "immunity",
    dosageForm: "churna",
    packaging: "100 gm / 1 kg",
    description:
      "Beneficial for sexual disorders, premature ejaculation and nocturnal emission.",
  },
  {
    id: 102,
    name: "Krimighn Churna",
    genericName: "Anti-Parasitic Herbal Blend",
    therapy: "digestion",
    dosageForm: "churna",
    packaging: "100 gm / 1 kg",
    description:
      "Effective for intestinal worms, liver and spleen disorders.",
  },
  {
    id: 103,
    name: "Madhumeh Daman Churna",
    genericName: "Blood Sugar Control Blend",
    therapy: "diabetic",
    dosageForm: "churna",
    packaging: "100 gm / 1 kg",
    description:
      "Effective for controlling blood and urine sugar levels.",
  },
  {
    id: 104,
    name: "Moosli Churna",
    genericName: "Musli Aphrodisiac Rasayana",
    therapy: "immunity",
    dosageForm: "churna",
    packaging: "100 gm / 1 kg",
    description:
      "A potent and effective Vajikarana Rasayana for vitality and strength.",
  },
  {
    id: 105,
    name: "Narayan Churna",
    genericName: "Vata & Digestive Disorder Blend",
    therapy: "digestion",
    dosageForm: "churna",
    packaging: "100 gm / 1 kg",
    description:
      "Beneficial for male diseases, indigestion and stomach disorders.",
  },
  {
    id: 106,
    name: "Nimbadi Churna",
    genericName: "Neem-Based Vata & Skin Blend",
    therapy: "hair-skin",
    dosageForm: "churna",
    packaging: "100 gm / 1 kg",
    description:
      "Effective for Vata disorders and skin diseases.",
  },
  {
    id: 107,
    name: "Panchsakar Churna",
    genericName: "Five-Herb Laxative Blend",
    therapy: "digestion",
    dosageForm: "churna",
    packaging: "100 gm / 1 kg",
    description:
      "Beneficial for constipation, mudhagni, headaches and stomach pain.",
  },
  {
    id: 108,
    name: "Panchkol Churna",
    genericName: "Five Root Carminative Blend",
    therapy: "digestion",
    dosageForm: "churna",
    packaging: "100 gm / 1 kg",
    description:
      "Effective for flatulence, gulma, colic and other stomach diseases.",
  },
  {
    id: 109,
    name: "Panchnimba Churna",
    genericName: "Five Neem-Based Skin Blend",
    therapy: "hair-skin",
    dosageForm: "churna",
    packaging: "100 gm / 1 kg",
    description:
      "Beneficial for skin itching, eczema and skin disorders.",
  },
  {
    id: 110,
    name: "Pleehantak Churna",
    genericName: "Spleen & Liver Detox Blend",
    therapy: "liver",
    dosageForm: "churna",
    packaging: "100 gm / 1 kg",
    description:
      "Beneficial for spleen enlargement, growth disorders, swelling and liver diseases.",
  },
  {
    id: 111,
    name: "Avipaltikar Churna",
    genericName: "Antacid & Digestive Blend",
    therapy: "digestion",
    dosageForm: "churna",
    packaging: "50 gm / 100 gm / 1 kg",
    description:
      "Beneficial for acidity, indigestion, constipation and loss of appetite.",
  },
  {
    id: 112,
    name: "Ashtangalawan Churna",
    genericName: "Eight-Salt Digestive Blend",
    therapy: "digestion",
    dosageForm: "churna",
    packaging: "100 gm / 1 kg",
    description:
      "Beneficial for Vata disorders, digestive weakness and debility.",
  },

  // ── JUICES FROM PDF ───────────────────────────────────────────────

  {
    id: 113,
    name: "Amla Juice",
    genericName: "Amalaki Fresh Juice",
    therapy: "immunity",
    dosageForm: "juice",
    packaging: "500 ml / 1 ltr",
    description:
      "Rich in Vitamin C for improving digestion, strengthening immunity and overall wellness.",
  },
  {
    id: 114,
    name: "Aloevera Juice",
    genericName: "Aloe Barbadensis Fresh Juice",
    therapy: "immunity",
    dosageForm: "juice",
    packaging: "500 ml / 1 ltr",
    description:
      "Beneficial for digestion, skin health, overall immunity and general wellness.",
  },
  {
    id: 115,
    name: "Jamun Neem Karela Juice",
    genericName: "Tri-Herb Diabetic Juice",
    therapy: "diabetic",
    dosageForm: "juice",
    packaging: "500 ml / 1 ltr",
    description:
      "Effective for diabetes management, blood purification and immunity enhancement.",
  },
  {
    id: 116,
    name: "Giloy Juice",
    genericName: "Tinospora Cordifolia Juice",
    therapy: "immunity",
    dosageForm: "juice",
    packaging: "500 ml / 1 ltr",
    description:
      "Boosts immunity, treats fever and manages infections effectively.",
  },
  {
    id: 117,
    name: "Wheat Grass Juice",
    genericName: "Triticum Aestivum Fresh Juice",
    therapy: "immunity",
    dosageForm: "juice",
    packaging: "500 ml / 1 ltr",
    tag: "Detox",
    tagColor: "#2A5C32",
    description:
      "Beneficial for detoxification, immunity boosting and antioxidant protection.",
  },
  {
    id: 118,
    name: "Apple Cider Vinegar",
    genericName: "Fermented Apple Vinegar",
    therapy: "digestion",
    dosageForm: "juice",
    packaging: "500 ml / 1 ltr",
    description:
      "Aids digestion, supports weight loss and helps with blood sugar management.",
  },
  {
    id: 119,
    name: "Neem Juice",
    genericName: "Azadirachta Indica Fresh Juice",
    therapy: "hair-skin",
    dosageForm: "juice",
    packaging: "500 ml / 1 ltr",
    description:
      "Beneficial for skin diseases, blood purification and immunity boosting.",
  },

  // ── VATI / TABLETS FROM PDF ───────────────────────────────────────

  {
    id: 120,
    name: "Lahsunadi Vati",
    genericName: "Garlic-Based Compound Tablet",
    therapy: "cardiac",
    dosageForm: "vati",
    packaging: "40 / 80 / 100 Tab",
    description:
      "Beneficial for blood pressure, digestion and heart health.",
  },
  {
    id: 121,
    name: "Prabhakar Vati",
    genericName: "Digestive & Carminative Vati",
    therapy: "digestion",
    dosageForm: "vati",
    packaging: "40 / 80 / 100 Tab",
    description:
      "Improves digestion, relieves gas and indigestion.",
  },

  // ── OTHER FORMS FROM PDF ──────────────────────────────────────────

  {
    id: 122,
    name: "King Balm",
    genericName: "Herbal Pain Balm",
    therapy: "joint-care",
    dosageForm: "oil",
    packaging: "12 gm",
    description:
      "Fast-acting herbal balm for pain and inflammation relief.",
  },
  {
    id: 123,
    name: "Mona Malt",
    genericName: "Herbal Energy Malt",
    therapy: "immunity",
    dosageForm: "avaleh",
    packaging: "400 gm",
    description:
      "Herbal malt for energy enhancement and strength building.",
  },
  {
    id: 124,
    name: "Arshocon Syrup",
    genericName: "Piles & Digestive Syrup",
    therapy: "digestion",
    dosageForm: "syrup",
    packaging: "200 ml / 450 ml",
    description:
      "Effective Ayurvedic syrup for piles and digestive disorders. Also available in Sugar-Free variant.",
  },
  {
    id: 125,
    name: "Ones More Capsule",
    genericName: "Energy & Vitality Capsule",
    therapy: "immunity",
    dosageForm: "capsule",
    packaging: "30 Cap / 60 Cap",
    tag: "Vitality",
    tagColor: "#2A5C32",
    description:
      "Capsule formulation for energy, vitality and complete health improvement.",
  },
  {
    id: 126,
    name: "Ashwagandha Capsule",
    genericName: "Withania Somnifera Capsule",
    therapy: "immunity",
    dosageForm: "capsule",
    packaging: "30 Cap / 60 Cap",
    description:
      "Helps reduce stress and anxiety for improved mental and physical wellness.",
  },
  {
    id: 127,
    name: "Arthocon Capsule",
    genericName: "Joint & Muscle Relief Capsule",
    therapy: "joint-care",
    dosageForm: "capsule",
    packaging: "30 Cap / 60 Cap",
    description:
      "Provides relief from joint and muscle pain.",
  },
  {
    id: 128,
    name: "Madhukalp Capsule",
    genericName: "Energy & Strength Capsule",
    therapy: "immunity",
    dosageForm: "capsule",
    packaging: "30 Cap / 60 Cap",
    description:
      "Beneficial for general body weakness and energy enhancement.",
  },

  // ── OILS FROM PDF ─────────────────────────────────────────────────

  {
    id: 129,
    name: "Kumkumadi Oil",
    genericName: "Saffron-Based Skin Oil",
    therapy: "hair-skin",
    dosageForm: "oil",
    packaging: "10 / 30 / 50 / 500 ml",
    tag: "Skin Care",
    tagColor: "#6a1b9a",
    description:
      "Improves skin complexion and treats skin problems.",
  },
  {
    id: 130,
    name: "Anu Oil",
    genericName: "Nasal & Head Oil",
    therapy: "respiratory",
    dosageForm: "oil",
    packaging: "15 / 30 / 50 ml / 1 ltr",
    description:
      "Beneficial for sinusitis and head pain relief.",
  },
  {
    id: 131,
    name: "Kasisadi Oil",
    genericName: "Ferrous Sulphate Herbal Oil",
    therapy: "joint-care",
    dosageForm: "oil",
    packaging: "15 / 30 / 50 ml / 1 ltr",
    description:
      "Helps with Vata disorders, pain and swelling.",
  },
  {
    id: 132,
    name: "Mahamarichyaadi Oil",
    genericName: "Black Pepper Herbal Oil",
    therapy: "joint-care",
    dosageForm: "oil",
    packaging: "100 / 500 ml / 1 ltr",
    description:
      "Effective for pain, swelling and muscle relief.",
  },
  {
    id: 133,
    name: "Mahamash Oil",
    genericName: "Black Gram Herbal Oil",
    therapy: "joint-care",
    dosageForm: "oil",
    packaging: "100 / 500 ml / 1 / 5 ltr",
    description:
      "Relieves joint and muscle pain.",
  },
  {
    id: 134,
    name: "Bakuchi Oil",
    genericName: "Psoralea Corylifolia Oil",
    therapy: "hair-skin",
    dosageForm: "oil",
    packaging: "100 / 500 ml / 1 / 5 ltr",
    description:
      "Beneficial for skin disorders and pain reduction.",
  },
  {
    id: 135,
    name: "Neem Oil",
    genericName: "Azadirachta Indica Oil",
    therapy: "hair-skin",
    dosageForm: "oil",
    packaging: "100 / 500 ml / 1 / 5 ltr",
    description:
      "Effective for skin infections, swelling and pain.",
  },
  {
    id: 136,
    name: "Brahmi Oil",
    genericName: "Bacopa Monnieri Hair & Mind Oil",
    therapy: "mental",
    dosageForm: "oil",
    packaging: "100 / 500 ml / 1 / 5 ltr",
    description:
      "Reduces mental fatigue, stress and anxiety.",
  },
  {
    id: 137,
    name: "Frand Oil",
    genericName: "Herbal Skin & Pain Relief Oil",
    therapy: "hair-skin",
    dosageForm: "oil",
    packaging: "100 / 500 ml / 1 / 5 ltr",
    description:
      "Helpful for pain, swelling and skin problems.",
  },
  {
    id: 138,
    name: "Til Oil",
    genericName: "Sesame Seed Herbal Oil",
    therapy: "joint-care",
    dosageForm: "oil",
    packaging: "100 / 500 ml / 1 / 5 ltr",
    description:
      "Relieves body pain and swelling.",
  },
  {
    id: 139,
    name: "Arthocon Oil",
    genericName: "Joint & Muscle Herbal Oil",
    therapy: "joint-care",
    dosageForm: "oil",
    packaging: "100 / 500 ml / 1 / 5 ltr",
    description:
      "Relieves joint and muscle pain.",
  },
  {
    id: 140,
    name: "Kesh Prabal Oil",
    genericName: "Herbal Hair Growth Oil",
    therapy: "hair-skin",
    dosageForm: "oil",
    packaging: "100 ml / 1 ltr",
    description:
      "Beneficial for hair health, hair weakness and hair fall.",
  },
  {
    id: 141,
    name: "Panchagun Oil",
    genericName: "Five-Property Herbal Oil",
    therapy: "joint-care",
    dosageForm: "oil",
    packaging: "100 / 500 ml / 1 / 5 ltr",
    description:
      "Effective for all types of pain and swelling.",
  },

  // ── PRODUCTS FROM EXCEL UNIQUE PRODUCT LIST (05-08-24) ───────────

  // Syrups
  {
    id: 142,
    name: "Femiactive Syrup",
    genericName: "Women's Gynaecological Tonic",
    therapy: "womens-health",
    dosageForm: "syrup",
    packaging: "450 ml",
    tag: "Women's Care",
    tagColor: "#880e4f",
    description:
      "Herbal gynaecological tonic for hormonal balance, menstrual regulation and women's vitality.",
  },
  {
    id: 143,
    name: "Fevro Act Syrup",
    genericName: "Herbal Fever & Cold Syrup",
    therapy: "immunity",
    dosageForm: "syrup",
    packaging: "200 ml",
    description:
      "Ayurvedic syrup for fever management and cold relief.",
  },
  {
    id: 144,
    name: "Tulsi Amrit Cough Syrup",
    genericName: "Tulsi-Based Cough Syrup",
    therapy: "respiratory",
    dosageForm: "syrup",
    packaging: "100 ml",
    description:
      "Herbal cough syrup with Tulsi for relief from cough, cold and throat irritation.",
  },
  {
    id: 145,
    name: "Kafhaari Herbal Syrup",
    genericName: "Kapha-Relieving Herbal Syrup",
    therapy: "respiratory",
    dosageForm: "syrup",
    packaging: "100 ml",
    description:
      "Ayurvedic syrup for Kapha reduction, cough relief and respiratory wellness.",
  },

  // Kadhas
  {
    id: 146,
    name: "Hridayarakshak Kadha",
    genericName: "Cardiac Herbal Kadha",
    therapy: "cardiac",
    dosageForm: "syrup",
    packaging: "500 ml",
    tag: "Heart Care",
    tagColor: "#b71c1c",
    description:
      "Herbal Kadha for cardiac support, immunity and chest blockage relief.",
  },
  {
    id: 147,
    name: "Madhumar Kadha",
    genericName: "Diabetes Management Kadha",
    therapy: "diabetic",
    dosageForm: "syrup",
    packaging: "200 ml",
    tag: "Sugar Control",
    tagColor: "#33691e",
    description:
      "Herbal Kadha for diabetes management and blood sugar control.",
  },

  // Granules
  {
    id: 148,
    name: "Brain Booster Granules",
    genericName: "Herbal Brain & Memory Granules",
    therapy: "mental",
    dosageForm: "churna",
    packaging: "250 gm",
    description:
      "Herbal granules for brain health, memory enhancement and mental clarity.",
  },
  {
    id: 149,
    name: "Madhuhaari Granules",
    genericName: "Diabetic Support Granules",
    therapy: "diabetic",
    dosageForm: "churna",
    packaging: "100 gm",
    description:
      "Herbal granules for blood sugar management and diabetes support.",
  },
  {
    id: 150,
    name: "Laxative Granules",
    genericName: "Herbal Laxative Granules",
    therapy: "digestion",
    dosageForm: "churna",
    packaging: "100 gm",
    description:
      "Ayurvedic granules for gentle laxative action and constipation relief.",
  },
  {
    id: 151,
    name: "Piles Granules",
    genericName: "Herbal Piles Granules",
    therapy: "digestion",
    dosageForm: "churna",
    packaging: "100 gm",
    description:
      "Herbal granule blend for piles management and related digestive issues.",
  },
  {
    id: 152,
    name: "Kabj Ja Granules",
    genericName: "Constipation Relief Granules",
    therapy: "digestion",
    dosageForm: "churna",
    packaging: "100 gm",
    description:
      "Effective herbal granules for constipation relief and bowel regularity.",
  },

  // Cream & Gels
  {
    id: 153,
    name: "Purodil Anti Acne Gel",
    genericName: "Herbal Anti-Acne Gel",
    therapy: "hair-skin",
    dosageForm: "oil",
    packaging: "20 gm",
    description:
      "Herbal gel formulation for acne treatment and skin care.",
  },
  {
    id: 154,
    name: "Sidoact Gel",
    genericName: "Herbal Pain Relief Gel",
    therapy: "joint-care",
    dosageForm: "oil",
    packaging: "30 gm",
    description:
      "Topical herbal gel for pain relief and joint care.",
  },
  {
    id: 155,
    name: "Herbal Foot Care Cream",
    genericName: "Herbal Foot Care Cream",
    therapy: "hair-skin",
    dosageForm: "oil",
    packaging: "25 gm",
    description:
      "Herbal cream for foot care, cracked heels and skin nourishment.",
  },
  {
    id: 156,
    name: "Piloact Gel",
    genericName: "Herbal Piles Care Gel",
    therapy: "digestion",
    dosageForm: "oil",
    packaging: "30 gm",
    description:
      "Topical herbal gel for external piles care and relief.",
  },

  // Powders
  {
    id: 157,
    name: "Protin Powder Strong",
    genericName: "Herbal Protein Booster Powder",
    therapy: "immunity",
    dosageForm: "churna",
    packaging: "250 gm",
    description:
      "Herbal protein powder for energy, strength and overall body boosting.",
  },
  {
    id: 158,
    name: "Tea Fresh (Slim Tea)",
    genericName: "Herbal Slimming Tea",
    therapy: "immunity",
    dosageForm: "churna",
    packaging: "50 gm",
    description:
      "Herbal slim tea blend for weight management and detoxification.",
  },

  // Tablets
  {
    id: 159,
    name: "Lucroact Tab",
    genericName: "Leucorrhoea Relief Tablet",
    therapy: "womens-health",
    dosageForm: "vati",
    packaging: "60 Tab",
    description:
      "Herbal tablet for white discharge (leucorrhoea) management.",
  },
  {
    id: 160,
    name: "Sidoact Tab",
    genericName: "Pain Relief Tablet",
    therapy: "joint-care",
    dosageForm: "vati",
    packaging: "30 Tab",
    description:
      "Herbal tablet for pain relief and inflammation.",
  },
  {
    id: 161,
    name: "G.B. Stone Tab",
    genericName: "Gallbladder Stone Relief Tablet",
    therapy: "liver",
    dosageForm: "vati",
    packaging: "60 Tab",
    description:
      "Herbal tablet to help remove and dissolve gallbladder stones.",
  },
  {
    id: 162,
    name: "SRO Ren Tab",
    genericName: "Kidney Function Support Tablet",
    therapy: "digestion",
    dosageForm: "vati",
    packaging: "60 Tab",
    description:
      "Herbal tablet for elevated serum creatinine and kidney function support.",
  },
  {
    id: 163,
    name: "Sropar Tab",
    genericName: "Paralysis Relief Tablet",
    therapy: "mental",
    dosageForm: "vati",
    packaging: "60 Tab",
    description:
      "Herbal tablet beneficial for all types of paralysis.",
  },
  {
    id: 164,
    name: "Kidney Stone Tab",
    genericName: "Kidney & Ureteric Stone Tablet",
    therapy: "digestion",
    dosageForm: "vati",
    packaging: "60 Tab",
    description:
      "Herbal tablet for kidney stone and ureteric stone management.",
  },
  {
    id: 165,
    name: "Cantum Plus Tab",
    genericName: "Anti-Cancer Support Tablet",
    therapy: "immunity",
    dosageForm: "vati",
    packaging: "60 Tab",
    description:
      "Herbal tablet formulated for all types of cancer support.",
  },
  {
    id: 166,
    name: "Sroasth Tab",
    genericName: "Fever & Cough Relief Tablet",
    therapy: "respiratory",
    dosageForm: "vati",
    packaging: "60 Tab",
    description:
      "Herbal tablet for all types of fever and cough.",
  },
  {
    id: 167,
    name: "Srolet Tab",
    genericName: "Platelet Booster Tablet",
    therapy: "immunity",
    dosageForm: "vati",
    packaging: "60 Tab",
    description:
      "Herbal tablet for low platelet count management.",
  },
  {
    id: 168,
    name: "Sro Slip Tab",
    genericName: "Sleep & Insomnia Tablet",
    therapy: "mental",
    dosageForm: "vati",
    packaging: "60 Tab",
    description:
      "Herbal tablet for insomnia and sleep disorders.",
  },
  {
    id: 169,
    name: "Srotum Tab",
    genericName: "Tumour Support Tablet",
    therapy: "immunity",
    dosageForm: "vati",
    packaging: "60 Tab",
    description:
      "Herbal tablet for erosive or non-cancerous tumour support.",
  },
  {
    id: 170,
    name: "Srofem Tab",
    genericName: "Uterine Health Tablet",
    therapy: "womens-health",
    dosageForm: "vati",
    packaging: "60 Tab",
    description:
      "Herbal tablet for leucorrhoea and bulky uterus management.",
  },
  {
    id: 171,
    name: "Dard Chhu Tab",
    genericName: "Joint Pain & Stiffness Tablet",
    therapy: "joint-care",
    dosageForm: "vati",
    packaging: "60 Tab",
    description:
      "Herbal tablet to reduce pain and stiffness of joints.",
  },
  {
    id: 172,
    name: "Medomukti Tab",
    genericName: "Fat Release Weight Management Tablet",
    therapy: "immunity",
    dosageForm: "vati",
    packaging: "120 Tab",
    description:
      "Herbal tablet for fat release and weight management.",
  },
  {
    id: 173,
    name: "Calciact Tab",
    genericName: "Calcium & Bone Support Tablet",
    therapy: "bone-health",
    dosageForm: "vati",
    packaging: "30 Tab",
    description:
      "Herbal calcium tablet for bone strength and skeletal health.",
  },

  // Capsules
  {
    id: 174,
    name: "Aciatica Capsule",
    genericName: "Sciatica Relief Capsule",
    therapy: "joint-care",
    dosageForm: "capsule",
    packaging: "60 Cap",
    description:
      "Herbal capsule for sciatica nerve pain relief.",
  },
  {
    id: 175,
    name: "Arjun Cap",
    genericName: "Terminalia Arjuna Heart Capsule",
    therapy: "cardiac",
    dosageForm: "capsule",
    packaging: "60 Cap",
    description:
      "Herbal capsule for heart health and cardiac-related conditions.",
  },
  {
    id: 176,
    name: "Apruactive Cap",
    genericName: "Active Body Herbal Capsule",
    therapy: "immunity",
    dosageForm: "capsule",
    packaging: "30 Cap",
    description:
      "Herbal capsule for active body and overall vitality.",
  },
  {
    id: 177,
    name: "Giloya Cap",
    genericName: "Tinospora Cordifolia Capsule",
    therapy: "immunity",
    dosageForm: "capsule",
    packaging: "60 Cap",
    description:
      "Herbal capsule for anti-inflammatory action and immunity boosting.",
  },
  {
    id: 178,
    name: "Stress Win Cap",
    genericName: "Stress Relief Herbal Capsule",
    therapy: "mental",
    dosageForm: "capsule",
    packaging: "10 Cap",
    description:
      "Herbal capsule for stress relief and mental wellness.",
  },
  {
    id: 179,
    name: "Multivitamins Goal Vit Cap",
    genericName: "Multivitamin Herbal Capsule",
    therapy: "immunity",
    dosageForm: "capsule",
    packaging: "1x10 Cap",
    description:
      "Herbal multivitamin capsule for active body and complete daily nutrition.",
  },

  // Churnas
  {
    id: 180,
    name: "Udar Rechak Churna",
    genericName: "Digestive & Antacid Churna",
    therapy: "digestion",
    dosageForm: "churna",
    packaging: "100 gm",
    description:
      "Herbal churna for acidity and constipation relief.",
  },

  // Liquids / Juices
  {
    id: 181,
    name: "Giloya Ras",
    genericName: "Tinospora Cordifolia Liquid",
    therapy: "immunity",
    dosageForm: "juice",
    packaging: "500 ml",
    description:
      "Herbal Giloy liquid for immunity power and overall health.",
  },
  {
    id: 182,
    name: "Fat Reduce Swaras",
    genericName: "Herbal Fat Reduce Juice",
    therapy: "immunity",
    dosageForm: "juice",
    packaging: "500 ml",
    description:
      "Herbal juice blend for fat reduction and weight management.",
  },
  {
    id: 183,
    name: "Aloevera Juice (Litchi / Pineapple)",
    genericName: "Flavoured Aloe Vera Juice",
    therapy: "immunity",
    dosageForm: "juice",
    packaging: "500 ml",
    description:
      "Aloe Vera juice available in Litchi and Pineapple flavours for digestion and immunity.",
  },
  {
    id: 184,
    name: "Cardio Act Liquid",
    genericName: "Cardiac Herbal Liquid",
    therapy: "cardiac",
    dosageForm: "juice",
    packaging: "500 ml",
    description:
      "Herbal liquid for heart immunity and blockage management.",
  },

  // Oils
  {
    id: 185,
    name: "Malkangni Oil",
    genericName: "Celastrus Paniculatus Oil",
    therapy: "mental",
    dosageForm: "oil",
    packaging: "100 ml",
    description:
      "Herbal oil for mental debility and concentration improvement.",
  },
  {
    id: 186,
    name: "Kalunji Oil",
    genericName: "Nigella Sativa Oil",
    therapy: "immunity",
    dosageForm: "oil",
    packaging: "100 ml",
    description:
      "Herbal oil for allergy and headache relief.",
  },
  {
    id: 187,
    name: "Mahanarayan Oil",
    genericName: "Mahanarayan Herbal Oil",
    therapy: "joint-care",
    dosageForm: "oil",
    packaging: "100 ml",
    description:
      "Classical Ayurvedic oil for Vata disorders and arthritis.",
  },
  {
    id: 188,
    name: "Aciatica Oil",
    genericName: "Sciatica Relief Herbal Oil",
    therapy: "joint-care",
    dosageForm: "oil",
    packaging: "100 ml",
    description:
      "Herbal oil formulated for sciatica nerve pain relief.",
  },
];