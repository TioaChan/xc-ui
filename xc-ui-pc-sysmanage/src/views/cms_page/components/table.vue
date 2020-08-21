<template>
    <div>
        <!--列表-->
        <el-table :data="list" highlight-current-row v-loading="listLoading" :span="24" size="small">
            <el-table-column type="index" label="#">
            </el-table-column>
            <el-table-column prop="pageName" label="页面名称">
            </el-table-column>
            <el-table-column prop="pageAliase" label="别名" width="120">
            </el-table-column>
            <el-table-column prop="pageType" label="类型（静态、动态）" width="130">
            </el-table-column>
            <el-table-column prop="pageWebPath" label="访问路径">
            </el-table-column>
            <el-table-column prop="pagePhysicalPath" label="物理路径">
            </el-table-column>
            <el-table-column prop="pageCreateTime" label="创建时间" :formatter="formatCreatetime" width="145">
            </el-table-column>
            <el-table-column label="编辑" width="80">
                <template slot-scope="scope">
                    <el-button size="mini" type="primary" @click="edit(scope.row)">编辑
                    </el-button>
                </template>
            </el-table-column>
            <el-table-column label="删除" width="80">
                <template slot-scope="scope">
                    <el-button size="mini" type="danger" @click="del(scope.row)">删除
                    </el-button>
                </template>
            </el-table-column>
            <el-table-column label="静态化" width="90">
                <template slot-scope="scope">
                    <el-button size="mini" type="primary" plain @click="generateHtml(scope.row)">静态化
                    </el-button>
                </template>
            </el-table-column>
            <el-table-column label="发布" width="80">
                <template slot-scope="scope">
                    <el-button size="mini" type="primary" plain @click="postPage(scope.row)">发布
                    </el-button>
                </template>
            </el-table-column>
        </el-table>

    </div>
</template>

<script>
    import * as cmsApi from '@/assets/api/cms.js'
    import utilApi from '@/common/utils';
    export default {
        data() {
            return {
                // params: {
                //     page: 1, //页码
                //     size: 10, //每页显示个数
                //     siteId: '' //站点id
                // },
                listLoading: false,
                list: [],
                // total: 0,
            }
        },
        props: ["tableListData"],
        methods: {
            formatCreatetime(row) {
                var createTime = new Date(row.pageCreateTime);
                if (createTime) {
                    return utilApi.formatDate(createTime, 'yyyy-MM-dd hh:mm:ss');
                }
            },
            edit(row) {
                // console.log(row)
                return this.$emit("activeEditForm", row);
                // this.$router.push({
                //     path: '/cms/page/edit/' + pageId,
                //     query: {
                //         page: this.params.page,
                //         siteId: this.params.siteId
                //     }
                // })
            },
            //删除
            del(row) {
                this.$confirm('确认删除该记录吗?', '提示', {
                    type: 'warning'
                }).then(() => {
                    // console.log(row)
                    this.listLoading = true;
                    cmsApi.page_del(row.pageId).then((res) => {
                        if (res.success) {
                            this.$message.success("删除成功")
                        } else {
                            this.$message.error('删除失败');
                        }
                    });
                }).finally(() => {
                    this.listLoading = false;
                    return this.$emit("flushTableData");
                });
            },
            generateHtml(row) {
                console.log(row)
                // this.$router.push({
                //     path: '/cms/page/html/' + id,
                //     query: {
                //         page: this.params.page,
                //         siteId: this.params.siteId
                //     }
                // })
            },
            postPage(row) {
                this.$confirm('确认发布该页面吗?', '提示', {}).then(() => {
                    console.log(row)
                    // this.listLoading = true;
                    // cmsApi.page_postPage(id).then((res) => {
                    //     if (res.success) {
                    //         console.log('发布页面id=' + id);
                    //         this.listLoading = false;
                    //         this.$message.success('发布成功，请稍后查看结果');
                    //     } else {
                    //         this.$message.error('发布失败');
                    //     }
                    // });
                }).catch(() => {

                });
            },
        },
        mounted() {
            this.list = this.tableListData; //来自父组件的数据 赋给 子组件
        },
        // 来自父组件的数据无法同步到子组件（第二次触发子组件以后）
        // Vue父子组件通过prop异步传输数据踩坑：https://juejin.im/post/5b3cd8355188251b105ad14b
        watch: {
            tableListData: {
                deep: true,
                handler() {
                    this.list = this.tableListData;
                    // console.log(nv + "==" + ov);
                }
            },
        },
    }
</script>

<style>

</style>