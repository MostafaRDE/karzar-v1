<template>
    <div class="h-100 d-flex align-items-center changer-language z-index-10">
<!--        <a :href="`/${$route.params.lang === 'en' ? 'af' : 'en'}`" class="d-inline-flex text-uppercase">-->
<!--            {{ $route.params.lang === 'en' ? 'af' : 'en' }}-->
<!--        </a>-->
        <div class="position-relative cursor-pointer" style="height: auto">
            <span class="d-flex align-items-center" @click="menuVisibility = !menuVisibility">
                <img :src="currentLanguage.img" :alt="currentLanguage.value" />
                <span class="changer-language--handler-menu d-flex ms-5" :class="{'close' : !menuVisibility}"><svg width="100%" height="100%" viewBox="0 0 25 16"><path fill="#ccc" d="M14.221 1.206l9.585 9.585a2.265 2.265 0 0 1 0 3.195l-.8.801a2.266 2.266 0 0 1-3.194 0l-7.315-7.315-7.315 7.315a2.266 2.266 0 0 1-3.194 0l-.8-.801a2.265 2.265 0 0 1 0-3.195l9.587-9.585a2.24 2.24 0 0 1 1.723-.647 2.247 2.247 0 0 1 1.723.647z"></path></svg></span>
            </span>
            <transition name="fade">
                <ul v-show="menuVisibility" class="position-absolute top-30 start-0">
                    <li v-for="(language, index) of languages" :key="`lang-${index}`" class="m-0">
                        <a v-if="language.key !== $route.params.lang" :href="`/${language.key}`" @click="menuVisibility = false"><img :src="language.img" :alt="language.value" /></a>
                        <a v-else href="javascript:void(0)" @click="menuVisibility = false"><img :src="language.img" :alt="language.value" /></a>
                    </li>
                </ul>
            </transition>
        </div>
    </div>
</template>

<script>
    import i18n from '../../i18n'

    export default {
        name: "ChangeLanguage",

        data: () => ({
            menuVisibility: false,
            languages: [
                {key: 'en', img: require('../../../public/images/public/icons/ic-english.png'), value: i18n.t('glossaries.english')},
                {key: 'fa', img: require('../../../public/images/public/countries/round/ic-iran.svg'), value: i18n.t('glossaries.persian')},
            ]
        }),

        computed: {
            currentLanguage() {
                let lang = this.languages.find(lang => lang.key === this.$route.params.lang);
                return lang || {}
            }
        }
    }
</script>

<style lang="stylus">
    .changer-language
        img
            width 24px
            border solid 2px #ccc
            border-radius 50%
        ul li
            margin-bottom 5px !important
            a
                padding 0 !important
                &:after
                    background-color transparent !important
            img
                border solid 2px #fff
                border-radius 50%
        &--handler-menu
            width 10px
            &.close
                transform scaleY(-1)
</style>
