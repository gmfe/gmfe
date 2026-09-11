/** 表头 sticky 本地状态跨实例同步（不走 React state，避免整树重渲染关掉 DIY 弹层） */

let version = 0
const listeners = new Set()

function bumpStickyLocalVersion() {
  version += 1
  listeners.forEach(fn => {
    try {
      fn(version)
    } catch (e) {
      // ignore listener errors
    }
  })
}

function subscribeStickyLocalVersion(fn) {
  listeners.add(fn)
  return () => {
    listeners.delete(fn)
  }
}

function getStickyLocalVersion() {
  return version
}

export {
  bumpStickyLocalVersion,
  subscribeStickyLocalVersion,
  getStickyLocalVersion
}
