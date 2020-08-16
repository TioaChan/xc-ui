<template>
    <el-select v-model="params.siteId" placeholder="请选择站点" size="small" @change="handlerSiteChange">
        <el-option key="findAll" label="All" value="findAll"></el-option>
        <el-option v-for="item in params.siteList" :key="item.siteId" :label="item.siteName" :value="item.siteId">
        </el-option>
    </el-select>
</template>

<script>
    export default {
        data() {
            return {
                params: {
                    siteList: [], //站点列表
                    siteId: '',
                },
            }
        },
        props: ["siteData"],
        mounted() {
            this.params = this.siteData;
        },
        watch: {
            siteData: {
                deep: true,
                handler() {
                    this.params = this.siteData;
                    // console.log(nv + "==" + ov);
                }
            },
        },
        methods: {
            handlerSiteChange(siteId) {
                console.log(siteId)
                this.params.siteId = siteId
                //changeSite
                return this.$emit("changeSite");
            }
        }
    }
</script>

<style>

</style>