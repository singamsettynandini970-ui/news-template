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

const createNewsPanel = (id: string, name: string): ExtendedPanel => ({
  id,
  name,
  description: `${name} component templates`,
  category: 'news-content',
  variations: [
    createPlaceholderVariation(`${id}-minimal`, 'Minimal', name, 'minimal'),
    createPlaceholderVariation(`${id}-modern`, 'Modern', name, 'modern'),
    createPlaceholderVariation(`${id}-classic`, 'Classic', name, 'classic'),
    createPlaceholderVariation(`${id}-bold`, 'Bold', name, 'bold'),
  ],
  tags: ['news', 'content']
})

export const BREAKING_NEWS_TICKER_PANEL_WITH_VARIATIONS = createNewsPanel('breaking-news-ticker', 'Breaking News Ticker')
export const ARTICLE_CARD_PANEL_WITH_VARIATIONS = createNewsPanel('article-card', 'Article Card')
export const NEWS_GRID_PANEL_WITH_VARIATIONS = createNewsPanel('news-grid', 'News Grid')
export const LIVE_UPDATES_PANEL_WITH_VARIATIONS = createNewsPanel('live-updates', 'Live Updates')
export const TRENDING_TOPICS_PANEL_WITH_VARIATIONS = createNewsPanel('trending-topics', 'Trending Topics')
export const MOST_READ_PANEL_WITH_VARIATIONS = createNewsPanel('most-read', 'Most Read')
