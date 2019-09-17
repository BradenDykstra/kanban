<template>
  <div class="comment row border" v-if="commentProp.listId == listProp._id">
    <h5>{{commentProp.body}}</h5>
    <span class="text-danger ml-1 mt-1" @click="deleteComment">X</span>
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
