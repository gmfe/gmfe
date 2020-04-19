import React from 'react'
import { storiesOf } from '@storybook/react'
import Tip from './tip'
import { Button } from '../button'

storiesOf('Tip', module).add(
  'default',
  () => (
    <div>
      <div>
        <Tip type='success'>啊啊啊</Tip>
        <Tip type='info'>啊啊啊</Tip>
        <Tip type='warning'>啊啊啊</Tip>
        <Tip type='danger'>啊啊啊</Tip>
        <Tip type='success' title='错误'>
          啊啊啊
        </Tip>
      </div>
      <Button
        // @ts-ignore
        onClick={() => (window.___lastTip = Tip.info('提示啦，提示啦'))}
      >
        默认 3s 关闭
      </Button>
      <Button
        onClick={() =>
          // @ts-ignore
          (window.___lastTip = Tip.success({
            children: '需要用户自行关闭的',
            time: 0,
            onClose: () => console.log('tip closed by user'),
          }))
        }
      >
        需要用户自行关闭的
      </Button>
      <Button
        // @ts-ignore
        onClick={() => Tip.clear(window.___lastTip)}
      >
        关闭指定 tip （比如最后一个tip）
      </Button>
    </div>
  ),
  {
    info: {
      text: `
### Static

方法返回 id ,可以通过 clear(id) 来关闭指定的 tip

- \`success()\`
- \`info()\`
- \`warning()\`
- \`danger()\`
- \`clear(id)\`
- \`clearAll()\`
`,
    },
  }
)
