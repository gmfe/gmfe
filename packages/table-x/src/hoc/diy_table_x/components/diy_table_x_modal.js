import React, { useState, useEffect } from 'react'
import { Flex, Button, TableStickyControls } from '@gmfe/react'
import _ from 'lodash'
import Selector from './modal_selector'
import List from './modal_list'
import PropTypes from 'prop-types'
import { getLocale } from '@gmfe/locales'

/**
 * 弹层内维护 Checkbox 展示态，避免 sticky 变更触发外层 columns 重建导致 Popover 关闭。
 * 真正的持久化 / 表头 class 仍走 stickyControlProps 回调。
 */
function StickyControlsInModal({ stickyControlProps }) {
  const [localChecked, setLocalChecked] = useState(
    () => !!(stickyControlProps && stickyControlProps.localChecked)
  )
  // 当前弹层内「一键固定」展示（可与真实全局不一致）
  const [globalChecked, setGlobalChecked] = useState(() =>
    stickyControlProps && stickyControlProps.globalChecked !== undefined
      ? !!stickyControlProps.globalChecked
      : !!(
          stickyControlProps &&
          stickyControlProps.globalSticky &&
          stickyControlProps.localChecked
        )
  )
  // 记住真实全局，取消是否固定时只改展示，不改这个值
  const [realGlobalSticky, setRealGlobalSticky] = useState(
    () => !!(stickyControlProps && stickyControlProps.globalSticky)
  )

  if (
    !stickyControlProps ||
    (!stickyControlProps.canShowLocal && !stickyControlProps.canShowGlobal)
  ) {
    return null
  }

  return (
    <TableStickyControls
      localChecked={localChecked}
      globalSticky={realGlobalSticky}
      globalChecked={globalChecked}
      canShowLocal={stickyControlProps.canShowLocal}
      canShowGlobal={stickyControlProps.canShowGlobal}
      texts={stickyControlProps.texts}
      setLocalSticky={checked => {
        const next = !!checked
        setLocalChecked(next)
        // 取消是否固定 → 本弹层一键固定展示取消；勾选则恢复为真实全局
        setGlobalChecked(next && realGlobalSticky)
        stickyControlProps.setLocalSticky &&
          stickyControlProps.setLocalSticky(next)
      }}
      onGlobalChange={checked => {
        const next = !!checked
        setRealGlobalSticky(next)
        setGlobalChecked(next)
        // 开启/关闭一键固定都会清本地：UI 上是否固定跟随勾选/取消
        setLocalChecked(next)
        stickyControlProps.onGlobalChange &&
          stickyControlProps.onGlobalChange(next)
      }}
    />
  )
}

StickyControlsInModal.propTypes = {
  stickyControlProps: PropTypes.object
}

const DiyTableModal = ({
  columns,
  onSave,
  diyGroupSorting,
  onCancel,
  stickyControlProps,
  onResetDefault
}) => {
  const [diyCols, setDiyCols] = useState(columns)
  const [showCols, setShowCols] = useState(columns.filter(o => o.show))

  useEffect(() => {
    setDiyCols(columns)
    // 右侧"当前选定的字段"需按用户保存的排序显示，而非定义顺序
    setShowCols(
      _.sortBy(
        columns.filter(o => o.show),
        o => o.sortNumber
      )
    )
  }, [columns])

  const handleColsChange = (key, curShow) => {
    const index = _.findIndex(diyCols, o => o.key === key)
    const _diyCols = diyCols.slice()

    const curItem = _diyCols[index]
    curItem.show = !curShow

    setDiyCols(_diyCols)

    if (curItem.show) {
      // 把当前项增加到排序列表中
      setShowCols(_diyCols.filter(o => o.show))
    } else {
      // 把当前项从排序列表去掉
      const _showCols = showCols.slice()
      _.remove(_showCols, item => item.key === key)
      setShowCols(_showCols)
    }
  }

  const handleColsRemove = key => {
    const _showCols = showCols.slice()
    _.remove(_showCols, o => o.key === key)
    setShowCols(_showCols)

    const index = _.findIndex(diyCols, o => o.key === key)
    const _diyCols = diyCols.slice()
    _diyCols[index].show = false
    setDiyCols(_diyCols)
  }

  const handleColsSort = (beforeKey, afterKey) => {
    const _showCols = showCols.slice()
    const beforeIndex = _.findIndex(_showCols, o => o.key === beforeKey)
    const afterIndex = _.findIndex(_showCols, o => o.key === afterKey)

    if (beforeIndex === -1 || afterIndex === -1) return

    const [moved] = _showCols.splice(beforeIndex, 1)
    // 删除后目标索引可能左移：beforeIndex < afterIndex 时目标已左移1位，此时 afterIndex 即为目标之后
    // beforeIndex > afterIndex 时目标未移动，需 afterIndex + 1 才能放到目标之后
    const insertIndex = beforeIndex < afterIndex ? afterIndex : afterIndex + 1
    _showCols.splice(insertIndex, 0, moved)

    setShowCols(_showCols)
  }

  const handleResetDefault = () => {
    onResetDefault()
    onCancel()
  }

  const handleSave = () => {
    const columns = diyCols.map(col => {
      const sortIndex = _.findIndex(showCols, v => v.key === col.key)
      return {
        ...col,
        show: sortIndex > -1, // 大于-1才会显示
        diySortNumber: sortIndex > -1 ? sortIndex : col.diySortNumber
      }
    })

    onSave(columns)
    onCancel()
  }

  return (
    <div className='gm-react-table-x-diy-modal'>
      <Flex
        className='gm-react-table-x-diy-modal-header gm-padding-tb-5'
        justifyBetween
        alignCenter
      >
        <div className='gm-react-table-x-diy-modal-header-title gm-margin-left-10 gm-padding-left-5'>
          {getLocale('表头设置')}
        </div>
        <button
          className='gm-react-table-x-diy-modal-header-close gm-margin-right-10'
          onClick={onCancel}
        >
          ×
        </button>
      </Flex>
      <Flex className='gm-react-table-x-diy-modal-content'>
        <div className='gm-react-table-x-diy-modal-selector'>
          <Flex
            alignCenter
            justifyBetween
            className='gm-react-table-x-diy-modal-title'
          >
            <span>可选字段</span>
            <StickyControlsInModal stickyControlProps={stickyControlProps} />
          </Flex>
          <Selector
            diyGroupSorting={diyGroupSorting}
            cols={diyCols}
            onColsChange={handleColsChange}
          />
        </div>
        <div className='gm-react-table-x-diy-modal-list'>
          <div className='gm-react-table-x-diy-modal-title'>当前选定的字段</div>
          <List
            cols={showCols}
            onColsRemove={handleColsRemove}
            onColsSort={handleColsSort}
          />
        </div>
      </Flex>
      <Flex justifyBetween className='gm-padding-10'>
        <Button onClick={handleResetDefault}>{getLocale('恢复默认')}</Button>
        <Flex>
          <Button onClick={onCancel}>{getLocale('取消')}</Button>
          <div className='gm-gap-10' />
          <Button
            type='primary'
            onClick={handleSave}
            className='gm-margin-right-10'
          >
            {getLocale('保存')}
          </Button>
        </Flex>
      </Flex>
    </div>
  )
}

DiyTableModal.propTypes = {
  columns: PropTypes.array.isRequired,
  diyGroupSorting: PropTypes.array.isRequired,
  onSave: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  /**
   * 由 DiyTableX 在 ConfigProvider 内计算后传入（Popover 挂到 LayerRoot 会丢失 Context）
   */
  stickyControlProps: PropTypes.object,
  onResetDefault: PropTypes.func.isRequired
}

export default DiyTableModal
