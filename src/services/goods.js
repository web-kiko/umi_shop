/*
 * @Author: your name
 * @Date: 2022-01-27 22:17:33
 * @LastEditTime: 2022-02-07 02:57:48
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \umi_shop\src\services\user.js
 */
import request from '@/utils/request';

//获取商品列表
export async function getGoods(params) {
  return request('/admin/goods',{params});
}
//获取商品列表的上架和下架
export async function isOn(goodsId) {
  return request.patch(`/admin/goods/${goodsId}/on`);
}