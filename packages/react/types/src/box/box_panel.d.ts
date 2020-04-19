import { CSSProperties, FC, ReactNode } from 'react'

interface BoxPanelSummaryOptions {
  text: string
  value: unknown
}

type BoxPanelSummary = BoxPanelSummaryOptions[] | ReactNode

interface BoxPanelProps {
  title: string
  collapse?: boolean
  summary?: BoxPanelSummary
  right?: ReactNode
  className?: string
  style?: CSSProperties
}

declare const BoxPanel: FC<BoxPanelProps>
export default BoxPanel
export { BoxPanelSummaryOptions, BoxPanelProps }
