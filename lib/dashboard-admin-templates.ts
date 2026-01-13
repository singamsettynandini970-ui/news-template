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

const createDashboardPanel = (id: string, name: string): ExtendedPanel => ({
  id,
  name,
  description: `${name} component templates`,
  category: 'dashboard-admin',
  variations: [
    createPlaceholderVariation(`${id}-minimal`, 'Minimal', name, 'minimal'),
    createPlaceholderVariation(`${id}-modern`, 'Modern', name, 'modern'),
    createPlaceholderVariation(`${id}-classic`, 'Classic', name, 'classic'),
    createPlaceholderVariation(`${id}-bold`, 'Bold', name, 'bold'),
  ],
  tags: ['dashboard', 'admin', 'analytics']
})

export const DASHBOARD_WIDGET_PANEL_WITH_VARIATIONS = createDashboardPanel('dashboard-widget', 'Dashboard Widget')
export const DATA_TABLE_PANEL_WITH_VARIATIONS = createDashboardPanel('data-table', 'Data Table')
export const ANALYTICS_CARD_PANEL_WITH_VARIATIONS = createDashboardPanel('analytics-card', 'Analytics Card')
export const STATUS_INDICATOR_PANEL_WITH_VARIATIONS = createDashboardPanel('status-indicator', 'Status Indicator')
export const ACTION_BUTTON_PANEL_WITH_VARIATIONS = createDashboardPanel('action-button', 'Action Button')
export const SETTINGS_PANEL_PANEL_WITH_VARIATIONS = createDashboardPanel('settings-panel', 'Settings Panel')
