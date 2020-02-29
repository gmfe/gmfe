const webpackFinal = config => {
  config.module.rules[0].include.push(/gm-/)
  config.module.rules[0].exclude = function(filepath) {
    if (filepath.includes('/node_modules/gm-util/')) {
      return false
    }

    return filepath.includes('/node_modules/')
  }

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
    test: /\.svg$/,
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

  return config
}

module.exports = {
  addons: ['@storybook/addon-storysource/register'],
  stories: ['../packages/**/*.stories.js', '../demo/**/*.stories.js'],
  webpackFinal
}
