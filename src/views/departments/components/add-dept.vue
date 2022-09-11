<template>
  <!-- 新增部门的弹层 -->
  <el-dialog :title="showTitle" :visible="showDialog" @close="cancelAdd">
    <!-- 表单组件 匿名插槽  -->
    <el-form ref="deptForm" :model="formData" :rules="rules" label-width="120px">
      <el-form-item prop="name" label="部门名称">
        <el-input v-model="formData.name" style="width:80%" placeholder="1-50个字符" />
      </el-form-item>
      <el-form-item prop="code" label="部门编码">
        <el-input v-model="formData.code" style="width:80%" placeholder="1-50个字符" />
      </el-form-item>
      <el-form-item prop="manager" label="部门负责人">
        <el-select v-model="formData.manager" style="width:80%" placeholder="请选择" @focus="getEmployeeSimple">
          <el-option v-for="item in peoples" :key="item.id" :label="item.username" :value="item.username" />
        </el-select>
      </el-form-item>
      <el-form-item prop="introduce" label="部门介绍">
        <el-input v-model="formData.introduce" style="width:80%" placeholder="1-300个字符" type="textarea" :rows="3" />
      </el-form-item>
    </el-form>
    <!-- el-dialog有专门放置底部操作栏的具名插槽-->
    <el-row slot="footer" type="flex" justify="center">
      <el-col :span="6">
        <el-button type="primary" size="small" @click="btnOk">确定</el-button>
        <el-button size="small" @click="cancelAdd">取消</el-button>
      </el-col>
    </el-row>
  </el-dialog>
</template>

<script>
import { addDepartments, getDepartments, getDepartDetail } from '@/api/departments'
import { getEmployeeSimple } from '@/api/employees'

export default {
  name: 'AddDept',
  props: {
    showDialog: {
      type: Boolean,
      default: false
    },
    // 当前操作的节点
    treeNode: {
      type: Object,
      default: null
    }
  },
  data() {
    // 检查部门名称是否重复
    const checkNameRepeat = async(rule, value, callback) => {
      // value是部门名称，要和同级下的部门去比较有无相同的
      const { depts } = await getDepartments()
      const isRepeat = depts.filter(item => item.pid === this.treeNode.id).some(item => item.name === value)
      isRepeat ? callback(new Error('同级部门下该名称已存在')) : callback()
    }
    // 检查部门编码是否重复
    const checkCodeRepeat = async(rule, value, callback) => {
      // value是部门编码，要检查组织架构中有无重复
      const { depts } = await getDepartments()
      const isRepeat = depts.some(item => item.code === value && value)
      isRepeat ? callback(new Error('该编码已存在')) : callback()
    }
    return {
      // 定义表单数据
      formData: {
        name: '',
        code: '',
        manager: '',
        introduce: ''
      },
      // 定义校验规则
      rules: {
        name: [{ required: true, message: '部门名称不能为空', trigger: 'blur' },
          { min: 1, max: 50, message: '部门名称要求1-50个字符', trigger: 'blur' },
          { trigger: 'blur', validator: checkNameRepeat }],
        code: [{ required: true, message: '部门编码不能为空', trigger: 'blur' },
          { min: 1, max: 50, message: '部门编码要求1-50个字符', trigger: 'blur' },
          { trigger: 'blur', validator: checkCodeRepeat }],
        manager: [{ required: true, message: '部门负责人不能为空', trigger: 'blur' }],
        introduce: [{ required: true, message: '部门介绍不能为空', trigger: 'blur' },
          { trigger: 'blur', min: 1, max: 300, message: '部门介绍要求1-50个字符' }]
      },
      // 定义员工简单列表
      peoples: []
    }
  },
  computed: {
    // 控制显示标题
    showTitle() {
      return this.formData.id ? '编辑部门' : '新增子部门'
    }
  },
  methods: {
    // 取消
    cancelAdd() {
      // 重置数据  因为resetFields只能重置表单上的数据
      this.formData = {
        name: '',
        code: '',
        manager: '',
        introduce: ''
      }
      // 重置表单数据
      this.$refs.deptForm.resetFields()
      // 关闭对话框
      this.$emit('update:showDialog', false)
    },
    // 获取员工简单列表
    async getEmployeeSimple() {
      this.peoples = await getEmployeeSimple()
    },
    // 校验表单
    btnOk() {
      this.$refs.deptForm.validate(async isOk => {
        if (isOk) {
          // 可以提交
          await addDepartments({ ...this.formData, pid: this.treeNode.id })
          // 通知父组件更新数据
          this.$emit('addDepts')
          // 关闭对话框
          this.$emit('update:showDialog', false)
        }
      })
    },
    // 获取部门详情
    async  getDepartDetail(id) {
      this.formData = await getDepartDetail(id)
    }
  }
}
</script>
