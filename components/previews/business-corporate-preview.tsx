import React, { useState } from 'react'
import { Check, X, Star, Building, Users, Award, Phone, Mail, MapPin, ChevronDown, ChevronUp, TrendingUp, DollarSign } from 'lucide-react'

const BusinessCorporatePreview = () => {
  const [selectedPlan, setSelectedPlan] = useState('pro')
  const [openFaq, setOpenFaq] = useState(null)

  const pricingPlans = [
    {
      id: 'basic',
      name: 'Basic',
      price: 29,
      period: 'month',
      features: ['5 Projects', '10GB Storage', 'Email Support', 'Basic Analytics'],
      popular: false
    },
    {
      id: 'pro',
      name: 'Professional',
      price: 79,
      period: 'month',
      features: ['25 Projects', '100GB Storage', 'Priority Support', 'Advanced Analytics', 'Team Collaboration'],
      popular: true
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      price: 199,
      period: 'month',
      features: ['Unlimited Projects', '1TB Storage', '24/7 Support', 'Custom Analytics', 'Advanced Security', 'API Access'],
      popular: false
    }
  ]

  const services = [
    {
      id: 1,
      title: 'Web Development',
      description: 'Custom web applications built with modern technologies',
      icon: '🌐',
      price: 'Starting at $5,000'
    },
    {
      id: 2,
      title: 'Mobile Apps',
      description: 'Native and cross-platform mobile applications',
      icon: '📱',
      price: 'Starting at $8,000'
    },
    {
      id: 3,
      title: 'UI/UX Design',
      description: 'User-centered design for digital products',
      icon: '🎨',
      price: 'Starting at $3,000'
    },
    {
      id: 4,
      title: 'Consulting',
      description: 'Strategic technology consulting and planning',
      icon: '💼',
      price: 'Starting at $200/hour'
    }
  ]

  const companyStats = [
    { label: 'Projects Completed', value: '500+', icon: Award },
    { label: 'Happy Clients', value: '200+', icon: Users },
    { label: 'Years Experience', value: '10+', icon: TrendingUp },
    { label: 'Team Members', value: '50+', icon: Building }
  ]

  const faqs = [
    {
      question: 'What services do you offer?',
      answer: 'We offer comprehensive web development, mobile app development, UI/UX design, and technology consulting services.'
    },
    {
      question: 'How long does a typical project take?',
      answer: 'Project timelines vary based on complexity, but most projects are completed within 3-6 months.'
    },
    {
      question: 'Do you provide ongoing support?',
      answer: 'Yes, we offer various support packages including maintenance, updates, and technical assistance.'
    },
    {
      question: 'What is your pricing model?',
      answer: 'We offer both fixed-price projects and hourly consulting rates, depending on your needs and project scope.'
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-slate-900">
      {/* Header */}
      <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-b border-slate-200 dark:border-gray-700 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-slate-700 to-blue-600 bg-clip-text text-transparent">
                Business & Corporate Templates
              </h1>
              <p className="text-gray-600 dark:text-gray-300 text-sm">Professional components for business websites</p>
            </div>
            <div className="flex items-center gap-3">
              <button className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">
                <Building className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Pricing Table */}
        <div className="mb-12">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-slate-100 dark:border-gray-700 overflow-hidden">
            <div className="p-6 border-b border-slate-100 dark:border-gray-700">
              <h2 className="text-xl font-semibold text-gray-800 dark:text-white flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                Pricing Table
              </h2>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {pricingPlans.map((plan) => (
                  <div
                    key={plan.id}
                    className={`relative p-6 rounded-xl border-2 transition-all duration-300 cursor-pointer ${
                      plan.popular
                        ? 'border-blue-500 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 scale-105'
                        : selectedPlan === plan.id
                        ? 'border-slate-300 dark:border-gray-600 bg-slate-50 dark:bg-gray-700'
                        : 'border-slate-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:border-slate-300 dark:hover:border-gray-600'
                    }`}
                    onClick={() => setSelectedPlan(plan.id)}
                  >
                    {plan.popular && (
                      <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                        <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                          Most Popular
                        </span>
                      </div>
                    )}
                    
                    <div className="text-center mb-6">
                      <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">{plan.name}</h3>
                      <div className="flex items-baseline justify-center gap-1">
                        <span className="text-3xl font-bold text-gray-800 dark:text-white">${plan.price}</span>
                        <span className="text-gray-600 dark:text-gray-300">/{plan.period}</span>
                      </div>
                    </div>

                    <ul className="space-y-3 mb-6">
                      {plan.features.map((feature, i) => (
                        <li key={i} className="flex items-center gap-2">
                          <Check className="h-4 w-4 text-green-500 flex-shrink-0" />
                          <span className="text-gray-700 dark:text-gray-300 text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>

                    <button
                      className={`w-full py-3 rounded-lg font-medium transition-colors ${
                        plan.popular
                          ? 'bg-blue-500 text-white hover:bg-blue-600'
                          : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-600'
                      }`}
                    >
                      Choose Plan
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Service Cards */}
        <div className="mb-12">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-slate-100 dark:border-gray-700 overflow-hidden">
            <div className="p-6 border-b border-slate-100 dark:border-gray-700">
              <h2 className="text-xl font-semibold text-gray-800 dark:text-white flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                Service Cards
              </h2>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {services.map((service) => (
                  <div key={service.id} className="p-6 bg-gradient-to-br from-slate-50 to-gray-50 dark:from-gray-700 dark:to-gray-600 rounded-xl border border-slate-200 dark:border-gray-600 hover:shadow-lg transition-all duration-300">
                    <div className="flex items-start gap-4">
                      <div className="text-3xl">{service.icon}</div>
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">{service.title}</h3>
                        <p className="text-gray-600 dark:text-gray-300 text-sm mb-3">{service.description}</p>
                        <div className="flex items-center justify-between">
                          <span className="text-green-600 dark:text-green-400 font-medium">{service.price}</span>
                          <button className="px-4 py-2 bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-lg hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors text-sm">
                            Learn More
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* About System & Company Stats */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* About System */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-slate-100 dark:border-gray-700 overflow-hidden">
            <div className="p-6 border-b border-slate-100 dark:border-gray-700">
              <h2 className="text-xl font-semibold text-gray-800 dark:text-white flex items-center gap-2">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                About System
              </h2>
            </div>
            <div className="p-6">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-200 to-indigo-200 dark:from-gray-600 dark:to-gray-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Building className="h-8 w-8 text-purple-600 dark:text-purple-400" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-3">TechCorp Solutions</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                  We are a leading technology company specializing in innovative digital solutions. 
                  Our team of experts delivers cutting-edge web and mobile applications that drive 
                  business growth and enhance user experiences.
                </p>
              </div>
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-sm">
                  <Award className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                  <span className="text-gray-700 dark:text-gray-300">Industry Leader since 2014</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Users className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                  <span className="text-gray-700 dark:text-gray-300">50+ Expert Team Members</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <TrendingUp className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                  <span className="text-gray-700 dark:text-gray-300">500+ Successful Projects</span>
                </div>
              </div>
            </div>
          </div>

          {/* Company Stats */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-slate-100 dark:border-gray-700 overflow-hidden">
            <div className="p-6 border-b border-slate-100 dark:border-gray-700">
              <h2 className="text-xl font-semibold text-gray-800 dark:text-white flex items-center gap-2">
                <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                Company Stats
              </h2>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-2 gap-6">
                {companyStats.map((stat, i) => (
                  <div key={i} className="text-center p-4 bg-gradient-to-br from-orange-50 to-red-50 dark:from-gray-700 dark:to-gray-600 rounded-xl">
                    <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-3">
                      <stat.icon className="h-6 w-6 text-white" />
                    </div>
                    <div className="text-2xl font-bold text-gray-800 dark:text-white mb-1">{stat.value}</div>
                    <div className="text-sm text-gray-600 dark:text-gray-300">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Contact Info */}
        <div className="mb-12">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-slate-100 dark:border-gray-700 overflow-hidden">
            <div className="p-6 border-b border-slate-100 dark:border-gray-700">
              <h2 className="text-xl font-semibold text-gray-800 dark:text-white flex items-center gap-2">
                <div className="w-2 h-2 bg-teal-500 rounded-full"></div>
                Contact Info
              </h2>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center p-6 bg-gradient-to-br from-teal-50 to-cyan-50 dark:from-gray-700 dark:to-gray-600 rounded-xl">
                  <div className="w-12 h-12 bg-teal-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Phone className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="font-semibold text-gray-800 dark:text-white mb-2">Phone</h3>
                  <p className="text-gray-600 dark:text-gray-300">+1 (555) 123-4567</p>
                </div>
                
                <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-700 dark:to-gray-600 rounded-xl">
                  <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Mail className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="font-semibold text-gray-800 dark:text-white mb-2">Email</h3>
                  <p className="text-gray-600 dark:text-gray-300">contact@techcorp.com</p>
                </div>
                
                <div className="text-center p-6 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-gray-700 dark:to-gray-600 rounded-xl">
                  <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <MapPin className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="font-semibold text-gray-800 dark:text-white mb-2">Address</h3>
                  <p className="text-gray-600 dark:text-gray-300">123 Tech Street, Silicon Valley, CA</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-slate-100 dark:border-gray-700 overflow-hidden">
          <div className="p-6 border-b border-slate-100 dark:border-gray-700">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white flex items-center gap-2">
              <div className="w-2 h-2 bg-indigo-500 rounded-full"></div>
              FAQ Section
            </h2>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {faqs.map((faq, i) => (
                <div key={i} className="border border-slate-200 dark:border-gray-600 rounded-lg">
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full p-4 text-left flex items-center justify-between hover:bg-slate-50 dark:hover:bg-gray-700 transition-colors"
                  >
                    <span className="font-medium text-gray-800 dark:text-white">{faq.question}</span>
                    {openFaq === i ? (
                      <ChevronUp className="h-5 w-5 text-gray-500" />
                    ) : (
                      <ChevronDown className="h-5 w-5 text-gray-500" />
                    )}
                  </button>
                  {openFaq === i && (
                    <div className="p-4 pt-0 border-t border-slate-200 dark:border-gray-600">
                      <p className="text-gray-600 dark:text-gray-300">{faq.answer}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BusinessCorporatePreview