/*
 * @Author: your name
 * @Date: 2022-02-04 06:30:56
 * @LastEditTime: 2022-02-07 03:00:58
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \umi_shop\src\pages\
*/
import { PageContainer } from '@ant-design/pro-layout'
import React,{useRef,useState} from 'react'
import { Button,Avatar,Switch, message,Modal,Image } from 'antd';
import ProTable from '@ant-design/pro-table';
import { PlusOutlined,UserOutlined} from '@ant-design/icons';
import { getGoods,isOn} from '@/services/goods';
import ProForm, { ProFormText} from '@ant-design/pro-form';
const Goods = () => {
    //ref刷新表格
    const actionRef = useRef();
    const [isModalVisible,setIsModalVisible] =useState(false);
    const columns = [
        {
            title:'商品图片',
            hideInSearch:true,
            dataIndex:'cover_url',
            render:(_,record)=>(
                <Image width={60}  src={record.cover_url}
                placeholder={
                    <Image preview={false} src={record.cover_url} width={200} />
        }
      />
            )
        },
        {
            title:'标题',
            dataIndex:'title',
        },
        {
            title:'价格',
            dataIndex:'price',
            hideInSearch:true,
        },
        {
            title:'销量',
            dataIndex:'sales',
            hideInSearch:true,
        },
        {
            title:'是否上架',
            dataIndex:'is_on',
            render:(_,record)=>
                
                <Switch
                    checkedChildren="上架" 
                    unCheckedChildren="下架"
                    defaultChecked={record.is_on===1} 
                     onChange={async()=>{
                       const respones=  await handleIsOn(record.id)
                       
                     }}
                 />,
                  valueType:'radioButton',
                 valueEnum:{1:{text:'已上架'},0:{text:'未上架'}},    

        },
        
        {
            title:'注册时间',
            dataIndex:'created_at',
            hideInSearch:true,
        },
        {
            title:'操作',
            hideInSearch:true,
            render:(_,record)=><a onClick={()=>openUptateModel()}>编辑</a>  
        },
    ] 
    /**
     * 打开新建模态框
     *  */ 
     const openModel=()=>{
        setIsModalVisible(true)
    }
    
    /**
     * 关闭新建模态框
     * 
     */
     
    const colseModel=()=>{
        setIsModalVisible(false)
    }
    /**
     * 打开编辑模态框
     *  */ 
     const openUptateModel=()=>{
        setIsModalVisible(true)
    }
    
    /**
     * 关闭编辑模态框
     * 
     */
     
    const colseUptateModel=()=>{
        setIsModalVisible(false)
    }
    /**
     * 是否上架
     * @param {*} values 
     */
    const handleIsOn =async (goodsId)=>{
        const response =await isOn(goodsId)
        if(response.status==undefined){
            message.success('操作成功')
        }
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
    /**
     * 发送请求更新用户
     */
     const uptateUsers= async(values)=>{
        const respones =await uptateUser(upid,values)
        if(respones.status===undefined){
            message.success('更新成功');
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
      request={async (params = {}, sort, filter) =>  getGoods(params) }
      
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
 {/* 新建用户 */}
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
     {/* 编辑用户 */}
      <Modal title="编辑用户" 
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

export default Goods
