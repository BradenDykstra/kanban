<template>
  <div class="task border col-4">
    <h1>--Hi--</h1>
    <h1>{{taskProp.title}}</h1>
    <button class="btn btn-danger" @click="deleteTask">Delete Task</button>
  </div>
</template>

<script>
export default {
  name: "Task",
  computed: {
    tasks() {
      return this.$store.state.tasks;
    }
  },
  props: ["taskProp"],
  methods: {
    deleteTask() {
      this.$store.dispatch("deleteTask", this.taskProp._id);
    }
  }
};
</script>

<style scoped>
</style>
