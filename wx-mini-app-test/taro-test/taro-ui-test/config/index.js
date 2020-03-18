const path = require('path')

const config = {
    projectName: 'taro-ui-test',
    date: '2020-3-4',
    designWidth: 750,
    deviceRatio: {
        '640': 2.34 / 2,
        '750': 1,
        '828': 1.81 / 2
    },
    sourceRoot: 'src',
    outputRoot: 'dist',
    babel: {
        sourceMap: true,
        presets: [
            ['env', {
                modules: false
            }]
        ],
        plugins: [
            'transform-decorators-legacy',
            'transform-class-properties',
            'transform-object-rest-spread'
        ]
    },
    plugins: [],
    defineConstants: {
    },
    copy: {
        patterns: [
            { from: 'src/wemark', to: 'dist/wemark' },
            { // 忽略 echarts.js
                from: 'node_modules/taro-echarts/components/ec-canvas/',
                to: 'dist/npm/taro-echarts/components/ec-canvas',
                ignore: ['ec-canvas.js', 'wx-canvas.js', 'echarts.js']
            },
            { // 添加新的 copy 规则；但貌似没用，可手动替换
                from: 'src/static/',
                to: 'dist/npm/taro-echarts/components/ec-canvas',
            }
        ],
        options: {}
    },
    mini: {
        compile: {
            exclude: [
                path.resolve(__dirname, '..', 'src/wemark/remarkable.js')
            ]
        },
        postcss: {
            pxtransform: {
                enable: true,
                config: {}
            },
            url: {
                enable: true,
                config: {
                    limit: 10240 // 设定转换尺寸上限
                }
            },
            cssModules: {
                enable: false, // 默认为 false，如需使用 css modules 功能，则设为 true
                config: {
                    namingPattern: 'module', // 转换模式，取值为 global/module
                    generateScopedName: '[name]__[local]___[hash:base64:5]'
                }
            }
        }
    },
    h5: {
        esnextModules: ['taro-echarts'],
        publicPath: '/',
        staticDirectory: 'static',
        postcss: {
            autoprefixer: {
                enable: true,
                config: {
                    browsers: [
                        'last 3 versions',
                        'Android >= 4.1',
                        'ios >= 8'
                    ]
                }
            },
            cssModules: {
                enable: false, // 默认为 false，如需使用 css modules 功能，则设为 true
                config: {
                    namingPattern: 'module', // 转换模式，取值为 global/module
                    generateScopedName: '[name]__[local]___[hash:base64:5]'
                }
            }
        }
    }
}

module.exports = function (merge) {
    if (process.env.NODE_ENV === 'development') {
        return merge({}, config, require('./dev'))
    }
    return merge({}, config, require('./prod'))
}
