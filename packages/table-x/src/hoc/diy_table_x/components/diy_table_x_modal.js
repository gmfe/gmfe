import React, { useState } from 'react'
import { Flex, Modal, Button } from '@gmfe/react'
import _ from 'lodash'
import Selector from './modal_selector'
import List from './modal_list'
import PropTypes from 'prop-types'
import { getLocale } from '@gmfe/locales'

const DiyTableModal = ({ columns, onSave, diyGroupSorting, onCancel }) => {
  const [diyCols, setDiyCols] = useState(columns)
  const [showCols, setShowCols] = useState(columns.filter(o => o.show))

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

  const handleSave = () => {
    const columns = diyCols.map(col => {
      return {
        ...col,
        show: _.findIndex(showCols, v => v.key === col.key) > -1 // 大于-1才会显示
      }
    })

    onSave(columns)
    Modal.hide()
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
      <Flex>
        <div className='gm-react-table-x-diy-modal-selector'>
          <div className='gm-border-bottom gm-react-table-x-diy-modal-title'>
            可选字段
          </div>
          <Selector
            diyGroupSorting={diyGroupSorting}
            cols={diyCols}
            onColsChange={handleColsChange}
          />
        </div>
        <div className='gm-react-table-x-diy-modal-list'>
          <div className='gm-border-bottom gm-react-table-x-diy-modal-title'>
            当前选定的字段
          </div>
          <List cols={showCols} onColsRemove={handleColsRemove} />
        </div>
      </Flex>
      <Flex justifyEnd className='gm-padding-10'>
        <Button onClick={onCancel}>取消</Button>
        <div className='gm-gap-10' />
        <Button type='primary' onClick={handleSave}>
          保存
        </Button>
      </Flex>
    </div>
  )
}

DiyTableModal.propTypes = {
  columns: PropTypes.array.isRequired,
  diyGroupSorting: PropTypes.array.isRequired,
  onSave: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired
}

export default DiyTableModal
