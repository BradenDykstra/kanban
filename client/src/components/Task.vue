<template>
  <div class="task row border" v-if="taskProp.listId == listProp._id">
    <h1>--Task--</h1>
    <h1>{{taskProp.body}}</h1>
    <button class="btn btn-danger" @click="deleteTask">Delete Task</button>
  </div>
</template>

<script>
export default {
  name: "Task",
  computed: {
    tasks() {
      return this.$store.state.tasks;
    },
    lists() {
      return this.$store.state.lists;
    }
  },
  props: ["taskProp", "listProp"],
  methods: {
    deleteTask() {
      this.$store.dispatch("deleteTask", this.taskProp._id);
    }
  }
};
</script>

<style scoped>
</style>
