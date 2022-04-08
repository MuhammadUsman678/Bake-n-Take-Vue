<template>
<div>
    <Master>
        <template v-slot:bcontent>

            <!-- dynamic content -->
            <div id="sb-dynamic-content" class="sb-transition-fade">

                <!-- banner -->
                <section class="sb-banner">
                    <div class="sb-bg-1">
                        <div></div>
                    </div>
                    <div class="container">
                        <div class="row">
                            <div class="col-lg-6">
                                <!-- main title -->
                                <div class="sb-main-title-frame">
                                    <div class="sb-main-title">
                                        <span class="sb-404">404</span>
                                        <h1 class="sb-mb-30">Oops! Where <br>are we?</h1>
                                        <p class="sb-text sb-text-lg sb-mb-30">Page not Found! The page you are looking for was moved, removed, renamed or might never existed.</p>
                                        <!-- button -->
                                        <router-link to="/" class="sb-btn sb-btn-2">
                                            <span class="sb-icon">
                                                <img src="/src/assets/img/ui/icons/arrow-2.svg" alt="icon">
                                            </span>
                                            <span>Back to homepage</span>
                                        </router-link>
                                        <!-- button end -->
                                    </div>
                                </div>
                                <!-- main title end -->
                            </div>
                            <div class="col-lg-6">
                                <div class="sb-illustration-1-404">
                                    <img src="/src/assets/img/illustrations/man.png" alt="man" class="sb-man">
                                    <div class="sb-cirkle-1"></div>
                                    <div class="sb-cirkle-2"></div>
                                    <div class="sb-cirkle-3"></div>
                                    <div class="sb-cirkle-4"></div>
                                    <div class="sb-cirkle-5"></div>
                                    <img src="/src/assets/img/illustrations/3.svg" alt="phones" class="sb-pik-1">
                                    <img src="/src/assets/img/illustrations/1.svg" alt="phones" class="sb-pik-2">
                                    <img src="/src/assets/img/illustrations/2.svg" alt="phones" class="sb-pik-3">
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <!-- banner end -->
            </div>
            <!-- dynamic content end -->

        </template>
    </Master>
</div>
</template>

<script>
import Master from './Layouts/Master.vue';
export default {
    name: "Page404NotFound",
    components: {
        Master
    }
}
</script>
