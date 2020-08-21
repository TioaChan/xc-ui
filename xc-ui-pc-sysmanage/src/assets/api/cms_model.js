import http from '@/assets/api/public'
// import querystring from 'querystring'
let sysConfig = require('@/../config/sysConfig')
let apiUrl = sysConfig.xcApiUrlPre;

/*页面列表*/
export const model_list = () => {
    return http.requestQuickGet(apiUrl + '/cms/config/list/')
}