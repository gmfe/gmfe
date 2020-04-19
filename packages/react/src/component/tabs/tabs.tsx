import React, { Component, ReactNode, Children } from 'react'
import classNames from 'classnames'

export interface TabsProps {
  tabs: string[]
  active?: number
  defaultActive?: number
  lazy?: boolean
  onChange?(active: number): void
}

interface TabsState {
  selected: number
}

class Tabs extends Component<TabsProps, TabsState> {
  static getDerivedStateFromProps(
    props: TabsProps,
    state: TabsState
  ): TabsState {
    if ('active' in props) {
      return { selected: props.active as number }
    }
    return { selected: state.selected }
  }

  readonly state: TabsState = {
    selected: this.props.defaultActive ?? 0,
  }

  private _renderChildren = (): ReactNode => {
    const { children } = this.props
    const { selected } = this.state
    return Children.map(children, (child, index) => (
      <div
        key={index}
        className={classNames({
          hidden: selected !== index,
        })}
      >
        {child}
      </div>
    ))
  }

  private _renderChildrenLazy = (): ReactNode => {
    const { children } = this.props
    const { selected } = this.state
    const elements = React.Children.toArray(children)
    return <div>{elements[selected]}</div>
  }

  private _handleClick = (index: number): void => {
    if (!('active' in this.props)) {
      this.setState({ selected: index })
    }
    const { onChange } = this.props
    onChange && onChange(index)
  }

  render() {
    const { tabs, lazy } = this.props
    const { selected } = this.state
    return (
      <>
        <div className='gm-tabs-container'>
          <div className='gm-tabs'>
            {tabs.map((tab, index) => (
              <div
                className={classNames('gm-tab', {
                  active: index === selected,
                })}
                key={index}
                onClick={(): void => this._handleClick(index)}
              >
                {tab}
              </div>
            ))}
          </div>
        </div>
        {lazy ? this._renderChildrenLazy() : this._renderChildren()}
      </>
    )
  }
}
export default Tabs
