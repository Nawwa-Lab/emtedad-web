import { describe, expect, it } from 'vitest'
import { createWishSchema } from './wish-schema'

const schema = createWishSchema({
  queryRequired: 'query',
  titleRequired: 'title',
  titleMin: 'title min',
  descriptionRequired: 'description',
  descriptionMin: 'description min',
  categoryRequired: 'category',
  categoryMax: 'category max',
  categoryWords: 'category words',
  impactRequired: 'impact',
  impactMin: 'impact min',
  requireImpact: false,
})

const values = {
  query: 'legal',
  title: 'Legal support',
  description: 'A sufficiently long description',
  impact: '',
}

describe('wish category tag', () => {
  it.each([[['Health']], [['Legal aid', 'Training']], [['صحة']], [['دعم قانوني', 'تدريب']]])(
    'accepts %j',
    (category) => {
      expect(schema.safeParse({ ...values, category }).success).toBe(true)
    },
  )

  it('normalizes whitespace in every tag', () => {
    expect(schema.parse({ ...values, category: ['  Legal   aid  '] }).category).toEqual([
      'Legal aid',
    ])
  })

  it.each([[[]], [['one two three']], [['Legal · aid']], [['#health']], [['one', 'two', 'three']]])(
    'rejects %j',
    (category) => {
      expect(schema.safeParse({ ...values, category }).success).toBe(false)
    },
  )
})
