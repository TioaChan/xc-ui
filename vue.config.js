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
    }
}