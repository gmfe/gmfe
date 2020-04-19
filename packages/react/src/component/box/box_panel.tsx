import React, { CSSProperties, FC, ReactNode, useState } from 'react'
import classNames from 'classnames'
import _ from 'lodash'
import Collapse from '../collapse/collapse'
import { Flex } from '../flex'
import SVGUp from '../../../svg/up.svg'
import SVGDown from '../../../svg/down.svg'

interface BoxPanelSummaryDataOptions {
  text: string
  value: any
}

type BoxPanelSummary = BoxPanelSummaryDataOptions[] | ReactNode

interface BoxPanelProps {
  title: string
  /* 不传就是没有此功能， false 默认收起 true 默认展开 */
  collapse?: boolean
  /* 汇总信息 */
  summary?: BoxPanelSummary
  right?: ReactNode
  className?: string
  style?: CSSProperties
}

const BoxPanel: FC<BoxPanelProps> = ({
  title,
  collapse,
  right,
  summary,
  className,
  children,
  ...rest
}) => {
  const hasCollapse = collapse !== undefined

  const [isCollapse, setIsCollapse] = useState(hasCollapse ? collapse : true)

  const handleCollapse = () => {
    setIsCollapse(!isCollapse)
  }

  return (
    <div {...rest} className={classNames('gm-box gm-box-panel', className)}>
      <Flex flex justifyBetween alignCenter className='gm-box-panel-header'>
        <Flex alignCenter>
          {hasCollapse && (
            <a
              onClick={handleCollapse}
              className='gm-text-desc gm-cursor gm-decoration-none'
            >
              {isCollapse ? <SVGUp /> : <SVGDown />}
            </a>
          )}
          <div className='gm-box-panel-title'>{title}</div>
          {_.isArray(summary) ? (
            <div className='gm-box-panel-summary'>
              {_.map(summary as BoxPanelSummaryDataOptions[], (s, i) => {
                if (i < summary.length - 1) {
                  return (
                    <span>
                      {s.text}:&nbsp;
                      <span className='gm-text-primary gm-text-bold'>{s.value}</span>
                      ,&nbsp;
                    </span>
                  )
                } else {
                  return (
                    <span>
                      {s.text}:&nbsp;
                      <span className='gm-text-primary gm-text-bold'>{s.value}</span>
                    </span>
                  )
                }
              })}
            </div>
          ) : (
            <div className='gm-box-panel-summary'>{summary}</div>
          )}
        </Flex>
        <Flex flex />
        <Flex column none>
          {right}
        </Flex>
      </Flex>
      <Collapse in={isCollapse!}>
        <div>{children}</div>
      </Collapse>
    </div>
  )
}

export default BoxPanel
export type { BoxPanelSummaryDataOptions, BoxPanelProps }
