"use client"

import { useState } from "react";
import { Sidebar } from "@/components/sidebar";
import { Topbar } from "@/components/topbar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar, Clock, User, Trash2, X, CheckCircle2 } from "lucide-react";
import { appointmentsData } from "@/data/data";
import { ToastAlert } from "@/components/ui/alert";

interface Appointment {
    id: number
    patientName: string
    doctorName: string
    date: string
    time: string
    type: string
    status: "Scheduled" | "Completed" | "Cancelled" | "No-show"
}

export default function AppointmentsPage() {
    const [appointments, setAppointments] = useState(appointmentsData)
    const [filterStatus, setFilterStatus] = useState("all")
    const [appointmentToDelete, setAppointmentToDelete] = useState<number | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showFormModal, setShowFormModal] = useState(false)
    const [formData, setFormData] = useState({
        patientName: "",
        doctorName: "",
        date: "",
        time: "",
        type: "",
    })
    const [toast, setToast] = useState({
        show: false,
        variant: "default" as "default" | "destructive",
        title: "",
        description: "",
        icon: null as React.ReactNode,
    })

    const userRole = localStorage.getItem("userRole") || "admin"

    const filteredAppointments =
        filterStatus === "all" ? appointments : appointments.filter((apt) => apt.status === filterStatus)


    const getStatusColor = (status: string) => {
        switch (status) {
            case "Scheduled":
                return "bg-blue-100 text-blue-700"
            case "Completed":
                return "bg-green-100 text-green-700"
            case "Cancelled":
                return "bg-red-100 text-red-700"
            case "No-show":
                return "bg-orange-100 text-orange-700"
            default:
                return "bg-gray-100 text-gray-700"
        }
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

    const handleSaveAppointment = async () => {
        if (
            !formData.patientName.trim() ||
            !formData.doctorName.trim() ||
            !formData.date ||
            !formData.time ||
            !formData.type.trim()
        ) {
            showToast({
                variant: "destructive",
                title: "Missing Information",
                description: "Please fill in all the required fields.",
            });

            return;
        }

        try {
            setIsSubmitting(true);

            // Simulate an API request
            await new Promise((resolve) => setTimeout(resolve, 1200));

            const newAppointment: Appointment = {
                id: Date.now(),
                patientName: formData.patientName,
                doctorName: formData.doctorName,
                date: formData.date,
                time: formData.time,
                type: formData.type,
                status: "Scheduled",
            };

            // Update the UI
            setAppointments((prev) => [...prev, newAppointment]);

            // Close modal
            setShowFormModal(false);

            // Reset form
            setFormData({
                patientName: "",
                doctorName: "",
                date: "",
                time: "",
                type: "",
            });

    
            showToast({
                title: "Appointment Scheduled",
                description: "Appointment created successfully.",
                icon: <CheckCircle2 className="text-green" />,
            });
        } catch (error) {
            console.error(error);

            showToast({
                variant: "destructive",
                title: "Failed",
                description: "Unable to schedule appointment.",
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    // const handleSaveAppointment = () => {
    //     const newAppointment: Appointment = {
    //         id: appointments.length + 1,
    //         patientName: formData.patientName,
    //         doctorName: formData.doctorName,
    //         date: formData.date,
    //         time: formData.time,
    //         type: formData.type,
    //         status: "Scheduled",
    //     }
    //     setAppointments([...appointments, newAppointment])
    //     setShowFormModal(false)
    // }

    const handleDeleteAppointment = () => {
        if (appointmentToDelete === null) return;

        setAppointments((prev) =>
            prev.filter((s) => s.id !== appointmentToDelete)
        );

        showToast({
            variant: "destructive",
            title: "Appointment Deleted",
            description: "The appoinment is now deleted successfully.",
            icon: <Trash2 className="text-red-500" />,
        });

        setAppointmentToDelete(null);
    }

    const handleAddAppointment = () => {
        setFormData({
            patientName: "",
            doctorName: "",
            date: "",
            time: "",
            type: "",
        });
    
        setShowFormModal(true);
    };

    return (
        <div className="min-h-screen bg-background">
            <Sidebar />
            <div className="lg:ml-[260px] flex flex-col min-h-screen">
                <Topbar role={userRole} />
                <main className="flex-1 overflow-auto">
                    <div className="p-6 space-y-6">
                        {/* Header */}
                        <div className="flex items-center justify-between">
                            <div>
                                <h1 className="text-3xl font-bold text-foreground">Appointment Scheduling</h1>
                                <p className="text-muted-foreground">Manage and schedule patient appointments</p>
                            </div>
                            <Button className="bg-primary text-primary-foreground" onClick={handleAddAppointment}>
                                <Calendar className="w-4 h-4 mr-2" />
                                New Appointment
                            </Button>
                        </div>

                        {/* Stats */}
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                            {[
                                { label: "Total Scheduled", value: "12", color: "bg-blue-100 text-blue-700" },
                                { label: "Completed", value: "8", color: "bg-green-100 text-green-700" },
                                { label: "Cancelled", value: "2", color: "bg-red-100 text-red-700" },
                                { label: "Today", value: "3", color: "bg-purple-100 text-purple-700" },
                            ].map((stat) => (
                                <Card key={stat.label} className="border-border">
                                    <CardContent className="p-4">
                                        <p className="text-sm text-muted-foreground">{stat.label}</p>
                                        <p className={`text-2xl font-bold mt-2 ${stat.color}`}>{stat.value}</p>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>

                        {/* Filters */}
                        <Card className="border-border">
                            <CardContent className="p-4">
                                <div className="flex flex-wrap gap-2">
                                    {["all", "Scheduled", "Completed", "Cancelled"].map((status) => (
                                        <Button
                                            key={status}
                                            variant={filterStatus === status ? "default" : "outline"}
                                            size="sm"
                                            onClick={() => setFilterStatus(status)}
                                            className={filterStatus === status ? "bg-primary text-primary-foreground" : ""}
                                        >
                                            {status.charAt(0).toUpperCase() + status.slice(1)}
                                        </Button>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>

                        {/* Appointments List */}
                        <Card className="border-border">
                            <CardHeader>
                                <CardTitle>Appointments</CardTitle>
                                <CardDescription>Total: {filteredAppointments.length}</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-3">
                                    {filteredAppointments.map((appointment) => (
                                        <div
                                            key={appointment.id}
                                            className="flex items-center justify-between p-4 bg-muted rounded-lg hover:bg-muted/80 transition"
                                        >
                                            <div className="flex items-center gap-4 flex-1">
                                                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                                                    <User className="w-6 h-6 text-primary" />
                                                </div>
                                                <div className="flex-1">
                                                    <p className="font-semibold text-foreground">{appointment.patientName}</p>
                                                    <p className="text-sm text-muted-foreground">
                                                        {appointment.type} • {appointment.doctorName}
                                                    </p>
                                                </div>
                                                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                                    <div className="flex items-center gap-1">
                                                        <Calendar className="w-4 h-4" />
                                                        {appointment.date}
                                                    </div>
                                                    <div className="flex items-center gap-1">
                                                        <Clock className="w-4 h-4" />
                                                        {appointment.time}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-3">
                                                <span
                                                    className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(appointment.status)}`}
                                                >
                                                    {appointment.status}
                                                </span>
                                                <Button
                                                    size="sm"
                                                    variant="ghost"
                                                    onClick={() => setAppointmentToDelete(appointment.id)}
                                                >
                                                    <Trash2 className="w-4 h-4 text-destructive" />
                                                </Button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>

                        {/* Add Appointment Modal */}
                        {showFormModal && (
                            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                                <Card className="w-full max-w-md border-border">
                                    <CardHeader className="border-b border-border">
                                        <div className="flex items-center justify-between">
                                            <CardTitle>Schedule New Appointment</CardTitle>
                                            <Button variant="ghost" size="icon" onClick={() => setShowFormModal(false)}>
                                                <X className="w-4 h-4" />
                                            </Button>
                                        </div>
                                    </CardHeader>
                                    <CardContent className="p-6 space-y-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="patientName">Patient Name</Label>
                                            <Input
                                                id="patientName"
                                                value={formData.patientName}
                                                onChange={(e) => setFormData({ ...formData, patientName: e.target.value })}
                                                placeholder="John Doe"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="doctorName">Doctor Name</Label>
                                            <Input
                                                id="doctorName"
                                                value={formData.doctorName}
                                                onChange={(e) => setFormData({ ...formData, doctorName: e.target.value })}
                                                placeholder="Dr. Smith"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="date">Date</Label>
                                            <Input
                                                id="date"
                                                type="date"
                                                value={formData.date}
                                                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="time">Time</Label>
                                            <Input
                                                id="time"
                                                type="time"
                                                value={formData.time}
                                                onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="type">Appointment Type</Label>
                                            <Input
                                                id="type"
                                                value={formData.type}
                                                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                                                placeholder="Consultation"
                                            />
                                        </div>
                                        <div className="flex gap-2 pt-4">
                                            <Button className="flex-1" onClick={handleSaveAppointment}>
                                                Schedule Appointment
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
                    </div>
                    {appointmentToDelete !== null && (
                        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
                            <Card className="w-full max-w-md border-border shadow-xl">
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2 text-destructive">
                                        <Trash2 className="w-6 h-6" />
                                        Delete appointment
                                    </CardTitle>

                                    <CardDescription className="pt-2 text-base">
                                        Are you sure you want to delete this appointment?
                                    </CardDescription>

                                    <p className="text-sm text-muted-foreground">
                                        This action cannot be undone.
                                    </p>
                                </CardHeader>

                                <CardContent>
                                    <div className="flex justify-end gap-3">
                                        <Button
                                            variant="outline"
                                            onClick={() => setAppointmentToDelete(null)}
                                        >
                                            No
                                        </Button>

                                        <Button
                                            variant="destructive"
                                            onClick={handleDeleteAppointment}
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
                </main>
            </div>
        </div>
    )
}
