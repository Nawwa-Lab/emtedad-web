'use client'

import { cn } from 'cn'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Children, useEffect, useRef, useState, type ReactNode } from 'react'

type CarouselProps = {
  children: ReactNode
  className?: string
  itemClassName?: string
  scrollAmount?: number
  ariaLabel?: string
  previousLabel?: string
  nextLabel?: string
  showControls?: boolean
}

export function Carousel({
  children,
  className,
  itemClassName,
  scrollAmount = 360,
  ariaLabel = 'Carousel',
  previousLabel = 'Previous',
  nextLabel = 'Next',
  showControls = true,
}: CarouselProps) {
  const rail = useRef<HTMLDivElement>(null)
  const [scrollState, setScrollState] = useState({ canGoPrevious: false, canGoNext: false })
  const [isRtl, setIsRtl] = useState(false)

  const updateScrollState = () => {
    const element = rail.current
    if (!element) return

    const firstItem = element.firstElementChild
    const lastItem = element.lastElementChild
    if (!firstItem || !lastItem) return

    const railBounds = element.getBoundingClientRect()
    const firstBounds = firstItem.getBoundingClientRect()
    const lastBounds = lastItem.getBoundingClientRect()
    const directionIsRtl = getComputedStyle(element).direction === 'rtl'
    setIsRtl(directionIsRtl)

    setScrollState({
      canGoPrevious: directionIsRtl
        ? firstBounds.right > railBounds.right + 1
        : firstBounds.left < railBounds.left - 1,
      canGoNext: directionIsRtl
        ? lastBounds.left < railBounds.left - 1
        : lastBounds.right > railBounds.right + 1,
    })
  }

  useEffect(() => {
    const element = rail.current
    if (!element) return

    updateScrollState()
    const observer = new ResizeObserver(updateScrollState)
    observer.observe(element)
    return () => observer.disconnect()
  }, [])

  const scroll = (direction: 1 | -1) => {
    const element = rail.current
    if (!element) return

    const directionIsRtl = getComputedStyle(element).direction === 'rtl'
    element.scrollBy({
      left: (directionIsRtl ? -direction : direction) * scrollAmount,
      behavior: 'smooth',
    })
  }

  return (
    <div className={cn('relative', className)}>
      {showControls && (
        <div className="absolute -top-15 end-0 z-10 hidden gap-2 sm:flex">
          <button
            type="button"
            aria-label={previousLabel}
            onClick={() => scroll(-1)}
            disabled={!scrollState.canGoPrevious}
            className="grid size-11 place-items-center rounded-full border-[2.5px] border-ink bg-surface shadow-[3px_3px_0_#1A1714] transition hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[1px_1px_0_#1A1714] disabled:cursor-not-allowed disabled:opacity-40 disabled:shadow-none"
          >
            {isRtl ? (
              <ChevronRight size={20} strokeWidth={3} />
            ) : (
              <ChevronLeft size={20} strokeWidth={3} />
            )}
          </button>
          <button
            type="button"
            aria-label={nextLabel}
            onClick={() => scroll(1)}
            disabled={!scrollState.canGoNext}
            className="grid size-11 place-items-center rounded-full border-[2.5px] border-ink bg-surface shadow-[3px_3px_0_#1A1714] transition hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[1px_1px_0_#1A1714] disabled:cursor-not-allowed disabled:opacity-40 disabled:shadow-none"
          >
            {isRtl ? (
              <ChevronLeft size={20} strokeWidth={3} />
            ) : (
              <ChevronRight size={20} strokeWidth={3} />
            )}
          </button>
        </div>
      )}
      <div
        ref={rail}
        aria-label={ariaLabel}
        onScroll={updateScrollState}
        className="-mx-1 flex snap-x items-stretch gap-5 overflow-x-auto px-1 pb-4 pt-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {Children.toArray(children).map((child, index) => (
          <div
            key={index}
            className={cn('flex shrink-0 snap-start [&>*]:h-full [&>*]:w-full', itemClassName)}
          >
            {child}
          </div>
        ))}
      </div>
    </div>
  )
}
