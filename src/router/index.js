import Vue from 'vue'
import VueRouter from 'vue-router'

import Login from '../views/login.vue'
import Welcome from '../components/Welcome.vue'
import addProducts from '../components/exhibits/addProducts.vue'
import allProducts from '../components/exhibits/allProducts.vue'
import warehouseOut from '../components/exhibits/warehouseOut.vue'
import editInfo from '../components/exhibits/editInfo.vue'
import position from '../components/exhibits/position.vue'
import wareHouse from '../components/exhibits/warehouse.vue'
Vue.use(VueRouter)

const routes = [{
    path: '/',
    name: '',
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'login',
    component: Login,

  },
  {
    path: '/error',
    name: '',
    component: resolve => require(['../views/error.vue'], resolve),

  },
  {
    path: '/home',
    name: 'home',
    component: resolve => require(['../views/home.vue'], resolve),
    redirect: '/welcome',
    children: [{
      path: '/welcome',
      component: Welcome
    }, {
      path: '/addproducts',
      component: addProducts
    }, {
      path: '/allproducts',
      component: allProducts
    }, {
      path: '/warehouseout',
      component: warehouseOut
    }, {
      path: '/editinfo',
      component: editInfo
    }, {
      path: '/position',
      component: position
    }, {
      path: '/warehouse',
      component: wareHouse
    }]

  }
]




const router = new VueRouter({
  routes
})

export default router
