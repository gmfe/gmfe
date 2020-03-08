import { useEffect } from 'react'

export function useMutationObserver(ref, callback, options) {
  useEffect(() => {
    if (ref.current) {
      const observer = new window.MutationObserver(callback)

      observer.observe(ref.current, options)
      return () => {
        observer.disconnect()
      }
    }
  }, [callback, options])
}
