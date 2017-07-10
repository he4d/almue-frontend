import Vue from 'vue'
import Router from 'vue-router'
import HomeView from '@/views/HomeView'
import ShutterView from '@/views/ShutterView'
import LightingView from '@/views/LightingView'
import FloorView from '@/views/FloorView'
import LogView from '@/views/LogView'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: HomeView
    },
    {
      path: '/control/shutters',
      name: 'Shutters',
      component: ShutterView
    },
    {
      path: '/control/lightings',
      name: 'Lightings',
      component: LightingView
    },
    {
      path: '/manage/floors',
      name: 'Floors',
      component: FloorView
    },
    {
      path: '/manage/logfile',
      name: 'Logfile',
      component: LogView
    }
  ]
})
