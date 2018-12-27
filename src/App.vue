<template>
  <div id="app">
    <Navbar></Navbar>
    <router-view/>
  </div>
</template>

<script>
import Index from '@/components/Index.vue';
import Navbar from '@/components/Navbar.vue';
import AddTodolist from '@/components/AddTodolist.vue';

export default {
    components: {
         Navbar

    },
    data () {
        return {

        }
    },
    methods: {

    }
}
</script>

<style>

</style>
