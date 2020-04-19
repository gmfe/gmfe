import React from 'react'
import { storiesOf } from '@storybook/react'
import Carousel from './carousel'
import { observable } from 'mobx'

const store = observable({
  showOne: false,
  setShowOne(value: boolean) {
    console.log(value)
    this.showOne = value
  },
})

setTimeout(() => {
  store.setShowOne(true)
}, 4000)

storiesOf('Carousel', module).add('default', () => {
  const render1 = () => <div>111</div>
  return (
    <Carousel
      style={{ width: '1000px', height: '200px' }}
      onIndexChange={(index) => console.log(index, 'afterChangeIndex')}
    >
      <div style={{ backgroundColor: 'red', height: '100%', width: '100%' }}>
        <div>
          <img
            style={{ height: '200px', width: '800px' }}
            src='https://img.guanmai.cn/product_pic/da32d562de124462.png'
          />
        </div>
      </div>
      <div style={{ backgroundColor: 'green', height: '100%' }}>showCarousel1</div>
      <div style={{ backgroundColor: 'yellow', height: '100%' }}>showCarousel2</div>
      <div style={{ backgroundColor: 'blue', height: '100%' }}>showCarousel3</div>
      {store.showOne ? (
        <div style={{ backgroundColor: 'orange', height: '100%' }}>showCarousel4</div>
      ) : null}
      {render1()}
    </Carousel>
  )
})
