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
                <change-language/>
                {{ /* End search part */ }}

                {{ /* Start first menu */ }}
                <div class="position-relative h-100 pe-20 ps-40 pe-lg-20 ps-lg-30 main--navbar--menu">

                    {{ /* First polygon menu */ }}
                    <div class="main--navbar--menu-polygon" id="main--navbar--first-menu-polygon"></div>

                    {{ /* Start social networks */ }}
                    <div class="d-flex justify-content-center align-items-center" id="main--navbar--social-links">
                        <div class="ms-25">
                            <span class="font-size-sm">{{ `${$t('glossaries.your_balance')}: ${moneyFormatFast($store.state.balance || '0', 2)}$` }}</span>
                        </div>
                    </div>
                    {{ /* End social networks */ }}

                    {{ /* Start first part main menu */ }}
                    <div class="main--navbar--main-menu">
                        <div class="z-index-1">
                            <ul class="d-flex">
                                <li v-for="item of menu.first"
                                    class="px-5 px-xl-15 position-relative"
                                    @mouseenter="item.subItemsVisibility = true"
                                    @mouseleave="item.subItemsVisibility = false">

                                    <template v-if="item.children && item.children.length">

                                        <a :href="item.to">
                                            <span>{{ item.label }}</span>
                                        </a>

                                        <transition name="fade">
                                            <ul v-show="item.subItemsVisibility"
                                                class="main--navbar--sub-menu position-absolute start-0 top-75 px-0 py-20"
                                                style="background: #0F0F0FE6; width: 266px">
                                                <li v-for="(subItem, index) of item.children"
                                                    :key="`${item.label}-subItem-${index}`">
                                                    <router-link :to="subItem.to"
                                                                 class="text-nowrap">
                                                        <span><span>{{ subItem.label }}</span></span>
                                                    </router-link>
                                                </li>
                                            </ul>
                                        </transition>

                                    </template>

                                    <template v-else>
                                        <router-link :to="item.to">
                                            <span>{{ item.label }}</span>
                                        </router-link>
                                    </template>

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
                            <span class="font-size-sm">{{ $t('glossaries.follow_us_on') }}:</span>
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
                                <li v-for="item of menu.second"
                                    class="px-5 px-xl-15 position-relative"
                                    @mouseenter="item.subItemsVisibility = true"
                                    @mouseleave="item.subItemsVisibility = false">

                                    <template v-if="item.children && item.children.length">

                                        <a :href="item.to">
                                            <span>{{ item.label }}</span>
                                        </a>

                                        <transition name="fade">
                                            <ul v-show="item.subItemsVisibility"
                                                class="main--navbar--sub-menu position-absolute start-0 top-75 px-0 py-20"
                                                style="background: #0F0F0FE6; width: 266px">
                                                <li v-for="(subItem, index) of item.children"
                                                    :key="`${item.label}-subItem-${index}`">
                                                    <router-link :to="subItem.to"
                                                                 class="text-nowrap">
                                                        <span><span>{{ subItem.label }}</span></span>
                                                    </router-link>
                                                </li>
                                            </ul>
                                        </transition>

                                    </template>

                                    <template v-else>
                                        <router-link :to="item.to">
                                            <span>{{ item.label }}</span>
                                        </router-link>
                                    </template>

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
                    <change-language/>
                    {{ /* End search part */ }}

                    {{ /* Start first menu */ }}
                    <div class="position-relative h-100 pe-30 ps-50 pe-xl-40 ps-xl-70 main--navbar--menu">

                        {{ /* Start first part main menu */ }}
                        <div class="main--navbar--main-menu">
                            <div class="z-index-1">
                                <ul class="d-flex">
                                    <li v-for="item of menu.first" class="px-5 px-xl-15 position-relative">

                                        <template v-if="item.children && item.children.length">

                                            <a :href="item.to" class="px-15">
                                                <span>{{ item.label }}</span>
                                            </a>

                                            <transition name="fade">
                                                <ul v-show="item.subItemsVisibility"
                                                    class="main--navbar--sub-menu position-absolute start-0 top-75 px-0 py-20"
                                                    style="background: #0F0F0FE6; width: 266px">
                                                    <li v-for="(subItem, index) of item.children"
                                                        :key="`${item.label}-subItem-${index}`">
                                                        <router-link :to="subItem.to"
                                                                     class="text-nowrap">
                                                            <span><span>{{ subItem.label }}</span></span>
                                                        </router-link>
                                                    </li>
                                                </ul>
                                            </transition>

                                        </template>

                                        <template v-else>
                                            <router-link :to="item.to" class="px-15">
                                                <span>{{ item.label }}</span>
                                            </router-link>
                                        </template>

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
                                    <li v-for="item of menu.second"
                                        class="px-5 px-xl-15 position-relative"
                                        @mouseenter="item.subItemsVisibility = true"
                                        @mouseleave="item.subItemsVisibility = false">

                                        <template v-if="item.children && item.children.length">

                                            <a :href="item.to" class="px-15">
                                                <span>{{ item.label }}</span>
                                            </a>

                                            <transition name="fade">
                                                <ul v-show="item.subItemsVisibility"
                                                    class="main--navbar--sub-menu position-absolute start-0 top-75 px-0 py-20"
                                                    style="background: #0F0F0FE6; width: 266px">
                                                    <li v-for="(subItem, index) of item.children"
                                                        :key="`${item.label}-subItem-${index}`">
                                                        <router-link :to="subItem.to"
                                                                     class="text-nowrap">
                                                            <span><span>{{ subItem.label }}</span></span>
                                                        </router-link>
                                                    </li>
                                                </ul>
                                            </transition>

                                        </template>

                                        <template v-else>
                                            <router-link :to="item.to" class="px-15">
                                                <span>{{ item.label }}</span>
                                            </router-link>
                                        </template>

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
                <change-language/>
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

            <div class="border-bottom px-25 px-sm-35 px-md-65 overflow-y-scroll"
                 style="max-height: 250px">
                <transition name="slide-down-up-250px">
                    <ul v-if="isShowMenuMobile">
                        <li class="border-bottom position-relative"
                            v-for="item of menu.first"
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
                                                         style="padding: 9px 0; font-size: 11px">
                                                {{ subItem.label }}
                                            </router-link>
                                        </li>
                                    </ul>
                                </transition>

                            </template>

                            <template v-else>
                                <router-link :to="item.to" class="flex-grow-1">{{ item.label }}</router-link>
                            </template>

                        </li>
                        <li class="border-bottom position-relative"
                            v-for="item of menu.second"
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
                                                         style="padding: 9px 0; font-size: 11px">
                                                {{ subItem.label }}
                                            </router-link>
                                        </li>
                                    </ul>
                                </transition>

                            </template>

                            <template v-else>
                                <router-link :to="item.to" class="flex-grow-1">{{ item.label }}</router-link>
                            </template>

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
                    <change-language/>
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

                <div class="border-bottom px-25 px-sm-35 px-md-65 overflow-y-scroll"
                     style="max-height: 250px">
                    <transition name="slide-down-up-250px">
                        <ul v-if="isShowMenuMobile">
                            <li class="border-bottom position-relative"
                                v-for="item of menu.first"
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
                                                             style="padding: 9px 0; font-size: 11px">
                                                    {{ subItem.label }}
                                                </router-link>
                                            </li>
                                        </ul>
                                    </transition>

                                </template>

                                <template v-else>
                                    <router-link :to="item.to" class="flex-grow-1">{{ item.label }}</router-link>
                                </template>

                            </li>
                            <li class="border-bottom position-relative"
                                v-for="item of menu.second"
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
                                                             style="padding: 9px 0; font-size: 11px">
                                                    {{ subItem.label }}
                                                </router-link>
                                            </li>
                                        </ul>
                                    </transition>

                                </template>

                                <template v-else>
                                    <router-link :to="item.to" class="flex-grow-1">{{ item.label }}</router-link>
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
            'mdi-arrow-left': () => import ('../../../components/icons/MaterialDesignIcons/MdiArrowLeft.vue'),
            'mdi-arrow-right': () => import ('../../../components/icons/MaterialDesignIcons/MdiArrowRight.vue'),
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
                            rel: this.$store.state.user_auth ? 'nofollow' : '',
                            to: {name: this.$store.state.user_auth ? 'dashboardTournaments' : 'login', params: {lang: this.$route.params.lang}},
                        },
                        {
                            label: i18n.t('glossaries.tutorials'),
                            to: {name: 'tutorials', params: {lang: this.$route.params.lang}},
                        },
                    ],
                    second: [
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
                },

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


            //--------------------------------------------

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
                            background-color #ff0e1f
                            opacity 0
                            -webkit-transition .3s ease
                            -moz-transition .3s ease
                            transition .3s ease
                            -webkit-transform skewX(15deg)
                            -moz-transform skewX(15deg)
                            transform skewX(15deg)

                        / .ltr &
                            padding 0 30px 0 0
                            &:before
                                left -15px
                        / .rtl &
                            padding 0 0 0 30px
                            &:before
                                right -15px

                    &:after
                        content none !important

                &:hover
                    a
                        > span
                            -webkit-transition padding .3s
                            -moz-transition padding .3s
                            transition padding .3s

                            &:before
                                opacity 1
                                -webkit-transition .3s cubic-bezier(.645,.045,.355,1),opacity .5s
                                -moz-transition .3s cubic-bezier(.645,.045,.355,1),opacity .5s
                                transition .3s cubic-bezier(.645,.045,.355,1),opacity .5s

                            / .ltr &
                                padding 0 10px 0 28px
                                &:before
                                    left 0
                            / .rtl &
                                padding 0 28px 0 10px
                                &:before
                                    right 0

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

            .main--navbar--sub-menu
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
