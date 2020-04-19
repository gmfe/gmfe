import { ReactText } from 'react'
import _ from 'lodash'

const isNumeric = (n: ReactText): boolean =>
  !isNaN(parseFloat(n as string)) && isFinite(n as number)

const setPosition = (begin: number, end: number, elapsed: number, duration: number): number => {
  const easeInOutCubic = (t: number) =>
    t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1
  return elapsed > duration ? end : begin + (end - begin) * easeInOutCubic(elapsed / duration)
}

const calcEndPoint = (
  target: ReactText | HTMLElement,
  context: HTMLElement | Window = window,
  offset = 0
): number => {
  if (isNumeric(target as ReactText)) {
    return parseInt(`${target}`) + offset
  }

  const elementContext = context as HTMLElement

  const y =
    context === window || context === document.documentElement
      ? window.pageYOffset
      : elementContext.scrollTop - elementContext.getBoundingClientRect().top
  const distance =
    (target as HTMLElement).nodeName.toLowerCase() === 'html'
      ? -y
      : (target as HTMLElement).getBoundingClientRect().top + y
  return distance + offset
}

export const scrollSmooth = (
  target: ReactText | HTMLElement,
  options: {
    duration: number
    context: Window | HTMLElement
    offset: number
    callback(target: ReactText | HTMLElement): void
  } = {
    duration: 500,
    context: window,
    offset: 0,
    callback: _.noop,
  }
) => {
  const { duration, context, offset, callback } = options
  const start = (context as HTMLElement).scrollTop ?? window.pageYOffset
  const end = calcEndPoint(target, context, offset)
  const clock = window.performance.now()
  const rAF = window.requestAnimationFrame

  const tick = () => {
    const elapsed = window.performance.now() - clock
    const pos = setPosition(start, end, elapsed, duration)
    if (context !== window) {
      ;(context as HTMLElement).scrollTop = pos
    } else {
      window.scroll(0, pos)
    }

    if (elapsed > duration) {
      callback(target)
    } else {
      rAF(tick)
    }
  }

  tick()
}

const regex = /(auto|scroll)/

const parents = function (node: Element, ps: Element[]): Element[] {
  if (_.isNil(node.parentNode)) {
    return ps
  }
  return parents(node.parentNode as Element, ps.concat([node]))
}

const style = function (node: Element, prop: string): string {
  return window.getComputedStyle(node, null).getPropertyValue(prop)
}

const overflow = function (node: Element): string {
  return `${style(node, 'overflow')} ${style(node, 'overflow-y')} ${style(node, 'overflow-x')}`
}

const scroll = function (node: Element): boolean {
  return regex.test(overflow(node))
}

export const scrollParent = function (node: Element) {
  if (!(node instanceof HTMLElement || node instanceof SVGElement)) {
    return
  }
  const ps = parents(node.parentNode as Element, [])
  for (let i = 0; i < ps.length; i += 1) {
    if (scroll(ps[i])) {
      return ps[i]
    }
  }
  return document.scrollingElement ?? document.documentElement
}

export interface GetNodeRectOptions {
  top: number
  right: number
  bottom: number
  left: number
  width: number
  height: number
}

export function getNodeRect(node: HTMLElement): GetNodeRectOptions {
  const { top, right, bottom, left, width, height } = node.getBoundingClientRect()
  return { top, right, bottom, left, width, height }
}

export function inView({
  top,
  right,
  bottom,
  left,
  w,
  h,
}: {
  top: number
  right: number
  bottom: number
  left: number
  w: number
  h: number
}) {
  return top >= 0 && left >= 0 && bottom <= h && right <= w
}

export function isBody(node: HTMLElement) {
  return node === document.querySelector('body') || node === document.querySelector('html')
}

export const isHoriz = (pos: string) => /(left|right)/.test(pos)
export const isOutsideX = (val: number, windowWidth: number) => val > windowWidth
export const isOutsideY = (val: number, windowHeight: number) => val > windowHeight
export const safe = (sum: number) => (sum < 0 ? 0 : sum)

export function bestPositionOf(positions: { [key: string]: number }) {
  return Object.keys(positions)
    .map((p) => ({ position: p, value: positions[p] }))
    .sort((a, b) => b.value - a.value)
    .map((p) => p.position)
}

export function getWindow() {
  const w = Math.max(document.documentElement.clientWidth, window.innerWidth ?? 0)
  const h = Math.max(document.documentElement.clientHeight, window.innerHeight ?? 0)
  return { w, h }
}
