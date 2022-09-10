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

export default {
  name: 'Departments',
  components: {
    TreeTools
  },
  data() {
    return {
      company: { name: '江苏传智播客教育科技股份有限公司', manager: '负责人' },
      departs: [{ name: '总裁办', manager: '曹操', children: [{ name: '董事会', manager: '曹丕' }] },
        { name: '行政部', manager: '刘备' },
        { name: '人事部', manager: '孙权' }],
      defaultProps: {
        // 从name属性上显示内容
        label: 'name',
        // 从children属性上找子节点
        children: 'children'
      }
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
