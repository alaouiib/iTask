

<template>

  <div class="navbar">
      <nav class="nav-extended indigo darken-2">
        <div class="nav-content">
          <router-link :to="{name: 'Index'}">
            <span class="nav-title">My Todolists </span>
          </router-link>
          <a href="" class="btn-floating btn-large halfway-fab pink">
            <router-link :to="{ name: 'AddTodolist'}">
              <i class="material-icons">add</i>
            </router-link>
          </a>
        </div>
      </nav>
  </div>


</template>

<script>
import Index from '@/components/Index.vue';
import AddTodolist from '@/components/AddTodolist.vue';

export default {
  name:'Navbar',
  data () {
      return {

      }
  },
  methods: {
  }
}
</script>

<style >
.navbar nav{
  padding: 0 20px;
}
</style>
