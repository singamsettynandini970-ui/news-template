import { useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import type { ExtendedPanel, TemplateVariation } from './template-registry'
import { createTemplateMetadata } from './template-converter'
import { COMMON_DEPENDENCIES } from './template-registry'

const IMAGE_SLIDER_TEMPLATES = [
  {
    id: 1,
    name: "Fade Slider",
    description: "Image slider with fade transition",
    style: "minimal" as const,
    code: 'import { useState } from "react"\n\nexport default function FadeSlider() {\n  const [current, setCurrent] = useState(0)\n  const images = ["/slide1.jpg", "/slide2.jpg", "/slide3.jpg"]\n\n  return (\n    <div className="w-full max-w-2xl">\n      <div className="relative w-full bg-accent rounded-lg overflow-hidden aspect-video">\n        {images.map((img, idx) => (\n          <img\n            key={idx}\n            src={img}\n            alt="Slide"\n            className={"absolute inset-0 w-full h-full object-cover transition-opacity duration-500 " + (idx === current ? "opacity-100" : "opacity-0")}\n          />\n        ))}\n        <div className="absolute inset-0 flex items-center justify-between px-4">\n          <button\n            onClick={() => setCurrent((current - 1 + images.length) % images.length)}\n            className="p-2 bg-black/50 hover:bg-black/70 rounded-full text-white transition-colors"\n          >\n            ❮\n          </button>\n          <button\n            onClick={() => setCurrent((current + 1) % images.length)}\n            className="p-2 bg-black/50 hover:bg-black/70 rounded-full text-white transition-colors"\n          >\n            ❯\n          </button>\n        </div>\n      </div>\n      <div className="flex gap-2 mt-4 justify-center">\n        {images.map((_, i) => (\n          <button\n            key={i}\n            onClick={() => setCurrent(i)}\n            className={"h-2 rounded-full transition-colors " + (i === current ? "w-8 bg-primary" : "w-2 bg-border")}\n          />\n        ))}\n      </div>\n    </div>\n  )\n}',
  },
  {
    id: 2,
    name: "Slide Slider",
    description: "Image slider with slide transition",
    style: "modern" as const,
    code: 'import { useState } from "react"\nimport { ChevronLeft, ChevronRight } from "lucide-react"\n\nexport default function SlideSlider() {\n  const [current, setCurrent] = useState(0)\n  const images = ["/slide1.jpg", "/slide2.jpg", "/slide3.jpg", "/slide4.jpg"]\n\n  return (\n    <div className="w-full max-w-2xl">\n      <div className="relative w-full bg-accent rounded-lg overflow-hidden aspect-video">\n        <div\n          className="flex transition-transform duration-500"\n          style={{ transform: "translateX(-" + (current * 100) + "%)" }}\n        >\n          {images.map((img, idx) => (\n            <img\n              key={idx}\n              src={img}\n              alt="Slide"\n              className="w-full h-full object-cover flex-shrink-0"\n            />\n          ))}\n        </div>\n        <button\n          onClick={() => setCurrent((current - 1 + images.length) % images.length)}\n          className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-primary text-primary-foreground rounded-full hover:bg-primary/90 transition-colors"\n        >\n          <ChevronLeft className="h-5 w-5" />\n        </button>\n        <button\n          onClick={() => setCurrent((current + 1) % images.length)}\n          className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-primary text-primary-foreground rounded-full hover:bg-primary/90 transition-colors"\n        >\n          <ChevronRight className="h-5 w-5" />\n        </button>\n      </div>\n      <div className="flex items-center justify-between mt-4">\n        <span className="text-sm text-muted-foreground">{current + 1} / {images.length}</span>\n        <div className="flex gap-1">\n          {images.map((_, i) => (\n            <button\n              key={i}\n              onClick={() => setCurrent(i)}\n              className={"h-1 rounded-full transition-all " + (i === current ? "w-8 bg-primary" : "w-2 bg-border")}\n            />\n          ))}\n        </div>\n      </div>\n    </div>\n  )\n}',
  },
  {
    id: 3,
    name: "Zoom Slider",
    description: "Image slider with zoom effect",
    style: "classic" as const,
    code: 'import { useState } from "react"\n\nexport default function ZoomSlider() {\n  const [current, setCurrent] = useState(0)\n  const images = ["/slide1.jpg", "/slide2.jpg", "/slide3.jpg"]\n\n  return (\n    <div className="w-full max-w-2xl">\n      <div className="relative w-full bg-accent rounded-lg overflow-hidden aspect-video">\n        {images.map((img, idx) => (\n          <img\n            key={idx}\n            src={img}\n            alt="Slide"\n            className={"absolute inset-0 w-full h-full object-cover transition-transform duration-700 " + (idx === current ? "scale-100" : "scale-110")}\n          />\n        ))}\n        <div className="absolute inset-0 flex items-center justify-between px-4">\n          <button\n            onClick={() => setCurrent((current - 1 + images.length) % images.length)}\n            className="p-2 bg-white/20 hover:bg-white/40 rounded-full text-white backdrop-blur transition-colors"\n          >\n            ❮\n          </button>\n          <button\n            onClick={() => setCurrent((current + 1) % images.length)}\n            className="p-2 bg-white/20 hover:bg-white/40 rounded-full text-white backdrop-blur transition-colors"\n          >\n            ❯\n          </button>\n        </div>\n      </div>\n      <div className="flex gap-3 mt-4 justify-center">\n        {images.map((_, i) => (\n          <button\n            key={i}\n            onClick={() => setCurrent(i)}\n            className={"transition-all " + (i === current ? "w-8 h-2 bg-primary rounded-full" : "w-2 h-2 bg-border rounded-full hover:bg-muted-foreground")}\n          />\n        ))}\n      </div>\n    </div>\n  )\n}',
  },
  {
    id: 4,
    name: "Thumbnail Slider",
    description: "Image slider with thumbnail navigation",
    style: "bold" as const,
    code: 'import { useState } from "react"\n\nexport default function ThumbnailSlider() {\n  const [current, setCurrent] = useState(0)\n  const images = [\n    { src: "/slide1.jpg", title: "Slide 1" },\n    { src: "/slide2.jpg", title: "Slide 2" },\n    { src: "/slide3.jpg", title: "Slide 3" },\n    { src: "/slide4.jpg", title: "Slide 4" },\n  ]\n\n  return (\n    <div className="w-full max-w-2xl space-y-4">\n      <div className="relative w-full bg-accent rounded-lg overflow-hidden aspect-video">\n        <img\n          src={images[current].src}\n          alt={images[current].title}\n          className="w-full h-full object-cover"\n        />\n      </div>\n      <div>\n        <h3 className="text-lg font-semibold text-foreground mb-3">{images[current].title}</h3>\n        <div className="grid grid-cols-4 gap-2">\n          {images.map((img, idx) => (\n            <button\n              key={idx}\n              onClick={() => setCurrent(idx)}\n              className={"relative rounded-lg overflow-hidden aspect-square border-2 transition-all " + (idx === current ? "border-primary shadow-lg" : "border-border hover:border-muted-foreground")}\n            >\n              <img\n                src={img.src}\n                alt={img.title}\n                className="w-full h-full object-cover"\n              />\n            </button>\n          ))}\n        </div>\n      </div>\n    </div>\n  )\n}',
  }
]

export function createImageSliderPanel(): ExtendedPanel {
  const variations: TemplateVariation[] = IMAGE_SLIDER_TEMPLATES.map((template) => ({
    id: `image-slider-${template.style}-${template.id}`,
    name: template.name,
    description: template.description,
    style: template.style,
    code: template.code,
    metadata: createTemplateMetadata({
      complexity: 'moderate',
      features: ['Image Slider', 'Transitions', 'Navigation', 'Indicators'],
      useCases: ['Image Gallery', 'Product Showcase', 'Portfolio', 'Banners'],
      dependencies: [...COMMON_DEPENDENCIES.core, ...COMMON_DEPENDENCIES.icons],
      implementationNotes: ['Multiple transition effects', 'Thumbnail navigation', 'Responsive design', 'Keyboard support']
    })
  }))

  return {
    id: 'image-slider',
    name: 'Image Slider',
    description: 'Image Slider component templates with various transition effects',
    category: 'media-gallery',
    variations,
    tags: ['media', 'carousel', 'slider', 'images']
  }
}

export const IMAGE_SLIDER_PANEL_WITH_VARIATIONS = createImageSliderPanel()
