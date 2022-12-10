import { createRouter, createWebHistory } from 'vue-router'
// import Unauthorized from './pages/Unauthorized.vue'
import Spell from './pages/Spell.vue'
import Home from './pages/Home.vue'
import Repositories from './pages/Repositories.vue'


const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: Home,
      meta: {
        transition: 'slide-right',
        isAuthenticated: true
      }
    },
    {
      path: '/Spell/:id',
      component: Spell,
      meta: {
        transition: 'slide-right',
        isAuthenticated: true
      }
    },
    {
      path: '/Repositories',
      component: Repositories,
      meta: {
        transition: 'slide-right',
        isAuthenticated: true
      }
    }
  ]
})


export { router as default }
