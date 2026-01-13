// Hero Section templates - Image, Video, Gradient, Split
// 4 variations

import type { ExtendedPanel, TemplateVariation } from './template-registry'
import { createTemplateMetadata } from './template-converter'
import { COMMON_DEPENDENCIES } from './template-registry'

const HERO_SECTION_TEMPLATES = [
  {
    id: 1,
    name: "Image Hero Section",
    description: "Hero with background image and overlay",
    style: "minimal" as const,
    code: 'import { ArrowRight } from "lucide-react"\n\nexport default function ImageHeroSection() {\n  return (\n    <div className="relative w-full h-96 overflow-hidden rounded-lg">\n      <div\n        className="absolute inset-0 bg-cover bg-center"\n        style={{\n          backgroundImage: "url(\'https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200&h=400&fit=crop\')",\n        }}\n      />\n      <div className="absolute inset-0 bg-black/40" />\n      \n      <div className="relative h-full flex flex-col items-center justify-center text-center px-4">\n        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-primary-foreground mb-4">\n          Welcome to Our Platform\n        </h1>\n        <p className="text-sm sm:text-base md:text-lg text-primary-foreground/90 mb-8 max-w-2xl">\n          Discover amazing features and transform your workflow\n        </p>\n        <button className="flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium text-sm sm:text-base">\n          Get Started\n          <ArrowRight className="h-4 w-4" />\n        </button>\n      </div>\n    </div>\n  )\n}',
  },
  {
    id: 2,
    name: "Video Hero Section",
    description: "Hero with background video",
    style: "modern" as const,
    code: 'import { Play } from "lucide-react"\n\nexport default function VideoHeroSection() {\n  return (\n    <div className="relative w-full h-96 overflow-hidden rounded-lg">\n      <video\n        autoPlay\n        muted\n        loop\n        className="absolute inset-0 w-full h-full object-cover"\n      >\n        <source src="https://videos.pexels.com/video-files/3571936/3571936-sd_640_360_25fps.mp4" type="video/mp4" />\n      </video>\n      <div className="absolute inset-0 bg-black/50" />\n      \n      <div className="relative h-full flex flex-col items-center justify-center text-center px-4">\n        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-primary-foreground mb-4">\n          Experience Innovation\n        </h1>\n        <p className="text-sm sm:text-base md:text-lg text-primary-foreground/90 mb-8 max-w-2xl">\n          Watch how our solution transforms businesses\n        </p>\n        <div className="flex flex-col sm:flex-row gap-2 sm:gap-4">\n          <button className="px-4 sm:px-6 py-2 sm:py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium text-sm sm:text-base">\n            Learn More\n          </button>\n          <button className="flex items-center justify-center sm:justify-start gap-2 px-4 sm:px-6 py-2 sm:py-3 border border-primary-foreground text-primary-foreground rounded-lg hover:bg-primary-foreground/10 transition-colors font-medium text-sm sm:text-base">\n            <Play className="h-4 w-4" />\n            Watch Demo\n          </button>\n        </div>\n      </div>\n    </div>\n  )\n}',
  },
  {
    id: 3,
    name: "Gradient Hero Section",
    description: "Hero with gradient background",
    style: "classic" as const,
    code: 'import { CheckCircle } from "lucide-react"\n\nexport default function GradientHeroSection() {\n  return (\n    <div className="relative w-full h-96 overflow-hidden rounded-lg bg-gradient-to-r from-primary via-accent to-secondary">\n      <div className="absolute inset-0 opacity-20">\n        <div className="absolute top-0 left-0 w-96 h-96 bg-primary-foreground rounded-full mix-blend-multiply filter blur-3xl" />\n        <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary-foreground rounded-full mix-blend-multiply filter blur-3xl" />\n      </div>\n      \n      <div className="relative h-full flex flex-col items-center justify-center text-center px-4">\n        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-primary-foreground mb-4">\n          Build Faster, Ship Smarter\n        </h1>\n        <p className="text-sm sm:text-base md:text-lg text-primary-foreground/90 mb-8 max-w-2xl">\n          Everything you need to create amazing digital experiences\n        </p>\n        <div className="grid grid-cols-3 gap-4 sm:gap-8 mb-8">\n          {["Fast", "Secure", "Scalable"].map(feature => (\n            <div key={feature} className="flex flex-col items-center">\n              <CheckCircle className="h-5 sm:h-6 w-5 sm:w-6 text-primary-foreground mb-2" />\n              <span className="text-primary-foreground font-medium text-xs sm:text-sm">{feature}</span>\n            </div>\n          ))}\n        </div>\n        <button className="px-6 sm:px-8 py-2 sm:py-3 bg-primary-foreground text-primary rounded-lg hover:bg-primary-foreground/90 transition-colors font-bold text-sm sm:text-base">\n          Start Free Trial\n        </button>\n      </div>\n    </div>\n  )\n}',
  },
  {
    id: 4,
    name: "Split Hero Section",
    description: "Hero with split content and image",
    style: "bold" as const,
    code: 'import { ArrowRight, Zap } from "lucide-react"\n\nexport default function SplitHeroSection() {\n  return (\n    <div className="w-full h-96 overflow-hidden rounded-lg bg-background border border-border">\n      <div className="h-full flex flex-col md:flex-row">\n        {/* Left Content */}\n        <div className="flex-1 flex flex-col justify-center px-4 sm:px-6 md:px-8 py-8 md:py-12">\n          <div className="flex items-center gap-2 mb-4">\n            <Zap className="h-5 w-5 text-primary" />\n            <span className="text-xs sm:text-sm font-semibold text-primary">New Feature</span>\n          </div>\n          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-4">\n            Powerful Solutions\n          </h1>\n          <p className="text-sm sm:text-base md:text-lg text-muted-foreground mb-8">\n            Streamline your workflow with our cutting-edge platform designed for modern teams.\n          </p>\n          <div className="flex flex-col sm:flex-row gap-2 sm:gap-4">\n            <button className="flex items-center justify-center sm:justify-start gap-2 px-4 sm:px-6 py-2 sm:py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium text-sm sm:text-base">\n              Get Started\n              <ArrowRight className="h-4 w-4" />\n            </button>\n            <button className="px-4 sm:px-6 py-2 sm:py-3 border border-border text-foreground rounded-lg hover:bg-accent transition-colors font-medium text-sm sm:text-base">\n              Learn More\n            </button>\n          </div>\n        </div>\n        \n        {/* Right Image */}\n        <div className="flex-1 hidden md:block">\n          <img\n            src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=400&fit=crop"\n            alt="Hero"\n            className="w-full h-full object-cover"\n          />\n        </div>\n      </div>\n    </div>\n  )\n}',
  }
]

export function createHeroSectionPanel(): ExtendedPanel {
  const variations: TemplateVariation[] = HERO_SECTION_TEMPLATES.map((template) => ({
    id: `hero-section-${template.style}-${template.id}`,
    name: template.name,
    description: template.description,
    style: template.style,
    code: template.code,
    metadata: createTemplateMetadata({
      complexity: 'moderate',
      features: ['Hero Section', 'Background Image/Video', 'Call-to-Action', 'Responsive Design'],
      useCases: ['Landing Pages', 'Homepage', 'Campaign Pages', 'Product Showcase'],
      dependencies: [...COMMON_DEPENDENCIES.core, ...COMMON_DEPENDENCIES.icons],
      implementationNotes: ['Responsive design', 'Multiple background options', 'CTA buttons', 'Overlay support']
    })
  }))

  return {
    id: 'hero-section',
    name: 'Hero Section',
    description: 'Hero section components with various background options',
    category: 'content-display',
    variations,
    tags: ['hero', 'content-display', 'landing-page', 'interactive']
  }
}

export const HERO_SECTION_PANEL_WITH_VARIATIONS = createHeroSectionPanel()
