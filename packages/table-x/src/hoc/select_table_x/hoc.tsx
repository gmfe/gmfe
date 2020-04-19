import React, { ComponentType, FC, ReactNode, useMemo } from 'react'
import { TableXProps } from '../../types'
import SelectTableXContext from './context'
import { Flex } from '@gmfe/react'
import useGetColumns from './use_get_columns'

export interface SelectTableXProps<Original extends object> {
  keyField: keyof Original
  selected: Original[keyof Original][]
  onSelect(selected: Original[keyof Original][]): void
  batchActionBar?: ReactNode
  isSelectorDisable?(item: Original): boolean
  selectType?: 'checkbox' | 'radio'
  fixedSelect?: boolean
}

function selectTableXHOC<
  Original extends object,
  Props extends TableXProps<Original> = TableXProps<Original>
>(Table: ComponentType<Props>) {
  const SelectTableX: FC<Props & SelectTableXProps<Original>> = ({
    selected,
    onSelect,
    batchActionBar,
    isSelectorDisable = () => false,
    selectType = 'checkbox',
    keyField = 'value' as keyof Original,
    fixedSelect,
    columns,
    data,
    ...rest
  }) => {
    const canSelectData = useMemo(() => data.filter((item) => !isSelectorDisable(item)), [
      data,
    ])
    const isSelectAll = selected.length === canSelectData.length

    const newColumns = useGetColumns<Original>(
      columns,
      !!fixedSelect,
      selectType,
      keyField,
      isSelectorDisable
    )

    const handleSelect = (
      selected: Original[SelectTableXProps<Original>['keyField']][]
    ): void => {
      onSelect(selected)
    }

    const handleSelectAll = (): void => {
      onSelect(!isSelectAll ? canSelectData.map((v) => v[keyField]) : [])
    }

    return (
      <SelectTableXContext.Provider
        value={{
          selected,
          isSelectAll,
          onSelect: handleSelect,
          onSelectAll: handleSelectAll,
        }}
      >
        <div className='gm-table-x-select-container'>
          {batchActionBar && (
            <div className='gm-table-x-select-batch-action-bar-container'>
              <Flex column justifyCenter className='gm-table-x-select-batch-action-bar'>
                {batchActionBar}
              </Flex>
            </div>
          )}
          <Table {...(rest as Props)} columns={newColumns} data={data} />
        </div>
      </SelectTableXContext.Provider>
    )
  }
  return SelectTableX
}

export default selectTableXHOC
