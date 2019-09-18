<template>
  <div class="task" v-if="taskProp.listId == listProp._id">
    <div class="row d-flex border justify-content-between">
      <h4>{{taskProp.body}}</h4>
      <div class="btn-group">
        <button
          type="button"
          class="badge badge-pill btn-danger dropdown-toggle"
          data-toggle="dropdown"
        >Move Task</button>
        <div class="dropdown-menu">
          <DropdownItem
            v-for="list in lists"
            :listProp="list"
            :taskProp="taskProp"
            :key="list._id"
            class="dropdown-item"
          />
        </div>
      </div>
      <i class="text-danger fas fa-trash-alt" @click="deleteTask()"></i>
    </div>
    <Comment
      v-for="comment in comments"
      :commentProp="comment"
      :taskProp="taskProp"
      :key="comment._id"
    />
    <div class="row d-flex justify-content-center"></div>
    <i @click="addComment()" class="text-success fas fa-plus-circle"></i>
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
