'use client'

import { useQueryClient } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { authKeys } from './keys'
import { AUTH_SESSION_EVENT, type AuthSessionAction } from './session-events'
import type { CurrentUserProfile } from './types'

type SessionMessage =
  | { type: 'session.snapshot'; profile: CurrentUserProfile; expiresAt: string }
  | { type: 'session.renew_required'; expiresAt: string }
  | { type: 'session.expired' }
  | { type: 'session.revoked'; reason: string }
  | { type: 'session.unavailable' }

function socketUrl(configuredUrl: string) {
  if (configuredUrl) return configuredUrl
  const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:'
  return `${protocol}//${window.location.host}/api/v1/session/stream`
}

export function useSessionStream(configuredUrl: string, onSessionEnded: () => void) {
  const queryClient = useQueryClient()
  const [isLoading, setIsLoading] = useState(
    () => !queryClient.getQueryData(authKeys.currentUser()),
  )

  useEffect(() => {
    let socket: WebSocket | undefined
    let retryTimer: ReturnType<typeof setTimeout> | undefined
    let retries = 0
    let stopped = false
    let disposed = false
    let refreshing = false
    let recoveryAttempted = false

    const clearSocket = () => {
      if (retryTimer) clearTimeout(retryTimer)
      retryTimer = undefined
      if (socket) {
        socket.onclose = null
        socket.close(1000, 'Reconnecting')
        socket = undefined
      }
    }

    const endSession = (redirect: boolean) => {
      stopped = true
      clearSocket()
      const hadSession = Boolean(queryClient.getQueryData(authKeys.currentUser()))
      queryClient.removeQueries({ queryKey: authKeys.all })
      setIsLoading(false)
      if (redirect && hadSession) onSessionEnded()
    }

    const scheduleReconnect = () => {
      if (disposed || stopped || retryTimer) return
      const delay = Math.min(1000 * 2 ** retries, 30_000)
      retries += 1
      retryTimer = setTimeout(() => {
        retryTimer = undefined
        connect()
      }, delay)
    }

    // The access session can lapse while the refresh cookie is still valid, so try the refresh
    // endpoint before ending the session. Only one recovery is allowed per established
    // connection to avoid a reconnect loop when the refresh does not restore access.
    const renew = async () => {
      if (disposed || stopped || refreshing) return
      if (recoveryAttempted) {
        endSession(true)
        return
      }

      recoveryAttempted = true
      refreshing = true
      let outcome: 'renewed' | 'rejected' | 'failed' = 'failed'
      try {
        const response = await fetch('/api/v1/auth/session/refresh', {
          method: 'POST',
          credentials: 'include',
        })
        if (response.ok) outcome = 'renewed'
        else if (response.status === 401 || response.status === 403) outcome = 'rejected'
      } catch {
        // The normal reconnect path handles temporary network failures.
      } finally {
        refreshing = false
      }

      if (disposed || stopped) return
      if (outcome === 'renewed') {
        reconnect()
        return
      }
      if (outcome === 'rejected') {
        endSession(true)
        return
      }

      recoveryAttempted = false
      if (socket) socket.close(1012, 'Refresh unavailable')
      else scheduleReconnect()
    }

    const handleMessage = (event: MessageEvent<string>) => {
      let message: SessionMessage
      try {
        message = JSON.parse(event.data) as SessionMessage
      } catch {
        return
      }

      if (message.type === 'session.snapshot') {
        retries = 0
        recoveryAttempted = false
        queryClient.setQueryData(authKeys.currentUser(), message.profile)
        setIsLoading(false)
      } else if (message.type === 'session.renew_required') {
        void renew()
      } else if (message.type === 'session.expired') {
        void renew()
      } else if (message.type === 'session.revoked') {
        endSession(true)
      }
    }

    function connect() {
      if (disposed || stopped) return
      const nextSocket = new WebSocket(socketUrl(configuredUrl))
      socket = nextSocket
      nextSocket.onmessage = handleMessage
      nextSocket.onclose = (event) => {
        if (socket !== nextSocket || disposed || stopped) return
        socket = undefined
        if (event.code === 4401) void renew()
        else if (event.code === 4403) endSession(true)
        else scheduleReconnect()
      }
      nextSocket.onerror = () => nextSocket.close()
    }

    function reconnect() {
      stopped = false
      retries = 0
      setIsLoading(!queryClient.getQueryData(authKeys.currentUser()))
      clearSocket()
      connect()
    }

    const handleAuthEvent = (event: Event) => {
      const action = (event as CustomEvent<AuthSessionAction>).detail
      if (action === 'disconnect') endSession(false)
      else reconnect()
    }

    window.addEventListener(AUTH_SESSION_EVENT, handleAuthEvent)
    connect()

    return () => {
      disposed = true
      window.removeEventListener(AUTH_SESSION_EVENT, handleAuthEvent)
      clearSocket()
    }
  }, [configuredUrl, onSessionEnded, queryClient])

  return { isLoading }
}
