"use client"

import { Sidebar } from "@/components/sidebar"
import { Topbar } from "@/components/topbar"
import { AdminDashboard } from "@/components/dashboards/admin-dashboard"

export default function DashboardPage() {
  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex flex-1 flex-col overflow-hidden">
        <Topbar role="admin" />

        <main className="flex-1 overflow-y-auto p-6">
          <div className="mx-auto w-full max-w-7xl">
            <AdminDashboard />
          </div>
        </main>
      </div>
    </div>
  )
}