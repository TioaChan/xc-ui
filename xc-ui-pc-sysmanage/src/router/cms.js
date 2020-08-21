import Home from '@/components/menu.vue';
import page_list from '@/views/cms_page/index.vue';
import site_list from '@/views/cms_site/index.vue';
import template_list from '@/views/cms_template/index.vue';
// import page_html from '@/module/cms/page/page_html.vue';
export default [{
        path: '/cms',
        component: Home,
        name: 'CMS',
        hidden: false,
        children: [
            { path: '/cms/page/list', name: '页面管理', component: page_list, hidden: false },
            { path: '/cms/site/list', name: '站点管理', component: site_list, hidden: false },
            { path: '/cms/template/list/', name: '模板管理', component: template_list, hidden: false },
            // { path: '/cms/page/html/:pageId', name: '生成html', component: page_html, hidden: true }
        ]
        // ,
        // redirect: '/home',
        // children: [
        //   {path: 'home', component: Home}
        // ]
    }
    /*,
      {
        path: '/login',
        component: Login,
        name: 'Login',
        hidden: true
      }*/
]