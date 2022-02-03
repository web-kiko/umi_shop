/*
 * @Author: your name
 * @Date: 2022-02-03 21:24:15
 * @LastEditTime: 2022-02-03 22:33:02
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \umi_shop\src\services\home.ts
 */
import request from '@/utils/request';

//获取统计数据
export async function getStatitic() {
  return request('/admin/index');
}
//获取商品数据
export async function getGoods() {
  return request('/goods');
}