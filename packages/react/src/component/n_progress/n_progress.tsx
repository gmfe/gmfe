import React, { FC } from 'react'
import { LayoutRoot } from '../layout_root'

interface NProgressFC extends FC {
  start(): void
  done(): void
}

const NProgress: NProgressFC = () => <div className='gm-nprogress gm-nprogress-loading' />

let timer: number | null
let reqLength = 0

NProgress.start = function (): void {
  reqLength = reqLength + 1
  if (reqLength === 1) {
    if (timer) {
      clearTimeout(timer)
      timer = null
    }
    LayoutRoot.setComponent(LayoutRoot.TYPE.NPROGRESS, <NProgress />)
  }
}

NProgress.done = function (): void {
  reqLength = reqLength - 1
  const nProgress = document.querySelector('.gm-nprogress')
  if (!reqLength && !timer) {
    nProgress && (nProgress.className = 'gm-nprogress gm-nprogress-completed')
    timer = window.setTimeout(function () {
      LayoutRoot.removeComponent(LayoutRoot.TYPE.NPROGRESS)
      timer = null
    }, 250)
  }
}

export default NProgress
