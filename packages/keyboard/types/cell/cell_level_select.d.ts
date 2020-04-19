import { KeyboardEvent, PropsWithChildren, ReactElement } from 'react'
import { LevelSelectProps } from '@gmfe/react/types/src/level_select'

interface KeyboardCellLevelSelectProps<P> extends LevelSelectProps<P> {
  disabled?: boolean
  onKeyDown?(event: KeyboardEvent<HTMLDivElement>): void
}

declare const KeyboardCellLevelSelect: <P>(
  props: PropsWithChildren<KeyboardCellLevelSelectProps<P>>
) => ReactElement
export default KeyboardCellLevelSelect
