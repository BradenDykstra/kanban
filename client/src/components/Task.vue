<template>
  <div class="task" v-if="taskProp.listId == listProp._id">
    <div class="row d-flex border justify-content-between">
      <h4>{{taskProp.body}}</h4>
      <span class="text-danger mt-1 mt-1" @click="deleteTask()">X</span>
    </div>
    <Comment
      v-for="comment in comments"
      :commentProp="comment"
      :taskProp="taskProp"
      :key="comment._id"
    />
    <div class="row d-flex justify-content-center">
      <span class="text-success" @click="addComment()">+</span>
    </div>
  </div>
</template>

<script>
import Comment from "./Comment";
import swal from "sweetalert2";
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
      return this.$store.state.comments[this.taskProp._id] || [];
    }
  },
  props: ["taskProp", "listProp"],
  methods: {
    deleteTask() {
      this.$store.dispatch("deleteTask", this.taskProp);
    },
    addComment() {
      swal
        .mixin({
          input: "text",
          confirmButtonText: "Next &rarr;",
          showCancelButton: true
        })
        .queue([
          {
            title: "Commit to a comment!",
            text: "Tell people how you feel about this one!"
          }
        ])
        .then(result => {
          if (result.value) {
            let data = {
              body: result.value[0],
              taskId: this.taskProp._id
            };
            this.$store.dispatch("addComment", data);
          }
        });
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
