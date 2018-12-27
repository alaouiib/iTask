<template>
  <div v-if = "todolist" class="EditTodolist container">
    <div class="edit-todolist container z-depth-1">
    <h2 class="center-align indigo-text">Edit {{todolist.title}} Todolist</h2>
    <form @submit.prevent="EditTodolist">
      <div class="field title">
        <label for="title">todolist title:</label>
        <input type="text" name="title" v-model="todolist.title">
      </div>
      <div v-for="(task, index) in todolist.tasks" class="field task" :key="index">
         <label for="task">Task:</label>
         <input type="text" name="task" v-model="todolist.tasks[index]">
          <i class="material-icons deletee" @click="deleteTask(task)">delete</i>
       </div>
      <div class="field edit-task">
        <label for="edit-task">Add a task(TAB to add):</label>
        <input type="text" name="edit-task" @keydown.tab.prevent="addTask" v-model="another">
      </div>
      <div class="field center-align">
        <p v-if="feedback" class = "red-text">{{feedback}}</p>
        <button class="btn pink">Update Todolist</button>
      </div>
    </form>
  </div>
  </div>
</template>

<script>
import db from '@/firebase/init'
import slugify from 'slugify'

export default {
  name: 'EditTodolist',
  data () {
      return {
        todolist:null,
        another:null,
        feedback:null
      }
  },

  methods: {
    EditTodolist(){
      if (this.todolist.title) {
        if (this.todolist.tasks[0] == null) {
          this.todolist.tasks.push('NO TASKS ADDED YET')
        }
        this.feedback = null
        // create a slug
        this.todolist.slug = slugify(this.todolist.title, {
          replacement: '-',
          remove: /[$*_+~.()'"!\-:@]/g,
          lower: true })

        db.collection('todolists').doc(this.todolist.id).update({
          title:this.todolist.title,
          tasks:this.todolist.tasks,
          slug: this.todolist.slug
        })
        .then(()=>{
          // redirect to main page
          this.$router.push({name:'Index'})
      }).catch(err => console.log(err))
      }else {
        this.feedback = ' you must enter a todolist title'
      }
    },
    addTask(){
      // check if  another is not null
      if (this.another) {
        this.todolist.tasks.push(this.another)
        this.another = null
        this.feedback = null
          }
          else {
            this.feedback = "Enter a valid task"
          }
    },
    deleteTask(task){
      this.todolist.tasks = this.todolist.tasks.filter(taskItem => {
      return task != taskItem
      })
    }
  },
  created (){
    let ref = db.collection('todolists').where('slug','==',this.$route.params.todolist_slug);
    ref.get().then(snapshot => {
        snapshot.forEach(doc => {
          this.todolist = doc.data();
          this.todolist.id = doc.id // create explicitlly an id for the doc selected


        })
    })
  }
}
</script>

<style>
.edit-todolist{
  margin-top: 60px;
  padding: 20px;
  max-width: 500px;
}
.edit-todolist h2{
  font-size: 2em;
  margin: 20px auto;
}
.edit-todolist .field{
  margin: 20px auto;
  position: relative;

}
.edit-todolist .deletee{
  position: absolute;
  right: 0;
  bottom: 16px;
  color: #aaa;
  font-size: 1.4em;
  cursor: pointer;
}
</style>
