<template>
  <drag class="drag" :transferData="{ _id: taskProp._id,
        oldListId: taskProp.listId}">
    <div class="task" v-if="taskProp.listId == listProp._id">
      <div class="card text-dark">
        <div class="card-body">
          <div class="row d-flex justify-content-center align-content-center">
            <h4>{{taskProp.body}}</h4>
          </div>
          <div class="row d-flex justify-content-center">
            <i
              @click="addComment()"
              class="text-success fas fa-comments mx-4"
              title="Add a Comment"
              data-toggle="tooltip"
              data-placement="right"
            ></i>
            <i
              class="text-danger fas fa-trash-alt mx-4"
              @click="deleteTask()"
              title="Delete this Task"
              data-toggle="tooltip"
              data-placement="right"
            ></i>
          </div>
        </div>
      </div>

      <Comment
        class="rounded"
        v-for="comment in comments"
        :commentProp="comment"
        :taskProp="taskProp"
        :key="comment._id"
      />
      <div class="row d-flex justify-content-center"></div>
    </div>
  </drag>
</template>

<script>
import { Drag, Drop } from "vue-drag-drop";
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
              boardId: this.taskProp.boardId,
              listId: this.taskProp.listId
            };
            this.$store.dispatch("addComment", data);
          }
        });
    }
  },
  mounted() {
    $('[data-toggle="tooltip"]').tooltip();
    this.$store.dispatch("getComments", this.taskProp._id);
  },
  components: {
    Comment,
    Drag,
    Drop
  }
};
</script>

<style scoped>
.badge {
  height: 20px;
}
/* .dropdown-menu {
  background-color: #343a40;
} */
</style>
