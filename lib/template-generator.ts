// Template code generation system
// Implements generateTemplate method for creating React/TypeScript components
// Includes validation for generated code syntax and TypeScript compliance
// Manages proper import statements and dependency management

import type { 
  ExtendedPanel, 
  TemplateVariation, 
  GeneratedTemplate, 
  ValidationResult,
  TemplateMetadata,
  CodeExample 
} from './template-registry'
import { COMMON_DEPENDENCIES, TEMPLATE_STYLES } from './template-registry'
import { 
  themeManager, 
  shadcnIntegration, 
  styleUtilities,
  type DesignSystemConfig 
} from './design-system'

/**
 * Core template generator class that creates React/TypeScript components
 * with proper validation and dependency management
 * Integrates with design system for consistent styling and theming
 */
export class TemplateGenerator {
  private readonly baseImports = [
    'import React from "react"',
    'import { cn } from "@/lib/utils"'
  ]
  
  private designSystem: DesignSystemConfig

  constructor(designSystem?: DesignSystemConfig) {
    this.designSystem = designSystem || themeManager['designSystem']
  }

  /**
   * Generate a complete template with component code, validation, and metadata
   */
  generateTemplate(panel: ExtendedPanel, variation: TemplateVariation): GeneratedTemplate {
    const componentName = this.generateComponentName(panel.name, variation.style)
    const code = this.generateComponentCode(panel, variation, componentName)
    const dependencies = this.extractDependencies(panel, variation)
    const props = this.generateProps(panel, variation)
    const examples = this.generateCodeExamples(panel, variation, componentName)

    return {
      component: this.createReactComponent(code, componentName),
      code,
      styles: this.generateStyles(variation),
      dependencies,
      props,
      examples
    }
  }

  /**
   * Validate generated template for syntax errors and TypeScript compliance
   */
  validateTemplate(template: GeneratedTemplate): ValidationResult {
    const errors: string[] = []
    const warnings: string[] = []
    const suggestions: string[] = []

    // Validate TypeScript syntax
    const syntaxValidation = this.validateTypeScriptSyntax(template.code)
    if (!syntaxValidation.isValid) {
      errors.push(...syntaxValidation.errors)
    }

    // Validate React component structure
    const componentValidation = this.validateReactComponent(template.code)
    if (!componentValidation.isValid) {
      errors.push(...componentValidation.errors)
    }

    // Validate imports and dependencies
    const dependencyValidation = this.validateDependencies(template.code, template.dependencies)
    warnings.push(...dependencyValidation.warnings)
    suggestions.push(...dependencyValidation.suggestions)

    // Validate accessibility
    const accessibilityValidation = this.validateAccessibility(template.code)
    warnings.push(...accessibilityValidation.warnings)
    suggestions.push(...accessibilityValidation.suggestions)

    return {
      isValid: errors.length === 0,
      errors,
      warnings,
      suggestions
    }
  }

  /**
   * Optimize generated template for performance and best practices
   */
  optimizeTemplate(template: GeneratedTemplate): GeneratedTemplate {
    const optimizedCode = this.optimizeCode(template.code)
    const optimizedDependencies = this.optimizeDependencies(template.dependencies)

    return {
      ...template,
      code: optimizedCode,
      dependencies: optimizedDependencies
    }
  }

  /**
   * Generate component name from panel name and style
   */
  private generateComponentName(panelName: string, style: string): string {
    const baseName = panelName
      .replace(/[^a-zA-Z0-9]/g, '')
      .replace(/^\w/, c => c.toUpperCase())
    
    const styleName = style.charAt(0).toUpperCase() + style.slice(1)
    return `${styleName}${baseName}`
  }

  /**
   * Generate complete React component code
   */
  private generateComponentCode(
    panel: ExtendedPanel, 
    variation: TemplateVariation, 
    componentName: string
  ): string {
    const imports = this.generateImports(panel, variation)
    const interfaceDefinition = this.generateInterface(panel, variation, componentName)
    const componentBody = this.generateComponentBody(panel, variation, componentName)

    return `${imports}

${interfaceDefinition}

${componentBody}`
  }

  /**
   * Generate import statements based on panel requirements
   */
  private generateImports(panel: ExtendedPanel, variation: TemplateVariation): string {
    const imports = [...this.baseImports]
    
    // Add icon imports based on panel category
    const iconImports = this.getRequiredIcons(panel, variation)
    if (iconImports.length > 0) {
      imports.push(`import { ${iconImports.join(', ')} } from "lucide-react"`)
    }

    // Add shadcn/ui component imports
    const requiredComponents = shadcnIntegration.getRequiredComponents(panel.category)
    const componentImports = shadcnIntegration.generateComponentImports(requiredComponents)
    imports.push(...componentImports)

    return imports.join('\n')
  }

  /**
   * Generate TypeScript interface for component props
   */
  private generateInterface(panel: ExtendedPanel, variation: TemplateVariation, componentName: string): string {
    const props = this.generateProps(panel, variation)
    const propDefinitions = Object.entries(props).map(([key, value]) => {
      const type = this.inferTypeFromValue(value)
      const optional = this.isOptionalProp(key, panel) ? '?' : ''
      return `  ${key}${optional}: ${type}`
    }).join('\n')

    return `interface ${componentName}Props {
${propDefinitions}
  className?: string
}`
  }

  /**
   * Generate the main component body
   */
  private generateComponentBody(
    panel: ExtendedPanel, 
    variation: TemplateVariation, 
    componentName: string
  ): string {
    const defaultProps = this.generateDefaultProps(panel, variation)
    const componentContent = this.generateComponentContent(panel, variation)

    return `export default function ${componentName}({
  className,
  ...props
}: ${componentName}Props) {
  return (
    <${this.getContainerElement(panel)} 
      className={cn(
        "${this.generateBaseClasses(panel, variation)}",
        className
      )}
      {...props}
    >
      ${componentContent}
    </${this.getContainerElement(panel)}>
  )
}`
  }

  /**
   * Generate component content based on panel type and variation
   */
  private generateComponentContent(panel: ExtendedPanel, variation: TemplateVariation): string {
    // This is a simplified version - in a full implementation, this would have
    // specific generators for each panel type
    switch (panel.category) {
      case 'navigation':
        return this.generateNavigationContent(panel, variation)
      case 'content-display':
        return this.generateContentDisplayContent(panel, variation)
      case 'forms-input':
        return this.generateFormContent(panel, variation)
      default:
        return this.generateGenericContent(panel, variation)
    }
  }

  /**
   * Generate navigation-specific content
   */
  private generateNavigationContent(panel: ExtendedPanel, variation: TemplateVariation): string {
    if (panel.id === 'header-panel') {
      return this.generateHeaderContent(variation)
    }
    
    return `<nav className="flex items-center gap-6">
        <a href="#" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
          Home
        </a>
        <a href="#" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
          About
        </a>
        <a href="#" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
          Contact
        </a>
      </nav>`
  }

  /**
   * Generate header-specific content based on style
   */
  private generateHeaderContent(variation: TemplateVariation): string {
    switch (variation.style) {
      case 'minimal':
        return `<div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-primary/80 to-primary flex items-center justify-center shadow-md">
              <span className="text-sm font-bold text-white">MB</span>
            </div>
            <div>
              <div className="text-base font-bold text-foreground">MyBrand</div>
              <div className="text-xs text-muted-foreground">Tagline here</div>
            </div>
          </div>
          <nav className="hidden lg:flex items-center gap-6">
            <a href="#" className="text-sm font-medium text-foreground hover:text-primary transition-colors">Home</a>
            <a href="#" className="text-sm font-medium text-foreground hover:text-primary transition-colors">Features</a>
            <a href="#" className="text-sm font-medium text-foreground hover:text-primary transition-colors">About</a>
            <a href="#" className="text-sm font-medium text-foreground hover:text-primary transition-colors">Contact</a>
          </nav>
        </div>`
      
      case 'modern':
        return `<div className="flex items-center justify-between">
          <div className="flex items-center gap-12">
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-primary via-primary/80 to-primary/60 flex items-center justify-center shadow-lg">
                <span className="text-xl font-bold text-white">L</span>
              </div>
              <span className="text-2xl font-bold text-foreground">Logo</span>
            </div>
            <nav className="flex items-center gap-8">
              <a href="#" className="text-sm font-medium text-foreground hover:text-primary transition-colors">Products</a>
              <a href="#" className="text-sm font-medium text-foreground hover:text-primary transition-colors flex items-center gap-1">
                Solutions
                <ChevronDown className="h-4 w-4" />
              </a>
              <a href="#" className="text-sm font-medium text-foreground hover:text-primary transition-colors">Resources</a>
              <a href="#" className="text-sm font-medium text-foreground hover:text-primary transition-colors">Pricing</a>
            </nav>
          </div>
          <div className="flex items-center gap-4">
            <button className="px-4 py-2 text-sm font-medium text-foreground hover:bg-accent rounded-lg transition-colors">Sign In</button>
            <button className="px-4 py-2 text-sm font-medium bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors">Get Started</button>
          </div>
        </div>`
      
      case 'bold':
        return `<div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-10">
              <div className="flex items-center gap-2">
                <div className="h-10 w-10 rounded-full bg-gradient-to-br from-primary to-primary/50 flex items-center justify-center">
                  <ShoppingCart className="h-5 w-5 text-white" />
                </div>
                <span className="text-xl font-bold text-foreground">ShopLogo</span>
              </div>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search products..."
                  className="w-96 pl-10 pr-4 py-2 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <Search className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
              </div>
            </div>
            <div className="flex items-center gap-6">
              <button className="relative p-2 rounded-lg hover:bg-accent transition-colors">
                <ShoppingCart className="h-5 w-5 text-foreground" />
                <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-primary text-white text-xs flex items-center justify-center font-semibold">3</span>
              </button>
            </div>
          </div>
          <nav className="flex items-center justify-center gap-8 border-t border-border pt-4">
            <a href="#" className="text-sm font-medium text-foreground hover:text-primary transition-colors">New Arrivals</a>
            <a href="#" className="text-sm font-medium text-foreground hover:text-primary transition-colors">Men</a>
            <a href="#" className="text-sm font-medium text-foreground hover:text-primary transition-colors">Women</a>
            <a href="#" className="text-sm font-medium text-foreground hover:text-primary transition-colors">Kids</a>
            <a href="#" className="text-sm font-medium text-foreground hover:text-primary transition-colors">Sale</a>
          </nav>
        </div>`
      
      case 'classic':
      default:
        return `<div className="flex items-center justify-around gap-8">
          <div className="flex items-center gap-8">
            <a href="#" className="text-sm font-medium text-foreground hover:text-primary transition-colors">Home</a>
            <a href="#" className="text-sm font-medium text-foreground hover:text-primary transition-colors">About</a>
            <a href="#" className="text-sm font-medium text-foreground hover:text-primary transition-colors">Services</a>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center">
              <Sparkles className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold text-foreground">Brand</span>
          </div>
          <div className="flex items-center gap-8">
            <a href="#" className="text-sm font-medium text-foreground hover:text-primary transition-colors">Portfolio</a>
            <a href="#" className="text-sm font-medium text-foreground hover:text-primary transition-colors">Blog</a>
            <a href="#" className="text-sm font-medium text-foreground hover:text-primary transition-colors">Contact</a>
          </div>
        </div>`
    }
  }

  /**
   * Generate content display content
   */
  private generateContentDisplayContent(panel: ExtendedPanel, variation: TemplateVariation): string {
    return `<div className="space-y-4">
        <h2 className="text-2xl font-bold text-foreground">Content Title</h2>
        <p className="text-muted-foreground">Content description goes here.</p>
      </div>`
  }

  /**
   * Generate form content
   */
  private generateFormContent(panel: ExtendedPanel, variation: TemplateVariation): string {
    return `<form className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">Label</label>
          <input 
            type="text" 
            className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="Enter text..."
          />
        </div>
        <button 
          type="submit"
          className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
        >
          Submit
        </button>
      </form>`
  }

  /**
   * Generate generic content for unknown panel types
   */
  private generateGenericContent(panel: ExtendedPanel, variation: TemplateVariation): string {
    return `<div className="p-6">
        <h3 className="text-lg font-semibold text-foreground mb-2">${panel.name}</h3>
        <p className="text-sm text-muted-foreground">${variation.description}</p>
      </div>`
  }

  /**
   * Get required icons based on panel and variation
   */
  private getRequiredIcons(panel: ExtendedPanel, variation: TemplateVariation): string[] {
    const icons: string[] = []
    
    if (panel.category === 'navigation') {
      if (panel.id === 'header-panel') {
        switch (variation.style) {
          case 'minimal':
            icons.push('Menu', 'Bell', 'User')
            break
          case 'modern':
            icons.push('ChevronDown', 'Search')
            break
          case 'bold':
            icons.push('ShoppingCart', 'Search')
            break
          case 'classic':
            icons.push('Sparkles')
            break
        }
      }
    }
    
    return icons
  }

  /**
   * Get required UI components (now using shadcn integration)
   */
  private getRequiredUIComponents(panel: ExtendedPanel, variation: TemplateVariation): string[] {
    return shadcnIntegration.getRequiredComponents(panel.category)
  }

  /**
   * Extract dependencies from panel and variation
   */
  private extractDependencies(panel: ExtendedPanel, variation: TemplateVariation): string[] {
    const dependencies: string[] = [...COMMON_DEPENDENCIES.core]
    
    // Add icon dependencies
    const requiredIcons = this.getRequiredIcons(panel, variation)
    if (requiredIcons.length > 0) {
      dependencies.push('lucide-react')
    }
    
    // Add UI dependencies
    const requiredUI = this.getRequiredUIComponents(panel, variation)
    if (requiredUI.length > 0) {
      dependencies.push('@radix-ui/react-slot', 'class-variance-authority', 'tailwind-merge')
    }
    
    // Add category-specific dependencies
    switch (panel.category) {
      case 'navigation':
        dependencies.push('@radix-ui/react-navigation-menu')
        break
      case 'forms-input':
        dependencies.push('react-hook-form', '@hookform/resolvers', 'zod')
        break
    }
    
    return Array.from(new Set(dependencies)) // Remove duplicates
  }

  /**
   * Generate component props based on panel and variation
   */
  private generateProps(panel: ExtendedPanel, variation: TemplateVariation): Record<string, any> {
    const baseProps = {
      className: 'string'
    }
    
    // Add panel-specific props
    switch (panel.category) {
      case 'navigation':
        return {
          ...baseProps,
          logo: 'string',
          navigation: 'NavigationItem[]'
        }
      case 'forms-input':
        return {
          ...baseProps,
          onSubmit: '(data: FormData) => void',
          disabled: 'boolean'
        }
      default:
        return baseProps
    }
  }

  /**
   * Generate code examples for the template
   */
  private generateCodeExamples(
    panel: ExtendedPanel, 
    variation: TemplateVariation, 
    componentName: string
  ): CodeExample[] {
    return [
      {
        title: 'Basic Usage',
        description: `Basic implementation of ${componentName}`,
        code: `<${componentName} />`,
        preview: this.createReactComponent(`<${componentName} />`, componentName)
      },
      {
        title: 'With Custom Styling',
        description: `${componentName} with custom CSS classes`,
        code: `<${componentName} className="custom-styles" />`,
        preview: this.createReactComponent(`<${componentName} className="custom-styles" />`, componentName)
      }
    ]
  }

  /**
   * Generate base CSS classes for the component using design system
   */
  private generateBaseClasses(panel: ExtendedPanel, variation: TemplateVariation): string {
    // Get component type for theme classes
    const componentType = this.getComponentType(panel)
    
    // Generate theme-aware classes
    const themeClasses = themeManager.generateThemeClasses(variation, componentType)
    
    // Generate responsive classes
    const responsiveClasses = themeManager.generateResponsiveClasses(themeClasses)
    
    // Generate dark mode classes
    const darkModeClasses = themeManager.generateDarkModeClasses(responsiveClasses)
    
    // Combine all classes
    const allClasses = [
      ...themeClasses,
      ...responsiveClasses,
      ...darkModeClasses
    ]
    
    // Add layout classes based on panel category
    const layoutClasses = this.getLayoutClasses(panel, variation)
    allClasses.push(...layoutClasses)
    
    // Remove duplicates and return
    return Array.from(new Set(allClasses)).join(' ')
  }

  /**
   * Get component type for theme generation
   */
  private getComponentType(panel: ExtendedPanel): string {
    if (panel.id === 'header-panel') return 'header'
    if (panel.category === 'forms-input') return 'form'
    if (panel.category === 'content-display') return 'card'
    return 'generic'
  }

  /**
   * Get layout classes based on panel and variation
   */
  private getLayoutClasses(panel: ExtendedPanel, variation: TemplateVariation): string[] {
    const classes: string[] = []
    
    // Add spacing classes based on style
    const spacingSize = this.getSpacingSize(variation.style)
    classes.push(...styleUtilities.generateSpacingClasses(spacingSize))
    
    // Add layout classes based on panel category
    switch (panel.category) {
      case 'navigation':
        classes.push(...styleUtilities.generateLayoutClasses('flex'))
        break
      case 'content-display':
        classes.push(...styleUtilities.generateLayoutClasses('stack'))
        break
      case 'forms-input':
        classes.push(...styleUtilities.generateLayoutClasses('stack'))
        break
      default:
        classes.push(...styleUtilities.generateLayoutClasses('stack'))
    }
    
    return classes
  }

  /**
   * Get spacing size based on variation style
   */
  private getSpacingSize(style: string): 'sm' | 'md' | 'lg' | 'xl' {
    switch (style) {
      case 'minimal': return 'sm'
      case 'modern': return 'md'
      case 'bold': return 'xl'
      case 'classic': return 'md'
      default: return 'md'
    }
  }

  /**
   * Get appropriate container element for panel type
   */
  private getContainerElement(panel: ExtendedPanel): string {
    switch (panel.category) {
      case 'navigation':
        return panel.id === 'header-panel' ? 'header' : 'nav'
      case 'forms-input':
        return 'div'
      default:
        return 'div'
    }
  }

  /**
   * Generate styles for the variation
   */
  private generateStyles(variation: TemplateVariation): string {
    // Return CSS custom properties for the variation
    return `/* ${variation.name} Styles */
:root {
  --template-style: ${variation.style};
}`
  }

  /**
   * Create a React component from code string
   */
  private createReactComponent(code: string, componentName: string): React.ComponentType {
    // In a real implementation, this would use dynamic imports or eval
    // For now, return a placeholder component
    const React = require('react')
    return () => React.createElement('div', { 
      className: 'template-placeholder' 
    }, `${componentName} Component`)
  }

  /**
   * Generate default props for the component
   */
  private generateDefaultProps(panel: ExtendedPanel, variation: TemplateVariation): Record<string, any> {
    return {}
  }

  /**
   * Infer TypeScript type from value
   */
  private inferTypeFromValue(value: any): string {
    if (typeof value === 'string') return 'string'
    if (typeof value === 'number') return 'number'
    if (typeof value === 'boolean') return 'boolean'
    if (Array.isArray(value)) return 'any[]'
    if (typeof value === 'object') return 'object'
    return 'any'
  }

  /**
   * Check if a prop is optional
   */
  private isOptionalProp(key: string, panel: ExtendedPanel): boolean {
    return key !== 'className' // className is always optional
  }

  // Validation methods
  private validateTypeScriptSyntax(code: string): { isValid: boolean; errors: string[] } {
    const errors: string[] = []
    
    // Basic syntax checks
    if (!code.includes('export default function')) {
      errors.push('Component must export a default function')
    }
    
    if (!code.includes('return (')) {
      errors.push('Component must return JSX')
    }
    
    // Check for balanced brackets
    const openBrackets = (code.match(/\{/g) || []).length
    const closeBrackets = (code.match(/\}/g) || []).length
    if (openBrackets !== closeBrackets) {
      errors.push('Unbalanced curly brackets')
    }
    
    return {
      isValid: errors.length === 0,
      errors
    }
  }

  private validateReactComponent(code: string): { isValid: boolean; errors: string[] } {
    const errors: string[] = []
    
    // Check for proper React component structure
    if (!code.includes('React') && !code.includes('import')) {
      errors.push('Missing React import')
    }
    
    return {
      isValid: errors.length === 0,
      errors
    }
  }

  private validateDependencies(code: string, dependencies: string[]): { 
    warnings: string[]; 
    suggestions: string[] 
  } {
    const warnings: string[] = []
    const suggestions: string[] = []
    
    // Check if all used imports are in dependencies
    const importMatches = code.match(/import.*from ["']([^"']+)["']/g) || []
    const usedPackages = importMatches.map(imp => {
      const match = imp.match(/from ["']([^"']+)["']/)
      return match ? match[1] : ''
    }).filter(pkg => !pkg.startsWith('@/') && !pkg.startsWith('./'))
    
    usedPackages.forEach(pkg => {
      if (!dependencies.includes(pkg)) {
        warnings.push(`Package "${pkg}" is used but not listed in dependencies`)
        suggestions.push(`Add "${pkg}" to dependencies`)
      }
    })
    
    return { warnings, suggestions }
  }

  private validateAccessibility(code: string): { 
    warnings: string[]; 
    suggestions: string[] 
  } {
    const warnings: string[] = []
    const suggestions: string[] = []
    
    // Check for accessibility attributes
    if (code.includes('<button') && !code.includes('aria-')) {
      warnings.push('Buttons should include ARIA attributes for accessibility')
      suggestions.push('Add aria-label or aria-describedby to buttons')
    }
    
    if (code.includes('<input') && !code.includes('aria-')) {
      warnings.push('Form inputs should include ARIA attributes for accessibility')
      suggestions.push('Add aria-label or aria-describedby to form inputs')
    }
    
    return { warnings, suggestions }
  }

  private optimizeCode(code: string): string {
    // Basic code optimizations
    return code
      .replace(/\s+/g, ' ') // Normalize whitespace
      .replace(/;\s*}/g, '}') // Remove unnecessary semicolons
      .trim()
  }

  private optimizeDependencies(dependencies: string[]): string[] {
    // Remove duplicates and sort
    return Array.from(new Set(dependencies)).sort()
  }
}

// Export singleton instance
export const templateGenerator = new TemplateGenerator()