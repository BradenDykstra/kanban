<template>
  <div id="app">
    <router-view />
    <div class="row fixed-top position-absolute right15">
      <div class="col-10"></div>
      <div class="btn-group col-1">
        <button
          type="button"
          class="btn btn-outline-primary dropdown-toggle"
          data-toggle="dropdown"
        >Change Theme</button>
        <div class="dropdown-menu">
          <p class="dropdown-item" @click="changeTheme('defaulttheme.css')">Default</p>
          <p class="dropdown-item" @click="changeTheme('watertheme.css')">Water</p>
          <p class="dropdown-item" @click="changeTheme('leaftheme.css')">Leaves</p>
          <p class="dropdown-item" @click="changeTheme('spacetheme.css')">Space</p>
          <p class="dropdown-item" @click="changeTheme('honeycombtheme.css')">Hexagons</p>
          <p class="dropdown-item" @click="changeTheme('sandtheme.css')">Sand</p>
        </div>
      </div>
    </div>
    <button class="btn btn-danger fixed-bottom" @click="logout()">Logout</button>
  </div>
</template>

<script>
export default {
  name: "App",
  methods: {
    logout() {
      this.$store.dispatch("logout");
      location.reload();
    },
    changeTheme(theme) {
      this.$store.dispatch("changeTheme", theme);
    }
  },
  mounted() {
    this.$store.dispatch("loadTheme");
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

.right15 {
  right: 15px;
}
</style>