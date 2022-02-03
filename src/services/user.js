import request from '@/utils/request';

//获取用户信息
export async function queryCurrent() {
  return request('/admin/user');
}


