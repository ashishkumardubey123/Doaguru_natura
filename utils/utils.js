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

