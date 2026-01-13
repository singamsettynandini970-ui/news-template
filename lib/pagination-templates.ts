// Pagination templates with 4 variations
// Numbers, Arrows, Load More, and Infinite Scroll variations
// Implements accessibility and responsive behavior

import type { ExtendedPanel, TemplateVariation } from './template-registry'
import { createTemplateMetadata } from './template-converter'
import { COMMON_DEPENDENCIES } from './template-registry'

// Pagination template variations
const PAGINATION_TEMPLATES = [
  {
    id: 1,
    name: "Numbers Pagination",
    description: "Classic numbered pagination with page buttons",
    style: "minimal" as const,
    code: `import { ChevronLeft, ChevronRight } from 'lucide-react'

interface PaginationProps {
  currentPage?: number
  totalPages?: number
  onPageChange?: (page: number) => void
}

export default function NumbersPagination({ 
  currentPage = 3, 
  totalPages = 10,
  onPageChange 
}: PaginationProps) {
  const getPageNumbers = () => {
    const pages: (number | string)[] = []
    const showEllipsisStart = currentPage > 3
    const showEllipsisEnd = currentPage < totalPages - 2

    if (totalPages <= 7) {
      return Array.from({ length: totalPages }, (_, i) => i + 1)
    }

    pages.push(1)
    
    if (showEllipsisStart) {
      pages.push('...')
    }

    const start = Math.max(2, currentPage - 1)
    const end = Math.min(totalPages - 1, currentPage + 1)

    for (let i = start; i <= end; i++) {
      if (!pages.includes(i)) pages.push(i)
    }

    if (showEllipsisEnd) {
      pages.push('...')
    }

    if (!pages.includes(totalPages)) {
      pages.push(totalPages)
    }

    return pages
  }

  return (
    <nav aria-label="Pagination" className="flex items-center justify-center gap-1">
      <button
        onClick={() => onPageChange?.(currentPage - 1)}
        disabled={currentPage === 1}
        className="p-2 rounded-lg hover:bg-accent disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        aria-label="Previous page"
      >
        <ChevronLeft className="h-5 w-5 text-foreground" />
      </button>

      {getPageNumbers().map((page, index) => (
        typeof page === 'number' ? (
          <button
            key={index}
            onClick={() => onPageChange?.(page)}
            className={\`min-w-[40px] h-10 px-3 rounded-lg text-sm font-medium transition-colors \${
              currentPage === page
                ? 'bg-primary text-primary-foreground'
                : 'text-foreground hover:bg-accent'
            }\`}
            aria-current={currentPage === page ? 'page' : undefined}
          >
            {page}
          </button>
        ) : (
          <span key={index} className="px-2 text-muted-foreground">
            {page}
          </span>
        )
      ))}

      <button
        onClick={() => onPageChange?.(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="p-2 rounded-lg hover:bg-accent disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        aria-label="Next page"
      >
        <ChevronRight className="h-5 w-5 text-foreground" />
      </button>
    </nav>
  )
}`,
  },
  {
    id: 2,
    name: "Arrows Pagination",
    description: "Simple previous/next arrow navigation",
    style: "modern" as const,
    code: `import { ArrowLeft, ArrowRight } from 'lucide-react'

interface ArrowsPaginationProps {
  currentPage?: number
  totalPages?: number
  onPageChange?: (page: number) => void
}

export default function ArrowsPagination({ 
  currentPage = 3, 
  totalPages = 10,
  onPageChange 
}: ArrowsPaginationProps) {
  return (
    <nav aria-label="Pagination" className="flex items-center justify-between gap-4">
      <button
        onClick={() => onPageChange?.(currentPage - 1)}
        disabled={currentPage === 1}
        className="flex items-center gap-2 px-4 py-2 bg-background border border-border rounded-lg hover:bg-accent disabled:opacity-50 disabled:cursor-not-allowed transition-colors group"
        aria-label="Previous page"
      >
        <ArrowLeft className="h-4 w-4 text-foreground group-hover:-translate-x-1 transition-transform" />
        <span className="text-sm font-medium text-foreground">Previous</span>
      </button>

      <div className="flex items-center gap-2">
        <span className="text-sm text-muted-foreground">Page</span>
        <span className="px-3 py-1 bg-accent rounded-lg text-sm font-medium text-foreground">
          {currentPage}
        </span>
        <span className="text-sm text-muted-foreground">of {totalPages}</span>
      </div>

      <button
        onClick={() => onPageChange?.(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors group"
        aria-label="Next page"
      >
        <span className="text-sm font-medium">Next</span>
        <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
      </button>
    </nav>
  )
}`,
  },
  {
    id: 3,
    name: "Load More Pagination",
    description: "Button-based load more pagination",
    style: "classic" as const,
    code: `import { useState } from 'react'
import { Loader2, ChevronDown } from 'lucide-react'

interface LoadMorePaginationProps {
  totalItems?: number
  loadedItems?: number
  itemsPerPage?: number
  onLoadMore?: () => void
}

export default function LoadMorePagination({ 
  totalItems = 100,
  loadedItems = 20,
  itemsPerPage = 10,
  onLoadMore 
}: LoadMorePaginationProps) {
  const [isLoading, setIsLoading] = useState(false)
  const hasMore = loadedItems < totalItems
  const progress = (loadedItems / totalItems) * 100

  const handleLoadMore = async () => {
    setIsLoading(true)
    // Simulate loading delay
    await new Promise(resolve => setTimeout(resolve, 1000))
    onLoadMore?.()
    setIsLoading(false)
  }

  return (
    <div className="flex flex-col items-center gap-4">
      {/* Progress Info */}
      <div className="text-center">
        <p className="text-sm text-muted-foreground">
          Showing <span className="font-medium text-foreground">{loadedItems}</span> of{' '}
          <span className="font-medium text-foreground">{totalItems}</span> items
        </p>
      </div>

      {/* Progress Bar */}
      <div className="w-full max-w-xs h-2 bg-accent rounded-full overflow-hidden">
        <div 
          className="h-full bg-primary rounded-full transition-all duration-300"
          style={{ width: \`\${progress}%\` }}
          role="progressbar"
          aria-valuenow={loadedItems}
          aria-valuemin={0}
          aria-valuemax={totalItems}
        />
      </div>

      {/* Load More Button */}
      {hasMore && (
        <button
          onClick={handleLoadMore}
          disabled={isLoading}
          className="flex items-center gap-2 px-6 py-3 bg-background border border-border rounded-lg hover:bg-accent disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {isLoading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              <span className="text-sm font-medium">Loading...</span>
            </>
          ) : (
            <>
              <span className="text-sm font-medium">Load More</span>
              <ChevronDown className="h-4 w-4" />
            </>
          )}
        </button>
      )}

      {/* All Loaded Message */}
      {!hasMore && (
        <p className="text-sm text-muted-foreground">
          You've reached the end! 🎉
        </p>
      )}
    </div>
  )
}`,
  },
  {
    id: 4,
    name: "Infinite Scroll Pagination",
    description: "Automatic infinite scroll with loading indicator",
    style: "bold" as const,
    code: `import { useState, useEffect, useRef } from 'react'
import { Loader2 } from 'lucide-react'

interface InfiniteScrollPaginationProps {
  totalItems?: number
  loadedItems?: number
  onLoadMore?: () => Promise<void>
}

export default function InfiniteScrollPagination({ 
  totalItems = 100,
  loadedItems = 20,
  onLoadMore 
}: InfiniteScrollPaginationProps) {
  const [isLoading, setIsLoading] = useState(false)
  const observerRef = useRef<HTMLDivElement>(null)
  const hasMore = loadedItems < totalItems

  useEffect(() => {
    const observer = new IntersectionObserver(
      async (entries) => {
        if (entries[0].isIntersecting && hasMore && !isLoading) {
          setIsLoading(true)
          await onLoadMore?.()
          setIsLoading(false)
        }
      },
      { threshold: 0.1 }
    )

    if (observerRef.current) {
      observer.observe(observerRef.current)
    }

    return () => observer.disconnect()
  }, [hasMore, isLoading, onLoadMore])

  return (
    <div className="flex flex-col items-center gap-6">
      {/* Status Bar */}
      <div className="w-full max-w-md">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-muted-foreground">
            {loadedItems} of {totalItems} loaded
          </span>
          <span className="text-sm font-medium text-foreground">
            {Math.round((loadedItems / totalItems) * 100)}%
          </span>
        </div>
        <div className="h-1.5 bg-accent rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-primary to-primary/60 rounded-full transition-all duration-500"
            style={{ width: \`\${(loadedItems / totalItems) * 100}%\` }}
          />
        </div>
      </div>

      {/* Loading Trigger / Indicator */}
      <div 
        ref={observerRef}
        className="flex flex-col items-center gap-3 py-8"
      >
        {isLoading && (
          <div className="flex items-center gap-3 px-6 py-3 bg-accent/50 rounded-xl">
            <Loader2 className="h-5 w-5 animate-spin text-primary" />
            <span className="text-sm font-medium text-foreground">Loading more items...</span>
          </div>
        )}

        {!hasMore && (
          <div className="text-center">
            <div className="inline-flex items-center gap-2 px-6 py-3 bg-accent/50 rounded-xl">
              <span className="text-2xl">✨</span>
              <span className="text-sm font-medium text-foreground">You've seen it all!</span>
            </div>
            <p className="mt-2 text-xs text-muted-foreground">
              {totalItems} items loaded
            </p>
          </div>
        )}

        {hasMore && !isLoading && (
          <p className="text-sm text-muted-foreground animate-pulse">
            Scroll down to load more...
          </p>
        )}
      </div>
    </div>
  )
}`,
  }
]

// Convert to new template variation format
export function createPaginationPanelWithVariations(): ExtendedPanel {
  const variations: TemplateVariation[] = PAGINATION_TEMPLATES.map((template) => ({
    id: `pagination-${template.style}-${template.id}`,
    name: template.name,
    description: template.description,
    style: template.style,
    code: template.code,
    metadata: createTemplateMetadata({
      complexity: 'moderate',
      features: ['Responsive Design', 'Accessibility', 'Loading States', 'Keyboard Navigation'],
      useCases: ['Content Lists', 'Search Results', 'Product Listings', 'Blog Posts'],
      dependencies: [...COMMON_DEPENDENCIES.core, ...COMMON_DEPENDENCIES.icons],
      implementationNotes: [
        'Uses Tailwind CSS for styling',
        'Includes proper ARIA labels',
        'Supports keyboard navigation',
        'Loading states for async operations',
        'Responsive design for all screen sizes'
      ]
    })
  }))

  return {
    id: 'pagination',
    name: 'Pagination',
    description: 'Navigation controls for paginated content',
    category: 'navigation',
    variations,
    tags: ['pagination', 'navigation', 'list', 'infinite-scroll', 'load-more']
  }
}

// Export the pagination panel
export const PAGINATION_PANEL_WITH_VARIATIONS = createPaginationPanelWithVariations()
