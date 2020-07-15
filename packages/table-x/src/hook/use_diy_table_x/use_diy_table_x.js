import React, { useState, useRef, useMemo } from 'react'
import _ from 'lodash'
import { Storage, Popover } from '@gmfe/react'
import {
  getColumnKey,
  OperationIconTip,
  TABLE_X,
  TABLE_X_DIY_ID,
  TABLE_X_EXPAND_ID,
  TABLE_X_SELECT_ID,
} from '../../util'
import DiyModalTab from './components/diy_modal_tab'
import { getLocale } from '@gmfe/locales'
import SVGSetting from '../../../svg/setting.svg'

/**
 * 把selector, expander 分离出来,不参与diy
 * @param columns
 * @returns {[][]}
 */
function splitColumns(columns) {
  const notDiyCols = []
  const diyCols = []
  for (const item of columns) {
    if ([TABLE_X_EXPAND_ID, TABLE_X_SELECT_ID].includes(item.id)) {
      notDiyCols.push(item)
    } else {
      diyCols.push(item)
    }
  }
  return [notDiyCols, diyCols]
}

/**
 * 生成新的columns
 * @param initColumns 原始columns
 * @param mixColumns 需要混合的columns(优先取这里的值)
 * @returns {(*[]|Array)[]}
 */
function generateDiyColumns(initColumns, mixColumns) {
  const [notDiyCols, diyCols] = splitColumns(initColumns)

  const diyColumns = _.map(diyCols, (column) => {
    const key = getColumnKey(column)
    // 能获取 key 才可能使用 diy
    if (key === null) {
      return column
    }

    // col 默认显示，以及 默认开启diy
    const { show = true, diyEnable = true } = column
    const newColumn = {
      ...column,
      key, // 把key记录下来,作为这个列的唯一标识
      show,
      diyEnable,
    }

    // localstorage中储存的列
    const localItem = _.find(mixColumns, (v) => v.key === key)
    // localstorage的值覆盖初始值
    if (localItem) {
      newColumn.show = localItem.show
    }
    return newColumn
  })

  return [notDiyCols, diyColumns]
}

/**
 * 过滤多余数据，避免复杂数据出现JSON循环引用报错问题
 * @param list
 * @returns {Array}
 */
function getStorageColumns(list) {
  return _.map(list, (item) => {
    return {
      columns: item.columns.map((col) => {
        const { key, show, diyEnable } = col
        return { key, show, diyEnable }
      }),
    }
  })
}

const assignColsList = (columnsList, assignedColumnsList) => {
  return columnsList.map((obj, index) => {
    const diyCols = generateDiyColumns(
      obj.columns,
      assignedColumnsList?.[index].columns || []
    )[1]

    return {
      columns: diyCols,
    }
  })
}

const useDiyTableX = (columnsList, ID) => {
  const popoverRef = useRef(null)

  const [diyColsList, setDiyColsList] = useState(() =>
    assignColsList(columnsList, Storage.get(ID))
  )

  const handleDiyColumnsSave = (cols) => {
    setDiyColsList(cols)
    Storage.set(ID, getStorageColumns(cols))
  }

  const handleCancel = () => {
    popoverRef.current.apiDoSetActive(false)
    setDiyColsList(assignColsList(columnsList, Storage.get(ID))) // 重置数据
  }

  const _columnsList = useMemo(() => {
    const diyList = columnsList.map((obj, index) => {
      const [notDiyCols, diyCols] = generateDiyColumns(
        obj.columns,
        diyColsList[index].columns
      )
      return {
        name: obj.name,
        diyGroupSorting: obj.diyGroupSorting,
        diyCols,
        notDiyCols,
      }
    })

    // diy按钮列
    const btnCol = {
      id: TABLE_X_DIY_ID,
      width: TABLE_X.WIDTH_FUN,
      maxWidth: TABLE_X.WIDTH_FUN,
      accessor: TABLE_X_DIY_ID,
      fixed: 'left',
      thClassName: 'gm-table-x-icon-column',
      tdClassName: 'gm-table-x-icon-column',
      Cell: () => null, // 只是用来占据空间
      Header: () => (
        <Popover
          ref={popoverRef}
          showArrow
          offset={-10}
          popup={
            <DiyModalTab
              diyList={diyList}
              onSave={handleDiyColumnsSave}
              onCancel={handleCancel}
            />
          }
        >
          <div className='gm-table-x-icon'>
            <OperationIconTip tip={getLocale('表头设置')}>
              <div>
                <SVGSetting className='gm-cursor gm-text-hover-primary' />
              </div>
            </OperationIconTip>
          </div>
        </Popover>
      ),
    }

    return diyList.map((o, i) => {
      if (i === 0) {
        return { columns: [btnCol, ...o.notDiyCols, ...o.diyCols] }
      } else {
        return { columns: [...o.notDiyCols, ...o.diyCols] }
      }
    })
  }, [columnsList, diyColsList])

  return _columnsList
}

export default useDiyTableX
