<template>
    <router-view/>
</template>

<script>
    export default {
        name: "Lang",

        mounted() {
            const lang = this.$route.params.lang;
            document.querySelector("html").setAttribute('lang', lang);
        },
    }
</script>
