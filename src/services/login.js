/*
 * @Author: your name
 * @Date: 2022-01-27 22:17:33
 * @LastEditTime: 2022-02-03 22:02:25
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \umi_shop\src\services\login.ts
 */
import request from '@/utils/request';


/**
 * 执行登录，获取token
 * @param params 
 * @returns 
 */
export async function fakeAccountLogin(params) {
  return request('/auth/login', {
    method: 'POST',
    data: params,
  });
}

/**
 * 退出登录
 */
 export async function logout(){
   return request.post('/auth/logout')
 }

