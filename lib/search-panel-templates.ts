// Search Panel templates with 4 variations
// Simple, Advanced, Autocomplete, and Voice search variations
// Implements search functionality with proper form handling

import type { ExtendedPanel, TemplateVariation } from './template-registry'
import { createTemplateMetadata } from './template-converter'
import { COMMON_DEPENDENCIES } from './template-registry'

// Search Panel template variations
const SEARCH_PANEL_TEMPLATES = [
  {
    id: 1,
    name: "Simple Search",
    description: "Basic search input with submit button",
    style: "minimal" as const,
    code: `import { useState } from 'react'
import { Search, X } from 'lucide-react'

export default function SimpleSearch() {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(false)

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!query.trim()) return

    setIsLoading(true)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500))
    setResults([
      \`Result for "\${query}" 1\`,
      \`Result for "\${query}" 2\`,
      \`Result for "\${query}" 3\`,
    ])
    setIsLoading(false)
  }

  const handleClear = () => {
    setQuery('')
    setResults([])
  }

  return (
    <div className="w-full max-w-md mx-auto px-2 sm:px-3 md:px-4 py-2 sm:py-3 md:py-4">
      <form onSubmit={handleSearch} className="space-y-2 sm:space-y-3 md:space-y-4">
        <div className="relative">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search..."
            className="w-full px-2 sm:px-3 md:px-4 py-1.5 sm:py-2 md:py-2.5 pl-8 sm:pl-9 md:pl-10 rounded-md sm:rounded-lg text-xs sm:text-sm md:text-base border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <Search className="absolute left-2 sm:left-3 md:left-3 top-1.5 sm:top-2 md:top-2.5 h-4 sm:h-4 md:h-5 w-4 sm:w-4 md:w-5 text-muted-foreground" />
          {query && (
            <button
              type="button"
              onClick={handleClear}
              className="absolute right-2 sm:right-3 md:right-3 top-1.5 sm:top-2 md:top-2.5 p-0.5 sm:p-1 hover:bg-accent rounded transition-colors"
            >
              <X className="h-3 sm:h-3.5 md:h-4 w-3 sm:w-3.5 md:w-4 text-muted-foreground" />
            </button>
          )}
        </div>
        <button
          type="submit"
          disabled={isLoading}
          className="w-full px-2 sm:px-3 md:px-4 py-1.5 sm:py-2 md:py-2.5 text-xs sm:text-sm md:text-base bg-primary text-primary-foreground rounded-md sm:rounded-lg hover:bg-primary/90 disabled:opacity-50 transition-colors font-medium"
        >
          {isLoading ? 'Searching...' : 'Search'}
        </button>
      </form>

      {results.length > 0 && (
        <div className="mt-4 sm:mt-5 md:mt-6 space-y-1 sm:space-y-1.5 md:space-y-2">
          <h3 className="text-xs sm:text-sm md:text-base font-semibold text-foreground">Results</h3>
          <ul className="space-y-0.5 sm:space-y-1 md:space-y-1">
            {results.map((result, index) => (
              <li
                key={index}
                className="px-2 sm:px-2.5 md:px-3 py-1.5 sm:py-1.5 md:py-2 rounded-md sm:rounded-lg text-xs sm:text-sm md:text-base bg-accent hover:bg-accent/80 cursor-pointer transition-colors text-foreground"
              >
                {result}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}`,
  },
  {
    id: 2,
    name: "Advanced Search",
    description: "Search with filters and advanced options",
    style: "modern" as const,
    code: `import { useState } from 'react'
import { Search, Filter, X } from 'lucide-react'

export default function AdvancedSearch() {
  const [query, setQuery] = useState('')
  const [filters, setFilters] = useState({
    category: 'all',
    dateRange: 'any',
    sortBy: 'relevance',
  })
  const [showFilters, setShowFilters] = useState(false)

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Search:', { query, filters })
  }

  return (
    <div className="w-full max-w-2xl mx-auto px-2 sm:px-3 md:px-4 py-2 sm:py-3 md:py-4 space-y-2 sm:space-y-3 md:space-y-4">
      <form onSubmit={handleSearch} className="space-y-2 sm:space-y-3 md:space-y-4">
        <div className="flex flex-col sm:flex-row gap-1 sm:gap-2 md:gap-2">
          <div className="flex-1 relative">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search with advanced options..."
              className="w-full px-2 sm:px-3 md:px-4 py-1.5 sm:py-2 md:py-2.5 pl-8 sm:pl-9 md:pl-10 rounded-md sm:rounded-lg text-xs sm:text-sm md:text-base border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <Search className="absolute left-2 sm:left-3 md:left-3 top-1.5 sm:top-2 md:top-2.5 h-4 sm:h-4 md:h-5 w-4 sm:w-4 md:w-5 text-muted-foreground" />
          </div>
          <button
            type="button"
            onClick={() => setShowFilters(!showFilters)}
            className="px-2 sm:px-3 md:px-4 py-1.5 sm:py-2 md:py-2.5 text-xs sm:text-sm md:text-base border border-border rounded-md sm:rounded-lg hover:bg-accent transition-colors flex items-center justify-center sm:justify-start gap-1 sm:gap-2 text-foreground font-medium"
          >
            <Filter className="h-3 sm:h-3.5 md:h-4 w-3 sm:w-3.5 md:w-4" />
            <span className="hidden sm:inline">Filters</span>
          </button>
          <button
            type="submit"
            className="px-3 sm:px-4 md:px-6 py-1.5 sm:py-2 md:py-2.5 text-xs sm:text-sm md:text-base bg-primary text-primary-foreground rounded-md sm:rounded-lg hover:bg-primary/90 transition-colors font-medium"
          >
            Search
          </button>
        </div>

        {showFilters && (
          <div className="p-2 sm:p-3 md:p-4 bg-accent/50 rounded-md sm:rounded-lg space-y-2 sm:space-y-3 md:space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 sm:gap-3 md:gap-4">
              <div>
                <label className="block text-xs sm:text-sm md:text-base font-medium text-foreground mb-1 sm:mb-1.5 md:mb-2">Category</label>
                <select
                  value={filters.category}
                  onChange={(e) => setFilters({ ...filters, category: e.target.value })}
                  className="w-full px-2 sm:px-2.5 md:px-3 py-1 sm:py-1.5 md:py-2 text-xs sm:text-sm md:text-base rounded-md sm:rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="all">All Categories</option>
                  <option value="articles">Articles</option>
                  <option value="images">Images</option>
                  <option value="videos">Videos</option>
                </select>
              </div>
              <div>
                <label className="block text-xs sm:text-sm md:text-base font-medium text-foreground mb-1 sm:mb-1.5 md:mb-2">Date Range</label>
                <select
                  value={filters.dateRange}
                  onChange={(e) => setFilters({ ...filters, dateRange: e.target.value })}
                  className="w-full px-2 sm:px-2.5 md:px-3 py-1 sm:py-1.5 md:py-2 text-xs sm:text-sm md:text-base rounded-md sm:rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="any">Any Time</option>
                  <option value="week">Past Week</option>
                  <option value="month">Past Month</option>
                  <option value="year">Past Year</option>
                </select>
              </div>
              <div>
                <label className="block text-xs sm:text-sm md:text-base font-medium text-foreground mb-1 sm:mb-1.5 md:mb-2">Sort By</label>
                <select
                  value={filters.sortBy}
                  onChange={(e) => setFilters({ ...filters, sortBy: e.target.value })}
                  className="w-full px-2 sm:px-2.5 md:px-3 py-1 sm:py-1.5 md:py-2 text-xs sm:text-sm md:text-base rounded-md sm:rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="relevance">Relevance</option>
                  <option value="date">Date</option>
                  <option value="popularity">Popularity</option>
                </select>
              </div>
            </div>
          </div>
        )}
      </form>
    </div>
  )
}`,
  },
  {
    id: 3,
    name: "Autocomplete Search",
    description: "Search with autocomplete suggestions",
    style: "classic" as const,
    code: `import { useState, useMemo } from 'react'
import { Search, X } from 'lucide-react'

const SUGGESTIONS = [
  'React Components',
  'React Hooks',
  'React Router',
  'React Query',
  'React Testing',
  'Responsive Design',
  'REST API',
  'Real-time Updates',
]

export default function AutocompleteSearch() {
  const [query, setQuery] = useState('')
  const [isOpen, setIsOpen] = useState(false)

  const suggestions = useMemo(() => {
    if (!query.trim()) return []
    return SUGGESTIONS.filter(s =>
      s.toLowerCase().includes(query.toLowerCase())
    )
  }, [query])

  const handleSelect = (suggestion: string) => {
    setQuery(suggestion)
    setIsOpen(false)
  }

  return (
    <div className="w-full max-w-md mx-auto px-2 sm:px-3 md:px-4 py-2 sm:py-3 md:py-4">
      <div className="relative">
        <div className="relative">
          <input
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value)
              setIsOpen(true)
            }}
            onFocus={() => setIsOpen(true)}
            placeholder="Search suggestions..."
            className="w-full px-2 sm:px-3 md:px-4 py-1.5 sm:py-2 md:py-2.5 pl-8 sm:pl-9 md:pl-10 rounded-md sm:rounded-lg text-xs sm:text-sm md:text-base border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <Search className="absolute left-2 sm:left-3 md:left-3 top-1.5 sm:top-2 md:top-2.5 h-4 sm:h-4 md:h-5 w-4 sm:w-4 md:w-5 text-muted-foreground" />
          {query && (
            <button
              onClick={() => {
                setQuery('')
                setIsOpen(false)
              }}
              className="absolute right-2 sm:right-3 md:right-3 top-1.5 sm:top-2 md:top-2.5 p-0.5 sm:p-1 hover:bg-accent rounded transition-colors"
            >
              <X className="h-3 sm:h-3.5 md:h-4 w-3 sm:w-3.5 md:w-4 text-muted-foreground" />
            </button>
          )}
        </div>

        {isOpen && suggestions.length > 0 && (
          <div className="absolute top-full left-0 right-0 mt-1 bg-background border border-border rounded-md sm:rounded-lg shadow-lg z-50">
            <ul className="py-0.5 sm:py-1">
              {suggestions.map((suggestion, index) => (
                <li key={index}>
                  <button
                    onClick={() => handleSelect(suggestion)}
                    className="w-full text-left px-2 sm:px-3 md:px-4 py-1.5 sm:py-2 md:py-2 hover:bg-accent transition-colors text-foreground text-xs sm:text-sm md:text-base"
                  >
                    <Search className="inline h-3 sm:h-3.5 md:h-4 w-3 sm:w-3.5 md:w-4 mr-1 sm:mr-2 text-muted-foreground" />
                    {suggestion}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  )
}`,
  },
  {
    id: 4,
    name: "Voice Search",
    description: "Search with voice input capability",
    style: "bold" as const,
    code: `import { useState } from 'react'
import { Search, Mic, X } from 'lucide-react'

export default function VoiceSearch() {
  const [query, setQuery] = useState('')
  const [isListening, setIsListening] = useState(false)
  const [results, setResults] = useState<string[]>([])

  const handleVoiceSearch = () => {
    setIsListening(true)
    // Simulate voice recognition
    setTimeout(() => {
      setQuery('voice search example')
      setIsListening(false)
    }, 2000)
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (!query.trim()) return
    setResults([
      \`Voice result for "\${query}" 1\`,
      \`Voice result for "\${query}" 2\`,
    ])
  }

  return (
    <div className="w-full max-w-md mx-auto px-2 sm:px-3 md:px-4 py-2 sm:py-3 md:py-4 space-y-2 sm:space-y-3 md:space-y-4">
      <form onSubmit={handleSearch} className="space-y-2 sm:space-y-3 md:space-y-4">
        <div className="flex flex-col sm:flex-row gap-1 sm:gap-2 md:gap-2">
          <div className="flex-1 relative">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search or use voice..."
              className="w-full px-2 sm:px-3 md:px-4 py-1.5 sm:py-2 md:py-2.5 pl-8 sm:pl-9 md:pl-10 rounded-md sm:rounded-lg text-xs sm:text-sm md:text-base border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <Search className="absolute left-2 sm:left-3 md:left-3 top-1.5 sm:top-2 md:top-2.5 h-4 sm:h-4 md:h-5 w-4 sm:w-4 md:w-5 text-muted-foreground" />
            {query && (
              <button
                type="button"
                onClick={() => setQuery('')}
                className="absolute right-2 sm:right-3 md:right-3 top-1.5 sm:top-2 md:top-2.5 p-0.5 sm:p-1 hover:bg-accent rounded transition-colors"
              >
                <X className="h-3 sm:h-3.5 md:h-4 w-3 sm:w-3.5 md:w-4 text-muted-foreground" />
              </button>
            )}
          </div>
          <button
            type="button"
            onClick={handleVoiceSearch}
            disabled={isListening}
            className={\`px-2 sm:px-3 md:px-4 py-1.5 sm:py-2 md:py-2.5 text-xs sm:text-sm md:text-base rounded-md sm:rounded-lg transition-colors font-medium flex items-center justify-center sm:justify-start gap-1 sm:gap-2 \${
              isListening
                ? 'bg-destructive text-destructive-foreground animate-pulse'
                : 'bg-primary text-primary-foreground hover:bg-primary/90'
            }\`}
          >
            <Mic className="h-3 sm:h-3.5 md:h-4 w-3 sm:w-3.5 md:w-4" />
            <span className="hidden sm:inline">{isListening ? 'Listening...' : 'Voice'}</span>
          </button>
        </div>
        <button
          type="submit"
          className="w-full px-2 sm:px-3 md:px-4 py-1.5 sm:py-2 md:py-2.5 text-xs sm:text-sm md:text-base bg-primary text-primary-foreground rounded-md sm:rounded-lg hover:bg-primary/90 transition-colors font-medium"
        >
          Search
        </button>
      </form>

      {results.length > 0 && (
        <div className="space-y-1 sm:space-y-1.5 md:space-y-2">
          <h3 className="text-xs sm:text-sm md:text-base font-semibold text-foreground">Voice Search Results</h3>
          <ul className="space-y-0.5 sm:space-y-1 md:space-y-1">
            {results.map((result, index) => (
              <li
                key={index}
                className="px-2 sm:px-2.5 md:px-3 py-1.5 sm:py-1.5 md:py-2 rounded-md sm:rounded-lg text-xs sm:text-sm md:text-base bg-accent hover:bg-accent/80 cursor-pointer transition-colors text-foreground"
              >
                {result}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}`,
  },
]

// Convert to new template variation format
export function createSearchPanelWithVariations(): ExtendedPanel {
  const variations: TemplateVariation[] = SEARCH_PANEL_TEMPLATES.map((template) => ({
    id: `search-panel-${template.style}-${template.id}`,
    name: template.name,
    description: template.description,
    style: template.style,
    code: template.code,
    metadata: createTemplateMetadata({
      complexity: 'moderate',
      features: ['Search Functionality', 'Form Handling', 'Loading States', 'Result Display'],
      useCases: ['Site Search', 'Product Search', 'Content Discovery', 'Data Filtering'],
      dependencies: [...COMMON_DEPENDENCIES.core, ...COMMON_DEPENDENCIES.icons],
      implementationNotes: [
        'Uses React hooks for state management',
        'Includes loading and empty states',
        'Supports keyboard navigation',
        'Responsive design for all screen sizes',
        'Accessible form inputs with proper labels'
      ]
    })
  }))

  return {
    id: 'search-panel',
    name: 'Search Panel',
    description: 'Search interfaces with various input methods and result displays',
    category: 'user-interface',
    variations,
    tags: ['search', 'form', 'input', 'user-interface', 'interactive']
  }
}

// Export the search panel
export const SEARCH_PANEL_WITH_VARIATIONS = createSearchPanelWithVariations()
