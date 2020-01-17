<template>
    <div class="mx-auto" id="page--home">
        <div class="d-flex flex-direction-column justify-content-space-between vh-100">
            <home-header class="container-fluid z-index-50">
                <home-navigation v-model="isActiveMainSideMenu"/>
            </home-header>

            <div>
                <rs-overlay-loading v-if="!imagesSlider.length" :width="40"/>
            </div>
            <rs-image-slider v-if="imagesSlider.length" id="page--home--image-slider" backgroundMode fullscreen :source="imagesSlider" v-model="selected">

                <div v-if="imagesSlider.length > 0" slot="content" class="d-flex flex-direction-column justify-content-center align-items-center">

                    <span class="z-index-1 font-weight-700 text-center text-white text-uppercase page--home--image-slider--title" :style="{fontFamily: $route.params.lang === 'en' ? 'Rubik !important' : ''}">{{ imagesSlider[selected].title }}</span>
                    <rs-button glow solid solidShadow trapezeBoth @click.native="$router.push(imagesSlider[selected].button.to)">{{ imagesSlider[selected].button.label }}</rs-button>

                </div>

            </rs-image-slider>

            <div class="d-flex justify-content-center align-items-center overflow-hidden ltr"
                 style="box-shadow: 0 5px 10px 0 #0000005a; height: 145px; background: center center url('../../../public/images/public/gradient-primary-radial.jpg')">

                <rs-carousel-slider class="overflow-x-overlay" :items="carouselSlider">
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

                <running-tournament v-for="(runningTournament, index) of runningTournaments" :key="`running-tournament-${index}`" class="mt-30" :tournament="runningTournament"/>

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
                                <icon-arrow-left-type-1 v-else fill="#fff" size="12px"/>
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

                    <p class="mt-20">{{ tutorial.text }}</p>

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
                        <span class="me-10 d-inline-flex"><i class="fa fa-location-arrow"></i></span>Auguststraße 225, 10543 Berlin
                    </span>

                    <span class="d-block mt-30 text-white">
                        <span class="me-10 d-inline-flex"><i class="fa fa-envelope"></i></span>info@gametour.co
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
    import {getMainSliderItems, runningTournaments} from '../../api'

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

            runningTournaments: [],
            tournamentPlayers: [],

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
                        media_id: 46,
                        name: 'pubg shrean',
                    },
                    tags: [
                        {title: 'pubg mobile'},
                        {title: 'map shreain'},
                    ],
                },
            ],

            isActiveMainSideMenu: false,

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
                response.data.result.forEach(slide => {
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

            });

            // Load Tournaments
            runningTournaments()
                .then(response => {
                    this.runningTournaments = response.data.result;
                })
                .catch(error => {

                })
                .finally(() => {

                });
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

    @media screen and (min-width: 1200px)
        #page--home
            &--image-slider
                .page--home--image-slider--title
                    font-size 80px

</style>
