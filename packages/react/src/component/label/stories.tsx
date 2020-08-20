import React from 'react'
import Label from './index'

export const Normal = () => {
  return (
    <div>
      <Label>标签</Label>
      <Label type='primary'>标签</Label>
      <Label type='success'>标签</Label>
      <Label type='danger'>标签</Label>
    </div>
  )
}

export default {
  title: 'Label',
}
