interface ManagePaginationOptions {
  offset: number
  limit: number
}

interface ManagePaginationOnRequestOptions extends ManagePaginationOptions {
  count?: number
  peek?: number
  // eslint-disable-next-line camelcase
  page_obj?: { [key: string]: unknown }
}

interface ManagePaginationPromiseResult {
  pagination: ManagePaginationOnRequestOptions
  [key: string]: unknown
}

export {
  ManagePaginationOnRequestOptions,
  ManagePaginationOptions,
  ManagePaginationPromiseResult,
}
