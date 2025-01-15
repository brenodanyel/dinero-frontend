import { createRouter, createWebHistory } from 'vue-router'
import { authRoutes } from './features/auth/auth-routes'
import { dashboardRoutes } from './features/dashboard/dashboard-routes'

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '',
      meta: { title: '' },
      redirect: { name: 'home' },
      children: [...authRoutes, ...dashboardRoutes],
    },
  ],
})

declare module 'vue-router' {
  interface RouteMeta {
    title: string
  }
}
