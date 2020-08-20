const path = require('path')
const WebpackBar = require('webpackbar')
const _ = require('lodash')

const webpackFinal = (config) => {
  config.resolve.extensions = ['.tsx', '.ts', '.js', '.json']

  _.each(config.module.rules, (rule) => {
    if (rule.use && rule.use[0] && rule.use[0].loader) {
      if (rule.use[0].loader.includes('babel-loader')) {
        rule.include.push(/gm-/)
        rule.exclude = function (filepath) {
          return filepath.includes('/node_modules/')
        }
      }
    }

    if (rule.loader && rule.loader.includes('file-loader')) {
      rule.test = /\.(ico|jpg|jpeg|png|gif|eot|otf|webp|ttf|woff|woff2|cur|ani|pdf)(\?.*)?$/
    }
  })

  config.module.rules.push({
    test: /(glyphicons-halflings-regular|iconfont)\.(woff|woff2|ttf|eot|svg)($|\?)/,
    use: [
      {
        loader: 'url-loader',
        options: {
          limit: 1024,
          name: 'static/media/font/[name].[hash:8].[ext]',
        },
      },
    ],
  })

  config.module.rules.push({
    test: /\.less$/,
    use: [
      {
        loader: 'style-loader',
      },
      {
        loader: 'css-loader',
      },
      {
        loader: 'less-loader',
      },
    ],
  })

  config.module.rules.push({
    test: /stories\.tsx?$/,
    loaders: [
      {
        loader: require.resolve('@storybook/source-loader'),
        options: { parser: 'typescript' },
      },
    ],
    enforce: 'pre',
  })

  config.module.rules.push({
    test: /\.tsx?$/,
    use: [
      {
        loader: 'babel-loader',
        options: { cacheDirectory: true },
      },
      'thread-loader',
      {
        loader: 'react-docgen-typescript-loader',
        options: {
          tsconfigPath: path.resolve(__dirname, '../tsconfig.json'),
        },
      },
    ],
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
            className: "{'gm-svg-icon ' + (props.className || '')}",
          },
        },
      },
    ],
  })

  config.plugins.push(new WebpackBar())

  return config
}

module.exports = {
  addons: [
    '@storybook/addon-storysource',
    {
      name: '@storybook/preset-typescript',
      options: {
        tsLoaderOptions: {
          transpileOnly: true,
          happyPackMode: true,
          configFile: path.resolve(__dirname, '../tsconfig.json'),
        },
        forkTsCheckerWebpackPluginOptions: {
          checkSyntacticErrors: true,
          tsconfig: path.resolve(__dirname, '../tsconfig.json'),
          reportFiles: [
            'packages/business/src/**/*.{ts,tsx}',
            'packages/cropper/src/**/*.{ts,tsx}',
            'packages/keyboard/src/**/*.{ts,tsx}',
            'packages/react/src/**/*.{ts,tsx}',
            'packages/sortable/src/**/*.{ts,tsx}',
            'packages/table-x/src/**/*.{ts,tsx}',
            'packages/tour/src/**/*.{ts,tsx}',
          ],
        },
      },
    },
  ],
  // 写清晰一点，否则容易碰到 node_modules 里的 stories
  stories: [
    '../packages/business/src/**/*stories.tsx',
    '../packages/cropper/src/**/*stories.tsx',
    '../packages/frame/src/**/*stories.tsx',
    '../packages/keyboard/src/**/*stories.tsx',
    '../packages/locales/src/**/*stories.js',
    '../packages/qiniu-image/src/**/*stories.js',
    '../packages/react/src/**/*stories.tsx',
    '../packages/react-deprecated/src/**/*stories.js',
    '../packages/sortable/src/**/*stories.tsx',
    '../packages/table/src/**/*stories.js',
    '../packages/table-x/src/**/*stories.tsx',
    '../packages/tour/src/**/*stories.tsx',
    '../demo/**/*stories.js',
  ],
  webpackFinal,
}
