import { afterEach, describe, expect, it, vi } from 'vitest'
import { authApi } from './api'

afterEach(() => vi.unstubAllGlobals())

function jsonResponse(body: unknown) {
  return new Response(JSON.stringify(body), {
    status: 200,
    headers: { 'content-type': 'application/json' },
  })
}

describe('invitation API', () => {
  it('issues member and organization invitations with endpoint-owned fields only', async () => {
    const fetch = vi.fn((input: RequestInfo | URL) =>
      Promise.resolve(
        jsonResponse(
          String(input).endsWith('/auth/invite')
            ? { invitationId: 'member-1', email: 'worker@example.org', expiresAt: '2026-11-10' }
            : {
                invitationId: 'org-1',
                targetEmail: 'admin@example.org',
                expiresAt: '2026-12-03',
              },
        ),
      ),
    )
    vi.stubGlobal('fetch', fetch)

    await authApi.inviteTeamWorker({ name: 'Nour Ali', email: 'worker@example.org' })
    await authApi.inviteOrganization({
      founderFullName: 'Mona Ibrahim',
      targetEmail: 'admin@example.org',
    })

    expect(fetch).toHaveBeenNthCalledWith(
      1,
      '/api/v1/auth/invite',
      expect.objectContaining({
        method: 'POST',
        body: JSON.stringify({ name: 'Nour Ali', email: 'worker@example.org' }),
      }),
    )
    expect(fetch).toHaveBeenNthCalledWith(
      2,
      '/api/v1/invitations',
      expect.objectContaining({
        method: 'POST',
        body: JSON.stringify({
          founderFullName: 'Mona Ibrahim',
          targetEmail: 'admin@example.org',
        }),
      }),
    )
  })

  it('previews invitations without caching', async () => {
    const fetch = vi.fn((input: RequestInfo | URL, init?: RequestInit) => {
      void input
      void init
      return Promise.resolve(jsonResponse({ valid: false, reason: 'INVALID_OR_UNAVAILABLE' }))
    })
    vi.stubGlobal('fetch', fetch)

    await authApi.previewInvitation('member', 'secret-token')

    expect(fetch).toHaveBeenCalledWith(
      '/api/v1/invitations/preview',
      expect.objectContaining({
        method: 'POST',
        cache: 'no-store',
        body: JSON.stringify({ type: 'member', token: 'secret-token' }),
      }),
    )
  })

  it('never submits the locked email as an authorizing field', async () => {
    const fetch = vi.fn((input: RequestInfo | URL, init?: RequestInit) => {
      void input
      void init
      return Promise.resolve(jsonResponse({ accountId: 'a', orgId: 'o' }))
    })
    vi.stubGlobal('fetch', fetch)

    await authApi.acceptInvitation({
      token: 'secret-token',
      password: 'strong-password',
      firstName: 'Ahmed',
      lastName: 'Ali',
    })
    await authApi.registerOrganization({
      inviteToken: 'secret-token',
      password: 'strong-password',
      firstName: 'Mona',
      lastName: 'Ibrahim',
      legalName: 'New Association',
    })

    for (const [, init] of fetch.mock.calls) {
      expect(JSON.parse(String(init?.body))).not.toHaveProperty('email')
    }
  })
})

describe('password reset API', () => {
  it('previews reset tokens without caching', async () => {
    const fetch = vi.fn((input: RequestInfo | URL, init?: RequestInit) => {
      void input
      void init
      return Promise.resolve(jsonResponse({ valid: true, expiresAt: '2026-11-03T12:30:00.000Z' }))
    })
    vi.stubGlobal('fetch', fetch)

    await authApi.previewResetPassword('secret-token')

    expect(fetch).toHaveBeenCalledWith(
      '/api/v1/auth/reset-password/preview',
      expect.objectContaining({
        method: 'POST',
        cache: 'no-store',
        body: JSON.stringify({ token: 'secret-token' }),
      }),
    )
  })
})
