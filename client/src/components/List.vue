<template>
  <div class="list border col-4">
    <h1>--Hi--</h1>
    <h1>{{listProp.title}}</h1>
    <div class="row">
      <!-- <Task v-for="task in tasks" :taskProp="task" :key="task._id" /> -->
    </div>
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
  props: ["listProp", "boardProp"],
  methods: {
    deleteList() {
      this.$store.dispatch("deleteList", this.listProp._id);
    }
  },
  mounted() {
    this.$store.dispatch("getTasks", this.listProp._id);
  },
  components: {}
};
</script>

<style scoped>
</style>
