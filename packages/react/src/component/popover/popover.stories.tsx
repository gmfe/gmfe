import React from 'react'
import { storiesOf } from '@storybook/react'
import Popover from './popover'
import { Button } from '../button'

const renderPopup = () => {
  return (
    <div style={{ width: '200px', height: '200px' }}>
      <div>啦啦啦啦啦啦啦啦啦啦啦</div>
      <div>啦啦啦啦啦啦啦啦啦啦啦</div>
      <div>啦啦啦</div>
    </div>
  )
}

storiesOf('Popover', module).add('default', () => (
  <div>
    <div>四种行为 focus click hover realFocus</div>
    <div>
      <Popover popup={renderPopup()}>
        <Button>focus me default</Button>
      </Popover>
      <Popover type='click' popup={renderPopup()}>
        <Button>click me</Button>
      </Popover>
      <Popover showArrow type='hover' popup={renderPopup()}>
        <Button>hover me</Button>
      </Popover>
      <Popover showArrow type='realFocus' popup={renderPopup()}>
        <Button>realFocus me</Button>
      </Popover>
    </div>
    <div>各种位置</div>
    <div>
      <Popover popup={renderPopup()}>
        <Button>focus me(default)</Button>
      </Popover>
      <Popover right popup={renderPopup()}>
        <Button>focus me(right)</Button>
      </Popover>
      <Popover center popup={renderPopup()}>
        <Button>focus me(center)</Button>
      </Popover>
    </div>
    <div>
      <Popover top popup={renderPopup()}>
        <Button>focus me(top)</Button>
      </Popover>
      <Popover right top popup={renderPopup()}>
        <Button>focus me(right top)</Button>
      </Popover>
      <Popover center top popup={renderPopup()}>
        <Button>focus me(center top)</Button>
      </Popover>
    </div>

    <div>偏移位置</div>
    <div>
      <Popover offset={20} popup={renderPopup()}>
        <Button>focus me(20)</Button>
      </Popover>
      <Popover offset={-20} popup={renderPopup()}>
        <Button>focus me(-20)</Button>
      </Popover>
      <Popover right offset={20} popup={renderPopup()}>
        <Button>focus me(right 20)</Button>
      </Popover>
      <Popover right top offset={20} popup={renderPopup()}>
        <Button>focus me(right top 20)</Button>
      </Popover>
      <Popover center offset={20} popup={renderPopup()}>
        <Button>focus me(center 20)</Button>
      </Popover>
      <Popover showArrow offset={20} popup={renderPopup()}>
        <Button>showArrow(offset 20)</Button>
      </Popover>
    </div>

    <div>加角标</div>
    <div>
      <Popover top showArrow popup={renderPopup()}>
        <Button>showArrow toptoptoptop</Button>
      </Popover>
      <Popover showArrow right popup={renderPopup()}>
        <Button>showArrow right</Button>
      </Popover>
      <Popover showArrow arrowLeft='0px' popup={renderPopup()}>
        <Button>showArrow arrowLeft 0</Button>
      </Popover>
    </div>
    <div>disabled</div>
    <div>
      <Popover disabled popup={renderPopup()}>
        <Button>focus me(disabled)</Button>
      </Popover>
      <Popover popup={renderPopup()}>
        <Button disabled>focus me(inner disabled)</Button>
      </Popover>
    </div>
  </div>
))
