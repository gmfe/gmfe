import React from 'react'

import { observable } from 'mobx'

const store = observable({
  data: [1, 2]
})

export const demo = () => {
  return <div>demo {store.data}</div>
}

export default {
  title: 'DEMO|DEMO'
}
