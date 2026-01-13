// Carousel templates - Auto, Manual, Dots, Arrows
// 4 variations

import type { ExtendedPanel, TemplateVariation } from './template-registry'
import { createTemplateMetadata } from './template-converter'
import { COMMON_DEPENDENCIES } from './template-registry'

const CAROUSEL_TEMPLATES = [
  {
    id: 1,
    name: "Auto Carousel",
    description: "Auto-scrolling carousel",
    style: "minimal" as const,
    code: 'import { useState, useEffect } from "react"\n\nexport default function AutoCarousel() {\n  const [current, setCurrent] = useState(0)\n  const items = ["Slide 1", "Slide 2", "Slide 3", "Slide 4"]\n\n  useEffect(() => {\n    const timer = setInterval(() => {\n      setCurrent(prev => (prev + 1) % items.length)\n    }, 3000)\n    return () => clearInterval(timer)\n  }, [items.length])\n\n  return (\n    <div className="w-full max-w-2xl">\n      <div className="relative h-48 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg overflow-hidden">\n        <div className="absolute inset-0 flex items-center justify-center">\n          <p className="text-4xl font-bold text-white">{items[current]}</p>\n        </div>\n      </div>\n      <div className="flex justify-center gap-2 mt-4">\n        {items.map((_, idx) => (\n          <button\n            key={idx}\n            className={`h-2 rounded-full transition-all ${\n              idx === current ? "w-8 bg-primary" : "w-2 bg-border"\n            }`}\n            onClick={() => setCurrent(idx)}\n          />\n        ))}\n      </div>\n    </div>\n  )\n}',
  },
  {
    id: 2,
    name: "Manual Carousel",
    description: "Carousel with manual controls",
    style: "modern" as const,
    code: 'import { useState } from "react"\nimport { ChevronLeft, ChevronRight } from "lucide-react"\n\nexport default function ManualCarousel() {\n  const [current, setCurrent] = useState(0)\n  const items = ["Item 1", "Item 2", "Item 3", "Item 4", "Item 5"]\n\n  const prev = () => setCurrent(prev => (prev - 1 + items.length) % items.length)\n  const next = () => setCurrent(prev => (prev + 1) % items.length)\n\n  return (\n    <div className="w-full max-w-2xl">\n      <div className="relative h-48 bg-accent rounded-lg overflow-hidden flex items-center justify-center">\n        <p className="text-2xl font-bold text-foreground">{items[current]}</p>\n      </div>\n      <div className="flex items-center justify-between mt-4">\n        <button\n          onClick={prev}\n          className="p-2 border border-border rounded-lg hover:bg-accent transition-colors"\n        >\n          <ChevronLeft className="h-5 w-5 text-foreground" />\n        </button>\n        <span className="text-sm text-muted-foreground">\n          {current + 1} / {items.length}\n        </span>\n        <button\n          onClick={next}\n          className="p-2 border border-border rounded-lg hover:bg-accent transition-colors"\n        >\n          <ChevronRight className="h-5 w-5 text-foreground" />\n        </button>\n      </div>\n    </div>\n  )\n}',
  },
  {
    id: 3,
    name: "Dots Carousel",
    description: "Carousel with dot indicators",
    style: "classic" as const,
    code: 'import { useState } from "react"\n\nexport default function DotsCarousel() {\n  const [current, setCurrent] = useState(0)\n  const items = [\n    { id: 1, color: "bg-red-500", label: "Red" },\n    { id: 2, color: "bg-blue-500", label: "Blue" },\n    { id: 3, color: "bg-green-500", label: "Green" },\n  ]\n\n  return (\n    <div className="w-full max-w-2xl">\n      <div className="relative h-48 rounded-lg overflow-hidden">\n        <div className={`absolute inset-0 transition-opacity duration-500 ${items[current].color}`} />\n        <div className="absolute inset-0 flex items-center justify-center">\n          <p className="text-3xl font-bold text-white">{items[current].label}</p>\n        </div>\n      </div>\n      <div className="flex justify-center gap-3 mt-4">\n        {items.map((_, idx) => (\n          <button\n            key={idx}\n            onClick={() => setCurrent(idx)}\n            className={`h-3 w-3 rounded-full transition-all ${\n              idx === current ? "bg-primary scale-125" : "bg-border hover:bg-muted-foreground"\n            }`}\n          />\n        ))}\n      </div>\n    </div>\n  )\n}',
  },
  {
    id: 4,
    name: "Arrow Carousel",
    description: "Carousel with arrow navigation",
    style: "bold" as const,
    code: 'import { useState } from "react"\nimport { ArrowLeft, ArrowRight } from "lucide-react"\n\nexport default function ArrowCarousel() {\n  const [current, setCurrent] = useState(0)\n  const items = Array.from({ length: 6 }, (_, i) => `Card ${i + 1}`)\n\n  const prev = () => setCurrent(prev => (prev - 1 + items.length) % items.length)\n  const next = () => setCurrent(prev => (prev + 1) % items.length)\n\n  return (\n    <div className="w-full max-w-2xl">\n      <div className="relative">\n        <div className="h-48 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">\n          <p className="text-2xl font-bold text-white">{items[current]}</p>\n        </div>\n        \n        <button\n          onClick={prev}\n          className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 p-2 bg-primary text-primary-foreground rounded-full hover:bg-primary/90 transition-colors shadow-lg"\n        >\n          <ArrowLeft className="h-5 w-5" />\n        </button>\n        \n        <button\n          onClick={next}\n          className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 p-2 bg-primary text-primary-foreground rounded-full hover:bg-primary/90 transition-colors shadow-lg"\n        >\n          <ArrowRight className="h-5 w-5" />\n        </button>\n      </div>\n      \n      <div className="flex justify-center gap-2 mt-4">\n        {items.map((_, idx) => (\n          <button\n            key={idx}\n            onClick={() => setCurrent(idx)}\n            className={`h-2 rounded-full transition-all ${\n              idx === current ? "w-6 bg-primary" : "w-2 bg-border"\n            }`}\n          />\n        ))}\n      </div>\n    </div>\n  )\n}',
  }
]

export function createCarouselPanel(): ExtendedPanel {
  const variations: TemplateVariation[] = CAROUSEL_TEMPLATES.map((template) => ({
    id: `carousel-${template.style}-${template.id}`,
    name: template.name,
    description: template.description,
    style: template.style,
    code: template.code,
    metadata: createTemplateMetadata({
      complexity: 'moderate',
      features: ['Carousel', 'Auto-scroll', 'Navigation', 'Indicators'],
      useCases: ['Image Galleries', 'Testimonials', 'Product Showcase', 'Banners'],
      dependencies: [...COMMON_DEPENDENCIES.core, ...COMMON_DEPENDENCIES.icons],
      implementationNotes: ['Auto-play support', 'Manual controls', 'Smooth transitions', 'Responsive']
    })
  }))

  return {
    id: 'carousel',
    name: 'Carousel',
    description: 'Carousel components with various navigation styles',
    category: 'content-display',
    variations,
    tags: ['carousel', 'content-display', 'interactive']
  }
}

export const CAROUSEL_PANEL_WITH_VARIATIONS = createCarouselPanel()
