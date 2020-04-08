<template>
    <div>
        <div class="container-fluid title-holder text-center text-uppercase" :style="titleStyles">
            <div class="title-wrapper" style="height: 360px">
                <h1 class="title-inner text-center">{{ $t('glossaries.counter_strike') }}</h1>
            </div>
        </div>

        <div class="container mb-40 mt-100">
            <div class="row justify-content-center">
                <div class="col-10">
                    <h2 class="text-center w-100 text-white">{{ $t('glossaries.counter_strike_1_6') }}</h2>
                    <h4 class="text-center w-100 text-white">{{ $t('glossaries.online_gametour_server') }}</h4>
                    <title-span class="mb-60 mt-20 w-100 d-block text-center"/>

                    <counter-strike-tournament/>
                </div>
            </div>
        </div>

        <div class="container mb-40 mt-60">
            <div class="row justify-content-center">
                <div class="col-10">
                    <h2 class="text-center w-100 text-white text-uppercase">{{ $t('glossaries.tutorials') }}</h2>
                    <h4 class="text-center w-100 text-white">{{ $t('glossaries.download_and_join_to_server') }}</h4>
                    <title-span class="mb-60 mt-20 w-100 d-block text-center"/>


                    <rs-section class="mt-60 flex-direction-column">

                        <div class="overflow-x-overlay border-bottom overflow-y-hidden">
                            <div class="d-flex w-fit-content">
                                <rs-button class="px-20 me-15 text-nowrap"
                                           :transparent="selectedTab === 'MOVIE'"
                                           :solid="selectedTab === 'HELP'"
                                           glow
                                           :reverseTrapezeEnd="selectedTab === 'HELP'"
                                           @click.native="updateSelectedTab('HELP')">
                                    {{ $t('glossaries.download_files') }}
                                </rs-button>
                                <rs-button v-if="$store.state.user_auth"
                                           class="px-20 text-nowrap"
                                           :transparent="selectedTab === 'HELP'"
                                           :solid="selectedTab === 'MOVIE'"
                                           glow
                                           :trapezeStart="selectedTab === 'MOVIE'"
                                           :reverseTrapezeEnd="selectedTab === 'MOVIE'"
                                           @click.native="updateSelectedTab('MOVIE')">
                                    {{ $t('glossaries.installation_guide') }}
                                </rs-button>
                            </div>
                        </div>

                        <div v-if="selectedTab === 'HELP'" class="d-flex flex-direction-column px-20">

                            <div class="d-flex align-items-center py-40">
                                <span class="flex-grow-1">{{ $t('messages.infos.first_download_counter_strike_1_6_via_the_link_below') }}</span>
                                <rs-button solid glow>{{ $t('glossaries.download_counter_strike_1_6') }}</rs-button>
                            </div>

                            <hr class="w-60 opacity-2" style="border: none; border-top: solid 1px #fff"/>

                            <div class="d-flex align-items-center py-40">
                                <span class="flex-grow-1">{{ $t('glossaries.download_anti_chit_sxe_injected_17_2_software') }}</span>
                                <rs-button solid glow>{{ $t('glossaries.download_anti_chit') }}</rs-button>
                            </div>

                            <hr class="w-60 opacity-2" style="border: none; border-top: solid 1px #fff"/>

                            <div class="d-flex align-items-center py-40">
                                <span class="flex-grow-1 text-justify">{{ $t('messages.infos.after_downloading_the_counter_strike_unzip_it_then_open_the_anti_chit_software_and_then_enter_the_game_counter_strike') }}</span>
                            </div>

                            <hr class="w-60 opacity-2" style="border: none; border-top: solid 1px #fff"/>

                            <div class="d-flex align-items-center py-40">
                                <span class="flex-grow-1 text-justify">{{ $t('messages.infos.enter_the_find_server_section_and_click_the_favorites_button_then_click_add_server_at_the_bottom_of_the_page_then_enter_our_server_ip_and_click_ok_and_enter_the_server') }}</span>
                            </div>

                        </div>

                        <div v-if="selectedTab === 'MOVIE'" class="position-relative d-flex flex-direction-column px-0 justify-content-center overflow-hidden align-items-center" style="height: 400px">
                            <img src="/public/images/public/backgrounds/how-to-install-counter-strike.png" alt="" class="opacity-2 w-100"/>
                            <icon-play class="position-absolute" size="48px" fill="#fff"/>
                        </div>

                    </rs-section>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import i18n from '../../../i18n'

    export default {
        name: "CounterStrike",

        title: () => i18n.t('glossaries.counter_strike') + ' | ' + i18n.t('app.name'),

        components: {
            'icon-play': () => import('../../../components/icons/IconPlay.vue'),
            'title-span': () => import('../../../components/svg/TitleSpan.vue'),
        },

        data: () => ({
            scrollY: 0,
            titleStyles: {
                height: '360px',
                backgroundAttachment: 'fixed',
                backgroundImage: "url('/public/images/public/backgrounds/bg-title-counter-strike.jpg')",
                backgroundPosition: 'center 0',
                boxShadow: '#0005 15px 15px 21px 0',
            },

            selectedTab: 'HELP', // HELP | MOVIE
        }),

        methods: {
            handleScroll() {
                this.scrollY = window.scrollY;
                this.titleStyles.backgroundPosition = `center ${(this.scrollY * -1 / 3) - 300}px`
            },
            updateSelectedTab(tab) {
                this.selectedTab = tab
            },
        },

        mounted() {
            this.handleScroll();

            window.addEventListener('scroll', this.handleScroll);
        },

        destroyed() {
            window.removeEventListener('scroll', this.handleScroll);
        },
    }
</script>
