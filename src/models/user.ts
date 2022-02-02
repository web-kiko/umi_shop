/*
 * @Author: your name
 * @Date: 2022-01-27 22:17:33
 * @LastEditTime: 2022-02-03 02:06:21
 * @LastEditors: your name
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \umi_shop\src\models\user.ts
 */
import type { Effect, Reducer } from 'umi';

import { queryCurrent,} from '@/services/user';

export type CurrentUser = {
  avatar?: string;
  name?: string;
  title?: string;
  group?: string;
  signature?: string;
  tags?: {
    key: string;
    label: string;
  }[];
  userid?: string;
  unreadCount?: number;
};

export type UserModelState = {
  currentUser?: CurrentUser;
};

export type UserModelType = {
  namespace: 'user';
  state: UserModelState;
  effects: {
    fetch: Effect;
    fetchCurrent: Effect;
  };
  reducers: {
    saveCurrentUser: Reducer<UserModelState>;
    changeNotifyCount: Reducer<UserModelState>;
  };
};

const UserModel: UserModelType = {
  namespace: 'user',

  state: {
    currentUser: {},
  },

  effects: {
    *fetch(_, { call, put }) {
      const response = yield call(queryUsers);
      yield put({
        type: 'save',
        payload: response,
      });
    },
    //获取用户信息
    *fetchCurrent(_, { call, put }) { 
      const userInfo =localStorage.getItem("userInfo")
      let response ={}
      if(!userInfo){
        response = yield call(queryCurrent);
        localStorage.setItem("userInfo",JSON.stringify(response))
      }else{
        response=JSON.parse(userInfo)
      }
     console.log(response);
     
      yield put({
        type: 'saveCurrentUser',
        payload: response,
      });
    },
  },

  reducers: {
    saveCurrentUser(state, action) {
      return {
        ...state,
        currentUser: action.payload || {},
      };
    },
  
  },
};

export default UserModel;
