import React, { Component, createRef } from 'react'
import _ from 'lodash'
import { Popover } from '../popover'
import { Button } from '../button'
import { getLocale } from '@gmfe/locales'
import ColorSelect from './color_select'

export interface ColorPickerProps {
  color?: string
  onChange?(color: string): void
}

class ColorPicker extends Component<ColorPickerProps> {
  static defaultProps = {
    onChange: _.noop,
  }

  private _popoverRef = createRef<Popover>()

  private _handleConfirm = (color: string): void => {
    const { onChange } = this.props
    onChange && onChange(color)
    this._handleCancel()
  }

  private _handleCancel = (): void => {
    this._popoverRef.current!.apiDoSetActive()
  }

  render() {
    const { color, children } = this.props
    return (
      <Popover
        ref={this._popoverRef}
        type='click'
        showArrow
        popup={
          <ColorSelect
            defaultColor={color}
            onConfirm={this._handleConfirm}
            onCancel={this._handleCancel}
          />
        }
      >
        {children ?? <Button>{color ?? getLocale('选择颜色')}</Button>}
      </Popover>
    )
  }
}
export default ColorPicker
