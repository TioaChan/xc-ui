// https://github.com/PanJiaChen/vue-element-admin/blob/master/vue.config.js



'use strict'
const path = require('path')
// const defaultSettings = require('./src/settings.js')

function resolve(dir) {
    return path.join(__dirname, dir)
}

const name = 'xc-ui-pc-sysmanage' // page title

module.exports = {
    configureWebpack: {
        // provide the app's title in webpack's name field, so that
        // it can be accessed in index.html to inject the correct title.
        name: name,
        resolve: {
            extensions: ['.js', '.vue', '.json'],
            alias: {
                // 'vue$': 'vue/dist/vue.esm.js',
                '@': resolve('src'),
                'scss_vars': '@/assets/css/vars.scss'
            }
        }
    },
    devServer: {
        host: 'localhost',
        port: 11000,
        proxy: {
            '/api/cms': {
                target: 'http://localhost:31001',
                changeOrigin: true,
                pathRewrite: {
                    '^/api': ''
                }
            },
            '/ucenter': {
                // target: 'http://localhost:3000/mock/11'
                //target: 'http://127.0.0.1:31200'
                target: 'http://127.0.0.1:50201'

            },
            '/auth': {
                // target: 'http://localhost:3000/mock/11'
                //target: 'http://127.0.0.1:31200'
                target: 'http://127.0.0.1:50201/api'

            },
            '/course': {
                // target: 'http://localhost:3000/mock/11'
                //target: 'http://127.0.0.1:31200'
                target: 'http://127.0.0.1:50201/api'

            },
            '/media': { //媒资管理
                //target: 'http://127.0.0.1:31400'
                target: 'http://127.0.0.1:50201'
            },

            '/cms/!*': { //cms管理
                //target: 'http://127.0.0.1:31001'
                target: 'http://127.0.0.1:50201'

            },


            '/filesystem/!*': { //文件系统管理
                //target: 'http://127.0.0.1:22100'
                target: 'http://127.0.0.1:50201'

            },
            '/category/!*': { //分类管理
                // target: 'http://127.0.0.1:3000/mock/11'
                //target: 'http://127.0.0.1:31200'
                target: 'http://127.0.0.1:50201'

            },
            '/sys/!*': { //系统管理
                //target: 'http://127.0.0.1:31001'
                target: 'http://127.0.0.1:50201'

            }
        }
    }
}