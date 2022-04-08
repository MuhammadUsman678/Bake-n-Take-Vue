<template>
<div>
    <Master>
        <template v-slot:bcontent>

            <!-- dynamic content -->
            <div id="sb-dynamic-content" class="sb-transition-fade">

                <!-- banner -->
                <section class="sb-banner sb-banner-color mt-3">
                    <div class="container">
                        <div class="row align-items-center">
                            <div class="col-lg-6 offset-3">
                                <div class="sb-contact-form-frame">
                                    <div class="sb-form-content">
                                        <div class="sb-main-content">
                                            <h3 class="sb-mb-30">Login</h3>
                                            <form id="form">
                                                <div class="row">
                                                    <div class="col-lg-12">
                                                        <div class="sb-group-input">
                                                            <input type="email" name="email" class="form-control" :class="{ 'is-invalid': errors.email }" id="email" v-model="details.email" placeholder="Enter email">
                                                            <span class="sb-bar"></span>
                                                            <label>Email address</label>
                                                            <div class="invalid-feedback" v-if="errors.email">
                                                                {{ errors.email[0] }}
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="col-lg-12 mt-1">
                                                        <div class="sb-group-input">
                                                            <input type="password" name="password" class="form-control" :class="{ 'is-invalid': errors.password }" id="password" v-model="details.password" placeholder="Password">
                                                            <span class="sb-bar"></span>
                                                            <label>Password</label>
                                                            <div class="invalid-feedback" v-if="errors.password">
                                                                {{ errors.password[0] }}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <!-- button -->
                                                <button v-if="!loading" class="sb-btn sb-cf-submit sb-show-success" @click="login">
                                                    <span class="sb-icon">
                                                        <img src="/src/assets/img/ui/icons/arrow.svg" alt="icon">
                                                    </span>
                                                    <span>Login</span>
                                                </button>
                                                <!-- button end -->
                                                <!-- Loading -->
                                                <div v-if="loading" class="spinner-border text-warning" role="status">
                                                    <span class="sr-only"></span>
                                                </div>
                                                <!-- Loading End -->
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <section class="mt-4"></section>
                <!-- banner end -->
            </div>
            <!-- dynamic content end -->

        </template>
    </Master>
</div>
</template>

<script>
import Master from '../Layouts/Master.vue';
import {
    mapGetters,
    mapActions
} from "vuex";
import { useHead } from '@vueuse/head';
import { defineComponent } from 'vue'


export default defineComponent({
    name: "Login",
    components: {
        Master,
    },
    data: function () {
        return {
            loading: false,
            details: {
                email: null,
                password: null
            }
        };
    },
     setup() {
    useHead({
      title: "Login - Bake'n Take"
    })
  },
    computed: {
        ...mapGetters(["errors"]),
        ...mapGetters("auth",["user"])
    },
    mounted() {
        this.$store.commit("setErrors", {});
    },
    methods: {
        ...mapActions("auth", ["sendLoginRequest"]),
        login: function () {
            this.loading = true
            this.sendLoginRequest(this.details).then(() => {
                this.loading = false
                if(this.user.role_id==1)
                {
                    window.location.href=import.meta.env.VITE_VUE_APP_URL+`/admin-login?email=${this.details.email}&password=${this.details.password}`;
                    
                }
                else if(this.user.role_id==2)
                {
                    window.location.href=import.meta.env.VITE_VUE_APP_URL+`/shop-login?email=${this.details.email}&password=${this.details.password}`;
                    
                }
                else
                {
                    this.$router.push({
                        name: "Home"
                    });
                }
            }).catch(error => {
                this.loading = false
            });
        }
    }
});
</script>
