<template>
    <div class="mx-auto" id="page--home">
        <div class="d-flex flex-direction-column justify-content-space-between vh-100">
            <home-header class="container-fluid z-index-50">
                <home-navigation v-model="isActiveMainSideMenu"/>
            </home-header>

            <rs-image-slider id="page--home--image-slider" backgroundMode fullscreen :source="imagesSlider" v-model="selected">

                <div v-if="imagesSlider.length > 0" slot="content" class="d-flex flex-direction-column justify-content-center align-items-center">

                    <span class="z-index-1 font-weight-700 text-center text-white text-uppercase page--home--image-slider--title">{{ imagesSlider[selected].title }}</span>
                    <rs-button glow solid solidShadow trapezeBoth @click.native="$router.push(imagesSlider[selected].button.to)">{{ imagesSlider[selected].button.label }}</rs-button>

                </div>

            </rs-image-slider>

            <div class="d-flex justify-content-center align-items-center overflow-hidden"
                 style="box-shadow: 0 5px 10px 0 #0000005a; height: 145px; background: center center url('../../../public/images/public/gradient-primary-radial.jpg')">

                <rs-carousel-slider :items="carouselSlider">
                    <a slot="item-adapter"
                         slot-scope="{item}"
                         class="position-relative d-flex">

                        <span>
                            <img :src="item.image" alt="" />
                        </span>
                        <span class="position-absolute">
                            <img :src="item.image" alt="" />
                        </span>

                    </a>
                </rs-carousel-slider>

            </div>
        </div>

        <main-side-menu v-model="isActiveMainSideMenu"/>

        <div class="container-fluid py-60" style="background: url('../../../public/images/public/bg-tournament-timer.png') center center">
            <div class="container">

                <div class="row text-white">
                    <div class="col m-0 text-center">
                        <h2>{{ $t('glossaries.running_tournaments') }}</h2>
                        <span class="mt-5 d-block font-size-xl">{{ $t('glossaries.ready_for_a_great_battle') }}</span>
                    </div>
                </div>

                <div class="row mt-30" id="page--home--tournament-reservation">
                    <div class="col d-flex flex-direction-column align-items-center">

                        {{ /* Start tournament timer */ }}
                        <div class="row">
                            <div class="col mb-0 justify-content-center d-flex">
                                <div class="timer w-fit-content position-relative d-flex align-items-center">
                                    <span class="bottom-trapeze-sides trapeze-start-side"></span>
                                    <span lang="en" class="ltr" style="padding: 7px 20px; background-color: #ff0e1f; font-size: 1.6em">8 : 12 : 23 : 46</span>
                                    <span class="bottom-trapeze-sides trapeze-end-side"></span>
                                </div>
                            </div>
                        </div>
                        {{ /* End tournament timer */ }}

                        {{ /* Start tournament reservation panel */ }}
                        <div class="row" id="page--home--tournament-reservation--panel">
                            <div class="col mb-0">
                                <div class="row w-100 h-100 d-flex justify-content-flex-end">

                                    {{ /* Start banner */ }}
                                    <rs-section class="mb-0 px-10 pe-lg-0 z-index-1 d-flex align-items-center" id="page--home--tournament-reservation--panel--banner">

                                        <div class="flex-grow-0 my-10 ms-lg--30 d-flex align-items-center">
                                            <img src="../../../public/images/samples/img-tournament-sample.png"
                                                 alt="" class="w-100"/>
                                        </div>

                                    </rs-section>
                                    {{ /* End banner */ }}

                                    <rs-section class="col-xl mb-0 flex-grow-1 d-flex flex-direction-column" id="page--home--tournament-reservation--panel--data">

                                        {{ /* Start tournament data */ }}
                                        <div class="flex-grow-1 d-flex py-20">

                                            <div class="row">

                                                {{ /* Start tournament details */ }}
                                                <div class="col-lg-6 mb-0">
                                                    <div class="flex-grow-1 d-flex align-items-center justify-content-space-around" :class="{'border-end': width >= 1024}">

                                                        {{ /* Start tournament round data */ }}
                                                        <div class="flex-grow-1 h-100 d-flex flex-direction-column justify-content-space-around px-lg-10 px-xl-20" :style="{maxWidth: '200px'}" id="page--home--tournament-reservation--panel--data--description">

                                                            {{ /* Map */ }}
                                                            <div class="d-flex justify-content-space-between">
                                                                <span>{{ $t('glossaries.map') }}:</span>&nbsp;
                                                                <span lang="en">Ancher</span>
                                                            </div>

                                                            {{ /* Input */ }}
                                                            <div class="d-flex justify-content-space-between">
                                                                <span>{{ $t('glossaries.fee') }}:</span>&nbsp;
                                                                <span lang="en">5$</span>
                                                            </div>

                                                            {{ /* Reward */ }}
                                                            <div class="d-flex justify-content-space-between">
                                                                <span>{{ $t('glossaries.reward') }}:</span>&nbsp;
                                                                <span lang="en">200$</span>
                                                            </div>

                                                        </div>

                                                        {{ /* Start count gamers data */ }}
                                                        <div lang="en" class="ltr d-flex justify-content-center align-items-center ms-10 me-0 me-lg-20 me-xl-40" style="width: 100px; min-width: 65px; height: 100px; background: url('../../../public/images/samples/filler-circle.png') center center no-repeat; background-size: contain">
                                                            <span>87 / 100</span>
                                                        </div>
                                                        {{ /* End count gamers data */ }}

                                                    </div>
                                                </div>
                                                {{ /* End tournament details */ }}

                                                {{ /* Separator line */ }}
                                                <hr class="d-block d-lg-none w-100 mx-10 mt-20 opacity-1"/>

                                                {{ /* Start getting user registration data */ }}
                                                <div class="col-lg-6 mb-0 mt-10 mt-lg-0">
                                                    <div class="d-flex flex-direction-column px-lg-20 pe-xl-40">
                                                        <div>
                                                            <rs-input type="text" :label="$t('glossaries.character_name')" />
                                                        </div>
                                                        <div class="mt-20">
                                                            <span class="d-inline-flex" @click="modals.pubgTournamentUsers.visibility = true">
                                                                <icon-multiple-users fill="#BBBBBB" width="35px"/>
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                                {{ /* End getting user registration data */ }}
                                            </div>

                                        </div>
                                        {{ /* End tournament data */ }}

                                        <div class="overflow-x-overlay overflow-y-hidden border-top">
                                            <div class="flex-grow-1 d-flex w-fit-content ms-auto">
                                                <rs-button transparent class="text-white px-80 text-nowrap">{{ $t('glossaries.group_booking') }}</rs-button>
                                                <rs-button solid trapezeStart glow class="text-nowrap">5$ {{ $t('glossaries.enter_the_tournament') }}</rs-button>
                                            </div>
                                        </div>
                                    </rs-section>
                                </div>
                            </div>
                        </div>

                        <rs-modal :styleModal="modals.pubgTournamentUsers.stylesModal" v-model="modals.pubgTournamentUsers.visibility">
                            <div class="py-10 text-center">
                                <span>{{ $t('pages.home.main.reservation_panel.pubg_users_modal.title') }}</span>
                            </div>
                            <hr class="mx-100 opacity-2"/>
                            <div class="row mt-20 px-10">
                                <div class="col-sm-6" v-for="(team, index) of modals.pubgTournamentUsers.teams">
                                    <div class="team-title d-flex">
                                        <div class="d-flex">
                                            <span class="font-size-xs text-nowrap" style="padding: 2px 20px 1px 8px; background: #ffffff0f">{{ `${$t('glossaries.team')} ${index + 1}` }}</span>
                                        </div>
                                        <div class="w-100 mb-5 ms-5" style="background: #ffffff0f"></div>
                                    </div>
                                    <div class="row py-10" style="background: #ffffff0f">
                                        <div class="col-3 mb-0 position-relative" v-for="player of team">
                                            <img :src="player.image || '/public/images/public/pubg-default-profile.svg'" alt="" class="w-100"/>
                                            <span class="position-absolute font-size-xxs" style="padding: 0 4px; background: #0005; bottom: 1px; left: 11px; right: 11px;">{{ player.name }}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div></div>
                        </rs-modal>
                        {{ /* End tournament reservation panel */ }}

                    </div>
                </div>

            </div>
        </div>

        <div class="container mt-40 py-50 px-20">
            <h2 class="text-center text-white">{{ $t('glossaries.games_played') }}</h2>

            <title-span class="mt-20 w-100 d-block text-center"/>

            <rs-section class="mt-60 flex-direction-column">

                <div class="overflow-x-overlay border-bottom overflow-y-hidden">
                    <div class="d-flex w-fit-content">
                        <rs-button class="px-20 me-15 text-nowrap" solid glow reverseTrapezeEnd>{{ $t('glossaries.games_played') }}</rs-button>
                        <rs-button v-if="$store.state.user_auth" class="px-20 text-nowrap" transparent reverseTrapezeEnd trapezeStart>{{ $t('glossaries.yours_games') }}</rs-button>
                    </div>
                </div>

                <div class="d-flex flex-direction-column px-20">

                    <tournament-item v-for="(item, index) of tournaments"
                                     :key="`tournament-${index}`"
                                     class="row py-20"
                                     :class="{'border-bottom': index < 2}" :data="item"/>

                    <div class="row pagination mt-20">
                        <div class="col text-white d-flex justify-content-center">
                            <span class="px-5 linkable">1</span>
                            <span class="px-5 linkable">2</span>
                            <span class="px-5 linkable">3</span>
                            <span class="px-5 linkable">4</span>
                            <span class="px-5 d-inline-flex align-items-center">
                                <icon-arrow-right-type-1 v-if="$store.state.dir === 'ltr'" fill="#fff" size="12px"/>
                                <icon-arrow-left-type-1 v-if="$store.state.dir === 'rtl'" fill="#fff" size="12px"/>
                            </span>
                        </div>
                    </div>

                </div>

            </rs-section>
        </div>

        <div class="container-fluid px-0 py-50">
            <h2 class="text-center text-white">{{ $t('glossaries.tutorials') }}ا</h2>

            <title-span class="mt-20 w-100 d-block text-center"/>

            <div class="row mt-80">
                <post-mode v-for="(tutorial, index) of tutorials"
                           :key="`tutorial-${index}`"
                           :background="tutorial.backgroundImage"
                           class="pt-100 col-sm-4 mb-0 d-flex flex-direction-column"
                           :style="{minHeight: `${width / 4.8}px`}"
                           @mouseover.native="tutorial.hover = true"
                           @mouseleave.native="tutorial.hover = false">

                    <span class="tag">{{ tutorial.tag }}</span>

                    <title-box-animated class="text-white mt-10" :active="tutorial.hover">
                        <router-link to="#" class="font-size-xl font-weight-900">{{ tutorial.title }}</router-link>
                    </title-box-animated>

                    <span class="font-size-xs mt-10">{{ tutorial.date }}</span>

                    <transition name="fade">
                        <p v-if="tutorial.hover" class="mt-20">{{ tutorial.text }}</p>
                    </transition>

                </post-mode>
            </div>
        </div>

        <div class="container-fluid px-0 mt-80" :style="{background: 'url(/public/images/samples/h1-background-img-1.jpg) center center no-repeat', boxShadow: '0 5px 10px 0 rgba(0, 0, 0, 0.35)'}">
            <div class="row">

                <div class="col-md-6 mb-0 d-none d-md-flex justify-content-center">
                    <img src="/public/images/samples/h1-img-1.png"
                         alt=""
                         class="mt--30"
                         :style="{maxWidth: '100%', width: '608px'}"/>
                </div>

                <div class="col-md-6 mb-0 d-flex flex-direction-column justify-content-center py-80 py-md-40 text-center text-md-start">
                    <div>
                        <h1 class="text-white line-height-1-1" :style="{fontFamily: 'Rubik !important'}">
                            GAME EXPO: Where digital<br>
                            worlds meet real<br>
                            innovation
                        </h1>

                        <rs-button class="w-fit-content mt-30" solid glow>View Schedule</rs-button>
                    </div>
                </div>

            </div>
        </div>

        <div class="container mb-80 mt-100">
            <div class="row">

                <div class="col-md-6 pe-sm-30 pe-md-60 pe-lg-90 pe-xl-100 text-center text-md-start">
                    <h2 class="text-uppercase text-white">{{ $t('glossaries.contact_us') }}</h2>

                    <title-span class="mt-20"/>

                    <p class="mt-30" :style="{fontSize: '16px'}">Proin gravida nibh vel velit auctor aliquet. Aenean velit sollicitudin, lorem quis bibendum auctor, nisi elit ipsum consequat ipsum, nec sagittis sem nibh id elit. Duis sed odio sit amet nibh vulputate cursus a sit amet mauris.</p>

                    <span class="d-block mt-30 text-white">
                        <span class="me-10 d-inline-flex"><i class="fa fa-location-arrow"></i></span>Auguststraße 245, 10117 Berlin
                    </span>

                    <span class="d-block mt-30 text-white">
                        <span class="me-10 d-inline-flex"><i class="fa fa-envelope"></i></span>office@aggro.com
                    </span>
                </div>

                <div class="col-md-6">
                    <rs-form>
                        <div>
                            <input type="text" placeholder="Your Name" class="contact-input"/>
                        </div>

                        <div>
                            <input type="email" placeholder="Email Address" class="contact-input"/>
                        </div>

                        <div>
                            <textarea placeholder="Your Message..." class="contact-input"></textarea>
                        </div>

                        <div class="mt-10">
                            <rs-button class="text-uppercase w-100" solid glow>{{ $t('glossaries.submit') }}</rs-button>
                        </div>
                    </rs-form>
                </div>

            </div>
        </div>

        <!-- Footer -->
        <global-footer/>
    </div>
</template>

<script>
    import i18n from '../../i18n'
    import {getMainSliderItems} from '../../api'

    export default {
        name: "Home",

        title: () => i18n.t('pages.home.main.title'),

        components: {
            'icon-arrow-left-type-1': () => import('../../components/icons/IconArrowLeftType1.vue'),
            'icon-arrow-right-type-1': () => import('../../components/icons/IconArrowRightType1.vue'),
            'icon-multiple-users': () => import('../../components/icons/IconMultipleUsers.vue'),
            'icon-play': () => import('../../components/icons/IconPlay.vue'),
            'title-span': () => import('../../components/svg/TitleSpan.vue'),
        },

        data: () => ({
            width: 0,

            selected: 0,

            tournaments: [
                {
                    id: 1,
                    title: 'نبرد اساطیر',
                    time: '12 November 2019 : 21:00 (TEH)',
                    team: 4,
                    reward: '200$',
                    youtubeLink: '',
                    youtubeWatchStatus: 'LIVE',
                    map: {
                        name: 'pubg shrean',
                        image: '/public/images/samples/img-tournament-sample.png',
                    },
                    tags: [
                        {title: 'pubg mobile'},
                        {title: 'map shreain'},
                    ],
                },
            ],

            isActiveMainSideMenu: false,
            modals: {
                pubgTournamentUsers: {
                    visibility: false,
                    stylesModal: {
                        backgroundImage: 'linear-gradient(315deg, #292c2d 0%, #46545F 70%, #556978 100%)'
                    },
                    teams: [
                        [
                            {image: null, name: 'dsd'},
                            {image: null, name: ''},
                            {image: null, name: ''},
                            {image: null, name: ''},
                        ],
                        [
                            {image: null, name: ''},
                            {image: null, name: ''},
                            {image: null, name: ''},
                            {image: null, name: ''},
                        ],
                        [
                            {image: null, name: ''},
                            {image: null, name: ''},
                            {image: null, name: ''},
                            {image: null, name: ''},
                        ],
                        [
                            {image: null, name: ''},
                            {image: null, name: ''},
                            {image: null, name: ''},
                            {image: null, name: ''},
                        ],
                    ],
                },
            },

            imagesSlider: [],

            carouselSlider: [
                {
                    image: '/public/images/samples/icons/counter-strike.png',
                    to: '#',
                },
                {
                    image: '/public/images/samples/icons/leage-of-legend.png',
                    to: '#',
                },
                {
                    image: '/public/images/samples/icons/pubg.png',
                    to: '#',
                },
                {
                    image: '/public/images/samples/icons/supercell.png',
                    to: '#',
                },
                {
                    image: '/public/images/samples/icons/travian.png',
                    to: '#',
                },
                {
                    image: '/public/images/samples/icons/zula.png',
                    to: '#',
                },
            ],

            tutorials: [
                {title: 'White Keep Assault', hover: false, date: 'June 4, 2018', tag: 'sports', text: 'Maecenas tempus, tellus eget condimentum rhoncus, sem quam ...', backgroundImage: '/public/images/samples/blog-2-img-3.jpg'},
                {title: 'Dota 2 Tournament', hover: false, date: 'June 4, 2018', tag: 'sports', text: 'Maecenas tempus, tellus eget condimentum rhoncus, sem quam ...', backgroundImage: '/public/images/samples/blog-2-img-2.jpg'},
                {title: 'Winners on Esl Pro', hover: false, date: 'June 4, 2018', tag: 'sports', text: 'Maecenas tempus, tellus eget condimentum rhoncus, sem quam ...', backgroundImage: '/public/images/samples/blog-2-img-1.jpg'},
            ]
        }),

        methods: {
            handleResize() {
                this.width = window.innerWidth
            }
        },

        mounted() {
            this.handleResize();

            let vm = this;
            window.addEventListener('resize', function () {
                vm.handleResize()
            });

            // Load Main Sliders
            getMainSliderItems().then(response => {
                console.log(response.data.result)
                response.data.result.reverse().forEach(slide => {
                    vm.imagesSlider.push({
                        image: slide.media.id,
                        imageStatic: false,
                        title: slide.title,
                        button: {
                            label: slide.link_text,
                            to: slide.link,
                        },
                    })
                })
            }).catch(error => {
                console.log(error)
            })
        }
    }
</script>

<style lang="stylus">
    .contact-input
        position: relative;
        width: 100%;
        margin: 0 0 10px;
        padding: 16px 25px;
        font-family: Rubik,sans-serif;
        font-size: 17px;
        line-height: 20px;
        font-weight: inherit;
        color: #fff;
        background-color: rgba(255,255,255,.05);
        border: 1px solid transparent;
        border-radius: 0;
        outline: 0;
        -webkit-appearance: none;
        cursor: text;
        box-sizing: border-box;
        -webkit-transition: border-color .2s ease-in-out;
        -moz-transition: border-color .2s ease-in-out;
        transition: border-color .2s ease-in-out;
        &:focus
            border-color: transparent transparent #ff0e1f;
        / textarea&
            display: block;
            padding: 19px 25px;
            height: 160px;

    /* Home page styles */
    #page--home
        /*&--image-slider*/
        /*    .page--home--image-slider--title*/
        /*        font-family Rubik !important*/
        &--tournament-reservation
            &--panel
                &--data
                    width calc(100% - 280px)
                    padding-left 0 !important
                    padding-right 0 !important
                    &--description
                        span
                            &:nth-child(1)
                                opacity 0.8
                            &:nth-child(2)
                                color white
                                font-weight 900

    @media screen and (max-width: 679px)
        #page--home
            &--image-slider
                .page--home--image-slider--title
                    font-size 30px

    @media screen and (min-width: 680px)
        #page--home
            &--image-slider
                .page--home--image-slider--title
                    font-size 40px

    @media screen and (min-width: 768px)
        #page--home
            &--image-slider
                .page--home--image-slider--title
                    font-size 50px


    @media screen and (min-width: 1024px)
        #page--home
            &--image-slider
                .page--home--image-slider--title
                    font-size 60px
            &--tournament-reservation
                &--panel
                    &--banner
                        width 250px
                        flex-grow 0 !important
                        img
                            max-width 280px
                            border 3px solid #707070
                    &--data
                        .content > div:nth-child(1)
                            box-shadow -4px 2px 9px 0 #000
                        &--description
                            span
                                font-size 18px

    @media screen and (min-width: 1200px)
        #page--home
            &--image-slider
                .page--home--image-slider--title
                    font-size 80px
            &--tournament-reservation
                &--panel
                    &--data
                        &--description
                            span
                                font-size 22px

</style>
