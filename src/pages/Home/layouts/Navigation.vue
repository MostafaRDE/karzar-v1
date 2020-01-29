<template>
    <div class="container-fluid navbar-parent px-0">

        {{ /* Start Desktop navigations */ }}
        <nav v-if="responsiveObject.sizes.lg <= width"
             class="navbar d-none d-lg-flex px-lg-20 px-xl-30 z-index-1 application-background-color"
             style="box-shadow: 0 5px 10px 0 rgba(0, 0, 0, 0.35)"
             id="main--navbar">

            {{ /* Start first part menu */ }}
            <div class="d-flex justify-content-space-between flex-grow-1">

                {{ /* Start search part */ }}
                <div class="h-100 d-flex align-items-center">
                    <a :href="`/${$route.params.lang === 'en' ? 'af' : 'en'}`" class="d-inline-flex text-uppercase">
                        {{ $route.params.lang === 'en' ? 'af' : 'en' }}
                    </a>
                </div>
                {{ /* End search part */ }}

                {{ /* Start first menu */ }}
                <div class="position-relative h-100 pe-20 ps-40 pe-lg-20 ps-lg-30 main--navbar--menu">

                    {{ /* First polygon menu */ }}
                    <div class="main--navbar--menu-polygon" id="main--navbar--first-menu-polygon"></div>

                    {{ /* Start social networks */ }}
                    <div class="d-flex justify-content-center align-items-center" id="main--navbar--social-links">
                        <div class="ms-25">
                            <span class="font-size-sm">{{ `${$t('glossaries.your_balance')}: ${moneyFormatFast($store.state.balance, 2)}$` }}</span>
                        </div>
                    </div>
                    {{ /* End social networks */ }}

                    {{ /* Start first part main menu */ }}
                    <div class="main--navbar--main-menu">
                        <div class="z-index-1">
                            <ul class="d-flex">
                                <li v-for="item of menu.first" class="px-5 px-xl-15">
                                    <router-link :to="item.to"><span>{{ item.label }}</span></router-link>
                                </li>
                            </ul>
                        </div>
                    </div>
                    {{ /* End first part main menu */ }}

                </div>
                {{ /* End first menu */ }}

            </div>
            {{ /* End first part menu */ }}

            {{ /* Start logo */ }}
            <div class="z-index-1">
                <div>
                    <router-link :to="{name: 'home', params: {lang: $route.params.lang}}">
                        <img :src="logoUrl"
                             alt="logo"/>
                    </router-link>
                </div>
            </div>
            {{ /* End logo */ }}

            {{ /* Start second part menu */ }}
            <div class="d-flex justify-content-space-between flex-grow-1">

                {{ /* Start second menu */ }}
                <div class="position-relative h-100 ps-20 pe-40 ps-lg-20 pe-lg-30 main--navbar--menu">

                    {{ /* Second polygon menu */ }}
                    <div class="main--navbar--menu-polygon" id="main--navbar--second-menu-polygon"></div>

                    {{ /* Start about */ }}
                    <div class="d-flex justify-content-center align-items-center" id="main--navbar--about">
                        <div class="me-25">
                            <span class="font-size-sm">follow us on:</span>
                        </div>
                        <div class="z-index-1">
                            <ul class="d-flex">
                                <li v-for="item of socialNetworks" class="mx-10">
                                    <a :href="item.to" target="_blank" rel="nofollow" :title="item.label"><i
                                            :class="item.icon"></i></a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    {{ /* End about */ }}

                    {{ /* Start second part main menu */ }}
                    <div class="main--navbar--main-menu">
                        <div class="z-index-1">
                            <ul class="d-flex">
                                <li v-for="item of menu.second" class="px-5 px-xl-15">
                                    <router-link :to="item.to"><span>{{ item.label }}</span></router-link>
                                </li>
                            </ul>
                        </div>
                    </div>
                    {{ /* End second part main menu */ }}

                </div>
                {{ /* End second menu */ }}

                {{ /* Start side area opener part */ }}
                <div class="h-100 d-flex align-items-center">
                    <a href="javascript:void(0)" class="d-inline-flex side-area-opener" @click="model=true">
                        <icon-side-area-opener fill="#fff" size="23px"/>
                    </a>
                </div>
                {{ /* End side area opener part */ }}

            </div>
            {{ /* End second part menu */ }}

        </nav>

        <transition name="slide-down-up-fade">
            <nav v-if="responsiveObject.sizes.lg <= width && stickyHeader"
                 class="navbar position-fixed top-0 d-none d-lg-flex px-lg-20 px-xl-30 z-index-1 application-background-color border-bottom"
                 id="main--navbar--sticky-header">

                {{ /* Start first part menu */ }}
                <div class="d-flex justify-content-space-between flex-grow-1">

                    {{ /* Start search part */ }}
                    <div class="h-100 d-flex align-items-center">
                        <a :href="`/${$route.params.lang === 'en' ? 'af' : 'en'}`" class="d-inline-flex text-uppercase">
                            {{ $route.params.lang === 'en' ? 'af' : 'en' }}
                        </a>
                    </div>
                    {{ /* End search part */ }}

                    {{ /* Start first menu */ }}
                    <div class="position-relative h-100 pe-30 ps-50 pe-xl-40 ps-xl-70 main--navbar--menu">

                        {{ /* Start first part main menu */ }}
                        <div class="main--navbar--main-menu">
                            <div class="z-index-1">
                                <ul class="d-flex">
                                    <li v-for="item of menu.first" class="px-5 px-xl-15">
                                        <router-link :to="item.to" class="px-15"><span>{{ item.label }}</span>
                                        </router-link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        {{ /* End first part main menu */ }}

                    </div>
                    {{ /* End first menu */ }}

                </div>
                {{ /* End first part menu */ }}

                {{ /* Start logo */ }}
                <div class="z-index-1">
                    <div>
                        <router-link :to="{name: 'home', params: {lang: $route.params.lang}}">
                            <img itemprop="image"
                                 :src="logoUrl"
                                 alt="logo"/>
                        </router-link>
                    </div>
                </div>
                {{ /* End logo */ }}

                {{ /* Start second part menu */ }}
                <div class="d-flex justify-content-space-between flex-grow-1">

                    {{ /* Start second menu */ }}
                    <div class="position-relative h-100 pe-50 ps-30 pe-xl-70 ps-xl-40 main--navbar--menu">

                        {{ /* Start second part main menu */ }}
                        <div class="main--navbar--main-menu">
                            <div class="z-index-1">
                                <ul class="d-flex">
                                    <li v-for="item of menu.second" class="px-5 px-xl-15">
                                        <router-link :to="item.to" class="px-15"><span>{{ item.label }}</span>
                                        </router-link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        {{ /* End second part main menu */ }}

                    </div>
                    {{ /* End second menu */ }}

                    {{ /* Start side area opener part */ }}
                    <div class="h-100 d-flex align-items-center">
                        <a href="javascript:void(0)" class="d-inline-flex side-area-opener" @click="model=true">
                            <icon-side-area-opener fill="#fff" size="23px"/>
                        </a>
                    </div>
                    {{ /* End side area opener part */ }}

                </div>
                {{ /* End second part menu */ }}

            </nav>
        </transition>
        {{ /* End Desktop navigations */ }}

        {{ /* -------------------------------------------------------------------------------- */ }}
        {{ /* -------------------------------------------------------------------------------- */ }}
        {{ /* -------------------------------------------------------------------------------- */ }}

        {{ /* Start mobile navigations */ }}
        <nav v-if="responsiveObject.sizes.lg > width"
             class="application-background-color main--navbar--mobile"
             style="box-shadow: 0 5px 10px 0 rgba(0, 0, 0, 0.35)">

            <div class="border-bottom px-25 px-sm-35 px-md-65">

                {{ /* Start search part */ }}
                <div class="h-100 d-flex align-items-center">
                    <a :href="`/${$route.params.lang === 'en' ? 'af' : 'en'}`" class="d-inline-flex text-uppercase font-weight-900">
                        {{ $route.params.lang === 'en' ? 'af' : 'en' }}
                    </a>
                </div>
                {{ /* End search part */ }}

                {{ /* Start logo */ }}
                <div>
                    <router-link :to="{name: 'home', params: {lang: $route.params.lang}}">
                        <img :src="logoUrl"
                             alt="logo"/>
                    </router-link>
                </div>
                {{ /* End logo */ }}

                {{ /* Start side area opener part */ }}
                <div class="h-100 d-flex align-items-center">
                    <a href="javascript:void(0)"
                       class="d-inline-flex side-area-opener"
                       :class="{'active' : isShowMenuMobile}"
                       @click="isShowMenuMobile = !isShowMenuMobile">
                        <icon-side-area-opener fill="#fff" size="23px"/>
                    </a>
                </div>
                {{ /* End side area opener part */ }}

            </div>

            <div class="border-bottom px-25 px-sm-35 px-md-65 overflow-hidden">
                <transition name="slide-down-up-250px">
                    <ul v-if="isShowMenuMobile">
                        <li class="border-bottom" v-for="item of menu.first">
                            <router-link :to="item.to">{{ item.label }}</router-link>
                        </li>
                        <li class="border-bottom" v-for="item of menu.second">
                            <router-link :to="item.to">{{ item.label }}</router-link>
                        </li>
                    </ul>
                </transition>
            </div>

        </nav>

        <transition name="slide-down-up-fade">
            <nav v-if="responsiveObject.sizes.lg > width && stickyHeader"
                 class="application-background-color main--navbar--mobile position-fixed left-0 right-0 top-0">

                <div class="border-bottom px-25 px-sm-35 px-md-65">

                    {{ /* Start search part */ }}
                    <div class="h-100 d-flex align-items-center">
                        <a :href="`/${$route.params.lang === 'en' ? 'af' : 'en'}`" class="d-inline-flex text-uppercase font-weight-900">
                            {{ $route.params.lang === 'en' ? 'af' : 'en' }}
                        </a>
                    </div>
                    {{ /* End search part */ }}

                    {{ /* Start logo */ }}
                    <div>
                        <router-link :to="{name: 'home', params: {lang: $route.params.lang}}">
                            <img :src="logoUrl"
                                 alt="logo"/>
                        </router-link>
                    </div>
                    {{ /* End logo */ }}

                    {{ /* Start side area opener part */ }}
                    <div class="h-100 d-flex align-items-center">
                        <a href="javascript:void(0)"
                           class="d-inline-flex side-area-opener"
                           :class="{'active' : isShowMenuMobile}"
                           @click="isShowMenuMobile = !isShowMenuMobile">
                            <icon-side-area-opener fill="#fff" size="23px"/>
                        </a>
                    </div>
                    {{ /* End side area opener part */ }}

                </div>

                <div class="border-bottom px-25 px-sm-35 px-md-65 overflow-hidden">
                    <transition name="slide-down-up-250px">
                        <ul v-if="isShowMenuMobile">
                            <li class="border-bottom" v-for="item of menu.first">
                                <router-link :to="item.to">{{ item.label }}</router-link>
                            </li>
                            <li class="border-bottom" v-for="item of menu.second">
                                <router-link :to="item.to">{{ item.label }}</router-link>
                            </li>
                        </ul>
                    </transition>
                </div>

            </nav>
        </transition>
        {{ /* End mobile navigations */ }}

    </div>
</template>

<script>
    import i18n from '../../../i18n'
    import ResponsiveObject from "../../../modules/objects/Responsive"

    export default {
        name: "Navigation",

        model: {
            prop: 'isActiveMainSideMenu',
        },

        props: ['isActiveMainSideMenu'],

        components: {
            'icon-search': () => import('../../../components/icons/IconSearch.vue'),
            'icon-side-area-opener': () => import('../../../components/icons/IconSideAreaOpener.vue'),
        },

        data() {
            return {
                logoUrl: '/public/images/public/logos/logo.svg',

                stickyHeader: false,
                isShowMenuMobile: false,

                width: 0,
                responsiveObject: ResponsiveObject,

                menu: {
                    first: [
                        {
                            label: i18n.t('glossaries.home'),
                            to: {name: 'home', params: {lang: this.$route.params.lang}},
                        },
                        {
                            label: i18n.t('glossaries.account'),
                            to: {name: 'dashboardTournaments', params: {lang: this.$route.params.lang}},
                        },
                        {
                            label: i18n.t('glossaries.tutorials'),
                            to: {name: 'tutorials', params: {lang: this.$route.params.lang}},
                        },
                    ],
                    second: [
                        {
                            label: i18n.t('glossaries.blog'),
                            to: '/c',
                        },
                        {
                            label: i18n.t('glossaries.shop'),
                            to: '/d',
                        },
                        {
                            label: i18n.t('glossaries.about'),
                            to: {name: 'about', params: {lang: this.$route.params.lang}},
                        },
                    ],
                },

                socialNetworks: [
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
        },

        mounted() {
            this.handleResize();
            this.handleScroll();

            window.addEventListener('resize', this.handleResize);
            window.addEventListener('scroll', this.handleScroll);
        },

        computed: {
            model: {
                get() {
                    return this.isActiveMainSideMenu
                },
                set(isActiveMainSideMenu) {
                    this.$emit('input', isActiveMainSideMenu)
                }
            }
        },

        methods: {
            handleResize() {
                this.width = window.innerWidth
            },
            handleScroll() {
                this.stickyHeader = window.scrollY > window.innerHeight;
                this.model = false
            },
        },

        destroyed() {
            window.removeEventListener('resize', this.handleResize);
            window.removeEventListener('scroll', this.handleScroll);
        },
    }
</script>

<style lang="stylus">
    .main--navbar
        &--menu-polygon
            position absolute
            top 0
            width calc(100% + 40px)
            height 100%

            &:before
                content ''
                position absolute
                top 37%
                width 100%
                border-bottom 1px solid rgba(203, 203, 203, .1)

        &--main-menu
            display flex
            justify-content center
            align-items center
            margin 0
            width auto
            height 63%
            z-index 1

            div
                height 100%
                display flex
                justify-content center
                align-items center

                ul
                    height 100%

                    li
                        display flex
                        margin 0 4px
                        height 100%

                        a
                            position relative
                            width 100%
                            height 100%
                            color #fff
                            font-size 13px
                            font-weight 700
                            line-height 23px
                            letter-spacing .06em
                            text-transform uppercase
                            box-sizing border-box

                            span
                                position relative
                                display block
                                top 50%
                                -webkit-transform translateY(-50%)
                                -moz-transform translateY(-50%)
                                transform translateY(-50%)

                            &:after
                                content ''
                                position absolute
                                bottom 0
                                left 0
                                height 5px
                                width 100%
                                background-color #ff0e1f
                                opacity 0
                                -webkit-transition opacity 1s cubic-bezier(.645, .045, .355, 1)
                                -moz-transition opacity 1s cubic-bezier(.645, .045, .355, 1)
                                transition opacity 1s cubic-bezier(.645, .045, .355, 1)

                                / .ltr &
                                    -webkit-transform skewX(15deg)
                                    -moz-transform skewX(15deg)
                                    transform skewX(15deg)

                                / .rtl &
                                    -webkit-transform skewX(-15deg)
                                    -moz-transform skewX(-15deg)
                                    transform skewX(-15deg)

                            &.active:after
                                opacity 1

                        &:hover
                            a:after
                                opacity 1

        &--mobile
            > div:nth-child(1)
                display flex
                height 70px

                > div:nth-child(2)
                    display flex
                    flex-grow 1
                    justify-content center
                    align-items center

                    img
                        height 42px

            > div:nth-child(2)
                ul li
                    &:last-child
                        border-bottom none !important

                    a
                        position relative
                        display block
                        padding 9px 0
                        margin 0
                        padding-left 4px
                        font-size 13px
                        font-weight 700
                        line-height 23px
                        letter-spacing .06em
                        text-transform uppercase
                        cursor pointer

                        &.active
                            color #ff0e1f


    //--------------------------------------------

    #main--navbar
        height 120px

        //--------------------------------------------

        / .ltr &--first-menu-polygon
            left 0
            border-left 1px solid rgba(203, 203, 203, .1)
            -webkit-transform skewX(15deg)
            -moz-transform skewX(15deg)
            transform skewX(15deg)

            &:before
                left 0

        / .rtl &--first-menu-polygon
            right 0
            border-right 1px solid rgba(203, 203, 203, .1)
            -webkit-transform skewX(-15deg)
            -moz-transform skewX(-15deg)
            transform skewX(-15deg)

            &:before
                right 0

        //--------------------------------------------

        / .ltr &--second-menu-polygon
            right 0
            border-right 1px solid rgba(203, 203, 203, .1)
            -webkit-transform skewX(-15deg)
            -moz-transform skewX(-15deg)
            transform skewX(-15deg)

            &:before
                right 0

        / .rtl &--second-menu-polygon
            left 0
            border-left 1px solid rgba(203, 203, 203, .1)
            -webkit-transform skewX(15deg)
            -moz-transform skewX(15deg)
            transform skewX(15deg)

            &:before
                left 0

        //--------------------------------------------

        &--social-links, &--about
            height 37%

        //--------------------------------------------

        > div:nth-child(2)
            display flex
            justify-content center
            align-items center
            width 245px
            min-width 200px
            height calc(100% + 10px)
            background-image url(/public/images/samples/logo-background-img.jpg)
            -webkit-clip-path polygon(0 0, 100% 0, 81% 100%, 19% 100%)
            clip-path polygon(0 0, 100% 0, 81% 100%, 19% 100%)

            a
                display block
                height 84px

                img
                    height 100%

        //--------------------------------------------

        &--sticky-header
            height 78px
            left 0
            right 0
            top 0

            //--------------------------------------------

            > div:nth-child(2)
                display flex
                justify-content center
                align-items center
                width 202px
                min-width 200px
                height calc(100% + 10px)
                background-image url(/public/images/samples/logo-background-img.jpg)
                -webkit-clip-path polygon(0 0, 100% 0, 81% 100%, 19% 100%)
                clip-path polygon(0 0, 100% 0, 81% 100%, 19% 100%)

                a
                    display block
                    height 56px

                    img
                        height 100%

            //--------------------------------------------

            .main--navbar--main-menu
                height 100%

                ul li span
                    font-size 12px

    //--------------------------------------------

    .main--navbar--mobile
        .side-area-opener
            transform rotateZ(0deg)
            transition all .25s ease-in-out

            &.active
                transition all .25s ease-in-out

                svg [fill]
                    fill #ff0e1f

                /.ltr &
                    transform rotateZ(-90deg)

                /.rtl &
                    transform rotateZ(90deg)

    #main--navbar, #main--navbar--sticky-header
        .side-area-opener
            transform rotateZ(0deg)
            transition all .25s ease-in-out

            &:hover
                transition all .25s ease-in-out

                /.ltr &
                    transform rotateZ(-90deg)

                /.rtl &
                    transform rotateZ(90deg)

    //--------------------------------------------
    //- Responsive
    @media screen and (min-width: 1440px)
        .main--navbar
            &--main-menu
                div ul li a
                    padding-left 30px
                    padding-right 30px

        #main--navbar
            padding-left 45px !important
            padding-right 45px !important

        #main--navbar--sticky-header
            padding-left 65px !important
            padding-right 65px !important
</style>
