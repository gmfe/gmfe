import React, { FC, MouseEvent } from 'react'
import styled from 'styled-components'
import { safe } from '../utils'

const SvgMaskWrapper = styled.div`
  opacity: 0.7;
  width: 100%;
  left: 0;
  top: 0;
  height: 100%;
  position: fixed;
  z-index: 99999;
  pointer-events: none;
  color: #000;
`

interface SvgMaskProps {
  windowWidth: number
  windowHeight: number
  targetWidth: number
  targetHeight: number
  targetTop: number
  targetLeft: number
  padding: number
  rounded: number
  disableInteraction?: boolean
  disableInteractionClassName?: string
  className?: string
  onClick?(event: MouseEvent<HTMLDivElement>): void
}

const SvgMask: FC<SvgMaskProps> = ({
  windowWidth,
  windowHeight,
  targetWidth,
  targetHeight,
  targetTop,
  targetLeft,
  padding,
  rounded,
  disableInteraction,
  disableInteractionClassName,
  className,
  onClick,
}) => {
  const width = safe(targetWidth + padding * 2)
  const height = safe(targetHeight + padding * 2)
  const top = safe(targetTop - padding)
  const left = safe(targetLeft - padding)

  return (
    <SvgMaskWrapper onClick={onClick}>
      <svg
        width={windowWidth}
        height={windowHeight}
        xmlns='http://www.w3.org/2000/svg'
        className={className}
      >
        <defs>
          <mask id='mask-main'>
            <rect x={0} y={0} width={windowWidth} height={windowHeight} fill='white' />
            <rect x={left} y={top} width={width} height={height} fill='black' />
            {/* top left rounded corner */}
            <rect x={left - 1} y={top - 1} width={rounded} height={rounded} fill='white' />
            <circle cx={left + rounded} cy={top + rounded} r={rounded} fill='black' />
            {/* top right rounded corner */}
            <rect
              x={left + width - rounded + 1}
              y={top - 1}
              width={rounded}
              height={rounded}
              fill='white'
            />
            <circle cx={left + width - rounded} cy={top + rounded} r={rounded} fill='black' />
            {/* bottom left rounded corner */}
            <rect
              x={left - 1}
              y={top + height - rounded + 1}
              width={rounded}
              height={rounded}
              fill='white'
            />
            <circle cx={left + rounded} cy={top + height - rounded} r={rounded} fill='black' />
            {/* bottom right rounded corner */}
            <rect
              x={left + width - rounded + 1}
              y={top + height - rounded + 1}
              width={rounded}
              height={rounded}
              fill='white'
            />
            <circle
              cx={left + width - rounded}
              cy={top + height - rounded}
              r={rounded}
              fill='black '
            />
          </mask>
          <clipPath id='clip-path'>
            {/* top */}
            <rect x={0} y={0} width={windowWidth} height={top} />
            {/* left */}
            <rect x={0} y={top} width={left} height={height} />
            {/* right */}
            <rect
              x={targetLeft + targetWidth + padding}
              y={top}
              width={safe(windowWidth - targetWidth - left)}
              height={height}
            />
            {/* bottom */}
            <rect
              x={0}
              y={targetTop + targetHeight + padding}
              width={windowWidth}
              height={safe(windowHeight - targetHeight - top)}
            />
          </clipPath>
        </defs>
        <rect
          x={0}
          y={0}
          width={windowWidth}
          height={windowHeight}
          fill='currentColor'
          mask='url(#mask-main)'
        />
        <rect
          x={0}
          y={0}
          width={windowWidth}
          height={windowHeight}
          fill='currentColor'
          clipPath='url(#clip-path)'
          pointerEvents='auto'
        />
        <rect
          x={left}
          y={top}
          width={width}
          height={height}
          pointerEvents='auto'
          fill='transparent'
          display={disableInteraction ? 'block' : 'none'}
          className={disableInteractionClassName}
        />
      </svg>
    </SvgMaskWrapper>
  )
}

export default SvgMask
