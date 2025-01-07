const webpackFinal = config => {
  config.module.rules[0].include.push(/gm-/)
  config.module.rules[0].exclude = function(filepath) {
    return filepath.includes('/node_modules/')
  }

  config.module.rules[3] = {
    test: /\.(ico|jpg|jpeg|png|gif|eot|otf|webp|ttf|woff|woff2|cur|ani|pdf)(\?.*)?$/,
    loader:
      './node_modules/@storybook/core/node_modules/file-loader/dist/cjs.js',
    query: { name: 'static/media/[name].[hash:8].[ext]' }
  }

  config.module.rules.push({
    test: /(glyphicons-halflings-regular|iconfont)\.(woff|woff2|ttf|eot|svg)($|\?)/,
    use: [
      {
        loader: 'url-loader',
        options: {
          limit: 1024,
          name: 'static/media/font/[name].[hash:8].[ext]'
        }
      }
    ]
  })

  config.module.rules.push({
    test: /\.less$/,
    use: [
      {
        loader: 'style-loader'
      },
      {
        loader: 'css-loader'
      },
      {
        loader: 'less-loader'
      }
    ]
  })

  config.module.rules.push({
    test: /\.stories\.jsx?$/,
    loaders: [require.resolve('@storybook/source-loader')],
    enforce: 'pre'
  })

  config.module.rules.unshift({
    test: /svg\/(\w|\W)+\.svg$/,
    use: [
      {
        loader: '@svgr/webpack',
        options: {
          icon: true,
          expandProps: 'start',
          svgProps: {
            fill: 'currentColor',
            className: "{'gm-svg-icon ' + (props.className || '')}"
          }
        }
      }
    ]
  })
  if (process.platform === 'win32') {
    config.module.rules.unshift({
      test: /\\svg\\(\w|\W)+\.svg$/,
      use: [
        {
          loader: '@svgr/webpack',
          options: {
            icon: true,
            expandProps: 'start',
            svgProps: {
              fill: 'currentColor',
              className: "{'gm-svg-icon ' + (props.className || '')}"
            }
          }
        }
      ]
    })
  }

  return config
}

module.exports = {
  addons: ['@storybook/addon-storysource/register'],
  // 写清晰一点，否则容易碰到 node_modules 里的 stories
  stories: [
    '../packages/business/src/**/*stories.js',
    '../packages/cropper/src/**/*stories.js',
    '../packages/frame/src/**/*stories.js',
    '../packages/keyboard/src/**/*stories.js',
    '../packages/locales/src/**/*stories.js',
    '../packages/qiniu-image/src/**/*stories.js',
    '../packages/react/src/**/*stories.js',
    '../packages/react-deprecated/src/**/*stories.js',
    '../packages/sortable/src/**/*stories.js',
    '../packages/table/src/**/*stories.js',
    '../packages/table-x/src/**/*stories.js',
    '../packages/tour/src/**/*stories.js',
    '../demo/**/*stories.js'
  ],
  webpackFinal
}
