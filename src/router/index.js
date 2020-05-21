import Vue from 'vue'
import VueRouter from 'vue-router'
import Main from '@/components/Main'
import Chat from '@/components/Chat'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Main',
    component: Main
  },

  {
    path: '/chat',
    name: 'Chat',
    component: Chat,
    props: true,
      beforeEnter: (to, from, next) => {
          if (to.params.name) {
              next()
          } else {
              next({ name: 'Main' })
              
          }
      },
  }
]

const router = new VueRouter({
    routes,
    mode: 'history'
    
})

export default router
