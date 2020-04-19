import React, { CSSProperties, FC, HTMLAttributes } from 'react'
import classNames from 'classnames'

export interface LoadingProps extends HTMLAttributes<HTMLDivElement> {
  text?: string
  size?: number
  className?: string
  style?: CSSProperties
}

const Loading: FC<LoadingProps> = ({ className, text, size = 40, style, ...rest }) => {
  return (
    <div {...rest} className={classNames('gm-loading', className)}>
      <svg
        className='gm-loading-circular'
        style={{
          ...style,
          width: size + 'px',
          height: size + 'px',
        }}
        viewBox='0 0 50 50'
      >
        <circle className='gm-loading-path' cx='25' cy='25' r='20' fill='none' />
      </svg>
      {text && <p className='gm-loading-text'>{text}</p>}
    </div>
  )
}

export default Loading
