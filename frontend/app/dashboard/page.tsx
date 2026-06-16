"use client"

import { Sidebar } from "@/components/sidebar"
import { Topbar } from "@/components/topbar"
import { AdminDashboard } from "@/components/dashboards/admin-dashboard"

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-[#F1E9D2]">
      <Sidebar />

      {/* Main Content */}
      <div className="lg:ml-[260px] flex flex-col min-h-screen">
        <Topbar role="admin" />

        <main className="flex-1 overflow-y-auto">
          <div className="w-full px-6 py-6 lg:px-8">
            <AdminDashboard />
          </div>
        </main>
      </div>
    </div>
  )
}