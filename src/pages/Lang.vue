<template>
    <router-view/>
</template>

<script>
    export default {
        name: "Lang",

        mounted() {
            const lang = this.$route.params.lang;

            document.querySelector("html").setAttribute('lang', lang);

            if (lang === 'af') {
                this.$store.commit('setDirection', 'rtl')
            }

            switch (lang) {
                case 'en':
                case 'af':
                    this.$i18n.locale = lang;
            }
        },
    }
</script>
