// https://github.com/PanJiaChen/vue-element-admin/blob/master/vue.config.js



'use strict'
const path = require('path')
// const defaultSettings = require('./src/settings.js')

function resolve(dir) {
    return path.join(__dirname, dir)
}

const name = 'xc-ui-pc-teach' // page title

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
        port: 12000,
        proxy: {
            // '/banner': {
            //     target: 'http://127.0.0.1:7777'
            // },
            // '/api/ucenter': {
            //     target: 'http://127.0.0.1:31200',
            //     pathRewrite: {
            //         '^/api': ''
            //     }
            // },
            // '/api/auth': {
            //     target: 'http://127.0.0.1:31200/auth',
            //     pathRewrite: {
            //         '^/api': ''
            //     }
            // },
            '/api/course': {
                target: 'http://127.0.0.1:31200',
                pathRewrite: {
                    '^/api': ''
                }
            },
            // '/api/media': { //媒资管理
            //     target: 'http://127.0.0.1:31400',
            //     pathRewrite: {
            //         '^/api': ''
            //     }
            // },

            '/api/cms': { //cms管理
                target: 'http://127.0.0.1:31001',
                pathRewrite: {
                    '^/api': ''
                }
            },

            // '/api/filesystem': { //文件系统管理
            //     target: 'http://127.0.0.1:22100',
            //     pathRewrite: {
            //         '^/api': ''
            //     }
            // },
            '/api/category': { //分类管理
                target: 'http://127.0.0.1:31200',
                pathRewrite: {
                    '^/api': ''
                }
            },
            '/api/sys': { //系统管理
                target: 'http://127.0.0.1:31001',
                pathRewrite: {
                    '^/api': ''
                }
            }
        }
    }
}