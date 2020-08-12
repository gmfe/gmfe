import { FC, useEffect } from 'react'
import _ from 'lodash'

const PREFIX = '_react-gm_'
const { localStorage } = window

interface StorageProps {
  name: string
  value?: StorageValue
}

type StorageValue = string | number | { [key: string]: any } | any[] | undefined

interface StorageFC extends FC<StorageProps> {
  set(key: string, value: StorageValue): void
  get(key: string): StorageValue
  remove(key: string): void
  clear(): void
  getAll(): { [key: string]: any } | null
}

const Storage: StorageFC = ({ name, value }) => {
  useEffect(() => {
    Storage.set(name, value)
  }, [value, name])
  return null
}

Storage.set = function (key, value) {
  localStorage.setItem(`${PREFIX}${key}`, JSON.stringify(value))
}

Storage.get = function (key) {
  const v = localStorage.getItem(`${PREFIX}${key}`)
  return v ? JSON.parse(v) : v
}

Storage.remove = function (key) {
  localStorage.removeItem(`${PREFIX}${key}`)
}

Storage.clear = function () {
  localStorage.clear()
}

Storage.getAll = function () {
  const result: { [key: string]: any } = {}
  _.each(_.range(localStorage.length), (i) => {
    let key = localStorage.key(i)
    if (key?.startsWith(PREFIX)) {
      key = key.slice(PREFIX.length)
      result[key] = Storage.get(key)
    }
  })
  return _.keys(result) ? result : null
}

export default Storage
export type { StorageValue, StorageProps }
