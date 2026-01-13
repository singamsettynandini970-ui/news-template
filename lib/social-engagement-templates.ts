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

const createSocialPanel = (id: string, name: string): ExtendedPanel => ({
  id,
  name,
  description: `${name} component templates`,
  category: 'social-engagement',
  variations: [
    createPlaceholderVariation(`${id}-minimal`, 'Minimal', name, 'minimal'),
    createPlaceholderVariation(`${id}-modern`, 'Modern', name, 'modern'),
    createPlaceholderVariation(`${id}-classic`, 'Classic', name, 'classic'),
    createPlaceholderVariation(`${id}-bold`, 'Bold', name, 'bold'),
  ],
  tags: ['social', 'engagement', 'community']
})

export const SOCIAL_SHARE_PANEL_WITH_VARIATIONS = createSocialPanel('social-share', 'Social Share')
export const COMMENT_SYSTEM_PANEL_WITH_VARIATIONS = createSocialPanel('comment-system', 'Comment System')
export const RATING_SYSTEM_PANEL_WITH_VARIATIONS = createSocialPanel('rating-system', 'Rating System')
export const FOLLOW_BUTTON_PANEL_WITH_VARIATIONS = createSocialPanel('follow-button', 'Follow Button')
export const SOCIAL_FEED_PANEL_WITH_VARIATIONS = createSocialPanel('social-feed', 'Social Feed')
export const USER_PROFILE_PANEL_WITH_VARIATIONS = createSocialPanel('user-profile', 'User Profile')
