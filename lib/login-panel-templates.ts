// Login Panel templates with 4 variations
// Modal, Page, Sidebar, and Social login variations
// Includes form validation and error handling

import type { ExtendedPanel, TemplateVariation } from './template-registry'
import { createTemplateMetadata } from './template-converter'
import { COMMON_DEPENDENCIES } from './template-registry'

// Login Panel template variations
const LOGIN_PANEL_TEMPLATES = [
  {
    id: 1,
    name: "Modal Login",
    description: "Login form in a modal dialog",
    style: "minimal" as const,
    code: `import { useState } from 'react'
import { Mail, Lock, X } from 'lucide-react'

export default function ModalLogin() {
  const [isOpen, setIsOpen] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    // Validate
    if (!email || !password) {
      setError('Please fill in all fields')
      setIsLoading(false)
      return
    }

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    console.log('Login:', { email, password })
    setIsOpen(false)
    setEmail('')
    setPassword('')
    setIsLoading(false)
  }

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="px-2 sm:px-3 md:px-4 py-1.5 sm:py-2 md:py-2.5 text-xs sm:text-sm md:text-base bg-primary text-primary-foreground rounded-md sm:rounded-lg hover:bg-primary/90 transition-colors font-medium"
      >
        Open Login
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-2 sm:p-3 md:p-4">
          <div className="bg-background border border-border rounded-lg sm:rounded-xl shadow-lg max-w-md w-full">
            <div className="flex items-center justify-between p-3 sm:p-4 md:p-6 border-b border-border">
              <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-foreground">Sign In</h2>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 sm:p-1.5 md:p-2 hover:bg-accent rounded-lg transition-colors"
              >
                <X className="h-4 sm:h-4.5 md:h-5 w-4 sm:w-4.5 md:w-5 text-foreground" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-3 sm:p-4 md:p-6 space-y-2 sm:space-y-3 md:space-y-4">
              {error && (
                <div className="p-2 sm:p-2.5 md:p-3 bg-destructive/10 border border-destructive/20 rounded-md sm:rounded-lg text-xs sm:text-sm md:text-base text-destructive">
                  {error}
                </div>
              )}

              <div>
                <label className="block text-xs sm:text-sm md:text-base font-medium text-foreground mb-1 sm:mb-1.5 md:mb-2">Email</label>
                <div className="relative">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="w-full px-2 sm:px-3 md:px-4 py-1.5 sm:py-2 md:py-2.5 pl-8 sm:pl-9 md:pl-10 rounded-md sm:rounded-lg text-xs sm:text-sm md:text-base border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                  <Mail className="absolute left-2 sm:left-3 md:left-3 top-1.5 sm:top-2 md:top-2.5 h-4 sm:h-4 md:h-5 w-4 sm:w-4 md:w-5 text-muted-foreground" />
                </div>
              </div>

              <div>
                <label className="block text-xs sm:text-sm md:text-base font-medium text-foreground mb-1 sm:mb-1.5 md:mb-2">Password</label>
                <div className="relative">
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full px-2 sm:px-3 md:px-4 py-1.5 sm:py-2 md:py-2.5 pl-8 sm:pl-9 md:pl-10 rounded-md sm:rounded-lg text-xs sm:text-sm md:text-base border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                  <Lock className="absolute left-2 sm:left-3 md:left-3 top-1.5 sm:top-2 md:top-2.5 h-4 sm:h-4 md:h-5 w-4 sm:w-4 md:w-5 text-muted-foreground" />
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full px-2 sm:px-3 md:px-4 py-1.5 sm:py-2 md:py-2.5 text-xs sm:text-sm md:text-base bg-primary text-primary-foreground rounded-md sm:rounded-lg hover:bg-primary/90 disabled:opacity-50 transition-colors font-medium"
              >
                {isLoading ? 'Signing in...' : 'Sign In'}
              </button>

              <p className="text-center text-xs sm:text-sm md:text-base text-muted-foreground">
                Don't have an account?{' '}
                <a href="#" className="text-primary hover:underline font-medium">
                  Sign up
                </a>
              </p>
            </form>
          </div>
        </div>
      )}
    </>
  )
}`,
  },
  {
    id: 2,
    name: "Page Login",
    description: "Full-page login form",
    style: "modern" as const,
    code: `import { useState } from 'react'
import { Mail, Lock, Eye, EyeOff } from 'lucide-react'

export default function PageLogin() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    if (!email || !password) {
      setError('Please fill in all fields')
      setIsLoading(false)
      return
    }

    await new Promise(resolve => setTimeout(resolve, 1000))
    console.log('Login:', { email, password })
    setIsLoading(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center px-2 sm:px-3 md:px-4 py-4 sm:py-6 md:py-8">
      <div className="w-full max-w-md">
        <div className="text-center mb-6 sm:mb-7 md:mb-8">
          <h1 className="text-2xl sm:text-2.5xl md:text-3xl font-bold text-foreground mb-1 sm:mb-1.5 md:mb-2">Welcome Back</h1>
          <p className="text-xs sm:text-sm md:text-base text-muted-foreground">Sign in to your account to continue</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-background border border-border rounded-lg sm:rounded-xl p-4 sm:p-6 md:p-8 space-y-4 sm:space-y-5 md:space-y-6">
          {error && (
            <div className="p-2 sm:p-2.5 md:p-3 bg-destructive/10 border border-destructive/20 rounded-md sm:rounded-lg text-xs sm:text-sm md:text-base text-destructive">
              {error}
            </div>
          )}

          <div>
            <label className="block text-xs sm:text-sm md:text-base font-medium text-foreground mb-1 sm:mb-1.5 md:mb-2">Email Address</label>
            <div className="relative">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full px-2 sm:px-3 md:px-4 py-2 sm:py-2.5 md:py-3 pl-8 sm:pl-9 md:pl-10 rounded-md sm:rounded-lg text-xs sm:text-sm md:text-base border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <Mail className="absolute left-2 sm:left-3 md:left-3 top-2 sm:top-2.5 md:top-3.5 h-4 sm:h-4 md:h-5 w-4 sm:w-4 md:w-5 text-muted-foreground" />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1 sm:mb-1.5 md:mb-2">
              <label className="block text-xs sm:text-sm md:text-base font-medium text-foreground">Password</label>
              <a href="#" className="text-xs sm:text-sm md:text-base text-primary hover:underline">
                Forgot password?
              </a>
            </div>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-2 sm:px-3 md:px-4 py-2 sm:py-2.5 md:py-3 pl-8 sm:pl-9 md:pl-10 rounded-md sm:rounded-lg text-xs sm:text-sm md:text-base border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <Lock className="absolute left-2 sm:left-3 md:left-3 top-2 sm:top-2.5 md:top-3.5 h-4 sm:h-4 md:h-5 w-4 sm:w-4 md:w-5 text-muted-foreground" />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-2 sm:right-3 md:right-3 top-2 sm:top-2.5 md:top-3.5 p-0.5 sm:p-1 hover:bg-accent rounded transition-colors"
              >
                {showPassword ? (
                  <EyeOff className="h-4 sm:h-4 md:h-5 w-4 sm:w-4 md:w-5 text-muted-foreground" />
                ) : (
                  <Eye className="h-4 sm:h-4 md:h-5 w-4 sm:w-4 md:w-5 text-muted-foreground" />
                )}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full px-2 sm:px-3 md:px-4 py-2 sm:py-2.5 md:py-3 text-xs sm:text-sm md:text-base bg-primary text-primary-foreground rounded-md sm:rounded-lg hover:bg-primary/90 disabled:opacity-50 transition-colors font-medium"
          >
            {isLoading ? 'Signing in...' : 'Sign In'}
          </button>

          <p className="text-center text-xs sm:text-sm md:text-base text-muted-foreground">
            Don't have an account?{' '}
            <a href="#" className="text-primary hover:underline font-medium">
              Create one
            </a>
          </p>
        </form>
      </div>
    </div>
  )
}`,
  },
  {
    id: 3,
    name: "Sidebar Login",
    description: "Login form in a sidebar panel",
    style: "classic" as const,
    code: `import { useState } from 'react'
import { Mail, Lock, X } from 'lucide-react'

export default function SidebarLogin() {
  const [isOpen, setIsOpen] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (!email || !password) {
      setError('Please fill in all fields')
      return
    }

    console.log('Login:', { email, password })
    setIsOpen(false)
  }

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="px-2 sm:px-3 md:px-4 py-1.5 sm:py-2 md:py-2.5 text-xs sm:text-sm md:text-base bg-primary text-primary-foreground rounded-md sm:rounded-lg hover:bg-primary/90 transition-colors font-medium"
      >
        Open Sidebar Login
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50">
          <div className="fixed inset-0 bg-black/50" onClick={() => setIsOpen(false)} />
          <div className="fixed top-0 right-0 h-full w-80 sm:w-96 bg-background border-l border-border shadow-lg flex flex-col">
            <div className="flex items-center justify-between p-3 sm:p-4 md:p-6 border-b border-border">
              <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-foreground">Sign In</h2>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 sm:p-1.5 md:p-2 hover:bg-accent rounded-lg transition-colors"
              >
                <X className="h-4 sm:h-4.5 md:h-5 w-4 sm:w-4.5 md:w-5 text-foreground" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="flex-1 p-3 sm:p-4 md:p-6 space-y-2 sm:space-y-3 md:space-y-4 overflow-y-auto">
              {error && (
                <div className="p-2 sm:p-2.5 md:p-3 bg-destructive/10 border border-destructive/20 rounded-md sm:rounded-lg text-xs sm:text-sm md:text-base text-destructive">
                  {error}
                </div>
              )}

              <div>
                <label className="block text-xs sm:text-sm md:text-base font-medium text-foreground mb-1 sm:mb-1.5 md:mb-2">Email</label>
                <div className="relative">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="w-full px-2 sm:px-3 md:px-4 py-1.5 sm:py-2 md:py-2.5 pl-8 sm:pl-9 md:pl-10 rounded-md sm:rounded-lg text-xs sm:text-sm md:text-base border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                  <Mail className="absolute left-2 sm:left-3 md:left-3 top-1.5 sm:top-2 md:top-2.5 h-4 sm:h-4 md:h-5 w-4 sm:w-4 md:w-5 text-muted-foreground" />
                </div>
              </div>

              <div>
                <label className="block text-xs sm:text-sm md:text-base font-medium text-foreground mb-1 sm:mb-1.5 md:mb-2">Password</label>
                <div className="relative">
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full px-2 sm:px-3 md:px-4 py-1.5 sm:py-2 md:py-2.5 pl-8 sm:pl-9 md:pl-10 rounded-md sm:rounded-lg text-xs sm:text-sm md:text-base border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                  <Lock className="absolute left-2 sm:left-3 md:left-3 top-1.5 sm:top-2 md:top-2.5 h-4 sm:h-4 md:h-5 w-4 sm:w-4 md:w-5 text-muted-foreground" />
                </div>
              </div>

              <button
                type="submit"
                className="w-full px-2 sm:px-3 md:px-4 py-1.5 sm:py-2 md:py-2.5 text-xs sm:text-sm md:text-base bg-primary text-primary-foreground rounded-md sm:rounded-lg hover:bg-primary/90 transition-colors font-medium"
              >
                Sign In
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  )
}`,
  },
  {
    id: 4,
    name: "Social Login",
    description: "Login with social authentication options",
    style: "bold" as const,
    code: `import { useState } from 'react'
import { Mail, Lock, Github, Chrome } from 'lucide-react'

export default function SocialLogin() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    if (!email || !password) {
      setError('Please fill in all fields')
      setIsLoading(false)
      return
    }

    await new Promise(resolve => setTimeout(resolve, 1000))
    console.log('Login:', { email, password })
    setIsLoading(false)
  }

  const handleSocialLogin = (provider: string) => {
    console.log('Social login:', provider)
  }

  return (
    <div className="w-full max-w-md mx-auto px-2 sm:px-3 md:px-4 py-2 sm:py-3 md:py-4">
      <div className="bg-background border border-border rounded-lg sm:rounded-xl p-4 sm:p-6 md:p-8 space-y-4 sm:space-y-5 md:space-y-6">
        <div className="text-center">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-foreground">Sign In</h2>
          <p className="text-xs sm:text-sm md:text-base text-muted-foreground mt-0.5 sm:mt-1 md:mt-1">Choose your preferred method</p>
        </div>

        {error && (
          <div className="p-2 sm:p-2.5 md:p-3 bg-destructive/10 border border-destructive/20 rounded-md sm:rounded-lg text-xs sm:text-sm md:text-base text-destructive">
            {error}
          </div>
        )}

        <div className="space-y-1.5 sm:space-y-2 md:space-y-3">
          <button
            onClick={() => handleSocialLogin('google')}
            className="w-full px-2 sm:px-3 md:px-4 py-2 sm:py-2.5 md:py-3 text-xs sm:text-sm md:text-base border border-border rounded-md sm:rounded-lg hover:bg-accent transition-colors flex items-center justify-center gap-1 sm:gap-2 font-medium text-foreground"
          >
            <Chrome className="h-4 sm:h-4 md:h-5 w-4 sm:w-4 md:w-5" />
            Continue with Google
          </button>
          <button
            onClick={() => handleSocialLogin('github')}
            className="w-full px-2 sm:px-3 md:px-4 py-2 sm:py-2.5 md:py-3 text-xs sm:text-sm md:text-base border border-border rounded-md sm:rounded-lg hover:bg-accent transition-colors flex items-center justify-center gap-1 sm:gap-2 font-medium text-foreground"
          >
            <Github className="h-4 sm:h-4 md:h-5 w-4 sm:w-4 md:w-5" />
            Continue with GitHub
          </button>
        </div>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-border" />
          </div>
          <div className="relative flex justify-center text-xs sm:text-sm md:text-base">
            <span className="px-1 sm:px-2 md:px-2 bg-background text-muted-foreground">Or continue with email</span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-2 sm:space-y-3 md:space-y-4">
          <div>
            <label className="block text-xs sm:text-sm md:text-base font-medium text-foreground mb-1 sm:mb-1.5 md:mb-2">Email</label>
            <div className="relative">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full px-2 sm:px-3 md:px-4 py-1.5 sm:py-2 md:py-2.5 pl-8 sm:pl-9 md:pl-10 rounded-md sm:rounded-lg text-xs sm:text-sm md:text-base border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <Mail className="absolute left-2 sm:left-3 md:left-3 top-1.5 sm:top-2 md:top-2.5 h-4 sm:h-4 md:h-5 w-4 sm:w-4 md:w-5 text-muted-foreground" />
            </div>
          </div>

          <div>
            <label className="block text-xs sm:text-sm md:text-base font-medium text-foreground mb-1 sm:mb-1.5 md:mb-2">Password</label>
            <div className="relative">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-2 sm:px-3 md:px-4 py-1.5 sm:py-2 md:py-2.5 pl-8 sm:pl-9 md:pl-10 rounded-md sm:rounded-lg text-xs sm:text-sm md:text-base border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <Lock className="absolute left-2 sm:left-3 md:left-3 top-1.5 sm:top-2 md:top-2.5 h-4 sm:h-4 md:h-5 w-4 sm:w-4 md:w-5 text-muted-foreground" />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full px-2 sm:px-3 md:px-4 py-1.5 sm:py-2 md:py-2.5 text-xs sm:text-sm md:text-base bg-primary text-primary-foreground rounded-md sm:rounded-lg hover:bg-primary/90 disabled:opacity-50 transition-colors font-medium"
          >
            {isLoading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        <p className="text-center text-xs sm:text-sm md:text-base text-muted-foreground">
          Don't have an account?{' '}
          <a href="#" className="text-primary hover:underline font-medium">
            Sign up
          </a>
        </p>
      </div>
    </div>
  )
}`,
  }
]

// Convert to new template variation format
export function createLoginPanelWithVariations(): ExtendedPanel {
  const variations: TemplateVariation[] = LOGIN_PANEL_TEMPLATES.map((template) => ({
    id: `login-panel-${template.style}-${template.id}`,
    name: template.name,
    description: template.description,
    style: template.style,
    code: template.code,
    metadata: createTemplateMetadata({
      complexity: 'moderate',
      features: ['Form Validation', 'Error Handling', 'Social Auth', 'Password Toggle'],
      useCases: ['User Authentication', 'Account Access', 'Secure Login', 'Multi-auth'],
      dependencies: [...COMMON_DEPENDENCIES.core, ...COMMON_DEPENDENCIES.icons],
      implementationNotes: [
        'Includes form validation and error states',
        'Supports multiple authentication methods',
        'Accessible form inputs with labels',
        'Loading states for async operations',
        'Responsive design for all devices'
      ]
    })
  }))

  return {
    id: 'login-panel',
    name: 'Login Panel',
    description: 'Login forms with various layouts and authentication options',
    category: 'user-interface',
    variations,
    tags: ['login', 'authentication', 'form', 'user-interface', 'security']
  }
}

// Export the login panel
export const LOGIN_PANEL_WITH_VARIATIONS = createLoginPanelWithVariations()
