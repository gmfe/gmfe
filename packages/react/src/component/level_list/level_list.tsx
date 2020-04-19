import React, { Component } from 'react'
import classNames from 'classnames'
import { LevelListDataOptions, LevelListProps } from './types'
import { getLevel } from './utils'
import LevelItem from './level_item'
import { Flex } from '../flex'

class LevelList<V> extends Component<LevelListProps<V>> {
  static defaultProps = {
    titles: [],
  }

  private _handleSelect = () => {
    const { onSelect, willActiveSelected } = this.props
    onSelect(willActiveSelected)
  }

  private _handleListItemMouseEnter = (index: number, value: LevelListDataOptions<V>): void => {
    const { willActiveSelected, onWillActiveSelect } = this.props

    // slice 避免饮用
    const newWill = willActiveSelected.slice(0, index + 1)
    newWill[index] = value.value
    onWillActiveSelect(newWill)
  }

  private _handleMouseLeave = (): void => {
    // 离开的时候要重置下 willActiveSelected 为 selected
    const { selected, onWillActiveSelect } = this.props
    // slice 避免饮用
    onWillActiveSelect(selected.slice())
  }

  render() {
    const {
      titles,
      data,
      selected,
      onSelect,
      willActiveSelected,
      onWillActiveSelect,
      isReverse,
      className,
      isForFunctionSet,
      ...rest
    } = this.props
    const level = getLevel(data, willActiveSelected)

    let gaps: number[] = []
    if (isForFunctionSet) {
      let indexes = willActiveSelected.map((value, index) =>
        level[index].findIndex((vv) => vv.value === value)
      )
      indexes = [0, ...indexes]
      let top = 0
      gaps = indexes.map((value) => {
        top += value
        return top
      })
    }

    let items = level.map((value, index) => (
      <LevelItem
        data={value}
        key={index}
        title={titles![index]}
        selected={selected[index]}
        onSelect={this._handleSelect}
        willActiveSelected={willActiveSelected[index]}
        onListItemMouseEnter={(value) => this._handleListItemMouseEnter(index, value)}
        style={{ paddingTop: gaps[index] ? gaps[index] * 30 : 0 }}
      />
    ))

    if (isReverse) {
      items = items.reverse()
    }
    return (
      <Flex
        {...rest}
        className={classNames(
          'gm-level-list',
          {
            'gm-level-list-for-function-set': isForFunctionSet,
          },
          className
        )}
        onMouseLeave={this._handleMouseLeave}
      >
        {items}
      </Flex>
    )
  }
}
export default LevelList
