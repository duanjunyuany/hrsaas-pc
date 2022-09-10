<template>
  <div class="departments-container">
    <div class="app-container">
      <el-card class="tree-card">
        <!-- 头部 行列布局 -->
        <el-row type="flex" justify="space-between" align="middle" style="height: 40px">
          <!-- 左侧一列 -->
          <el-col>
            <span>江苏传智播客教育科技股份有限公司</span>
          </el-col>
          <!-- 右侧一列 -->
          <el-col :span="4">
            <el-row type="flex" justify="end">
              <!-- 两列 -->
              <el-col>负责人</el-col>
              <el-col>
                <!-- 下拉菜单 -->
                <el-dropdown>
                  <span>
                    操作<i class="el-icon-arrow-down" />
                  </span>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item>添加子部门</el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
              </el-col>
            </el-row>
          </el-col>
        </el-row>
        <!-- 主体 -->
        <el-tree :data="departs" :props="defaultProps" :default-expand-all="true">
          <!-- 插槽内容会循环多次 -->
          <!-- 作用域插槽 slot-scope="obj" 接收传递给插槽的数据  data每个节点的数据对象-->
          <el-row slot-scope="{ data }" type="flex" justify="space-between" align="middle" style="height: 40px; width: 100%">
            <!-- 左侧一列 -->
            <el-col>
              <span>{{ data.name }}</span>
            </el-col>
            <!-- 右侧一列 -->
            <el-col :span="4">
              <el-row type="flex" justify="end">
                <!-- 两列 -->
                <el-col>{{ data.manager }}</el-col>
                <el-col>
                  <!-- 下拉菜单 -->
                  <el-dropdown>
                    <span>
                      操作<i class="el-icon-arrow-down" />
                    </span>
                    <el-dropdown-menu slot="dropdown">
                      <el-dropdown-item>添加子部门</el-dropdown-item>
                      <el-dropdown-item>编辑部门</el-dropdown-item>
                      <el-dropdown-item>删除部门</el-dropdown-item>
                    </el-dropdown-menu>
                  </el-dropdown>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
        </el-tree>
      </el-card>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Departments',
  data() {
    return {
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
