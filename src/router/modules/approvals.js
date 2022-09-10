import Layout from '@/layout'

// 导出审批的路由
export default {
  path: '/approvals',
  // name在做权限时用到
  name: 'approvals',
  component: Layout,
  // 配置二级路由表
  children: [{
    // 当二级路由的path为空时表示该路由为当前二级路由的默认路由
    path: '',
    component: () => import('@/views/approvals'),
    // 路由元信息 其实就是存储数据的对象 随意定义
    meta: {
      // 用title是因为左侧导航会读取路由里的meta里面的title作为显示菜单名称
      title: '审批'
    }
  }]
}

// 访问地址是 /approvals 的时候，Layout组件会显示，此时二级路由的默认组件也会显示
