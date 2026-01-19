import { ChevronLeft, ChevronRight, Play, Pause } from 'lucide-react'
import type { ExtendedPanel, TemplateVariation } from './template-registry'
import { createTemplateMetadata } from './template-converter'
import { COMMON_DEPENDENCIES } from './template-registry'

const IMAGE_SLIDER_TEMPLATES = [
  {
    id: 1,
    name: "Classic Slider",
    description: "Traditional image slider with navigation arrows",
    style: "minimal" as const,
    code: `import { useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

export default function ClassicSlider() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const slides = [
    { id: 1, src: "/slide1.jpg", alt: "Slide 1" },
    { id: 2, src: "/slide2.jpg", alt: "Slide 2" },
    { id: 3, src: "/slide3.jpg", alt: "Slide 3" },
  ]

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length)
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)

  return (
    <div className="relative w-full h-64 bg-accent rounded-lg overflow-hidden">
      <img src={slides[currentSlide].src} alt={slides[currentSlide].alt} className="w-full h-full object-cover" />
      <button onClick={prevSlide} className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-black/50 text-white rounded-full hover:bg-black/70">
        <ChevronLeft className="h-5 w-5" />
      </button>
      <button onClick={nextSlide} className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-black/50 text-white rounded-full hover:bg-black/70">
        <ChevronRight className="h-5 w-5" />
      </button>
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {slides.map((_, i) => (
          <button key={i} onClick={() => setCurrentSlide(i)} className={\`w-3 h-3 rounded-full \${i === currentSlide ? 'bg-white' : 'bg-white/50'}\`} />
        ))}
      </div>
    </div>
  )
}`,
  },
  {
    id: 2,
    name: "Modern Card Slider",
    description: "Card-based slider with progress indicators",
    style: "modern" as const,
    code: `import { useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

export default function ModernCardSlider() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const slides = [
    { id: 1, title: "Card 1", description: "Description 1" },
    { id: 2, title: "Card 2", description: "Description 2" },
    { id: 3, title: "Card 3", description: "Description 3" },
  ]

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="bg-card border border-border rounded-xl p-6 mb-4">
        <h3 className="text-xl font-semibold mb-2">{slides[currentSlide].title}</h3>
        <p className="text-muted-foreground">{slides[currentSlide].description}</p>
      </div>
      <div className="flex items-center justify-between">
        <div className="flex gap-2">
          {slides.map((_, i) => (
            <div key={i} className={\`h-2 w-8 rounded-full \${i === currentSlide ? 'bg-primary' : 'bg-border'}\`} />
          ))}
        </div>
        <div className="flex gap-2">
          <button onClick={() => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)} className="p-2 bg-accent rounded-lg">
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button onClick={() => setCurrentSlide((prev) => (prev + 1) % slides.length)} className="p-2 bg-accent rounded-lg">
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  )
}`,
  },
  {
    id: 3,
    name: "Thumbnail Slider",
    description: "Slider with thumbnail navigation",
    style: "classic" as const,
    code: `import { useState } from "react"

export default function ThumbnailSlider() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const slides = [
    { id: 1, src: "/slide1.jpg", thumb: "/thumb1.jpg", title: "Image 1" },
    { id: 2, src: "/slide2.jpg", thumb: "/thumb2.jpg", title: "Image 2" },
    { id: 3, src: "/slide3.jpg", thumb: "/thumb3.jpg", title: "Image 3" },
    { id: 4, src: "/slide4.jpg", thumb: "/thumb4.jpg", title: "Image 4" },
  ]

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="relative h-64 bg-accent rounded-lg overflow-hidden mb-4">
        <img src={slides[currentSlide].src} alt={slides[currentSlide].title} className="w-full h-full object-cover" />
        <div className="absolute bottom-4 left-4 bg-black/50 text-white px-3 py-1 rounded">
          {slides[currentSlide].title}
        </div>
      </div>
      <div className="grid grid-cols-4 gap-2">
        {slides.map((slide, i) => (
          <button key={slide.id} onClick={() => setCurrentSlide(i)} className={\`h-16 rounded bg-accent overflow-hidden \${i === currentSlide ? 'ring-2 ring-primary' : 'opacity-70'}\`}>
            <img src={slide.thumb} alt={slide.title} className="w-full h-full object-cover" />
          </button>
        ))}
      </div>
    </div>
  )
}`,
  },
  {
    id: 4,
    name: "Auto-Play Slider",
    description: "Automated slideshow with play/pause controls",
    style: "bold" as const,
    code: `import { useState, useEffect } from "react"
import { Play, Pause } from "lucide-react"

export default function AutoPlaySlider() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const slides = [
    { id: 1, src: "/slide1.jpg", title: "Auto Slide 1" },
    { id: 2, src: "/slide2.jpg", title: "Auto Slide 2" },
    { id: 3, src: "/slide3.jpg", title: "Auto Slide 3" },
  ]

  useEffect(() => {
    if (isPlaying) {
      const interval = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % slides.length)
      }, 3000)
      return () => clearInterval(interval)
    }
  }, [isPlaying, slides.length])

  return (
    <div className="relative w-full h-64 bg-accent rounded-lg overflow-hidden">
      <img src={slides[currentSlide].src} alt={slides[currentSlide].title} className="w-full h-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
        <div className="p-6 w-full">
          <h3 className="text-white text-xl font-bold mb-2">{slides[currentSlide].title}</h3>
          <div className="flex items-center justify-between">
            <button onClick={() => setIsPlaying(!isPlaying)} className="flex items-center gap-2 px-4 py-2 bg-white/20 text-white rounded-lg hover:bg-white/30">
              {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
              {isPlaying ? 'Pause' : 'Play'}
            </button>
            <div className="flex items-center gap-2 text-white text-sm">
              <span>{currentSlide + 1} / {slides.length}</span>
              <div className="w-16 h-1 bg-white/30 rounded-full overflow-hidden">
                <div className="h-full bg-white rounded-full transition-all" style={{ width: \`\${((currentSlide + 1) / slides.length) * 100}%\` }} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}`
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
      features: ['Image Slider', 'Navigation Controls', 'Auto-play', 'Responsive'],
      useCases: ['Hero Sections', 'Product Showcase', 'Portfolio', 'Banner Carousel'],
      dependencies: [...COMMON_DEPENDENCIES.core, ...COMMON_DEPENDENCIES.icons],
      implementationNotes: ['Multiple navigation styles', 'Auto-play functionality', 'Touch/swipe support', 'Keyboard navigation']
    })
  }))

  return {
    id: 'image-slider',
    name: 'Image Slider',
    description: 'Image Slider component templates with various navigation styles',
    category: 'media-gallery',
    variations,
    tags: ['media', 'slider', 'carousel', 'images']
  }
}

export const IMAGE_SLIDER_PANEL_WITH_VARIATIONS = createImageSliderPanel()