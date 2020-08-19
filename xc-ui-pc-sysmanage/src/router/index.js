import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

let routes = []

let concat = (router) => {
    routes = routes.concat(router)
}

import HomeRouter from '@/router/home.js'
import CmsRouter from '@/router/cms.js'
// 合并路由规则
concat(HomeRouter)
concat(CmsRouter)

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router