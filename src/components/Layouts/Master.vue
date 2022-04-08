<template>
<div>

    <Header />
        <slot name="bcontent"></slot>  
    <Footer />

</div>
</template>

<script>
import Header from './Header.vue';
import Footer from './Footer.vue';

export default {
    name: "Master",
    components: {
        Header,
        Footer,
    }
}
</script>
