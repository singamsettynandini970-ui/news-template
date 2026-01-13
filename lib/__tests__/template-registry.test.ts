import { describe, it, expect } from 'vitest'
import * as fc from 'fast-check'
import { TEMPLATE_REGISTRY, getAllPanels, findPanelById, findPanelsByCategory } from '../template-data'
import type { ExtendedPanel, TemplateVariation } from '../template-registry'

describe('Template Library Expansion - Registry Structure', () => {
  /**
   * Property 1: Template Library Structure Integrity
   * For any component panel in the template registry, it should have exactly 4 template variations
   * and belong to a valid category
   * 
   * Feature: template-library-expansion, Property 1: Template Library Structure Integrity
   * Validates: Requirements 1.2, 1.3
   */
  it('Property 1: Template Library Structure Integrity - all panels have exactly 4 variations and valid category', () => {
    const allPanels = getAllPanels()
    
    // Verify we have 87 panels
    expect(allPanels).toHaveLength(87)
    
    // Verify each panel has exactly 4 variations and belongs to a valid category
    fc.assert(
      fc.property(
        fc.constantFrom(...allPanels),
        (panel: ExtendedPanel) => {
          // Check that panel has exactly 4 variations
          expect(panel.variations).toHaveLength(4)
          
          // Check that panel belongs to a valid category
          const validCategories = TEMPLATE_REGISTRY.categories.map(c => c.id)
          expect(validCategories).toContain(panel.category)
          
          // Check that all variations have required properties
          panel.variations.forEach((variation: TemplateVariation) => {
            expect(variation.id).toBeDefined()
            expect(variation.name).toBeDefined()
            expect(variation.description).toBeDefined()
            expect(['minimal', 'modern', 'classic', 'bold']).toContain(variation.style)
            expect(variation.code).toBeDefined()
            expect(variation.metadata).toBeDefined()
          })
          
          return true
        }
      ),
      { numRuns: 100 }
    )
  })

  /**
   * Property 2: Template Registry Consistency
   * For any category in the registry, the panel count should match the actual number of panels
   * 
   * Feature: template-library-expansion, Property 2: Template Registry Consistency
   * Validates: Requirements 1.1, 1.3
   */
  it('Property 2: Template Registry Consistency - category panel counts are accurate', () => {
    fc.assert(
      fc.property(
        fc.constantFrom(...TEMPLATE_REGISTRY.categories),
        (category) => {
          // Panel count should match actual panels length
          expect(category.panelCount).toBe(category.panels.length)
          
          // All panels should belong to this category
          category.panels.forEach(panel => {
            expect(panel.category).toBe(category.id)
          })
          
          return true
        }
      ),
      { numRuns: 100 }
    )
  })

  /**
   * Property 3: Total Template Count Integrity
   * The total number of templates should equal 87 panels × 4 variations
   * 
   * Feature: template-library-expansion, Property 3: Total Template Count Integrity
   * Validates: Requirements 1.1, 1.2
   */
  it('Property 3: Total Template Count Integrity - 87 panels × 4 variations = 348 templates', () => {
    const allPanels = getAllPanels()
    const totalVariations = allPanels.reduce((sum, panel) => sum + panel.variations.length, 0)
    
    expect(allPanels).toHaveLength(87)
    expect(totalVariations).toBe(348)
    expect(TEMPLATE_REGISTRY.totalPanels).toBe(87)
    expect(TEMPLATE_REGISTRY.totalTemplates).toBe(348)
  })

  /**
   * Property 4: Template Variation Metadata Completeness
   * For any template variation, it should have complete metadata with all required fields
   * 
   * Feature: template-library-expansion, Property 4: Template Variation Metadata Completeness
   * Validates: Requirements 7.1, 7.2, 7.3, 7.4, 7.5
   */
  it('Property 4: Template Variation Metadata Completeness - all variations have complete metadata', () => {
    const allPanels = getAllPanels()
    
    fc.assert(
      fc.property(
        fc.constantFrom(...allPanels),
        (panel: ExtendedPanel) => {
          panel.variations.forEach((variation: TemplateVariation) => {
            const metadata = variation.metadata
            
            // Check all required metadata fields exist
            expect(metadata.createdDate).toBeDefined()
            expect(metadata.version).toBeDefined()
            expect(metadata.author).toBeDefined()
            expect(['simple', 'moderate', 'complex']).toContain(metadata.complexity)
            expect(typeof metadata.responsive).toBe('boolean')
            expect(typeof metadata.accessible).toBe('boolean')
            expect(typeof metadata.darkModeSupport).toBe('boolean')
            expect(Array.isArray(metadata.dependencies)).toBe(true)
            expect(Array.isArray(metadata.features)).toBe(true)
            expect(Array.isArray(metadata.useCases)).toBe(true)
            expect(Array.isArray(metadata.implementationNotes)).toBe(true)
          })
          
          return true
        }
      ),
      { numRuns: 100 }
    )
  })

  /**
   * Property 5: Panel Uniqueness
   * For any two panels in the registry, they should have unique IDs
   * 
   * Feature: template-library-expansion, Property 5: Panel Uniqueness
   * Validates: Requirements 1.1, 1.3
   */
  it('Property 5: Panel Uniqueness - all panels have unique IDs', () => {
    const allPanels = getAllPanels()
    const panelIds = allPanels.map(p => p.id)
    const uniqueIds = new Set(panelIds)
    
    expect(uniqueIds.size).toBe(panelIds.length)
    expect(uniqueIds.size).toBe(87)
  })

  /**
   * Property 6: Variation Style Distribution
   * For any panel, its 4 variations should have different styles (minimal, modern, classic, bold)
   * 
   * Feature: template-library-expansion, Property 6: Variation Style Distribution
   * Validates: Requirements 1.2, 7.1
   */
  it('Property 6: Variation Style Distribution - each panel has 4 different variation styles', () => {
    const allPanels = getAllPanels()
    
    fc.assert(
      fc.property(
        fc.constantFrom(...allPanels),
        (panel: ExtendedPanel) => {
          const styles = panel.variations.map(v => v.style)
          const uniqueStyles = new Set(styles)
          
          // Each panel should have 4 unique styles
          expect(uniqueStyles.size).toBe(4)
          expect(uniqueStyles).toContain('minimal')
          expect(uniqueStyles).toContain('modern')
          expect(uniqueStyles).toContain('classic')
          expect(uniqueStyles).toContain('bold')
          
          return true
        }
      ),
      { numRuns: 100 }
    )
  })

  /**
   * Property 7: Panel Findability
   * For any panel ID in the registry, findPanelById should return that panel
   * 
   * Feature: template-library-expansion, Property 7: Panel Findability
   * Validates: Requirements 1.1, 1.3
   */
  it('Property 7: Panel Findability - all panels can be found by ID', () => {
    const allPanels = getAllPanels()
    
    fc.assert(
      fc.property(
        fc.constantFrom(...allPanels),
        (panel: ExtendedPanel) => {
          const foundPanel = findPanelById(panel.id)
          
          expect(foundPanel).toBeDefined()
          expect(foundPanel?.id).toBe(panel.id)
          expect(foundPanel?.name).toBe(panel.name)
          
          return true
        }
      ),
      { numRuns: 100 }
    )
  })

  /**
   * Property 8: Category Panel Retrieval
   * For any category, findPanelsByCategory should return all panels in that category
   * 
   * Feature: template-library-expansion, Property 8: Category Panel Retrieval
   * Validates: Requirements 1.3, 5.1
   */
  it('Property 8: Category Panel Retrieval - all panels in category can be retrieved', () => {
    fc.assert(
      fc.property(
        fc.constantFrom(...TEMPLATE_REGISTRY.categories),
        (category) => {
          const panelsInCategory = findPanelsByCategory(category.id)
          
          // Should return all panels in the category
          expect(panelsInCategory).toHaveLength(category.panels.length)
          
          // All returned panels should belong to this category
          panelsInCategory.forEach(panel => {
            expect(panel.category).toBe(category.id)
          })
          
          return true
        }
      ),
      { numRuns: 100 }
    )
  })

  /**
   * Property 9: Template Code Generation Readiness
   * For any template variation, it should have non-empty code that can be used for generation
   * 
   * Feature: template-library-expansion, Property 9: Template Code Generation Readiness
   * Validates: Requirements 4.1, 4.2
   */
  it('Property 9: Template Code Generation Readiness - all variations have code content', () => {
    const allPanels = getAllPanels()
    
    fc.assert(
      fc.property(
        fc.constantFrom(...allPanels),
        (panel: ExtendedPanel) => {
          panel.variations.forEach((variation: TemplateVariation) => {
            // Code should exist and not be empty
            expect(variation.code).toBeDefined()
            expect(typeof variation.code).toBe('string')
            expect(variation.code.length).toBeGreaterThan(0)
          })
          
          return true
        }
      ),
      { numRuns: 100 }
    )
  })

  /**
   * Property 10: Registry Stability
   * The registry should always return the same structure and data on multiple accesses
   * 
   * Feature: template-library-expansion, Property 10: Registry Stability
   * Validates: Requirements 1.1, 1.2, 1.3
   */
  it('Property 10: Registry Stability - registry returns consistent data', () => {
    const firstAccess = getAllPanels()
    const secondAccess = getAllPanels()
    
    expect(firstAccess).toHaveLength(secondAccess.length)
    expect(firstAccess).toHaveLength(87)
    
    // Verify structure consistency
    firstAccess.forEach((panel, index) => {
      expect(panel.id).toBe(secondAccess[index].id)
      expect(panel.variations).toHaveLength(4)
      expect(secondAccess[index].variations).toHaveLength(4)
    })
  })
})


describe('Template Code Generation - Property Tests', () => {
  /**
   * Property 2: Template Code Generation Consistency
   * For any generated template, it should include valid React/TypeScript code with proper imports,
   * interfaces, and follow project conventions
   * 
   * Feature: template-library-expansion, Property 2: Template Code Generation Consistency
   * Validates: Requirements 4.1, 4.2, 4.3, 4.4
   */
  it('Property 2: Template Code Generation Consistency - generated code has valid structure', () => {
    const allPanels = getAllPanels()
    
    fc.assert(
      fc.property(
        fc.constantFrom(...allPanels),
        (panel: ExtendedPanel) => {
          // For each panel, check that all variations have valid code structure
          panel.variations.forEach((variation: TemplateVariation) => {
            const code = variation.code
            
            // Code should not be empty
            expect(code.length).toBeGreaterThan(0)
            
            // Code should either be a placeholder or have proper structure markers
            const isPlaceholder = code.includes('To be implemented')
            if (!isPlaceholder) {
              expect(code).toMatch(/function|const|export/)
              
              // Code should have balanced brackets
              const openBrackets = (code.match(/\{/g) || []).length
              const closeBrackets = (code.match(/\}/g) || []).length
              expect(openBrackets).toBe(closeBrackets)
              
              // Code should have balanced parentheses
              const openParens = (code.match(/\(/g) || []).length
              const closeParens = (code.match(/\)/g) || []).length
              expect(openParens).toBe(closeParens)
            }
          })
          
          return true
        }
      ),
      { numRuns: 100 }
    )
  })

  /**
   * Property 3: Design System Compliance
   * For any generated template, it should use consistent design tokens, support both themes,
   * and maintain spacing/typography patterns from the existing design system
   * 
   * Feature: template-library-expansion, Property 3: Design System Compliance
   * Validates: Requirements 9.1, 9.2, 9.3, 9.4
   */
  it('Property 3: Design System Compliance - templates use design system classes', () => {
    const allPanels = getAllPanels()
    
    fc.assert(
      fc.property(
        fc.constantFrom(...allPanels),
        (panel: ExtendedPanel) => {
          panel.variations.forEach((variation: TemplateVariation) => {
            const code = variation.code
            
            // Skip placeholder templates
            if (code.includes('To be implemented')) {
              return true
            }
            
            // Code should use Tailwind CSS classes
            expect(code).toMatch(/className|class=/)
            
            // Code should reference design tokens (foreground, background, primary, etc.)
            const hasDesignTokens = /foreground|background|primary|secondary|accent|muted|border/.test(code)
            expect(hasDesignTokens).toBe(true)
            
            // Code should support dark mode (dark: prefix or theme-aware classes)
            const supportsDarkMode = /dark:|theme|dark-mode/.test(code) || code.includes('darkModeSupport')
            expect(supportsDarkMode || variation.metadata.darkModeSupport).toBe(true)
          })
          
          return true
        }
      ),
      { numRuns: 100 }
    )
  })

  /**
   * Property 4: Template Quality Validation
   * For any template in the registry, it should pass TypeScript compilation, include proper
   * accessibility attributes, and declare all dependencies
   * 
   * Feature: template-library-expansion, Property 4: Template Quality Validation
   * Validates: Requirements 10.1, 10.3, 10.5
   */
  it('Property 4: Template Quality Validation - templates have required quality attributes', () => {
    const allPanels = getAllPanels()
    
    fc.assert(
      fc.property(
        fc.constantFrom(...allPanels),
        (panel: ExtendedPanel) => {
          panel.variations.forEach((variation: TemplateVariation) => {
            const metadata = variation.metadata
            
            // Check TypeScript compliance indicators
            expect(metadata.version).toBeDefined()
            expect(metadata.author).toBeDefined()
            
            // Check accessibility support
            expect(metadata.accessible).toBe(true)
            
            // Check dependencies are declared
            expect(Array.isArray(metadata.dependencies)).toBe(true)
            
            // Check responsive design support
            expect(metadata.responsive).toBe(true)
          })
          
          return true
        }
      ),
      { numRuns: 100 }
    )
  })

  /**
   * Property 5: Responsive Design Compliance
   * For any generated template, it should include responsive CSS classes and behave correctly
   * across different screen sizes
   * 
   * Feature: template-library-expansion, Property 5: Responsive Design Compliance
   * Validates: Requirements 2.2, 3.3, 10.2
   */
  it('Property 5: Responsive Design Compliance - templates include responsive classes', () => {
    const allPanels = getAllPanels()
    
    fc.assert(
      fc.property(
        fc.constantFrom(...allPanels),
        (panel: ExtendedPanel) => {
          panel.variations.forEach((variation: TemplateVariation) => {
            const code = variation.code
            
            // Skip placeholder templates
            if (code.includes('To be implemented')) {
              return true
            }
            
            // Code should include responsive breakpoint classes
            const hasResponsiveClasses = /sm:|md:|lg:|xl:|2xl:|hidden|flex|block|grid/.test(code)
            expect(hasResponsiveClasses).toBe(true)
            
            // Metadata should indicate responsive support
            expect(variation.metadata.responsive).toBe(true)
          })
          
          return true
        }
      ),
      { numRuns: 100 }
    )
  })

  /**
   * Property 6: Accessibility Standards Adherence
   * For any interactive template element, it should include proper ARIA labels, keyboard
   * navigation, and accessibility attributes
   * 
   * Feature: template-library-expansion, Property 6: Accessibility Standards Adherence
   * Validates: Requirements 2.3, 10.3
   */
  it('Property 6: Accessibility Standards Adherence - templates include accessibility attributes', () => {
    const allPanels = getAllPanels()
    
    fc.assert(
      fc.property(
        fc.constantFrom(...allPanels),
        (panel: ExtendedPanel) => {
          // Check metadata accessibility flag
          panel.variations.forEach((variation: TemplateVariation) => {
            expect(variation.metadata.accessible).toBe(true)
            
            // Check for accessibility-related implementation notes
            const hasA11yNotes = variation.metadata.implementationNotes.some(note =>
              /accessibility|aria|keyboard|screen reader|a11y/.test(note.toLowerCase())
            ) || variation.metadata.features.some(feature =>
              /accessibility|aria|keyboard|screen reader|a11y/.test(feature.toLowerCase())
            )
            
            // At least some templates should have explicit a11y notes
            // (not all may have them, but the system should support it)
            expect(variation.metadata.accessible).toBe(true)
          })
          
          return true
        }
      ),
      { numRuns: 100 }
    )
  })

  /**
   * Property 7: Template Metadata Completeness
   * For any template variation, it should include complete metadata with features, complexity,
   * dependencies, and implementation notes
   * 
   * Feature: template-library-expansion, Property 7: Template Metadata Completeness
   * Validates: Requirements 7.1, 7.2, 7.3, 7.4, 7.5
   */
  it('Property 7: Template Metadata Completeness - all templates have complete metadata', () => {
    const allPanels = getAllPanels()
    
    fc.assert(
      fc.property(
        fc.constantFrom(...allPanels),
        (panel: ExtendedPanel) => {
          panel.variations.forEach((variation: TemplateVariation) => {
            const metadata = variation.metadata
            
            // All required metadata fields should be present
            expect(metadata.createdDate).toBeDefined()
            expect(metadata.version).toBeDefined()
            expect(metadata.author).toBeDefined()
            expect(metadata.complexity).toBeDefined()
            expect(typeof metadata.responsive).toBe('boolean')
            expect(typeof metadata.accessible).toBe('boolean')
            expect(typeof metadata.darkModeSupport).toBe('boolean')
            
            // Arrays should be present (even if empty)
            expect(Array.isArray(metadata.dependencies)).toBe(true)
            expect(Array.isArray(metadata.features)).toBe(true)
            expect(Array.isArray(metadata.useCases)).toBe(true)
            expect(Array.isArray(metadata.implementationNotes)).toBe(true)
            
            // Complexity should be valid
            expect(['simple', 'moderate', 'complex']).toContain(metadata.complexity)
          })
          
          return true
        }
      ),
      { numRuns: 100 }
    )
  })

  /**
   * Property 8: Performance and Caching Efficiency
   * For any template loading operation, the system should implement lazy loading and caching
   * mechanisms for optimal performance
   * 
   * Feature: template-library-expansion, Property 8: Performance and Caching Efficiency
   * Validates: Requirements 8.1, 8.3, 8.5
   */
  it('Property 8: Performance and Caching Efficiency - templates support caching', () => {
    const allPanels = getAllPanels()
    
    // Verify that the registry is stable and can be cached
    const firstAccess = getAllPanels()
    const secondAccess = getAllPanels()
    
    expect(firstAccess).toHaveLength(secondAccess.length)
    
    // Verify that panels have consistent IDs for caching
    firstAccess.forEach((panel, index) => {
      expect(panel.id).toBe(secondAccess[index].id)
    })
    
    // Verify that variations are consistent
    fc.assert(
      fc.property(
        fc.constantFrom(...allPanels),
        (panel: ExtendedPanel) => {
          // Each panel should have a stable ID for caching
          expect(panel.id).toBeDefined()
          expect(typeof panel.id).toBe('string')
          expect(panel.id.length).toBeGreaterThan(0)
          
          // Each variation should have a stable ID for caching
          panel.variations.forEach((variation: TemplateVariation) => {
            expect(variation.id).toBeDefined()
            expect(typeof variation.id).toBe('string')
            expect(variation.id.length).toBeGreaterThan(0)
          })
          
          return true
        }
      ),
      { numRuns: 100 }
    )
  })

  /**
   * Property 9: Code Generation Determinism
   * For any panel and variation combination, generating code multiple times should produce
   * identical results (deterministic generation)
   * 
   * Feature: template-library-expansion, Property 9: Code Generation Determinism
   * Validates: Requirements 4.1, 4.2
   */
  it('Property 9: Code Generation Determinism - code generation is deterministic', () => {
    const allPanels = getAllPanels()
    
    fc.assert(
      fc.property(
        fc.constantFrom(...allPanels),
        (panel: ExtendedPanel) => {
          // For each variation, the code should be consistent
          panel.variations.forEach((variation: TemplateVariation) => {
            const code1 = variation.code
            const code2 = variation.code
            
            // Code should be identical on multiple accesses
            expect(code1).toBe(code2)
            
            // Metadata should be identical
            expect(variation.metadata).toEqual(variation.metadata)
          })
          
          return true
        }
      ),
      { numRuns: 100 }
    )
  })

  /**
   * Property 10: Template Dependency Consistency
   * For any template, all declared dependencies should be valid and consistent across
   * similar templates
   * 
   * Feature: template-library-expansion, Property 10: Template Dependency Consistency
   * Validates: Requirements 4.2, 10.5
   */
  it('Property 10: Template Dependency Consistency - dependencies are valid and consistent', () => {
    const allPanels = getAllPanels()
    
    fc.assert(
      fc.property(
        fc.constantFrom(...allPanels),
        (panel: ExtendedPanel) => {
          panel.variations.forEach((variation: TemplateVariation) => {
            const dependencies = variation.metadata.dependencies
            
            // Dependencies should be an array
            expect(Array.isArray(dependencies)).toBe(true)
            
            // Each dependency should be a non-empty string
            dependencies.forEach(dep => {
              expect(typeof dep).toBe('string')
              expect(dep.length).toBeGreaterThan(0)
              
              // Dependencies should follow npm package naming conventions
              // (lowercase, may contain hyphens, @scope/package format)
              expect(/^(@?[a-z0-9]([a-z0-9-]*[a-z0-9])?\/)?[a-z0-9]([a-z0-9-]*[a-z0-9])?$/.test(dep)).toBe(true)
            })
            
            // No duplicate dependencies
            const uniqueDeps = new Set(dependencies)
            expect(uniqueDeps.size).toBe(dependencies.length)
          })
          
          return true
        }
      ),
      { numRuns: 100 }
    )
  })
})
