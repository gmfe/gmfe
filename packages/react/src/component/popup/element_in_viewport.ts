export interface ElementInViewportReturnOptions {
  topInViewport: boolean
  bottomInViewport: boolean | null
}

interface ElementInView {
  (
    top: boolean,
    dom: HTMLDivElement,
    targetHeight: number,
    predictingHeight?: number
  ): ElementInViewportReturnOptions
}

const elementInView: ElementInView = (
  top,
  dom,
  targetHeight,
  predictingHeight
) => {
  const buf = 5
  const rect = dom.getBoundingClientRect()
  const windowHeight =
    window.innerHeight ?? document.documentElement.clientHeight
  const domHeight = predictingHeight ?? rect.height

  if (top) {
    return {
      topInViewport: rect.top - domHeight - buf >= 0,
      bottomInViewport: null,
    }
  }
  return {
    topInViewport: rect.top - targetHeight - domHeight - buf >= 0,
    bottomInViewport: rect.top + domHeight + buf <= windowHeight,
  }
}
export default elementInView
