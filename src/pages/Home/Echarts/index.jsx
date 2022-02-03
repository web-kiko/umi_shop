/*
 * @Author: your name
 * @Date: 2022-02-03 03:12:20
 * @LastEditTime: 2022-02-04 01:19:15
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \umi_shop\src\pages\Home\Echarts\index.tsx
 */
import React,{useEffect} from 'react';
import { getGoods } from '@/services/home';
import * as echarts from 'echarts';


const Echarts= props => {
  
  useEffect (() => {
    // 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(document.getElementById('main'));

        // 绘制图表
        myChart.setOption({
            title: { text: '商品' },
            tooltip: {},
            xAxis: {
                data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"]
            },
            yAxis: {},
            series: [{
                name: "销量",
                type: "bar",
                data: [5, 20, 36, 10, 10, 20]
            }]
        });
  },[])
  return (
    <div id='main' style={{width: '100%', height: 500}}></div>
  );
};

export default Echarts;

