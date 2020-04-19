import React from 'react'
import { storiesOf } from '@storybook/react'
import Switch from './switch'

storiesOf('Switch', module)
  .add('default', () => <Switch checked />)
  .add('有文字', () => <Switch checked on='上架' off='下架' />)
