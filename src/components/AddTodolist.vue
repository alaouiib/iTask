
<template>
  <div class="add-todolist container z-depth-1">
  <h2 class="center-align indigo-text">Add New Todolist</h2>
  <form @submit.prevent="addTodolist">
    <div class="field title">
      <label for="title">todolist title:</label>
      <input type="text" name="title" v-model="title">
    </div>
    <div v-for="(task, index) in tasks" class="field task" :key="index">
       <label for="task">Task:</label>
       <input type="text" name="task" v-model="tasks[index]">
        <i class="material-icons deletee" @click="deleteTask(task)">delete</i>
     </div>
    <div class="field add-task">
      <label for="add-task">Add a task(TAB to add):</label>
      <input type="text" name="add-task" @keydown.tab.prevent="addTask" v-model="another">
    </div>
    <div class="field center-align">
      <p v-if="feedback" class = "red-text">{{feedback}}</p>
      <button class="btn pink">Add Todolist</button>
    </div>
  </form>
</div>
</template>

<script>
import db from '@/firebase/init'
import slugify from 'slugify'
export default {
  name: 'AddTodolist',

  data () {
      return {
        title:null,
        another:null,
        tasks:[],
        feedback: null,
        slug:null
      }
  },

  methods: {
    addTodolist(){
      if (this.title) {
        this.feedback = null
        // check if there is no tasks added
        if (this.tasks[0] == null) {
          this.tasks.push('NO TASKS ADDED YET')
        }
        // create a slug
        this.slug = slugify(this.title, {
          replacement: '-',
          remove: /[$*_+~.()'"!\-:@]/g,
          lower: true })

        db.collection('todolists').add({
          title:this.title,
          tasks:this.tasks,
          slug: this.slug
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
        this.tasks.push(this.another)
        this.another = null
        this.feedback = null
          }
          else {
            this.feedback = "Enter a valid task"
          }
    },
    deleteTask(task){
      this.tasks = this.tasks.filter(taskItem => {
      return   task != taskItem
      })
    }

  }
}
</script>

<style>
.add-todolist{
  margin-top: 60px;
  padding: 20px;
  max-width: 500px;
}
.add-todolist h2{
  font-size: 2em;
  margin: 20px auto;
}
.add-todolist .field{
  margin: 20px auto;
  position: relative;

}
.add-todolist .deletee{
  position: absolute;
  right: 0;
  bottom: 16px;
  color: #aaa;
  font-size: 1.4em;
  cursor: pointer;
}
</style>
