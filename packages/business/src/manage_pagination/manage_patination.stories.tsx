import React, { FC, useEffect, useRef } from 'react'
import { storiesOf } from '@storybook/react'
import {
  ManagePagination,
  ManagePaginationParams,
  ManagePaginationResponse,
  ManagePaginationV2,
  ManagePaginationV2Params,
  ManagePaginationV2Response,
} from './'

const Wrap: FC<{ count?: number }> = ({ count }) => {
  const pagination = useRef<ManagePagination>(null)

  useEffect(() => {
    pagination.current!.apiDoFirstRequest()
  }, [])

  const handleRequest = (pagination: ManagePaginationParams): Promise<ManagePaginationResponse> => {
    console.log(pagination)
    return new Promise((resolve) => {
      setTimeout(() => {
        const json = {
          data: ['111', '222'],
          pagination: {
            offset: 10,
            limit: 10,
            count,
          },
        }
        resolve(json)
      }, 1000)
    })
  }

  return (
    <ManagePagination id='ManagePagination' ref={pagination} onRequest={handleRequest}>
      {({ loading }) => <div>Some content {loading && '加载中...'}</div>}
    </ManagePagination>
  )
}

const Wrap2: FC<{ count?: number }> = ({ count }) => {
  const pagination = useRef<ManagePaginationV2>(null)

  useEffect(() => {
    pagination.current!.apiDoFirstRequest()
  }, [])

  const requestSomething = (
    pagination: ManagePaginationV2Params
  ): Promise<ManagePaginationV2Response> => {
    console.log(pagination)
    return new Promise((resolve) => {
      setTimeout(() => {
        const json = {
          data: ['111', '222'],
          pagination: {
            page_obj: 'xxx',
            peek: 40,
            more: true,
            count,
          },
        }
        resolve(json)
      }, 1000)
    })
  }

  return (
    <ManagePaginationV2 ref={pagination} id='demo_manage_pagination' onRequest={requestSomething}>
      {({ loading }) => <div>Some content {loading && '加载中...'}</div>}
    </ManagePaginationV2>
  )
}

storiesOf('Business|ManagePagination', module)
  .add('default without count', () => <Wrap />)
  .add('with count', () => <Wrap count={100} />)

storiesOf('Business|ManagePaginationV2', module)
  .addParameters({
    info: {
      text: `
因为页码的管理逻辑复杂，估抽象一个组件，让调用方无需关心 页码相关逻辑。
调用方关心
- 响应请求动作 onRequest，用提供的参数去请求
- 请求数据 this.ref.current.doFirstRequest。顾名思义，想要重新请求数据也应该调用这个方法。比如搜索按钮点击。
- 如果想刷新当前页，this.ref.current.doCurrentRequest。
`,
    },
  })
  .add('default without count', () => <Wrap2 />)
  .add('with count', () => <Wrap2 count={177} />)
