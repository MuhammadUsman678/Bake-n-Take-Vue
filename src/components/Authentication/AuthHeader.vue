<template>
  <div>
    <header>
      <nav class="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
        <router-link class="navbar-brand" to="/auth/home">Bake'n Take</router-link>
        <button
          class="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarCollapse"
          aria-controls="navbarCollapse"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarCollapse">
          <ul class="navbar-nav mr-auto">
            <li class="nav-item">
              <router-link class="nav-link" to="/">Home</router-link>
            </li>
            <li class="nav-item" v-show="!user">
              <router-link class="nav-link" to="/auth/login">Login</router-link>
            </li>
            <li class="nav-item" v-show="!user">
              <router-link class="nav-link" to="/auth/register"
                >Register</router-link
              >
            </li>
            <li class="nav-item" v-show="user">
              <a class="nav-link" href="#" @click="logout">Logout</a>
            </li>
          </ul>
        </div>
      </nav>
    </header>

    <main role="main" class="container">
      <router-view />
    </main>
  </div>
</template>



<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name:"AuthHeader",
  computed: {
    ...mapGetters("auth", ["user",'is_authenticated'])
  },
  mounted() {
    
    if (this.is_authenticated) {
      this.getUserData();
    }

  },
  methods: {
    ...mapActions("auth", ["sendLogoutRequest", "getUserData"]),
    logout() {
      this.sendLogoutRequest();
      this.$router.push("/");
    }
  }
};
</script>
<style>
body > div > .container {
  padding: 60px 15px 0;
}
</style>