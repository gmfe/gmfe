import React, { Component, createRef } from 'react'
import _ from 'lodash'
import COLOR_LIST from './color_list'
import { Flex } from '../flex'
import { Button } from '../button'
import { getLocale } from '@gmfe/locales'

export interface ColorSelectProps {
  defaultColor: string
  onCancel(): void
  onConfirm(color: string): void
}

interface ColorSelectState {
  color: string
}

export default class ColorSelect extends Component<ColorSelectProps, ColorSelectState> {
  static defaultProps = {
    defaultColor: '#fff',
    onCancel: _.noop,
    onConfirm: _.noop,
  }

  readonly state: ColorSelectState = {
    color: this.props.defaultColor,
  }

  private _colorInputRef = createRef<HTMLInputElement>()

  private _handleColorChange = (color: string): void => {
    this.setState({ color })
  }

  private _handleCustomColor = (): void => {
    this._colorInputRef.current!.click()
  }

  private _handleConfirm = (): void => {
    this.props.onConfirm(this.state.color)
  }

  render() {
    const { onCancel } = this.props
    const { color } = this.state
    return (
      <Flex column className='gm-color-picker'>
        {_.map(COLOR_LIST, (color) => (
          <Flex
            alignCenter
            key={color.value}
            className='gm-color-picker-color-default-item gm-bg-hover-primary'
            onClick={() => this._handleColorChange(color.value)}
          >
            <div style={{ background: color.value }} className='gm-color-picker-color-point' />
            <div className='gm-padding-lr-10'>{color.text}</div>
          </Flex>
        ))}
        <Flex alignCenter>
          <div style={{ background: color }} className='gm-color-picker-color-point' />
          <div className='gm-color-picker-addon'>#</div>
          <input
            type='text'
            value={color?.replace('#', '')}
            onChange={(event) => this._handleColorChange(`#${event.target.value}`)}
          />
        </Flex>
        <input
          ref={this._colorInputRef}
          value={color?.slice(0, 7)}
          defaultValue='#fff'
          onChange={(event) => this._handleColorChange(event.target.value)}
          type='color'
          className='gm-hidden'
        />
        <Button onClick={this._handleCustomColor} type='link'>
          {getLocale('自定义颜色')}
        </Button>
        <Flex justifyCenter className='gm-margin-top-10'>
          <Button block onClick={onCancel}>
            {getLocale('取消')}
          </Button>
          <div className='gm-gap-20' />
          <Button block onClick={this._handleConfirm} type='primary'>
            {getLocale('确定')}
          </Button>
        </Flex>
      </Flex>
    )
  }
}
