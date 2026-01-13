// Tabs templates - Horizontal, Vertical, Icon, Underline
// 4 variations

import type { ExtendedPanel, TemplateVariation } from './template-registry'
import { createTemplateMetadata } from './template-converter'
import { COMMON_DEPENDENCIES } from './template-registry'

const TABS_TEMPLATES = [
  {
    id: 1,
    name: "Horizontal Tabs",
    description: "Horizontal tab navigation",
    style: "minimal" as const,
    code: 'import { useState } from "react"\n\nexport default function HorizontalTabs() {\n  const [activeTab, setActiveTab] = useState("tab1")\n  const tabs = [\n    { id: "tab1", label: "Overview", content: "Overview content here" },\n    { id: "tab2", label: "Details", content: "Details content here" },\n    { id: "tab3", label: "Settings", content: "Settings content here" },\n  ]\n\n  return (\n    <div className="w-full max-w-2xl">\n      <div className="flex border-b border-border">\n        {tabs.map(tab => (\n          <button\n            key={tab.id}\n            onClick={() => setActiveTab(tab.id)}\n            className={`px-4 py-3 font-medium transition-colors ${\n              activeTab === tab.id\n                ? "text-primary border-b-2 border-primary"\n                : "text-muted-foreground hover:text-foreground"\n            }`}\n          >\n            {tab.label}\n          </button>\n        ))}\n      </div>\n      <div className="p-4">\n        {tabs.find(t => t.id === activeTab)?.content}\n      </div>\n    </div>\n  )\n}',
  },
  {
    id: 2,
    name: "Vertical Tabs",
    description: "Vertical tab navigation",
    style: "modern" as const,
    code: 'import { useState } from "react"\n\nexport default function VerticalTabs() {\n  const [activeTab, setActiveTab] = useState("tab1")\n  const tabs = [\n    { id: "tab1", label: "Profile", content: "Profile information" },\n    { id: "tab2", label: "Security", content: "Security settings" },\n    { id: "tab3", label: "Privacy", content: "Privacy options" },\n  ]\n\n  return (\n    <div className="w-full max-w-2xl flex gap-4">\n      <div className="flex flex-col border-r border-border">\n        {tabs.map(tab => (\n          <button\n            key={tab.id}\n            onClick={() => setActiveTab(tab.id)}\n            className={`px-4 py-3 text-left font-medium transition-colors ${\n              activeTab === tab.id\n                ? "text-primary bg-primary/10 border-r-2 border-primary"\n                : "text-muted-foreground hover:text-foreground"\n            }`}\n          >\n            {tab.label}\n          </button>\n        ))}\n      </div>\n      <div className="flex-1 p-4">\n        {tabs.find(t => t.id === activeTab)?.content}\n      </div>\n    </div>\n  )\n}',
  },
  {
    id: 3,
    name: "Icon Tabs",
    description: "Tabs with icons",
    style: "classic" as const,
    code: 'import { useState } from "react"\nimport { Home, Bell, Settings } from "lucide-react"\n\nexport default function IconTabs() {\n  const [activeTab, setActiveTab] = useState("tab1")\n  const tabs = [\n    { id: "tab1", icon: Home, label: "Home", content: "Home content" },\n    { id: "tab2", icon: Bell, label: "Notifications", content: "Notifications content" },\n    { id: "tab3", icon: Settings, label: "Settings", content: "Settings content" },\n  ]\n\n  return (\n    <div className="w-full max-w-2xl">\n      <div className="flex gap-2 border-b border-border">\n        {tabs.map(tab => {\n          const Icon = tab.icon\n          return (\n            <button\n              key={tab.id}\n              onClick={() => setActiveTab(tab.id)}\n              className={`flex items-center gap-2 px-4 py-3 transition-colors ${\n                activeTab === tab.id\n                  ? "text-primary border-b-2 border-primary"\n                  : "text-muted-foreground hover:text-foreground"\n              }`}\n            >\n              <Icon className="h-4 w-4" />\n              <span className="font-medium">{tab.label}</span>\n            </button>\n          )\n        })}\n      </div>\n      <div className="p-4">\n        {tabs.find(t => t.id === activeTab)?.content}\n      </div>\n    </div>\n  )\n}',
  },
  {
    id: 4,
    name: "Underline Tabs",
    description: "Tabs with underline style",
    style: "bold" as const,
    code: 'import { useState } from "react"\n\nexport default function UnderlineTabs() {\n  const [activeTab, setActiveTab] = useState("tab1")\n  const tabs = [\n    { id: "tab1", label: "Active", content: "Active items" },\n    { id: "tab2", label: "Completed", content: "Completed items" },\n    { id: "tab3", label: "Archived", content: "Archived items" },\n  ]\n\n  return (\n    <div className="w-full max-w-2xl">\n      <div className="flex gap-8 border-b-2 border-border">\n        {tabs.map(tab => (\n          <button\n            key={tab.id}\n            onClick={() => setActiveTab(tab.id)}\n            className={`pb-3 font-semibold transition-all relative ${\n              activeTab === tab.id\n                ? "text-foreground"\n                : "text-muted-foreground hover:text-foreground"\n            }`}\n          >\n            {tab.label}\n            {activeTab === tab.id && (\n              <div className="absolute bottom-0 left-0 right-0 h-1 bg-primary rounded-t" />\n            )}\n          </button>\n        ))}\n      </div>\n      <div className="p-6">\n        <p className="text-foreground">{tabs.find(t => t.id === activeTab)?.content}</p>\n      </div>\n    </div>\n  )\n}',
  }
]

export function createTabsPanel(): ExtendedPanel {
  const variations: TemplateVariation[] = TABS_TEMPLATES.map((template) => ({
    id: `tabs-${template.style}-${template.id}`,
    name: template.name,
    description: template.description,
    style: template.style,
    code: template.code,
    metadata: createTemplateMetadata({
      complexity: 'simple',
      features: ['Tabs', 'Navigation', 'Icons', 'Responsive'],
      useCases: ['Content Organization', 'Navigation', 'Settings', 'Dashboards'],
      dependencies: [...COMMON_DEPENDENCIES.core, ...COMMON_DEPENDENCIES.icons],
      implementationNotes: ['Multiple layouts', 'Icon support', 'Smooth transitions', 'Accessible']
    })
  }))

  return {
    id: 'tabs',
    name: 'Tabs',
    description: 'Tab navigation components with various styles',
    category: 'content-display',
    variations,
    tags: ['tabs', 'navigation', 'content-display']
  }
}

export const TABS_PANEL_WITH_VARIATIONS = createTabsPanel()
