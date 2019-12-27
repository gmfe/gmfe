import { RequestInterceptor } from 'gm-util'
import { NProgress } from '@gmfe/react'

function configProgress() {
  RequestInterceptor.add({
    request() {
      NProgress.start()
    },
    response() {
      NProgress.done()
    },
    responseError() {
      NProgress.done()
    }
  })
}

export default configProgress
