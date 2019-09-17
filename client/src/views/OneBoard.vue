<template>
  <div class="board">
    <h1>{{board.title}}</h1>
    <List v-for="list in lists" :listProp="list" :key="list._id" />
    <button class="btn btn-primary" @click="createListModal">Create List</button>
  </div>
</template>

<script>
import List from "../components/List.vue";
import swal from "sweetalert2";
export default {
  name: "board",
  mounted() {
    this.$store.dispatch("getBoards");
    this.$store.dispatch("getLists", this.boardId);
  },
  methods: {
    createListModal() {
      swal
        .mixin({
          input: "text",
          confirmButtonText: "Next &rarr;",
          showCancelButton: true,
          progressSteps: ["1"]
        })
        .queue([
          {
            title: "Name Your List",
            text: "List names are dope"
          }
        ])
        .then(result => {
          if (result.value) {
            swal.fire({
              title: "All done!",
              html:
                "Your answers: <pre><code>" +
                JSON.stringify(result.value) +
                "</code></pre>",
              confirmButtonText: "Lovely!"
            });
            let data = {
              title: result.value[0],
              boardId: this.boardId
            };
            this.$store.dispatch("addList", data);
          }
        });
    }
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
