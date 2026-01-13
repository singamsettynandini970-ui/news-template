import type { ExtendedPanel, TemplateVariation } from './template-registry'
import { createTemplateMetadata } from './template-converter'
import { COMMON_DEPENDENCIES } from './template-registry'

// Team Member Panel
const TEAM_MEMBER_TEMPLATES = [
  {
    id: 1,
    name: "Minimal Card",
    style: "minimal" as const,
    code: 'export default function TeamMemberMinimal() { return null }',
  },
  {
    id: 2,
    name: "Modern Grid",
    style: "modern" as const,
    code: 'export default function TeamMemberModern() { return null }',
  },
  {
    id: 3,
    name: "Classic Profile",
    style: "classic" as const,
    code: 'export default function TeamMemberClassic() { return null }',
  },
  {
    id: 4,
    name: "Bold Statement",
    style: "bold" as const,
    code: 'export default function TeamMemberBold() { return null }',
  }
]

export function createTeamMemberPanel(): ExtendedPanel {
  const variations: TemplateVariation[] = TEAM_MEMBER_TEMPLATES.map((template) => ({
    id: `team-member-${template.style}-${template.id}`,
    name: template.name,
    description: `Team Member - ${template.name}`,
    style: template.style,
    code: template.code,
    metadata: createTemplateMetadata({
      complexity: 'simple',
      features: ['Team Member Card', 'Profile Display', 'Social Links', 'Responsive'],
      useCases: ['Team Page', 'About Section', 'Staff Directory', 'Company Website'],
      dependencies: [...COMMON_DEPENDENCIES.core],
    })
  }))

  return {
    id: 'team-member',
    name: 'Team Member',
    description: 'Team Member component templates',
    category: 'business-corporate',
    variations,
    tags: ['business', 'team', 'profile']
  }
}

export const TEAM_MEMBER_PANEL_WITH_VARIATIONS = createTeamMemberPanel()

// Testimonial Panel
const TESTIMONIAL_TEMPLATES = [
  {
    id: 1,
    name: "Card Style",
    style: "minimal" as const,
    code: 'export default function TestimonialCard() { return null }',
  },
  {
    id: 2,
    name: "Carousel Modern",
    style: "modern" as const,
    code: 'export default function TestimonialCarousel() { return null }',
  },
  {
    id: 3,
    name: "Classic Quote",
    style: "classic" as const,
    code: 'export default function TestimonialQuote() { return null }',
  },
  {
    id: 4,
    name: "Bold Featured",
    style: "bold" as const,
    code: 'export default function TestimonialBold() { return null }',
  }
]

export function createTestimonialPanel(): ExtendedPanel {
  const variations: TemplateVariation[] = TESTIMONIAL_TEMPLATES.map((template) => ({
    id: `testimonial-${template.style}-${template.id}`,
    name: template.name,
    description: `Testimonial - ${template.name}`,
    style: template.style,
    code: template.code,
    metadata: createTemplateMetadata({
      complexity: 'simple',
      features: ['Star Rating', 'Customer Quote', 'Author Info', 'Responsive'],
      useCases: ['Social Proof', 'Landing Page', 'Case Studies', 'About Page'],
      dependencies: [...COMMON_DEPENDENCIES.core],
    })
  }))

  return {
    id: 'testimonial',
    name: 'Testimonial',
    description: 'Testimonial component templates',
    category: 'business-corporate',
    variations,
    tags: ['testimonial', 'social-proof', 'review']
  }
}

export const TESTIMONIAL_PANEL_WITH_VARIATIONS = createTestimonialPanel()

// Pricing Table Panel
const PRICING_TABLE_TEMPLATES = [
  {
    id: 1,
    name: "Simple Pricing",
    style: "minimal" as const,
    code: 'export default function PricingTableSimple() { return null }',
  },
  {
    id: 2,
    name: "Comparison Modern",
    style: "modern" as const,
    code: 'export default function PricingTableComparison() { return null }',
  },
  {
    id: 3,
    name: "Featured Classic",
    style: "classic" as const,
    code: 'export default function PricingTableFeatured() { return null }',
  },
  {
    id: 4,
    name: "Bold Highlight",
    style: "bold" as const,
    code: 'export default function PricingTableBold() { return null }',
  }
]

export function createPricingTablePanel(): ExtendedPanel {
  const variations: TemplateVariation[] = PRICING_TABLE_TEMPLATES.map((template) => ({
    id: `pricing-table-${template.style}-${template.id}`,
    name: template.name,
    description: `Pricing Table - ${template.name}`,
    style: template.style,
    code: template.code,
    metadata: createTemplateMetadata({
      complexity: 'moderate',
      features: ['Pricing Plans', 'Feature Comparison', 'CTA Buttons', 'Responsive'],
      useCases: ['Pricing Page', 'Product Comparison', 'Subscription Plans', 'SaaS'],
      dependencies: [...COMMON_DEPENDENCIES.core],
    })
  }))

  return {
    id: 'pricing-table',
    name: 'Pricing Table',
    description: 'Pricing Table component templates',
    category: 'business-corporate',
    variations,
    tags: ['pricing', 'comparison', 'plans']
  }
}

export const PRICING_TABLE_PANEL_WITH_VARIATIONS = createPricingTablePanel()

// Service Card Panel
const SERVICE_CARD_TEMPLATES = [
  {
    id: 1,
    name: "Icon Simple",
    style: "minimal" as const,
    code: 'export default function ServiceCardIcon() { return null }',
  },
  {
    id: 2,
    name: "Image Modern",
    style: "modern" as const,
    code: 'export default function ServiceCardImage() { return null }',
  },
  {
    id: 3,
    name: "Minimal Classic",
    style: "classic" as const,
    code: 'export default function ServiceCardMinimal() { return null }',
  },
  {
    id: 4,
    name: "Bold Feature",
    style: "bold" as const,
    code: 'export default function ServiceCardBold() { return null }',
  }
]

export function createServiceCardPanel(): ExtendedPanel {
  const variations: TemplateVariation[] = SERVICE_CARD_TEMPLATES.map((template) => ({
    id: `service-card-${template.style}-${template.id}`,
    name: template.name,
    description: `Service Card - ${template.name}`,
    style: template.style,
    code: template.code,
    metadata: createTemplateMetadata({
      complexity: 'simple',
      features: ['Service Display', 'Icon/Image', 'Description', 'CTA'],
      useCases: ['Services Page', 'Product Showcase', 'Features List', 'Offerings'],
      dependencies: [...COMMON_DEPENDENCIES.core],
    })
  }))

  return {
    id: 'service-card',
    name: 'Service Card',
    description: 'Service Card component templates',
    category: 'business-corporate',
    variations,
    tags: ['service', 'card', 'feature']
  }
}

export const SERVICE_CARD_PANEL_WITH_VARIATIONS = createServiceCardPanel()

// About Section Panel
const ABOUT_SECTION_TEMPLATES = [
  {
    id: 1,
    name: "Split Layout",
    style: "minimal" as const,
    code: 'export default function AboutSectionSplit() { return null }',
  },
  {
    id: 2,
    name: "Centered Modern",
    style: "modern" as const,
    code: 'export default function AboutSectionCentered() { return null }',
  },
  {
    id: 3,
    name: "Timeline Classic",
    style: "classic" as const,
    code: 'export default function AboutSectionTimeline() { return null }',
  },
  {
    id: 4,
    name: "Stats Bold",
    style: "bold" as const,
    code: 'export default function AboutSectionStats() { return null }',
  }
]

export function createAboutSectionPanel(): ExtendedPanel {
  const variations: TemplateVariation[] = ABOUT_SECTION_TEMPLATES.map((template) => ({
    id: `about-section-${template.style}-${template.id}`,
    name: template.name,
    description: `About Section - ${template.name}`,
    style: template.style,
    code: template.code,
    metadata: createTemplateMetadata({
      complexity: 'moderate',
      features: ['About Content', 'Company Info', 'Statistics', 'Responsive'],
      useCases: ['About Page', 'Company Website', 'Team Introduction', 'Brand Story'],
      dependencies: [...COMMON_DEPENDENCIES.core],
    })
  }))

  return {
    id: 'about-section',
    name: 'About Section',
    description: 'About Section component templates',
    category: 'business-corporate',
    variations,
    tags: ['about', 'company', 'story']
  }
}

export const ABOUT_SECTION_PANEL_WITH_VARIATIONS = createAboutSectionPanel()

// Contact Info Panel
const CONTACT_INFO_TEMPLATES = [
  {
    id: 1,
    name: "Card Layout",
    style: "minimal" as const,
    code: 'export default function ContactInfoCard() { return null }',
  },
  {
    id: 2,
    name: "List Modern",
    style: "modern" as const,
    code: 'export default function ContactInfoList() { return null }',
  },
  {
    id: 3,
    name: "Map Classic",
    style: "classic" as const,
    code: 'export default function ContactInfoMap() { return null }',
  },
  {
    id: 4,
    name: "Form Bold",
    style: "bold" as const,
    code: 'export default function ContactInfoForm() { return null }',
  }
]

export function createContactInfoPanel(): ExtendedPanel {
  const variations: TemplateVariation[] = CONTACT_INFO_TEMPLATES.map((template) => ({
    id: `contact-info-${template.style}-${template.id}`,
    name: template.name,
    description: `Contact Info - ${template.name}`,
    style: template.style,
    code: template.code,
    metadata: createTemplateMetadata({
      complexity: 'simple',
      features: ['Contact Details', 'Email', 'Phone', 'Address'],
      useCases: ['Contact Page', 'Footer', 'About Page', 'Business Card'],
      dependencies: [...COMMON_DEPENDENCIES.core],
    })
  }))

  return {
    id: 'contact-info',
    name: 'Contact Info',
    description: 'Contact Info component templates',
    category: 'business-corporate',
    variations,
    tags: ['contact', 'information', 'details']
  }
}

export const CONTACT_INFO_PANEL_WITH_VARIATIONS = createContactInfoPanel()

// Company Stats Panel
const COMPANY_STATS_TEMPLATES = [
  {
    id: 1,
    name: "Counter Simple",
    style: "minimal" as const,
    code: 'export default function CompanyStatsCounter() { return null }',
  },
  {
    id: 2,
    name: "Chart Modern",
    style: "modern" as const,
    code: 'export default function CompanyStatsChart() { return null }',
  },
  {
    id: 3,
    name: "Grid Classic",
    style: "classic" as const,
    code: 'export default function CompanyStatsGrid() { return null }',
  },
  {
    id: 4,
    name: "Highlight Bold",
    style: "bold" as const,
    code: 'export default function CompanyStatsBold() { return null }',
  }
]

export function createCompanyStatsPanel(): ExtendedPanel {
  const variations: TemplateVariation[] = COMPANY_STATS_TEMPLATES.map((template) => ({
    id: `company-stats-${template.style}-${template.id}`,
    name: template.name,
    description: `Company Stats - ${template.name}`,
    style: template.style,
    code: template.code,
    metadata: createTemplateMetadata({
      complexity: 'simple',
      features: ['Statistics Display', 'Metrics', 'Numbers', 'Responsive'],
      useCases: ['About Page', 'Landing Page', 'Dashboard', 'Company Website'],
      dependencies: [...COMMON_DEPENDENCIES.core],
    })
  }))

  return {
    id: 'company-stats',
    name: 'Company Stats',
    description: 'Company Stats component templates',
    category: 'business-corporate',
    variations,
    tags: ['stats', 'metrics', 'numbers']
  }
}

export const COMPANY_STATS_PANEL_WITH_VARIATIONS = createCompanyStatsPanel()

// FAQ Section Panel
const FAQ_SECTION_TEMPLATES = [
  {
    id: 1,
    name: "Accordion Simple",
    style: "minimal" as const,
    code: 'export default function FAQAccordion() { return null }',
  },
  {
    id: 2,
    name: "List Modern",
    style: "modern" as const,
    code: 'export default function FAQList() { return null }',
  },
  {
    id: 3,
    name: "Search Classic",
    style: "classic" as const,
    code: 'export default function FAQSearch() { return null }',
  },
  {
    id: 4,
    name: "Category Bold",
    style: "bold" as const,
    code: 'export default function FAQCategory() { return null }',
  }
]

export function createFAQSectionPanel(): ExtendedPanel {
  const variations: TemplateVariation[] = FAQ_SECTION_TEMPLATES.map((template) => ({
    id: `faq-section-${template.style}-${template.id}`,
    name: template.name,
    description: `FAQ Section - ${template.name}`,
    style: template.style,
    code: template.code,
    metadata: createTemplateMetadata({
      complexity: 'moderate',
      features: ['FAQ Accordion', 'Search', 'Categories', 'Interactive'],
      useCases: ['Help Page', 'Support Section', 'Documentation', 'Product Page'],
      dependencies: [...COMMON_DEPENDENCIES.core, ...COMMON_DEPENDENCIES.icons],
    })
  }))

  return {
    id: 'faq-section',
    name: 'FAQ Section',
    description: 'FAQ Section component templates',
    category: 'business-corporate',
    variations,
    tags: ['faq', 'help', 'support']
  }
}

export const FAQ_SECTION_PANEL_WITH_VARIATIONS = createFAQSectionPanel()
