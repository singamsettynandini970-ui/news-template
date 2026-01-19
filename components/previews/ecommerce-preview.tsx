import React, { useState } from 'react'
import { ShoppingCart, Plus, Minus, Star, Heart, Filter, Grid, List, DollarSign, Package, CreditCard } from 'lucide-react'

const EcommercePreview = () => {
  const [cartItems, setCartItems] = useState(3)
  const [viewMode, setViewMode] = useState('grid')
  const [selectedProduct, setSelectedProduct] = useState(null)

  const products = [
    { id: 1, name: 'Premium Headphones', price: 299.99, originalPrice: 399.99, rating: 4.8, reviews: 124, image: '/api/placeholder/300/300', sale: true },
    { id: 2, name: 'Smart Watch Pro', price: 449.99, rating: 4.9, reviews: 89, image: '/api/placeholder/300/300', sale: false },
    { id: 3, name: 'Wireless Speaker', price: 199.99, originalPrice: 249.99, rating: 4.7, reviews: 156, image: '/api/placeholder/300/300', sale: true },
    { id: 4, name: 'Gaming Mouse', price: 79.99, rating: 4.6, reviews: 203, image: '/api/placeholder/300/300', sale: false },
    { id: 5, name: 'Laptop Stand', price: 89.99, originalPrice: 119.99, rating: 4.5, reviews: 67, image: '/api/placeholder/300/300', sale: true },
    { id: 6, name: 'USB-C Hub', price: 59.99, rating: 4.4, reviews: 98, image: '/api/placeholder/300/300', sale: false }
  ]

  const cartPreview = [
    { id: 1, name: 'Premium Headphones', price: 299.99, quantity: 1 },
    { id: 2, name: 'Smart Watch Pro', price: 449.99, quantity: 1 },
    { id: 3, name: 'Wireless Speaker', price: 199.99, quantity: 2 }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50 dark:from-gray-900 dark:via-gray-800 dark:to-green-900">
      {/* Header */}
      <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-b border-green-200 dark:border-gray-700 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                E-commerce Templates
              </h1>
              <p className="text-gray-600 dark:text-gray-300 text-sm">Complete shopping experience components</p>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
                className="p-2 rounded-lg bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 hover:bg-green-200 dark:hover:bg-green-900/50 transition-colors"
              >
                {viewMode === 'grid' ? <List className="h-4 w-4" /> : <Grid className="h-4 w-4" />}
              </button>
              <div className="relative">
                <button className="p-2 rounded-lg bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 hover:bg-green-200 dark:hover:bg-green-900/50 transition-colors">
                  <ShoppingCart className="h-4 w-4" />
                </button>
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cartItems}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Shopping Cart Section */}
        <div className="mb-12">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-green-100 dark:border-gray-700 overflow-hidden">
            <div className="p-6 border-b border-green-100 dark:border-gray-700">
              <h2 className="text-xl font-semibold text-gray-800 dark:text-white flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                Shopping Cart
              </h2>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-4">
                  {cartPreview.map((item) => (
                    <div key={item.id} className="flex items-center gap-4 p-4 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-gray-700 dark:to-gray-600 rounded-xl">
                      <div className="w-16 h-16 bg-gradient-to-br from-green-200 to-emerald-200 dark:from-gray-600 dark:to-gray-500 rounded-lg flex items-center justify-center">
                        <Package className="h-8 w-8 text-green-600 dark:text-green-400" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-800 dark:text-white">{item.name}</h3>
                        <p className="text-green-600 dark:text-green-400 font-medium">${item.price}</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <button className="w-8 h-8 bg-gray-200 dark:bg-gray-600 rounded-full flex items-center justify-center hover:bg-gray-300 dark:hover:bg-gray-500 transition-colors">
                          <Minus className="h-4 w-4" />
                        </button>
                        <span className="w-8 text-center font-medium text-gray-800 dark:text-white">{item.quantity}</span>
                        <button className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center hover:bg-green-600 transition-colors text-white">
                          <Plus className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="bg-gradient-to-br from-green-100 to-emerald-100 dark:from-gray-700 dark:to-gray-600 rounded-xl p-6">
                  <h3 className="font-semibold text-gray-800 dark:text-white mb-4">Order Summary</h3>
                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600 dark:text-gray-300">Subtotal</span>
                      <span className="text-gray-800 dark:text-white">$949.97</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600 dark:text-gray-300">Shipping</span>
                      <span className="text-gray-800 dark:text-white">$9.99</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600 dark:text-gray-300">Tax</span>
                      <span className="text-gray-800 dark:text-white">$76.00</span>
                    </div>
                    <hr className="border-gray-300 dark:border-gray-500" />
                    <div className="flex justify-between font-semibold">
                      <span className="text-gray-800 dark:text-white">Total</span>
                      <span className="text-green-600 dark:text-green-400">$1,035.96</span>
                    </div>
                  </div>
                  <button className="w-full bg-green-500 text-white py-3 rounded-lg hover:bg-green-600 transition-colors font-medium flex items-center justify-center gap-2">
                    <CreditCard className="h-4 w-4" />
                    Checkout
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Product Gallery */}
        <div className="mb-12">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-green-100 dark:border-gray-700 overflow-hidden">
            <div className="p-6 border-b border-green-100 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-gray-800 dark:text-white flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  Product Gallery
                </h2>
                <div className="flex items-center gap-2">
                  <Filter className="h-4 w-4 text-gray-500" />
                  <select className="text-sm border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-1 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300">
                    <option>All Products</option>
                    <option>Electronics</option>
                    <option>Accessories</option>
                    <option>Sale Items</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map((product) => (
                  <div key={product.id} className="group bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-700 dark:to-gray-600 rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300 border border-blue-100 dark:border-gray-600">
                    <div className="relative aspect-square bg-gradient-to-br from-blue-200 to-indigo-200 dark:from-gray-600 dark:to-gray-500 flex items-center justify-center">
                      <Package className="h-12 w-12 text-blue-600 dark:text-blue-400" />
                      {product.sale && (
                        <div className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                          SALE
                        </div>
                      )}
                      <button className="absolute top-2 right-2 p-2 bg-white/80 rounded-full hover:bg-white transition-colors">
                        <Heart className="h-4 w-4 text-gray-600" />
                      </button>
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-gray-800 dark:text-white mb-2">{product.name}</h3>
                      <div className="flex items-center gap-1 mb-2">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className={`h-4 w-4 ${i < Math.floor(product.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} />
                        ))}
                        <span className="text-sm text-gray-600 dark:text-gray-300 ml-1">
                          {product.rating} ({product.reviews})
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="text-lg font-bold text-green-600 dark:text-green-400">
                            ${product.price}
                          </span>
                          {product.originalPrice && (
                            <span className="text-sm text-gray-500 line-through">
                              ${product.originalPrice}
                            </span>
                          )}
                        </div>
                        <button className="bg-green-500 text-white p-2 rounded-lg hover:bg-green-600 transition-colors">
                          <ShoppingCart className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Price Display */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-green-100 dark:border-gray-700 overflow-hidden">
          <div className="p-6 border-b border-green-100 dark:border-gray-700">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white flex items-center gap-2">
              <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
              Price Display
            </h2>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Regular Price */}
              <div className="text-center p-6 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-600 rounded-xl">
                <DollarSign className="h-8 w-8 text-gray-600 dark:text-gray-400 mx-auto mb-3" />
                <h3 className="font-semibold text-gray-800 dark:text-white mb-2">Regular Price</h3>
                <div className="text-2xl font-bold text-gray-800 dark:text-white">$299.99</div>
              </div>

              {/* Sale Price */}
              <div className="text-center p-6 bg-gradient-to-br from-red-50 to-orange-50 dark:from-gray-700 dark:to-gray-600 rounded-xl border-2 border-red-200 dark:border-red-800">
                <DollarSign className="h-8 w-8 text-red-600 dark:text-red-400 mx-auto mb-3" />
                <h3 className="font-semibold text-gray-800 dark:text-white mb-2">Sale Price</h3>
                <div className="space-y-1">
                  <div className="text-sm text-gray-500 line-through">$399.99</div>
                  <div className="text-2xl font-bold text-red-600 dark:text-red-400">$299.99</div>
                  <div className="text-sm text-green-600 dark:text-green-400 font-medium">Save 25%</div>
                </div>
              </div>

              {/* Premium Price */}
              <div className="text-center p-6 bg-gradient-to-br from-yellow-50 to-amber-50 dark:from-gray-700 dark:to-gray-600 rounded-xl border-2 border-yellow-200 dark:border-yellow-800">
                <DollarSign className="h-8 w-8 text-yellow-600 dark:text-yellow-400 mx-auto mb-3" />
                <h3 className="font-semibold text-gray-800 dark:text-white mb-2">Premium</h3>
                <div className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">$499.99</div>
                <div className="text-sm text-gray-600 dark:text-gray-300 mt-1">Best Value</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EcommercePreview