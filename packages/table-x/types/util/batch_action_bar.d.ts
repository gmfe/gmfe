import { FC } from 'react'

type ActionType = 'delete' | 'edit' | 'business'

interface BatchActionBarProps {
  pure?: boolean
  isSelectAll?: boolean
  count?: number | object
  batchActions: [{ type: ActionType; name: string; onClick(): void }]
  toggleSelectAll?(selected: boolean): void
  onClose(): void
}

declare const BatchActionBar: FC<BatchActionBarProps>
export default BatchActionBar
