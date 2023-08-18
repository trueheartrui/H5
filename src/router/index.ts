import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import loginVue from '@/views/login.vue'
import home from '@/views/home.vue'
import register from '@/views/register.vue'
import user from '@/views/user.vue'
import patient from '@/views/patient.vue'
import editPatient from '@/views/editPatient.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'homes',
      component: HomeView
    },
    {
      path: '/login',
      name: 'loginVue',
      meta: {
        title: '',
        show: false,
        noShowBottomTab: true
      },
      component: loginVue
    },
    {
      path: '/register',
      name: 'register',
      meta: {
        noShowBottomTab: true
      },
      component: () => import('../views/register.vue')
    },
    {
      path: '/user',
      name: 'user',
      component: user
    },
    {
      path: '/home',
      name: 'home',
      component: home
    },
    {
      path: '/patient',
      name: 'patient',
      component: patient
    },
    {
      path: '/editPatient',
      name: 'editPatient',
      meta: {
        title: '编辑用户',
        show: true,
        noShowBottomTab: true
      },
      component: editPatient
    },
    {
      path: '/toDo',
      name: 'toDo',
      component: () => import('../views/toDo.vue')
    },
    {
      path: '/myProject',
      name: 'myProject',
      component: () => import('../views/myProject.vue')
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    }
  ]
})

const whiteRoutes = ['loginVue', 'register']
router.beforeEach(((to, from) => {
  console.log('====================================');
  console.log(to, from, whiteRoutes.includes(to.name));
  console.log('====================================');
  const token = localStorage.getItem('token')
  if (!token && !whiteRoutes.includes(to.name)) {
    return { name: 'loginVue' }
  } else if(token && to.name === 'loginVue'){
    return { name: 'home' }
  }
}))

export default router
