import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { useAuthStore } from '../stores/auth-store';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', redirect: '/login' },
    {
      path: '/register',
      name: 'register',
      component: () => import('../views/RegisterView.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue')
    },
    {
      path: '/home',
      name: 'home',
      component: HomeView
    }
  ]
})

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();
  if (to.meta.requiresAuth && !authStore.token) {
    next({ name: 'login' });
  } else {
    next();
  }
});

export default router


// import { createRouter, createWebHistory } from 'vue-router';
// import LoginView from '../views/LoginView.vue';
// import HomeView from '../views/HomeView.vue';
// import { useAuthStore } from '../stores/auth-store';

// const routes = [
//   { path: '/', redirect: '/login' },
//   { path: '/login', component: LoginView },
//   { path: '/register', component: () => import('../views/RegisterView.vue') },
//   { 
//     path: '/home', 
//     component: HomeView,
//     beforeEnter: (to, from, next) => {
//       const authStore = useAuthStore();
//       if (authStore.isLoggedIn) {
//         next();
//       } else {
//         next('/login');
//       }
//     }
//   },
// ];

// const router = createRouter({
//   history: createWebHistory(),
//   routes,
// });

// export default router;
