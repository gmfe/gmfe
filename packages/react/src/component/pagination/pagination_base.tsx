import React, { FC } from 'react'
import classNames from 'classnames'
import { PaginationBaseProps } from './utils/types'
import paginationContext from './utils/context'
import { Flex } from '../flex'
import Left from './components/left'
import PagePeek from './components/page_peek'
import Page from './components/page'
import Right from './components/right'

const { Provider } = paginationContext

const PaginationBase: FC<PaginationBaseProps> = ({
  data,
  onChange,
  showCount,
  _peekInfo,
  className,
  ...rest
}) => {
  return (
    <Provider value={{ data, onChange }}>
      <Flex {...rest} alignCenter className={classNames('gm-pagination', className)}>
        <Left showCount={showCount} />
        {_peekInfo ? <PagePeek _peekInfo={_peekInfo} /> : <Page />}
        {showCount && <Right />}
      </Flex>
    </Provider>
  )
}

export default PaginationBase
