import { createRouter, createWebHistory } from 'vue-router'
import { getAuth } from 'firebase/auth';
import firebase from '../firebase_init'

const routes = [
  {
    path: '/',
    name: 'dashboard',
    component: () => import('../components/Dashboard.vue'),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../components/Login.vue'),
    meta: {
      requiresGuest: true,
    },
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('../components/Register.vue'),
    meta: {
      requiresGuest: true,
    },
  },
  {
    path: '/new',
    name: 'new-employee',
    component: () => import('../components/NewEmployee.vue'),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/edit/:employeeId',
    name: 'edit-employee',
    component: () => import('../components/EditEmployee.vue'),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/:employeeId',
    name: 'view-employee',
    component: () => import('../components/ViewEmployee.vue'),
    meta: {
      requiresAuth: true,
    },
  },
]

let router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

router.beforeEach((to, _, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    const auth = getAuth(firebase.app);
    const user = auth.currentUser;

    if (user) {
      next();

    } else {
      next({
        path: '/login',
        query: { redirect: to.fullPath },
      });
    }
  } else if (to.matched.some(record => record.meta.requiresGuest)) {
    const auth = getAuth(firebase.app);
    const user = auth.currentUser;
    if (user) {
      next({ path: '/', query: { redirect: to.fullPath, } });
    } else {
      next();
    }

  } else {
    next();
  }
});

export default router
