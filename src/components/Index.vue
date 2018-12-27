<template>
  <div class="index container">
      <div class="card" v-for="todolist in todolists" :key='todolists.id'>
        <div class="card-content">
          <i class="material-icons deletee" @click="deleteTodolist(todolist.id)"> delete </i>
          <h2 class="indigo-text">{{ todolist.title }}</h2>
          <ul class="tasks">
            <li v-for="(task, index) in todolist.tasks" :key='index'>
              <span class="chip" v-if-empty>{{ task }}</span>
            </li>
          </ul>
        </div>

          <router-link :to="{name: 'EditTodolist', params: {todolist_slug:todolist.slug} }">
            <span class="btn-floating btn-large halfway-fab pink">
            <i class="material-icons edit">edit</i>
            </span>
          </router-link>

      </div>
  </div>
</template>

<script>
import db from '@/firebase/init'
export default {
  name: 'Index',

  data () {
      return {
        todolists: [],
        empty: false
      }
  },

  methods: {
    deleteTodolist: function(id){
      db.collection('todolists').doc(id).delete()
      .then(() => {
        this.todolists = this.todolists.filter(todolist => {
          return todolist.id != id  // delete todolist if it returns false(which means they are equal)
        });
      })

    },


  },
  created (){
    db.collection('todolists').get()
    .then(snapshot => {
      snapshot.forEach(doc => {
        let todolist = doc.data();
        todolist.id = doc.id;
        this.todolists.push(todolist);
        this.empty = false;
      })
    })
  }
}
</script>

<style>
.index{
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 30px;
  margin-top: 60px;
}
.index h2{
  font-size: 1.8em;
  text-align: center;
  margin-top: 0;
}
.index .tasks{
  margin: 30px auto;
}
.index .tasks li{
  display: inline-block;
}
.index .deletee{
  position: absolute;
  top: 4px;
  right: 4px;
  cursor: pointer;
  color: #aaa;
  font-size: 1.4em;
}
.x{
  color: #952314
}
</style>
