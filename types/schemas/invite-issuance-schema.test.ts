import { describe, expect, it } from 'vitest'
import { createInviteIssuanceSchema } from './invite-issuance-schema'

const schema = createInviteIssuanceSchema({
  nameRequired: 'required',
  nameMax: 'too long',
  emailRequired: 'required',
  emailInvalid: 'invalid',
})

describe('invite issuance schema', () => {
  it('trims a valid name and accepts email', () => {
    expect(schema.parse({ name: '  Mona Ibrahim  ', email: 'mona@example.org' })).toEqual({
      name: 'Mona Ibrahim',
      email: 'mona@example.org',
    })
  })

  it('rejects an empty name and invalid email', () => {
    expect(schema.safeParse({ name: ' ', email: 'not-an-email' }).success).toBe(false)
    expect(schema.safeParse({ name: 'Mona', email: ' ' }).error?.issues[0]?.message).toBe(
      'required',
    )
  })
})
