/*
 * @Author: your name
 * @Date: 2022-02-03 03:11:50
 * @LastEditTime: 2022-02-03 03:22:57
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \umi_shop\src\pages\Home\Statitic\index.tsx
 */
import React from 'react'
import { Statistic, Card, Row, Col } from 'antd';
import { ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons';
 const Statitic = () => {
    return (
        <div>
             <Row gutter={16}>
        <Col span={8}>
        <Card>
          <Statistic
            title="商品数"
            value={11.28}
            precision={0}
            valueStyle={{ color: '#3f8600' }}
            prefix={<ArrowUpOutlined />} 
          />
        </Card>
      </Col>
      <Col span={8}>
        <Card>
          <Statistic
            title="订单数"
            value={9.3}
            precision={0}
            valueStyle={{ color: '#cf1322' }}
            prefix={<ArrowDownOutlined />}
          />
        </Card>
      </Col>
      <Col span={8}>
        <Card>
          <Statistic
            title="用户数"
            value={9.3}
            precision={0}
            valueStyle={{ color: '#234abc' }}
            prefix={<ArrowDownOutlined />}
            
          />
        </Card>
      </Col>
    </Row>
    
        </div>
    )
}
 export default Statitic;