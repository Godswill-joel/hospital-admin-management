"use client"

import { useState } from "react";
import { Sidebar } from "@/components/sidebar";
import { Topbar } from "@/components/topbar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { staffData } from "@/data/data";
import { Search, Plus, Edit2, Trash2, Mail, Phone, X, CheckCircle2 } from "lucide-react";
import { ToastAlert } from "@/components/ui/alert";

interface StaffMember {
    id: number
    name: string
    role: string
    department: string
    email: string
    phone: string
    status: "Active" | "Inactive"
    startDate: string
}

export default function StaffPage() {
    const [searchTerm, setSearchTerm] = useState("")
    const [staff, setStaff] = useState(staffData)
    const [staffToDelete, setStaffToDelete] = useState<number | null>(null);
    const [showFormModal, setShowFormModal] = useState(false)
    const [editingStaff, setEditingStaff] = useState<StaffMember | null>(null)
    const [formData, setFormData] = useState({
        name: "",
        role: "",
        department: "",
        email: "",
        phone: "",
    })
    const userRole = localStorage.getItem("userRole") || "admin"

    const [toast, setToast] = useState({
        show: false,
        variant: "default" as "default" | "destructive",
        title: "",
        description: "",
        icon: null as React.ReactNode,
    })

    const filteredStaff = staff.filter(
        (s) =>
            s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            s.department.toLowerCase().includes(searchTerm.toLowerCase()),
    )

    const stats = [
        { label: "Total Staff", value: staffData.length, color: "bg-blue-100 text-blue-700" },
        { label: "Doctors", value: "8", color: "bg-green-100 text-green-700" },
        { label: "Nurses", value: "12", color: "bg-purple-100 text-purple-700" },
        { label: "Support Staff", value: "15", color: "bg-orange-100 text-orange-700" },
    ]

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

    const handleAddStaff = () => {
        setEditingStaff(null)
        setFormData({ name: "", role: "", department: "", email: "", phone: "" })
        setShowFormModal(true)
    }

    const handleEditStaff = (staffMember: StaffMember) => {
        setEditingStaff(staffMember)
        setFormData({
            name: staffMember.name,
            role: staffMember.role,
            department: staffMember.department,
            email: staffMember.email,
            phone: staffMember.phone,
        })
        setShowFormModal(true)
    }

    const handleSaveStaff = () => {
        if (editingStaff) {
            setStaff(
                staff.map((s) =>
                    s.id === editingStaff.id
                        ? {
                            ...s,
                            name: formData.name,
                            role: formData.role,
                            department: formData.department,
                            email: formData.email,
                            phone: formData.phone,
                        }
                        : s
                )
            );

            showToast({
                title: "Staff Updated",
                description: "Staff member updated successfully.",
                icon: <CheckCircle2 className="text-green-500" />,
            });
        } else {
            const newStaff: StaffMember = {
                id: staff.length + 1,
                name: formData.name,
                role: formData.role,
                department: formData.department,
                email: formData.email,
                phone: formData.phone,
                status: "Active",
                startDate: new Date().toISOString().split("T")[0],
            };

            setStaff([...staff, newStaff]);

            showToast({
                title: "Staff Added",
                description: "New staff member added successfully.",
                icon: <CheckCircle2 className="text-green-500" />,
            });
        }

        setShowFormModal(false);
    };

    const handleDeleteStaff = () => {
        if (staffToDelete === null) return;

        setStaff((prev) =>
            prev.filter((s) => s.id !== staffToDelete)
        );

        showToast({
            variant: "destructive",
            title: "Staff Deleted",
            description: "The staff member has been deleted successfully.",
            icon: <Trash2 className="text-red-500" />,
        });

        setStaffToDelete(null);
    };


    return (
        <div className="min-h-screen bg-background">
            <Sidebar />
            <div className="lg:ml-[260px] flex flex-col min-h-screen">
                <Topbar role={userRole} />
                <main className="flex-1 overflow-auto">
                    <div className="w-full mx-auto  p-6 lg:px-8 space-y-6 ">
                        {/* Header */}
                        <div className="flex items-center justify-between">
                            <div>
                                <h1 className="text-3xl font-bold text-foreground">Staff Management</h1>
                                <p className="text-muted-foreground">Manage hospital staff and personnel</p>
                            </div>
                            <Button className="bg-cyan-400 text-primary-foreground gap-2" onClick={handleAddStaff}>
                                <Plus className="w-4 h-4" />
                                Add staffMember
                            </Button>
                        </div>

                        {/* Stats */}
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                            {stats.map((stat) => (
                                <Card key={stat.label} className="border-border">
                                    <CardContent className="p-4">
                                        <p className="text-sm text-muted-foreground">{stat.label}</p>
                                        <p className={`text-2xl font-bold mt-2 ${stat.color}`}>{stat.value}</p>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>

                        {/* Search */}
                        <Card className="border-border">
                            <CardContent className="p-4">
                                <div className="flex items-center gap-2 bg-input rounded-lg px-3 py-2">
                                    <Search className="w-4 h-4 text-muted-foreground" />
                                    <Input
                                        type="text"
                                        placeholder="Search staff by name or department..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="bg-transparent border-0 outline-none"
                                    />
                                </div>
                            </CardContent>
                        </Card>

                        {/* Staff List */}
                        <Card className="border-border">
                            <CardHeader>
                                <CardTitle>Staff Directory</CardTitle>
                                <CardDescription>Total members: {filteredStaff.length}</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-3">
                                    {filteredStaff.map((staffMember) => (
                                        <div
                                            key={staffMember.id}
                                            className="flex items-center justify-between p-4 bg-muted rounded-lg hover:bg-muted/80 transition"
                                        >
                                            <div className="flex-1">
                                                <p className="font-semibold text-foreground">{staffMember.name}</p>
                                                <p className="text-sm text-muted-foreground">{staffMember.role}</p>
                                                <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                                                    <span>{staffMember.department}</span>
                                                    <span>Started: {staffMember.startDate}</span>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-3">
                                                <div className="text-right text-sm">
                                                    <div className="flex items-center gap-1 text-muted-foreground">
                                                        <Mail className="w-4 h-4" />
                                                        {staffMember.email}
                                                    </div>
                                                    <div className="flex items-center gap-1 text-muted-foreground mt-1">
                                                        <Phone className="w-4 h-4" />
                                                        {staffMember.phone}
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-2 ml-4">
                                                    <span
                                                        className={`px-3 py-1 rounded-full text-xs font-medium ${staffMember.status === "Active"
                                                            ? "bg-green-100 text-green-700"
                                                            : "bg-gray-100 text-gray-700"
                                                            }`}
                                                    >
                                                        {staffMember.status}
                                                    </span>
                                                    <Button size="sm" variant="ghost" onClick={() => handleEditStaff(staffMember)}>
                                                        <Edit2 className="w-4 h-4" />
                                                    </Button>
                                                    <Button
                                                        size="sm"
                                                        variant="ghost"
                                                        onClick={() => setStaffToDelete(staffMember.id)}
                                                    >
                                                        <Trash2 className="w-4 h-4 text-destructive" />
                                                    </Button>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>

                        {/* Add/Edit Staff Modal */}
                        {showFormModal && (
                            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                                <Card className="w-full max-w-md border-border">
                                    <CardHeader className="border-b border-border">
                                        <div className="flex items-center justify-between">
                                            <CardTitle>{editingStaff ? "Edit Staff Member" : "Add New Staff Member"}</CardTitle>
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
                                                placeholder="Dr. James Smith"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="role">Role</Label>
                                            <Input
                                                id="role"
                                                value={formData.role}
                                                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                                                placeholder="Senior Doctor"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="department">Department</Label>
                                            <Input
                                                id="department"
                                                value={formData.department}
                                                onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                                                placeholder="Cardiology"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="email">Email</Label>
                                            <Input
                                                id="email"
                                                type="email"
                                                value={formData.email}
                                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                                placeholder="james.smith@medicare.com"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="phone">Phone</Label>
                                            <Input
                                                id="phone"
                                                value={formData.phone}
                                                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                                placeholder="(555) 111-2222"
                                            />
                                        </div>
                                        <div className="flex gap-2 pt-4">
                                            <Button className="flex-1" onClick={handleSaveStaff}>
                                                {editingStaff ? "Update" : "Add"} Staff
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
                    {staffToDelete !== null && (
                        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
                            <Card className="w-full max-w-md border-border shadow-xl">
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2 text-destructive">
                                        <Trash2 className="w-6 h-6" />
                                        Delete Staff Member
                                    </CardTitle>

                                    <CardDescription className="pt-2 text-base">
                                        Are you sure you want to delete this staff member?
                                    </CardDescription>

                                    <p className="text-sm text-muted-foreground">
                                        This action cannot be undone.
                                    </p>
                                </CardHeader>

                                <CardContent>
                                    <div className="flex justify-end gap-3">
                                        <Button
                                            variant="outline"
                                            onClick={() => setStaffToDelete(null)}
                                        >
                                            No
                                        </Button>

                                        <Button
                                            variant="destructive"
                                            onClick={handleDeleteStaff}
                                        >
                                            Yes, Delete
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    )}
                </main>
            </div>
        </div>
    )
}
