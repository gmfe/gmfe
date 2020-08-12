import React, { FC, useCallback, useState } from 'react'
import { FunctionSetDataOptions } from './type'
import { processDataWithValue } from './utils'
import { LevelList } from '../level_list'

interface OverlayProps {
  data: FunctionSetDataOptions[]
  onSelect(selected: FunctionSetDataOptions): void
  isReverse?: boolean
}

const Overlay: FC<OverlayProps> = ({ data, onSelect, isReverse }) => {
  const [will, setWill] = useState<string[]>([])

  // 做个map存起来，方便快速通过 value 找到 item
  const map: { [key: string]: FunctionSetDataOptions } = {}
  const newData = processDataWithValue(data, map)

  const handleSelect = useCallback(
    (selected: string[]) => {
      // 取最后一个
      const item = map[selected.slice(-1)[0]]
      onSelect(item)
    },
    [map, onSelect]
  )

  return (
    <LevelList<string>
      data={newData}
      selected={[]}
      onSelect={handleSelect}
      willActiveSelected={will}
      onWillActiveSelect={(will) => setWill(will)}
      isReverse={isReverse}
      isForFunctionSet
    />
  )
}

export default Overlay
