import React, { CSSProperties, FC, HTMLAttributes } from 'react'
import classNames from 'classnames'
import Loading from './loading'

export interface LoadingChunkProps extends HTMLAttributes<HTMLDivElement> {
  loading?: boolean
  text?: string
  size?: number
  className?: string
  style?: CSSProperties
}

const LoadingChunk: FC<LoadingChunkProps> = ({
  loading,
  className,
  children,
  size = 50,
  style,
  text,
  ...rest
}) => {
  return (
    <div
      {...rest}
      className={classNames(className, {
        'gm-loading-chunk': loading,
      })}
    >
      {children || <div style={{ height: (size || 50) + 'px' }} />}
      {loading && (
        <div className='gm-loading-mask'>
          <Loading
            style={{
              ...style,
              width: size + 'px',
              height: size + 'px',
            }}
            text={text}
            size={size}
            className='gm-loading-position'
          />
        </div>
      )}
    </div>
  )
}

export default LoadingChunk
