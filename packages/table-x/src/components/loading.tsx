import React, { FC } from 'react'
import Mask from './mask'
import { getLocale } from '@gmfe/locales'

const Loading: FC = () => (
  <Mask
    style={{
      backgroundColor: 'rgba(255,255,255,0.8)',
    }}
  >
    {getLocale('加载数据中...')}
  </Mask>
)

export default Loading
