import React from 'react'
import { storiesOf } from '@storybook/react'
import Tooltip from './tooltip'

storiesOf('Tooltip', module).add('default', () => (
  <div style={{ padding: '100px' }}>
    <Tooltip popup={<div style={{ width: '100px', height: '100px' }}>hello</div>} />
    <Tooltip popup={<div style={{ width: '100px', height: '100px' }}>hello</div>}>
      <span>hover tip</span>
    </Tooltip>
    <br />
    <Tooltip right popup={<div style={{ width: '100px', height: '100px' }}>hello</div>}>
      <span>right hover tip</span>
    </Tooltip>
    <Tooltip center popup={<div style={{ width: '100px', height: '100px' }}>hello</div>}>
      <span>center hover tip</span>
    </Tooltip>
    <br />
    <Tooltip top popup={<div style={{ width: '100px', height: '100px' }}>hello</div>}>
      <span>top hover tip</span>
    </Tooltip>
  </div>
))
