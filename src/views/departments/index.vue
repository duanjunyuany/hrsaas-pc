<template>
  <div v-loading="loading" class="departments-container">
    <div class="app-container">
      <el-card class="tree-card">
        <!-- 头部 行列布局 -->
        <tree-tools :tree-node="company" :is-root="true" @addDepts="addDepts" />
        <!-- 主体 -->
        <el-tree :data="departs" :props="defaultProps" :default-expand-all="true">
          <!-- 插槽内容会循环多次 -->
          <!-- 作用域插槽 slot-scope="obj" 接收传递给插槽的数据  data每个节点的数据对象-->
          <tree-tools slot-scope="{ data }" :tree-node="data" @delDepts="getDepartments" @addDepts="addDepts" @editDepts="editDepts" />
        </el-tree>
      </el-card>
    </div>
    <!-- 对话框 -->
    <add-dept ref="addDept" :show-dialog.sync="showDialog" :tree-node="node" @addDepts="getDepartments" />
  </div>
</template>

<script>
import TreeTools from './components/tree-tools'
import AddDept from './components/add-dept.vue'
import { getDepartments } from '@/api/departments'
import { tranListToTreeData } from '@/utils/index'

export default {
  name: 'Departments',
  components: {
    TreeTools,
    AddDept
  },
  data() {
    return {
      company: {},
      departs: [],
      defaultProps: {
        // 从name属性上显示内容
        label: 'name',
        // 从children属性上找子节点
        children: 'children'
      },
      showDialog: false,
      node: {},
      loading: false
    }
  },
  created() {
    // 获取组织架构数据
    this.getDepartments()
  },
  methods: {
    async getDepartments() {
      this.loading = true
      const result = await getDepartments()
      this.company = { name: result.companyName, manager: '负责人', id: '' }
      // 需要将数组转换为树形结构
      this.departs = tranListToTreeData(result.depts, '')
      this.loading = false
    },
    // 新增部门
    addDepts(node) {
      this.showDialog = true
      // node是当前点击的部门
      this.node = node
    },
    // 编辑部门
    editDepts(node) {
      this.showDialog = true
      // node是当前点击的部门
      this.node = node
      // 在这个位置调用子组件的方法
      this.$refs.addDept.getDepartDetail(node.id)
    }
  }
}
</script>

<style lang="scss" scoped>
.tree-card {
  padding: 30px  140px;
  font-size: 14px;
}
</style>
