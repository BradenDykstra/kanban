<template>
  <drop
    class="drop list col-3 mx-1 mb-3 pb-3 border"
    @dragover="over = true"
    @dragleave="over = false"
    @drop="moveTask"
  >
    <div class="d-flex justify-content-between">
      <h3 class="mt-1">{{listProp.title}}</h3>
      <i
        class="fas fa-dumpster float-right text-danger mt-3"
        @click="deleteList"
        title="Delete this List"
        data-toggle="tooltip"
        data-placement="right"
      ></i>
    </div>
    <hr class="bg-light" />
    <i
      class="fas fa-pen text-success"
      @click="addTask"
      title="Create a Task"
      data-toggle="tooltip"
      data-placement="right"
    ></i>
    <Task class="my-2" v-for="task in tasks" :taskProp="task" :listProp="listProp" :key="task._id" />
  </drop>
</template>

<script>
import Vue from "vue";
import { Drag, Drop } from "vue-drag-drop";
import swal from "sweetalert2";
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
    addTask() {
      swal
        .mixin({
          input: "text",
          confirmButtonText: "Next &rarr;",
          showCancelButton: true
        })
        .queue([
          {
            title: "Add a task!",
            text: "Tasks are fun!"
          }
        ])
        .then(result => {
          if (result.value) {
            let data = {
              body: result.value[0],
              listId: this.listProp._id,
              boardId: this.listProp.boardId
            };
            this.$store.dispatch("addTask", data);
          }
        });
    },
    moveTask(data) {
      this.$store.dispatch("moveTask", {
        _id: data._id,
        oldListId: data.oldListId,
        listId: this.listProp._id
      });
    },
    deleteList() {
      let confirmed = swal
        .fire({
          title: "Are you sure?",
          text: "This action cannot be undone!",
          showCancelButton: true
        })
        .then(res => {
          if (res.value) {
            this.$store.dispatch("deleteList", this.listProp);
          }
        });
    }
  },
  mounted() {
    this.$store.dispatch("getTasks", this.listProp._id);
  },
  components: {
    Task,
    Drag,
    Drop
  }
};
</script>

<style>
i:hover {
  cursor: pointer;
}
</style>
