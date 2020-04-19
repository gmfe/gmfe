import React, { FC, useEffect, useRef } from 'react'
import { throttle } from 'lodash'

import {
  doFocus,
  getKey,
  KEYBOARD_DIRECTION,
  KEYBOARD_ENTER,
  KEYBOARD_TAB,
  KeyboardActionsName,
  WrapContext,
} from '../utils'
import { KeyboardCustomEvent } from '../types'

interface WrapProps {
  /* 通过 id 来确定本单元格内通信，避免多表格时混了，请确保 id 唯一 */
  id: string
  /* 增加一行数据 */
  onAddRow(): void
  onBeforeDispatch?(options: {
    actionName: string
    to: { rowKey: number; columnKey: string }
    from: { rowKey: number; columnKey: string }
  }): boolean

  /* Wrap 需要知道字段集合，以便能找到相应的单元格，请确保表格的顺序一致 */
  columnKeys: string[]
  /* Wrap 需要知道有多少行，以便能找到相应的单元格，同时必要时会触发 onAddRow，告知调用方需要增加一行数据 */
  dataLength: number
  fixedWidths: {
    leftFixedWidth: number
    rightFixedWidth: number
  }
}

/**
 * 包裹 Table，使 Table 具有键盘响应能力
 *
 * Wrap 负责调度，接收来自 Cell 的操作反馈，然后做出后续动作
 * Cell 监听键盘事件，把 方向、Enter、Tab 反馈给 Wrap
 * Wrap 做出动作，其中包括 focus 到 Cell
 * */
const Wrap: FC<WrapProps> = ({
  id,
  children,
  onAddRow,
  columnKeys,
  dataLength,
  fixedWidths,
  onBeforeDispatch,
}) => {
  const timer = useRef<number | undefined>()

  // 处理 focus
  const doFocusWithColumnRowKey = (
    actionName: string,
    rowKey: number,
    columnKey: string,
    cellKey: string
  ) => {
    const result =
      onBeforeDispatch &&
      onBeforeDispatch({
        actionName,
        to: { rowKey, columnKey },
        from: getKey(cellKey),
      })

    // 返回 false 组织默认行为
    if (result === false) return
    doFocus(id, rowKey, columnKey)
  }

  // 处理方向
  const doDirectionRight = (rowKey: number, columnKey: string, cellKey: string) => {
    const columnIndex = columnKeys.indexOf(columnKey)
    // 如果不是最后一列
    if (columnIndex < columnKeys.length - 1) {
      doFocusWithColumnRowKey(
        KeyboardActionsName.RIGHT,
        rowKey,
        columnKeys[columnIndex + 1],
        cellKey
      )
    }
  }
  const doDirectionLeft = (rowKey: number, columnKey: string, cellKey: string) => {
    const columnIndex = columnKeys.indexOf(columnKey)
    // 如果不是第一列
    if (columnIndex > 0) {
      doFocusWithColumnRowKey(
        KeyboardActionsName.LEFT,
        rowKey,
        columnKeys[columnIndex - 1],
        cellKey
      )
    }
  }
  const doDirectionDown = (rowKey: number, columnKey: string, cellKey: string) => {
    window.clearTimeout(timer.current)

    // 往下一个
    if (rowKey < dataLength - 1) {
      doFocusWithColumnRowKey(KeyboardActionsName.DOWN, rowKey + 1, columnKey, cellKey)
    }
    // 最后一行
    else if (rowKey === dataLength - 1) {
      onAddRow()
      timer.current = window.setTimeout(() => {
        // 去到第一列
        doFocusWithColumnRowKey(
          KeyboardActionsName.DOWN,
          rowKey + 1,
          columnKeys[0],
          cellKey
        )
      }, 10)
    }
  }
  const doDirectionUp = (rowKey: number, columnKey: string, cellKey: string) => {
    // 往上一个
    if (rowKey > 0) {
      doFocusWithColumnRowKey(KeyboardActionsName.UP, rowKey - 1, columnKey, cellKey)
    }
    // 循环到最后一个
    else if (rowKey === 0) {
      doFocusWithColumnRowKey(KeyboardActionsName.UP, dataLength - 1, columnKey, cellKey)
    }
  }

  // 处理方向事件，依赖 dataLength 的变动
  useEffect(() => {
    const handleDirection = throttle((event: CustomEvent<KeyboardCustomEvent>) => {
      const { cellKey, direction } = event.detail
      const { rowKey, columnKey } = getKey(cellKey)
      if (direction === 'right') {
        doDirectionRight(rowKey, columnKey, cellKey)
      } else if (direction === 'down') {
        doDirectionDown(rowKey, columnKey, cellKey)
      } else if (direction === 'left') {
        doDirectionLeft(rowKey, columnKey, cellKey)
      } else if (direction === 'up') {
        doDirectionUp(rowKey, columnKey, cellKey)
      }
    }, 50)
    window.addEventListener(
      `${KEYBOARD_DIRECTION}${id}`,
      (handleDirection as any) as EventListener
    )

    return () => {
      window.removeEventListener(
        `${KEYBOARD_DIRECTION}${id}`,
        (handleDirection as any) as EventListener
      )
    }
  }, [dataLength, columnKeys.length])

  // 处理 Enter，依赖 dataLength 的变动
  useEffect(() => {
    const handleEnter = throttle((event: CustomEvent<KeyboardCustomEvent>) => {
      window.clearTimeout(timer.current)

      const { cellKey } = event.detail
      const { rowKey, columnKey } = getKey(cellKey)
      const columnIndex = columnKeys.indexOf(columnKey)

      // 如果不是最后一列
      if (columnIndex < columnKeys.length - 1) {
        doFocusWithColumnRowKey(
          KeyboardActionsName.ENTER,
          rowKey,
          columnKeys[columnIndex + 1],
          cellKey
        )
      }
      // 最后一列
      else if (columnIndex === columnKeys.length - 1) {
        // 如果不是最后一行
        if (rowKey < dataLength - 1) {
          doFocusWithColumnRowKey(
            KeyboardActionsName.ENTER,
            rowKey + 1,
            columnKeys[0],
            cellKey
          )
        }
        // 最后一行
        else if (rowKey === dataLength - 1) {
          onAddRow()
          timer.current = window.setTimeout(() => {
            // 去到最后一行
            doFocusWithColumnRowKey(
              KeyboardActionsName.ENTER,
              rowKey + 1,
              columnKeys[0],
              cellKey
            )
          }, 10)
        }
      }
    }, 50)
    window.addEventListener(
      `${KEYBOARD_ENTER}${id}`,
      (handleEnter as any) as EventListener
    )

    return () => {
      window.removeEventListener(
        `${KEYBOARD_ENTER}${id}`,
        (handleEnter as any) as EventListener
      )
    }
  }, [dataLength, columnKeys.length])

  // 处理 Tab 键
  useEffect(() => {
    const handleTab = throttle((event: CustomEvent<KeyboardCustomEvent>) => {
      const { cellKey } = event.detail
      const { rowKey, columnKey } = getKey(cellKey)
      const columnIndex = columnKeys.indexOf(columnKey)

      // 如果不是最后一列
      if (columnIndex < columnKeys.length - 1) {
        doFocusWithColumnRowKey(
          KeyboardActionsName.TAB,
          rowKey + 1,
          columnKeys[0],
          cellKey
        )
      }
      // 最后一列
      else if (columnIndex === columnKeys.length - 1) {
        // 如果不是最后一行
        if (rowKey < dataLength - 1) {
          doFocusWithColumnRowKey(
            KeyboardActionsName.TAB,
            rowKey + 1,
            columnKeys[0],
            cellKey
          )
        }
        // 最后一行
        else if (rowKey === dataLength - 1) {
          doFocusWithColumnRowKey(KeyboardActionsName.TAB, 0, columnKeys[0], cellKey)
        }
      }
    }, 50)

    window.addEventListener(`${KEYBOARD_TAB}${id}`, (handleTab as any) as EventListener)
    return () => {
      window.removeEventListener(
        `${KEYBOARD_TAB}${id}`,
        (handleTab as any) as EventListener
      )
    }
  }, [dataLength, columnKeys.length])
  return (
    <WrapContext.Provider value={JSON.stringify({ id, fixedWidths })}>
      {children}
    </WrapContext.Provider>
  )
}

export default Wrap
