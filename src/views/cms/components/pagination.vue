<template>
    <!--分页-->
    <el-col :span="24" class="toolbar">
        <el-pagination background layout="total,sizes,prev, pager, next" @current-change="handleChangePage" @size-change="handleSizeChange" :page-sizes="this.pageSizes" :page-size="this.params.size" :total="this.params.total" :current-page="this.params.page" style="float:right;">
        </el-pagination>
    </el-col>
</template>

<script>
    export default {
        data() {
            return {
                paginationData: {
                    total: 0,
                    page: 1, //页码
                    size: 10, //每页显示个数
                    siteId: '' //站点id
                },
                pageSizes: [10, 20, 30, 40], //每页可选显示个数
            }
        },
        props: ["params"],
        methods: {
            handleChangePage(page) {
                console.log(page);
                this.params.page = page;
                return this.$emit("changePages");
            },
            handleSizeChange(size) {
                this.params.size = size;
                return this.$emit("changeSize");
            }
        },
        mounted() {
            this.paginationData = this.params; //来自父组件的数据 赋给 子组件
        },
        // 来自父组件的数据无法同步到子组件（第二次触发子组件以后）
        // Vue父子组件通过prop异步传输数据踩坑：https://juejin.im/post/5b3cd8355188251b105ad14b
        watch: {
            params: {
                deep: true,
                handler() {
                    this.paginationData = this.params;
                    // console.log(nv + "==" + ov);
                }
            },
        },
    }
</script>

<style>

</style>