// Utility to convert existing header templates to new extended format
import type { TemplateVariation, TemplateMetadata, ExtendedPanel } from './template-registry'
import { COMMON_DEPENDENCIES } from './template-registry'

// Convert existing headerTemplates to new format
export function convertHeaderTemplates(headerTemplates: any[]): ExtendedPanel {
  const variations: TemplateVariation[] = headerTemplates.map((template, index) => {
    // Map existing templates to style categories
    const styleMap = ['classic', 'modern', 'bold', 'minimal', 'modern'] as const
    const style = styleMap[index] || 'modern'
    
    const metadata: TemplateMetadata = {
      createdDate: '2026-01-07',
      version: '1.0.0',
      author: 'Template Generator',
      complexity: 'moderate',
      responsive: true,
      accessible: true,
      darkModeSupport: true,
      dependencies: [...COMMON_DEPENDENCIES.core, ...COMMON_DEPENDENCIES.icons],
      features: ['Responsive Design', 'Dark Mode Support', 'Mobile Menu', 'Accessibility'],
      useCases: ['Website Header', 'App Navigation', 'Brand Display'],
      implementationNotes: [
        'Uses Tailwind CSS for styling',
        'Includes mobile hamburger menu',
        'Supports dark mode toggle',
        'Fully accessible with ARIA labels'
      ]
    }

    return {
      id: `header-${style}-${template.id}`,
      name: template.name,
      description: template.description,
      style: style as 'minimal' | 'modern' | 'classic' | 'bold',
      code: template.code,
      metadata
    }
  })

  // Add a 4th variation if we only have 5 (to make it exactly 4)
  if (variations.length === 5) {
    // Remove the duplicate and keep 4 distinct styles
    const finalVariations = [
      variations[0], // Classic
      variations[1], // Modern  
      variations[2], // Bold (E-commerce)
      variations[3]  // Minimal
    ]
    variations.splice(0, variations.length, ...finalVariations)
  }

  return {
    id: 'header-panel',
    name: 'Header Panel',
    description: 'Website header with navigation and branding',
    category: 'navigation',
    variations,
    tags: ['header', 'navigation', 'branding', 'responsive']
  }
}

// Helper to create template metadata
export function createTemplateMetadata(overrides: Partial<TemplateMetadata> = {}): TemplateMetadata {
  return {
    createdDate: '2026-01-07',
    version: '1.0.0',
    author: 'Template Generator',
    complexity: 'moderate',
    responsive: true,
    accessible: true,
    darkModeSupport: true,
    dependencies: [...COMMON_DEPENDENCIES.core],
    features: [],
    useCases: [],
    implementationNotes: [],
    ...overrides
  }
}

// Helper to generate template variation ID
export function generateVariationId(panelId: string, style: string, index: number): string {
  return `${panelId}-${style}-${index + 1}`
}

// Helper to create a basic template variation
export function createTemplateVariation(
  panelId: string,
  name: string,
  description: string,
  style: 'minimal' | 'modern' | 'classic' | 'bold',
  code: string,
  index: number,
  metadataOverrides: Partial<TemplateMetadata> = {}
): TemplateVariation {
  return {
    id: generateVariationId(panelId, style, index),
    name,
    description,
    style,
    code,
    metadata: createTemplateMetadata(metadataOverrides)
  }
}