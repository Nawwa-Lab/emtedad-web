'use client'

import { useEffect, useState } from 'react'
import { useQueryClient } from '@tanstack/react-query'
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

    const renew = async () => {
      try {
        const response = await fetch('/api/v1/auth/session/refresh', {
          method: 'POST',
          credentials: 'include',
        })
        if (response.ok) {
          reconnect()
          return
        }
        if (response.status === 401 || response.status === 403) {
          endSession(true)
          return
        }
      } catch {
        // The normal reconnect path handles temporary network failures.
      }
      socket?.close(1012, 'Refresh unavailable')
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
        queryClient.setQueryData(authKeys.currentUser(), message.profile)
        setIsLoading(false)
      } else if (message.type === 'session.renew_required') {
        void renew()
      } else if (message.type === 'session.expired') {
        endSession(true)
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
        if (event.code === 4401 || event.code === 4403) endSession(true)
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
