// Accordion templates - Simple, Nested, Icon, Animated
// 4 variations

import type { ExtendedPanel, TemplateVariation } from './template-registry'
import { createTemplateMetadata } from './template-converter'
import { COMMON_DEPENDENCIES } from './template-registry'

const ACCORDION_TEMPLATES = [
  {
    id: 1,
    name: "Simple Accordion",
    description: "Basic accordion component",
    style: "minimal" as const,
    code: 'import { useState } from "react"\nimport { ChevronDown } from "lucide-react"\n\nexport default function SimpleAccordion() {\n  const [openId, setOpenId] = useState<number | null>(null)\n  const items = [\n    { id: 1, title: "Section One", content: "Content for section one" },\n    { id: 2, title: "Section Two", content: "Content for section two" },\n    { id: 3, title: "Section Three", content: "Content for section three" },\n  ]\n\n  return (\n    <div className="w-full max-w-2xl space-y-2">\n      {items.map(item => (\n        <div key={item.id} className="border border-border rounded-lg">\n          <button\n            onClick={() => setOpenId(openId === item.id ? null : item.id)}\n            className="w-full flex items-center justify-between px-4 py-3 hover:bg-accent transition-colors"\n          >\n            <span className="font-medium text-foreground">{item.title}</span>\n            <ChevronDown\n              className={`h-5 w-5 text-muted-foreground transition-transform ${\n                openId === item.id ? "rotate-180" : ""\n              }`}\n            />\n          </button>\n          {openId === item.id && (\n            <div className="px-4 py-3 border-t border-border text-sm text-muted-foreground">\n              {item.content}\n            </div>\n          )}\n        </div>\n      ))}\n    </div>\n  )\n}',
  },
  {
    id: 2,
    name: "Nested Accordion",
    description: "Accordion with nested items",
    style: "modern" as const,
    code: 'import { useState } from "react"\nimport { ChevronRight } from "lucide-react"\n\nexport default function NestedAccordion() {\n  const [openId, setOpenId] = useState<string | null>(null)\n  const items = [\n    {\n      id: "1",\n      title: "Getting Started",\n      children: [\n        { id: "1-1", title: "Installation", content: "Install via npm" },\n        { id: "1-2", title: "Setup", content: "Configure your project" },\n      ],\n    },\n    {\n      id: "2",\n      title: "Advanced",\n      children: [\n        { id: "2-1", title: "Customization", content: "Customize components" },\n      ],\n    },\n  ]\n\n  return (\n    <div className="w-full max-w-2xl space-y-2">\n      {items.map(item => (\n        <div key={item.id}>\n          <button\n            onClick={() => setOpenId(openId === item.id ? null : item.id)}\n            className="w-full flex items-center gap-2 px-4 py-3 hover:bg-accent transition-colors"\n          >\n            <ChevronRight\n              className={`h-4 w-4 transition-transform ${\n                openId === item.id ? "rotate-90" : ""\n              }`}\n            />\n            <span className="font-medium text-foreground">{item.title}</span>\n          </button>\n          {openId === item.id && (\n            <div className="ml-6 space-y-1">\n              {item.children.map(child => (\n                <div key={child.id} className="p-3 border-l-2 border-border text-sm text-muted-foreground">\n                  <p className="font-medium text-foreground">{child.title}</p>\n                  <p>{child.content}</p>\n                </div>\n              ))}\n            </div>\n          )}\n        </div>\n      ))}\n    </div>\n  )\n}',
  },
  {
    id: 3,
    name: "Icon Accordion",
    description: "Accordion with icons",
    style: "classic" as const,
    code: 'import { useState } from "react"\nimport { HelpCircle, Settings, Info, AlertCircle } from "lucide-react"\n\nexport default function IconAccordion() {\n  const [openId, setOpenId] = useState<number | null>(null)\n  const items = [\n    { id: 1, icon: HelpCircle, title: "FAQ", content: "Frequently asked questions" },\n    { id: 2, icon: Settings, title: "Settings", content: "Configure your preferences" },\n    { id: 3, icon: Info, title: "Information", content: "Learn more about us" },\n    { id: 4, icon: AlertCircle, title: "Alerts", content: "Important notifications" },\n  ]\n\n  return (\n    <div className="w-full max-w-2xl space-y-2">\n      {items.map(item => {\n        const Icon = item.icon\n        return (\n          <div key={item.id} className="border border-border rounded-lg">\n            <button\n              onClick={() => setOpenId(openId === item.id ? null : item.id)}\n              className="w-full flex items-center gap-3 px-4 py-3 hover:bg-accent transition-colors"\n            >\n              <Icon className="h-5 w-5 text-primary" />\n              <span className="font-medium text-foreground flex-1 text-left">{item.title}</span>\n              <span className={`text-muted-foreground transition-transform ${\n                openId === item.id ? "rotate-180" : ""\n              }`}>▼</span>\n            </button>\n            {openId === item.id && (\n              <div className="px-4 py-3 border-t border-border text-sm text-muted-foreground">\n                {item.content}\n              </div>\n            )}\n          </div>\n        )\n      })}\n    </div>\n  )\n}',
  },
  {
    id: 4,
    name: "Animated Accordion",
    description: "Accordion with smooth animations",
    style: "bold" as const,
    code: 'import { useState } from "react"\nimport { Plus } from "lucide-react"\n\nexport default function AnimatedAccordion() {\n  const [openId, setOpenId] = useState<number | null>(null)\n  const items = [\n    { id: 1, title: "Feature One", content: "Smooth animations and transitions" },\n    { id: 2, title: "Feature Two", content: "Beautiful design with modern UI" },\n    { id: 3, title: "Feature Three", content: "Fully responsive and accessible" },\n  ]\n\n  return (\n    <div className="w-full max-w-2xl space-y-3">\n      {items.map(item => (\n        <div\n          key={item.id}\n          className="border border-border rounded-lg overflow-hidden transition-all duration-300"\n        >\n          <button\n            onClick={() => setOpenId(openId === item.id ? null : item.id)}\n            className={`w-full flex items-center justify-between px-4 py-4 transition-all ${\n              openId === item.id\n                ? "bg-primary text-primary-foreground"\n                : "hover:bg-accent text-foreground"\n            }`}\n          >\n            <span className="font-semibold">{item.title}</span>\n            <Plus\n              className={`h-5 w-5 transition-transform duration-300 ${\n                openId === item.id ? "rotate-45" : ""\n              }`}\n            />\n          </button>\n          {openId === item.id && (\n            <div className="px-4 py-4 bg-accent/50 text-foreground animate-in fade-in duration-300">\n              {item.content}\n            </div>\n          )}\n        </div>\n      ))}\n    </div>\n  )\n}',
  }
]

export function createAccordionPanel(): ExtendedPanel {
  const variations: TemplateVariation[] = ACCORDION_TEMPLATES.map((template) => ({
    id: `accordion-${template.style}-${template.id}`,
    name: template.name,
    description: template.description,
    style: template.style,
    code: template.code,
    metadata: createTemplateMetadata({
      complexity: 'simple',
      features: ['Accordion', 'Expandable Content', 'Animations', 'Icons'],
      useCases: ['FAQ', 'Documentation', 'Settings', 'Content Organization'],
      dependencies: [...COMMON_DEPENDENCIES.core, ...COMMON_DEPENDENCIES.icons],
      implementationNotes: ['Smooth animations', 'Nested support', 'Icon integration', 'Accessible']
    })
  }))

  return {
    id: 'accordion',
    name: 'Accordion',
    description: 'Accordion components with various styles',
    category: 'content-display',
    variations,
    tags: ['accordion', 'content-display', 'interactive']
  }
}

export const ACCORDION_PANEL_WITH_VARIATIONS = createAccordionPanel()
