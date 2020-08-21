import list from '@/views/question/page/list.vue';
import add from '@/views/question/page/add.vue';
import Home from '@/components/menu.vue';
export default [
{
    path: '/question',
    component: Home,
    name: '题库管理',
    hidden: false,
    iconCls: 'el-icon-tickets',
    children: [
        { path: '/question/list', name: '题目查询', component: list, hidden: false },
        { path: '/question/add', name: '添加题目', component: add, hidden: false }
    ]
}]