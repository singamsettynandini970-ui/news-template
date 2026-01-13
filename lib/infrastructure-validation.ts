// Infrastructure validation script
// Validates that all core components are working correctly

import { templateGenerator } from './template-generator'
import { TEMPLATE_REGISTRY, getAllPanels, findPanelById } from './template-data'
import { themeManager, shadcnIntegration } from './design-system'
import { HEADER_PANEL_WITH_VARIATIONS } from './header-templates'

interface ValidationResult {
  component: string
  status: 'PASS' | 'FAIL'
  message: string
  details?: any
}

class InfrastructureValidator {
  private results: ValidationResult[] = []

  validate(): ValidationResult[] {
    console.log('🔍 Starting infrastructure validation...\n')
    
    this.validateTemplateRegistry()
    this.validateTemplateGenerator()
    this.validateDesignSystem()
    this.validateHeaderTemplates()
    this.validateIntegration()
    
    this.printResults()
    return this.results
  }

  private validateTemplateRegistry() {
    console.log('📊 Validating Template Registry...')
    
    try {
      // Test registry structure
      if (!TEMPLATE_REGISTRY) {
        this.addResult('Template Registry', 'FAIL', 'TEMPLATE_REGISTRY is undefined')
        return
      }

      if (!TEMPLATE_REGISTRY.categories || TEMPLATE_REGISTRY.categories.length === 0) {
        this.addResult('Template Registry', 'FAIL', 'No categories found')
        return
      }

      // Validate expected structure
      const expectedPanelCount = 87
      const expectedTemplateCount = 348
      
      if (TEMPLATE_REGISTRY.totalPanels !== expectedPanelCount) {
        this.addResult('Template Registry', 'FAIL', 
          `Expected ${expectedPanelCount} panels, got ${TEMPLATE_REGISTRY.totalPanels}`)
        return
      }

      if (TEMPLATE_REGISTRY.totalTemplates !== expectedTemplateCount) {
        this.addResult('Template Registry', 'FAIL', 
          `Expected ${expectedTemplateCount} templates, got ${TEMPLATE_REGISTRY.totalTemplates}`)
        return
      }

      // Test helper functions
      const allPanels = getAllPanels()
      if (allPanels.length === 0) {
        this.addResult('Template Registry', 'FAIL', 'getAllPanels() returned empty array')
        return
      }

      const headerPanel = findPanelById('header-panel')
      if (!headerPanel) {
        this.addResult('Template Registry', 'FAIL', 'Could not find header-panel')
        return
      }

      this.addResult('Template Registry', 'PASS', 
        `Registry loaded with ${TEMPLATE_REGISTRY.categories.length} categories, ${TEMPLATE_REGISTRY.totalPanels} panels`)
      
    } catch (error) {
      this.addResult('Template Registry', 'FAIL', `Error: ${error}`)
    }
  }

  private validateTemplateGenerator() {
    console.log('⚙️  Validating Template Generator...')
    
    try {
      if (!templateGenerator) {
        this.addResult('Template Generator', 'FAIL', 'templateGenerator is undefined')
        return
      }

      // Test with header panel
      const headerPanel = findPanelById('header-panel')
      if (!headerPanel) {
        this.addResult('Template Generator', 'FAIL', 'Cannot test - header panel not found')
        return
      }

      // Create test variation
      const testVariation = {
        id: 'test-modern-1',
        name: 'Test Modern Header',
        description: 'Test variation',
        style: 'modern' as const,
        code: '',
        metadata: {
          createdDate: '2026-01-07',
          version: '1.0.0',
          author: 'Test',
          complexity: 'moderate' as const,
          responsive: true,
          accessible: true,
          darkModeSupport: true,
          dependencies: [],
          features: [],
          useCases: [],
          implementationNotes: []
        }
      }

      // Test template generation
      const template = templateGenerator.generateTemplate(headerPanel, testVariation)
      
      if (!template) {
        this.addResult('Template Generator', 'FAIL', 'generateTemplate returned null/undefined')
        return
      }

      if (!template.code || template.code.length === 0) {
        this.addResult('Template Generator', 'FAIL', 'Generated template has no code')
        return
      }

      if (!template.dependencies || template.dependencies.length === 0) {
        this.addResult('Template Generator', 'FAIL', 'Generated template has no dependencies')
        return
      }

      // Test validation
      const validation = templateGenerator.validateTemplate(template)
      if (!validation) {
        this.addResult('Template Generator', 'FAIL', 'validateTemplate returned null/undefined')
        return
      }

      this.addResult('Template Generator', 'PASS', 
        `Generated template with ${template.code.length} chars, ${template.dependencies.length} dependencies, validation: ${validation.isValid}`)
      
    } catch (error) {
      this.addResult('Template Generator', 'FAIL', `Error: ${error}`)
    }
  }

  private validateDesignSystem() {
    console.log('🎨 Validating Design System...')
    
    try {
      if (!themeManager) {
        this.addResult('Design System', 'FAIL', 'themeManager is undefined')
        return
      }

      if (!shadcnIntegration) {
        this.addResult('Design System', 'FAIL', 'shadcnIntegration is undefined')
        return
      }

      // Test theme manager
      const testVariation = {
        id: 'test-1',
        name: 'Test',
        description: 'Test',
        style: 'modern' as const,
        code: '',
        metadata: {
          createdDate: '2026-01-07',
          version: '1.0.0',
          author: 'Test',
          complexity: 'moderate' as const,
          responsive: true,
          accessible: true,
          darkModeSupport: true,
          dependencies: [],
          features: [],
          useCases: [],
          implementationNotes: []
        }
      }

      const themeClasses = themeManager.generateThemeClasses(testVariation, 'header')
      if (!themeClasses || themeClasses.length === 0) {
        this.addResult('Design System', 'FAIL', 'themeManager.generateThemeClasses returned empty')
        return
      }

      // Test shadcn integration
      const requiredComponents = shadcnIntegration.getRequiredComponents('navigation')
      if (!requiredComponents || requiredComponents.length === 0) {
        this.addResult('Design System', 'FAIL', 'shadcnIntegration.getRequiredComponents returned empty')
        return
      }

      this.addResult('Design System', 'PASS', 
        `Theme manager generated ${themeClasses.length} classes, shadcn integration found ${requiredComponents.length} components`)
      
    } catch (error) {
      this.addResult('Design System', 'FAIL', `Error: ${error}`)
    }
  }

  private validateHeaderTemplates() {
    console.log('📄 Validating Header Templates...')
    
    try {
      if (!HEADER_PANEL_WITH_VARIATIONS) {
        this.addResult('Header Templates', 'FAIL', 'HEADER_PANEL_WITH_VARIATIONS is undefined')
        return
      }

      if (!HEADER_PANEL_WITH_VARIATIONS.variations || HEADER_PANEL_WITH_VARIATIONS.variations.length === 0) {
        this.addResult('Header Templates', 'FAIL', 'No header variations found')
        return
      }

      const expectedVariations = 4
      if (HEADER_PANEL_WITH_VARIATIONS.variations.length !== expectedVariations) {
        this.addResult('Header Templates', 'FAIL', 
          `Expected ${expectedVariations} variations, got ${HEADER_PANEL_WITH_VARIATIONS.variations.length}`)
        return
      }

      // Validate each variation has required properties
      for (const variation of HEADER_PANEL_WITH_VARIATIONS.variations) {
        if (!variation.id || !variation.name || !variation.code || !variation.style) {
          this.addResult('Header Templates', 'FAIL', 
            `Variation missing required properties: ${variation.id}`)
          return
        }
      }

      this.addResult('Header Templates', 'PASS', 
        `Header panel loaded with ${HEADER_PANEL_WITH_VARIATIONS.variations.length} variations`)
      
    } catch (error) {
      this.addResult('Header Templates', 'FAIL', `Error: ${error}`)
    }
  }

  private validateIntegration() {
    console.log('🔗 Validating Integration...')
    
    try {
      // Test end-to-end integration
      const headerPanel = findPanelById('header-panel')
      if (!headerPanel || !headerPanel.variations || headerPanel.variations.length === 0) {
        this.addResult('Integration', 'FAIL', 'Header panel not properly integrated in registry')
        return
      }

      // Test template generation with real header variation
      const firstVariation = headerPanel.variations[0]
      const template = templateGenerator.generateTemplate(headerPanel, firstVariation)
      
      if (!template || !template.code) {
        this.addResult('Integration', 'FAIL', 'Failed to generate template from registry data')
        return
      }

      // Validate generated code contains expected elements
      const expectedElements = [
        'import React',
        'import { cn }',
        'export default function',
        'className={cn(',
        'bg-background',
        'text-foreground'
      ]

      for (const element of expectedElements) {
        if (!template.code.includes(element)) {
          this.addResult('Integration', 'FAIL', 
            `Generated code missing expected element: ${element}`)
          return
        }
      }

      this.addResult('Integration', 'PASS', 
        'End-to-end integration working: registry → generator → template')
      
    } catch (error) {
      this.addResult('Integration', 'FAIL', `Error: ${error}`)
    }
  }

  private addResult(component: string, status: 'PASS' | 'FAIL', message: string, details?: any) {
    this.results.push({ component, status, message, details })
    const icon = status === 'PASS' ? '✅' : '❌'
    console.log(`  ${icon} ${component}: ${message}`)
  }

  private printResults() {
    console.log('\n📋 Validation Summary:')
    console.log('=' .repeat(50))
    
    const passed = this.results.filter(r => r.status === 'PASS').length
    const failed = this.results.filter(r => r.status === 'FAIL').length
    
    console.log(`✅ Passed: ${passed}`)
    console.log(`❌ Failed: ${failed}`)
    console.log(`📊 Total:  ${this.results.length}`)
    
    if (failed === 0) {
      console.log('\n🎉 All infrastructure validation tests passed!')
      console.log('✅ Core infrastructure is ready for template expansion')
    } else {
      console.log('\n⚠️  Some validation tests failed')
      console.log('❌ Please fix issues before proceeding')
    }
  }
}

// Export validation function
export function validateInfrastructure(): boolean {
  const validator = new InfrastructureValidator()
  const results = validator.validate()
  return results.every(r => r.status === 'PASS')
}

// Run validation if this file is executed directly
if (require.main === module) {
  const success = validateInfrastructure()
  process.exit(success ? 0 : 1)
}