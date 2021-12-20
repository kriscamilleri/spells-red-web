import { createRouter, createWebHistory } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'
import Home from './pages/Home.vue'

export default createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: Home,
      },
       {
      path: '/Hello',
      component: HelloWorld,
    }
  ]
})