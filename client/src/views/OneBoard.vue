<template>
  <div class="board container-fluid">
    <h1>{{board.title}}</h1>
    <button class="btn btn-danger" @click="deleteBoard">Delete Board</button>
    <button class="btn btn-primary ml-5" @click="rerout">Back</button>
    <div class="row">
      <List v-for="list in lists" :listProp="list" :key="list._id" />
    </div>
    <button class="btn btn-success" @click="createListModal">Create List</button>
    <br />
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
    rerout() {
      this.$router.push("/boards");
    },
    deleteBoard() {
      let confirmed = swal
        .fire({
          text: "Are you sure? This action cannot be undone!",
          showCancelButton: true
        })
        .then(res => {
          if (res.value) {
            this.$store.dispatch("deleteBoard", this.boardId);
          }
        });
    },
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
