<template>
<AuthHeader />
  <div class="login mt-5">
    <div class="card">
      <div class="card-header">
        Login
      </div>
      <div class="card-body">
        <form>
          <div class="form-group">
            <label for="email">Email address</label>
            <input
              type="email"
              class="form-control"
              :class="{ 'is-invalid': errors.email }"
              id="email"
              v-model="details.email"
              placeholder="Enter email"
            />
            <div class="invalid-feedback" v-if="errors.email">
              {{ errors.email[0] }}
            </div>
          </div>
          <div class="form-group">
            <label for="password">Password</label>
            <input
              type="password"
              class="form-control"
              :class="{ 'is-invalid': errors.password }"
              id="password"
              v-model="details.password"
              placeholder="Password"
            />
            <div class="invalid-feedback" v-if="errors.password">
              {{ errors.password[0] }}
            </div>
          </div>
          <button  v-if="!loading" type="button" @click="login" class="btn btn-primary">
            Login
          </button>
          <div  v-if="loading" class="spinner-border text-info" role="status">
            <span class="sr-only"></span>
           </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import AuthHeader from './AuthHeader.vue';
export default {
  name: "Login",
  components:{
    AuthHeader,
  },
  data: function() {
    return {
      loading: false,
      details: {
        email: null,
        password: null
      }
    };
  },
  computed: {
    ...mapGetters(["errors"])
  },
  mounted() {
    this.$store.commit("setErrors", {});
  },
  methods: {
    ...mapActions("auth", ["sendLoginRequest"]),
    login: function() {
      this.loading = true
      this.sendLoginRequest(this.details).then(() => {
        this.loading = false
        this.$router.push({ name: "AuthHome" });
      }).catch(error => {
        this.loading = false
      });
    }
  }
};
</script>