<template>
  <div class="departments-container">
    <div class="app-container">
      <el-card class="tree-card">
        <!-- 头部 行列布局 -->
        <tree-tools :tree-node="company" :is-root="true" />
        <!-- 主体 -->
        <el-tree :data="departs" :props="defaultProps" :default-expand-all="true">
          <!-- 插槽内容会循环多次 -->
          <!-- 作用域插槽 slot-scope="obj" 接收传递给插槽的数据  data每个节点的数据对象-->
          <tree-tools slot-scope="{ data }" :tree-node="data" />
        </el-tree>
      </el-card>
    </div>
  </div>
</template>

<script>
import TreeTools from './components/tree-tools'
import { getDepartments } from '@/api/departments'
import { tranListToTreeData } from '@/utils/index'

export default {
  name: 'Departments',
  components: {
    TreeTools
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
      }
    }
  },
  created() {
    // 获取组织架构数据
    this.getDepartments()
  },
  methods: {
    async getDepartments() {
      const result = await getDepartments()
      this.company = { name: result.companyName, manager: '负责人' }
      // 需要将数组转换为树形结构
      this.departs = tranListToTreeData(result.depts, '')
      console.log(result)
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
