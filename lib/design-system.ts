// Design system integration for template generation
// Ensures generated templates use Tailwind CSS classes consistently
// Adds support for shadcn/ui component integration
// Implements theme support (light/dark mode) for all templates

import type { TemplateVariation } from './template-registry'

/**
 * Design system configuration and utilities
 */
export interface DesignSystemConfig {
  colors: ColorPalette
  typography: TypographyScale
  spacing: SpacingScale
  borderRadius: BorderRadiusScale
  shadows: ShadowScale
  breakpoints: BreakpointScale
}

export interface ColorPalette {
  background: string
  foreground: string
  card: string
  cardForeground: string
  popover: string
  popoverForeground: string
  primary: string
  primaryForeground: string
  secondary: string
  secondaryForeground: string
  muted: string
  mutedForeground: string
  accent: string
  accentForeground: string
  destructive: string
  destructiveForeground: string
  border: string
  input: string
  ring: string
}

export interface TypographyScale {
  fontSans: string
  fontMono: string
  sizes: {
    xs: string
    sm: string
    base: string
    lg: string
    xl: string
    '2xl': string
    '3xl': string
    '4xl': string
  }
  weights: {
    normal: string
    medium: string
    semibold: string
    bold: string
  }
}

export interface SpacingScale {
  0: string
  1: string
  2: string
  3: string
  4: string
  6: string
  8: string
  12: string
  16: string
  20: string
  24: string
}

export interface BorderRadiusScale {
  none: string
  sm: string
  md: string
  lg: string
  xl: string
  full: string
}

export interface ShadowScale {
  sm: string
  md: string
  lg: string
  xl: string
}

export interface BreakpointScale {
  sm: string
  md: string
  lg: string
  xl: string
  '2xl': string
}

/**
 * Default design system configuration based on shadcn/ui
 */
export const DEFAULT_DESIGN_SYSTEM: DesignSystemConfig = {
  colors: {
    background: 'bg-background',
    foreground: 'text-foreground',
    card: 'bg-card',
    cardForeground: 'text-card-foreground',
    popover: 'bg-popover',
    popoverForeground: 'text-popover-foreground',
    primary: 'bg-primary',
    primaryForeground: 'text-primary-foreground',
    secondary: 'bg-secondary',
    secondaryForeground: 'text-secondary-foreground',
    muted: 'bg-muted',
    mutedForeground: 'text-muted-foreground',
    accent: 'bg-accent',
    accentForeground: 'text-accent-foreground',
    destructive: 'bg-destructive',
    destructiveForeground: 'text-destructive-foreground',
    border: 'border-border',
    input: 'border-input',
    ring: 'ring-ring'
  },
  typography: {
    fontSans: 'font-sans',
    fontMono: 'font-mono',
    sizes: {
      xs: 'text-xs',
      sm: 'text-sm',
      base: 'text-base',
      lg: 'text-lg',
      xl: 'text-xl',
      '2xl': 'text-2xl',
      '3xl': 'text-3xl',
      '4xl': 'text-4xl'
    },
    weights: {
      normal: 'font-normal',
      medium: 'font-medium',
      semibold: 'font-semibold',
      bold: 'font-bold'
    }
  },
  spacing: {
    0: 'p-0',
    1: 'p-1',
    2: 'p-2',
    3: 'p-3',
    4: 'p-4',
    6: 'p-6',
    8: 'p-8',
    12: 'p-12',
    16: 'p-16',
    20: 'p-20',
    24: 'p-24'
  },
  borderRadius: {
    none: 'rounded-none',
    sm: 'rounded-sm',
    md: 'rounded-md',
    lg: 'rounded-lg',
    xl: 'rounded-xl',
    full: 'rounded-full'
  },
  shadows: {
    sm: 'shadow-sm',
    md: 'shadow-md',
    lg: 'shadow-lg',
    xl: 'shadow-xl'
  },
  breakpoints: {
    sm: 'sm:',
    md: 'md:',
    lg: 'lg:',
    xl: 'xl:',
    '2xl': '2xl:'
  }
}

/**
 * Theme-aware class generator
 */
export class ThemeManager {
  private designSystem: DesignSystemConfig

  constructor(designSystem: DesignSystemConfig = DEFAULT_DESIGN_SYSTEM) {
    this.designSystem = designSystem
  }

  /**
   * Generate theme-aware classes for a component
   */
  generateThemeClasses(variation: TemplateVariation, componentType: string): string[] {
    const classes: string[] = []
    
    // Base theme classes
    classes.push(this.designSystem.colors.background)
    classes.push(this.designSystem.colors.foreground)
    
    // Component-specific theme classes
    switch (componentType) {
      case 'header':
        classes.push(...this.getHeaderThemeClasses(variation))
        break
      case 'card':
        classes.push(...this.getCardThemeClasses(variation))
        break
      case 'form':
        classes.push(...this.getFormThemeClasses(variation))
        break
      case 'button':
        classes.push(...this.getButtonThemeClasses(variation))
        break
      default:
        classes.push(...this.getGenericThemeClasses(variation))
    }
    
    return classes
  }

  /**
   * Generate responsive classes
   */
  generateResponsiveClasses(baseClasses: string[]): string[] {
    const responsiveClasses: string[] = []
    
    baseClasses.forEach(baseClass => {
      // Add mobile-first responsive variants
      responsiveClasses.push(baseClass)
      
      // Add responsive variants for common breakpoints
      if (baseClass.includes('flex')) {
        responsiveClasses.push(`${this.designSystem.breakpoints.md}${baseClass}`)
        responsiveClasses.push(`${this.designSystem.breakpoints.lg}${baseClass}`)
      }
      
      if (baseClass.includes('hidden')) {
        responsiveClasses.push(`${this.designSystem.breakpoints.lg}block`)
      }
      
      if (baseClass.includes('text-')) {
        responsiveClasses.push(`${this.designSystem.breakpoints.md}${baseClass.replace('text-sm', 'text-base')}`)
      }
    })
    
    return responsiveClasses
  }

  /**
   * Generate dark mode classes
   */
  generateDarkModeClasses(lightClasses: string[]): string[] {
    const darkClasses: string[] = []
    
    lightClasses.forEach(lightClass => {
      // Most classes are already theme-aware with CSS variables
      // Add specific dark mode overrides if needed
      if (lightClass.includes('shadow')) {
        darkClasses.push(`dark:${lightClass.replace('shadow', 'shadow-none')}`)
      }
    })
    
    return darkClasses
  }

  /**
   * Get header-specific theme classes
   */
  private getHeaderThemeClasses(variation: TemplateVariation): string[] {
    const classes = [
      this.designSystem.colors.background,
      this.designSystem.colors.border,
      'border-b'
    ]
    
    switch (variation.style) {
      case 'minimal':
        classes.push('backdrop-blur-sm')
        break
      case 'modern':
        classes.push(this.designSystem.shadows.sm)
        break
      case 'bold':
        classes.push(this.designSystem.shadows.lg)
        break
      case 'classic':
        classes.push('border-b-2')
        break
    }
    
    return classes
  }

  /**
   * Get card-specific theme classes
   */
  private getCardThemeClasses(variation: TemplateVariation): string[] {
    const classes = [
      this.designSystem.colors.card,
      this.designSystem.colors.cardForeground,
      this.designSystem.colors.border,
      'border',
      this.designSystem.borderRadius.lg
    ]
    
    switch (variation.style) {
      case 'minimal':
        classes.push('border-0', this.designSystem.shadows.sm)
        break
      case 'modern':
        classes.push(this.designSystem.shadows.md)
        break
      case 'bold':
        classes.push(this.designSystem.shadows.xl, 'border-2')
        break
      case 'classic':
        classes.push(this.designSystem.borderRadius.md)
        break
    }
    
    return classes
  }

  /**
   * Get form-specific theme classes
   */
  private getFormThemeClasses(variation: TemplateVariation): string[] {
    const classes = [
      'space-y-4'
    ]
    
    switch (variation.style) {
      case 'minimal':
        classes.push('space-y-2')
        break
      case 'modern':
        classes.push('space-y-6')
        break
      case 'bold':
        classes.push('space-y-8')
        break
      case 'classic':
        classes.push('space-y-4')
        break
    }
    
    return classes
  }

  /**
   * Get button-specific theme classes
   */
  private getButtonThemeClasses(variation: TemplateVariation): string[] {
    const classes = [
      this.designSystem.colors.primary,
      this.designSystem.colors.primaryForeground,
      'transition-colors',
      'hover:bg-primary/90'
    ]
    
    switch (variation.style) {
      case 'minimal':
        classes.push('px-3', 'py-1.5', this.designSystem.borderRadius.md)
        break
      case 'modern':
        classes.push('px-4', 'py-2', this.designSystem.borderRadius.lg, this.designSystem.shadows.sm)
        break
      case 'bold':
        classes.push('px-6', 'py-3', this.designSystem.borderRadius.xl, this.designSystem.shadows.lg)
        break
      case 'classic':
        classes.push('px-4', 'py-2', this.designSystem.borderRadius.md)
        break
    }
    
    return classes
  }

  /**
   * Get generic theme classes
   */
  private getGenericThemeClasses(variation: TemplateVariation): string[] {
    const classes: string[] = []
    
    switch (variation.style) {
      case 'minimal':
        classes.push('space-y-2')
        break
      case 'modern':
        classes.push('space-y-4', this.designSystem.shadows.sm)
        break
      case 'bold':
        classes.push('space-y-6', this.designSystem.shadows.lg)
        break
      case 'classic':
        classes.push('space-y-4')
        break
    }
    
    return classes
  }
}

/**
 * Shadcn/ui component integration utilities
 */
export class ShadcnIntegration {
  /**
   * Get required shadcn/ui components for a panel type
   */
  static getRequiredComponents(panelCategory: string): string[] {
    const components: string[] = []
    
    switch (panelCategory) {
      case 'navigation':
        components.push('NavigationMenu', 'Button', 'Sheet')
        break
      case 'forms-input':
        components.push('Button', 'Input', 'Label', 'Form')
        break
      case 'content-display':
        components.push('Card', 'Dialog', 'Accordion', 'Tabs')
        break
      case 'ecommerce':
        components.push('Button', 'Badge', 'Card', 'Sheet')
        break
      case 'social-engagement':
        components.push('Button', 'Avatar', 'Card')
        break
      default:
        components.push('Button', 'Card')
    }
    
    return components
  }

  /**
   * Generate shadcn/ui component imports
   */
  static generateComponentImports(components: string[]): string[] {
    return components.map(component => 
      `import { ${component} } from "@/components/ui/${component.toLowerCase()}"`
    )
  }

  /**
   * Get component-specific props and variants
   */
  static getComponentVariants(component: string, style: string): Record<string, string> {
    const variants: Record<string, string> = {}
    
    switch (component) {
      case 'Button':
        variants.variant = this.getButtonVariant(style)
        variants.size = this.getButtonSize(style)
        break
      case 'Card':
        variants.className = this.getCardClasses(style)
        break
      case 'Input':
        variants.className = this.getInputClasses(style)
        break
    }
    
    return variants
  }

  private static getButtonVariant(style: string): string {
    switch (style) {
      case 'minimal':
        return 'ghost'
      case 'modern':
        return 'default'
      case 'bold':
        return 'default'
      case 'classic':
        return 'outline'
      default:
        return 'default'
    }
  }

  private static getButtonSize(style: string): string {
    switch (style) {
      case 'minimal':
        return 'sm'
      case 'modern':
        return 'default'
      case 'bold':
        return 'lg'
      case 'classic':
        return 'default'
      default:
        return 'default'
    }
  }

  private static getCardClasses(style: string): string {
    switch (style) {
      case 'minimal':
        return 'border-0 shadow-sm'
      case 'modern':
        return 'shadow-md'
      case 'bold':
        return 'shadow-xl border-2'
      case 'classic':
        return 'rounded-md'
      default:
        return ''
    }
  }

  private static getInputClasses(style: string): string {
    switch (style) {
      case 'minimal':
        return 'border-0 bg-muted'
      case 'modern':
        return 'rounded-lg'
      case 'bold':
        return 'border-2 rounded-xl'
      case 'classic':
        return 'rounded-md'
      default:
        return ''
    }
  }
}

/**
 * CSS class utilities for consistent styling
 */
export class StyleUtilities {
  /**
   * Generate consistent spacing classes
   */
  static generateSpacingClasses(size: 'sm' | 'md' | 'lg' | 'xl'): string[] {
    const spacingMap = {
      sm: ['p-2', 'gap-2', 'space-y-2'],
      md: ['p-4', 'gap-4', 'space-y-4'],
      lg: ['p-6', 'gap-6', 'space-y-6'],
      xl: ['p-8', 'gap-8', 'space-y-8']
    }
    
    return spacingMap[size] || spacingMap.md
  }

  /**
   * Generate consistent typography classes
   */
  static generateTypographyClasses(level: 'heading' | 'subheading' | 'body' | 'caption'): string[] {
    const typographyMap = {
      heading: ['text-2xl', 'font-bold', 'text-foreground'],
      subheading: ['text-lg', 'font-semibold', 'text-foreground'],
      body: ['text-sm', 'font-medium', 'text-foreground'],
      caption: ['text-xs', 'font-normal', 'text-muted-foreground']
    }
    
    return typographyMap[level] || typographyMap.body
  }

  /**
   * Generate consistent interactive classes
   */
  static generateInteractiveClasses(type: 'button' | 'link' | 'input'): string[] {
    const interactiveMap = {
      button: [
        'transition-colors',
        'hover:bg-accent',
        'hover:text-accent-foreground',
        'focus:outline-none',
        'focus:ring-2',
        'focus:ring-ring',
        'focus:ring-offset-2'
      ],
      link: [
        'transition-colors',
        'hover:text-primary',
        'focus:outline-none',
        'focus:ring-2',
        'focus:ring-ring',
        'focus:ring-offset-2'
      ],
      input: [
        'transition-colors',
        'focus:outline-none',
        'focus:ring-2',
        'focus:ring-ring',
        'focus:ring-offset-2',
        'border-input',
        'bg-background'
      ]
    }
    
    return interactiveMap[type] || []
  }

  /**
   * Generate layout classes for different container types
   */
  static generateLayoutClasses(layout: 'flex' | 'grid' | 'stack'): string[] {
    const layoutMap = {
      flex: ['flex', 'items-center', 'justify-between'],
      grid: ['grid', 'gap-4'],
      stack: ['space-y-4']
    }
    
    return layoutMap[layout] || layoutMap.stack
  }
}

// Export singleton instances
export const themeManager = new ThemeManager()
export const shadcnIntegration = ShadcnIntegration
export const styleUtilities = StyleUtilities