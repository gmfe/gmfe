import React, { Component } from 'react'
import { Flex } from '../flex'
import classNames from 'classnames'

const radius = 110 // 半径r
const diameter = Math.round(Math.PI * radius * 2) // 周长(路径长度)
const getOffset = (val = 0): number => Math.round(((100 - Math.min(val, 100)) / 100) * diameter)

export interface ProgressCircleProps {
  percentage: number
  text?: string
  showText?: boolean
  textPosition?: 'left' | 'center' | 'right'
  status?: 'success' | 'exception'
  size?: string | number
  lineWidth?: string | number
  progressColor?: string
  bgColor?: string
}

class ProgressCircle extends Component<ProgressCircleProps> {
  static defaultProps = {
    percentage: 0,
    status: 'success',
    showText: true,
    textPosition: 'center',
    size: '40',
    lineWidth: '60',
    bgColor: '#e4e8f1',
  }

  get text(): string | null {
    const { percentage, showText, text } = this.props
    if (!showText) return null

    return text || percentage + '%'
  }

  render() {
    const { text } = this
    const { status, textPosition, percentage, size, lineWidth, progressColor, bgColor } = this.props
    const { centerColor, animate, animationDuration, roundedStroke } = {
      centerColor: 'transparent',
      animate: false,
      animationDuration: '1s',
      roundedStroke: false,
    }

    const strokeDashoffset = getOffset(percentage)
    const transition = animate ? `stroke-dashoffset ${animationDuration} ease-out` : undefined
    const strokeLinecap = roundedStroke ? 'round' : 'butt'

    return (
      <Flex alignCenter>
        {text && textPosition === 'left' && (
          <span className='gm-progress-circle-innerText-left'>{text}</span>
        )}
        <svg width={size} height={size} viewBox='0 0 300 300'>
          <circle
            stroke={bgColor}
            cx='150'
            cy='150'
            r={radius}
            strokeWidth={lineWidth}
            fill={centerColor}
          />
          <circle
            className={classNames({
              'gm-progress-circle-success': status === 'success',
              'gm-progress-circle-exception': status === 'exception',
            })}
            transform='rotate(-90 150 150)'
            cx='150'
            cy='150'
            r={radius}
            strokeDasharray={diameter}
            strokeWidth={lineWidth}
            strokeDashoffset={diameter}
            strokeLinecap={strokeLinecap}
            fill='none'
            style={{ strokeDashoffset, transition, stroke: progressColor }}
          />
          {text && textPosition === 'center' && (
            <text
              fill='currentColor'
              fontSize='45'
              x='150'
              y='150'
              textAnchor='middle'
              dominantBaseline='central'
            >
              {text}
            </text>
          )}
        </svg>
        {text && textPosition === 'right' && (
          <span className='gm-progress-circle-innerText-right'>{text}</span>
        )}
      </Flex>
    )
  }
}

export default ProgressCircle
