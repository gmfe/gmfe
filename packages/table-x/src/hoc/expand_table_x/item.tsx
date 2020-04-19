import React, { FC } from 'react'
import SVGCloseup from '../../../svg/closeup.svg'
import SVGExpand from '../../../svg/expand.svg'

interface ExpandItemProps {
  active: boolean
  onChange(): void
}

const ExpandItem: FC<ExpandItemProps> = ({ active, onChange }) => (
  <div className='gm-cursor gm-table-x-expand' onClick={onChange}>
    {active ? <SVGCloseup className='gm-text-primary' /> : <SVGExpand />}
  </div>
)

export default ExpandItem
