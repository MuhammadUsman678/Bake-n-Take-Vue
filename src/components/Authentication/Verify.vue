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
                                            <h3 class="sb-mb-30">Email Verification</h3>
                                            <div class="verify">
                                                <div class="alert alert-danger" role="alert" v-if="error">
                                                    {{ error }}
                                                </div>
                                                <h1 v-show="!error">Please wait..</h1>
                                            </div>
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
import {
    mapGetters,
    mapActions
} from "vuex";
import Master from '../Layouts/Master.vue';
export default {
    props: ["hash"],
    components: {
        Master,
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
