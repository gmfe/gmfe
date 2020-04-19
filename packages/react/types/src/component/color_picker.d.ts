import { Component, ReactElement } from 'react'

export interface ColorPickerProps {
  color?: string
  onChange?(color: string): void
  children: ReactElement
}

declare class ColorPicker extends Component<ColorPickerProps, void> {
  static defaultProps: {
    onChange(color: string): void
  }
}
export default ColorPicker
