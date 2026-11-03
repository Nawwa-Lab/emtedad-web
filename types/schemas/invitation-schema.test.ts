import { describe, expect, it } from 'vitest'
import {
  createMemberInvitationSchema,
  createOrganizationInvitationSchema,
  splitInviteeName,
} from './invitation-schema'

const errors = {
  required: 'required',
  nameMax: 'nameMax',
  passwordMin: 'passwordMin',
  passwordMax: 'passwordMax',
  passwordMismatch: 'passwordMismatch',
  consentRequired: 'consentRequired',
  legalNameMax: 'legalNameMax',
}

const account = {
  firstName: 'Ahmed',
  lastName: 'Ali',
  password: 'strong-password',
  confirmPassword: 'strong-password',
  acceptTerms: true,
}

describe('invitation signup', () => {
  it('prefills separate names without inventing a last name', () => {
    expect(splitInviteeName('  Ahmed   Ali Hassan ')).toEqual({
      firstName: 'Ahmed',
      lastName: 'Ali Hassan',
    })
    expect(splitInviteeName('Mona')).toEqual({ firstName: 'Mona', lastName: '' })
  })

  it('requires matching passwords and consent for members', () => {
    expect(createMemberInvitationSchema(errors).safeParse(account).success).toBe(true)
    expect(
      createMemberInvitationSchema(errors).safeParse({
        ...account,
        confirmPassword: 'different-password',
        acceptTerms: false,
      }).success,
    ).toBe(false)
  })

  it('requires an organization legal name while allowing optional details to stay empty', () => {
    const schema = createOrganizationInvitationSchema(errors)
    const values = {
      ...account,
      legalName: 'Nile Learning Association',
      mission: '',
      description: '',
      websiteUrl: '',
      country: '',
      city: '',
      foundationDate: '',
      areasOfWork: [],
    }

    expect(schema.safeParse(values).success).toBe(true)
    expect(schema.safeParse({ ...values, legalName: '' }).success).toBe(false)
  })
})
