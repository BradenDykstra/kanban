<template>
  <div class="comment col-12 border d-flex justify-content-end">
    <p>
      {{commentProp.body}}
      <i @click="deleteComment" class="fas fa-times text-danger ml-1 mt-1"></i>
    </p>
  </div>
</template>

<script>
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
      this.$store.dispatch("deleteComment", this.commentProp);
    }
  }
};
</script>

<style scoped>
</style>
