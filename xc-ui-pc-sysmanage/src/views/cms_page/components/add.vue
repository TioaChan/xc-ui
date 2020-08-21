<template>
    <div>
        <el-form :model="pageForm" label-width="80px" :rules="pageFormRules" ref="addForm">
            <el-form-item label="所属站点" prop="siteId">
                <el-select v-model="pageForm.siteId" placeholder="请选择站点">
                    <el-option v-for="item in siteList" :key="item.siteId" :label="item.siteName" :value="item.siteId">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="选择模版" prop="templateId">
                <el-select v-model="pageForm.templateId" placeholder="请选择">
                    <el-option v-for="item in templateList" :key="item.templateId" :label="item.templateName" :value="item.templateId">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="页面名称" prop="pageName">
                <el-input v-model="pageForm.pageName" auto-complete="off"></el-input>
            </el-form-item>

            <el-form-item label="别名" prop="pageAliase">
                <el-input v-model="pageForm.pageAliase" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="访问路径" prop="pageWebPath">
                <el-input v-model="pageForm.pageWebPath" auto-complete="off"></el-input>
            </el-form-item>

            <el-form-item label="物理路径" prop="pagePhysicalPath">
                <el-input v-model="pageForm.pagePhysicalPath" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="数据Url" prop="dataUrl">
                <el-input v-model="pageForm.dataUrl" auto-complete="off"></el-input>
            </el-form-item>

            <el-form-item label="类型">
                <el-radio-group v-model="pageForm.pageType">
                    <el-radio class="radio" label="0">静态</el-radio>
                    <el-radio class="radio" label="1">动态</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="创建时间">
                <el-date-picker type="datetime" placeholder="创建时间" v-model="pageForm.pageCreateTime"></el-date-picker>
            </el-form-item>

        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="handlerCloesForm">返回</el-button>
            <el-button type="primary" @click.native="handlerSubmitForm" :loading="addLoading">提交</el-button>
        </div>
    </div>
</template>

<script>
    import * as cms_pageApi from '@/assets/api/cms_page.js'
    import * as cms_siteApi from '@/assets/api/cms_site.js'
    import * as cms_templateApi from '@/assets/api/cms_template.js'
    export default {
        data() {
            return {
                siteList: [], //站点列表
                templateList: [], //模版列表
                addLoading: false, //加载效果标记

                pageForm: { //新增表单数据
                    siteId: '',
                    templateId: '',
                    pageName: '',
                    pageAliase: '',
                    pageWebPath: '',
                    dataUrl: '',
                    pageParameter: '',
                    pagePhysicalPath: '',
                    pageType: '',
                    pageCreateTime: new Date()
                },
                pageFormRules: { //表单校验规则
                    siteId: [
                        { required: true, message: '请选择站点', trigger: 'blur' }
                    ],
                    templateId: [
                        { required: true, message: '请选择模版', trigger: 'blur' }
                    ],
                    pageName: [
                        { required: true, message: '请输入页面名称', trigger: 'blur' }
                    ],
                    pageWebPath: [
                        { required: true, message: '请输入访问路径', trigger: 'blur' }
                    ],
                    pagePhysicalPath: [
                        { required: true, message: '请输入物理路径', trigger: 'blur' }
                    ]
                },

            }
        },
        methods: {
            handlerCloesForm() {
                this.$refs['addForm'].resetFields();
                return this.$emit("close");
            },
            handlerSubmitForm() {
                this.$refs['addForm'].validate((valid) => {
                    if (valid) {
                        this.$confirm('确认提交吗？', '提示', {}).then(() => {
                            // console.log(this.pageForm)
                            this.addLoading = true;
                            cms_pageApi.page_add(this.pageForm).then((resp) => {
                                // console.log(resp);
                                if (resp.success) {
                                    // this.addLoading = false;
                                    //NProgress.done();
                                    this.$message({
                                        message: '提交成功',
                                        type: 'success'
                                    });
                                    // this.$refs['pageForm'].resetFields();

                                } else if (resp.message) {
                                    // this.addLoading = false;
                                    this.$message.error(resp.message);
                                } else {
                                    // this.addLoading = false;
                                    this.$message.error('提交失败');
                                }
                            }).finally(() => {
                                this.addLoading = false;
                                this.handlerCloesForm();
                            });
                        });
                    }
                });
            }
        },
        created() {
            cms_siteApi.site_list().then(resp => {
                this.siteList = resp.queryResult.list
            })
            cms_templateApi.template_list().then(resp => {
                this.templateList = resp.queryResult.list
            })
        }
    }
</script>

<style>

</style>