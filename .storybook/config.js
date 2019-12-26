// init lng
import { setLocale } from '../packages/gm-locales/src/index'
import React from 'react'
import { configure, addDecorator } from '@storybook/react'
import { withInfo } from '@storybook/addon-info'
import { Observer } from 'mobx-react'
import { LayoutRoot } from '../packages/gm-react/src/index'

// TODO 没有效果，因为存在部分 getLocale 比 setLocale 还早，得像个办法了
let lng = localStorage.getItem('_react-gm_lng')
lng = JSON.parse(lng)
console.log('lng', lng)
setLocale(lng)

import './style.less'
// 引入 react-gm 样式
import '../packages/gm-react/src/index.less'
// 引入 frame 样式
import '../packages/gm-frame/src/index.less'
// 引入 react-table 样式
import 'react-table-v6/react-table.css'
import '../packages/gm-table/src/index.less'
// table-x
import '../packages/gm-table-x/src/index.less'
// cropper
import '../packages/gm-cropper/src/index.less'

if (process.env.NODE_ENV !== 'production') {
  const whyDidYouRender = require('@welldone-software/why-did-you-render')
  whyDidYouRender(React)
}

const reqs = [
  require.context('../packages/gm-react', true, /stories\.js$/),
  require.context('../packages/gm-table', true, /stories\.js$/),
  require.context('../packages/gm-table-x', true, /stories\.js$/),
  require.context('../packages/gm-keyboard', true, /stories\.js$/),
  require.context('../packages/gm-sortable', true, /stories\.js$/),
  require.context('../packages/gm-cropper', true, /stories\.js$/),
  require.context('../packages/gm-frame', true, /stories\.js$/),
  require.context('../packages/gm-locales', true, /stories\.js$/)
]

addDecorator(
  withInfo({
    inline: true,
    header: false,
    styles: stylesheet => {
      return {
        ...stylesheet,
        infoBody: {
          ...stylesheet.infoBody,
          padding: '10px',
          fontWeight: 'normal'
        },
        source: {
          ...stylesheet.source,
          marginBottom: '10px'
        }
      }
    }
  })
)

addDecorator(storeFn => (
  <React.Fragment>
    <Observer>{() => storeFn()}</Observer>
    <LayoutRoot />
  </React.Fragment>
))

configure(reqs, module)
