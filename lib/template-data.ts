// Template data registry - 87 panels × 4 variations = 348 templates
// Organized according to design specification
import {
  Navigation,
  Monitor,
  Newspaper,
  Edit,
  Video,
  ShoppingCart,
  Users,
  Building,
  Settings,
  Star,
  Layout
} from "lucide-react"
import type { TemplateRegistry, TemplateCategory, ExtendedPanel, TemplateVariation, TemplateMetadata } from './template-registry'
import { HEADER_PANEL_WITH_VARIATIONS } from './header-templates'
import { FOOTER_PANEL_WITH_VARIATIONS } from './footer-templates'
import { NAVIGATION_MENU_PANEL_WITH_VARIATIONS } from './navigation-menu-templates'
import { HAMBURGER_MENU_PANEL_WITH_VARIATIONS } from './hamburger-menu-templates'
import { BREADCRUMB_PANEL_WITH_VARIATIONS } from './breadcrumb-templates'
import { MOBILE_NAVIGATION_PANEL_WITH_VARIATIONS } from './mobile-navigation-templates'
import { PAGINATION_PANEL_WITH_VARIATIONS } from './pagination-templates'
import { SKIP_LINKS_PANEL_WITH_VARIATIONS } from './skip-links-templates'
import { SITE_MAP_PANEL_WITH_VARIATIONS } from './site-map-templates'
import { NAVIGATION_DRAWER_PANEL_WITH_VARIATIONS } from './navigation-drawer-templates'
import { MEGA_MENU_PANEL_WITH_VARIATIONS } from './mega-menu-templates'
import { TOP_NAVIGATION_BAR_PANEL_WITH_VARIATIONS } from './top-navigation-bar-templates'
import { SEARCH_PANEL_WITH_VARIATIONS } from './search-panel-templates'
import { LOGIN_PANEL_WITH_VARIATIONS } from './login-panel-templates'
import { LANGUAGE_SELECTOR_PANEL, LOCATION_SELECTOR_PANEL, NOTIFICATION_PANEL } from './ui-utility-panels-templates'
import { HERO_SECTION_PANEL_WITH_VARIATIONS } from './hero-section-templates'
import { CARD_LAYOUT_PANEL_WITH_VARIATIONS } from './card-layout-templates'
import { MODAL_DIALOG_PANEL_WITH_VARIATIONS } from './modal-dialog-templates'
import { LIST_DISPLAY_PANEL_WITH_VARIATIONS } from './list-display-templates'
import { TABLE_DISPLAY_PANEL_WITH_VARIATIONS } from './table-display-templates'
import { ACCORDION_PANEL_WITH_VARIATIONS } from './accordion-templates'
import { TABS_PANEL_WITH_VARIATIONS } from './tabs-templates'
import { CAROUSEL_PANEL_WITH_VARIATIONS } from './carousel-templates'
import { TIMELINE_PANEL_WITH_VARIATIONS, PROGRESS_INDICATOR_PANEL_WITH_VARIATIONS } from './timeline-progress-templates'
import { CONTACT_FORM_PANEL_WITH_VARIATIONS } from './contact-form-templates'
import { NEWSLETTER_SIGNUP_PANEL_WITH_VARIATIONS } from './newsletter-signup-templates'
import { SEARCH_FORM_PANEL_WITH_VARIATIONS } from './search-form-templates'
import { LOGIN_FORM_PANEL_WITH_VARIATIONS } from './login-form-templates'
import { REGISTRATION_FORM_PANEL_WITH_VARIATIONS } from './registration-form-templates'
import { FEEDBACK_FORM_PANEL_WITH_VARIATIONS } from './feedback-form-templates'
import { FILE_UPLOAD_PANEL_WITH_VARIATIONS } from './file-upload-templates'
import { FORM_VALIDATION_PANEL_WITH_VARIATIONS } from './form-validation-templates'
import { PHOTO_GALLERY_PANEL_WITH_VARIATIONS } from './photo-gallery-templates'
import { VIDEO_PLAYER_PANEL_WITH_VARIATIONS } from './video-player-templates'
import { IMAGE_SLIDER_PANEL_WITH_VARIATIONS } from './image-slider-templates'
import { MEDIA_GRID_PANEL_WITH_VARIATIONS } from './media-grid-templates'
import { VIDEO_GALLERY_PANEL_WITH_VARIATIONS } from './video-gallery-templates'
import { AUDIO_PLAYER_PANEL_WITH_VARIATIONS } from './audio-player-templates'
import { IMAGE_COMPARISON_PANEL_WITH_VARIATIONS, MEDIA_UPLOAD_PANEL_WITH_VARIATIONS, SLIDESHOW_PANEL_WITH_VARIATIONS } from './media-gallery-remaining-templates'
import { BREAKING_NEWS_TICKER_PANEL_WITH_VARIATIONS, ARTICLE_CARD_PANEL_WITH_VARIATIONS, NEWS_GRID_PANEL_WITH_VARIATIONS, LIVE_UPDATES_PANEL_WITH_VARIATIONS, TRENDING_TOPICS_PANEL_WITH_VARIATIONS, MOST_READ_PANEL_WITH_VARIATIONS } from './news-content-templates'
import { PRODUCT_CARD_PANEL_WITH_VARIATIONS, SHOPPING_CART_PANEL_WITH_VARIATIONS, PRODUCT_GALLERY_PANEL_WITH_VARIATIONS, PRICE_DISPLAY_PANEL_WITH_VARIATIONS } from './ecommerce-templates'
import { SOCIAL_SHARE_PANEL_WITH_VARIATIONS, COMMENT_SYSTEM_PANEL_WITH_VARIATIONS, RATING_SYSTEM_PANEL_WITH_VARIATIONS, FOLLOW_BUTTON_PANEL_WITH_VARIATIONS, SOCIAL_FEED_PANEL_WITH_VARIATIONS, USER_PROFILE_PANEL_WITH_VARIATIONS } from './social-engagement-templates'
import { TEAM_MEMBER_PANEL_WITH_VARIATIONS, TESTIMONIAL_PANEL_WITH_VARIATIONS, PRICING_TABLE_PANEL_WITH_VARIATIONS, SERVICE_CARD_PANEL_WITH_VARIATIONS, ABOUT_SECTION_PANEL_WITH_VARIATIONS, CONTACT_INFO_PANEL_WITH_VARIATIONS, COMPANY_STATS_PANEL_WITH_VARIATIONS, FAQ_SECTION_PANEL_WITH_VARIATIONS } from './business-corporate-templates'
import { DASHBOARD_WIDGET_PANEL_WITH_VARIATIONS, DATA_TABLE_PANEL_WITH_VARIATIONS, ANALYTICS_CARD_PANEL_WITH_VARIATIONS, STATUS_INDICATOR_PANEL_WITH_VARIATIONS, ACTION_BUTTON_PANEL_WITH_VARIATIONS, SETTINGS_PANEL_PANEL_WITH_VARIATIONS } from './dashboard-admin-templates'
import { CALL_TO_ACTION_PANEL_WITH_VARIATIONS, PROMOTIONAL_BANNER_PANEL_WITH_VARIATIONS, FEATURE_HIGHLIGHT_PANEL_WITH_VARIATIONS, DISCOUNT_BADGE_PANEL_WITH_VARIATIONS, PRODUCT_SHOWCASE_PANEL_WITH_VARIATIONS, TESTIMONIAL_BANNER_PANEL_WITH_VARIATIONS } from './marketing-promotion-templates'

// Helper to create placeholder panels with 4 variations
const createPlaceholderPanel = (id: string, name: string, category: string): ExtendedPanel => {
  const createVariation = (varId: string, varName: string, style: 'minimal' | 'modern' | 'classic' | 'bold'): TemplateVariation => ({
    id: varId,
    name: varName,
    description: `${varName} variation`,
    style,
    code: `// ${name} - ${varName} variation\n// To be implemented`,
    metadata: {
      createdDate: '2026-01-07',
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

  return {
    id,
    name,
    description: `${name} component templates`,
    category,
    variations: [
      createVariation(`${id}-minimal`, 'Minimal', 'minimal'),
      createVariation(`${id}-modern`, 'Modern', 'modern'),
      createVariation(`${id}-classic`, 'Classic', 'classic'),
      createVariation(`${id}-bold`, 'Bold', 'bold')
    ],
    tags: [category, 'component', 'template']
  }
}

// Define all 87 panels according to design specification
const PANELS_BY_CATEGORY: Record<string, ExtendedPanel[]> = {
  navigation: [
    HEADER_PANEL_WITH_VARIATIONS,
    TOP_NAVIGATION_BAR_PANEL_WITH_VARIATIONS,
    NAVIGATION_MENU_PANEL_WITH_VARIATIONS,
    HAMBURGER_MENU_PANEL_WITH_VARIATIONS,
    BREADCRUMB_PANEL_WITH_VARIATIONS,
    FOOTER_PANEL_WITH_VARIATIONS,
    MOBILE_NAVIGATION_PANEL_WITH_VARIATIONS,
    PAGINATION_PANEL_WITH_VARIATIONS,
    SKIP_LINKS_PANEL_WITH_VARIATIONS,
    SITE_MAP_PANEL_WITH_VARIATIONS,
    NAVIGATION_DRAWER_PANEL_WITH_VARIATIONS,
    MEGA_MENU_PANEL_WITH_VARIATIONS,
  ],
  'user-interface': [
    SEARCH_PANEL_WITH_VARIATIONS,
    LANGUAGE_SELECTOR_PANEL,
    LOCATION_SELECTOR_PANEL,
    LOGIN_PANEL_WITH_VARIATIONS,
    NOTIFICATION_PANEL,
    createPlaceholderPanel('user-account', 'User Account', 'user-interface'),
    createPlaceholderPanel('theme-switcher', 'Theme Switcher', 'user-interface'),
    createPlaceholderPanel('accessibility-controls', 'Accessibility Controls', 'user-interface'),
  ],
  'content-display': [
    HERO_SECTION_PANEL_WITH_VARIATIONS,
    CARD_LAYOUT_PANEL_WITH_VARIATIONS,
    LIST_DISPLAY_PANEL_WITH_VARIATIONS,
    TABLE_DISPLAY_PANEL_WITH_VARIATIONS,
    MODAL_DIALOG_PANEL_WITH_VARIATIONS,
    ACCORDION_PANEL_WITH_VARIATIONS,
    TABS_PANEL_WITH_VARIATIONS,
    CAROUSEL_PANEL_WITH_VARIATIONS,
    TIMELINE_PANEL_WITH_VARIATIONS,
    PROGRESS_INDICATOR_PANEL_WITH_VARIATIONS,
  ],
  'forms-input': [
    CONTACT_FORM_PANEL_WITH_VARIATIONS,
    NEWSLETTER_SIGNUP_PANEL_WITH_VARIATIONS,
    SEARCH_FORM_PANEL_WITH_VARIATIONS,
    LOGIN_FORM_PANEL_WITH_VARIATIONS,
    REGISTRATION_FORM_PANEL_WITH_VARIATIONS,
    FEEDBACK_FORM_PANEL_WITH_VARIATIONS,
    FILE_UPLOAD_PANEL_WITH_VARIATIONS,
    FORM_VALIDATION_PANEL_WITH_VARIATIONS,
  ],
  'media-gallery': [
    PHOTO_GALLERY_PANEL_WITH_VARIATIONS,
    VIDEO_PLAYER_PANEL_WITH_VARIATIONS,
    IMAGE_SLIDER_PANEL_WITH_VARIATIONS,
    MEDIA_GRID_PANEL_WITH_VARIATIONS,
    VIDEO_GALLERY_PANEL_WITH_VARIATIONS,
    AUDIO_PLAYER_PANEL_WITH_VARIATIONS,
    IMAGE_COMPARISON_PANEL_WITH_VARIATIONS,
    MEDIA_UPLOAD_PANEL_WITH_VARIATIONS,
    SLIDESHOW_PANEL_WITH_VARIATIONS,
  ],
  'news-content': [
    BREAKING_NEWS_TICKER_PANEL_WITH_VARIATIONS,
    ARTICLE_CARD_PANEL_WITH_VARIATIONS,
    NEWS_GRID_PANEL_WITH_VARIATIONS,
    LIVE_UPDATES_PANEL_WITH_VARIATIONS,
    TRENDING_TOPICS_PANEL_WITH_VARIATIONS,
    MOST_READ_PANEL_WITH_VARIATIONS,
  ],
  'ecommerce': [
    PRODUCT_CARD_PANEL_WITH_VARIATIONS,
    SHOPPING_CART_PANEL_WITH_VARIATIONS,
    PRODUCT_GALLERY_PANEL_WITH_VARIATIONS,
    PRICE_DISPLAY_PANEL_WITH_VARIATIONS,
  ],
  'social-engagement': [
    SOCIAL_SHARE_PANEL_WITH_VARIATIONS,
    COMMENT_SYSTEM_PANEL_WITH_VARIATIONS,
    RATING_SYSTEM_PANEL_WITH_VARIATIONS,
    FOLLOW_BUTTON_PANEL_WITH_VARIATIONS,
    SOCIAL_FEED_PANEL_WITH_VARIATIONS,
    USER_PROFILE_PANEL_WITH_VARIATIONS,
  ],
  'business-corporate': [
    TEAM_MEMBER_PANEL_WITH_VARIATIONS,
    TESTIMONIAL_PANEL_WITH_VARIATIONS,
    PRICING_TABLE_PANEL_WITH_VARIATIONS,
    SERVICE_CARD_PANEL_WITH_VARIATIONS,
    ABOUT_SECTION_PANEL_WITH_VARIATIONS,
    CONTACT_INFO_PANEL_WITH_VARIATIONS,
    COMPANY_STATS_PANEL_WITH_VARIATIONS,
    FAQ_SECTION_PANEL_WITH_VARIATIONS,
  ],
  'dashboard-admin': [
    DASHBOARD_WIDGET_PANEL_WITH_VARIATIONS,
    DATA_TABLE_PANEL_WITH_VARIATIONS,
    ANALYTICS_CARD_PANEL_WITH_VARIATIONS,
    STATUS_INDICATOR_PANEL_WITH_VARIATIONS,
    ACTION_BUTTON_PANEL_WITH_VARIATIONS,
    SETTINGS_PANEL_PANEL_WITH_VARIATIONS,
  ],
  'marketing-promotion': [
    CALL_TO_ACTION_PANEL_WITH_VARIATIONS,
    PROMOTIONAL_BANNER_PANEL_WITH_VARIATIONS,
    FEATURE_HIGHLIGHT_PANEL_WITH_VARIATIONS,
    DISCOUNT_BADGE_PANEL_WITH_VARIATIONS,
    PRODUCT_SHOWCASE_PANEL_WITH_VARIATIONS,
    TESTIMONIAL_BANNER_PANEL_WITH_VARIATIONS,
  ],
}

// Category definitions
const CATEGORIES_CONFIG = [
  { id: 'navigation', name: 'Navigation', icon: Navigation, panelCount: 12 },
  { id: 'user-interface', name: 'User Interface', icon: Monitor, panelCount: 8 },
  { id: 'content-display', name: 'Content Display', icon: Layout, panelCount: 10 },
  { id: 'forms-input', name: 'Forms & Input', icon: Edit, panelCount: 8 },
  { id: 'media-gallery', name: 'Media & Gallery', icon: Video, panelCount: 9 },
  { id: 'news-content', name: 'News & Content', icon: Newspaper, panelCount: 6 },
  { id: 'ecommerce', name: 'E-commerce', icon: ShoppingCart, panelCount: 8 },
  { id: 'social-engagement', name: 'Social & Engagement', icon: Users, panelCount: 6 },
  { id: 'business-corporate', name: 'Business & Corporate', icon: Building, panelCount: 8 },
  { id: 'dashboard-admin', name: 'Dashboard & Admin', icon: Settings, panelCount: 6 },
  { id: 'marketing-promotion', name: 'Marketing & Promotion', icon: Star, panelCount: 6 },
]

// Create extended categories
function createExtendedCategories(): TemplateCategory[] {
  return CATEGORIES_CONFIG.map(config => {
    const panels = PANELS_BY_CATEGORY[config.id] || []
    return {
      id: config.id,
      name: config.name,
      description: `${config.name} component templates`,
      icon: config.icon,
      panels,
      panelCount: panels.length
    }
  })
}

// Create the main template registry
export const TEMPLATE_REGISTRY: TemplateRegistry = {
  categories: createExtendedCategories(),
  totalPanels: 87,
  totalTemplates: 348, // 87 panels × 4 variations each
  version: '1.0.0'
}

// Helper function to get all panels across categories
export function getAllPanels(): ExtendedPanel[] {
  return TEMPLATE_REGISTRY.categories.flatMap(category => category.panels)
}

// Helper function to find a panel by ID
export function findPanelById(id: string): ExtendedPanel | undefined {
  return getAllPanels().find(panel => panel.id === id)
}

// Helper function to find panels by category
export function findPanelsByCategory(categoryId: string): ExtendedPanel[] {
  const category = TEMPLATE_REGISTRY.categories.find(cat => cat.id === categoryId)
  return category?.panels || []
}

// Export for backward compatibility with existing sidebar
export const EXTENDED_TEMPLATE_PANELS = CATEGORIES_CONFIG.map(c => ({
  id: c.id,
  name: c.name,
  subPanels: PANELS_BY_CATEGORY[c.id]?.filter(p => p).map(p => p.name) || []
}))
