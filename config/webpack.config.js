module.exports = function(config) {
  console.log(config, 'sss')
  //   config.externals = Object.assign({}, config.externals, {
  //     'gm-pdfmake': 'pdfMake',
  //     'gm-pdfmake-font-bold-0': 'bold_0',
  //     'gm-pdfmake-font-bold-1': 'bold_1',
  //     'gm-pdfmake-font-regular-0': 'regular_0',
  //     'gm-pdfmake-font-regular-1': 'regular_1',
  //     xlsx: 'XLSX',
  //     echarts: 'echarts',
  //     // 'react-beautiful-dnd': 'ReactBeautifulDnd',
  //     'gm-i18n': 'gmI18n'
  //   })
  const rules = config.module.rules
  const res = rules[0].oneOf.map(_item => {
    if (`${_item.test}`.includes('.svg') && process.platform === 'win32') {
      return {
        test: /\\svg\\(\w|\W)+\.svg$/,
        use: [
          {
            loader: '@svgr/webpack',
            options: {
              icon: true,
              expandProps: 'start',
              svgProps: {
                fill: 'currentColor',
                // className 冗余
                className:
                  "{'gm-svg-icon t-svg-icon m-svg-icon ' + (props.className || '')}"
              }
            }
          }
        ]
      }
    }
    return {
      ..._item
    }
  })
  config.module.rules[0].oneOf = res
  //   config.devServer = Object.assign({}, config.devServer, {
  //     open: true,
  //     host: '0.0.0.0'
  //   })

  return config
}
