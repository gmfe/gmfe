import { getScrollLeft, getScrollTop } from '@gm-common/tool'

function getElementPositionWithScroll(element: HTMLElement) {
  let { left, top } = element.getBoundingClientRect()
  left += getScrollLeft()
  top += getScrollTop()

  return { left, top }
}

function isContains(
  target: HTMLElement,
  fc: (node: HTMLElement) => boolean
): boolean {
  let node = target
  while (node) {
    if (fc(node)) {
      return true
    }
    node = node.parentNode as HTMLElement
  }
  return false
}

export { getElementPositionWithScroll, isContains }
