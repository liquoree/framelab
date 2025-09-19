import { useEffect, useRef } from 'react'
import type { Frame } from '../types'

export function useAutoScroll<T extends HTMLElement>(items: Frame[]) {
  const ref = useRef<T | null>(null)
  const prevLength = useRef(items.length)

  useEffect(() => {
    if (ref.current && items.length > prevLength.current) {
      ref.current.scrollTo({
        left: ref.current.scrollWidth,
        behavior: 'smooth',
      })
    }
    prevLength.current = items.length
  }, [items.length])

  return ref
}
