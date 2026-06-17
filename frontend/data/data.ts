import {
    Compass,
    BookOpen,
    FolderOpen,
    ShoppingBag,
    User,
    Library,
    Paintbrush,
    Sparkles,
    Blocks,
    Rocket,
    Megaphone,
    Video,
    ShoppingCart,
    Share2,
    Code2,
    Users,
    Calendar,
    DollarSign,
    AlertCircle,
    BarChart3,
    Stethoscope,
    Pill,
    FileText,
    Settings
} from "lucide-react";

// Top Bar 
export const roleLabels = {
    admin: "Administrator",
    doctor: "Doctor",
    nurse: "Nurse",
    receptionist: "Receptionist",
    patient: "Patient"
}

// SideBar Data
// ─── Static nav links ───────────────────────────────────────────────────────
export const mainLinks = [
    { label: "Dashboard", icon: BarChart3, href: "/dashboard", dot: false },
    { label: "Patients", icon: Users, href: "/patients", dot: false },
    { label: "Staff Management", icon: Stethoscope, href: "/staff", dot: false },
    { label: "Appointments", icon: Calendar, href: "/appointments", dot: false },
    { label: "Inventory", icon: Pill, href: "/inventory", dot: false },
    { label: "Medical Records", icon: FileText, href: "/medical-records", dot: false },
    { label: "Billing", icon: DollarSign, href: "/billing", dot: false },
    { label: "Prescriptions", icon: Pill, href: "/prescriptions", dot: false },
    { label: "Settings", icon: Settings, href: "#", dot: false },
];

// ─── Collapsible tool categories ────────────────────────────────────────────
export const toolCategories = [
    {
        label: "Libraries",
        icon: Library,
        items: ["Component Libs", "Icon Packs", "Animation Kits", "Template Repos"],
    },
    {
        label: "Design",
        icon: Paintbrush,
        items: ["Figma Plugins", "Color Tools", "Typography", "Asset Generators"],
    },
    {
        label: "AI",
        icon: Sparkles,
        items: ["Image Gen", "Code Assistants", "Copywriting", "Data & Analytics"],
    },
    {
        label: "No-Code",
        icon: Blocks,
        items: ["Website Builders", "App Builders", "Automation", "CMS Platforms"],
    },
    {
        label: "Startups",
        icon: Rocket,
        items: ["Pitch Decks", "Finance Tools", "Legal & Compliance", "Hiring"],
    },
    {
        label: "Marketing",
        icon: Megaphone,
        items: ["SEO Tools", "Email Marketing", "Analytics", "Social Scheduling"],
    },
    {
        label: "Video",
        icon: Video,
        items: ["Editing Tools", "Screen Recorders", "Stock Footage", "Captions"],
    },
    {
        label: "E-commerce",
        icon: ShoppingCart,
        items: ["Store Builders", "Payment Gateways", "Inventory", "Reviews"],
    },
    {
        label: "Social Media",
        icon: Share2,
        items: ["Scheduling", "Analytics", "Content Creation", "Listening Tools"],
    },
    {
        label: "Dev Tools",
        icon: Code2,
        items: ["IDEs & Editors", "API Testing", "CI/CD", "Monitoring"],
    },
];

// Admin-Dashboard
export const statsData = [
    { label: "Total Patients", value: "2,543", icon: Users, color: "text-blue-500" },
    { label: "Appointments Today", value: "24", icon: Calendar, color: "text-green-500" },
    { label: "Available Beds", value: "45/120", icon: AlertCircle, color: "text-orange-500" },
    { label: "Revenue (This Month)", value: "$48,520", icon: DollarSign, color: "text-purple-500" },
];

export const chartData = [
    { name: "Mon", appointments: 22, patients: 45 },
    { name: "Tue", appointments: 28, patients: 52 },
    { name: "Wed", appointments: 20, patients: 38 },
    { name: "Thu", appointments: 35, patients: 61 },
    { name: "Fri", appointments: 31, patients: 55 },
];

export const departmentData = [
    { name: "Cardiology", value: 320 },
    { name: "Orthopedics", value: 280 },
    { name: "Neurology", value: 210 },
    { name: "General", value: 190 },
];

// patient-Dashboard
interface Patient {
    id: number
    name: string
    email: string
    phone: string
    age: number
    bloodType: string
    lastVisit: string
    status: "Active" | "Inactive"
}

export const patientsData: Patient[] = [
    {
        id: 1,
        name: "John Doe",
        email: "john@example.com",
        phone: "(555) 123-4567",
        age: 45,
        bloodType: "O+",
        lastVisit: "2024-01-10",
        status: "Active",
    },
    {
        id: 2,
        name: "Jane Smith",
        email: "jane@example.com",
        phone: "(555) 234-5678",
        age: 38,
        bloodType: "A-",
        lastVisit: "2024-01-08",
        status: "Active",
    },
    {
        id: 3,
        name: "Robert Johnson",
        email: "robert@example.com",
        phone: "(555) 345-6789",
        age: 62,
        bloodType: "B+",
        lastVisit: "2024-01-05",
        status: "Active",
    },
    {
        id: 4,
        name: "Sarah Williams",
        email: "sarah@example.com",
        phone: "(555) 456-7890",
        age: 29,
        bloodType: "AB+",
        lastVisit: "2024-01-02",
        status: "Inactive",
    },
]
