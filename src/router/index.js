import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ProductsList from '../views/ProductsList.vue'
import ProductsEdit from '../views/ProductEdit.vue'
import UsersList from '../views/UsersList.vue'
import UserEdit from '../views/UserEdit.vue'
import TypesList from '../views/TypesList.vue'
import TypeEdit from '../views/TypeEdit.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/products/list',
      name: 'ProductList',
      component: ProductsList
    },
    {
      path: '/products/edit/:id',
      name: 'ProductsEdit',
      component: ProductsEdit,
      props: true
    },
    {
      path: '/users/list',
      name: 'UserList',
      component: UsersList,
      props: true
    },
    {
      path: '/users/edit/:id',
      name: 'UserEdit',
      component: UserEdit,
      props: true
    },
    {
      path: '/types/list',
      name: 'TypesList',
      component: TypesList,
      props: true
    },
    {
      path: '/types/edit/:id',
      name: 'TypesEdit',
      component: TypeEdit,
      props: true
    },

  ]
})

export default router
