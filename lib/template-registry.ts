// Extended template system interfaces and registry
// Builds on existing Panel structure from template-sidebar.tsx

import type { LucideIcon } from "lucide-react"
import type * as React from "react"

// Extend the existing Panel interface to support template variations
export interface TemplateVariation {
  id: string
  name: string
  description: string
  style: 'minimal' | 'modern' | 'classic' | 'bold'
  code: string
  previewComponent?: React.ComponentType
  metadata: TemplateMetadata
}

export interface TemplateMetadata {
  createdDate: string
  version: string
  author: string
  complexity: 'simple' | 'moderate' | 'complex'
  responsive: boolean
  accessible: boolean
  darkModeSupport: boolean
  dependencies: string[]
  features: string[]
  useCases: string[]
  implementationNotes: string[]
}

// Extended Panel interface that includes template variations
export interface ExtendedPanel {
  id: string
  name: string
  description: string
  category: string
  subPanels?: string[] // Keep compatibility with existing structure
  variations: TemplateVariation[]
  tags: string[]
}

export interface TemplateCategory {
  id: string
  name: string
  description: string
  icon: LucideIcon
  panels: ExtendedPanel[]
  panelCount: number
}

export interface TemplateRegistry {
  categories: TemplateCategory[]
  totalPanels: number
  totalTemplates: number
  version: string
}

// Template generation utilities
export interface TemplateGenerator {
  generateTemplate(panel: ExtendedPanel, variation: TemplateVariation): GeneratedTemplate
  validateTemplate(template: GeneratedTemplate): ValidationResult
  optimizeTemplate(template: GeneratedTemplate): GeneratedTemplate
}

export interface GeneratedTemplate {
  component: React.ComponentType
  code: string
  styles: string
  dependencies: string[]
  props: Record<string, any>
  examples: CodeExample[]
}

export interface CodeExample {
  title: string
  description: string
  code: string
  preview: React.ComponentType
}

export interface ValidationResult {
  isValid: boolean
  errors: string[]
  warnings: string[]
  suggestions: string[]
}

// Helper function to convert existing Panel to ExtendedPanel
export function convertPanelToExtended(panel: { id: string; name: string; subPanels: string[] }): ExtendedPanel {
  return {
    id: panel.id,
    name: panel.name,
    description: `${panel.name} component templates`,
    category: panel.id,
    subPanels: panel.subPanels,
    variations: [], // Will be populated with actual template variations
    tags: [panel.id, 'component', 'template']
  }
}

// Template style definitions
export const TEMPLATE_STYLES = {
  minimal: {
    name: 'Minimal',
    description: 'Clean, simple design with minimal elements',
    characteristics: ['Clean lines', 'Minimal colors', 'Simple typography', 'Lots of whitespace']
  },
  modern: {
    name: 'Modern',
    description: 'Contemporary design with current trends',
    characteristics: ['Bold typography', 'Vibrant colors', 'Modern layouts', 'Interactive elements']
  },
  classic: {
    name: 'Classic',
    description: 'Traditional, timeless design approach',
    characteristics: ['Traditional layouts', 'Conservative colors', 'Standard typography', 'Familiar patterns']
  },
  bold: {
    name: 'Bold',
    description: 'Eye-catching design with strong visual impact',
    characteristics: ['Strong contrasts', 'Large elements', 'Dramatic colors', 'Attention-grabbing']
  }
} as const

// Common template dependencies
export const COMMON_DEPENDENCIES = {
  core: ['react', '@types/react', 'tailwindcss', 'clsx'],
  ui: ['@radix-ui/react-slot', 'class-variance-authority', 'tailwind-merge'],
  icons: ['lucide-react'],
  forms: ['react-hook-form', '@hookform/resolvers', 'zod'],
  animations: ['tailwindcss-animate'],
  navigation: ['@radix-ui/react-navigation-menu'],
  dialogs: ['@radix-ui/react-dialog'],
  dropdowns: ['@radix-ui/react-dropdown-menu'],
  tooltips: ['@radix-ui/react-tooltip']
} as const