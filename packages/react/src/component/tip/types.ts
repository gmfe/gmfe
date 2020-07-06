type TipTypes = 'success' | 'warning' | 'info' | 'danger'
interface TipContentProps {
  title: string
  type: TipTypes
  onClose(): void
}
interface TipProps extends TipContentProps {
  time: number
}

export { TipTypes, TipContentProps, TipProps }
