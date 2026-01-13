import { Eye, Heart, Share2, ZoomIn } from 'lucide-react'
import type { ExtendedPanel, TemplateVariation } from './template-registry'
import { createTemplateMetadata } from './template-converter'
import { COMMON_DEPENDENCIES } from './template-registry'

const PHOTO_GALLERY_TEMPLATES = [
  {
    id: 1,
    name: "Grid Layout",
    description: "Photo gallery with grid layout",
    style: "minimal" as const,
    code: 'export default function GridGallery() {\n  const images = [\n    { id: 1, src: "/image1.jpg", alt: "Gallery image 1" },\n    { id: 2, src: "/image2.jpg", alt: "Gallery image 2" },\n    { id: 3, src: "/image3.jpg", alt: "Gallery image 3" },\n    { id: 4, src: "/image4.jpg", alt: "Gallery image 4" },\n  ]\n\n  return (\n    <div className="w-full bg-background p-6">\n      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">\n        {images.map((image) => (\n          <div key={image.id} className="group relative overflow-hidden rounded-lg bg-accent aspect-square cursor-pointer">\n            <img src={image.src} alt={image.alt} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />\n            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300 flex items-center justify-center">\n              <button className="opacity-0 group-hover:opacity-100 transition-opacity px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium">View</button>\n            </div>\n          </div>\n        ))}\n      </div>\n    </div>\n  )\n}',
  },
  {
    id: 2,
    name: "Masonry Layout",
    description: "Photo gallery with masonry layout",
    style: "modern" as const,
    code: 'export default function MasonryGallery() {\n  const images = [\n    { id: 1, src: "/image1.jpg", alt: "Gallery image 1", span: "col-span-2 row-span-2" },\n    { id: 2, src: "/image2.jpg", alt: "Gallery image 2" },\n    { id: 3, src: "/image3.jpg", alt: "Gallery image 3" },\n    { id: 4, src: "/image4.jpg", alt: "Gallery image 4" },\n    { id: 5, src: "/image5.jpg", alt: "Gallery image 5" },\n    { id: 6, src: "/image6.jpg", alt: "Gallery image 6", span: "col-span-2" },\n  ]\n\n  return (\n    <div className="w-full bg-background p-6">\n      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 auto-rows-max">\n        {images.map((image) => (\n          <div key={image.id} className={"group relative overflow-hidden rounded-lg bg-accent aspect-square cursor-pointer " + (image.span || "")}>\n            <img src={image.src} alt={image.alt} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />\n            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-colors duration-300 flex items-center justify-center">\n              <ZoomIn className="opacity-0 group-hover:opacity-100 transition-opacity h-6 w-6 text-white" />\n            </div>\n          </div>\n        ))}\n      </div>\n    </div>\n  )\n}',
  },
  {
    id: 3,
    name: "Lightbox Gallery",
    description: "Photo gallery with lightbox modal",
    style: "classic" as const,
    code: 'import { useState } from "react"\nimport { X, ChevronLeft, ChevronRight } from "lucide-react"\n\nexport default function LightboxGallery() {\n  const [selectedId, setSelectedId] = useState(null)\n  const images = [\n    { id: 1, src: "/image1.jpg", alt: "Gallery image 1" },\n    { id: 2, src: "/image2.jpg", alt: "Gallery image 2" },\n    { id: 3, src: "/image3.jpg", alt: "Gallery image 3" },\n    { id: 4, src: "/image4.jpg", alt: "Gallery image 4" },\n  ]\n\n  const currentIndex = images.findIndex(img => img.id === selectedId)\n  const currentImage = images[currentIndex]\n\n  return (\n    <div className="w-full bg-background p-6">\n      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">\n        {images.map((image) => (\n          <button\n            key={image.id}\n            onClick={() => setSelectedId(image.id)}\n            className="group relative overflow-hidden rounded-lg bg-accent aspect-square cursor-pointer"\n          >\n            <img src={image.src} alt={image.alt} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />\n            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300" />\n          </button>\n        ))}\n      </div>\n\n      {selectedId && currentImage && (\n        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">\n          <div className="relative max-w-4xl w-full mx-4">\n            <img src={currentImage.src} alt={currentImage.alt} className="w-full h-auto rounded-lg" />\n            <button\n              onClick={() => setSelectedId(null)}\n              className="absolute top-4 right-4 p-2 bg-white/20 hover:bg-white/40 rounded-full text-white transition-colors"\n            >\n              <X className="h-6 w-6" />\n            </button>\n            {currentIndex > 0 && (\n              <button\n                onClick={() => setSelectedId(images[currentIndex - 1].id)}\n                className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-white/20 hover:bg-white/40 rounded-full text-white transition-colors"\n              >\n                <ChevronLeft className="h-6 w-6" />\n              </button>\n            )}\n            {currentIndex < images.length - 1 && (\n              <button\n                onClick={() => setSelectedId(images[currentIndex + 1].id)}\n                className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-white/20 hover:bg-white/40 rounded-full text-white transition-colors"\n              >\n                <ChevronRight className="h-6 w-6" />\n              </button>\n            )}\n          </div>\n        </div>\n      )}\n    </div>\n  )\n}',
  },
  {
    id: 4,
    name: "Carousel Gallery",
    description: "Photo gallery with carousel view",
    style: "bold" as const,
    code: 'import { useState } from "react"\nimport { Heart, Share2, Eye } from "lucide-react"\n\nexport default function CarouselGallery() {\n  const [current, setCurrent] = useState(0)\n  const images = [\n    { id: 1, src: "/image1.jpg", alt: "Gallery image 1", likes: 234, views: 1200 },\n    { id: 2, src: "/image2.jpg", alt: "Gallery image 2", likes: 456, views: 2100 },\n    { id: 3, src: "/image3.jpg", alt: "Gallery image 3", likes: 789, views: 3400 },\n  ]\n\n  const image = images[current]\n\n  return (\n    <div className="w-full max-w-2xl mx-auto">\n      <div className="relative bg-accent rounded-lg overflow-hidden aspect-video">\n        <img src={image.src} alt={image.alt} className="w-full h-full object-cover" />\n        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-between p-6">\n          <div className="flex justify-between items-start">\n            <div className="flex gap-3">\n              <button className="p-2 bg-white/20 hover:bg-white/40 rounded-full text-white transition-colors">\n                <Heart className="h-5 w-5" />\n              </button>\n              <button className="p-2 bg-white/20 hover:bg-white/40 rounded-full text-white transition-colors">\n                <Share2 className="h-5 w-5" />\n              </button>\n            </div>\n            <div className="flex items-center gap-2 px-3 py-1 bg-white/20 rounded-full text-white text-sm">\n              <Eye className="h-4 w-4" />\n              {image.views}\n            </div>\n          </div>\n          <div className="flex items-center justify-between">\n            <div className="flex items-center gap-2 text-white">\n              <Heart className="h-5 w-5 fill-current" />\n              <span className="font-medium">{image.likes}</span>\n            </div>\n            <div className="flex gap-2">\n              <button\n                onClick={() => setCurrent((current - 1 + images.length) % images.length)}\n                className="px-4 py-2 bg-white/20 hover:bg-white/40 rounded-lg text-white transition-colors"\n              >\n                ← Prev\n              </button>\n              <span className="px-4 py-2 text-white">{current + 1} / {images.length}</span>\n              <button\n                onClick={() => setCurrent((current + 1) % images.length)}\n                className="px-4 py-2 bg-white/20 hover:bg-white/40 rounded-lg text-white transition-colors"\n              >\n                Next →\n              </button>\n            </div>\n          </div>\n        </div>\n      </div>\n    </div>\n  )\n}',
  }
]

export function createPhotoGalleryPanel(): ExtendedPanel {
  const variations: TemplateVariation[] = PHOTO_GALLERY_TEMPLATES.map((template) => ({
    id: `photo-gallery-${template.style}-${template.id}`,
    name: template.name,
    description: template.description,
    style: template.style,
    code: template.code,
    metadata: createTemplateMetadata({
      complexity: 'moderate',
      features: ['Image Gallery', 'Multiple Layouts', 'Lightbox', 'Responsive'],
      useCases: ['Portfolio', 'Gallery', 'Product Showcase', 'Photography'],
      dependencies: [...COMMON_DEPENDENCIES.core, ...COMMON_DEPENDENCIES.icons],
      implementationNotes: ['Multiple layout options', 'Lightbox modal', 'Responsive grid', 'Hover effects']
    })
  }))

  return {
    id: 'photo-gallery',
    name: 'Photo Gallery',
    description: 'Photo Gallery component templates with multiple layout variations',
    category: 'media-gallery',
    variations,
    tags: ['media', 'gallery', 'images', 'portfolio']
  }
}

export const PHOTO_GALLERY_PANEL_WITH_VARIATIONS = createPhotoGalleryPanel()
