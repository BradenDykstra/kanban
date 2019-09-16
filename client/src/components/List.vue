<template>
  <div class="list">
    <h1>--Hi--</h1>
    <h1>{{listProp.title}}</h1>
    <h1>{{listProp.boardId}}</h1>
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
  props: ["listProp"]
};
</script>

<style scoped>
</style>
