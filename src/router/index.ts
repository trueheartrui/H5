import { createRouter, createWebHistory } from 'vue-router'
import loginVue from '@/views/login.vue'
import register from '@/views/register.vue'
import user from '@/views/user.vue'
import userHomeVue from '@/views/userHome.vue'
import managerHomeVue from '@/views/managerHome.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'loginVue',
      meta: {
        title: '登录',
        noShowBottomTab: true
      },
      component: loginVue
    },
    {
      path: '/register',
      name: 'register',
      meta: {
        title: '注册',
        noShowBottomTab: true
      },
      component: register
    },
    {
      path: '/user',
      name: 'user',
      meta: { title: '我的' },
      component: user
    },
    {
      path: '/userHomeVue',
      name: 'userHomeVue',
      meta: { title: '首页' },
      component: userHomeVue
    },
    {
      path: '/managerHomeVue',
      name: 'managerHomeVue',
      meta: { title: '首页' },
      component: managerHomeVue
    },
    {
      path: '/addPatient',
      name: 'addPatient',
      meta: { title: '添加病人' },
      component: ()=>import('../views/addPatient.vue')
    },
    {
      path: '/editPatient',
      name: 'editPatient',
      meta: { title: '编辑病人信息' },
      component: ()=>import('../views/editPatient.vue')
    },
    {
      path: '/myProject',
      name: 'myProject',
      meta: { title: '我的项目' },
      component: () => import('../views/myProject.vue')
    },
    {
      path: '/editProject',
      name: 'editProject',
      meta: { title: '编辑项目' },
      component: () => import('../views/editProject.vue')
    },
    {
      path: '/project',
      name: 'project',
      meta: { title: '项目管理' },
      component: () => import('../views/project.vue')
    },
    {
      path: '/modifyPassword',
      name: 'modifyPassword',
      meta: { title: '修改密码' },
      component: () => import('../views/modifyPassword.vue')
    },
    {
      path: '/projectItemRecords',
      name: 'projectItemRecords',
      meta: { title: '项目明细' },
      component: () => import('../views/projectItemRecords.vue')
    },
  ]
})

const whiteRoutes = ['loginVue', 'register']
router.beforeEach(((to, from) => {
  // console.log('====================================');
  // console.log(to, from, whiteRoutes.includes(to.name));
  // console.log('====================================');
  const token = localStorage.getItem('token')
  const type = localStorage.getItem('type')

  if(!token){
    if(!whiteRoutes.includes(to.name)){
      return { name: 'loginVue' }
    }
  }else{
    if(to.name === 'loginVue' || to.path === '/'){
      if (type == 1) {
        return { name: 'managerHomeVue' }
      } else {
        return { name: 'userHomeVue' }
      }
    }
  }
}))

export default router
