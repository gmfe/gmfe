import { FC, useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import _ from 'lodash'

const Portal: FC = ({ children }) => {
  const ref = useRef<HTMLDivElement>()

  if (_.isNil(ref.current)) {
    ref.current = document.createElement('div')
    ref.current!.setAttribute('id', '___gmtour')
  }

  useEffect(() => {
    ref.current && document.body.appendChild(ref.current)
    return () => {
      document.body.removeChild(ref.current!)
    }
  }, [ref])

  return createPortal(children, ref.current!)
}

export default Portal
