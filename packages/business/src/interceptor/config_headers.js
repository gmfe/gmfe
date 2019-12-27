import { UUID, RequestInterceptor } from 'gm-util'

const configHeaders = (name, version) => {
  const CLIENT_ID = '_CLIENT_ID'
  const { localStorage } = window

  let clientId = localStorage.getItem(CLIENT_ID) || ''
  if (!clientId) {
    clientId = UUID.generate()
    localStorage.setItem(CLIENT_ID, clientId)
  }

  RequestInterceptor.add({
    request(config) {
      config.options.headers = config.options.headers || {}

      config.options.headers[
        'X-Guanmai-Client'
      ] = `${name}/${version} ${clientId}`
      config.options.headers['X-Guanmai-Request-Id'] = UUID.generate()

      return config
    }
  })
}

export default configHeaders
