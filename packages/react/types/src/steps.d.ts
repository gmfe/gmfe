import { FC } from 'react'

export interface StepsProps {
  data: StepsDataOptions[]
  className?: string
}

interface StepsDataOptions {
  title: string
  description: string
}

declare const Steps: FC<StepsProps>
export default Steps
