import React, { useState } from 'react'
import { Star, Quote, ArrowRight, Gift, Percent, Zap, Target, TrendingUp, Users, Award, ChevronLeft, ChevronRight } from 'lucide-react'

const MarketingPromotionsPreview = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0)
  const [selectedProduct, setSelectedProduct] = useState(0)

  const testimonials = [
    {
      id: 1,
      name: 'Sarah Johnson',
      role: 'CEO, TechStart',
      content: 'This product has completely transformed our workflow. The results exceeded our expectations!',
      rating: 5,
      image: '/api/placeholder/60/60'
    },
    {
      id: 2,
      name: 'Michael Chen',
      role: 'Marketing Director, GrowthCo',
      content: 'Outstanding service and incredible value. Our team productivity increased by 300%.',
      rating: 5,
      image: '/api/placeholder/60/60'
    },
    {
      id: 3,
      name: 'Emily Rodriguez',
      role: 'Founder, InnovateLab',
      content: 'The best investment we made this year. Highly recommend to any growing business.',
      rating: 5,
      image: '/api/placeholder/60/60'
    }
  ]

  const products = [
    {
      id: 1,
      name: 'Premium Software Suite',
      description: 'Complete business solution with advanced features',
      originalPrice: 299,
      salePrice: 199,
      discount: 33,
      features: ['Advanced Analytics', 'Team Collaboration', '24/7 Support', 'Custom Integrations'],
      badge: 'Best Seller'
    },
    {
      id: 2,
      name: 'Professional Plan',
      description: 'Perfect for growing teams and businesses',
      originalPrice: 199,
      salePrice: 149,
      discount: 25,
      features: ['Core Features', 'Priority Support', 'API Access', 'Monthly Reports'],
      badge: 'Popular'
    },
    {
      id: 3,
      name: 'Starter Package',
      description: 'Great for small teams and startups',
      originalPrice: 99,
      salePrice: 79,
      discount: 20,
      features: ['Basic Features', 'Email Support', 'Standard Reports', 'Mobile App'],
      badge: 'Great Value'
    }
  ]

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-yellow-50 dark:from-gray-900 dark:via-gray-800 dark:to-orange-900">
      {/* Header */}
      <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-b border-orange-200 dark:border-gray-700 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-yellow-600 bg-clip-text text-transparent">
                Marketing & Promotions Templates
              </h1>
              <p className="text-gray-600 dark:text-gray-300 text-sm">Conversion-focused marketing components</p>
            </div>
            <div className="flex items-center gap-3">
              <button className="p-2 rounded-lg bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 hover:bg-orange-200 dark:hover:bg-orange-900/50 transition-colors">
                <Target className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Product Showcase */}
        <div className="mb-12">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-orange-100 dark:border-gray-700 overflow-hidden">
            <div className="p-6 border-b border-orange-100 dark:border-gray-700">
              <h2 className="text-xl font-semibold text-gray-800 dark:text-white flex items-center gap-2">
                <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                Product Showcase
              </h2>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Product Selector */}
                <div className="space-y-3">
                  {products.map((product, i) => (
                    <button
                      key={product.id}
                      onClick={() => setSelectedProduct(i)}
                      className={`w-full p-4 text-left rounded-xl transition-all duration-300 ${
                        selectedProduct === i
                          ? 'bg-gradient-to-r from-orange-100 to-yellow-100 dark:from-orange-900/30 dark:to-yellow-900/30 border-2 border-orange-300 dark:border-orange-600'
                          : 'bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-600'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-semibold text-gray-800 dark:text-white text-sm">{product.name}</h3>
                        <span className="text-xs bg-orange-500 text-white px-2 py-1 rounded-full">
                          {product.badge}
                        </span>
                      </div>
                      <p className="text-xs text-gray-600 dark:text-gray-300">{product.description}</p>
                    </button>
                  ))}
                </div>

                {/* Product Details */}
                <div className="lg:col-span-2">
                  <div className="bg-gradient-to-br from-orange-100 to-yellow-100 dark:from-gray-700 dark:to-gray-600 rounded-xl p-8">
                    <div className="flex items-start justify-between mb-6">
                      <div>
                        <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
                          {products[selectedProduct].name}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-300">
                          {products[selectedProduct].description}
                        </p>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-lg text-gray-500 line-through">
                            ${products[selectedProduct].originalPrice}
                          </span>
                          <span className="bg-red-500 text-white text-sm px-2 py-1 rounded-full">
                            -{products[selectedProduct].discount}%
                          </span>
                        </div>
                        <div className="text-3xl font-bold text-orange-600 dark:text-orange-400">
                          ${products[selectedProduct].salePrice}
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-6">
                      {products[selectedProduct].features.map((feature, i) => (
                        <div key={i} className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                          <span className="text-sm text-gray-700 dark:text-gray-300">{feature}</span>
                        </div>
                      ))}
                    </div>

                    <button className="w-full bg-gradient-to-r from-orange-500 to-yellow-500 text-white py-3 rounded-lg hover:from-orange-600 hover:to-yellow-600 transition-all duration-300 font-semibold flex items-center justify-center gap-2">
                      Get Started Now
                      <ArrowRight className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Testimonial Banner */}
        <div className="mb-12">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-orange-100 dark:border-gray-700 overflow-hidden">
            <div className="p-6 border-b border-orange-100 dark:border-gray-700">
              <h2 className="text-xl font-semibold text-gray-800 dark:text-white flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                Testimonial Banner
              </h2>
            </div>
            <div className="p-6">
              <div className="relative bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl p-8 text-white overflow-hidden">
                <div className="absolute top-4 right-4 opacity-20">
                  <Quote className="h-16 w-16" />
                </div>
                
                <div className="relative z-10">
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  
                  <blockquote className="text-xl font-medium mb-6 leading-relaxed">
                    "{testimonials[currentTestimonial].content}"
                  </blockquote>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                        <Users className="h-6 w-6" />
                      </div>
                      <div>
                        <div className="font-semibold">{testimonials[currentTestimonial].name}</div>
                        <div className="text-blue-100 text-sm">{testimonials[currentTestimonial].role}</div>
                      </div>
                    </div>
                    
                    <div className="flex gap-2">
                      <button
                        onClick={prevTestimonial}
                        className="p-2 bg-white/20 rounded-full hover:bg-white/30 transition-colors"
                      >
                        <ChevronLeft className="h-4 w-4" />
                      </button>
                      <button
                        onClick={nextTestimonial}
                        className="p-2 bg-white/20 rounded-full hover:bg-white/30 transition-colors"
                      >
                        <ChevronRight className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Promotional Banners */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {/* Limited Time Offer */}
          <div className="bg-gradient-to-br from-red-500 to-pink-500 rounded-2xl p-6 text-white relative overflow-hidden">
            <div className="absolute top-2 right-2">
              <div className="bg-white/20 rounded-full p-2">
                <Gift className="h-6 w-6" />
              </div>
            </div>
            
            <div className="relative z-10">
              <h3 className="text-2xl font-bold mb-2">Limited Time Offer!</h3>
              <p className="text-red-100 mb-4">Get 50% off on all premium plans</p>
              
              <div className="flex items-center gap-4 mb-4">
                <div className="text-center">
                  <div className="text-2xl font-bold">2</div>
                  <div className="text-xs text-red-100">Days</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">14</div>
                  <div className="text-xs text-red-100">Hours</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">32</div>
                  <div className="text-xs text-red-100">Minutes</div>
                </div>
              </div>
              
              <button className="bg-white text-red-500 px-6 py-2 rounded-lg font-semibold hover:bg-red-50 transition-colors">
                Claim Offer
              </button>
            </div>
          </div>

          {/* Discount Banner */}
          <div className="bg-gradient-to-br from-green-500 to-teal-500 rounded-2xl p-6 text-white relative overflow-hidden">
            <div className="absolute top-2 right-2">
              <div className="bg-white/20 rounded-full p-2">
                <Percent className="h-6 w-6" />
              </div>
            </div>
            
            <div className="relative z-10">
              <h3 className="text-2xl font-bold mb-2">Special Discount</h3>
              <p className="text-green-100 mb-4">Save big on annual subscriptions</p>
              
              <div className="flex items-center gap-2 mb-4">
                <span className="text-4xl font-bold">30%</span>
                <span className="text-green-100">OFF</span>
              </div>
              
              <button className="bg-white text-green-500 px-6 py-2 rounded-lg font-semibold hover:bg-green-50 transition-colors">
                Get Discount
              </button>
            </div>
          </div>
        </div>

        {/* Marketing Stats */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-orange-100 dark:border-gray-700 overflow-hidden">
          <div className="p-6 border-b border-orange-100 dark:border-gray-700">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white flex items-center gap-2">
              <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
              Marketing Performance
            </h2>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="text-center p-6 bg-gradient-to-br from-purple-50 to-indigo-50 dark:from-gray-700 dark:to-gray-600 rounded-xl">
                <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-3">
                  <TrendingUp className="h-6 w-6 text-white" />
                </div>
                <div className="text-2xl font-bold text-gray-800 dark:text-white mb-1">+245%</div>
                <div className="text-sm text-gray-600 dark:text-gray-300">Conversion Rate</div>
              </div>

              <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-gray-700 dark:to-gray-600 rounded-xl">
                <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Users className="h-6 w-6 text-white" />
                </div>
                <div className="text-2xl font-bold text-gray-800 dark:text-white mb-1">50K+</div>
                <div className="text-sm text-gray-600 dark:text-gray-300">Active Users</div>
              </div>

              <div className="text-center p-6 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-gray-700 dark:to-gray-600 rounded-xl">
                <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Award className="h-6 w-6 text-white" />
                </div>
                <div className="text-2xl font-bold text-gray-800 dark:text-white mb-1">98%</div>
                <div className="text-sm text-gray-600 dark:text-gray-300">Satisfaction Rate</div>
              </div>

              <div className="text-center p-6 bg-gradient-to-br from-orange-50 to-yellow-50 dark:from-gray-700 dark:to-gray-600 rounded-xl">
                <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Zap className="h-6 w-6 text-white" />
                </div>
                <div className="text-2xl font-bold text-gray-800 dark:text-white mb-1">24/7</div>
                <div className="text-sm text-gray-600 dark:text-gray-300">Support Available</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MarketingPromotionsPreview