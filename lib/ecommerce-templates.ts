import type { ExtendedPanel, TemplateVariation } from './template-registry'
import { createTemplateMetadata } from './template-converter'
import { COMMON_DEPENDENCIES } from './template-registry'

// Product Card Panel
const PRODUCT_CARD_TEMPLATES = [
  {
    id: 1,
    name: "Grid Simple",
    style: "minimal" as const,
    code: 'export default function ProductCardGrid() {\n  return (\n    <div className="w-full max-w-sm">\n      <div className="bg-background border border-border rounded-lg overflow-hidden">\n        <div className="bg-muted h-48" />\n        <div className="p-4">\n          <h3 className="font-semibold text-foreground">Product Name</h3>\n          <p className="text-sm text-muted-foreground mt-1">High quality product</p>\n          <div className="flex justify-between items-center mt-4">\n            <span className="text-lg font-bold text-foreground">$49.99</span>\n            <button className="bg-primary text-primary-foreground px-4 py-2 rounded hover:bg-primary/90">Add</button>\n          </div>\n        </div>\n      </div>\n    </div>\n  )\n}',
  },
  {
    id: 2,
    name: "List Modern",
    style: "modern" as const,
    code: 'export default function ProductCardList() {\n  return (\n    <div className="w-full">\n      <div className="flex gap-4 bg-gradient-to-r from-primary/5 to-accent/5 rounded-xl border border-border/50 overflow-hidden hover:shadow-lg transition-shadow">\n        <div className="w-32 h-32 bg-muted flex-shrink-0" />\n        <div className="flex-1 p-4 flex flex-col justify-between">\n          <div>\n            <h3 className="font-bold text-lg text-foreground">Premium Product</h3>\n            <p className="text-sm text-muted-foreground mt-1">Exceptional quality and design</p>\n            <div className="flex gap-1 mt-2">\n              {[...Array(5)].map((_, i) => <span key={i} className="text-yellow-500">★</span>)}\n            </div>\n          </div>\n          <div className="flex justify-between items-center">\n            <span className="text-2xl font-bold text-primary">$79.99</span>\n            <button className="bg-primary text-primary-foreground px-6 py-2 rounded-lg hover:bg-primary/90">Add to Cart</button>\n          </div>\n        </div>\n      </div>\n    </div>\n  )\n}',
  },
  {
    id: 3,
    name: "Featured Classic",
    style: "classic" as const,
    code: 'export default function ProductCardFeatured() {\n  return (\n    <div className="w-full max-w-sm">\n      <div className="bg-background border-2 border-border rounded-lg overflow-hidden">\n        <div className="relative">\n          <div className="bg-muted h-56" />\n          <span className="absolute top-4 right-4 bg-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded-full">Sale</span>\n        </div>\n        <div className="p-6">\n          <h3 className="text-xl font-bold text-foreground">Featured Item</h3>\n          <p className="text-sm text-muted-foreground mt-2">Limited time offer</p>\n          <div className="flex gap-2 mt-4">\n            <span className="text-lg font-bold text-foreground">$39.99</span>\n            <span className="text-lg text-muted-foreground line-through">$59.99</span>\n          </div>\n          <button className="w-full mt-4 bg-primary text-primary-foreground font-semibold py-2 rounded-lg hover:bg-primary/90">Buy Now</button>\n        </div>\n      </div>\n    </div>\n  )\n}',
  },
  {
    id: 4,
    name: "Quick View Bold",
    style: "bold" as const,
    code: 'export default function ProductCardQuickView() {\n  return (\n    <div className="w-full max-w-sm">\n      <div className="bg-primary text-primary-foreground rounded-xl overflow-hidden shadow-lg">\n        <div className="h-48 bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center">\n          <div className="text-6xl">📦</div>\n        </div>\n        <div className="p-6">\n          <h3 className="text-2xl font-black">Exclusive Deal</h3>\n          <p className="text-primary-foreground/80 mt-2">Limited stock available</p>\n          <div className="flex items-baseline gap-2 mt-4">\n            <span className="text-4xl font-black">$29.99</span>\n            <span className="text-lg line-through text-primary-foreground/60">$99.99</span>\n          </div>\n          <button className="w-full mt-6 bg-primary-foreground text-primary font-bold py-3 rounded-lg hover:bg-primary-foreground/90">\n            Quick View\n          </button>\n        </div>\n      </div>\n    </div>\n  )\n}',
  }
]

export function createProductCardPanel(): ExtendedPanel {
  const variations: TemplateVariation[] = PRODUCT_CARD_TEMPLATES.map((template) => ({
    id: `product-card-${template.style}-${template.id}`,
    name: template.name,
    description: `Product Card - ${template.name}`,
    style: template.style,
    code: template.code,
    metadata: createTemplateMetadata({
      complexity: 'simple',
      features: ['Product Display', 'Price', 'Rating', 'Add to Cart'],
      useCases: ['Product Listing', 'E-commerce', 'Catalog', 'Shop'],
      dependencies: [...COMMON_DEPENDENCIES.core],
    })
  }))

  return {
    id: 'product-card',
    name: 'Product Card',
    description: 'Product Card component templates',
    category: 'ecommerce',
    variations,
    tags: ['product', 'ecommerce', 'card']
  }
}

export const PRODUCT_CARD_PANEL_WITH_VARIATIONS = createProductCardPanel()

// Shopping Cart Panel
const SHOPPING_CART_TEMPLATES = [
  {
    id: 1,
    name: "Dropdown Simple",
    style: "minimal" as const,
    code: 'export default function ShoppingCartDropdown() {\n  return (\n    <div className="w-full max-w-sm">\n      <div className="bg-background border border-border rounded-lg p-4">\n        <h3 className="font-semibold text-foreground mb-4">Cart (3 items)</h3>\n        <div className="space-y-3 mb-4">\n          <div className="flex justify-between text-sm">\n            <span className="text-foreground">Product 1</span>\n            <span className="text-foreground">$29.99</span>\n          </div>\n          <div className="flex justify-between text-sm">\n            <span className="text-foreground">Product 2</span>\n            <span className="text-foreground">$49.99</span>\n          </div>\n        </div>\n        <div className="border-t border-border pt-3 mb-4">\n          <div className="flex justify-between font-bold text-foreground">\n            <span>Total:</span>\n            <span>$79.98</span>\n          </div>\n        </div>\n        <button className="w-full bg-primary text-primary-foreground py-2 rounded hover:bg-primary/90">Checkout</button>\n      </div>\n    </div>\n  )\n}',
  },
  {
    id: 2,
    name: "Sidebar Modern",
    style: "modern" as const,
    code: 'export default function ShoppingCartSidebar() {\n  return (\n    <div className="w-full max-w-sm">\n      <div className="bg-gradient-to-br from-primary/5 to-accent/5 rounded-xl border border-border/50 p-6">\n        <div className="flex items-center justify-between mb-6">\n          <h3 className="text-xl font-bold text-foreground">Shopping Cart</h3>\n          <span className="bg-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded-full">3</span>\n        </div>\n        <div className="space-y-4 mb-6">\n          <div className="flex gap-3 pb-4 border-b border-border/50">\n            <div className="w-16 h-16 bg-muted rounded-lg" />\n            <div className="flex-1">\n              <p className="font-semibold text-foreground">Item 1</p>\n              <p className="text-sm text-muted-foreground">Qty: 1</p>\n              <p className="text-sm font-bold text-primary mt-1">$29.99</p>\n            </div>\n          </div>\n        </div>\n        <div className="bg-background rounded-lg p-4 mb-4">\n          <div className="flex justify-between text-foreground mb-2">\n            <span>Subtotal:</span>\n            <span>$79.98</span>\n          </div>\n          <div className="flex justify-between font-bold text-foreground">\n            <span>Total:</span>\n            <span className="text-primary">$89.98</span>\n          </div>\n        </div>\n        <button className="w-full bg-primary text-primary-foreground font-semibold py-3 rounded-lg hover:bg-primary/90">Proceed to Checkout</button>\n      </div>\n    </div>\n  )\n}',
  },
  {
    id: 3,
    name: "Modal Classic",
    style: "classic" as const,
    code: 'export default function ShoppingCartModal() {\n  return (\n    <div className="w-full max-w-md">\n      <div className="bg-background border-2 border-border rounded-lg p-6">\n        <h2 className="text-2xl font-bold text-foreground mb-6">Your Cart</h2>\n        <div className="space-y-4 mb-6 max-h-64 overflow-y-auto">\n          <div className="flex justify-between items-center pb-4 border-b border-border">\n            <div>\n              <p className="font-semibold text-foreground">Product Name</p>\n              <p className="text-sm text-muted-foreground">Qty: 1</p>\n            </div>\n            <p className="font-bold text-foreground">$49.99</p>\n          </div>\n        </div>\n        <div className="border-t-2 border-border pt-4 mb-6">\n          <div className="flex justify-between text-lg font-bold text-foreground">\n            <span>Total:</span>\n            <span>$49.99</span>\n          </div>\n        </div>\n        <div className="flex gap-3">\n          <button className="flex-1 border-2 border-border text-foreground py-2 rounded-lg hover:bg-muted">Continue Shopping</button>\n          <button className="flex-1 bg-primary text-primary-foreground py-2 rounded-lg hover:bg-primary/90">Checkout</button>\n        </div>\n      </div>\n    </div>\n  )\n}',
  },
  {
    id: 4,
    name: "Mini Bold",
    style: "bold" as const,
    code: 'export default function ShoppingCartMini() {\n  return (\n    <div className="w-full max-w-sm">\n      <div className="bg-primary text-primary-foreground rounded-xl p-6 shadow-lg">\n        <div className="flex items-center justify-between mb-6">\n          <h3 className="text-2xl font-black">Cart</h3>\n          <span className="bg-primary-foreground text-primary text-lg font-black w-8 h-8 rounded-full flex items-center justify-center">3</span>\n        </div>\n        <div className="bg-primary-foreground/10 rounded-lg p-4 mb-6">\n          <p className="text-lg font-bold">Subtotal</p>\n          <p className="text-4xl font-black mt-2">$89.98</p>\n        </div>\n        <button className="w-full bg-primary-foreground text-primary font-black py-3 rounded-lg hover:bg-primary-foreground/90 text-lg">\n          CHECKOUT NOW\n        </button>\n      </div>\n    </div>\n  )\n}',
  }
]

export function createShoppingCartPanel(): ExtendedPanel {
  const variations: TemplateVariation[] = SHOPPING_CART_TEMPLATES.map((template) => ({
    id: `shopping-cart-${template.style}-${template.id}`,
    name: template.name,
    description: `Shopping Cart - ${template.name}`,
    style: template.style,
    code: template.code,
    metadata: createTemplateMetadata({
      complexity: 'moderate',
      features: ['Cart Display', 'Item List', 'Total', 'Checkout'],
      useCases: ['E-commerce', 'Shopping', 'Checkout', 'Cart Page'],
      dependencies: [...COMMON_DEPENDENCIES.core],
    })
  }))

  return {
    id: 'shopping-cart',
    name: 'Shopping Cart',
    description: 'Shopping Cart component templates',
    category: 'ecommerce',
    variations,
    tags: ['cart', 'shopping', 'ecommerce']
  }
}

export const SHOPPING_CART_PANEL_WITH_VARIATIONS = createShoppingCartPanel()

// Product Gallery Panel
const PRODUCT_GALLERY_TEMPLATES = [
  {
    id: 1,
    name: "Zoom Simple",
    style: "minimal" as const,
    code: 'export default function ProductGalleryZoom() {\n  return (\n    <div className="w-full max-w-md">\n      <div className="bg-background border border-border rounded-lg overflow-hidden">\n        <div className="bg-muted h-96 hover:scale-110 transition-transform duration-300" />\n        <div className="p-4 grid grid-cols-4 gap-2">\n          {[...Array(4)].map((_, i) => <div key={i} className="bg-muted h-16 rounded cursor-pointer hover:border-2 hover:border-primary" />)}\n        </div>\n      </div>\n    </div>\n  )\n}',
  },
  {
    id: 2,
    name: "Thumbnail Modern",
    style: "modern" as const,
    code: 'export default function ProductGalleryThumbnail() {\n  return (\n    <div className="w-full">\n      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">\n        <div className="bg-gradient-to-br from-primary/10 to-accent/10 rounded-xl overflow-hidden border border-border/50">\n          <div className="bg-muted h-96" />\n        </div>\n        <div className="grid grid-cols-2 gap-3">\n          {[...Array(4)].map((_, i) => <div key={i} className="bg-muted h-24 rounded-lg border-2 border-border/50 hover:border-primary cursor-pointer transition-colors" />)}\n        </div>\n      </div>\n    </div>\n  )\n}',
  },
  {
    id: 3,
    name: "360 Classic",
    style: "classic" as const,
    code: 'export default function ProductGallery360() {\n  return (\n    <div className="w-full max-w-md">\n      <div className="bg-background border-2 border-border rounded-lg overflow-hidden">\n        <div className="bg-muted h-80 flex items-center justify-center">\n          <p className="text-muted-foreground">360° View</p>\n        </div>\n        <div className="p-4">\n          <p className="text-sm font-semibold text-foreground">Rotate to view product</p>\n          <div className="flex gap-2 mt-3">\n            {[...Array(6)].map((_, i) => <button key={i} className="flex-1 h-12 bg-border rounded hover:bg-primary/50" />)}\n          </div>\n        </div>\n      </div>\n    </div>\n  )\n}',
  },
  {
    id: 4,
    name: "Video Bold",
    style: "bold" as const,
    code: 'export default function ProductGalleryVideo() {\n  return (\n    <div className="w-full">\n      <div className="bg-primary text-primary-foreground rounded-xl overflow-hidden shadow-lg">\n        <div className="h-96 bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center">\n          <div className="text-6xl">▶</div>\n        </div>\n        <div className="p-6">\n          <h3 className="text-2xl font-black">Product Video</h3>\n          <p className="text-primary-foreground/80 mt-2">Watch our product in action</p>\n          <button className="mt-4 bg-primary-foreground text-primary font-bold px-8 py-3 rounded-lg hover:bg-primary-foreground/90">\n            Play Video\n          </button>\n        </div>\n      </div>\n    </div>\n  )\n}',
  }
]

export function createProductGalleryPanel(): ExtendedPanel {
  const variations: TemplateVariation[] = PRODUCT_GALLERY_TEMPLATES.map((template) => ({
    id: `product-gallery-${template.style}-${template.id}`,
    name: template.name,
    description: `Product Gallery - ${template.name}`,
    style: template.style,
    code: template.code,
    metadata: createTemplateMetadata({
      complexity: 'moderate',
      features: ['Image Gallery', 'Zoom', 'Thumbnails', 'Navigation'],
      useCases: ['Product Page', 'E-commerce', 'Image Showcase', 'Portfolio'],
      dependencies: [...COMMON_DEPENDENCIES.core],
    })
  }))

  return {
    id: 'product-gallery',
    name: 'Product Gallery',
    description: 'Product Gallery component templates',
    category: 'ecommerce',
    variations,
    tags: ['gallery', 'product', 'images']
  }
}

export const PRODUCT_GALLERY_PANEL_WITH_VARIATIONS = createProductGalleryPanel()

// Price Display Panel
const PRICE_DISPLAY_TEMPLATES = [
  {
    id: 1,
    name: "Simple Display",
    style: "minimal" as const,
    code: 'export default function PriceDisplaySimple() {\n  return (\n    <div className="w-full">\n      <div className="text-center">\n        <p className="text-sm text-muted-foreground">Price</p>\n        <p className="text-4xl font-bold text-foreground mt-2">$49.99</p>\n        <p className="text-xs text-muted-foreground mt-2">Free shipping on orders over $100</p>\n      </div>\n    </div>\n  )\n}',
  },
  {
    id: 2,
    name: "Comparison Modern",
    style: "modern" as const,
    code: 'export default function PriceDisplayComparison() {\n  return (\n    <div className="w-full">\n      <div className="bg-gradient-to-r from-primary/10 to-accent/10 rounded-xl p-6 border border-border/50">\n        <div className="flex items-baseline gap-3">\n          <span className="text-5xl font-black text-primary">$29.99</span>\n          <span className="text-2xl text-muted-foreground line-through">$99.99</span>\n          <span className="bg-red-500 text-white text-sm font-bold px-3 py-1 rounded-full">70% OFF</span>\n        </div>\n        <p className="text-sm text-muted-foreground mt-4">Limited time offer - Ends in 2 days</p>\n      </div>\n    </div>\n  )\n}',
  },
  {
    id: 3,
    name: "Discount Classic",
    style: "classic" as const,
    code: 'export default function PriceDisplayDiscount() {\n  return (\n    <div className="w-full max-w-sm">\n      <div className="bg-background border-2 border-border rounded-lg p-6">\n        <div className="text-center">\n          <p className="text-sm font-semibold text-foreground">Regular Price</p>\n          <p className="text-2xl text-muted-foreground line-through">$99.99</p>\n          <p className="text-sm font-semibold text-foreground mt-4">Sale Price</p>\n          <p className="text-4xl font-bold text-primary">$49.99</p>\n          <p className="text-sm text-green-600 font-semibold mt-2">You save $50.00 (50%)</p>\n        </div>\n      </div>\n    </div>\n  )\n}',
  },
  {
    id: 4,
    name: "Bundle Bold",
    style: "bold" as const,
    code: 'export default function PriceDisplayBundle() {\n  return (\n    <div className="w-full">\n      <div className="bg-primary text-primary-foreground rounded-xl p-8 shadow-lg">\n        <h3 className="text-2xl font-black mb-4">Bundle Deal</h3>\n        <div className="bg-primary-foreground/10 rounded-lg p-4 mb-6">\n          <p className="text-lg font-bold">Get 3 items for</p>\n          <p className="text-5xl font-black mt-2">$99.99</p>\n          <p className="text-sm text-primary-foreground/80 mt-2">Save $50 on bundle</p>\n        </div>\n        <button className="w-full bg-primary-foreground text-primary font-black py-3 rounded-lg hover:bg-primary-foreground/90">\n          Add Bundle to Cart\n        </button>\n      </div>\n    </div>\n  )\n}',
  }
]

export function createPriceDisplayPanel(): ExtendedPanel {
  const variations: TemplateVariation[] = PRICE_DISPLAY_TEMPLATES.map((template) => ({
    id: `price-display-${template.style}-${template.id}`,
    name: template.name,
    description: `Price Display - ${template.name}`,
    style: template.style,
    code: template.code,
    metadata: createTemplateMetadata({
      complexity: 'simple',
      features: ['Price Display', 'Discount', 'Comparison', 'Savings'],
      useCases: ['Product Page', 'E-commerce', 'Pricing', 'Promotions'],
      dependencies: [...COMMON_DEPENDENCIES.core],
    })
  }))

  return {
    id: 'price-display',
    name: 'Price Display',
    description: 'Price Display component templates',
    category: 'ecommerce',
    variations,
    tags: ['price', 'discount', 'ecommerce']
  }
}

export const PRICE_DISPLAY_PANEL_WITH_VARIATIONS = createPriceDisplayPanel()
