/*
 * @Author: your name
 * @Date: 2022-02-04 06:30:56
 * @LastEditTime: 2022-02-06 16:19:49
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \umi_shop\src\pages\User\index.jsx
 */
import { PageContainer } from '@ant-design/pro-layout'
import React,{useRef,useState} from 'react'
import { Button,Avatar,Switch, message,Modal } from 'antd';
import ProTable from '@ant-design/pro-table';
import { PlusOutlined,UserOutlined} from '@ant-design/icons';
import { getUsers,patchLock,addUser } from '@/services/user';
import ProForm, { ProFormText} from '@ant-design/pro-form';
const User = () => {
    //ref刷新表格
    const actionRef = useRef();
    const [isModalVisible,setIsModalVisible] =useState(false);
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
                     onChange={async()=>{
                       const respones=  await patchLock(record.id)
                       if(respones.status==undefined){
                           message.success('操作成功')
                       }else{
                           message.error('操作失败')
                       }
                     }}
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
    /**
     * 打开模态框
     *  */ 
     const openModel=()=>{
        setIsModalVisible(true)
    }
    
    /**
     * 关闭模态框
     * 
     */
     
    const colseModel=()=>{
        setIsModalVisible(false)
    }
    /**
     * 发送请求添加用户
     */
    const addUsers= async(values)=>{
        const respones =await addUser(values)
        if(respones.status===undefined){
            message.success('添加成功');
            //刷新
            actionRef.current.reload();
           
            setIsModalVisible(false);
           
        }
    }
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
        pageSize: 10,
      }}
      dateFormatter="string"
      headerTitle="用户列表"
      toolBarRender={() => [
        <Button key="button" icon={<PlusOutlined />} type="primary" onClick={()=> openModel()}>
          新建
        </Button>,
       
      ]}
    />
  );
  <Modal title="添加用户" 
         visible={isModalVisible}  
         onCancel={colseModel}
         destroyOnClose={true}
          footer={null}>
         <ProForm
              onFinish={ (values) => {
                addUsers(values)
                message.success('提交成功');
              }}
            >
             <ProFormText
                  name="name"
                  label="昵称"
                  tooltip="最长为 24 位"
                  placeholder="请输入昵称"
                  rules={[{required:true,message:'请输入昵称'}]}
              />
               <ProFormText
                  name="email"
                  label="邮箱"
                  tooltip="最长为 24 位"
                  placeholder="请输入邮箱"
                  rules={[{required:true,message:'请输入邮箱'},
                  {type:'email',message:"邮箱格式不正确"}]}
              />
               <ProFormText.Password
                  name="password"
                  label="密码"
                  tooltip="最长为 24 位"
                  placeholder="请输入密码"
                  rules={[{required:true,message:'请输入密码'},
                  {min:6,message:"密码不少于6位"}
                  ]}
              />
        </ ProForm>
      </Modal>
        </PageContainer>
    )
}

export default User
