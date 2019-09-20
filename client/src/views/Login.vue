<template>
  <div class="login text-light">
    <div class="row">
      <div class="col-12 space">
        <h1>Welcome to KanBanada</h1>
      </div>
    </div>
    <form v-if="loginForm" @submit.prevent="loginUser">
      <input class="badge-pill" type="email" v-model="creds.email" placeholder="email" />
      <input class="badge-pill" type="password" v-model="creds.password" placeholder="password" />
      <button class="badge-pill btn-success" type="submit">Login</button>
    </form>
    <form v-else @submit.prevent="register">
      <input class="badge-pill" type="text" v-model="newUser.name" placeholder="name" />
      <input class="badge-pill" type="email" v-model="newUser.email" placeholder="email" />
      <input class="badge-pill" type="password" v-model="newUser.password" placeholder="password" />
      <button class="badge-pill btn-warning" type="submit">Create Account</button>
    </form>
    <div class="action" @click="loginForm = !loginForm">
      <p v-if="loginForm">No account? Click here to Register</p>
      <p v-else>Already have an account? Click here to Login</p>
    </div>
  </div>
</template>

<script>
import router from "@/router.js";
export default {
  name: "login",
  data() {
    return {
      loginForm: true,
      creds: {
        email: "",
        password: ""
      },
      newUser: {
        email: "",
        password: "",
        name: ""
      }
    };
  },
  beforeCreate() {
    if (this.$store.state.user._id) {
      this.$router.push({ name: "boards" });
    }
  },
  methods: {
    register() {
      this.$store.dispatch("register", this.newUser);
    },
    loginUser() {
      this.$store.dispatch("login", this.creds);
    }
  }
};
</script>

<style>
.action {
  cursor: pointer;
}
.space {
  height: 100px;
}
</style>