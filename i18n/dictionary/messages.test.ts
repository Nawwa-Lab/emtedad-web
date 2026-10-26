import { describe, expect, it } from 'vitest'

import { dictionaries } from '.'

function expectMatchingShape(actual: unknown, expected: unknown, path = ''): void {
  expect(Array.isArray(actual), path).toBe(Array.isArray(expected))

  if (Array.isArray(actual) && Array.isArray(expected)) {
    expect(actual).toHaveLength(expected.length)

    for (const [index, value] of actual.entries()) {
      expectMatchingShape(value, expected[index], `${path}[${index}]`)
    }

    return
  }

  const actualIsObject = typeof actual === 'object' && actual !== null
  const expectedIsObject = typeof expected === 'object' && expected !== null

  expect(actualIsObject, path).toBe(expectedIsObject)

  if (!actualIsObject || !expectedIsObject) {
    expect(typeof actual, path).toBe(typeof expected)
    return
  }

  const actualRecord = actual as Record<string, unknown>
  const expectedRecord = expected as Record<string, unknown>

  expect(Object.keys(actualRecord).sort(), path).toEqual(Object.keys(expectedRecord).sort())

  for (const key of Object.keys(actualRecord)) {
    expectMatchingShape(actualRecord[key], expectedRecord[key], path ? `${path}.${key}` : key)
  }
}

describe('locale dictionaries', () => {
  it('keeps Arabic and English message shapes aligned', () => {
    expectMatchingShape(dictionaries.ar, dictionaries.en)
  })
})
