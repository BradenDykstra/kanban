<template>
  <div class="comment col-12 border d-flex justify-content-end">
    <p>
      {{commentProp.body}}
      <i
        @click="deleteComment"
        class="fas fa-times text-danger ml-1 mt-1"
        title="Delete this Comment"
        data-toggle="tooltip"
        data-placement="right"
      ></i>
    </p>
  </div>
</template>

<script>
import swal from "sweetalert2";

export default {
  name: "Comment",
  computed: {
    comments() {
      return this.$store.state.comments;
    },
    tasks() {
      return this.$store.state.tasks;
    }
  },
  props: ["taskProp", "commentProp"],
  methods: {
    deleteComment() {
      let confirmed = swal
        .fire({
          title: "Are you sure?",
          text: "Do you really want to delete this comment?",
          showCancelButton: true
        })
        .then(res => {
          if (res.value) {
            this.$store.dispatch("deleteComment", this.commentProp);
          }
        });
    }
  },
  mounted() {
    $('[data-toggle="tooltip"]').tooltip({
      trigger: "hover"
    });
  }
};
</script>

<style scoped>
</style>
