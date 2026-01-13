// Newsletter Signup templates - Inline, Modal, Sidebar, Footer
// 4 variations

import type { ExtendedPanel, TemplateVariation } from './template-registry'
import { createTemplateMetadata } from './template-converter'
import { COMMON_DEPENDENCIES } from './template-registry'

const NEWSLETTER_SIGNUP_TEMPLATES = [
  {
    id: 1,
    name: "Inline Newsletter",
    description: "Inline newsletter signup",
    style: "minimal" as const,
    code: 'import { useState } from "react"\nimport { Mail } from "lucide-react"\n\nexport default function InlineNewsletter() {\n  const [email, setEmail] = useState("")\n  const [subscribed, setSubscribed] = useState(false)\n\n  const handleSubmit = (e: React.FormEvent) => {\n    e.preventDefault()\n    setSubscribed(true)\n    setTimeout(() => {\n      setEmail("")\n      setSubscribed(false)\n    }, 3000)\n  }\n\n  return (\n    <div className="w-full max-w-md">\n      <div className="p-6 border border-border rounded-lg">\n        <div className="flex items-center gap-2 mb-2">\n          <Mail className="h-5 w-5 text-primary" />\n          <h3 className="font-semibold text-foreground">Subscribe to our newsletter</h3>\n        </div>\n        <p className="text-sm text-muted-foreground mb-4">\n          Get the latest updates delivered to your inbox.\n        </p>\n        {subscribed ? (\n          <div className="p-3 bg-accent text-accent-foreground rounded-lg text-sm text-center">\n            ✓ Thanks for subscribing!\n          </div>\n        ) : (\n          <form onSubmit={handleSubmit} className="flex gap-2">\n            <input\n              type="email"\n              value={email}\n              onChange={(e) => setEmail(e.target.value)}\n              required\n              className="flex-1 px-3 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary text-sm"\n              placeholder="your@email.com"\n            />\n            <button\n              type="submit"\n              className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium text-sm"\n            >\n              Subscribe\n            </button>\n          </form>\n        )}\n      </div>\n    </div>\n  )\n}',
  },
  {
    id: 2,
    name: "Modal Newsletter",
    description: "Newsletter signup in modal",
    style: "modern" as const,
    code: 'import { useState } from "react"\nimport { X, Gift } from "lucide-react"\n\nexport default function ModalNewsletter() {\n  const [isOpen, setIsOpen] = useState(false)\n  const [email, setEmail] = useState("")\n\n  const handleSubmit = (e: React.FormEvent) => {\n    e.preventDefault()\n    setIsOpen(false)\n    setEmail("")\n  }\n\n  return (\n    <>\n      <button\n        onClick={() => setIsOpen(true)}\n        className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium"\n      >\n        Subscribe Now\n      </button>\n\n      {isOpen && (\n        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">\n          <div className="bg-background border border-border rounded-lg shadow-lg max-w-md w-full">\n            <div className="flex items-center justify-between p-6 border-b border-border">\n              <div className="flex items-center gap-2">\n                <Gift className="h-5 w-5 text-primary" />\n                <h2 className="text-lg font-bold text-foreground">Special Offer</h2>\n              </div>\n              <button\n                onClick={() => setIsOpen(false)}\n                className="p-2 hover:bg-accent rounded-lg transition-colors"\n              >\n                <X className="h-5 w-5 text-foreground" />\n              </button>\n            </div>\n\n            <div className="p-6">\n              <p className="text-sm text-muted-foreground mb-4">\n                Subscribe to get 20% off your first purchase!\n              </p>\n              <form onSubmit={handleSubmit} className="space-y-3">\n                <input\n                  type="email"\n                  value={email}\n                  onChange={(e) => setEmail(e.target.value)}\n                  required\n                  className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"\n                  placeholder="your@email.com"\n                />\n                <button\n                  type="submit"\n                  className="w-full px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium"\n                >\n                  Get Discount\n                </button>\n              </form>\n              <p className="text-xs text-muted-foreground text-center mt-3">\n                We respect your privacy. Unsubscribe at any time.\n              </p>\n            </div>\n          </div>\n        </div>\n      )}\n    </>\n  )\n}',
  },
  {
    id: 3,
    name: "Sidebar Newsletter",
    description: "Newsletter signup in sidebar",
    style: "classic" as const,
    code: 'import { useState } from "react"\nimport { Bell } from "lucide-react"\n\nexport default function SidebarNewsletter() {\n  const [email, setEmail] = useState("")\n  const [subscribed, setSubscribed] = useState(false)\n\n  const handleSubmit = (e: React.FormEvent) => {\n    e.preventDefault()\n    setSubscribed(true)\n    setTimeout(() => {\n      setEmail("")\n      setSubscribed(false)\n    }, 2000)\n  }\n\n  return (\n    <div className="w-full max-w-xs p-4 bg-accent rounded-lg">\n      <div className="flex items-center gap-2 mb-3">\n        <Bell className="h-5 w-5 text-primary" />\n        <h3 className="font-semibold text-foreground">Stay Updated</h3>\n      </div>\n      <p className="text-xs text-muted-foreground mb-4">\n        Get weekly tips and insights delivered to your inbox.\n      </p>\n      {subscribed ? (\n        <div className="p-2 bg-accent text-accent-foreground rounded text-xs text-center">\n          Subscribed!\n        </div>\n      ) : (\n        <form onSubmit={handleSubmit} className="space-y-2">\n          <input\n            type="email"\n            value={email}\n            onChange={(e) => setEmail(e.target.value)}\n            required\n            className="w-full px-2 py-1.5 border border-border rounded bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary text-xs"\n            placeholder="Email"\n          />\n          <button\n            type="submit"\n            className="w-full px-2 py-1.5 bg-primary text-primary-foreground rounded hover:bg-primary/90 transition-colors font-medium text-xs"\n          >\n            Subscribe\n          </button>\n        </form>\n      )}\n    </div>\n  )\n}',
  },
  {
    id: 4,
    name: "Footer Newsletter",
    description: "Newsletter signup in footer",
    style: "bold" as const,
    code: 'import { useState } from "react"\nimport { ArrowRight } from "lucide-react"\n\nexport default function FooterNewsletter() {\n  const [email, setEmail] = useState("")\n  const [subscribed, setSubscribed] = useState(false)\n\n  const handleSubmit = (e: React.FormEvent) => {\n    e.preventDefault()\n    setSubscribed(true)\n    setTimeout(() => {\n      setEmail("")\n      setSubscribed(false)\n    }, 2000)\n  }\n\n  return (\n    <div className="w-full bg-gradient-to-r from-primary to-accent rounded-lg p-6">\n      <div className="max-w-md">\n        <h3 className="text-lg font-bold text-primary-foreground mb-2">\n          Subscribe to our newsletter\n        </h3>\n        <p className="text-sm text-primary-foreground/80 mb-4">\n          Be the first to know about new features and updates.\n        </p>\n        {subscribed ? (\n          <div className="p-3 bg-primary-foreground/20 text-primary-foreground rounded-lg text-sm text-center">\n            ✓ Thank you for subscribing!\n          </div>\n        ) : (\n          <form onSubmit={handleSubmit} className="flex gap-2">\n            <input\n              type="email"\n              value={email}\n              onChange={(e) => setEmail(e.target.value)}\n              required\n              className="flex-1 px-4 py-2 rounded-lg bg-primary-foreground/10 text-primary-foreground placeholder-primary-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary-foreground text-sm"\n              placeholder="your@email.com"\n            />\n            <button\n              type="submit"\n              className="px-4 py-2 bg-primary-foreground text-primary rounded-lg hover:bg-primary-foreground/90 transition-colors font-medium flex items-center gap-2"\n            >\n              <ArrowRight className="h-4 w-4" />\n            </button>\n          </form>\n        )}\n        <p className="text-xs text-primary-foreground/60 mt-3">\n          We respect your privacy. Unsubscribe anytime.\n        </p>\n      </div>\n    </div>\n  )\n}',
  }
]

export function createNewsletterSignupPanel(): ExtendedPanel {
  const variations: TemplateVariation[] = NEWSLETTER_SIGNUP_TEMPLATES.map((template) => ({
    id: `newsletter-signup-${template.style}-${template.id}`,
    name: template.name,
    description: template.description,
    style: template.style,
    code: template.code,
    metadata: createTemplateMetadata({
      complexity: 'simple',
      features: ['Newsletter Signup', 'Email Validation', 'Success States', 'GDPR Compliance'],
      useCases: ['Email Marketing', 'Lead Generation', 'User Engagement', 'Promotions'],
      dependencies: [...COMMON_DEPENDENCIES.core, ...COMMON_DEPENDENCIES.icons],
      implementationNotes: ['Email validation', 'Success feedback', 'Privacy notice', 'Multiple layouts']
    })
  }))

  return {
    id: 'newsletter-signup',
    name: 'Newsletter Signup',
    description: 'Newsletter signup components with various layouts',
    category: 'forms-input',
    variations,
    tags: ['newsletter', 'signup', 'forms-input', 'email']
  }
}

export const NEWSLETTER_SIGNUP_PANEL_WITH_VARIATIONS = createNewsletterSignupPanel()
