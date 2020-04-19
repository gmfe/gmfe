import React from 'react'
import { storiesOf } from '@storybook/react'
import Modal from './modal'
import CleanModal from './clean_modal'
import RightSideModal from './right_side_modal'
import Button from '../button'

storiesOf('Modal', module)
  .add('default', () => (
    <Button
      type='primary'
      onClick={() => {
        Modal.render({
          children: '我是内容',
          title: '我是标题',
        })
      }}
    >
      modal
    </Button>
  ))
  .add('size', () => (
    <Button
      type='primary'
      onClick={() => {
        Modal.render({
          size: 'lg',
          children: '我是内容',
          title: '我是标题',
          onHide: Modal.hide,
        })
      }}
    >
      size
    </Button>
  ))
  .add('noContentPadding', () => (
    <Button
      type='primary'
      onClick={() => {
        Modal.render({
          noContentPadding: true,
          size: 'lg',
          children: '我是内容',
          title: '我是标题',
          onHide: Modal.hide,
        })
      }}
    >
      noContentPadding
    </Button>
  ))
  .add('opacityMask', () => (
    <Button
      type='primary'
      onClick={() => {
        Modal.render({
          opacityMask: true,
          size: 'lg',
          children: '我是内容',
          title: '我是标题',
          onHide: Modal.hide,
        })
      }}
    >
      opacityMask
    </Button>
  ))
  .add('CleanModal', () => (
    <Button
      type='primary'
      onClick={() => {
        CleanModal.render({
          children: <div className='gm-text-white'>啦啦啦</div>,
          onHide: Modal.hide,
        })
      }}
    >
      CleanModal
    </Button>
  ))
  .add('RightSideModal', () => (
    <Button
      type='primary'
      onClick={() => {
        RightSideModal.render({
          title: 'asdf',
          children: <div className='gm-text-white'>啦啦啦</div>,
          onHide: Modal.hide,
        })
      }}
    >
      RightSideModal
    </Button>
  ))
