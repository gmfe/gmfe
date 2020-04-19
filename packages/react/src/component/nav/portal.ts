import { FC, useEffect, useMemo } from 'react'
import { createPortal } from 'react-dom'

const Portal: FC = ({ children }) => {
  const navContent = useMemo(() => document.createElement('div'), [])

  useEffect(() => {
    const container = document.getElementById('gmNavPopupContainer')
    container?.append(navContent)
  }, [navContent])

  return createPortal(children, navContent)
}

export default Portal
