import React from 'react'
import { storiesOf } from '@storybook/react'
import Dialog from './dialog'
import { Button } from '../button'

storiesOf('Dialog', module)
  .add('JSX', () => (
    <Dialog show>
      <p>Hello world</p>
    </Dialog>
  ))
  .add('default', () => (
    <div>
      <Button
        onClick={() => {
          Dialog.alert({
            children: '1231',
          }).then(
            (value) => {
              console.log(value)
              // console.log('resolve')
            },
            (error) => {
              console.log(error)
              // console.log('reject')
            }
          )
        }}
      >
        alert
      </Button>
      <Button
        onClick={() => {
          Dialog.confirm({
            children: 'confirm',
            title: 'title',
          }).then(
            () => {
              console.log('resolve')
            },
            () => {
              console.log('reject')
            }
          )
        }}
      >
        confirm
      </Button>
      <Button
        onClick={() => {
          Dialog.confirm({
            title: 'title',
            size: 'md',
            children: <div>something</div>,
            onOK: () => {
              return new Promise((resolve) => {
                setTimeout(() => {
                  resolve('a')
                }, 1000)
              })
            },
          }).then((value) => {
            console.log(value)
          })
        }}
      >
        confirm with loading state
      </Button>
      <Button
        onClick={() => {
          Dialog.prompt({
            children: 'sssss',
            title: 'title',
            promptDefaultValue: '123',
            onOK: (value) => {
              console.log('ok', value)
              return false // return Promise.reject();
            },
          }).then(
            (value) => {
              console.log('resolve', value)
            },
            () => {
              console.log('reject')
            }
          )
        }}
      >
        prompt
      </Button>
    </div>
  ))
  .add('dialog to dialog', () => {
    const openSyncDialog1 = () => {
      Dialog.confirm({
        title: 'dialog1',
        children: 'dialog1',
      }).then(() => {
        openDialog2()
      })
    }

    const openAsyncDialog1 = () => {
      Dialog.confirm({
        title: 'dialog1',
        children: 'dialog1',
        onOK() {
          return new Promise((resolve) => {
            setTimeout(() => resolve(), 2000)
          }).then(() => {
            setTimeout(() => {
              // 必须加setTimeout
              openDialog2()
            })
          })
        },
      })
    }

    const openDialog2 = () => {
      Dialog.confirm({
        title: 'dialog2',
        children: 'dialog2',
      })
    }
    return (
      <>
        <Button onClick={openSyncDialog1}>sync</Button>
        <Button onClick={openAsyncDialog1}>async</Button>
      </>
    )
  })
