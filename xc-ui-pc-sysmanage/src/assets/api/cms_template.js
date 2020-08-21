import http from '@/assets/api/public'
// import querystring from 'querystring'
let sysConfig = require('@/../config/sysConfig')
let apiUrl = sysConfig.xcApiUrlPre;

/*模板列表*/
export const template_list = () => {
    return http.requestQuickGet(apiUrl + '/cms/template/list/')
}