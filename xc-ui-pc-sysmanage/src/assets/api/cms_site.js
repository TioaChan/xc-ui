import http from '@/assets/api/public'
// import querystring from 'querystring'
let sysConfig = require('@/../config/sysConfig')
let apiUrl = sysConfig.xcApiUrlPre;

/*站点列表*/
export const site_list = () => {
    return http.requestQuickGet(apiUrl + '/cms/site/list/')
}