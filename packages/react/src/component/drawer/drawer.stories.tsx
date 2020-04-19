import React from 'react'
import { storiesOf } from '@storybook/react'
import { Button } from '../button'
import Drawer from './drawer'

storiesOf('Drawer', module).add('default', () => {
  return (
    <Button
      onClick={() => {
        Drawer.render({ children: 'Hello world' })
      }}
    >
      render
    </Button>
  )
})
