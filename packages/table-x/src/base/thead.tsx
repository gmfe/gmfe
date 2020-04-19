import React from 'react'
import { HeaderGroup } from 'react-table'
import Th from './th'
import { typedMemo } from '../utils'

interface TheadProps<Original extends object> {
  headerGroups: HeaderGroup<Original>[]
  totalWidth: number
}

function Thead<Original extends object>({ headerGroups, totalWidth }: TheadProps<Original>) {
  return (
    <thead className='gm-table-x-thead'>
      {headerGroups.map((headerGroup, groupIndex) => (
        <tr key={groupIndex} className='gm-table-x-tr'>
          {headerGroup.headers.map((header, headerIndex) => (
            <Th column={header} key={headerIndex} totalWidth={totalWidth} />
          ))}
        </tr>
      ))}
    </thead>
  )
}

Thead.whyDidYouRender = true

export default typedMemo(Thead)
