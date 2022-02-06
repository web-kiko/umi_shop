/*
 * @Author: your name
 * @Date: 2022-01-27 22:17:33
 * @LastEditTime: 2022-02-06 15:43:36
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \umi_shop\src\services\user.js
 */
import request from '@/utils/request';

//获取用户信息
export async function queryCurrent() {
  return request('/admin/user');
}

//获取用户列表
export async function getUsers(params) {
  return request('/admin/users',{params});
}
//获取用户列表的禁用和启用
export async function patchLock(uid) {
  return request.patch(`/admin/users/${uid}/lock`);
}
//添加用户
export async function addUser(params) {
  return request.post('/admin/users',{params});
}
