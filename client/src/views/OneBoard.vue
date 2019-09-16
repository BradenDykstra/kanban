<template>
  <div class="board">
    <h1>{{board.title}}</h1>
    <List v-for="list in lists" :listProp="list" :key="list._id" />
  </div>
</template>

<script>
import List from "../components/List.vue";
export default {
  name: "board",
  mounted() {
    this.$store.dispatch("getBoards");
    this.$store.dispatch("getLists", this.boardId);
  },
  computed: {
    board() {
      return (
        //FIXME This does not work on page reload because the lists array is empty in the store
        this.$store.state.boards.find(b => b._id == this.boardId) || {
          title: "Loading..."
        }
      );
    },
    lists() {
      return this.$store.state.lists;
    }
  },
  props: ["boardId"],
  components: { List }
};
</script>
