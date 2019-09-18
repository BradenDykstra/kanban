<template>
  <div class="task" v-if="taskProp.listId == listProp._id">
    <div class="card text-dark">
      <div class="card-body">
        <div class="row d-flex justify-content-between align-content-center">
          <h4>{{taskProp.body}}</h4>
        </div>
        <div class="row d-flex justify-content-between">
          <i class="fas fa-arrows-alt text-info" data-toggle="dropdown"></i>

          <div class="dropdown-menu">
            <DropdownItem
              v-for="list in lists"
              :listProp="list"
              :taskProp="taskProp"
              :key="list._id"
              class="dropdown-item"
            />
          </div>

          <i @click="addComment()" class="text-success fas fa-comments"></i>
          <i class="text-danger fas fa-trash-alt" @click="deleteTask()"></i>
        </div>
      </div>
    </div>
    <Comment
      v-for="comment in comments"
      :commentProp="comment"
      :taskProp="taskProp"
      :key="comment._id"
    />
    <div class="row d-flex justify-content-center"></div>
  </div>
</template>

<script>
import DropdownItem from "./DropdownItem";
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
      let confirmed = swal
        .fire({
          title: "Are you sure?",
          text: "This action cannot be undone!",
          showCancelButton: true
        })
        .then(res => {
          if (res.value) {
            this.$store.dispatch("deleteTask", this.taskProp);
          }
        });
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
              taskId: this.taskProp._id,
              boardId: this.taskProp.boardId
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
    Comment,
    DropdownItem
  }
};
</script>

<style scoped>
.badge {
  height: 20px;
}
</style>
