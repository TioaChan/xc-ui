import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

let routes = []

let concat = (router) => {
    routes = routes.concat(router)
}

import CourseRouter from '@/router/course.js'
import ExamRouter from '@/router/exam.js'
import HomeRouter from '@/router/home.js'
import MediaRouter from '@/router/media.js'
import QuestionRouter from '@/router/question.js'
// 合并路由规则
concat(CourseRouter)
concat(ExamRouter)
concat(HomeRouter)
concat(MediaRouter)
concat(QuestionRouter)

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router