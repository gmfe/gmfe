import { TableXUtil } from '@gmfe/table-x'

import { WrapDataOptions } from '../types'
const { TABLE_X } = TableXUtil

function scrollIntoViewFixedWidth(
  dom: HTMLElement,
  fixedWidth: WrapDataOptions['fixedWidths']
) {
  const td = getTd(dom)
  if (!td) return

  const table = getTable(dom)
  if (!table) return

  const tableRect = table.getBoundingClientRect()
  const tdRect = td.getBoundingClientRect()

  const { leftFixedWidth, rightFixedWidth } = fixedWidth
  const { scrollLeft } = table
  const { offsetLeft, offsetWidth } = td

  if (offsetLeft - leftFixedWidth < scrollLeft) {
    table.scrollLeft = offsetLeft - leftFixedWidth
  } else if (
    offsetLeft + offsetWidth - (table.offsetWidth - rightFixedWidth) >
    scrollLeft
  ) {
    table.scrollLeft = offsetLeft + offsetWidth - (table.offsetWidth - rightFixedWidth)
  }

  // 只 tablex 生效
  if (table.classList.contains('gm-table-x-virtualized')) {
    // 如果被遮挡
    if (tdRect.top - tableRect.top < TABLE_X.HEIGHT_HEAD_TR) {
      // 则滚一个 tr 距离
      table.scrollTop = table.scrollTop - TABLE_X.HEIGHT_TR
    }
  }
}

export default scrollIntoViewFixedWidth

function getTd(dom: HTMLElement) {
  let parentNode = dom.parentNode as HTMLElement
  while (
    !(
      parentNode.classList.contains('rt-td') ||
      parentNode.classList.contains('gm-table-x-td')
    )
  ) {
    parentNode = parentNode.parentNode as HTMLElement
    if (parentNode === document.body) return null
  }

  return parentNode
}

function getTable(dom: HTMLElement) {
  let parentNode = dom.parentNode as HTMLElement
  while (
    !(
      parentNode.classList.contains('rt-table') ||
      parentNode.classList.contains('gm-table-x-virtualized')
    )
  ) {
    parentNode = parentNode.parentNode as HTMLElement
    if (parentNode === document.body) return null
  }
  return parentNode
}
