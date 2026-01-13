// Skip Links templates with 4 variations
// Basic, Enhanced, Keyboard, and Screen Reader variations
// Implements accessibility best practices

import type { ExtendedPanel, TemplateVariation } from './template-registry'
import { createTemplateMetadata } from './template-converter'
import { COMMON_DEPENDENCIES } from './template-registry'

// Skip Links template variations
const SKIP_LINKS_TEMPLATES = [
  {
    id: 1,
    name: "Basic Skip Links",
    description: "Simple skip to main content link",
    style: "minimal" as const,
    code: `export default function BasicSkipLinks() {
  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:absolute focus:top-2 sm:focus:top-3 md:focus:top-4 focus:left-2 sm:focus:left-3 md:focus:left-4 focus:z-50 focus:px-3 sm:focus:px-4 focus:py-2 focus:bg-primary focus:text-primary-foreground focus:rounded-lg focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
    >
      Skip to main content
    </a>
  )
}

// Usage: Place at the very beginning of your page
// <BasicSkipLinks />
// <header>...</header>
// <main id="main-content">...</main>`,
  },
  {
    id: 2,
    name: "Enhanced Skip Links",
    description: "Multiple skip links for different page sections",
    style: "modern" as const,
    code: `export default function EnhancedSkipLinks() {
  const skipLinks = [
    { id: 'main-content', label: 'Skip to main content' },
    { id: 'navigation', label: 'Skip to navigation' },
    { id: 'search', label: 'Skip to search' },
    { id: 'footer', label: 'Skip to footer' }
  ]

  return (
    <div className="sr-only focus-within:not-sr-only focus-within:fixed focus-within:top-0 focus-within:left-0 focus-within:right-0 focus-within:z-50 focus-within:bg-background focus-within:border-b focus-within:border-border focus-within:p-2 sm:focus-within:p-3 md:focus-within:p-4">
      <nav aria-label="Skip links" className="container mx-auto px-2 sm:px-4">
        <ul className="flex flex-wrap items-center gap-2 sm:gap-3 md:gap-4">
          {skipLinks.map((link) => (
            <li key={link.id}>
              <a
                href={\`#\${link.id}\`}
                className="px-2 sm:px-3 md:px-4 py-1.5 sm:py-2 bg-primary text-primary-foreground rounded-lg text-xs sm:text-sm font-medium hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 transition-colors"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  )
}

// Usage: Place at the very beginning of your page
// <EnhancedSkipLinks />
// <nav id="navigation">...</nav>
// <div id="search">...</div>
// <main id="main-content">...</main>
// <footer id="footer">...</footer>`,
  },
  {
    id: 3,
    name: "Keyboard Skip Links",
    description: "Skip links with keyboard shortcut hints",
    style: "classic" as const,
    code: `import { useEffect, useState } from 'react'

export default function KeyboardSkipLinks() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Show skip links on Tab key
      if (e.key === 'Tab') {
        setIsVisible(true)
      }
      // Hide on Escape
      if (e.key === 'Escape') {
        setIsVisible(false)
      }
    }

    const handleClick = () => {
      setIsVisible(false)
    }

    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('click', handleClick)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('click', handleClick)
    }
  }, [])

  const skipLinks = [
    { id: 'main-content', label: 'Main content', shortcut: '1' },
    { id: 'navigation', label: 'Navigation', shortcut: '2' },
    { id: 'search', label: 'Search', shortcut: '3' }
  ]

  return (
    <div
      className={\`fixed top-0 left-0 right-0 z-50 bg-background border-b border-border p-2 sm:p-3 md:p-4 transition-transform duration-200 \${
        isVisible ? 'translate-y-0' : '-translate-y-full'
      }\`}
      role="navigation"
      aria-label="Skip links"
    >
      <div className="container mx-auto px-2 sm:px-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-4">
          <ul className="flex flex-wrap items-center gap-2 sm:gap-3 md:gap-4">
            {skipLinks.map((link) => (
              <li key={link.id}>
                <a
                  href={\`#\${link.id}\`}
                  className="flex items-center gap-1 sm:gap-2 px-2 sm:px-3 md:px-4 py-1.5 sm:py-2 bg-accent rounded-lg text-xs sm:text-sm font-medium text-foreground hover:bg-accent/80 focus:outline-none focus:ring-2 focus:ring-ring transition-colors"
                  onClick={() => setIsVisible(false)}
                >
                  <span>{link.label}</span>
                  <kbd className="px-1 sm:px-1.5 py-0.5 bg-background border border-border rounded text-xs text-muted-foreground">
                    {link.shortcut}
                  </kbd>
                </a>
              </li>
            ))}
          </ul>
          <p className="text-xs sm:text-sm text-muted-foreground whitespace-nowrap">
            Press <kbd className="px-1 sm:px-1.5 py-0.5 bg-accent border border-border rounded text-xs">Tab</kbd> to navigate,{' '}
            <kbd className="px-1 sm:px-1.5 py-0.5 bg-accent border border-border rounded text-xs">Esc</kbd> to close
          </p>
        </div>
      </div>
    </div>
  )
}`,
  },
  {
    id: 4,
    name: "Screen Reader Skip Links",
    description: "Comprehensive skip links optimized for screen readers",
    style: "bold" as const,
    code: `export default function ScreenReaderSkipLinks() {
  const skipLinks = [
    { 
      id: 'main-content', 
      label: 'Skip to main content',
      description: 'Jump directly to the main content area'
    },
    { 
      id: 'primary-navigation', 
      label: 'Skip to primary navigation',
      description: 'Jump to the main navigation menu'
    },
    { 
      id: 'search-form', 
      label: 'Skip to search',
      description: 'Jump to the search form'
    },
    { 
      id: 'footer-navigation', 
      label: 'Skip to footer',
      description: 'Jump to the footer section'
    },
    { 
      id: 'accessibility-settings', 
      label: 'Skip to accessibility settings',
      description: 'Jump to accessibility options'
    }
  ]

  return (
    <nav 
      aria-label="Skip navigation links"
      className="sr-only focus-within:not-sr-only focus-within:fixed focus-within:top-0 focus-within:left-0 focus-within:right-0 focus-within:z-50"
    >
      <div className="bg-primary text-primary-foreground">
        <div className="container mx-auto px-2 sm:px-4 py-2 sm:py-3">
          <h2 className="sr-only">Quick navigation</h2>
          <ul className="flex flex-wrap items-center gap-1 sm:gap-2 md:gap-3" role="list">
            {skipLinks.map((link, index) => (
              <li key={link.id}>
                <a
                  href={\`#\${link.id}\`}
                  className="inline-flex items-center gap-1 sm:gap-2 px-2 sm:px-3 md:px-4 py-1.5 sm:py-2 bg-primary-foreground/10 rounded-lg text-xs sm:text-sm font-medium hover:bg-primary-foreground/20 focus:outline-none focus:ring-2 focus:ring-primary-foreground focus:ring-offset-2 focus:ring-offset-primary transition-colors"
                  aria-describedby={\`skip-link-desc-\${index}\`}
                >
                  <span className="flex items-center justify-center w-4 h-4 sm:w-5 sm:h-5 bg-primary-foreground/20 rounded text-xs font-bold">
                    {index + 1}
                  </span>
                  <span className="hidden sm:inline">{link.label}</span>
                  <span className="sm:hidden">{link.label.split(' ').pop()}</span>
                </a>
                <span id={\`skip-link-desc-\${index}\`} className="sr-only">
                  {link.description}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
      
      {/* Instructions for screen reader users */}
      <div className="bg-accent border-b border-border">
        <div className="container mx-auto px-2 sm:px-4 py-1.5 sm:py-2">
          <p className="text-xs sm:text-sm text-muted-foreground">
            <span className="font-medium text-foreground">Keyboard navigation:</span>{' '}
            Use Tab to move between links, Enter to activate, Escape to close this menu.
          </p>
        </div>
      </div>
    </nav>
  )
}

// Usage notes:
// 1. Place this component at the very beginning of your page body
// 2. Ensure all target IDs exist in your page structure
// 3. Test with screen readers (NVDA, VoiceOver, JAWS)
// 4. The links are hidden until focused via keyboard navigation`,
  }
]

// Convert to new template variation format
export function createSkipLinksPanelWithVariations(): ExtendedPanel {
  const variations: TemplateVariation[] = SKIP_LINKS_TEMPLATES.map((template) => ({
    id: `skip-links-${template.style}-${template.id}`,
    name: template.name,
    description: template.description,
    style: template.style,
    code: template.code,
    metadata: createTemplateMetadata({
      complexity: 'simple',
      features: ['Screen Reader Support', 'Keyboard Navigation', 'WCAG Compliant', 'Focus Management'],
      useCases: ['Accessibility', 'Keyboard Users', 'Screen Reader Users', 'WCAG Compliance'],
      dependencies: [...COMMON_DEPENDENCIES.core],
      implementationNotes: [
        'Essential for WCAG 2.1 compliance',
        'Hidden until focused via keyboard',
        'Supports screen readers',
        'Place at the beginning of page body',
        'Ensure target IDs exist in page structure'
      ]
    })
  }))

  return {
    id: 'skip-links',
    name: 'Skip Links',
    description: 'Accessibility skip links for keyboard and screen reader users',
    category: 'navigation',
    variations,
    tags: ['accessibility', 'skip-links', 'keyboard', 'screen-reader', 'wcag']
  }
}

// Export the skip links panel
export const SKIP_LINKS_PANEL_WITH_VARIATIONS = createSkipLinksPanelWithVariations()
