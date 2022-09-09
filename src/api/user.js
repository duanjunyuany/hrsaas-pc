import request from '@/utils/request'

// 登录
export function login(data) {
  return request({
    url: '/sys/login',
    method: 'POST',
    data
  })
}

// 获取用户信息
export function getUserInfo() {
  return request({
    url: '/sys/profile',
    method: 'POST'
  })
}

// 根据用户id获取用户基本信息（完全是为了头像）
export function getUserDetailById(id) {
  return request({
    url: `/sys/user/${id}`,
    method: 'GET'
  })
}

// 退出
export function logout() {
  return request({
  })
}
