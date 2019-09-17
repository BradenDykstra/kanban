<template>
  <div class="list border col-4">
    <h3>{{listProp.title}}</h3>
    <hr />
    <Task v-for="task in tasks" :taskProp="task" :listProp="listProp" :key="task._id" />
    <button class="btn btn-success" @click="addTask">Add Task</button>
    <button class="btn btn-danger" @click="deleteList">Delete List</button>
  </div>
</template>

<script>
import swal from "sweetalert2";
import Task from "./Task";
export default {
  name: "List",
  computed: {
    list() {
      return this.$store.state.lists;
    },
    tasks() {
      return this.$store.state.tasks[this.listProp._id] || [];
    }
  },
  props: ["listProp", "boardProp"],
  methods: {
    addTask() {
      swal
        .mixin({
          input: "text",
          confirmButtonText: "Next &rarr;",
          showCancelButton: true
        })
        .queue([
          {
            title: "Add a task!",
            text: "Tasks are fun!"
          }
        ])
        .then(result => {
          if (result.value) {
            let data = {
              body: result.value[0],
              listId: this.listProp._id
            };
            this.$store.dispatch("addTask", data);
          }
        });
    },
    deleteList() {
      this.$store.dispatch("deleteList", this.listProp);
    }
  },
  mounted() {
    this.$store.dispatch("getTasks", this.listProp._id);
  },
  components: {
    Task
  }
};
</script>

<style scoped>
</style>
