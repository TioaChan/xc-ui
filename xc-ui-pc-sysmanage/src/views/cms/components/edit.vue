<template>
    <div>
        <el-form :model="pageForm" label-width="80px" :rules="pageFormRules" ref="editForm">
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
            <el-button type="primary" @click.native="handlerUpdateForm" :loading="addLoading">保存</el-button>
        </div>
    </div>
</template>

<script>
    import * as cmsApi from '@/views/cms/api/cms.js'
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
        props: ["currentFormData"],
        watch: {
            currentFormData: {
                deep: true,
                handler() {
                    this.pageForm = this.currentFormData;
                    // console.log(nv + "==" + ov);
                }
            },
        },
        methods: {
            handlerCloesForm() {
                this.$refs['editForm'].resetFields();
                return this.$emit("close");
            },
            handlerUpdateForm() {
                this.$refs['editForm'].validate((valid) => {
                    if (valid) {
                        this.$confirm('确认提交吗？', '提示', {}).then(() => {
                            this.addLoading = true;
                            cmsApi.page_edit(this.pageForm).then((resp) => {
                                if (resp.success) {
                                    this.$message({
                                        message: '保存成功',
                                        type: 'success'
                                    });
                                } else if (resp.message) {
                                    this.$message.error(resp.message);
                                } else {
                                    this.$message.error('保存失败');
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
            cmsApi.site_list().then(resp => {
                this.siteList = resp.queryResult.list
            })
            cmsApi.template_list().then(resp => {
                this.templateList = resp.queryResult.list
            })
            this.pageForm = this.currentFormData;
        }
    }
</script>

<style>

</style>