import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import ProductsList from '../views/ProductsList.vue';
import ProductsEdit from '../views/ProductEdit.vue';
import UsersList from '../views/UsersList.vue';
import UserEdit from '../views/UserEdit.vue';
import TypesList from '../views/TypesList.vue';
import TypeEdit from '../views/TypeEdit.vue';
import CustomersList from '../views/CustomersList.vue';
import CustomerEdit from '../views/CustomerEdit.vue';
import SigninView from '../views/SigninView.vue';

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
    {
      path: '/customers/list',
      name: 'CustomerList',
      component: CustomersList,
      props: true
    },
    {
      path: '/customers/edit/:id',
      name: 'CustomerEdit',
      component: CustomerEdit,
      props: true
    },
    {
      path: '/signin',
      name: 'SigninView',
      component: SigninView,
      props: true
    },
  ]
})

router.beforeEach((to, from, next) => {
  const publicPages = ['signin'];
  const authRequired = !publicPages.includes(to.name);
  const token = localStorage.getItem('token');

  if (authRequired && !token) {
    return next('/signin');
  }

  next();
});

export default router
