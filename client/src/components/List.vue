<template>
  <div class="list border">
    <h1>--Hi--</h1>
    <h1>{{listProp.title}}</h1>
    <h1>{{listProp.boardId}}</h1>
    <h1>{{listProp._id}}</h1>
    <button class="btn btn-danger" @click="deleteList">Delete List</button>
  </div>
</template>

<script>
export default {
  name: "List",
  computed: {
    list() {
      return this.$store.state.lists;
    }
  },
  props: ["listProp"],
  methods: {
    deleteList() {
      this.$store.dispatch("deleteList", this.listProp._id);
    }
  }
};
</script>

<style scoped>
</style>
