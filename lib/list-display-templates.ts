// List Display templates - Simple, Grouped, Searchable, Paginated
// 4 variations

import type { ExtendedPanel, TemplateVariation } from './template-registry'
import { createTemplateMetadata } from './template-converter'
import { COMMON_DEPENDENCIES } from './template-registry'

const LIST_DISPLAY_TEMPLATES = [
  {
    id: 1,
    name: "Simple List",
    description: "Basic list display",
    style: "minimal" as const,
    code: 'export default function SimpleList() {\n  const items = [\n    { id: 1, title: "Item One", description: "First item" },\n    { id: 2, title: "Item Two", description: "Second item" },\n    { id: 3, title: "Item Three", description: "Third item" },\n  ]\n\n  return (\n    <div className="w-full max-w-2xl px-2 sm:px-4">\n      <ul className="space-y-2 sm:space-y-3">\n        {items.map(item => (\n          <li key={item.id} className="p-2 sm:p-3 md:p-4 border border-border rounded-lg hover:bg-accent transition-colors">\n            <h3 className="font-semibold text-foreground text-sm sm:text-base">{item.title}</h3>\n            <p className="text-xs sm:text-sm text-muted-foreground">{item.description}</p>\n          </li>\n        ))}\n      </ul>\n    </div>\n  )\n}',
  },
  {
    id: 2,
    name: "Grouped List",
    description: "List with grouped items",
    style: "modern" as const,
    code: 'export default function GroupedList() {\n  const groups = [\n    { category: "Active", items: [{ id: 1, name: "Task 1" }, { id: 2, name: "Task 2" }] },\n    { category: "Completed", items: [{ id: 3, name: "Task 3" }] },\n  ]\n\n  return (\n    <div className="w-full max-w-2xl space-y-4 sm:space-y-6 px-2 sm:px-4">\n      {groups.map(group => (\n        <div key={group.category}>\n          <h3 className="text-xs sm:text-sm font-semibold text-muted-foreground uppercase mb-2 sm:mb-3">\n            {group.category}\n          </h3>\n          <ul className="space-y-2 sm:space-y-3">\n            {group.items.map(item => (\n              <li key={item.id} className="p-2 sm:p-3 border border-border rounded-lg hover:bg-accent transition-colors">\n                <p className="text-foreground text-sm sm:text-base">{item.name}</p>\n              </li>\n            ))}\n          </ul>\n        </div>\n      ))}\n    </div>\n  )\n}',
  },
  {
    id: 3,
    name: "Searchable List",
    description: "List with search functionality",
    style: "classic" as const,
    code: 'import { useState, useMemo } from "react"\nimport { Search } from "lucide-react"\n\nexport default function SearchableList() {\n  const [query, setQuery] = useState("")\n  const items = ["Apple", "Banana", "Cherry", "Date", "Elderberry"]\n  \n  const filtered = useMemo(() => {\n    return items.filter(item => item.toLowerCase().includes(query.toLowerCase()))\n  }, [query])\n\n  return (\n    <div className="w-full max-w-2xl px-2 sm:px-4">\n      <div className="relative mb-3 sm:mb-4">\n        <input\n          type="text"\n          value={query}\n          onChange={(e) => setQuery(e.target.value)}\n          placeholder="Search items..."\n          className="w-full px-3 sm:px-4 py-2 pl-9 sm:pl-10 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary text-sm sm:text-base"\n        />\n        <Search className="absolute left-2.5 sm:left-3 top-2.5 h-4 w-4 text-muted-foreground" />\n      </div>\n      <ul className="space-y-2 sm:space-y-3">\n        {filtered.map(item => (\n          <li key={item} className="p-2 sm:p-3 border border-border rounded-lg hover:bg-accent transition-colors">\n            <p className="text-foreground text-sm sm:text-base">{item}</p>\n          </li>\n        ))}\n      </ul>\n    </div>\n  )\n}',
  },
  {
    id: 4,
    name: "Paginated List",
    description: "List with pagination",
    style: "bold" as const,
    code: 'import { useState } from "react"\nimport { ChevronLeft, ChevronRight } from "lucide-react"\n\nexport default function PaginatedList() {\n  const [page, setPage] = useState(1)\n  const itemsPerPage = 3\n  const items = Array.from({ length: 10 }, (_, i) => ({ id: i + 1, name: `Item ${i + 1}` }))\n  \n  const totalPages = Math.ceil(items.length / itemsPerPage)\n  const start = (page - 1) * itemsPerPage\n  const paginatedItems = items.slice(start, start + itemsPerPage)\n\n  return (\n    <div className="w-full max-w-2xl px-2 sm:px-4">\n      <ul className="space-y-2 sm:space-y-3 mb-3 sm:mb-4">\n        {paginatedItems.map(item => (\n          <li key={item.id} className="p-2 sm:p-3 border border-border rounded-lg hover:bg-accent transition-colors">\n            <p className="text-foreground text-sm sm:text-base">{item.name}</p>\n          </li>\n        ))}\n      </ul>\n      \n      <div className="flex flex-col sm:flex-row items-center justify-between gap-2 sm:gap-4">\n        <button\n          onClick={() => setPage(p => Math.max(1, p - 1))}\n          disabled={page === 1}\n          className="flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-1.5 sm:py-2 border border-border rounded-lg hover:bg-accent disabled:opacity-50 transition-colors text-sm sm:text-base"\n        >\n          <ChevronLeft className="h-4 w-4" />\n          <span className="hidden sm:inline">Previous</span>\n          <span className="sm:hidden">Prev</span>\n        </button>\n        <span className="text-xs sm:text-sm text-muted-foreground whitespace-nowrap">\n          Page {page} of {totalPages}\n        </span>\n        <button\n          onClick={() => setPage(p => Math.min(totalPages, p + 1))}\n          disabled={page === totalPages}\n          className="flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-1.5 sm:py-2 border border-border rounded-lg hover:bg-accent disabled:opacity-50 transition-colors text-sm sm:text-base"\n        >\n          <span className="hidden sm:inline">Next</span>\n          <span className="sm:hidden">Next</span>\n          <ChevronRight className="h-4 w-4" />\n        </button>\n      </div>\n    </div>\n  )\n}',
  }
]

export function createListDisplayPanel(): ExtendedPanel {
  const variations: TemplateVariation[] = LIST_DISPLAY_TEMPLATES.map((template) => ({
    id: `list-display-${template.style}-${template.id}`,
    name: template.name,
    description: template.description,
    style: template.style,
    code: template.code,
    metadata: createTemplateMetadata({
      complexity: 'simple',
      features: ['List Display', 'Responsive Design', 'Search', 'Pagination'],
      useCases: ['Content Lists', 'Item Display', 'Data Presentation'],
      dependencies: [...COMMON_DEPENDENCIES.core, ...COMMON_DEPENDENCIES.icons],
      implementationNotes: ['Flexible layout', 'Search support', 'Pagination ready', 'Accessible']
    })
  }))

  return {
    id: 'list-display',
    name: 'List Display',
    description: 'List display components with various layouts',
    category: 'content-display',
    variations,
    tags: ['list', 'content-display', 'layout']
  }
}

export const LIST_DISPLAY_PANEL_WITH_VARIATIONS = createListDisplayPanel()
