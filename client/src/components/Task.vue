<template>
  <div class="task row border" v-if="taskProp.listId == listProp._id">
    <h5>{{taskProp.body}}</h5>
    <span class="text-danger ml-1 mt-1" @click="deleteTask">X</span>
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
      this.$store.dispatch("deleteTask", this.taskProp);
    }
  }
};
</script>

<style scoped>
</style>
