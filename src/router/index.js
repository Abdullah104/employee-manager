import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'dashboard',
    component: () => import('../components/Dashboard.vue')
  },
  {
    path: '/new',
    name: 'new-employee',
    component: () => import('../components/NewEmployee.vue')
  },
  {
    path: '/edit/:employeeId',
    name: 'edit-employee',
    component: () => import('../components/EditEmployee.vue')
  },
  {
    path: '/:employeeId',
    name: 'view-employee',
    component: () => import('../components/ViewEmployee.vue')
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
