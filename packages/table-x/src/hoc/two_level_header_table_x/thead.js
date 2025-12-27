import PropTypes from 'prop-types'
import React from 'react'
import classNames from 'classnames'
import Th from '../../base/th'
import { getColumnStyle, SortHeader } from '../../util'

/**
 * 二级表头组件
 * 渲染两级表头：
 * - 第一行：一级表头（有子列的显示一级表头，没有子列的占两行）
 * - 第二行：二级表头（只有有子列的一级表头才显示）
 */
const TwoLevelTHead = ({ headerGroups, firstLevelHeaders, totalWidth }) => {
  // react-table 的 headerGroups 结构：
  // - 当 columns 有嵌套结构时：headerGroups[0] 是第一级（分组），headerGroups[1] 是第二级（实际列）
  // - 当 columns 没有嵌套时：headerGroups 只有一行，就是实际列
  // 重要：当混合嵌套列和单列时，headerGroups[0] 只包含有 columns 的分组列，不包含单列
  // 单列只会在 headerGroups[1] 中出现

  const hasNestedHeaders = headerGroups.length > 1
  const firstLevelGroup = hasNestedHeaders ? headerGroups[0] : null
  const secondLevelGroup = hasNestedHeaders ? headerGroups[1] : headerGroups[0]

  // 构建第一级表头的渲染信息
  const firstLevelCells = []
  let secondLevelIndex = 0 // 在第二级表头中的索引

  firstLevelHeaders.forEach((firstLevelHeader, idx) => {
    if (firstLevelHeader.hasSubColumns) {
      // 有子列：从第二级表头中获取对应的列
      const subColumnCount = firstLevelHeader.subColumnCount
      const subColumns = secondLevelGroup.headers.slice(
        secondLevelIndex,
        secondLevelIndex + subColumnCount
      )

      // 计算总宽度（所有子列的宽度之和）
      let totalSubWidth = 0
      subColumns.forEach(subCol => {
        const style = getColumnStyle(subCol)
        const width = parseFloat(style.width) || subCol.totalWidth || 0
        totalSubWidth += width
      })

      // 获取对应的第一级分组列对象
      const groupColumn = firstLevelGroup
        ? firstLevelGroup.headers.find(col => {
            // 通过 id 或 Header 匹配
            return (
              col.id === firstLevelHeader.id ||
              (col.columns && col.columns.length === subColumnCount)
            )
          }) || firstLevelGroup.headers[idx]
        : null

      firstLevelCells.push({
        type: 'group',
        header: firstLevelHeader,
        colSpan: subColumnCount,
        subColumns: subColumns,
        totalWidth: totalSubWidth,
        column: groupColumn,
        secondLevelStartIndex: secondLevelIndex
      })

      secondLevelIndex += subColumnCount
    } else {
      // 没有子列：占两行（rowspan=2）
      // 重要：当混合嵌套列和单列时，react-table 会将单列同时放在 firstLevelGroup 和 secondLevelGroup 中
      // 我们需要从 firstLevelGroup 中获取单列的列对象（如果存在），否则从 secondLevelGroup 获取
      let singleColumn = null

      // 优先从 firstLevelGroup 中查找单列（用于 getHeaderProps 等）
      if (firstLevelGroup) {
        singleColumn = firstLevelGroup.headers.find(col => {
          // 通过 id 或 accessor 匹配
          const matchId = col.id === firstLevelHeader.id
          const matchAccessor =
            col.accessor === firstLevelHeader.accessor ||
            (typeof col.accessor === 'function' &&
              typeof firstLevelHeader.accessor === 'function' &&
              col.accessor.toString() === firstLevelHeader.accessor.toString())
          return matchId || matchAccessor
        })
      }

      // 如果 firstLevelGroup 中没找到，从 secondLevelGroup 获取
      if (!singleColumn) {
        singleColumn = secondLevelGroup.headers[secondLevelIndex]
      }
      firstLevelCells.push({
        type: 'single',
        header: firstLevelHeader,
        colSpan: 1,
        rowSpan: 2, // 明确设置为 2，占两行
        column: singleColumn,
        secondLevelIndex: secondLevelIndex
      })

      secondLevelIndex += 1
    }
  })

  return (
    <thead className='gm-table-x-thead gm-table-x-thead-two-level'>
      {/* 第一级表头行 */}
      <tr className='gm-table-x-tr gm-table-x-tr-first-level'>
        {firstLevelCells.map((cell, idx) => {
          const {
            column,
            header,
            colSpan,
            rowSpan,
            type,
            totalWidth: cellTotalWidth
          } = cell

          // 对于分组列，使用分组列对象；对于单列，使用单列对象
          const headerColumn = column || cell.column
          const hp = headerColumn ? headerColumn.getHeaderProps() : {}
          const { thClassName, style } = headerColumn || {}

          // 计算样式
          let cellStyle = {
            ...hp.style,
            ...style
          }

          // 处理固定列（需要先定义，因为在设置宽度时需要用到）
          // 重要：只有明确设置了 fixed 的列才会被固定
          // 对于分组列，直接使用 header.fixed（一级表头的原始 fixed 状态）
          // 对于单列，使用 headerColumn.fixed（react-table 处理后的状态）或 header.fixed
          // 关键：不要从 headerColumn 推断 fixed 状态，因为 headerColumn 可能是 react-table 处理后的对象
          const fixed =
            type === 'group'
              ? header.fixed // 分组列直接使用 header.fixed，不 fallback 到 headerColumn
              : headerColumn?.fixed !== undefined
              ? headerColumn.fixed
              : header.fixed

          // 如果是分组列，使用 colSpan 时不需要手动设置宽度（由浏览器自动计算）
          // 但我们需要移除 flex 相关的样式，因为使用 table-cell 时 flex 不起作用
          if (type === 'group') {
            // 移除 flex 相关样式，只保留 width 和 maxWidth（如果需要）
            // 对于 table-layout: fixed，我们需要确保分组列的宽度正确设置
            // colSpan 会自动处理宽度，但为了确保固定列的宽度不被压缩，我们显式设置宽度
            const { flex, ...restStyle } = cellStyle
            cellStyle = restStyle

            // 如果有固定列，显式设置宽度以确保不被压缩
            if (fixed === 'left' || fixed === 'right') {
              cellStyle.width = `${cellTotalWidth}px`
              cellStyle.minWidth = `${cellTotalWidth}px`
            }
          } else if (headerColumn) {
            // 对于单列，也需要移除 flex，使用 width
            const columnStyle = getColumnStyle(headerColumn)
            const { flex, ...restColumnStyle } = columnStyle
            cellStyle = {
              ...cellStyle,
              ...restColumnStyle // 只使用 width 和 maxWidth，不使用 flex
            }

            // 如果有固定列，确保宽度不被压缩
            if (fixed === 'left' || fixed === 'right') {
              const width = restColumnStyle.width
              if (width) {
                cellStyle.minWidth = width
              }
            }
          }
          // 只有当 fixed 明确为 'left' 或 'right' 时才设置 left/right 和添加 fixed 类
          // 这样确保只有明确设置了 fixed 的列才会被固定
          if (fixed === 'left') {
            // 对于分组列，使用第一个子列的 totalLeft
            if (
              type === 'group' &&
              cell.subColumns &&
              cell.subColumns.length > 0
            ) {
              cellStyle.left = cell.subColumns[0].totalLeft
            } else if (headerColumn) {
              cellStyle.left = headerColumn.totalLeft
            }
          } else if (fixed === 'right') {
            // 对于分组列，使用最后一个子列的位置
            if (
              type === 'group' &&
              cell.subColumns &&
              cell.subColumns.length > 0
            ) {
              const lastSubCol = cell.subColumns[cell.subColumns.length - 1]
              cellStyle.right =
                totalWidth - lastSubCol.totalLeft - lastSubCol.totalWidth
            } else if (headerColumn) {
              cellStyle.right =
                totalWidth - headerColumn.totalLeft - headerColumn.totalWidth
            }
          }
          // 注意：如果 fixed 是 undefined 或其他值，不应该设置 left/right，也不应该添加 fixed 类

          // 确保我们的 colSpan 和 rowSpan 优先级最高，不会被 hp 中的值覆盖
          const { colSpan: hpColSpan, rowSpan: hpRowSpan, ...restHp } = hp || {}

          // 确保 rowSpan 和 colSpan 是数字类型（不是字符串）
          const finalRowSpan =
            rowSpan !== undefined
              ? Number(rowSpan)
              : hpRowSpan !== undefined
              ? Number(hpRowSpan)
              : undefined
          const finalColSpan =
            colSpan !== undefined
              ? Number(colSpan)
              : hpColSpan !== undefined
              ? Number(hpColSpan)
              : undefined

          const thProps = {
            ...restHp,
            ...(finalColSpan !== undefined && { colSpan: finalColSpan }),
            ...(finalRowSpan !== undefined && { rowSpan: finalRowSpan }), // 只有定义了才添加
            className: classNames(
              'gm-table-x-th',
              'gm-table-x-th-first-level',
              hp?.className,
              thClassName,
              {
                'gm-table-x-fixed-left': fixed === 'left',
                'gm-table-x-fixed-right': fixed === 'right'
              }
            ),
            style: cellStyle
          }

          return (
            <th key={idx} {...thProps}>
              {typeof header.Header === 'function' ? (
                <header.Header />
              ) : (
                header.Header
              )}
              {headerColumn?.canSort && (
                <SortHeader
                  {...headerColumn.getSortByToggleProps()}
                  type={
                    headerColumn.isSorted
                      ? headerColumn.isSortedDesc
                        ? 'desc'
                        : 'asc'
                      : null
                  }
                />
              )}
            </th>
          )
        })}
      </tr>

      {/* 第二级表头行（只有有子列的情况才显示） */}
      {hasNestedHeaders && secondLevelGroup && (
        <tr className='gm-table-x-tr gm-table-x-tr-second-level'>
          {secondLevelGroup.headers.map((column, idx) => {
            // 找到这个列对应的第一级表头
            const correspondingFirstLevel = firstLevelCells.find(cell => {
              if (cell.type === 'single') {
                return cell.secondLevelIndex === idx
              } else if (cell.type === 'group') {
                return (
                  idx >= cell.secondLevelStartIndex &&
                  idx < cell.secondLevelStartIndex + cell.colSpan
                )
              }
              return false
            })

            // 如果是单列（rowspan=2），这一行不渲染（已经被第一行占用）
            if (
              correspondingFirstLevel &&
              correspondingFirstLevel.type === 'single'
            ) {
              return null
            }

            // 为第二级表头添加特殊类名，以便在 CSS 中覆盖样式
            // 重要：二级表头的 fixed 状态应该从对应的一级表头继承
            // 只有当对应的一级表头设置了 fixed 时，二级表头才应该固定
            // 注意：column.fixed 已经在 transformColumnsForTwoLevel 中根据一级表头的 fixed 状态设置了
            // 所以我们直接使用 column.fixed 即可，不需要再次从 firstLevelHeader 继承
            return (
              <Th
                key={idx}
                column={{
                  ...column,
                  // column.fixed 已经在 transformColumnsForTwoLevel 中正确设置
                  thClassName: classNames(
                    column.thClassName,
                    'gm-table-x-th-second-level'
                  )
                }}
                totalWidth={totalWidth}
              />
            )
          })}
        </tr>
      )}
    </thead>
  )
}

TwoLevelTHead.propTypes = {
  headerGroups: PropTypes.array.isRequired,
  firstLevelHeaders: PropTypes.array.isRequired,
  totalWidth: PropTypes.number.isRequired
}

export default React.memo(TwoLevelTHead)
