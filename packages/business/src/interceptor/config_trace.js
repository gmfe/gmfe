import { RequestInterceptor } from 'gm-util'
import moment from 'moment'

// 要求 reqeust config headers 中含 X-Guanmai-Client X-Guanmai-Request-Id
// 要求 __DEBUG__ 存在

// dev devhost
const isTest =
  window.location.host.indexOf('dev.guanmai.cn') !== -1 ||
  window.location.host.indexOf('devhost.guanmai.cn') !== -1

const CLIENTIDKEY = '_GM_SERVICE_CLIENT_ID'
const getTimeStamp = time => moment(time).format('YYYY-MM-DD HH:mm:ss.SSS')
const enterTime = getTimeStamp()

const requestUrl = '//trace.guanmai.cn/api/logs/request/'
const requestEnvUrl = '//trace.guanmai.cn/api/logs/environment/'
let _platform = ''

function getExtension() {
  return {
    branch: window.____fe_branch,
    commit: window.____git_commit,
    group_id:
      window.g_group_id ||
      window.g_partner_id ||
      (window.g_user && window.g_user.group_id),
    station_id: window.g_user && window.g_user.station_id,
    cms: window.g_cms_config && window.g_cms_config.key,
    name:
      (window.g_user &&
        (window.g_user.name ||
          window.g_user.username ||
          window.g_user.user_name)) ||
      null,
    enterTime
  }
}

function feedEnv(data) {
  data.extension = {
    ...data.extension,
    ...getExtension(),
    origin: window.location.href,
    devicePixelRatio: window.devicePixelRatio
  }

  // 异步，不阻塞
  setTimeout(() => {
    window.fetch(requestEnvUrl + _platform, {
      method: 'post',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      },
      mode: 'cors'
    })
  }, 100)
}

function feed(data) {
  data = {
    ...data,
    extension: {
      ...data.extension,
      ...getExtension(),
      origin: window.location.href
    }
  }

  setTimeout(() => {
    window.fetch(requestUrl + _platform, {
      method: 'post',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      },
      mode: 'cors'
    })
  }, 100)
}

function doRequestInterceptor(requestLogUrls) {
  const timeMap = {}
  RequestInterceptor.add({
    request(config) {
      const uuid = config.options.headers['X-Guanmai-Request-Id']
      timeMap[uuid] = Date.now()
      // 配置了请求也上报
      if (requestLogUrls.some(url => config.url.indexOf(url) !== -1)) {
        feed({
          requestTime: getTimeStamp(timeMap[uuid]),
          url: config.url,
          req: {
            data: config.data
          },
          extension: {
            client: config.options.headers['X-Guanmai-Client'],
            requestId: uuid
          }
        })
      }
      return config
    },
    response(json, config) {
      const isSuccess = config.sucCode.indexOf(json.code) > -1
      const uuid = config.options.headers['X-Guanmai-Request-Id']
      const time = Date.now()
      feed({
        url: config.url,
        req: {
          data: config.data
        },
        res: {
          code: json.code,
          msg: json.msg
        },
        isSuccess,
        responseTime: getTimeStamp(time),
        duration: time - timeMap[uuid],
        extension: {
          client: config.options.headers['X-Guanmai-Client'],
          requestId: uuid
        }
      })

      return json
    },
    responseError(reason, config) {
      const uuid = config.options.headers['X-Guanmai-Request-Id']

      feed({
        url: config.url,
        req: {
          data: config.data
        },
        res: {
          code: null,
          msg: reason + ''
        },
        isSuccess: false,
        time: Date.now() - timeMap[uuid],
        extension: {
          client: config.options.headers['X-Guanmai-Client'],
          requestId: uuid
        }
      })
    }
  })
}

// 请求统计需要
function configTrace(platform, requestLogUrls = []) {
  // eslint-disable-next-line
  if (__DEBUG__ || isTest) {
    return
  }

  _platform = platform

  // 记录一次环境
  feedEnv({
    clientId: window.localStorage && window.localStorage.getItem(CLIENTIDKEY),
    cookie: window.document.cookie,
    userAgent: window.navigator.userAgent
  })

  doRequestInterceptor(requestLogUrls)
}

export default configTrace
