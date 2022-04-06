<template>
<AuthHeader />
  <div class="verify">
    <div class="alert alert-danger" role="alert" v-if="error">
      {{ error }}
    </div>
    <h1 v-show="!error">Please wait..</h1>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import AuthHeader from './AuthHeader.vue';
export default {
  props: ["hash"],
  components:{
    AuthHeader,
  },
  data() {
    return {
      error: null
    };
  },
  mounted() {
    this.sendVerifyRequest(this.hash)
      .then(() => {
        this.$router.push("/auth/home");
      })
      .catch(error => {
        console.log(error.response);
        this.error = "Error verifying email";
      });
  },
  computed: {
    ...mapGetters("auth", ["user"])
  },
  methods: {
    ...mapActions("auth", ["sendVerifyRequest"])
  }
};
</script>