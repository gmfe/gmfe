import React, { FC, memo } from 'react'
import ExpandTableXContext from './context'
import ExpandItem from './item'

const ExpandHeader: FC = () => (
  <ExpandTableXContext.Consumer>
    {({ isExpandAll, onExpandAll }) => <ExpandItem active={isExpandAll} onChange={onExpandAll} />}
  </ExpandTableXContext.Consumer>
)

export default memo(ExpandHeader)
