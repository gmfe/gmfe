import React, { CSSProperties, FC, HTMLAttributes, ReactNode } from 'react'
import classNames from 'classnames'
import { Flex, FlexProps } from '../flex'

export interface BoxTableProps {
  info?: ReactNode
  action?: ReactNode
  className?: string
  style?: CSSProperties
  headerProps?: FlexProps
}

interface BoxTableFC extends FC<BoxTableProps> {
  Info: FC<HTMLAttributes<HTMLDivElement>>
}

const Info: FC<HTMLAttributes<HTMLDivElement>> = ({ className, ...rest }) => (
  <div {...rest} className={classNames(className, 'gm-box-table-info')} />
)

const BoxTable: BoxTableFC = ({ info, action, children, className, headerProps = {}, ...rest }) => {
  const { className: headerClassName } = headerProps

  return (
    <div {...rest} className={classNames('gm-box', 'gm-box-table', className)}>
      <Flex
        {...headerProps}
        className={classNames('gm-box-table-header', headerClassName)}
        alignCenter
      >
        <Flex>{info}</Flex>
        <Flex flex />
        <Flex>{action}</Flex>
      </Flex>
      <div>{children}</div>
    </div>
  )
}

BoxTable.Info = Info
export default BoxTable
