<template>
    <div>
        <!--查询表单-->
        <!-- <el-form :model="params"> -->
        <el-select v-model="params.siteId" placeholder="请选择站点" size="small">
            <el-option v-for="item in siteList" :key="item.siteId" :label="item.siteName" :value="item.siteId">
            </el-option>
        </el-select>

        <el-button type="primary" v-on:click="query" size="small">查询</el-button>

        <router-link class="mui-tab-item" :to="{path:'/cms/page/add/',query:{
                page: this.params.page,
                siteId: this.params.siteId}}">
            <el-button type="primary" size="small">新增页面</el-button>
        </router-link>

        <!-- </el-form> -->
        <listTable v-bind:tableListData="tableListData"></listTable>
        <pagination v-bind:params="params" @changePages="handleChangePage" @changeSize="handleChangeSize"></pagination>
    </div>
</template>
<script>
    import * as cmsApi from '@/views/cms/api/cms.js'

    import listTable from "./components/table"
    import pagination from "./components/pagination"
    export default {
        components: {
            listTable,
            pagination
        },
        data() {
            return {
                params: {
                    total: 0, //总数
                    page: 1, //页码
                    size: 10, //每页显示个数
                    siteId: '' //站点id
                },
                // listLoading: false,
                tableListData: [],
                // total: 0,

                siteList: [] //站点列表
            }
        },
        methods: {
            query() {
                cmsApi.page_list(this.params.page, this.params.size, this.params).then((res) => {
                    console.log(res)
                    this.params.total = res.queryResult.total
                    this.tableListData = res.queryResult.list
                })
            },
            handleChangePage() {
                // this.params.page = page;
                this.query()
                // console.log(this.params)
            },
            handleChangeSize() {
                this.query()
            }
            // formatCreatetime(row) {
            //     var createTime = new Date(row.pageCreateTime);
            //     if (createTime) {
            //         return utilApi.formatDate(createTime, 'yyyy-MM-dd hh:mm:ss');
            //     }
            // },
            //       generateHtml (id) {
            // //        console.log(id)
            //         this.$router.push({ path: '/cms/page/html/'+id, query:{
            //           page: this.params.page,
            //           siteId: this.params.siteId}})
            //       },
            //       postPage (id) {
            //         this.$confirm('确认发布该页面吗?', '提示', {
            //         }).then(() => {
            //           this.listLoading = true;
            //           cmsApi.page_postPage(id).then((res) => {
            //             if(res.success){
            //               console.log('发布页面id='+id);
            //               this.listLoading = false;
            //               this.$message.success('发布成功，请稍后查看结果');
            //             }else{
            //               this.$message.error('发布失败');
            //             }
            //           });
            //         }).catch(() => {

            //         });
            //       },
            //       edit(pageId){
            //         this.$router.push({ path: '/cms/page/edit/'+pageId,query:{
            //           page: this.params.page,
            //           siteId: this.params.siteId}})
            //       },
            //       //删除
            //       del (index, row) {
            //         this.$confirm('确认删除该记录吗?', '提示', {
            //           type: 'warning'
            //         }).then(() => {
            //           this.listLoading = true;
            //           let pageId = row.pageId;
            //           cmsApi.page_del(pageId).then((res) => {
            //             this.listLoading = false;
            //             if(res.success){
            //               this.$message.success("删除成功")
            //               this.query();
            //             }else{
            //               this.$message.error('删除失败');
            //             }

            //           });
            //         }).catch(() => {

            //         });
            //       },

        },
        created() {
            //     //存储 请求参数
            //   /*if(this.$route.query.page){
            //    this.params.page = Number.parseInt(this.$route.query.page)
            //    }*/
            //   this.params.page = Number.parseInt(this.$route.query.page||1);
            //   this.params.siteId = this.$route.query.siteId||'';
        },
        mounted() {
            //默认查询页面
            this.query()
            //初始化站点列表
            // this.siteList = [
            // {
            //     siteId: '5a751fab6abb5044e0d19ea1',
            //     siteName: '门户主站'
            // },
            // {
            //     siteId: '102',
            //     siteName: '测试站'
            // }]
        }
    }
</script>
<style scpoe>
    .toolbar {
        margin-top: 1rem;
    }
</style>