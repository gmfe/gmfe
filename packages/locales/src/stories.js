import React from 'react'
import { storiesOf } from '@storybook/react'
import { setLocale } from './index'
import { observable } from 'mobx'

const l = localStorage.getItem('_react-gm_' + 'lng')

const store = observable({
  lng: (l ? JSON.parse(l) : '') || 'zh'
})


storiesOf('locales|locales', module).add('default', () => (
  <select
    value={store.lng}
    onChange={e => {
      localStorage.setItem('_react-gm_' + 'lng', JSON.stringify(e.target.value))
      setLocale(e.target.value)
      store.lng = e.target.value
    }}
    style={{ verticalAlign: 'middle' }}
  >
    <option value='en'>English</option>
    <option value='zh'>中文</option>
  </select>
))
