<template>
  <div class="task row border" v-if="taskProp.listId == listProp._id">
    <h4>{{taskProp.body}}</h4>
    <span class="text-danger ml-1 mt-1" @click="deleteTask">X</span>
    <Comment
      v-for="comment in comments"
      :commentProp="comment"
      :taskProp="taskProp"
      :key="comment._id"
    />
  </div>
</template>

<script>
import Comment from "./Comment";
export default {
  name: "Task",
  computed: {
    tasks() {
      return this.$store.state.tasks;
    },
    lists() {
      return this.$store.state.lists;
    },
    comments() {
      return this.$store.state.comments;
    }
  },
  props: ["taskProp", "listProp"],
  methods: {
    deleteTask() {
      this.$store.dispatch("deleteTask", this.taskProp);
    }
  },
  mounted() {
    this.$store.dispatch("getComments", this.taskProp._id);
  },
  components: {
    Comment
  }
};
</script>

<style scoped>
</style>
