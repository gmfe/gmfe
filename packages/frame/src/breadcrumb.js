import React from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import { is } from '@gm-common/tool'

function nav2BreadCrumb(props) {
  const { breadcrumbs, pathname, navConfig } = props
  const result = []

  _.find(navConfig, one => {
    _.find(one.sub, two => {
      return _.find(two.sub, three => {
        if (three.link.includes(pathname)) {
          result.push(one)
          result.push(two)
          result.push(three)

          return true
        }
      })
    })
  })

  _.forEach(breadcrumbs, v => {
    if (_.isString(v)) {
      result.push({ name: v })
    } else {
      result.push({ name: v.name, link: v.link || pathname })
    }
  })

  return result
}

const Breadcrumb = props => {
  const data = nav2BreadCrumb(props)

  if (!data || data.length === 0) {
    return <div className='gm-framework-breadcrumb-default' />
  }

  const last = data[data.length - 1]

  return (
    <ul className='gm-framework-breadcrumb-default breadcrumb'>
      {!is.phone() &&
        _.map(data.slice(0, -1), (v, i) => (
          <li key={i + '_' + v.link}>
            <a
              href={v.link}
              onClick={e => {
                e.preventDefault()
                props.onSelect(v)
              }}
            >
              {v.name}
            </a>
          </li>
        ))}
      {last.link ? (
        <li>
          <a
            href={last.link}
            onClick={e => {
              e.preventDefault()
              props.onSelect(last)
            }}
          >
            {last.name}
          </a>
        </li>
      ) : (
        <li>{last.name}</li>
      )}
    </ul>
  )
}

Breadcrumb.propTypes = {
  breadcrumbs: PropTypes.array.isRequired,
  pathname: PropTypes.string.isRequired,
  /**
   * 三级菜单，其中 2 级有个 style
   * [{link, name, sub: [{link, name, style, sub: [{link, name}]}]}]
   * */
  navConfig: PropTypes.array.isRequired,
  /** 直接吐 item，如果是一二级会找到第三级的item吐 */
  onSelect: PropTypes.func.isRequired
}

export default Breadcrumb
