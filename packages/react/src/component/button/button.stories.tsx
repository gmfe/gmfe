import React from 'react'
import Button from './button'

function handleClick() {
  console.log('click')
  return new Promise((resolve) => setTimeout(() => resolve(), 2000))
}

export const normal = () => (
  <div>
    默认
    <div>
      <Button>默认</Button>
      <Button type='primary'>主色</Button>
      <Button type='success'>成功</Button>
      <Button type='danger'>危险</Button>
      <Button type='link'>Link</Button>
      <Button
        type='link'
        href='#/supply_chain/purchase/analysis?tab=3'
        target='_blank'
      >
        链接
      </Button>
    </div>
    plain
    <div>
      <Button plain>默认</Button>
      <Button plain type='primary'>
        主色
      </Button>
      <Button plain type='success'>
        成功
      </Button>
      <Button plain type='danger'>
        危险
      </Button>
      <Button plain type='link'>
        Link
      </Button>
    </div>
    disabled
    <div>
      <Button disabled>默认</Button>
      <Button disabled type='primary'>
        主色
      </Button>
      <Button disabled type='success'>
        成功
      </Button>
      <Button disabled type='danger'>
        危险
      </Button>
      <Button disabled type='link'>
        Link
      </Button>
    </div>
    size
    <div>
      <Button>默认</Button>
      <Button size='large'>大的</Button>
    </div>
  </div>
)

export const loading = () => (
  <div>
    loading
    <div>
      <Button loading>loading</Button>
    </div>
    onClick promise
    <div>
      <Button onClick={handleClick}>点击显示 loading</Button>
      <Button type='primary' onClick={handleClick}>
        点击显示 loading
      </Button>
      <Button type='success' onClick={handleClick}>
        点击显示 loading
      </Button>
      <Button type='danger' onClick={handleClick}>
        点击显示 loading
      </Button>
    </div>
  </div>
)

export default {
  title: 'Button',
}
