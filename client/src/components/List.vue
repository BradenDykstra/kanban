<template>
  <div class="list border col-4">
    <h1>--Hi--</h1>
    <h1>{{listProp.title}}</h1>
    <Task v-for="task in tasks" :taskProp="task" :listProp="listProp" :key="task._id" />
    <button class="btn btn-danger" @click="deleteList">Delete List</button>
  </div>
</template>

<script>
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
