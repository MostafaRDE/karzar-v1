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
                       class="position-relative d-flex">

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
             style="background: url('../../../public/images/public/bg-tournament-timer.png') center center">
            <div class="container">

                <div class="row text-white">
                    <div class="col m-0 text-center">
                        <h2>{{ $t('glossaries.running_tournaments') }}</h2>
                        <span class="mt-5 d-block font-size-xl">{{ $t('glossaries.ready_for_a_great_battle') }}</span>
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

            <rs-section class="mt-60 flex-direction-column">

                <div class="overflow-x-overlay border-bottom overflow-y-hidden">
                    <div class="d-flex w-fit-content">
                        <rs-button class="px-20 me-15 text-nowrap"
                                   :transparent="selectedTournamentTab === 'ME'"
                                   :solid="selectedTournamentTab === 'PUBLIC'"
                                   glow
                                   :reverseTrapezeEnd="selectedTournamentTab === 'PUBLIC'"
                                   @click.native="updateTournamentsSelected('PUBLIC')">
                            {{ $t('glossaries.games_played') }}
                        </rs-button>
                        <rs-button v-if="$store.state.user_auth"
                                   class="px-20 text-nowrap"
                                   :transparent="selectedTournamentTab === 'PUBLIC'"
                                   :solid="selectedTournamentTab === 'ME'"
                                   glow
                                   :trapezeStart="selectedTournamentTab === 'ME'"
                                   :reverseTrapezeEnd="selectedTournamentTab === 'ME'"
                                   @click.native="updateTournamentsSelected('ME')">
                            {{ $t('glossaries.your_games') }}
                        </rs-button>
                    </div>
                </div>

                <div class="d-flex flex-direction-column px-20">

                    <tournament-item
                            v-if="tournaments.length && (selectedTournamentTab === 'PUBLIC' && !loadingGamesPlayed || selectedTournamentTab === 'ME' && !loadingMyTournaments)"
                            v-for="(item, index) of tournaments"
                            :key="`tournament-${index}`"
                            :data="item"
                            class="row py-20"
                            :class="{'border-bottom': index < tournaments.length - 1}"/>

<!--                    <div v-if="selectedTournamentTab === 'PUBLIC' && loadingGamesPlayed || selectedTournamentTab === 'ME' && loadingMyTournaments"-->
<!--                         class="py-50">-->
<!--                        <rs-overlay-loading width="28"/>-->
<!--                    </div>-->

                    <div v-if="!tournaments.length && (selectedTournamentTab === 'PUBLIC' && !loadingGamesPlayed || selectedTournamentTab === 'ME' && !loadingMyTournaments)"
                         class="py-50 text-center">
                        <span>{{ $t('glossaries.not_found') }}</span>
                    </div>

                    <rs-pagination v-if="selectedTournamentTab === 'PUBLIC' && tournaments.length" class="my-20"
                                   v-model="gamesPlayedCurrentPage" :count="gamesPlayedTotalPages"
                                   @change="updateListByPagination('PUBLIC')"/>
                    <rs-pagination v-if="selectedTournamentTab === 'ME' && tournaments.length" class="my-20"
                                   v-model="myTournamentsCurrentPage" :count="myTournamentsTotalPages"
                                   @change="updateListByPagination('ME')"/>

                </div>

            </rs-section>
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
                           :href="tutorial.youtubeLink"
                           target="_blank"
                           @mouseover.native="tutorial.hover = true"
                           @mouseleave.native="tutorial.hover = false">

                    <span class="tag text-white">{{ tutorial.tag }}</span>

                    <title-box-animated class="text-white mt-10" :active="tutorial.hover" @click.native="">
                        <a :href="tutorial.youtubeLink" target="_blank" class="font-size-xl font-weight-900">{{ tutorial.title }}</a>
                    </title-box-animated>

                    <span class="font-size-xs mt-10 text-white">{{ tutorial.date }}</span>

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
                        <h1 class="text-white line-height-1-1" :style="{fontFamily: `${$route.params.lang === 'en' ? 'Rubik' : 'IRANSans'} !important`}">
                            {{ $t('glossaries.tournaments_executor') }}:<br>
                            {{ $t('names.edrees_sharifi') }}
                        </h1>

                        <button class="btn text-uppercase glow solid w-fit-content mt-30 p-0">
                            <a href="https://www.youtube.com/channel/UC--7oyGW0N7fMf164-ZXljQ" target="_blank" class="d-flex" style="padding: 13px 44px">
                                <span class="btn-text d-flex justify-content-center align-items-center text-white">{{ $t('glossaries.youtube_channel') }}</span>
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
                        <span class="me-10 d-inline-flex"><i class="fa fa-envelope"/></span>info@gametour.co
                    </span>
                </div>

                <div class="col-md-6">
                    <rs-form :submit="sendContactMessage">
                        <div>
                            <input type="text" placeholder="*Your Name" class="contact-input"
                                   v-model="contactFields.name" required/>
                        </div>

                        <div>
                            <input type="email" placeholder="*Email Address" class="contact-input"
                                   v-model="contactFields.email" required/>
                        </div>

                        <div>
                            <textarea placeholder="*Your Message..." class="contact-input"
                                      v-model="contactFields.content" required></textarea>
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
        sendContactMessage,
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

            selectedTournamentTab: 'PUBLIC', // PUBLIC | ME

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

                            if (this.selectedTournamentTab === 'PUBLIC')
                                this.tournaments = this.gamesPlayed
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
                            if (this.selectedTournamentTab === 'ME')
                                this.tournaments = this.myTournaments
                        })
                        .catch(error => {

                        })
                        .finally(() => {
                            this.loadingMyTournaments = false;
                        });
                }
            },

            updateListByPagination(type) {
                switch (type) {
                    case 'PUBLIC':
                        this.getGamesPlayed();
                        break;

                    case 'ME':
                        this.getMyTournaments();
                        break;
                }
            },

            updateTournamentsSelected(type) {
                switch (type) {
                    case 'PUBLIC':
                        this.tournaments = this.gamesPlayed;
                        this.selectedTournamentTab = 'PUBLIC';
                        break;

                    case 'ME':
                        this.tournaments = this.myTournaments;
                        this.selectedTournamentTab = 'ME';
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
                                youtubeLink: tutorial.youtube_link,
                                backgroundImage: `/api/v1/uploads?id=${tutorial.image_media_id}`
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

            this.getRunningTournaments();
            this.getGamesPlayed();
            if (this.$store.state.user_auth)
                this.getMyTournaments();

            this.getTutorials();
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
