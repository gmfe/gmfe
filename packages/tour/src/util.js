const isNumeric = n => !isNaN(parseFloat(n)) && isFinite(n)

const setPosition = (begin, end, elapsed, duration) => {
  const easeInOutCubic = t =>
    t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1
  return elapsed > duration
    ? end
    : begin + (end - begin) * easeInOutCubic(elapsed / duration)
}

const calcEndPoint = (target, context = window, offset = 0) => {
  if (isNumeric(target)) {
    return parseInt(target) + offset
  }

  const y =
    context === window || context === document.documentElement
      ? window.pageYOffset
      : context.scrollTop - context.getBoundingClientRect().top

  const distance =
    target.nodeName.toLowerCase() === 'html'
      ? -y
      : target.getBoundingClientRect().top + y

  return distance + offset
}

export const scrollSmooth = (
  target,
  { duration = 500, context = window, offset = 0, callback } = {}
) => {
  if (typeof window !== 'object') return

  const start = context.scrollTop || window.pageYOffset
  const end = calcEndPoint(target, context, offset)
  const clock = window.performance.now()
  const rAF = window.requestAnimationFrame

  const tick = () => {
    const elapsed = window.performance.now() - clock
    const pos = setPosition(start, end, elapsed, duration)
    if (context !== window) {
      context.scrollTop = pos
    } else {
      window.scroll(0, pos)
    }

    if (elapsed > duration) {
      typeof callback === 'function' && callback(target)
    } else {
      rAF(tick)
    }
  }

  tick()
}

const regex = /(auto|scroll)/

const parents = function(node, ps) {
  if (node.parentNode === null) {
    return ps
  }

  return parents(node.parentNode, ps.concat([node]))
}

const style = function(node, prop) {
  return window.getComputedStyle(node, null).getPropertyValue(prop)
}

const overflow = function(node) {
  return (
    style(node, 'overflow') +
    style(node, 'overflow-y') +
    style(node, 'overflow-x')
  )
}

const scroll = function(node) {
  return regex.test(overflow(node))
}

export const scrollParent = function(node) {
  // eslint-disable-next-line no-undef
  if (!(node instanceof HTMLElement || node instanceof SVGElement)) {
    return
  }

  const ps = parents(node.parentNode, [])

  for (let i = 0; i < ps.length; i += 1) {
    if (scroll(ps[i])) {
      return ps[i]
    }
  }

  return document.scrollingElement || document.documentElement
}

export function getNodeRect(node) {
  const {
    top,
    right,
    bottom,
    left,
    width,
    height
  } = node.getBoundingClientRect()
  return { top, right, bottom, left, width, height }
}

export function inView({ top, right, bottom, left, w, h }) {
  return top >= 0 && left >= 0 && bottom <= h && right <= w
}

export function isBody(node) {
  return (
    node === document.querySelector('body') ||
    node === document.querySelector('html')
  )
}

export const isHoriz = pos => /(left|right)/.test(pos)
export const isOutsideX = (val, windowWidth) => val > windowWidth
export const isOutsideY = (val, windowHeight) => val > windowHeight
export const safe = sum => (sum < 0 ? 0 : sum)

export function bestPositionOf(positions) {
  return Object.keys(positions)
    .map(p => ({
      position: p,
      value: positions[p]
    }))
    .sort((a, b) => b.value - a.value)
    .map(p => p.position)
}

export function getWindow() {
  const w = Math.max(
    document.documentElement.clientWidth,
    window.innerWidth || 0
  )
  const h = Math.max(
    document.documentElement.clientHeight,
    window.innerHeight || 0
  )
  return { w, h }
}
