<template>
   <AuthHeader />
  <div class="home mt-5">
    <div class="alert alert-success" role="alert" v-if="success">
      {{ success }}
    </div>
    <div class="alert alert-danger" role="alert" v-if="error">
      {{ error }}
    </div>
    <h2 v-if="!user">Welcome, please log in or register</h2>
    <h2 v-else-if="!user.email_verified_at">
      Hello, {{ user.name }}! Registration successful, please check your inbox
      and click confirmation link. If you did not receive the email, click
      <a href="#" @click="verifyResend">here</a> to request another
    </h2>
    <h2 v-else>Hello, {{ user.name }}! You're in.</h2>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import AuthHeader from './AuthHeader.vue';
export default {
  name: "Home",
  components:{
    AuthHeader,
  },
  data() {
    return {
      success: null,
      error: null
    };
  },
  computed: {
    ...mapGetters("auth", ["user"])
  },
   mounted() {
    if (localStorage.getItem("authToken")) {
      this.getUserData();
    }
  },
  methods: {
    ...mapActions("auth", ["sendVerifyResendRequest","getUserData"]),
    verifyResend() {
      this.success = this.error = null;
      this.sendVerifyResendRequest()
        .then(() => {
          this.success =
            "A fresh verification link has been sent to your email address.";
        })
        .catch(error => {
          this.error = "Error sending verification link.";
          console.log(error.response);
        });
    }
  }
};
</script>