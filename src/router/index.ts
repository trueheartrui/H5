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
      meta:{
        title:'',
        show:false,
        noShowBottomTab:true
      },
      component: loginVue
    },
    {
      path: '/register',
      name: 'register',
      component: register
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
      meta:{
        title:'编辑用户',
        show:true,
        noShowBottomTab:true
      },
      component: editPatient
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

export default router
