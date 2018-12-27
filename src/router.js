import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/Index.vue';
import AddTodolist from '@/components/AddTodolist.vue';
import EditTodolist from '@/components/EditTodolist.vue';

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path:'/',
      name: 'Index',
      component: Index
    },
    {
      path:'/add-todolist',
      name:'AddTodolist',
      component: AddTodolist
    },
    {
      path:'/edit-todolist/:todolist_slug',
      name:'EditTodolist',
      component: EditTodolist
    }

  ]
})
