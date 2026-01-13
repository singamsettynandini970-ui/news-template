"use client"

import { useState } from "react"
import { TemplateSidebar } from "@/components/template-sidebar"
import { TemplatePreview } from "@/components/template-preview"

export default function HomePage() {
  const [selectedItem, setSelectedItem] = useState<string | null>(null)
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)

  return (
    <div className="flex h-screen overflow-hidden">
      <TemplateSidebar
        onSelectItem={setSelectedItem}
        collapsed={sidebarCollapsed}
        onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
      />
      <main className="flex-1 overflow-hidden">
        <TemplatePreview selectedItem={selectedItem} />
      </main>
    </div>
  )
}
