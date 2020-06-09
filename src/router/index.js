import Vue from 'vue'
import VueRouter from 'vue-router'
import firebase from 'firebase/app'
Vue.use(VueRouter)

  const routes = [

    {
      path: '/',
      name: 'home',
      meta: {layout: 'main'},
      component: () => import('../views/Home.vue'),
    },
    { 
      path: '/login',
      name: 'login',
      meta: {layout: 'empty'},
      component: () => import('../views/Login.vue'),
    },
    { 
      path: '/register',
      name: 'register',
      meta: {layout: 'empty'},
      
      component: () => import('../views/Register.vue'),
    },
    {
      path: '/categories',
      name: 'categories',
      meta: {layout: 'main', isAuth: true},
      component: () => import('../views/Categories.vue'),
    },
    {
      path: '/detail-record/:id',
      name: 'detail-record',
      meta: {layout: 'main', isAuth: true},
      component: () => import('../views/Detail-record.vue'),
    },
    {
      path: '/history',
      name: 'history',
      meta: {layout: 'main', isAuth: true},
      component: () => import('../views/History.vue'),
    },
    {
      path: '/plaining',
      name: 'plaining',
      meta: {layout: 'main', isAuth: true},
      component: () => import('../views/Plaining.vue'),
    },
    {
      path: '/profile',
      name: 'profile',
      meta: {layout: 'main', isAuth: true},
      component: () => import('../views/Profile.vue'),
    },
    {
      path: '/record',
      name: 'record',
      meta: {layout: 'main', isAuth: true},
      component: () => import('../views/Record.vue'),
    },
    {
      path: '/test-page',
      name: 'test-page',
      meta: {layout: 'main', isAuth: true},
      component: () => import('../test-component/test.vue'),
      children: [
        {
          path: 'comp1',
          component: () => import('../test-component/comp/component_1.vue'),
          meta: {layout: 'main', isAuth: true},
        },
        {
          path: 'comp2',
          component: () => import('../test-component/comp/component_2.vue'),
        },
        {
          path: 'comp3',
          component: () => import('../test-component/comp/component_3.vue'),
        },
      ]
      
    },
]

const router = new VueRouter({
  routes
})

router.beforeEach((to,from,next) => {
  const currentUser = firebase.auth().currentUser
  const requireAuth = to.matched.some(key => key.meta.isAuth)
  
  if(requireAuth && !currentUser) {
    next('/login?message=login')
  } else {
    next()
  }
})


export default router
