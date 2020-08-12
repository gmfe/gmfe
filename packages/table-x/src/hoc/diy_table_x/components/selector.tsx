import React from 'react'
import _ from 'lodash'
import styled from 'styled-components'
import { DiyTableXColumn } from '../types'
import { Checkbox, Flex } from '@gmfe/react'

const Item = styled.div`
  width: 25%;
  padding: 5px 0;
`

interface SelectorProps<Original extends object> {
  columns: DiyTableXColumn<Original>[]
  diyGroupSorting: string[]
  onColumnsChange(key: string, show: boolean): void
}

function Selector<Original extends object>({
  columns,
  diyGroupSorting,
  onColumnsChange,
}: SelectorProps<Original>) {
  const colGroup = _.groupBy(columns, 'diyGroupName')
  return (
    <div>
      {diyGroupSorting.map((groupName) => {
        const cols = colGroup[groupName]
        return (
          <div key={groupName}>
            <div className='gm-margin-tb-5'>{groupName}</div>
            <Flex wrap>
              {cols.map((col) => {
                const { show, Header, diyItemText, diyEnable, key } = col
                const text = diyItemText ?? Header

                return (
                  <Item key={_.uniqueId(key)}>
                    <Checkbox
                      value={key}
                      disabled={!diyEnable} // 不能编辑的字段禁用掉
                      checked={show}
                      onChange={() => {
                        onColumnsChange(key!, !show)
                      }}
                    >
                      {text}
                    </Checkbox>
                  </Item>
                )
              })}
            </Flex>
          </div>
        )
      })}
    </div>
  )
}

export default Selector
