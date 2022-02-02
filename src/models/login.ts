/*
 * @Author: your name
 * @Date: 2022-01-27 22:17:33
 * @LastEditTime: 2022-02-01 02:33:50
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \umi_shop\src\models\login.ts
 */
import type { Reducer, Effect } from 'umi';
import { history } from 'umi';
import { fakeAccountLogin,logout } from '@/services/login';
import { message } from 'antd';

export type StateType = {
  status?: 'ok' | 'error';
  type?: string;
  currentAuthority?: 'user' | 'guest' | 'admin';
};

export type LoginModelType = {
  namespace: string;
  state: StateType;
  effects: {
    login: Effect;
    logout: Effect;
  };
  reducers: {
    changeLoginStatus: Reducer<StateType>;
  };
};

const Model: LoginModelType = {
  namespace: 'login',

  state: {
   
  },

  effects: {
    *login({ payload }, { call, put }) {
      const response = yield call(fakeAccountLogin, payload);
      console.log(response)
      //判断是否登录成功
      if(response.status==undefined){
        message.success('登录成功');
        yield put({
          type: 'changeLoginStatus',
          payload: response,
        });
      //跳转到首页
      history.replace( '/');
      }
    },
    
    /**
     * 请求退出登录的api，删除token和userInfo
     */
    *logout(_,{call}) {
      const response = yield call(logout)
      //判断是否登录成功
      if(response.status==undefined){
        message.success('退出成功');
        //删除token和userInfo
        localStorage.removeItem("userInfo")
        localStorage.removeItem("access_token")
      //重定向登录页
      history.replace( '/login');
      }
    },
  },

  reducers: {
    changeLoginStatus(state, { payload }) {
      //讲token存入到本地
      localStorage.setItem("access_token",payload.access_token)
      return {
        ...state,
       
      };
    },
  },
};

export default Model;
