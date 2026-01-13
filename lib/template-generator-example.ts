// Example usage of the template generator with design system integration
// Demonstrates how the system generates consistent, theme-aware templates

import { templateGenerator } from './template-generator'
import type { ExtendedPanel, TemplateVariation } from './template-registry'

// Example: Generate a modern header template
const exampleHeaderPanel: ExtendedPanel = {
  id: 'header-panel',
  name: 'Header Panel',
  description: 'Website header with navigation and branding',
  category: 'navigation',
  variations: [],
  tags: ['header', 'navigation', 'branding', 'responsive']
}

const exampleModernVariation: TemplateVariation = {
  id: 'header-modern-1',
  name: 'Modern SaaS Header',
  description: 'Modern SaaS style header with left logo and action buttons',
  style: 'modern',
  code: '',
  metadata: {
    createdDate: '2026-01-07',
    version: '1.0.0',
    author: 'Template Generator',
    complexity: 'moderate',
    responsive: true,
    accessible: true,
    darkModeSupport: true,
    dependencies: ['react', '@types/react', 'tailwindcss', 'clsx'],
    features: ['Responsive Design', 'Dark Mode Support', 'Mobile Menu', 'Accessibility'],
    useCases: ['Website Header', 'App Navigation', 'Brand Display'],
    implementationNotes: [
      'Uses Tailwind CSS for styling',
      'Includes mobile hamburger menu',
      'Supports dark mode toggle',
      'Fully accessible with ARIA labels'
    ]
  }
}

// Generate the template
export function generateExampleTemplate() {
  console.log('🚀 Generating modern header template with design system integration...\n')
  
  const generatedTemplate = templateGenerator.generateTemplate(
    exampleHeaderPanel, 
    exampleModernVariation
  )
  
  console.log('📋 Generated Template Code:')
  console.log('=' .repeat(80))
  console.log(generatedTemplate.code)
  console.log('=' .repeat(80))
  
  console.log('\n📦 Dependencies:')
  generatedTemplate.dependencies.forEach(dep => {
    console.log(`  - ${dep}`)
  })
  
  console.log('\n🎨 Generated Styles:')
  console.log(generatedTemplate.styles)
  
  console.log('\n✅ Validation Results:')
  const validation = templateGenerator.validateTemplate(generatedTemplate)
  console.log(`  Valid: ${validation.isValid}`)
  console.log(`  Errors: ${validation.errors.length}`)
  console.log(`  Warnings: ${validation.warnings.length}`)
  console.log(`  Suggestions: ${validation.suggestions.length}`)
  
  if (validation.errors.length > 0) {
    console.log('\n❌ Errors:')
    validation.errors.forEach(error => console.log(`  - ${error}`))
  }
  
  if (validation.warnings.length > 0) {
    console.log('\n⚠️  Warnings:')
    validation.warnings.forEach(warning => console.log(`  - ${warning}`))
  }
  
  if (validation.suggestions.length > 0) {
    console.log('\n💡 Suggestions:')
    validation.suggestions.forEach(suggestion => console.log(`  - ${suggestion}`))
  }
  
  console.log('\n🎯 Template Features:')
  console.log('  ✓ Theme-aware CSS classes (bg-background, text-foreground)')
  console.log('  ✓ Responsive design with breakpoint classes')
  console.log('  ✓ Shadcn/ui component integration')
  console.log('  ✓ Dark mode support via CSS variables')
  console.log('  ✓ Consistent spacing and typography')
  console.log('  ✓ Accessibility-ready structure')
  
  return generatedTemplate
}

// Example: Generate templates for different styles
export function generateStyleComparison() {
  console.log('\n🎨 Generating style comparison...\n')
  
  const styles: Array<'minimal' | 'modern' | 'classic' | 'bold'> = ['minimal', 'modern', 'classic', 'bold']
  
  styles.forEach(style => {
    const variation: TemplateVariation = {
      ...exampleModernVariation,
      id: `header-${style}-1`,
      name: `${style.charAt(0).toUpperCase() + style.slice(1)} Header`,
      style
    }
    
    const template = templateGenerator.generateTemplate(exampleHeaderPanel, variation)
    
    console.log(`📱 ${variation.name}:`)
    console.log(`  Style: ${style}`)
    console.log(`  Classes: ${template.code.match(/className={cn\(\s*"([^"]+)"/)?.[1] || 'Not found'}`)
    console.log(`  Dependencies: ${template.dependencies.length} packages`)
    console.log('')
  })
}

// Example: Demonstrate form template generation
export function generateFormExample() {
  console.log('\n📝 Generating form template example...\n')
  
  const formPanel: ExtendedPanel = {
    id: 'contact-form',
    name: 'Contact Form',
    description: 'Contact form with validation',
    category: 'forms-input',
    variations: [],
    tags: ['form', 'contact', 'validation']
  }
  
  const formVariation: TemplateVariation = {
    id: 'contact-form-modern-1',
    name: 'Modern Contact Form',
    description: 'Modern style contact form with validation',
    style: 'modern',
    code: '',
    metadata: {
      createdDate: '2026-01-07',
      version: '1.0.0',
      author: 'Template Generator',
      complexity: 'moderate',
      responsive: true,
      accessible: true,
      darkModeSupport: true,
      dependencies: [],
      features: ['Form Validation', 'Responsive Design', 'Accessibility'],
      useCases: ['Contact Forms', 'Lead Generation', 'User Feedback'],
      implementationNotes: ['Uses React Hook Form', 'Zod validation', 'Accessible form structure']
    }
  }
  
  const template = templateGenerator.generateTemplate(formPanel, formVariation)
  
  console.log('📋 Generated Form Template:')
  console.log('=' .repeat(50))
  console.log(template.code.substring(0, 500) + '...')
  console.log('=' .repeat(50))
  
  console.log('\n📦 Form Dependencies:')
  template.dependencies.forEach(dep => {
    console.log(`  - ${dep}`)
  })
}

// Run examples if this file is executed directly
if (require.main === module) {
  generateExampleTemplate()
  generateStyleComparison()
  generateFormExample()
}