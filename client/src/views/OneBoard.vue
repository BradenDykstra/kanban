<template>
  <div class="board text-light">
    <div class="row justify-content-center d-flex transparent-bg border">
      <h1>{{board.title}}</h1>
    </div>
    <div class="row ml-2 neg-top">
      <clock />
    </div>
    <i
      class="fas fa-arrow-alt-circle-left text-primary mx-5"
      @click="rerout"
      title="Back to Boards"
      data-toggle="tooltip"
      data-placement="right"
    ></i>
    <i
      class="fas fa-folder-plus text-success mx-5"
      @click="createListModal"
      title="Create a List"
      data-toggle="tooltip"
      data-placement="right"
    ></i>
    <i
      class="fas fa-dumpster-fire text-danger mx-5"
      @click="deleteBoard"
      title="Delete this Board"
      data-toggle="tooltip"
      data-placement="right"
    ></i>

    <div class="row d-flex justify-content-around">
      <List v-for="list in lists" :listProp="list" :key="list._id" />
    </div>
    <button class="btn btn-primary fixed-bottom collabbtn" @click="addCollab()">Invite Collaborators</button>
  </div>
</template>

<script>
import List from "../components/List.vue";
import swal from "sweetalert2";
import clock from "../components/Clock";
export default {
  name: "board",
  mounted() {
    this.$store.dispatch("getBoards");
    this.$store.dispatch("getLists", this.$route.params.boardId);
    $('[data-toggle="tooltip"]')
      .tooltip({
        trigger: "hover"
      })
      .on("click", function() {
        $(this).tooltip("hide");
      });
  },
  methods: {
    rerout() {
      this.$router.push("/boards");
    },
    deleteBoard() {
      let confirmed = swal
        .fire({
          title: "Are you sure?",
          text: "Do you really want to delete this board?",
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
          showCancelButton: true
        })
        .queue([
          {
            title: "Name Your List",
            text: "List names are dope"
          }
        ])
        .then(result => {
          if (result.value) {
            let data = {
              title: result.value[0],
              boardId: this.boardId
            };
            this.$store.dispatch("addList", data);
          }
        });
    },
    addCollab() {
      swal
        .mixin({
          input: "text",
          confirmButtonText: "Next &rarr;",
          showCancelButton: true
        })
        .queue([
          {
            title: "Enter the email of the collaborator",
            text: "Collaborators are dope"
          }
        ])
        .then(async result => {
          if (result.value) {
            let user = await this.$store.dispatch("getUser", result.value[0]);
            user.data.boardId = this.boardId;
            this.$store.dispatch("addCollab", user.data);
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
  components: { List, clock }
};
</script>

<style>
.neg-top {
  margin-top: -55px;
}

.transparent-bg {
  background-color: rgba(52, 58, 64, 0.4);
}

.collabbtn {
  margin-left: 80%;
}
</style>
