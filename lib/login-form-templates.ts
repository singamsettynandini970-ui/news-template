// Login Form templates - Simple, Multi-step, Floating Labels, Inline
// 4 variations

import type { ExtendedPanel, TemplateVariation } from './template-registry'
import { createTemplateMetadata } from './template-converter'
import { COMMON_DEPENDENCIES } from './template-registry'

const LOGIN_FORM_TEMPLATES = [
  {
    id: 1,
    name: "Simple Login Form",
    description: "Basic login with email and password",
    style: "minimal" as const,
    code: 'import { useState } from "react"\nimport { Mail, Lock } from "lucide-react"\n\nexport default function SimpleLoginForm() {\n  const [email, setEmail] = useState("")\n  const [password, setPassword] = useState("")\n  const [error, setError] = useState("")\n\n  const handleSubmit = (e: React.FormEvent) => {\n    e.preventDefault()\n    if (!email || !password) {\n      setError("Please fill in all fields")\n      return\n    }\n    console.log("Login:", { email, password })\n    setError("")\n  }\n\n  return (\n    <form onSubmit={handleSubmit} className="w-full max-w-sm space-y-3 sm:space-y-4">\n      <div>\n        <label className="block text-xs sm:text-sm font-medium text-foreground mb-1 sm:mb-2">\n          Email\n        </label>\n        <div className="relative">\n          <input\n            type="email"\n            value={email}\n            onChange={(e) => setEmail(e.target.value)}\n            placeholder="you@example.com"\n            className="w-full px-3 sm:px-4 py-2 sm:py-2.5 pl-9 sm:pl-10 rounded-lg border border-border bg-background text-xs sm:text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary"\n          />\n          <Mail className="absolute left-2.5 sm:left-3 top-2.5 sm:top-3 h-4 w-4 text-muted-foreground" />\n        </div>\n      </div>\n\n      <div>\n        <label className="block text-xs sm:text-sm font-medium text-foreground mb-1 sm:mb-2">\n          Password\n        </label>\n        <div className="relative">\n          <input\n            type="password"\n            value={password}\n            onChange={(e) => setPassword(e.target.value)}\n            placeholder="••••••••"\n            className="w-full px-3 sm:px-4 py-2 sm:py-2.5 pl-9 sm:pl-10 rounded-lg border border-border bg-background text-xs sm:text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary"\n          />\n          <Lock className="absolute left-2.5 sm:left-3 top-2.5 sm:top-3 h-4 w-4 text-muted-foreground" />\n        </div>\n      </div>\n\n      {error && (\n        <div className="p-2 sm:p-3 bg-secondary/10 border border-secondary rounded-lg text-xs sm:text-sm text-secondary">\n          {error}\n        </div>\n      )}\n\n      <button\n        type="submit"\n        className="w-full px-4 py-2 sm:py-2.5 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors text-xs sm:text-sm font-medium"\n      >\n        Sign In\n      </button>\n    </form>\n  )\n}',
  },
  {
    id: 2,
    name: "Multi-step Login Form",
    description: "Login with email verification step",
    style: "modern" as const,
    code: 'import { useState } from "react"\n\nexport default function MultiStepLoginForm() {\n  const [step, setStep] = useState(1)\n  const [email, setEmail] = useState("")\n  const [password, setPassword] = useState("")\n  const [code, setCode] = useState("")\n\n  const handleEmailSubmit = (e: React.FormEvent) => {\n    e.preventDefault()\n    if (email) setStep(2)\n  }\n\n  const handlePasswordSubmit = (e: React.FormEvent) => {\n    e.preventDefault()\n    if (password) setStep(3)\n  }\n\n  const handleVerifySubmit = (e: React.FormEvent) => {\n    e.preventDefault()\n    console.log("Login verified")\n  }\n\n  return (\n    <div className="w-full max-w-sm">\n      <div className="flex gap-2 sm:gap-3 mb-6 sm:mb-8">\n        {[1, 2, 3].map((s) => (\n          <div\n            key={s}\n            className={`flex-1 h-1 sm:h-1.5 rounded-full transition-colors ${s <= step ? "bg-primary" : "bg-border"}`}\n          />\n        ))}\n      </div>\n\n      {step === 1 && (\n        <form onSubmit={handleEmailSubmit} className="space-y-3 sm:space-y-4">\n          <div>\n            <label className="block text-xs sm:text-sm font-medium text-foreground mb-1 sm:mb-2">\n              Email Address\n            </label>\n            <input\n              type="email"\n              value={email}\n              onChange={(e) => setEmail(e.target.value)}\n              placeholder="you@example.com"\n              className="w-full px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg border border-border bg-background text-xs sm:text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary"\n            />\n          </div>\n          <button\n            type="submit"\n            className="w-full px-4 py-2 sm:py-2.5 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors text-xs sm:text-sm font-medium"\n          >\n            Continue\n          </button>\n        </form>\n      )}\n\n      {step === 2 && (\n        <form onSubmit={handlePasswordSubmit} className="space-y-3 sm:space-y-4">\n          <div>\n            <label className="block text-xs sm:text-sm font-medium text-foreground mb-1 sm:mb-2">\n              Password\n            </label>\n            <input\n              type="password"\n              value={password}\n              onChange={(e) => setPassword(e.target.value)}\n              placeholder="••••••••"\n              className="w-full px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg border border-border bg-background text-xs sm:text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary"\n            />\n          </div>\n          <button\n            type="submit"\n            className="w-full px-4 py-2 sm:py-2.5 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors text-xs sm:text-sm font-medium"\n          >\n            Continue\n          </button>\n        </form>\n      )}\n\n      {step === 3 && (\n        <form onSubmit={handleVerifySubmit} className="space-y-3 sm:space-y-4">\n          <div>\n            <label className="block text-xs sm:text-sm font-medium text-foreground mb-1 sm:mb-2">\n              Verification Code\n            </label>\n            <input\n              type="text"\n              value={code}\n              onChange={(e) => setCode(e.target.value)}\n              placeholder="000000"\n              className="w-full px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg border border-border bg-background text-xs sm:text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary"\n            />\n          </div>\n          <button\n            type="submit"\n            className="w-full px-4 py-2 sm:py-2.5 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors text-xs sm:text-sm font-medium"\n          >\n            Verify & Sign In\n          </button>\n        </form>\n      )}\n    </div>\n  )\n}',
  },
  {
    id: 3,
    name: "Floating Labels Login Form",
    description: "Login with floating label animation",
    style: "classic" as const,
    code: 'import { useState } from "react"\n\nexport default function FloatingLabelsLoginForm() {\n  const [email, setEmail] = useState("")\n  const [password, setPassword] = useState("")\n  const [rememberMe, setRememberMe] = useState(false)\n\n  const handleSubmit = (e: React.FormEvent) => {\n    e.preventDefault()\n    console.log("Login:", { email, password, rememberMe })\n  }\n\n  return (\n    <form onSubmit={handleSubmit} className="w-full max-w-sm space-y-4 sm:space-y-6">\n      <div className="relative">\n        <input\n          type="email"\n          value={email}\n          onChange={(e) => setEmail(e.target.value)}\n          placeholder=" "\n          className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg border border-border bg-background text-xs sm:text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary peer"\n        />\n        <label className="absolute left-3 sm:left-4 top-2.5 sm:top-3 text-xs sm:text-sm text-muted-foreground transition-all peer-placeholder-shown:top-2.5 sm:peer-placeholder-shown:top-3 peer-focus:-top-2 sm:peer-focus:-top-1.5 peer-focus:text-primary peer-focus:text-xs">\n          Email Address\n        </label>\n      </div>\n\n      <div className="relative">\n        <input\n          type="password"\n          value={password}\n          onChange={(e) => setPassword(e.target.value)}\n          placeholder=" "\n          className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg border border-border bg-background text-xs sm:text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary peer"\n        />\n        <label className="absolute left-3 sm:left-4 top-2.5 sm:top-3 text-xs sm:text-sm text-muted-foreground transition-all peer-placeholder-shown:top-2.5 sm:peer-placeholder-shown:top-3 peer-focus:-top-2 sm:peer-focus:-top-1.5 peer-focus:text-primary peer-focus:text-xs">\n          Password\n        </label>\n      </div>\n\n      <div className="flex items-center">\n        <input\n          type="checkbox"\n          id="remember"\n          checked={rememberMe}\n          onChange={(e) => setRememberMe(e.target.checked)}\n          className="h-4 w-4 rounded border-border text-primary focus:ring-primary"\n        />\n        <label htmlFor="remember" className="ml-2 text-xs sm:text-sm text-foreground">\n          Remember me\n        </label>\n      </div>\n\n      <button\n        type="submit"\n        className="w-full px-4 py-2.5 sm:py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors text-xs sm:text-sm font-medium"\n      >\n        Sign In\n      </button>\n    </form>\n  )\n}',
  },
  {
    id: 4,
    name: "Inline Login Form",
    description: "Compact inline login form",
    style: "bold" as const,
    code: 'import { useState } from "react"\n\nexport default function InlineLoginForm() {\n  const [email, setEmail] = useState("")\n  const [password, setPassword] = useState("")\n  const [isLoading, setIsLoading] = useState(false)\n\n  const handleSubmit = async (e: React.FormEvent) => {\n    e.preventDefault()\n    setIsLoading(true)\n    setTimeout(() => {\n      console.log("Login:", { email, password })\n      setIsLoading(false)\n    }, 1000)\n  }\n\n  return (\n    <form onSubmit={handleSubmit} className="w-full">\n      <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">\n        <input\n          type="email"\n          value={email}\n          onChange={(e) => setEmail(e.target.value)}\n          placeholder="Email"\n          className="flex-1 px-2 sm:px-3 py-1.5 sm:py-2 rounded border border-border bg-background text-xs sm:text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary"\n        />\n        <input\n          type="password"\n          value={password}\n          onChange={(e) => setPassword(e.target.value)}\n          placeholder="Password"\n          className="flex-1 px-2 sm:px-3 py-1.5 sm:py-2 rounded border border-border bg-background text-xs sm:text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary"\n        />\n        <button\n          type="submit"\n          disabled={isLoading}\n          className="px-3 sm:px-4 py-1.5 sm:py-2 bg-primary text-primary-foreground rounded hover:bg-primary/90 transition-colors text-xs sm:text-sm font-medium disabled:opacity-50"\n        >\n          {isLoading ? "Signing in..." : "Sign In"}\n        </button>\n      </div>\n    </form>\n  )\n}',
  }
]

export function createLoginFormPanel(): ExtendedPanel {
  const variations: TemplateVariation[] = LOGIN_FORM_TEMPLATES.map((template) => ({
    id: `login-form-${template.style}-${template.id}`,
    name: template.name,
    description: template.description,
    style: template.style,
    code: template.code,
    metadata: createTemplateMetadata({
      complexity: 'moderate',
      features: ['Login Form', 'Form Validation', 'Responsive', 'Error Handling'],
      useCases: ['Authentication', 'User Login', 'Access Control'],
      dependencies: [...COMMON_DEPENDENCIES.core, ...COMMON_DEPENDENCIES.icons],
      implementationNotes: ['Form validation', 'Error state handling', 'Multi-step support', 'Responsive design']
    })
  }))

  return {
    id: 'login-form',
    name: 'Login Form',
    description: 'Login form components with various features',
    category: 'forms-input',
    variations,
    tags: ['login', 'form', 'authentication', 'forms-input']
  }
}

export const LOGIN_FORM_PANEL_WITH_VARIATIONS = createLoginFormPanel()
