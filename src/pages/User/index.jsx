/*
 * @Author: your name
 * @Date: 2022-02-04 06:30:56
 * @LastEditTime: 2022-02-04 21:03:43
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \umi_shop\src\pages\User\index.jsx
 */
import { PageContainer } from '@ant-design/pro-layout'
import React,{useRef} from 'react'
import { Button,Avatar,Switch } from 'antd';
import ProTable from '@ant-design/pro-table';
import { PlusOutlined,UserOutlined} from '@ant-design/icons';
import { getUsers } from '@/services/user';
const User = () => {
    const actionRef = useRef();
    const columns = [
        {
            title:'头像',
            hideInSearch:true,
            dataIndex:'avatar_url',
            render:(_,record)=>(
                <>
                <Avatar src={record.avatar_url} size={32} icon={<UserOutlined />} />
                </>
            )
        },
        {
            title:'姓名',
            dataIndex:'name',
        },
        {
            title:'邮箱',
            dataIndex:'email',
        },
        {
            title:'是否禁用',
            hideInSearch:true,
            dataIndex:'is_locked',
            render:(_,record)=>(
                <>
                <Switch
                    checkedChildren="启用" 
                    unCheckedChildren="禁用"
                    defaultChecked={record.is_locked===0} 
                     onChange={()=>{}}
                 />
                </>
            )
        },
        {
            title:'创建时间',
            dataIndex:'created_at',
            hideInSearch:true,
        },
        {
            title:'操作',
            hideInSearch:true,
            render:(_,record)=><a onChange={()=>{}}>编辑</a>
               
            
        },
    ]   
     return (
        <PageContainer>
        <ProTable
      columns={columns}
      actionRef={actionRef}
      request={async (params = {}, sort, filter) =>  getUsers(params) }
      
      rowKey="id"
      search={{
        labelWidth: 'auto',
      }}
    
      pagination={{
        pageSize: 8,
      }}
      dateFormatter="string"
      headerTitle="用户列表"
      toolBarRender={() => [
        <Button key="button" icon={<PlusOutlined />} type="primary">
          新建
        </Button>,
       
      ]}
    />
  );
        </PageContainer>
    )
}

export default User
