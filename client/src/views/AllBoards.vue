<template>
  <div class="boards text-light">
    <h2 class="transparent-bg">WELCOME TO THE BOARDS!!!</h2>
    <form @submit.prevent="addBoard">
      <input class="badge-pill" type="text" placeholder="title" v-model="newBoard.title" required />
      <input
        class="badge-pill"
        type="text"
        placeholder="description"
        v-model="newBoard.description"
      />
      <button class="badge badge-pill btn-success" type="submit">Create Board</button>
    </form>
    <div v-for="board in boards" :key="board._id">
      <div class="my-1 link badge badge-pill badge-primary text-light">
        <router-link
          class="link"
          :to="{name: 'board', params: { boardId: board._id }}"
        >{{board.title}}</router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "boards",
  mounted() {
    this.$store.dispatch("getBoards");
  },
  data() {
    return {
      newBoard: {
        title: "",
        description: "",
        collabs: []
      }
    };
  },
  computed: {
    boards() {
      return this.$store.state.boards;
    }
  },
  methods: {
    addBoard() {
      this.$store.dispatch("addBoard", this.newBoard);
      this.newBoard = { title: "", description: "" };
    }
  }
};
</script>

<style scoped>
.link {
  color: #f8f9fa;
  height: 30px;
  font-size: 20px;
}
</style>