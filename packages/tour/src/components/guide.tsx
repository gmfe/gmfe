import { FC, HTMLAttributes, RefObject } from 'react'
import styled from 'styled-components'
import * as utils from '../utils'
import { ReducerState } from '../reducer'
import { TourStepOptions } from '../types'

type Position = TourStepOptions['position']

interface GuideProps extends HTMLAttributes<HTMLDivElement> {
  ref: RefObject<HTMLDivElement>
  windowWidth: number
  windowHeight: number
  targetWidth: number
  targetHeight: number
  targetTop: number
  targetLeft: number
  targetRight: number
  targetBottom: number
  helperWidth: number
  helperHeight: number
  helperPosition: ReducerState['helperPosition']
  padding: number
  current: number
  rounded: number
}

const Guide: FC<GuideProps> = styled.div`
  max-width: 350px;
  min-width: 200px;
  padding-right: 40px;
  background-color: #fff;
  box-shadow: 0 0.5em 3em rgba(0, 0, 0, 0.3);
  color: inherit;
  ${(props: GuideProps) => `
    border-radius: ${props.rounded}px;
  `};
  position: fixed;
  transition: transform 0.3s;
  top: 0;
  left: 0;
  outline: none;
  z-index: 1000000;
  transform: ${(props: GuideProps) => {
    const {
      targetTop,
      targetRight,
      targetBottom,
      targetLeft,
      windowWidth,
      windowHeight,
      helperWidth,
      helperHeight,
      helperPosition,
      padding,
    } = props

    const available = {
      left: targetLeft,
      right: windowWidth - targetRight,
      top: targetTop,
      bottom: windowHeight - targetBottom,
    }

    const couldPositionAt = (position: Position) => {
      return (
        available[position as Exclude<Position, undefined | number[] | 'center'>] >
        (utils.isHoriz(position as string) ? helperWidth + padding * 2 : helperHeight + padding * 2)
      )
    }

    const autoPosition = (coords: {
      left: number[]
      right: number[]
      top: number[]
      bottom: number[]
      center: number[]
    }) => {
      const positionsOrder = utils.bestPositionOf(available)
      for (let j = 0; j < positionsOrder.length; j++) {
        if (couldPositionAt(positionsOrder[j] as Position)) {
          return coords[positionsOrder[j] as 'left' | 'right' | 'top' | 'bottom' | 'center']
        }
      }
      return coords.center
    }

    const pos = (helperPosition: TourStepOptions['position']) => {
      if (Array.isArray(helperPosition)) {
        const isOutX = utils.isOutsideX(helperPosition[0], windowWidth)
        const isOutY = utils.isOutsideY(helperPosition[1], windowHeight)
        const warn = (axis: string, num: number) => {
          console.warn(`${axis}:${num} is outside window, falling back to center`)
        }
        if (isOutX) warn('x', helperPosition[0])
        if (isOutY) warn('y', helperPosition[1])
        return [
          isOutX ? windowWidth / 2 - helperWidth / 2 : helperPosition[0],
          isOutY ? windowHeight / 2 - helperHeight / 2 : helperPosition[1],
        ]
      }

      const hX = utils.isOutsideX(targetLeft + helperWidth, windowWidth)
        ? utils.isOutsideX(targetRight + padding, windowWidth)
          ? targetRight - helperWidth
          : targetRight - helperWidth + padding
        : targetLeft - padding
      const x = hX > padding ? hX : padding
      const hY = utils.isOutsideY(targetTop + helperHeight, windowHeight)
        ? utils.isOutsideY(targetBottom + padding, windowHeight)
          ? targetBottom - helperHeight
          : targetBottom - helperHeight + padding
        : targetTop - padding
      const y = hY > padding ? hY : padding
      const coords = {
        top: [x, targetTop - helperHeight - padding * 2],
        right: [targetRight + padding * 2, y],
        bottom: [x, targetBottom + padding * 2],
        left: [targetLeft - helperWidth - padding * 2, y],
        center: [windowWidth / 2 - helperWidth / 2, windowHeight / 2 - helperHeight / 2],
      }
      if (helperPosition === 'center' || couldPositionAt(helperPosition)) {
        return coords[helperPosition!]
      }
      return autoPosition(coords)
    }

    const p = pos(helperPosition)

    return `translate(${Math.round(p[0])}px, ${Math.round(p[1])}px)`
  }};
`

export default Guide
