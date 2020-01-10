import React from 'react'
import Group from '../packages/sortable/src/group'
import _ from 'lodash'

import { observable } from 'mobx'

const store = observable({
  data: [
    [{ value: 1 }, { value: 2 }, { value: 3 }, { value: 4 }],
    [{ value: 5 }, { value: 6 }]
  ]
})

export const demo = () => {
  return (
    <div>
      <Group
        data={store.data.slice()}
        onChange={newData => {
          console.log('newData', newData)
          store.data = newData
        }}
        renderItem={item => (
          <div className='gm-padding-10 gm-margin-5 gm-border'>
            lalala {item.value}
          </div>
        )}
      >
        {Coms => {
          return (
            <div className='gm-padding-10'>
              {_.map(Coms, (Com, i) => {
                return (
                  <div key={i} className='gm-inline-block'>
                    {Com}
                    <hr />
                  </div>
                )
              })}
            </div>
          )
        }}
      </Group>
    </div>
  )
}

export default {
  title: 'DEMO'
}
