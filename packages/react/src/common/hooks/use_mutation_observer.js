import { useEffect } from 'react'

function useMutationObserver(
  ref,
  callback,
  options = {
    attributes: true,
    characterData: true,
    subtree: true,
    childList: true
  }
) {
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

export default useMutationObserver
