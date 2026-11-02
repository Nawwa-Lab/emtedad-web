import { describe, expect, it } from 'vitest'
import { isPathAllowedInContext } from './context'

describe('context routes', () => {
  it('keeps shared routes and rejects routes from the other context', () => {
    expect(isPathAllowedInContext('/khalli-khales/browse', 'org')).toBe(true)
    expect(isPathAllowedInContext('/genny/browse', 'community')).toBe(false)
    expect(isPathAllowedInContext('/shbeik-lbeik/my-wishes', 'org')).toBe(false)
    expect(isPathAllowedInContext('/fahs-mahs', 'org')).toBe(false)
    expect(isPathAllowedInContext('/alaesh-andak/request/create', 'community')).toBe(false)
  })
})
