/// <reference types="vite/client" />

import type { Preview } from '@storybook/nextjs-vite'
import { cn } from 'cn'
import type { ReactNode } from 'react'
import { useEffect } from 'react'
import '../app/[lang]/globals.css'
import { alexandriaFont, cairoFont, lalezarFont, rubikFont } from '../lib/fonts'
import { DEFAULT_LOCALE, LANGUAGES_READONLY } from '../types/constants'
import type { Locale } from '../types'

const fontVariables = [
  rubikFont.variable,
  lalezarFont.variable,
  cairoFont.variable,
  alexandriaFont.variable,
].join(' ')

function StoryFrame({
  children,
  fullHeight,
  locale,
}: {
  children: ReactNode
  fullHeight: boolean
  locale: Locale
}) {
  const language = LANGUAGES_READONLY.find(({ code }) => code === locale)
  const direction = language && 'rtl' in language && language.rtl ? 'rtl' : 'ltr'

  useEffect(() => {
    const root = document.documentElement
    const previousLanguage = root.getAttribute('lang')
    const previousDirection = root.getAttribute('dir')

    root.lang = locale
    root.dir = direction

    return () => {
      if (previousLanguage) root.lang = previousLanguage
      else root.removeAttribute('lang')

      if (previousDirection) root.dir = previousDirection
      else root.removeAttribute('dir')
    }
  }, [direction, locale])

  return (
    <div
      lang={locale}
      dir={direction}
      className={cn(
        fontVariables,
        'bg-paper text-ink font-body',
        fullHeight ? 'min-h-screen flex justify-center items-center' : 'p-4',
      )}
    >
      {children}
    </div>
  )
}

const preview: Preview = {
  initialGlobals: {
    locale: DEFAULT_LOCALE,
  },
  globalTypes: {
    locale: {
      name: 'Language',
      description: 'Language and writing direction for stories',
      toolbar: {
        icon: 'globe',
        dynamicTitle: true,
        items: LANGUAGES_READONLY.map(({ code, label }) => ({
          value: code,
          title: label,
        })),
      },
    },
  },
  decorators: [
    (Story, context) => {
      const locale = context.globals.locale as Locale

      return (
        <StoryFrame locale={locale} fullHeight={context.viewMode === 'story'}>
          <Story />
        </StoryFrame>
      )
    },
  ],
  parameters: {
    backgrounds: {
      disable: true,
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },

    a11y: {
      // 'todo' - show a11y violations in the test UI only
      // 'error' - fail CI on a11y violations
      // 'off' - skip a11y checks entirely
      test: 'error',
    },
  },
}

export default preview
