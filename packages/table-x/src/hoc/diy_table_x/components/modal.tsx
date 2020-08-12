import React, { useState } from 'react'
import { Button, Flex } from '@gmfe/react'
import { getLocale } from '@gmfe/locales'
import { DiyTableXColumn } from '../types'
import Selector from './selector'
import List from './list'

interface DiyTableXModalProps<Original extends object> {
  columns: DiyTableXColumn<Original>[]
  diyGroupSorting: string[]
  onSave(columns: DiyTableXColumn<Original>[]): void
  onCancel(): void
}

function DiyTableXModal<Original extends object>({
  columns,
  diyGroupSorting,
  onSave,
  onCancel,
}: DiyTableXModalProps<Original>) {
  const [diyCols, setDiyCols] = useState(columns)
  const [showCols, setShowCols] = useState(columns.filter((v) => v.show))

  const handleSave = (): void => {
    const columns = diyCols.map((col) => ({
      ...col,
      show: showCols.findIndex((v) => v.key === col.key) > -1, // 大于 -1 才会显示
    }))
    onSave(columns)
    onCancel()
  }

  const handleColumnsChange = (key: string, show: boolean): void => {
    const index = diyCols.findIndex((o) => o.key === key)
    const currentItem = diyCols[index]
    currentItem.show = show
    setDiyCols(diyCols)
    if (currentItem.show) {
      setShowCols(diyCols.filter((v) => v.show))
    } else {
      const _showCols = showCols.filter((value) => value.key !== key)
      setShowCols(_showCols)
    }
  }

  const handleColumnsRemove = (key: string): void => {
    handleColumnsChange(key, false)
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
          <div className='gm-react-table-x-diy-modal-title'>{getLocale('可选字段')}</div>
          <Selector
            columns={diyCols}
            diyGroupSorting={diyGroupSorting}
            onColumnsChange={handleColumnsChange}
          />
        </div>
        <div className='gm-react-table-x-diy-modal-list'>
          <div className='gm-react-table-x-diy-modal-title'>
            {getLocale('当前选定字段')}
          </div>
          <List columns={showCols} onColumnsRemove={handleColumnsRemove} />
        </div>
      </Flex>
      <Flex justifyEnd className='gm-padding-10'>
        <Button onClick={onCancel}>{getLocale('取消')}</Button>
        <div className='gm-gap-10' />
        <Button type='primary' className='gm-margin-right-10' onClick={handleSave}>
          {getLocale('保存')}
        </Button>
      </Flex>
    </div>
  )
}

export default DiyTableXModal
