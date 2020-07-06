<template>
    <div class="mx-auto" id="page--home">
        <div class="d-flex flex-direction-column justify-content-space-between vh-100">
            <home-header class="container-fluid z-index-50">
                <home-navigation v-model="isActiveMainSideMenu"/>
            </home-header>

            <div>
                <rs-overlay-loading v-if="!imagesSlider.length" :width="40"/>
            </div>
            <rs-image-slider v-if="imagesSlider.length" id="page--home--image-slider" backgroundMode fullscreen
                             :source="imagesSlider" v-model="selected">

                <div v-if="imagesSlider.length > 0" slot="content"
                     class="d-flex flex-direction-column justify-content-center align-items-center">

                    <span class="z-index-1 font-weight-700 text-center text-white text-uppercase page--home--image-slider--title"
                          :style="{fontFamily: $route.params.lang === 'en' ? 'Rubik !important' : ''}">{{ imagesSlider[selected].title }}</span>
                    <rs-button glow solid solidShadow trapezeBoth>
                        <a :href="imagesSlider[selected].button.to" class="text-white" v-smooth-scroll="{offset: -70, updateHistory: false}">
                            {{ imagesSlider[selected].button.label }}
                        </a>
                    </rs-button>

                </div>

            </rs-image-slider>

            <div class="d-flex justify-content-center align-items-center overflow-hidden ltr"
                 style="box-shadow: 0 5px 10px 0 #0000005a; height: 145px; background: center center url('../../../public/images/public/gradient-primary-radial.jpg')">

                <rs-carousel-slider :items="carouselSlider">
                    <a slot="item-adapter"
                       slot-scope="{item}"
                       class="position-relative d-flex justify-content-center">

                        <span>
                            <img :src="item.image" alt=""/>
                        </span>
                        <span class="position-absolute">
                            <img :src="item.image" alt=""/>
                        </span>

                    </a>
                </rs-carousel-slider>

            </div>
        </div>

        <main-side-menu v-model="isActiveMainSideMenu"/>

        <div v-if="(!loadingRunningTournaments && runningTournaments.length) || loadingRunningTournaments"
             class="container-fluid py-60"
             style="background: url('/public/images/public/bg-tournament-timer.png') center center; background-size: cover">
            <div class="container">

                <div class="row text-white">
                    <div class="col m-0 text-center">
                        <h2>{{ $t('glossaries.running_tournaments') }}</h2>
                        <span class="mt-5 d-block font-size-xl">{{ $t('glossaries.ready_for_a_great_battle') }}</span>
                        <span class="mt-5 d-block font-size-xl text-warning">{{ $t('glossaries.for_mobile') }}</span>
                    </div>
                </div>

                <running-tournament v-if="!loadingRunningTournaments && runningTournaments.length"
                                    v-for="(runningTournament, index) of runningTournaments"
                                    :key="`running-tournament-${index}`" class="mt-30" :tournament="runningTournament"
                                    @refresh="getRunningTournaments"/>

                <div class="pt-60 pb-30" v-if="loadingRunningTournaments">
                    <rs-overlay-loading width="50"/>
                </div>
            </div>
        </div>

        <div class="container mt-40 py-50 px-20" id="tournaments">
            <h2 class="text-center text-white">{{ $t('glossaries.games_played') }}</h2>

            <title-span class="mt-20 w-100 d-block text-center"/>

            <rs-tabs class="mt-60" :tabs="tabs" v-model="selectedTournamentTab">

                <rs-tab-content class="position-relative flex-direction-column px-0 justify-content-center overflow-hidden align-items-center"
                                id="page--games--counter-strike--installation-guide">

                    <div class="d-flex flex-direction-column px-20">

                        <tournament-item
                                v-if="tournaments.length && (selectedTournamentTab === 0 && !loadingGamesPlayed || selectedTournamentTab === 1 && !loadingMyTournaments)"
                                v-for="(item, index) of tournaments"
                                :key="`tournament-${index}`"
                                :data="item"
                                class="row py-20"
                                :class="{'border-bottom': index < tournaments.length - 1}"/>

                                            <div v-if="selectedTournamentTab === 0 && loadingGamesPlayed || selectedTournamentTab === 1 && loadingMyTournaments"
                                                 class="py-50">
                                                <rs-overlay-loading width="28"/>
                                            </div>

                        <div v-if="!tournaments.length && (selectedTournamentTab === 0 && !loadingGamesPlayed || selectedTournamentTab === 1 && !loadingMyTournaments)"
                             class="py-50 text-center">
                            <span>{{ $t('glossaries.not_found') }}</span>
                        </div>

                        <rs-pagination v-if="selectedTournamentTab === 0 && tournaments.length" class="my-20"
                                       v-model="gamesPlayedCurrentPage" :count="gamesPlayedTotalPages"
                                       @change="updateListByPagination(0)"/>
                        <rs-pagination v-if="selectedTournamentTab === 1 && tournaments.length" class="my-20"
                                       v-model="myTournamentsCurrentPage" :count="myTournamentsTotalPages"
                                       @change="updateListByPagination(1)"/>

                    </div>

                </rs-tab-content>

            </rs-tabs>
        </div>

        <div class="container mt-40 py-50 px-20" id="top10">
            <h2 class="text-center text-white">{{ $t('glossaries.top_10_players') }}</h2>
            <span class="text-center w-100 mt-5 d-block font-size-xl text-white" v-html="$t('glossaries.each_month_a_special_prize_of_500000_tomans_for_the_best_player')"></span>

            <title-span class="mt-20 w-100 d-block text-center"/>

            <rs-tabs class="mt-60" :tabs="top10Tabs" v-model="selectedTop10Tab">

                <rs-tab-content class="position-relative flex-direction-column px-0 justify-content-center overflow-hidden align-items-center"
                                id="page--home--top10--30days">

                    <div class="d-flex flex-direction-column px-20 overflow-y-overlay" style="max-height: 530px">

                        <top10-item
                                v-if="top10.length && !loadingTop10"
                                v-for="(item, index) of top10"
                                :key="`top10-${index}`"
                                :data="item"
                                :rank="index + 1"
                                class="row py-20 mb-0 d-block"
                                :class="{'border-bottom': index < top10.length - 1}"/>

                                <div v-if="loadingTop10"
                                     class="py-50">
                                    <rs-overlay-loading width="28"/>
                                </div>

                        <div v-if="!top10.length && !loadingTop10"
                             class="py-50 text-center">
                            <span>{{ $t('glossaries.not_found') }}</span>
                        </div>

                    </div>

                </rs-tab-content>

            </rs-tabs>
        </div>

        <div class="container-fluid px-0 py-50" id="tutorials">
            <h2 class="text-center text-white">{{ $t('glossaries.tutorials') }}</h2>

            <title-span class="mt-20 w-100 d-block text-center"/>

            <div class="row mt-80">
                <post-mode v-for="(tutorial, index) of tutorials"
                           :key="`tutorial-${index}`"
                           :background="tutorial.backgroundImage"
                           class="pt-100 col-sm-4 mb-0 d-flex flex-direction-column"
                           :style="{minHeight: `${width / 4.8}px`}"
                           :href="tutorial.link"
                           target="_blank"
                           @mouseover.native="tutorial.hover = true"
                           @mouseleave.native="tutorial.hover = false">

                    <span class="tag text-white">{{ tutorial.tag }}</span>

                    <title-box-animated class="text-white mt-10" :active="tutorial.hover" @click.native="">
                        <a :href="tutorial.link" target="_blank" class="font-size-xl font-weight-900">{{ tutorial.title }}</a>
                    </title-box-animated>

                    <span class="font-size-xs mt-10 text-white">{{ tutorial.date | moment(`${$route.params.lang === 'fa' ? 'jYYYY/jMM/jDD': 'YYYY/MM/DD'} HH:mm:ss`) }}</span>

                    <p class="mt-20 text-white">{{ tutorial.text }}</p>

                </post-mode>
            </div>
        </div>
        <div class="container-fluid px-0 mt-80"
             :style="{background: 'url(/public/images/samples/h1-background-img-1.jpg) center center no-repeat', boxShadow: '0 5px 10px 0 rgba(0, 0, 0, 0.35)'}">
            <div class="row">

                <div class="col-md-6 mb-0 d-none d-md-flex justify-content-center">
                    <img src="/public/images/samples/h1-img-1.png"
                         alt=""
                         class="mt--30"
                         :style="{maxWidth: '100%', width: '608px'}"/>
                </div>

                <div class="col-md-6 mb-0 d-flex flex-direction-column justify-content-center py-80 py-md-40 text-center text-md-start">
                    <div>
                        <h2 class="text-white line-height-1-1" :style="{fontFamily: `${$route.params.lang === 'en' ? 'Rubik' : 'IRANSans'} !important`}">
                            {{ $t('glossaries.tournaments_executor') }}:
<!--                            {{ $t('glossaries.youtuber_name') }}-->
                        </h2>
                        <h1 class="text-white">{{ $t('app.name') }}</h1>

                        <button class="btn text-uppercase glow solid w-fit-content mt-30 p-0">
                            <a href="https://www.aparat.com/karzar.pro" target="_blank" class="d-flex" rel="nofollow" style="padding: 13px 44px">
                                <span class="btn-text d-flex justify-content-center align-items-center text-white">{{ $t('glossaries.aparat_channel') }}</span>
                            </a>
                        </button>
                    </div>
                </div>

            </div>

        </div>

        <div class="container mb-80 mt-100">
            <div class="row">

                <div class="col-md-6 pe-sm-30 pe-md-60 pe-lg-90 pe-xl-100 text-center text-md-start">
                    <h2 class="text-uppercase text-white">{{ $t('glossaries.contact_us') }}</h2>

                    <title-span class="mt-20"/>

                    <p class="mt-30" :style="{fontSize: '16px'}">{{ $t('public.about_home') }}</p>

<!--                    <span class="d-block mt-30 text-white">-->
<!--                        <span class="me-10 d-inline-flex"><i class="fa fa-location-arrow"></i></span>Auguststraße 225, 10543 Berlin-->
<!--                    </span>-->

                    <span class="d-block mt-30 text-white">
                        <a href="mailto:info@karzar.pro"><span class="me-10 d-inline-flex"><i class="fa fa-envelope"/></span>info@karzar.pro</a>
                    </span>
                </div>

                <div class="col-md-6">
                    <rs-form :submit="sendContactMessage">
                        <div>
                            <input type="text" :placeholder="`*${$t('glossaries.your_name')}`" class="contact-input"
                                   v-model="contactFields.name" required/>
                        </div>

                        <div>
                            <input type="email" :placeholder="`*${$t('glossaries.email_address')}`" class="contact-input"
                                   v-model="contactFields.email" required/>
                        </div>

                        <div>
                            <textarea :placeholder="`*${$t('glossaries.your_message')}...`"
                                      class="contact-input"
                                      :lang="$route.params.lang"
                                      v-model="contactFields.content"
                                      required></textarea>
                        </div>

                        <div class="mt-10">
                            <rs-button :loading="sendingContactMessage" class="text-uppercase w-100" solid glow>{{
                                $t('glossaries.submit') }}
                            </rs-button>
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
    import {
        games_played,
        getMainSliderItems,
        myTournaments,
        runningTournaments,
        sendContactMessage, top10,
        tutorials
    } from '../../api'

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
            itemsPerPage: 4,

            width: 0,

            selected: 0,

            selectedTournamentTab: 0,

            loadingRunningTournaments: false,
            runningTournaments: [],

            loadingGamesPlayed: false,
            gamesPlayed: [],
            gamesPlayedCurrentPage: 1,
            gamesPlayedTotalPages: 0,

            loadingMyTournaments: false,
            myTournaments: [],
            myTournamentsCurrentPage: 1,
            myTournamentsTotalPages: 0,

            // Filtered tournaments
            tournaments: [],

            loadingTop10: false,
            top10: [],
            selectedTop10Tab: 0,
            top10Tabs: [
                {
                    label: i18n.t('glossaries.30_days'),
                },
                {
                    label: i18n.t('glossaries.all'),
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

            loadingTutorials: false,
            tutorials: [],

            sendingContactMessage: false,
            contactFields: {
                name: '',
                email: '',
                content: '',
            },
        }),

        computed: {
            tabs () {
                return [
                    {
                        label: i18n.t('glossaries.games_played'),
                    },
                    {
                        label: i18n.t('glossaries.your_games'),
                        visibility: this.$store.state.user_auth,
                    },
                ]
            }
        },

        methods: {
            handleResize() {
                this.width = window.innerWidth
            },

            getRunningTournaments() {
                if (!this.loadingRunningTournaments) {
                    this.loadingRunningTournaments = true;

                    // Loading Tournaments
                    runningTournaments()
                        .then(response => {
                            this.runningTournaments = response.data.result;
                        })
                        .catch(error => {

                        })
                        .finally(() => {
                            this.loadingRunningTournaments = false;
                        });
                }
            },

            getGamesPlayed() {
                if (!this.loadingGamesPlayed) {
                    this.loadingGamesPlayed = true;

                    // Loading Games Played
                    games_played(this.gamesPlayedCurrentPage, this.itemsPerPage)
                        .then(response => {
                            let totalPages = response.data.total / this.itemsPerPage;
                            this.gamesPlayedTotalPages = (totalPages % 1 !== 0) ? Math.floor(totalPages) + 1 : totalPages;
                            this.gamesPlayed = response.data.result;

                            if (this.selectedTournamentTab === 0)
                                this.tournaments = this.gamesPlayed;
                        })
                        .catch(error => {

                        })
                        .finally(() => {
                            this.loadingGamesPlayed = false;
                        });
                }
            },

            getMyTournaments() {
                if (!this.loadingMyTournaments) {
                    this.loadingMyTournaments = true;

                    // Loading My Tournaments
                    myTournaments(this.myTournamentsCurrentPage, this.itemsPerPage)
                        .then(response => {
                            let totalPages = response.data.total / this.itemsPerPage;
                            this.myTournamentsTotalPages = (totalPages % 1 !== 0) ? Math.floor(totalPages) + 1 : totalPages;
                            this.myTournaments = response.data.result;
                            if (this.selectedTournamentTab === 1)
                                this.tournaments = this.myTournaments
                        })
                        .catch(error => {

                        })
                        .finally(() => {
                            this.loadingMyTournaments = false;
                        });
                }
            },

            getTop10(days) {
                if (!this.loadingTop10) {
                    this.loadingTop10 = true;
                    top10(days)
                        .then(res => {
                            this.top10 = res.data.result;
                        })
                        .catch(err => {

                        })
                        .finally(() => {
                            this.loadingTop10 = false
                        })
                }
            },

            updateListByPagination(type) {
                switch (type) {
                    case 0:
                        this.getGamesPlayed();
                        break;

                    case 1:
                        this.getMyTournaments();
                        break;
                }
            },

            sendContactMessage() {
                if (!this.sendingContactMessage) {
                    this.sendingContactMessage = true;
                    sendContactMessage(this.contactFields.name, this.contactFields.email, this.contactFields.content)
                        .then(response => {
                            this.contactFields = {name: '', email: '', content: ''};
                            this.$toast.success({
                                title: '',
                                message: '',
                            })
                        })
                        .catch(error => {
                            this.$toast.error({
                                title: '',
                                message: error.response.data.msg,
                            })
                        })
                        .finally(() => {
                            this.sendingContactMessage = false;
                        })
                }
            },

            getTutorials() {
                if (!this.loadingTutorials) {
                    this.loadingTutorials = true;
                    tutorials(1, 3)
                        .then(response => {
                            this.tutorials = response.data.result.map(tutorial => ({
                                title: tutorial.title,
                                hover: false,
                                date: tutorial.created_at,
                                tag: 'sports',
                                text: tutorial.text,
                                link: tutorial.link,
                                backgroundImage: tutorial.image.url_static,
                            }))
                        })
                        .catch(error => {
                            // console.log(error)
                        })
                        .finally(() => {
                            this.loadingTutorials = false;
                        })
                }
            },
        },

        mounted() {
            this.handleResize();

            let vm = this;
            window.addEventListener('resize', this.handleResize);

            // Load Main Sliders
            getMainSliderItems().then(response => {
                response.data.result.forEach(slide => {
                    vm.imagesSlider.push({
                        image: slide.media.url_static,
                        imageStatic: true,
                        title: slide.title,
                        button: {
                            label: slide.link_text,
                            to: slide.link,
                        },
                    })
                });
            }).catch(error => {

            });

            this.getRunningTournaments();
            this.getGamesPlayed();

            if (this.$store.state.user_auth)
                this.getMyTournaments();

            this.getTop10(30);
            this.getTutorials();
        },

        watch: {
            selectedTop10Tab(val) {
                switch (val) {
                    case 0:
                        this.getTop10(30);
                        break;
                    case 1:
                        this.getTop10();
                        break;
                }
            }
        },

        beforeDestroy() {
            window.removeEventListener('resize', this.handleResize);
        }
    }
</script>

<style lang="stylus">
    .contact-input
        position: relative;
        width: 100%;
        margin: 0 0 10px;
        padding: 16px 25px;
        font-family: Rubik, sans-serif;
        font-size: 17px;
        line-height: 20px;
        font-weight: inherit;
        color: #fff;
        background-color: rgba(255, 255, 255, .05);
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
