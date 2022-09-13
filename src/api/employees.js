import request from '@/utils/request'

// 获取员工的简单列表
export function getEmployeeSimple() {
  return request({
    url: '/sys/user/simple',
    method: 'GET'
  })
}

// 获取员工的综合列表数据
export function getEmployeeList(params) {
  return request({
    url: '/sys/user',
    method: 'GET',
    params
  })
}

// 删除员工
export function delEmployee(id) {
  return request({
    url: `/sys/user/${id}`,
    method: 'DELETE'
  })
}

// 新增员工
export function addEmployee(data) {
  return request({
    method: 'POST',
    url: '/sys/user',
    data
  })
}

// 批量导入员工
export function importEmployee(data) {
  return request({
    url: '/sys/user/batch',
    method: 'POST',
    data
  })
}

// 保存员工信息
export function saveUserDetailById(data) {
  return request({
    url: `/sys/user/${data.id}`,
    method: 'PUT',
    data
  })
}

// 获取员工详情信息
export function getPersonalDetail(id) {
  return request({
    url: `/employees/${id}/personalInfo`,
    method: 'GET'
  })
}

// 更新员工详情信息
export function updatePersonal(data) {
  return request({
    url: `/employees/${data.userId}/personalInfo`,
    method: 'PUT',
    data
  })
}

// 获取员工岗位信息
export function getJobDetail(id) {
  return request({
    url: `/employees/${id}/jobs`,
    method: 'GET'
  })
}

// 更新员工岗位信息
export function updateJob(data) {
  return request({
    url: `/employees/${data.userId}/jobs`,
    method: 'PUT',
    data
  })
}
