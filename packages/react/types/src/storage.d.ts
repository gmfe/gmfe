import { FC } from 'react'

interface StorageProps {
  name: string
  value?: StorageValue
}

type StorageValue = string | { [key: string]: unknown } | unknown[]

interface StorageFC extends FC<StorageProps> {
  set(key: string, valu: StorageValue): void
  get(key: string): StorageValue
  remove(key: string): void
  clear(): void
  getAll(): StorageValue[] | null
}

declare const Storage: StorageFC
export default Storage
