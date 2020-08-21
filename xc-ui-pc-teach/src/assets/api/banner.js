import http from '@/assets/api/public'
// 查询广告图片
export const getBannerPic = () => {
    return http.fetchQuickSearch('/banner')
}