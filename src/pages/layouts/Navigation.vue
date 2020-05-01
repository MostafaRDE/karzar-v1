<template>
    <div class="container-fluid navbar-parent px-0">

        {{ /* Start Desktop navigations */ }}
        <nav v-if="responsiveObject.sizes.lg <= width"
             class="navbar d-none d-lg-flex px-lg-40 px-xl-60 z-index-1 application-background-color"
             style="box-shadow: 0 5px 10px 0 rgba(0, 0, 0, 0.35)"
             id="global--navbar">

            {{ /* Start logo */ }}
            <div class="z-index-1">
                <div>
                    <router-link :to="{name: 'home', params: {lang: $route.params.lang}}" exact>
                        <img :src="logoUrl"
                             alt="logo"
                             class="h-100"/>
                    </router-link>
                </div>
            </div>
            {{ /* End logo */ }}

            {{ /* Start Menu */ }}
            <div class="global--navbar--main-menu">
                <div class="z-index-1">
                    <ul class="d-flex">
                        <li v-for="item of menu"
                            class="position-relative"
                            @mouseenter="item.subItemsVisibility = true"
                            @mouseleave="item.subItemsVisibility = false">

                            <template v-if="item.children && item.children.length">

                                <a :href="item.to" class="px-25">
                                    <span>{{ item.label }}</span>
                                </a>

                                <transition name="fade">
                                    <ul v-show="item.subItemsVisibility"
                                        class="global--navbar--sub-menu position-absolute left-0 top-90 px-0 py-20"
                                        style="background: #0F0F0FE6; width: 266px">
                                        <li v-for="(subItem, index) of item.children"
                                            :key="`${item.label}-subItem-${index}`">
                                            <router-link :to="subItem.to"
                                                         class="text-nowrap" :rel="item.rel">
                                                <span><span>{{ subItem.label }}</span></span>
                                            </router-link>
                                        </li>
                                    </ul>
                                </transition>

                            </template>

                            <template v-else>
                                <router-link :to="item.to" class="px-25" :rel="item.rel">
                                    <span>{{ item.label }}</span>
                                </router-link>
                            </template>

                        </li>
                    </ul>

                    {{ /* Start search part */ }}
                    <change-language class="me-20"/>
                    {{ /* End search part */ }}

                    {{ /* Start search part */ }}
                    <div class="h-100 d-flex align-items-center">
                        <a href="javascript:void(0)" class="d-inline-flex" @click="model = true">
                            <icon-side-area-opener fill="#fff" size="23px"/>
                        </a>
                    </div>
                    {{ /* End search part */ }}
                </div>
            </div>
            {{ /* End Menu */ }}

        </nav>

        <transition name="slide-down-up-fade">
            <nav v-if="responsiveObject.sizes.lg <= width && stickyHeader"
                 class="navbar d-none d-lg-flex px-lg-40 px-xl-60 z-index-1 application-background-color position-fixed"
                 style="box-shadow: 0 5px 10px 0 rgba(0, 0, 0, 0.35)"
                 id="global--navbar--sticky-header">

                {{ /* Start logo */ }}
                <div class="z-index-1">
                    <div>
                        <router-link :to="{name: 'home', params: {lang: $route.params.lang}}">
                            <img :src="logoUrl"
                                 alt="logo"
                                 class="h-100"/>
                        </router-link>
                    </div>
                </div>
                {{ /* End logo */ }}

                {{ /* Start Menu */ }}
                <div class="global--navbar--main-menu ms-auto">
                    <div class="z-index-1">
                        <ul class="d-flex">
                            <li v-for="item of menu"
                                class="position-relative"
                                @mouseenter="item.subItemsVisibility = true"
                                @mouseleave="item.subItemsVisibility = false">

                                <template v-if="item.children && item.children.length">

                                    <a :href="item.to" class="px-25">
                                        <span>{{ item.label }}</span>
                                    </a>

                                    <transition name="fade">
                                        <ul v-show="item.subItemsVisibility"
                                            class="global--navbar--sub-menu position-absolute left-0 top-90 px-0 py-20"
                                            style="background: #0F0F0FE6; width: 266px">
                                            <li v-for="(subItem, index) of item.children"
                                                :key="`${item.label}-subItem-${index}`">
                                                <router-link :to="subItem.to"
                                                             class="text-nowrap" :rel="item.rel">
                                                    <span><span>{{ subItem.label }}</span></span>
                                                </router-link>
                                            </li>
                                        </ul>
                                    </transition>

                                </template>

                                <template v-else>
                                    <router-link :to="item.to" class="px-25" :rel="item.rel">
                                        <span>{{ item.label }}</span>
                                    </router-link>
                                </template>

                            </li>
                        </ul>

                        {{ /* Start search part */ }}
                        <change-language class="me-20"/>
                        {{ /* End search part */ }}

                        {{ /* Start search part */ }}
                        <div class="h-100 d-flex align-items-center">
                            <a href="javascript:void(0)" class="d-inline-flex" @click="model = true">
                                <icon-side-area-opener fill="#fff" size="23px"/>
                            </a>
                        </div>
                        {{ /* End search part */ }}
                    </div>
                </div>
                {{ /* End Menu */ }}

            </nav>
        </transition>
        {{ /* End Desktop navigations */ }}

        {{ /* -------------------------------------------------------------------------------- */ }}
        {{ /* -------------------------------------------------------------------------------- */ }}
        {{ /* -------------------------------------------------------------------------------- */ }}

        {{ /* Start mobile navigations */ }}
        <nav v-if="responsiveObject.sizes.lg > width"
             class="application-background-color global--navbar--mobile"
             style="box-shadow: 0 5px 10px 0 rgba(0, 0, 0, 0.35)">

            <div class="border-bottom px-25 px-sm-35 px-md-65">

                {{ /* Start menu part */ }}
                <change-language/>
                {{ /* End menu part */ }}

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

            <div class="border-bottom px-25 px-sm-35 px-md-65 overflow-y-scroll"
                 style="max-height: 250px">
                <transition name="slide-down-up-250px">
                    <ul v-if="isShowMenuMobile">
                        <li class="border-bottom position-relative"
                            v-for="item of menu"
                            @click="item.subItemsVisibility = !item.subItemsVisibility">

                            <template v-if="item.children && item.children.length">

                                <div class="d-flex align-items-center">

                                    <a :href="item.to" class="flex-grow-1">{{ item.label }}</a>

                                    <span class="d-flex">
                                        <mdi-arrow-right
                                                v-if="$route.params.lang === 'fa' || $route.params.lang === 'ar' || $route.params.lang === 'af'"
                                                class="me-5"
                                                size="20px"/>
                                        <mdi-arrow-left v-else class="me-5" size="20px"/>
                                    </span>

                                </div>

                                <transition name="fade">
                                    <ul v-show="item.subItemsVisibility"
                                        class="main--navbar--sub-menu p-0 ms-15"
                                        style="background: #0F0F0FE6">
                                        <li v-for="(subItem, index) of item.children"
                                            :key="`${item.label}-subItem-${index}`">
                                            <router-link :to="subItem.to"
                                                         class="text-nowrap font-weight-100"
                                                         :class="{'border-bottom': index < item.children.length - 1}"
                                                         style="padding: 9px 0; font-size: 11px" :rel="item.rel">
                                                {{ subItem.label }}
                                            </router-link>
                                        </li>
                                    </ul>
                                </transition>

                            </template>

                            <template v-else>
                                <router-link :to="item.to" class="flex-grow-1" :rel="item.rel">{{ item.label }}</router-link>
                            </template>

                        </li>
                    </ul>
                </transition>
            </div>

        </nav>

        <transition name="slide-down-up-fade">
            <nav v-if="responsiveObject.sizes.lg > width && stickyHeader"
                 class="application-background-color global--navbar--mobile position-fixed left-0 right-0 top-0 z-index-10">

                <div class="border-bottom px-25 px-sm-35 px-md-65">

                    {{ /* Start menu part */ }}
                    <change-language/>
                    {{ /* End menu part */ }}

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

                <div class="border-bottom px-25 px-sm-35 px-md-65 overflow-y-scroll"
                     style="max-height: 250px">
                    <transition name="slide-down-up-250px">
                        <ul v-if="isShowMenuMobile">
                            <li class="border-bottom position-relative"
                                v-for="item of menu"
                                @click="item.subItemsVisibility = !item.subItemsVisibility">

                                <template v-if="item.children && item.children.length">

                                    <div class="d-flex align-items-center">

                                        <a :href="item.to" class="flex-grow-1">{{ item.label }}</a>

                                        <span class="d-flex">
                                        <mdi-arrow-right
                                                v-if="$route.params.lang === 'fa' || $route.params.lang === 'ar' || $route.params.lang === 'af'"
                                                class="me-5"
                                                size="20px"/>
                                        <mdi-arrow-left v-else class="me-5" size="20px"/>
                                    </span>

                                    </div>

                                    <transition name="fade">
                                        <ul v-show="item.subItemsVisibility"
                                            class="main--navbar--sub-menu p-0 ms-15"
                                            style="background: #0F0F0FE6">
                                            <li v-for="(subItem, index) of item.children"
                                                :key="`${item.label}-subItem-${index}`">
                                                <router-link :to="subItem.to"
                                                             class="text-nowrap font-weight-100"
                                                             :class="{'border-bottom': index < item.children.length - 1}"
                                                             style="padding: 9px 0; font-size: 11px" :rel="item.rel">
                                                    {{ subItem.label }}
                                                </router-link>
                                            </li>
                                        </ul>
                                    </transition>

                                </template>

                                <template v-else>
                                    <router-link :to="item.to" :rel="item.rel" class="flex-grow-1">{{ item.label }}</router-link>
                                </template>

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
    import i18n from '../../i18n'
    import ResponsiveObject from "../../modules/objects/Responsive"

    export default {
        name: "Navigation",

        model: {
            prop: 'isActiveMainSideMenu',
        },

        props: ['isActiveMainSideMenu'],

        components: {
            'icon-side-area-opener': () => import('../../components/icons/IconSideAreaOpener.vue'),
            'mdi-arrow-left': () => import ('../../components/icons/MaterialDesignIcons/MdiArrowLeft.vue'),
            'mdi-arrow-right': () => import ('../../components/icons/MaterialDesignIcons/MdiArrowRight.vue'),
        },

        data() {
            return {
                logoUrl: '/public/images/public/logos/logo.svg',

                stickyHeader: false,
                isShowMenuMobile: false,

                width: 0,
                responsiveObject: ResponsiveObject,

                menu: [
                    {
                        label: i18n.t('glossaries.account'),
                        rel: this.$store.state.user_auth ? 'nofollow' : '',
                        to: {name: this.$store.state.user_auth ? 'dashboardTournaments' : 'login', params: {lang: this.$route.params.lang}},
                    },
                    {
                        label: i18n.t('glossaries.tutorials'),
                        to: {name: 'tutorials', params: {lang: this.$route.params.lang}},
                    },
                    {
                        label: i18n.t('glossaries.games'),
                        to: 'javascript:void(0)',
                        subItemsVisibility: false,
                        children: [
                            {
                                label: i18n.t('glossaries.counter_strike'),
                                to: {name: 'counterStrike', params: {lang: this.$route.params.lang}},
                            },
                        ],
                    },
                    {
                        label: i18n.t('glossaries.shop'),
                        to: {name: 'shop', params: {lang: this.$route.params.lang}},
                    },
                    {
                        label: i18n.t('glossaries.about_us'),
                        to: {name: 'about', params: {lang: this.$route.params.lang}},
                    },
                ],
            }
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

        mounted() {
            this.handleResize();
            this.handleScroll();

            let vm = this;
            window.addEventListener('resize', function () {
                vm.handleResize()
            });
            window.addEventListener('scroll', function () {
                vm.handleScroll()
            });
        },

        methods: {
            handleResize() {
                this.width = window.innerWidth
            },
            handleScroll() {
                this.stickyHeader = window.scrollY > window.innerHeight
            },
        }
    }
</script>

<style lang="stylus">
    .global--navbar
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
            height 100%
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
                        font-size 13px

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

        &--sub-menu
            height auto !important

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
                    line-height 1
                    letter-spacing .06em
                    text-transform uppercase
                    box-sizing border-box
                    padding 6px 26px

                    span
                        position relative
                        display inline-block !important
                        font-weight 100 !important
                        -webkit-transform translateY(0) !important
                        -moz-transform translateY(0) !important
                        transform translateY(0) !important

                    > span
                        position relative
                        display block
                        overflow hidden
                        padding 0 30px 0 0
                        box-sizing border-box
                        -webkit-transition padding .6s cubic-bezier(.19,1,.22,1) .1s
                        -moz-transition padding .6s cubic-bezier(.19,1,.22,1) .1s
                        transition padding .6s cubic-bezier(.19,1,.22,1) .1s

                        &:before
                            content ''
                            position absolute
                            bottom calc(50% - 1px)
                            height 3px
                            width 18px
                            left -15px
                            background-color #ff0e1f
                            opacity 0
                            -webkit-transition .3s ease
                            -moz-transition .3s ease
                            transition .3s ease
                            -webkit-transform skewX(15deg)
                            -moz-transform skewX(15deg)
                            transform skewX(15deg)

                    &:after
                        content none !important

                &:hover
                    a
                        > span
                            padding 0 10px 0 28px
                            -webkit-transition padding .3s
                            -moz-transition padding .3s
                            transition padding .3s

                            &:before
                                opacity 1
                                left 0
                                -webkit-transition .3s cubic-bezier(.645,.045,.355,1),opacity .5s
                                -moz-transition .3s cubic-bezier(.645,.045,.355,1),opacity .5s
                                transition .3s cubic-bezier(.645,.045,.355,1),opacity .5s

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

    #global--navbar
        height 90px
        justify-content space-between

        //--------------------------------------------

        > div:nth-child(1)
            display flex
            justify-content center
            align-items center

            a
                display block
                height 42px

                img
                    height 100%

        //--------------------------------------------

        &--sticky-header
            height 90px
            left 0
            right 0
            top 0

            //--------------------------------------------

            > div:nth-child(1)
                display flex
                justify-content center
                align-items center

                a
                    display block
                    height 42px

                    img
                        height 100%

            //--------------------------------------------

            .global--navbar--main-menu
                height 100%

                ul li span
                    font-size 12px

    //--------------------------------------------

    .global--navbar--mobile
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

    #global--navbar, #global--navbar--sticky-header
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
        .global--navbar
            &--main-menu
                div ul li a
                    padding-left 30px
                    padding-right 30px

        #global--navbar
            padding-left 45px !important
            padding-right 45px !important

        #global--navbar--sticky-header
            padding-left 65px !important
            padding-right 65px !important
</style>
