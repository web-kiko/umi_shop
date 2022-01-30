/** Request 网络请求工具 更详细的 api 文档: https://github.com/umijs/umi-request */
import { extend } from 'umi-request';
import { message } from 'antd';

const codeMessage: Record<number, string> = {
  200: '服务器成功返回请求的数据。',
  201: '新建或修改数据成功。',
  202: '一个请求已经进入后台排队（异步任务）。',
  204: '服务器成功处理了请求，但没有返回任何内容',
  400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
  401: '用户没有权限（令牌、用户名、密码错误）。',
  403: '用户得到授权，但是访问是被禁止的。',
  404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
  406: '请求的格式不可得。',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '验证错误） 请求参数未通过验证。',
  500: '服务器发生错误，请检查服务器。',
  502: '网关错误。',
  503: '服务不可用，服务器暂时过载或维护。',
  504: '网关超时。',
};

/**
 * @zh-CN 异常处理程序
 * @en-US Exception handler
 */
const errorHandler = async (error: { response:any}) => {
  const { response } = error;
  if (response && response.status) {
    let errorText = codeMessage[response.status] || response.statusText;
    const { status, url } = response;
    const result =await response.json();
    // 处理422的情况
    if(status==422){
      let errs =""
      for(let key in result.errors){
          errs+=result.errors[key][0]
      }
    errorText+=`[${errs}]`
    }
    //处理400的情况
    if(status==400){
      errorText +=`[${result.message}]`
    }
   message.error(errorText)
  } else if (!response) {
    message.error("网络异常，无法连接服务器")
  }
  return response;
};

/**
 * @en-US Configure the default parameters for request
 * @zh-CN 配置request请求时的默认参数
 */
const request = extend({
  errorHandler, // default error handling
  credentials: 'include', // Does the default request bring cookies
  prefix:'/api'
});
/**
 * 请求拦截器，再请求之前加上header头
 */
 request.interceptors.request.use((url, options) => {
   const token =localStorage.getItem("access_token")||''
   const headers ={
    Authorization:`Bearer ${token}`
   }
  return {
    url,
    options: { ...options, headers },
  };
});

export default request;
