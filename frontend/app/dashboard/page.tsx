"use client"

import { Sidebar } from "@/components/sidebar"
import { Topbar } from "@/components/topbar"
import { AdminDashboard } from "@/components/dashboards/admin-dashboard"

export default function DashboardPage() {
  return (
    <div className="flex h-screen bg-white">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex flex-1 flex-col overflow-hidden ">
        <Topbar role="admin" />

        <main className="flex-1 overflow-auto p-8">
          <div className="mx-auto w-full max-w-7xl px-6">
            <AdminDashboard />
          </div>
        </main>
      </div>
    </div>
  )
}