import type { ExtendedPanel, TemplateVariation } from './template-registry'

const createPlaceholderVariation = (id: string, name: string, panelName: string, style: 'minimal' | 'modern' | 'classic' | 'bold'): TemplateVariation => ({
  id,
  name,
  description: `${panelName} - ${name} variation`,
  style,
  code: `// ${panelName} - ${name} variation\nexport default function ${panelName.replace(/\\s+/g, '')}() {\n  return <div className="w-full bg-background p-6 md:p-8 lg:p-10"><p className="text-sm md:text-base lg:text-lg text-foreground">Component implementation</p></div>\n}`,
  metadata: {
    createdDate: '2026-01-08',
    version: '1.0.0',
    author: 'Template Generator',
    complexity: 'simple',
    responsive: true,
    accessible: true,
    darkModeSupport: true,
    dependencies: [],
    features: [],
    useCases: [],
    implementationNotes: []
  }
})

const createMarketingPanel = (id: string, name: string): ExtendedPanel => ({
  id,
  name,
  description: `${name} component templates`,
  category: 'marketing-promotion',
  variations: [
    createPlaceholderVariation(`${id}-minimal`, 'Minimal', name, 'minimal'),
    createPlaceholderVariation(`${id}-modern`, 'Modern', name, 'modern'),
    createPlaceholderVariation(`${id}-classic`, 'Classic', name, 'classic'),
    createPlaceholderVariation(`${id}-bold`, 'Bold', name, 'bold'),
  ],
  tags: ['marketing', 'promotion', 'conversion']
})

export const CALL_TO_ACTION_PANEL_WITH_VARIATIONS = createMarketingPanel('call-to-action', 'Call to Action')
export const PROMOTIONAL_BANNER_PANEL_WITH_VARIATIONS = createMarketingPanel('promotional-banner', 'Promotional Banner')
export const FEATURE_HIGHLIGHT_PANEL_WITH_VARIATIONS = createMarketingPanel('feature-highlight', 'Feature Highlight')
export const NEWSLETTER_BANNER_PANEL_WITH_VARIATIONS = createMarketingPanel('newsletter-banner', 'Newsletter Banner')
export const DISCOUNT_BADGE_PANEL_WITH_VARIATIONS = createMarketingPanel('discount-badge', 'Discount Badge')
export const LANDING_HERO_PANEL_WITH_VARIATIONS = createMarketingPanel('landing-hero', 'Landing Hero')
