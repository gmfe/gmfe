import React, { FC, HTMLAttributes } from 'react'
import classNames from 'classnames'
import SVGSuccessCircle from '../../../svg/success-circle.svg'
import SVGCloseCircle from '../../../svg/close-circle.svg'

export interface ProgressBarProps extends HTMLAttributes<HTMLDivElement> {
  percentage: number
  text?: string
  status?: 'success' | 'exception'
  strokeWidth?: number
  textInside?: boolean
  textInsideFix?: 'left' | 'right' | 'center'
  showText?: boolean
  className?: string
  textColor?: string
  strokeColor?: string
  bgColor?: string
}

const ProgressBar: FC<ProgressBarProps> = ({
  className,
  status,
  showText,
  strokeColor,
  strokeWidth,
  bgColor,
  percentage,
  textInside,
  textInsideFix,
  text,
  textColor,
  ...rest
}) => {
  return (
    <div className={classNames('gm-progress', className)} {...rest}>
      <div className='gm-progress-bar'>
        <div
          className='gm-progress-bar-outer'
          style={{ height: `${strokeWidth}px`, backgroundColor: bgColor }}
        >
          <div
            className={classNames('gm-progress-bar-inner', {
              'gm-progress-bar-success': status === 'success',
              'gm-progress-bar-exception': status === 'exception',
            })}
            style={{ width: `${percentage}%`, background: strokeColor }}
          >
            {showText && textInside && !textInsideFix && (
              <div className='gm-progress-bar-innerText' style={{ color: textColor }}>
                {text || `${percentage}%`}
              </div>
            )}
          </div>
          {showText && textInside && textInsideFix && (
            <div
              className={classNames('gm-progress-bar-innerTextFix-wrapper')}
              style={{ textAlign: textInsideFix }}
            >
              <div className='gm-progress-bar-innerText' style={{ color: textColor }}>
                {text || `${percentage}%`}
              </div>
            </div>
          )}
        </div>
      </div>
      {showText && !textInside && (
        <div className='gm-progress-bar-text' style={{ fontSize: `12px`, color: textColor }}>
          {status ? (
            status === 'success' ? (
              <SVGSuccessCircle className='gm-progress-bar-success-icon' />
            ) : (
              <SVGCloseCircle className='gm-progress-bar-exception-icon' />
            )
          ) : (
            text || `${percentage}%`
          )}
        </div>
      )}
    </div>
  )
}
ProgressBar.defaultProps = {
  textInside: false,
  showText: true,
}

export default ProgressBar
