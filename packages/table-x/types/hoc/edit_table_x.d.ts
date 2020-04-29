import { FC } from 'react'

interface PropsGeneric<Props extends { [key: string]: any }> {}

declare function editTableXHOC<
  Original extends { [key: string]: any },
  Props extends PropsGeneric<Original>
>(Component: FC<Props>): FC<Props>
export default editTableXHOC
