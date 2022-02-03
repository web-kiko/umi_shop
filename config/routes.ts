

/*
 * @Author: your name
 * @Date: 2022-01-27 22:17:33
 * @LastEditTime: 2022-02-04 07:07:17
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \umi_shop\config\routes.ts
 */
export default [
  {
    path: '/',
    component: '../layouts/BlankLayout',
    routes: [
      {
        path: '/login',
        component: '../layouts/LoginLayout',
        routes: [
          {
            name: 'login',
            path: '/login',
            component: './Login',
          },
        ],
      },
      {
        path: '/',
        component: '../layouts/SecurityLayout',
        routes: [
          {
            path: '/',
            component: '../layouts/BasicLayout',
            // authority: ['admin', 'user'],
            routes: [
              {
                path: '/',
                redirect:'/home'
              },
              {
                path: '/home',
                name:'home',
                icon:'SlackSquareFilled',
                component:'@/pages/Home'
               
              },
              {
                path: '/user',
                name:'user',
                icon:'UserOutlined',
                component:'@/pages/User'
               
              },
              {
                path: '/goods',
                name:'goods',
                icon:'AppstoreAddOutlined',
                component:'@/pages/Goods'
               
              },
              {
                path: '/category',
                name:'category',
                icon:'BarcodeOutlined',
                component:'@/pages/Category'
               
              },
              {
                path: '/orders',
                name:'orders',
                icon:'ShoppingOutlined',
                component:'@/pages/Orders'
               
              },
              {
                path: '/comments',
                name:'comments',
                icon:'IdcardOutlined',
                component:'@/pages/Comments'
               
              },
              {
                component: './404',
              },
            ],
          },
          {
            component: './404',
          },
        ],
      },
    ],
  },
  {
    component: './404',
  },
];
