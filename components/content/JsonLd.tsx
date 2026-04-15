'use client'

import { useEffect, useRef } from 'react'

interface JsonLdProps {
  schema: object
}

export default function JsonLd({ schema }: JsonLdProps) {
  const elRef = useRef<HTMLScriptElement | null>(null)

  useEffect(() => {
    const el = document.createElement('script')
    el.type = 'application/ld+json'
    el.textContent = JSON.stringify(schema)
    document.head.appendChild(el)
    elRef.current = el

    return () => {
      if (elRef.current && document.head.contains(elRef.current)) {
        document.head.removeChild(elRef.current)
      }
    }
  }, [schema])

  return null
}
