<template>
    <footer class="text-white" :style="{background: 'url(/public/images/samples/footer-background-img.jpg) top center / cover'}">
        <div class="container position-relative">
            <div class="d-none d-lg-block footer-bottom-start-inner-border-holder"></div>
            <div class="row">
                <div class="col-12">

                    <div class="main-footer-menu position-relative">
                        <nav>
                            <ul class="pt-20">
                                <li v-for="(item, index) of menu" :key="`footerMenuItem${index}`">
                                    <router-link :to="item.to">{{ item.label }}</router-link>
                                </li>
                            </ul>
                        </nav>
                    </div>

                    <div class="mt-20"></div>

                    <div class="mt-20 d-flex justify-content-center">
                        <a v-for="socialLink of socialNetworks" :href="socialLink.to" rel="nofollow" target="_blank" class="mx-10 z-index-3" style="font-size: 13px">
                            <i :class="socialLink.icon"></i>
                        </a>
                    </div>

                </div>
            </div>
            <div class="d-none d-lg-block footer-bottom-end-inner-border-holder"></div>
        </div>
    </footer>
</template>

<script>
    import i18n from '../../i18n'

    export default {
        name: "Footer",

        data() {
            return {
                menu: [
                    {label: i18n.t('glossaries.home'), to: {name: 'home', params: {lang: this.$route.params.lang}}},
                    {label: i18n.t('glossaries.tournaments'), to: {name: 'dashboardTournaments', params: {lang: this.$route.params.lang}}},
                    {label: i18n.t('glossaries.tutorials'), to: {name: 'tutorials', params: {lang: this.$route.params.lang}}},
                    {label: i18n.t('glossaries.shop'), to: {name: 'shop', params: {lang: this.$route.params.lang}}},
                    {label: i18n.t('glossaries.about_us'), to: {name: 'about', params: {lang: this.$route.params.lang}}},
                ],

                socialNetworks: [
                    {
                        icon: 'fab fa-youtube',
                        label: 'Youtube',
                        to: 'https://www.youtube.com/channel/UCZLw2PdXDnSHr85CDWIBZIw',
                    },
                    {
                        icon: 'fab fa-facebook',
                        label: 'Facebook',
                        to: 'https://www.facebook.com/gametour_official',
                    },
                    {
                        icon: 'fab fa-instagram',
                        label: 'Instagram',
                        to: 'https://www.instagram.com/gametour.co',
                    },
                    {
                        icon: 'fab fa-telegram',
                        label: 'Telegram',
                        to: 'https://t.me/gametour_official',
                    },
                ]
            }
        }
    }
</script>

<style lang="stylus">
    .main-footer-menu
        z-index 22
        ul
            display flex
            justify-content center
            li
                display: inline-block;
                overflow: visible;
                border-bottom: none;
                padding: 27px 0 49px;
                z-index 2
                a
                    position: relative;
                    padding: 30px 32px 50px;
                    font-size: 13px;
                    font-weight: 700;
                    text-transform: uppercase;
                    letter-spacing: .06em;
                    &:after
                        content: '';
                        position: absolute;
                        z-index: 30;
                        bottom: 0;
                        left: 0;
                        height: 5px;
                        width: 100%;
                        background-color: #ff0e1f;
                        opacity: 0;
                        -webkit-transition: opacity 1s cubic-bezier(.645,.045,.355,1);
                        -moz-transition: opacity 1s cubic-bezier(.645,.045,.355,1);
                        transition: opacity 1s cubic-bezier(.645,.045,.355,1);
                        / .ltr &
                            -webkit-transform: skewX(15deg);
                            -moz-transform: skewX(15deg);
                            transform: skewX(15deg);
                        / .rtl &
                            -webkit-transform: skewX(-15deg);
                            -moz-transform: skewX(-15deg);
                            transform: skewX(-15deg);
                    &:hover:after
                        opacity: 1;
                        -webkit-transition: opacity 1s cubic-bezier(.19,1,.22,1);
                        -moz-transition: opacity 1s cubic-bezier(.19,1,.22,1);
                        transition: opacity 1s cubic-bezier(.19,1,.22,1);

    .footer-bottom-start-inner-border-holder
        position: absolute;
        top: 0;
        left: 0;
        width: 105%;
        height: 100%;
        border-left: 1px solid #000;
        -webkit-transform: skewX(15deg);
        -moz-transform: skewX(15deg);
        transform: skewX(15deg);

    .footer-bottom-end-inner-border-holder
        position: absolute;
        top: 0;
        right: 0;
        width: 105%;
        height: 100%;
        border-right: 1px solid #000;
        -webkit-transform: skewX(-15deg);
        -moz-transform: skewX(-15deg);
        transform: skewX(-15deg);

    @media screen and (max-width 1023px)
        .main-footer-menu ul li
            a
                padding 30px 16px 50px;

    @media screen and (max-width 767px)
        .main-footer-menu ul li
            a
                padding 30px 4px 50px;

    @media screen and (max-width 679px)
        .main-footer-menu ul li
            a
                padding 30px 16px 50px;

    @media screen and (min-width 600px)
        .main-footer-menu
            &:after
                content: '';
                width: calc(100% + 8px);
                position: absolute;
                bottom: 0;
                left: -4px;
                border-bottom: 5px solid #000;

    @media screen and (max-width 599px)
        .main-footer-menu ul
            display flex
            flex-direction column
            li
                padding 0
                text-align center
                a
                    display block
                    padding 20px;
</style>
