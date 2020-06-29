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
                    <h4 class="text-center w-100 text-white">{{ $t('glossaries.online_karzar_server') }}</h4>
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

                    <rs-tabs :tabs="tabs" v-model="selectedTab">

                        <rs-tab-content class="px-20"
                                        id="page--games--counter-strike--help"
                                        v-show="selectedTab === 0">

                            <div class="d-flex align-items-center py-40">
                                <div class="row">
                                    <div class="col-lg">
                                        <span class="flex-grow-1">{{ $t('messages.infos.first_download_counter_strike_1_6_via_the_link_below') }}</span>
                                    </div>
                                    <div class="col-lg-5">
                                        <rs-button solid glow class="w-100">{{ $t('glossaries.download_counter_strike_1_6') }}</rs-button>
                                    </div>
                                </div>
                            </div>

                            <hr class="w-60 opacity-2" style="border: none; border-top: solid 1px #fff"/>

                            <div class="d-flex align-items-center py-40">
                                <div class="row">
                                    <div class="col-lg">
                                        <span class="flex-grow-1">{{ $t('glossaries.download_anti_chit_sxe_injected_17_2_software') }}</span>
                                    </div>
                                    <div class="col-lg-5">
                                        <rs-button solid glow class="w-100">{{ $t('glossaries.download_anti_chit') }}</rs-button>
                                    </div>
                                </div>
                            </div>

                            <hr class="w-60 opacity-2" style="border: none; border-top: solid 1px #fff"/>

                            <div class="d-flex align-items-center py-40">
                                <div class="row">
                                    <div class="col-lg">
                                        <span class="flex-grow-1 text-justify">{{ $t('messages.infos.after_downloading_the_counter_strike_unzip_it_then_open_the_anti_chit_software_and_then_enter_the_game_counter_strike') }}</span>
                                    </div>
                                </div>
                            </div>

                            <hr class="w-60 opacity-2" style="border: none; border-top: solid 1px #fff"/>

                            <div class="d-flex align-items-center py-40">
                                <div class="row">
                                    <div class="col-lg">
                                        <span class="flex-grow-1 text-justify">{{ $t('messages.infos.enter_the_find_server_section_and_click_the_favorites_button_then_click_add_server_at_the_bottom_of_the_page_then_enter_our_server_ip_and_click_ok_and_enter_the_server') }}</span>
                                    </div>
                                </div>
                            </div>

                        </rs-tab-content>

                        <rs-tab-content class="position-relative flex-direction-column px-0 justify-content-center overflow-hidden align-items-center"
                                        :class="{'d-flex': selectedTab === 1}"
                                        id="page--games--counter-strike--installation-guide"
                                        v-show="selectedTab === 1">

                            <img src="/public/images/public/backgrounds/how-to-install-counter-strike.jpg" alt="" class="opacity-2 w-100"/>
                            <icon-play class="position-absolute" size="48px" fill="#fff"/>

                        </rs-tab-content>

                    </rs-tabs>
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
            selectedTab: 0,

            tabs: [
                {
                    name: 'page--games--counter-strike--help',
                    content: 'page--games--counter-strike--help',
                    label: i18n.t('glossaries.download_files'),
                },
                {
                    name: 'page--games--counter-strike--installation-guide',
                    content: 'page--games--counter-strike--installation-guide',
                    label: i18n.t('glossaries.installation_guide'),
                },
            ],

            scrollY: 0,
            titleStyles: {
                height: '360px',
                backgroundAttachment: 'fixed',
                backgroundImage: "url('/public/images/public/backgrounds/bg-title-counter-strike.jpg')",
                backgroundPosition: 'center 0',
                backgroundSize: 'cover',
                boxShadow: '#0005 15px 15px 21px 0',
            },
        }),

        methods: {
            handleScroll() {
                this.scrollY = window.scrollY;
                this.titleStyles.backgroundPosition = `center ${(this.scrollY * -1 / 3) - 238}px`
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
