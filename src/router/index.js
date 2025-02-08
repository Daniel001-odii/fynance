import { createRouter, createWebHistory } from 'vue-router'
import CustomerRecord from '@/views/CustomerRecord.vue'
import DashboardView from '@/views/DashboardView.vue'
import GroupsLists from '@/views/GroupsLists.vue'
import GroupView from '@/views/GroupView.vue'
import CustomersList from '@/views/CustomersList.vue'



const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '',
      name: 'Dashboard',
      component: DashboardView,
    },
    {
      path: '/customers/:customer_id',
      name: 'home',
      component: CustomerRecord
    },
    {
      path: '/groups/:group',
      name: 'Group',
      component: GroupView,
    },
    {
      path: '/groups',
      name: 'Groups',
      component: GroupsLists,
    },
    {
      path: '/customers',
      name: 'Customers',
      component: CustomersList,
    },
    
    
  ],
})

export default router
