// Search Form templates - Simple, Advanced, Autocomplete, Voice
// 4 variations

import type { ExtendedPanel, TemplateVariation } from './template-registry'
import { createTemplateMetadata } from './template-converter'
import { COMMON_DEPENDENCIES } from './template-registry'

const SEARCH_FORM_TEMPLATES = [
  {
    id: 1,
    name: "Simple Search Form",
    description: "Basic search input with submit button",
    style: "minimal" as const,
    code: 'import { useState } from "react"\nimport { Search } from "lucide-react"\n\nexport default function SimpleSearchForm() {\n  const [query, setQuery] = useState("")\n\n  const handleSubmit = (e: React.FormEvent) => {\n    e.preventDefault()\n    console.log("Search:", query)\n  }\n\n  return (\n    <form onSubmit={handleSubmit} className="w-full max-w-md">\n      <div className="flex gap-1 sm:gap-2">\n        <div className="relative flex-1">\n          <input\n            type="text"\n            value={query}\n            onChange={(e) => setQuery(e.target.value)}\n            placeholder="Search..."\n            className="w-full px-3 sm:px-4 py-2 sm:py-2.5 pl-9 sm:pl-10 rounded-lg border border-border bg-background text-xs sm:text-sm text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"\n          />\n          <Search className="absolute left-2.5 sm:left-3 top-2.5 sm:top-3 h-4 w-4 text-muted-foreground" />\n        </div>\n        <button\n          type="submit"\n          className="px-3 sm:px-4 py-2 sm:py-2.5 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors text-xs sm:text-sm font-medium"\n        >\n          Search\n        </button>\n      </div>\n    </form>\n  )\n}',
  },
  {
    id: 2,
    name: "Advanced Search Form",
    description: "Search with filters and advanced options",
    style: "modern" as const,
    code: 'import { useState } from "react"\nimport { Search, Filter } from "lucide-react"\n\nexport default function AdvancedSearchForm() {\n  const [query, setQuery] = useState("")\n  const [category, setCategory] = useState("all")\n  const [showFilters, setShowFilters] = useState(false)\n\n  const handleSubmit = (e: React.FormEvent) => {\n    e.preventDefault()\n    console.log("Search:", { query, category })\n  }\n\n  return (\n    <form onSubmit={handleSubmit} className="w-full max-w-2xl space-y-2 sm:space-y-3">\n      <div className="flex gap-1 sm:gap-2">\n        <div className="relative flex-1">\n          <input\n            type="text"\n            value={query}\n            onChange={(e) => setQuery(e.target.value)}\n            placeholder="Search..."\n            className="w-full px-3 sm:px-4 py-2 sm:py-2.5 pl-9 sm:pl-10 rounded-lg border border-border bg-background text-xs sm:text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary"\n          />\n          <Search className="absolute left-2.5 sm:left-3 top-2.5 sm:top-3 h-4 w-4 text-muted-foreground" />\n        </div>\n        <button\n          type="button"\n          onClick={() => setShowFilters(!showFilters)}\n          className="px-2 sm:px-3 py-2 sm:py-2.5 border border-border rounded-lg hover:bg-accent transition-colors"\n        >\n          <Filter className="h-4 w-4 text-foreground" />\n        </button>\n        <button\n          type="submit"\n          className="px-3 sm:px-4 py-2 sm:py-2.5 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors text-xs sm:text-sm font-medium"\n        >\n          Search\n        </button>\n      </div>\n\n      {showFilters && (\n        <div className="p-2 sm:p-3 border border-border rounded-lg bg-accent/50 space-y-2 sm:space-y-3">\n          <div>\n            <label className="block text-xs sm:text-sm font-medium text-foreground mb-1 sm:mb-2">\n              Category\n            </label>\n            <select\n              value={category}\n              onChange={(e) => setCategory(e.target.value)}\n              className="w-full px-2 sm:px-3 py-1.5 sm:py-2 rounded border border-border bg-background text-xs sm:text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary"\n            >\n              <option value="all">All Categories</option>\n              <option value="articles">Articles</option>\n              <option value="products">Products</option>\n              <option value="users">Users</option>\n            </select>\n          </div>\n        </div>\n      )}\n    </form>\n  )\n}',
  },
  {
    id: 3,
    name: "Autocomplete Search Form",
    description: "Search with autocomplete suggestions",
    style: "classic" as const,
    code: 'import { useState, useMemo } from "react"\nimport { Search, X } from "lucide-react"\n\nconst SUGGESTIONS = [\n  "React Components",\n  "React Hooks",\n  "React Router",\n  "React Query",\n  "React Testing",\n  "React Performance",\n]\n\nexport default function AutocompleteSearchForm() {\n  const [query, setQuery] = useState("")\n  const [isOpen, setIsOpen] = useState(false)\n\n  const filtered = useMemo(() => {\n    if (!query) return []\n    return SUGGESTIONS.filter(s => s.toLowerCase().includes(query.toLowerCase()))\n  }, [query])\n\n  const handleSelect = (suggestion: string) => {\n    setQuery(suggestion)\n    setIsOpen(false)\n  }\n\n  return (\n    <div className="w-full max-w-md relative">\n      <div className="relative">\n        <input\n          type="text"\n          value={query}\n          onChange={(e) => {\n            setQuery(e.target.value)\n            setIsOpen(true)\n          }}\n          onFocus={() => setIsOpen(true)}\n          placeholder="Search..."\n          className="w-full px-3 sm:px-4 py-2 sm:py-2.5 pl-9 sm:pl-10 rounded-lg border border-border bg-background text-xs sm:text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary"\n        />\n        <Search className="absolute left-2.5 sm:left-3 top-2.5 sm:top-3 h-4 w-4 text-muted-foreground" />\n        {query && (\n          <button\n            onClick={() => setQuery("")}\n            className="absolute right-2.5 sm:right-3 top-2.5 sm:top-3 p-0.5 hover:bg-accent rounded"\n          >\n            <X className="h-4 w-4 text-muted-foreground" />\n          </button>\n        )}\n      </div>\n\n      {isOpen && filtered.length > 0 && (\n        <div className="absolute top-full left-0 right-0 mt-1 bg-background border border-border rounded-lg shadow-lg z-50">\n          <ul className="py-1 sm:py-2">\n            {filtered.map((suggestion) => (\n              <li key={suggestion}>\n                <button\n                  onClick={() => handleSelect(suggestion)}\n                  className="w-full text-left px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm text-foreground hover:bg-accent transition-colors"\n                >\n                  {suggestion}\n                </button>\n              </li>\n            ))}\n          </ul>\n        </div>\n      )}\n    </div>\n  )\n}',
  },
  {
    id: 4,
    name: "Voice Search Form",
    description: "Search with voice input capability",
    style: "bold" as const,
    code: 'import { useState } from "react"\nimport { Search, Mic } from "lucide-react"\n\nexport default function VoiceSearchForm() {\n  const [query, setQuery] = useState("")\n  const [isListening, setIsListening] = useState(false)\n\n  const handleVoiceSearch = () => {\n    setIsListening(!isListening)\n    if (!isListening) {\n      console.log("Starting voice recognition...")\n      setTimeout(() => {\n        setQuery("Voice search result")\n        setIsListening(false)\n      }, 2000)\n    }\n  }\n\n  const handleSubmit = (e: React.FormEvent) => {\n    e.preventDefault()\n    console.log("Search:", query)\n  }\n\n  return (\n    <form onSubmit={handleSubmit} className="w-full max-w-md">\n      <div className="flex gap-1 sm:gap-2">\n        <div className="relative flex-1">\n          <input\n            type="text"\n            value={query}\n            onChange={(e) => setQuery(e.target.value)}\n            placeholder="Search or speak..."\n            className="w-full px-3 sm:px-4 py-2 sm:py-2.5 pl-9 sm:pl-10 rounded-lg border border-border bg-background text-xs sm:text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary"\n          />\n          <Search className="absolute left-2.5 sm:left-3 top-2.5 sm:top-3 h-4 w-4 text-muted-foreground" />\n        </div>\n        <button\n          type="button"\n          onClick={handleVoiceSearch}\n          className={`px-2 sm:px-3 py-2 sm:py-2.5 rounded-lg transition-colors ${\n            isListening\n              ? "bg-secondary text-secondary-foreground"\n              : "bg-accent text-accent-foreground hover:bg-accent/80"\n          }`}\n        >\n          <Mic className="h-4 w-4" />\n        </button>\n        <button\n          type="submit"\n          className="px-3 sm:px-4 py-2 sm:py-2.5 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors text-xs sm:text-sm font-medium"\n        >\n          Search\n        </button>\n      </div>\n    </form>\n  )\n}',
  }
]

export function createSearchFormPanel(): ExtendedPanel {
  const variations: TemplateVariation[] = SEARCH_FORM_TEMPLATES.map((template) => ({
    id: `search-form-${template.style}-${template.id}`,
    name: template.name,
    description: template.description,
    style: template.style,
    code: template.code,
    metadata: createTemplateMetadata({
      complexity: 'simple',
      features: ['Search Input', 'Form Handling', 'Responsive', 'Autocomplete'],
      useCases: ['Search Functionality', 'Data Discovery', 'User Input'],
      dependencies: [...COMMON_DEPENDENCIES.core, ...COMMON_DEPENDENCIES.icons],
      implementationNotes: ['Form submission handling', 'Search state management', 'Responsive design']
    })
  }))

  return {
    id: 'search-form',
    name: 'Search Form',
    description: 'Search form components with various features',
    category: 'forms-input',
    variations,
    tags: ['search', 'form', 'input', 'forms-input']
  }
}

export const SEARCH_FORM_PANEL_WITH_VARIATIONS = createSearchFormPanel()
