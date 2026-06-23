"use client"

import { useState } from "react";
import { Sidebar } from "@/components/sidebar";
import { Topbar } from "@/components/topbar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { patientsData } from "@/data/data";
import { ToastAlert } from "@/components/ui/alert";
import { Search, Plus, Edit2, Trash2, Eye, X, CheckCircle2 } from "lucide-react";

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


export default function PatientsPage() {
    const [searchTerm, setSearchTerm] = useState("")
    const [patients, setPatients] = useState(patientsData)
    const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null)
    const [patientToDelete, setPatientToDelete] = useState<number | null>(null);
    const [showModal, setShowModal] = useState(false)
    const [showFormModal, setShowFormModal] = useState(false)
    const [editingPatient, setEditingPatient] = useState<Patient | null>(null)
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        age: "",
        bloodType: "",
    })
    const [toast, setToast] = useState({
        show: false,
        variant: "default" as "default" | "destructive",
        title: "",
        description: "",
        icon: null as React.ReactNode,
    })
    const userRole = localStorage.getItem("userRole") || "admin"

    const filteredPatients = patients.filter(
        (patient) =>
            patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            patient.email.toLowerCase().includes(searchTerm.toLowerCase()),
    )

    const handleAddPatient = () => {
        setEditingPatient(null)
        setFormData({ name: "", email: "", phone: "", age: "", bloodType: "" })
        setShowFormModal(true)
    }

    const handleEditPatient = (patient: Patient) => {
        setEditingPatient(patient)
        setFormData({
            name: patient.name,
            email: patient.email,
            phone: patient.phone,
            age: patient.age.toString(),
            bloodType: patient.bloodType,
        })
        setShowFormModal(true)
    }

    const handleSavePatient = () => {
        if (editingPatient) {
            setPatients(
                patients.map((p) =>
                    p.id === editingPatient.id
                        ? {
                            ...p,
                            name: formData.name,
                            email: formData.email,
                            phone: formData.phone,
                            age: Number.parseInt(formData.age),
                            bloodType: formData.bloodType,
                        }
                        : p,
                ),
            )
        } else {
            const newPatient: Patient = {
                id: patients.length + 1,
                name: formData.name,
                email: formData.email,
                phone: formData.phone,
                age: Number.parseInt(formData.age),
                bloodType: formData.bloodType,
                lastVisit: new Date().toISOString().split("T")[0],
                status: "Active",
            }
            setPatients([...patients, newPatient])
        }
        setShowFormModal(false)
    }
    const showToast = ({
        variant = "default",
        title,
        description,
        icon,
    }: {
        variant?: "default" | "destructive";
        title: string;
        description: string;
        icon?: React.ReactNode;
    }) => {
        setToast({
            show: true,
            variant,
            title,
            description,
            icon,
        });

        setTimeout(() => {
            setToast((prev) => ({ ...prev, show: false }));
        }, 3000);
    };


    const handleDeletePatient = () => {
        if (patientToDelete === null) return;

        setPatients((prev) =>
            prev.filter((p) => p.id !== patientToDelete)
        );

        showToast({
            variant: "destructive",
            title: "Patient Deleted",
            description: "The patient record has been deleted successfully.",
            icon: <Trash2 className="text-red-500" />,
        });

        setPatientToDelete(null);
    };

    

    return (
        <div className="min-h-screen bg-[#F1E9D2]">
            <Sidebar />

            <div className="lg:ml-[260px] flex flex-col min-h-screen">
                <Topbar role={userRole} />

                <main className="flex-1 overflow-y-auto">
                    <div className="w-full  mx-auto px-6 py-6 lg:px-8 space-y-6">
                        {/* Header */}
                        <div className="flex items-center justify-between">
                            <div>
                                <h1 className="text-3xl font-bold text-foreground">Patient Management</h1>
                                <p className="text-muted-foreground">Manage all patient records and information</p>
                            </div>
                            <Button className="bg-cyan-400 text-primary-foreground gap-2" onClick={handleAddPatient}>
                                <Plus className="w-4 h-4" />
                                Add Patient
                            </Button>
                        </div>

                        {/* Search */}
                        <Card className="border-border">
                            <CardContent className="p-4">
                                <div className="flex items-center gap-2 bg-input rounded-lg px-3 py-2">
                                    <Search className="w-4 h-4 text-muted-foreground" />
                                    <Input
                                        type="text"
                                        placeholder="Search patients by name or email..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="bg-transparent border-0 outline-none"
                                    />
                                </div>
                            </CardContent>
                        </Card>

                        {/* Patients Table */}
                        <Card className="border-border">
                            <CardHeader>
                                <CardTitle>Patient Records</CardTitle>
                                <CardDescription>Total patients: {filteredPatients.length}</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="overflow-x-auto">
                                    <table className="w-full text-sm">
                                        <thead>
                                            <tr className="border-b border-border">
                                                <th className="text-left py-3 px-4 font-semibold text-foreground">Patient Name</th>
                                                <th className="text-left py-3 px-4 font-semibold text-foreground">Email</th>
                                                <th className="text-left py-3 px-4 font-semibold text-foreground">Phone</th>
                                                <th className="text-left py-3 px-4 font-semibold text-foreground">Age</th>
                                                <th className="text-left py-3 px-4 font-semibold text-foreground">Blood Type</th>
                                                <th className="text-left py-3 px-4 font-semibold text-foreground">Last Visit</th>
                                                <th className="text-left py-3 px-4 font-semibold text-foreground">Status</th>
                                                <th className="text-left py-3 px-4 font-semibold text-foreground">Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {filteredPatients.map((patient) => (
                                                <tr key={patient.id} className="border-b border-border hover:bg-muted/50 transition">
                                                    <td className="py-4 px-4 font-medium text-foreground">{patient.name}</td>
                                                    <td className="py-4 px-4 text-muted-foreground">{patient.email}</td>
                                                    <td className="py-4 px-4 text-muted-foreground">{patient.phone}</td>
                                                    <td className="py-4 px-4 text-muted-foreground">{patient.age}</td>
                                                    <td className="py-4 px-4">
                                                        <span className="px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary">
                                                            {patient.bloodType}
                                                        </span>
                                                    </td>
                                                    <td className="py-4 px-4 text-muted-foreground">{patient.lastVisit}</td>
                                                    <td className="py-4 px-4">
                                                        <span
                                                            className={`px-3 py-1 rounded-full text-xs font-medium ${patient.status === "Active"
                                                                ? "bg-green-100 text-green-700"
                                                                : "bg-gray-100 text-gray-700"
                                                                }`}
                                                        >
                                                            {patient.status}
                                                        </span>
                                                    </td>
                                                    <td className="py-4 px-4">
                                                        <div className="flex items-center gap-2">
                                                            <Button
                                                                size="sm"
                                                                variant="ghost"
                                                                onClick={() => {
                                                                    setSelectedPatient(patient)
                                                                    setShowModal(true)
                                                                }}
                                                            >
                                                                <Eye className="w-4 h-4" />
                                                            </Button>
                                                            <Button size="sm" variant="ghost" onClick={() => handleEditPatient(patient)}>
                                                                <Edit2 className="w-4 h-4" />
                                                            </Button>
                                                            <Button
                                                                size="sm"
                                                                variant="ghost"
                                                                onClick={() => setPatientToDelete(patient.id)}
                                                            >
                                                                <Trash2 className="w-4 h-4 text-destructive" />
                                                            </Button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Add/Edit Patient Modal */}
                        {showFormModal && (
                            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                                <Card className="w-full max-w-md border-border">
                                    <CardHeader className="border-b border-border">
                                        <div className="flex items-center justify-between">
                                            <CardTitle>{editingPatient ? "Edit Patient" : "Add New Patient"}</CardTitle>
                                            <Button variant="ghost" size="icon" onClick={() => setShowFormModal(false)}>
                                                <X className="w-4 h-4" />
                                            </Button>
                                        </div>
                                    </CardHeader>
                                    <CardContent className="p-6 space-y-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="name">Full Name</Label>
                                            <Input
                                                id="name"
                                                value={formData.name}
                                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                                placeholder="John Doe"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="email">Email</Label>
                                            <Input
                                                id="email"
                                                type="email"
                                                value={formData.email}
                                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                                placeholder="john@example.com"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="phone">Phone</Label>
                                            <Input
                                                id="phone"
                                                value={formData.phone}
                                                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                                placeholder="(555) 123-4567"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="age">Age</Label>
                                            <Input
                                                id="age"
                                                type="number"
                                                value={formData.age}
                                                onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                                                placeholder="45"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="bloodType">Blood Type</Label>
                                            <Input
                                                id="bloodType"
                                                value={formData.bloodType}
                                                onChange={(e) => setFormData({ ...formData, bloodType: e.target.value })}
                                                placeholder="O+"
                                            />
                                        </div>
                                        <div className="flex gap-2 pt-4">
                                            <Button className="flex-1" onClick={handleSavePatient}>
                                                {editingPatient ? "Update" : "Add"} Patient
                                            </Button>
                                            <Button
                                                variant="outline"
                                                className="flex-1 bg-transparent"
                                                onClick={() => setShowFormModal(false)}
                                            >
                                                Cancel
                                            </Button>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                        )}

                        {/* Patient Detail Modal */}
                        {showModal && selectedPatient && (
                            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                                <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto border-border">
                                    <CardHeader className="border-b border-border">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <CardTitle className="text-2xl">{selectedPatient.name}</CardTitle>
                                                <CardDescription>Patient ID: {selectedPatient.id}</CardDescription>
                                            </div>
                                            <Button variant="outline" onClick={() => setShowModal(false)}>
                                                Close
                                            </Button>
                                        </div>
                                    </CardHeader>
                                    <CardContent className="p-6 space-y-6">
                                        {/* Personal Info */}
                                        <div>
                                            <h3 className="font-semibold text-foreground mb-4">Personal Information</h3>
                                            <div className="grid grid-cols-2 gap-4">
                                                <div>
                                                    <p className="text-sm text-muted-foreground">Email</p>
                                                    <p className="font-medium text-foreground">{selectedPatient.email}</p>
                                                </div>
                                                <div>
                                                    <p className="text-sm text-muted-foreground">Phone</p>
                                                    <p className="font-medium text-foreground">{selectedPatient.phone}</p>
                                                </div>
                                                <div>
                                                    <p className="text-sm text-muted-foreground">Age</p>
                                                    <p className="font-medium text-foreground">{selectedPatient.age}</p>
                                                </div>
                                                <div>
                                                    <p className="text-sm text-muted-foreground">Blood Type</p>
                                                    <p className="font-medium text-foreground">{selectedPatient.bloodType}</p>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Medical History */}
                                        <div>
                                            <h3 className="font-semibold text-foreground mb-4">Medical History</h3>
                                            <div className="space-y-2">
                                                {[
                                                    "Hypertension - Diagnosed 2020",
                                                    "Diabetes Type 2 - Managed",
                                                    "Allergy to Penicillin",
                                                    "Previous surgery: Appendectomy 2018",
                                                ].map((item, i) => (
                                                    <div key={i} className="p-3 bg-muted rounded-lg text-sm text-foreground">
                                                        {item}
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Current Medications */}
                                        <div>
                                            <h3 className="font-semibold text-foreground mb-4">Current Medications</h3>
                                            <div className="space-y-2">
                                                {[
                                                    { name: "Lisinopril", dose: "10mg", frequency: "Once daily" },
                                                    { name: "Metformin", dose: "500mg", frequency: "Twice daily" },
                                                ].map((med, i) => (
                                                    <div key={i} className="p-3 bg-muted rounded-lg text-sm">
                                                        <p className="font-medium text-foreground">{med.name}</p>
                                                        <p className="text-muted-foreground">
                                                            {med.dose} - {med.frequency}
                                                        </p>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                        )}
                        {patientToDelete !== null && (
                            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 hover">
                                <Card className="w-full max-w-md border-border shadow-xl">
                                    <CardHeader>
                                        <CardTitle className="flex items-center gap-2 text-destructive">
                                            <Trash2 className="w-6 h-6" />
                                            Delete Patient
                                        </CardTitle>

                                        <CardDescription className="pt-2 text-base">
                                            Are you sure you want to delete this patient?
                                        </CardDescription>

                                        <p className="text-sm text-muted-foreground">
                                            This action cannot be undone.
                                        </p>
                                    </CardHeader>

                                    <CardContent>
                                        <div className="flex justify-end gap-3">
                                            <Button
                                                variant="outline"
                                                onClick={() => setPatientToDelete(null)}
                                                className="hover:text-black"
                                            >
                                                No
                                            </Button>

                                            <Button
                                                variant="destructive"
                                                onClick={handleDeletePatient}

                                            >
                                                Yes, Delete
                                            </Button>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                        )}
                        <ToastAlert
                            show={toast.show}
                            variant={toast.variant}
                            icon={toast.icon}
                            title={toast.title}
                            description={toast.description}
                        />
                    </div>
                </main>
            </div>
        </div>
    )
}
