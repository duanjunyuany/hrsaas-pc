import request from '@/utils/request'

// 登录
export function login(data) {
  return request({
    url: '/sys/login',
    method: 'POST',
    data
  })
}

// 获取信息
export function getInfo(token) {
  return request({
  })
}

// 退出
export function logout() {
  return request({
  })
}
