<template>
    <div>
        <!--查询表单-->
        <!-- <el-form :model="params"> -->

        <siteSelector v-bind:siteData="siteData" @changeSite="handlerSiteChange"></siteSelector>

        <el-button type="primary" v-on:click="handleFlushTableData" size="small">查询</el-button>

        <router-link class="mui-tab-item" :to="{path:'/cms/page/add/',handleFlushTableData:{
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

    import siteSelector from './components/siteselector'
    import listTable from "./components/table"
    import pagination from "./components/pagination"
    export default {
        components: {
            listTable,
            pagination,
            siteSelector
        },
        data() {
            return {
                params: {
                    total: 0, //总数
                    page: 1, //页码
                    size: 10, //每页显示个数

                },
                // listLoading: false,
                tableListData: [],
                // total: 0,
                siteData: {
                    siteId: '', //站点id
                    siteList: [] //站点列表
                }
            }
        },
        methods: {
            handleFlushTableData() {
                console.log("handleFlushTableData")
                cmsApi.page_list(this.params.page, this.params.size, this.params).then((res) => {
                    console.log(res)
                    this.params.total = res.queryResult.total
                    this.tableListData = res.queryResult.list
                })
            },
            handleFlushSiteData() {
                cmsApi.site_list().then(resp => {
                    // console.log()
                    this.siteData.siteList = resp.queryResult.list
                })
            },
            handleChangePage() {
                // console.log("handleChangePage")
                this.handleFlushTableData()
            },
            handleChangeSize() {
                // console.log("handleChangeSize")
                this.handleFlushTableData()
            },
            handlerSiteChange() {
                cmsApi.page_list_withParams(this.params.page, this.params.size, { siteId: this.siteData.siteId }).then((res) => {
                    console.log(res)
                    this.params.total = res.queryResult.total
                    this.tableListData = res.queryResult.list
                })
            }
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
            this.handleFlushTableData()
            this.handleFlushSiteData()
        }
    }
</script>
<style scpoe>
    .toolbar {
        margin-top: 1rem;
    }
</style>