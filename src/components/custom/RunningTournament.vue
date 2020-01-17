<template>
    <div class="row running-tournament">
        <div class="col d-flex flex-direction-column align-items-center">

            {{ /* Start tournament timer */ }}
            <div class="row">
                <div class="col mb-0 justify-content-center d-flex">
                    <div class="timer w-fit-content position-relative d-flex align-items-center">
                        <span class="bottom-trapeze-sides trapeze-start-side"></span>
                        <span lang="en" class="ltr text-white"
                              style="padding: 7px 20px; background-color: #ff0e1f; font-size: 1.6em; font-family: 'Oxanium Medium', Arial Black, serif !important; letter-spacing: 4px">{{ timer }}</span>
                        <span class="bottom-trapeze-sides trapeze-end-side"></span>
                    </div>
                </div>
            </div>
            {{ /* End tournament timer */ }}

            {{ /* Start tournament reservation panel */ }}
            <div class="row running-tournament--panel">
                <div class="col mb-0">
                    <div class="row w-100 h-100 d-flex justify-content-flex-end">

                        {{ /* Start banner */ }}
                        <rs-section :class="[width < 1024 ? 'col-xl' : '']"
                                    class="mb-0 px-10 pe-lg-0 z-index-1 d-flex justify-content-flex-end align-items-center running-tournament--panel--banner">

                            <div class="flex-grow-0 my-10 ms-lg--30 d-flex align-items-center">
                                <img :src="`/api/v1/uploads?id=${model.map.image.id}&thumb=1024`"
                                     alt="" class="w-100"/>
                            </div>

                        </rs-section>
                        {{ /* End banner */ }}

                        <rs-section
                                class="col-xl mb-0 flex-grow-1 d-flex flex-direction-column running-tournament--panel--data">

                            {{ /* Start tournament data */ }}
                            <div class="flex-grow-1 d-flex py-20">

                                <div class="row">

                                    {{ /* Start tournament details */ }}
                                    <div class="col-lg-6 mb-0">
                                        <div class="flex-grow-1 d-flex align-items-center justify-content-space-around"
                                             :class="{'border-end': width >= 1024}">

                                            {{ /* Start tournament round data */ }}
                                            <div class="flex-grow-1 h-100 d-flex flex-direction-column justify-content-space-around px-lg-10 px-xl-20 running-tournament--panel--data--description"
                                                 :style="{maxWidth: '200px'}">

                                                {{ /* Map */ }}
                                                <div class="d-flex justify-content-space-between">
                                                    <span>{{ $t('glossaries.map') }}:</span>&nbsp;
                                                    <span lang="en">{{ model.map.name }}</span>
                                                </div>

                                                {{ /* Input */ }}
                                                <div class="d-flex justify-content-space-between">
                                                    <span>{{ $t('glossaries.fee') }}:</span>&nbsp;
                                                    <span lang="en">{{ model.fee }}$</span>
                                                </div>

                                                {{ /* Reward */ }}
                                                <div class="d-flex justify-content-space-between">
                                                    <span>{{ $t('glossaries.reward') }}:</span>&nbsp;
                                                    <span lang="en">{{ model.reward_value }}</span>
                                                </div>

                                            </div>

                                            {{ /* Start count gamers data */ }}
                                            <rs-progressbar-circular fontSize="12px"
                                                                     :progress="model.players_count"
                                                                     :max="model.capacity"
                                                                     size="100"
                                                                     strokeColorEmpty="#ff0e1f33"
                                                                     strokeColorProgress="#ff0e1f"
                                                                     textType="DIVIDE"/>
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
                                                <rs-input type="text" :label="$t('glossaries.character_name')"/>
                                            </div>
                                            <div class="mt-20">
                                                <span class="d-inline-flex"
                                                      @click="showPlayersModal">
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
                                    <rs-button transparent class="text-white px-80 text-nowrap">{{
                                        $t('glossaries.group_booking') }}
                                    </rs-button>
                                    <rs-button solid trapezeStart glow class="text-nowrap">{{ model.fee }}$ {{
                                        $t('glossaries.enter_the_tournament') }}
                                    </rs-button>
                                </div>
                            </div>
                        </rs-section>
                    </div>
                </div>
            </div>

            <rs-modal :styleModal="modals.pubgTournamentUsers.stylesModal"
                      v-model="modals.pubgTournamentUsers.visibility">
                <div class="py-10 text-center">
                    <span>{{ $t('pages.home.main.reservation_panel.pubg_users_modal.title') }}</span>
                    <span class="position-absolute font-size-xl end-15 cursor-pointer"
                          @click="modals.pubgTournamentUsers.visibility = false">×</span>
                </div>
                <hr class="mx-100 opacity-2"/>

                <div v-if="loadingPlayers" class="pb-50 pt-40">
                    <rs-overlay-loading/>
                </div>

                <div v-if="!loadingPlayers" class="row mt-20 px-10">
                    <div class="col-sm-6" v-for="(team, index) of modals.pubgTournamentUsers.teams">
                        <div class="team-title d-flex">
                            <div class="d-flex">
                                <span class="font-size-xs text-nowrap"
                                      style="padding: 2px 20px 1px 8px; background: #ffffff0f">{{ `${$t('glossaries.team')} ${index + 1}` }}</span>
                            </div>
                            <div class="w-100 mb-5 ms-5" style="background: #ffffff0f"></div>
                        </div>
                        <div class="row py-10" style="background: #ffffff0f">
                            <div class="col-3 mb-0 position-relative" v-for="player of team">
                                <img :src="player.image || '/public/images/public/pubg-default-profile.svg'" alt=""
                                     class="w-100"/>
                                <span class="position-absolute font-size-xxs"
                                      style="padding: 0 4px; background: #0005; bottom: 1px; left: 11px; right: 11px;">{{ player.name }}</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div></div>
            </rs-modal>
            {{ /* End tournament reservation panel */ }}

        </div>
    </div>
</template>

<script>
    import moment from 'moment'
    import {tournamentPlayers} from "../../api";

    export default {
        name: "RunningTournament",

        model: {
            prop: 'tournament',
            event: 'change',
        },

        props: {
            tournament: {},
        },

        components: {
            'icon-multiple-users': () => import('../../components/icons/IconMultipleUsers.vue'),
        },

        data: () => ({
            width: 0,

            timer: '',

            loadingPlayers: false,
            players: [],

            modals: {
                pubgTournamentUsers: {
                    visibility: false,
                    stylesModal: {
                        backgroundImage: 'linear-gradient(315deg, #292c2d 0%, #46545F 70%, #556978 100%)'
                    },
                    teams: [],
                },
            },
        }),

        computed: {
            model: {
                get() {
                    return this.tournament
                },
                set(tournament) {
                    this.$emit('change', tournament)
                }
            },
        },

        methods: {
            handleResize() {
                this.width = window.innerWidth
            },

            resetTimer() {
                let now = moment(new Date());
                let duration = moment.duration(now.diff(new moment(this.model.start_date)));
                this.timer = `${Math.abs(duration.days())} : ${Math.abs(duration.hours()).toString().padStart(2, '0')} : ${Math.abs(duration.minutes()).toString().padStart(2, '0')} : ${Math.abs(duration.seconds()).toString().padStart(2, '0')}`
            },

            showPlayersModal() {
                this.modals.pubgTournamentUsers.visibility = true;
                this.getPlayers()
            },

            getPlayers() {
                this.loadingPlayers = true;

                tournamentPlayers(this.model.id)
                    .then(response => {
                        this.modals.pubgTournamentUsers.teams = [];
                        response.data.result.forEach(player => {
                            if (!this.modals.pubgTournamentUsers.teams[player.group_number - 1])
                                this.modals.pubgTournamentUsers.teams[player.group_number - 1] = [];
                            this.modals.pubgTournamentUsers.teams[player.group_number - 1].push({
                                name: player.character_name,
                                image: player.profile_image_id
                            })
                        });
                    })
                    .catch(error => {

                    })
                    .finally(() => {
                        this.loadingPlayers = false;
                    })
            }
        },

        mounted() {
            this.handleResize();

            this.resetTimer();

            let vm = this;
            window.addEventListener('resize', function () {
                vm.handleResize()
            });

            setInterval(function () {
                vm.resetTimer();
            }, 1000)
        }
    }
</script>

<style lang="stylus">
    .running-tournament
        &--panel
            &--data
                width calc(100% - 280px)
                padding-left 0 !important
                padding-right 0 !important

                &--description
                    span
                        font-size 18px

                        &:nth-child(1)
                            opacity 0.8

                        &:nth-child(2)
                            color white
                            font-weight 900

    @media screen and (min-width: 1024px)
        .running-tournament
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
</style>
