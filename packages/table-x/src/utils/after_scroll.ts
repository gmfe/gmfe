import { EVENT_TYPE } from '@gmfe/react'

function afterScroll() {
  window.dispatchEvent(new window.CustomEvent(EVENT_TYPE.TABLE_SCROLL))
}

export default afterScroll
