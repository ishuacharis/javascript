import Vue from 'vue'
import Router from 'vue-router'
import {beforeUserEnter, beforeGuestEnter} from './routeFuncs/routerFunc.js'
import Login from '@/components/Login'
import Register from '@/components/Register'
import Home from '@/components/Home'
import Index from '@/components/Settings/Index'
import Account from '@/components/Settings/Account'
import Body from '@/components/Settings/Body'
import Rates from '@/components/Settings/Rates'
import Services from '@/components/Settings/Services'
import Photos from '@/components/Settings/Photos'
import ChangePassword from '@/components/Settings/ChangePassword'
import Phone from '@/components/Settings/Phone'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
      meta: {
        requireAuth: true
      },
      beforeEnter: beforeUserEnter
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
      meta: {
        guest: true
      },
      beforeEnter: beforeGuestEnter
    },
    {
      path: '/signup',
      name: 'Register',
      component: Register,
      meta: {
        guest: true
      },
      beforeEnter: beforeGuestEnter
    },
    {
      path: '/settings',
      name: 'Settings',
      redirect: {
        name: 'Account'
      },
      component: Index,
      meta: {
        requireAuth: true
      },
      children: [
        {
          path: 'account',
          name: 'Account',
          component: Account
        },
        {
          path: 'body',
          name: 'Body',
          component: Body
        },
        {
          path: 'change_password',
          name: 'Password',
          component: ChangePassword
        },
        {
          path: 'services',
          name: 'Services',
          component: Services
        },
        {
          path: 'rates',
          name: 'Rates',
          component: Rates
        },
        {
          path: 'photos',
          name: 'Photos',
          component: Photos
        },
        {
          path: 'phone',
          name: 'Phone',
          component: Phone
        }
      ],
      beforeEnter: beforeUserEnter
    },
    {
      path: '*',
      component: Login
    }
  ]
})
export default router
