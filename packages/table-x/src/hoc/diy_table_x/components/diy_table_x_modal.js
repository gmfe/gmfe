import React, { useState, useEffect } from 'react'
import { Flex, Button } from '@gmfe/react'
import _ from 'lodash'
import Selector from './modal_selector'
import List from './modal_list'
import PropTypes from 'prop-types'
import { getLocale } from '@gmfe/locales'

const DiyTableModal = ({
  columns,
  onSave,
  diyGroupSorting,
  onCancel,
  onResetDefault
}) => {
  const [diyCols, setDiyCols] = useState(columns)
  const [showCols, setShowCols] = useState(columns.filter(o => o.show))

  useEffect(() => {
    setDiyCols(columns)
    // 右侧"当前选定的字段"需按用户保存的排序显示，而非定义顺序
    setShowCols(_.sortBy(columns.filter(o => o.show), o => o.sortNumber))
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
          <div className='gm-react-table-x-diy-modal-title'>
            可选字段
          </div>
          <Selector
            diyGroupSorting={diyGroupSorting}
            cols={diyCols}
            onColsChange={handleColsChange}
          />
        </div>
        <div className='gm-react-table-x-diy-modal-list'>
          <div className='gm-react-table-x-diy-modal-title'>
            当前选定的字段
          </div>
          <List cols={showCols} onColsRemove={handleColsRemove} onColsSort={handleColsSort}/>
        </div>
      </Flex>
      <Flex justifyBetween className='gm-padding-10'>
        <Button onClick={handleResetDefault}>{getLocale('恢复默认')}</Button>
        <Flex>
          <Button onClick={onCancel}>{getLocale('取消')}</Button>
          <div className='gm-gap-10' />
          <Button type='primary' onClick={handleSave} className='gm-margin-right-10'>
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
  onResetDefault: PropTypes.func.isRequired
}

export default DiyTableModal
