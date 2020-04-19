import React, { FC } from 'react'
import _ from 'lodash'
import { is } from '@gm-common/tool'

interface navConfigSubSubOptions {
  link: string
  name: string
}

interface navConfigSubOptions {
  link: string
  name: string
  style?: object
  sub: navConfigSubSubOptions[]
}

interface navConfigOptions {
  link: string
  name: string
  sub: navConfigSubOptions[]
}

export interface BreadcrumbProps {
  breadcrumbs: string[] | navConfigSubSubOptions[]
  pathname: string
  navConfig: navConfigOptions[]
  onSelect(selected: navConfigSubSubOptions): void
}

const nav2BreadCrumb = (
  breadcrumbs: string[] | navConfigSubSubOptions[],
  pathname: string,
  navConfig: navConfigOptions[]
): navConfigOptions[] => {
  const result: navConfigOptions[] = []

  _.find(navConfig, (one) => {
    _.find(one.sub, (two) => {
      return _.find(two.sub, (three) => {
        if (pathname.includes(three.link)) {
          result.push(one)
          result.push(two)
          result.push(three)

          return true
        }
      })
    })
  })

  _.forEach(breadcrumbs, (v) => {
    if (_.isString(v)) {
      result.push({ name: v })
    } else {
      result.push({ name: v.name, link: v.link || pathname })
    }
  })

  return result
}

const Breadcrumb: FC<BreadcrumbProps> = ({
  breadcrumbs,
  pathname,
  navConfig,
  onSelect,
}) => {
  const data: navConfigOptions[] = nav2BreadCrumb(breadcrumbs, pathname, navConfig)

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
              onClick={(e) => {
                e.preventDefault()
                if (i === 0) {
                  onSelect(data[0].sub[0].sub[0])
                } else if (i === 1) {
                  onSelect(data[1].sub[0])
                } else if (i === 2) {
                  onSelect(data[2])
                } else {
                  onSelect(v)
                }
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
            onClick={(event) => {
              event.preventDefault()
              onSelect(last)
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

export default Breadcrumb
