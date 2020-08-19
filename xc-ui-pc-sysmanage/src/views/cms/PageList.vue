<template>
    <div>

        <siteSelector v-bind:siteData="siteData" @changeSite="handleFlushTableData"></siteSelector>

        <el-button type="primary" size="small" @click="activeAddForm()">新增页面</el-button>

        <!-- 数据 -->
        <listTable v-bind:tableListData="tableListData" @activeEditForm="activeEditForm($event)" @flushTableData="handleFlushTableData()"></listTable>
        <!-- 分页按钮 -->
        <pagination v-bind:params="params" @changePages="handleFlushTableData" @changeSize="handleFlushTableData"></pagination>

        <!-- 新增标签弹层 -->
        <div class="add-form">
            <el-dialog title="新增页面" :visible.sync="dialogFormVisible">
                <addForm @close="closeAddForm()"></addForm>
            </el-dialog>
        </div>
        <!-- 编辑标签弹层 -->
        <div class="edit-form">
            <el-dialog title="编辑页面" :visible.sync="dialogFormVisible4Edit">
                <!-- 编辑套餐 需要传递
                待编辑套餐的信息currentFormData
                已勾选的检查组的id的数组currentCheckgroupIds 和
                所有检查组currentTableData -->
                <editForm @close="closeEditForm()" v-bind:currentFormData="currentFormData"></editForm>
            </el-dialog>
        </div>

    </div>
</template>
<script>
    import * as cmsApi from '@/views/cms/api/cms.js'

    import siteSelector from './components/siteselector'
    import listTable from "./components/table"
    import pagination from "./components/pagination"
    import addForm from './components/add'
    import editForm from './components/edit'
    export default {
        components: {
            listTable,
            pagination,
            siteSelector,
            addForm,
            editForm
        },
        data() {
            return {

                params: { //el-pagination 需要用到的数据
                    total: 0, //总数
                    page: 1, //页码
                    size: 10, //每页显示个数
                },

                siteData: { //site selector 需要用到的数据
                    siteId: 'findAll', //站点id
                    siteList: [] //站点列表
                },

                tableListData: [], // listTable 需要用到的数据

                dialogFormVisible: false, //新增弹层 显示/隐藏
                dialogFormVisible4Edit: false, // 编辑弹层 显示/隐藏
                currentFormData: {}, //编辑弹层 表单数据	
                editPageId: 0,
            }
        },
        methods: {
            handleFlushTableData() { //查询全部页面信息
                cmsApi.page_list(this.params.page, this.params.size, { siteId: this.siteData.siteId }).then((res) => {
                    // console.log(res)
                    this.params.total = res.queryResult.total
                    this.tableListData = res.queryResult.list
                })
            },
            handleFlushSiteData() { //查询全部站点信息
                cmsApi.site_list().then(resp => {
                    // console.log()
                    this.siteData.siteList = resp.queryResult.list
                })
            },
            activeAddForm() {
                this.dialogFormVisible = true;
            },
            closeAddForm() {
                this.dialogFormVisible = false;
                this.handleFlushTableData()
            },

            activeEditForm(formData) {

                this.currentFormData = formData;
                this.dialogFormVisible4Edit = true;
            },
            closeEditForm() {
                this.currentFormData = {};
                this.dialogFormVisible4Edit = false;
                this.handleFlushTableData()
            },
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