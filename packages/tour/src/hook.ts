import { MutableRefObject, useEffect } from 'react'

function useMutationObserver(
  ref: MutableRefObject<HTMLDivElement | undefined>,
  callback: MutationCallback,
  options = { attributes: true, characterData: true, subtree: true, childList: true }
) {
  useEffect((): void | (() => void) => {
    if (ref.current) {
      const observer = new window.MutationObserver(callback)
      observer.observe(ref.current, options)
      return () => {
        observer.disconnect()
      }
    }
  }, [ref, callback, options])
}

export { useMutationObserver }
