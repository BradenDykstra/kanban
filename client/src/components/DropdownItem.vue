<template>
  <div class="dropdownitem" @click="moveTask()">{{listProp.title}}</div>
</template>


<script>
export default {
  name: "dropdownitem",
  data() {
    return {};
  },
  computed: {},
  props: ["listProp", "taskProp"],
  methods: {
    moveTask() {
      this.$store.dispatch("moveTask", {
        _id: this.taskProp._id,
        oldListId: this.taskProp.listId,
        listId: this.listProp._id
      });
    }
  },
  components: {}
};
</script>


<style scoped>
</style>