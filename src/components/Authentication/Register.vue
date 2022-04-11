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
                                            <h3 class="sb-mb-30">Register</h3>
                                            <form id="form">
                                                <div class="row">
                                                    <div class="col-lg-12">
                                                        <div class="sb-group-input">
                                                            <input type="text" name="name" class="form-control" :class="{ 'is-invalid': errors.name }" id="name" v-model="details.name" placeholder="Enter Full Name">
                                                            <span class="sb-bar"></span>
                                                            <label>Full Name</label>
                                                            <div class="invalid-feedback" v-if="errors.name">
                                                                {{ errors.name[0] }}
                                                            </div>
                                                        </div>
                                                    </div>
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
                                                    <div class="col-lg-12 mt-1">
                                                        <div class="sb-group-input">
                                                            <input type="password" name="password_confirmation" class="form-control" :class="{ 'is-invalid': errors.password_confirmation }" id="password_confirmation" v-model="details.password_confirmation" placeholder="Password Confirmation">
                                                            <span class="sb-bar"></span>
                                                            <label>Confirm Password</label>
                                                            <div class="invalid-feedback" v-if="errors.password_confirmation">
                                                                {{ errors.password_confirmation[0] }}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <!-- button -->
                                                <button v-if="!loading" type="button" class="sb-btn sb-cf-submit sb-show-success" @click="register">
                                                    <span class="sb-icon">
                                                        <img src="/src/assets/img/ui/icons/arrow.svg" alt="icon">
                                                    </span>
                                                    <span>Register</span>
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
import { defineComponent } from 'vue'
import { useHead } from '@vueuse/head';
import { Notyf } from 'notyf';
// Create an instance of Notyf
const notyf = new Notyf({duration:3000});

export default defineComponent({
    name: "Register",
    components: {
        Master,
    },
    data: function () {
        return {
            loading: false,
            details: {
                name: null,
                email: null,
                password: null,
                password_confirmation: null
            }
        };
    },
    setup() {
    useHead({
      title: "Register - Bake'n Take"
    })
  },
    computed: {
        ...mapGetters(["errors"])
    },
    mounted() {
        this.$store.commit("setErrors", {});
    },
    methods: {
        ...mapActions("auth", ["sendRegisterRequest"]),
        register: function () {
            this.loading = true
              const response = this.sendRegisterRequest(this.details).then(() => {
                    this.loading = false
                    notyf.success("Register SuccessFully!.");
                    notyf.success('We have sent you a email please verify your email');
                    this.$router.push({
                        name: "Home"
                    });
                }).catch(error => {
                this.loading = false
            });
        }
    }
});
</script>
