<template>
  <div class="task row border">
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
