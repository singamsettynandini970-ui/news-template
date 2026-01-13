// Card Layout templates - Basic, Image, Action, Hover
// 4 variations

import type { ExtendedPanel, TemplateVariation } from './template-registry'
import { createTemplateMetadata } from './template-converter'
import { COMMON_DEPENDENCIES } from './template-registry'

const CARD_LAYOUT_TEMPLATES = [
  {
    id: 1,
    name: "Basic Card",
    description: "Simple card with text content",
    style: "minimal" as const,
    code: 'export default function BasicCard() {\n  return (\n    <div className="w-full max-w-sm px-2 sm:px-0 p-4 sm:p-6 bg-background border border-border rounded-lg shadow-sm hover:shadow-md transition-shadow">\n      <h3 className="text-base sm:text-lg font-semibold text-foreground mb-2">\n        Card Title\n      </h3>\n      <p className="text-xs sm:text-sm text-muted-foreground mb-4">\n        This is a basic card component with text content. It provides a clean and simple way to display information.\n      </p>\n      <button className="text-xs sm:text-sm font-medium text-primary hover:underline">\n        Learn More →\n      </button>\n    </div>\n  )\n}',
  },
  {
    id: 2,
    name: "Image Card",
    description: "Card with image and content",
    style: "modern" as const,
    code: 'import { Heart } from "lucide-react"\n\nexport default function ImageCard() {\n  return (\n    <div className="w-full max-w-sm px-2 sm:px-0 overflow-hidden bg-background border border-border rounded-lg shadow-sm hover:shadow-lg transition-shadow">\n      <div className="relative h-32 sm:h-48 overflow-hidden bg-accent">\n        <img\n          src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=300&fit=crop"\n          alt="Card image"\n          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"\n        />\n        <button className="absolute top-2 sm:top-3 right-2 sm:right-3 p-1.5 sm:p-2 bg-background rounded-full shadow-md hover:bg-accent transition-colors">\n          <Heart className="h-4 sm:h-5 w-4 sm:w-5 text-secondary" />\n        </button>\n      </div>\n      <div className="p-3 sm:p-4">\n        <h3 className="text-base sm:text-lg font-semibold text-foreground mb-2">\n          Beautiful Image\n        </h3>\n        <p className="text-xs sm:text-sm text-muted-foreground mb-4">\n          Cards with images are perfect for showcasing visual content and creating engaging layouts.\n        </p>\n        <button className="w-full px-3 sm:px-4 py-1.5 sm:py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium text-xs sm:text-sm">\n          View Details\n        </button>\n      </div>\n    </div>\n  )\n}',
  },
  {
    id: 3,
    name: "Action Card",
    description: "Card with multiple action buttons",
    style: "classic" as const,
    code: 'import { Share2, Bookmark, MoreVertical } from "lucide-react"\n\nexport default function ActionCard() {\n  return (\n    <div className="w-full max-w-sm px-2 sm:px-0 p-4 sm:p-6 bg-background border border-border rounded-lg shadow-sm">\n      <div className="flex items-start justify-between mb-4">\n        <div>\n          <h3 className="text-base sm:text-lg font-semibold text-foreground">\n            Action Card\n          </h3>\n          <p className="text-xs text-muted-foreground mt-1">\n            Posted 2 hours ago\n          </p>\n        </div>\n        <button className="p-1 hover:bg-accent rounded transition-colors flex-shrink-0">\n          <MoreVertical className="h-4 sm:h-5 w-4 sm:w-5 text-muted-foreground" />\n        </button>\n      </div>\n      \n      <p className="text-xs sm:text-sm text-foreground mb-6">\n        This card includes action buttons for common interactions like sharing and bookmarking content.\n      </p>\n      \n      <div className="flex flex-col sm:flex-row gap-2">\n        <button className="flex-1 flex items-center justify-center gap-2 px-2 sm:px-3 py-1.5 sm:py-2 border border-border rounded-lg hover:bg-accent transition-colors text-xs sm:text-sm font-medium text-foreground">\n          <Share2 className="h-3 sm:h-4 w-3 sm:w-4" />\n          <span className="hidden sm:inline">Share</span>\n          <span className="sm:hidden">Share</span>\n        </button>\n        <button className="flex-1 flex items-center justify-center gap-2 px-2 sm:px-3 py-1.5 sm:py-2 border border-border rounded-lg hover:bg-accent transition-colors text-xs sm:text-sm font-medium text-foreground">\n          <Bookmark className="h-3 sm:h-4 w-3 sm:w-4" />\n          <span className="hidden sm:inline">Save</span>\n          <span className="sm:hidden">Save</span>\n        </button>\n      </div>\n    </div>\n  )\n}',
  },
  {
    id: 4,
    name: "Hover Card",
    description: "Card with interactive hover effects",
    style: "bold" as const,
    code: 'import { ArrowUpRight } from "lucide-react"\n\nexport default function HoverCard() {\n  return (\n    <div className="w-full max-w-sm px-2 sm:px-0 group overflow-hidden bg-background border border-border rounded-lg shadow-sm hover:shadow-xl hover:border-primary transition-all duration-300 cursor-pointer">\n      <div className="relative h-32 sm:h-40 bg-gradient-to-br from-primary to-accent overflow-hidden">\n        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/20" />\n        <div className="absolute inset-0 flex items-center justify-center">\n          <div className="text-primary-foreground text-center">\n            <div className="text-3xl sm:text-4xl font-bold mb-1 sm:mb-2">✨</div>\n            <p className="text-xs sm:text-sm font-medium">Hover to explore</p>\n          </div>\n        </div>\n      </div>\n      \n      <div className="p-4 sm:p-6">\n        <h3 className="text-base sm:text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">\n          Interactive Card\n        </h3>\n        <p className="text-xs sm:text-sm text-muted-foreground mb-4">\n          This card features smooth hover animations and transitions for an engaging user experience.\n        </p>\n        <div className="flex items-center gap-2 text-primary font-medium text-xs sm:text-sm group-hover:gap-3 transition-all">\n          Explore More\n          <ArrowUpRight className="h-3 sm:h-4 w-3 sm:w-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />\n        </div>\n      </div>\n    </div>\n  )\n}',
  }
]

export function createCardLayoutPanel(): ExtendedPanel {
  const variations: TemplateVariation[] = CARD_LAYOUT_TEMPLATES.map((template) => ({
    id: `card-layout-${template.style}-${template.id}`,
    name: template.name,
    description: template.description,
    style: template.style,
    code: template.code,
    metadata: createTemplateMetadata({
      complexity: 'simple',
      features: ['Card Layout', 'Responsive Design', 'Hover Effects', 'Interactive Elements'],
      useCases: ['Content Display', 'Product Showcase', 'Blog Posts', 'Feature Lists'],
      dependencies: [...COMMON_DEPENDENCIES.core, ...COMMON_DEPENDENCIES.icons],
      implementationNotes: ['Flexible sizing', 'Multiple variations', 'Smooth transitions', 'Accessible interactions']
    })
  }))

  return {
    id: 'card-layout',
    name: 'Card Layout',
    description: 'Card layout components with various styles and interactions',
    category: 'content-display',
    variations,
    tags: ['card', 'content-display', 'layout', 'interactive']
  }
}

export const CARD_LAYOUT_PANEL_WITH_VARIATIONS = createCardLayoutPanel()
