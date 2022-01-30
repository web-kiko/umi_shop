import {

  LockOutlined,
  UserOutlined,
  
} from '@ant-design/icons';
import { Alert,  Tabs } from 'antd';
import React, {  } from 'react';
import ProForm, {  ProFormText } from '@ant-design/pro-form';
import { useIntl, connect, } from 'umi';
import type { Dispatch } from 'umi';
import type { StateType } from '@/models/login';
import type { ConnectState } from '@/models/connect';

import styles from './index.less';

export type LoginProps = {
  dispatch: Dispatch;
  userLogin: StateType;
  submitting?: boolean;
};

const LoginMessage: React.FC<{
  content: string;
}> = ({ content }) => (
  <Alert
    style={{
      marginBottom: 24,
    }}
    message={content}
    type="error"
    showIcon
  />
);

const Login: React.FC<LoginProps> = (props) => {
  const { userLogin = {}, submitting } = props;
  const { status,  } = userLogin; 
  const intl = useIntl();

  const handleSubmit = (values:any) => {
    const { dispatch } = props;
    dispatch({
      type: 'login/login',
      payload: { ...values },
    });
  };
  return (
    <div className={styles.main}>
      <ProForm
        initialValues={{
          autoLogin: true,
        }}
        submitter={{
          render: (_, dom) => dom.pop(),
          submitButtonProps: {
            loading: submitting,
            size: 'large',
            style: {
              width: '100%',
            },
          },
        }}
        onFinish={(values) => {
          handleSubmit(values );
          // console.log(values)
          return Promise.resolve();
        }}
      >
        <Tabs activeKey="account">
          <Tabs.TabPane
            key="account"
            tab="账号密码登录"
          />
          
        </Tabs>

        {status === 'error' &&  !submitting && (
          <LoginMessage
            content="账号密码登录"
          />
        )}
      
            <ProFormText
              name="email"
              fieldProps={{
                size: 'large',
                prefix: <UserOutlined className={styles.prefixIcon} />,
              }}
              placeholder="邮箱：super@a.com"
              rules={[
                {
                  required: true,
                  message:"请输入邮箱"
                },
                {
                  type: 'email',
                  message:"请输入正确的邮箱格式"
                },
              ]}
            />
            <ProFormText.Password
              name="password"
              fieldProps={{
                size: 'large',
                prefix: <LockOutlined className={styles.prefixIcon} />,
              }}
              placeholder="密码：123123"
              rules={[
                {
                  required: true,
                  message:"请输入密码"
                },
              ]}
            />

      </ProForm>
     
    </div>
  );
};

export default connect(({ login, loading }: ConnectState) => ({
  userLogin: login,
  submitting: loading.effects['login/login'],
}))(Login);
