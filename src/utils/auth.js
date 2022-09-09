import Cookies from 'js-cookie'

// 设置一个独一的key
const TokenKey = 'hrsaas-ihrm-token'

// 获取token
export function getToken() {
  return Cookies.get(TokenKey)
}

// 设置token
export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

// 删除token
export function removeToken() {
  return Cookies.remove(TokenKey)
}
