import { createRouter, createWebHistory } from 'vue-router'
import SingleSpell from './pages/SingleSpell.vue'
import Home from './pages/Home.vue'

export default createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: Home,
    },
    {
      path: '/Spell/:id',
      component: SingleSpell,
    }
  ]
})