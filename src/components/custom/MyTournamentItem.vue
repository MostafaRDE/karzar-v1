<template>
    <div class="row py-20">

        <div class="col-md-2 m-0 d-flex justify-content-center">
            <img :src="data.map.image.url_static" alt="" style="max-width: 100%" />
        </div>

        <div class="col-xs-6 col-md-5 mt-20 mt-md-0 m-0 d-flex flex-direction-column justify-content-space-between align-items-flex-start">
            <div class="w-100 text-center text-xs-start">
                <span>{{ $t('glossaries.your_team_bonus_of_this_game') }}: <span class="text-white">{{ data.reward_value }}</span></span>
            </div>
            <div class="w-100 text-center text-xs-start">
                <h3 class="text-white">{{ data.title }}</h3>
            </div>
            <div class="w-100 text-center text-xs-start">
                <span lang="en" class="opacity-8 text-nowrap">{{ data.start_date | moment(`${$route.params.lang === 'af' ? 'jYYYY/jMM/jDD' : 'YYYY/MM/DD'} HH:mm`) }}</span>
            </div>
        </div>

        <div class="col-xs-6 col-md-5 mt-20 mt-md-0 m-0 d-flex flex-direction-column justify-content-space-between">
            <div class="text-center text-xs-end">
                <span class="w-fit-content text-white">
                    {{ $t ('glossaries.team') }} {{ data.winning_group }}
                    &nbsp;<span class="d-inline-flex">
                        <img src="/public/images/public/icons/ic-cup.svg" alt="" style="width: 18px">
                    </span>
                </span>
            </div>
            <div class="text-center text-xs-end">
                <span class="w-fit-content linkable" @click="showPlayersModal">
                    {{ $t('glossaries.players_list') }}
                    &nbsp;<span class="d-inline-flex"><icon-multiple-users fill="#BBBBBB" width="18px" /></span>
                </span>
            </div>
            <div class="text-center text-xs-end">
                <a class="w-fit-content" target="_blank" :href="data.youtube_link">
                    {{ !isRunning === 'WATCH' ? $t('glossaries.watch') : $t('glossaries.live_preview') }}
                    &nbsp;<span class="d-inline-flex"><icon-play fill="#BBBBBB" width="16px" /></span>
                </a>
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

            <div v-if="!loadingPlayers && !modals.pubgTournamentUsers.teams.length" class="pb-50 pt-40 text-center">
                <span>{{ $t('glossaries.no_players_found') }}</span>
            </div>

            <div v-if="!loadingPlayers && modals.pubgTournamentUsers.teams.length" class="row mt-20 px-10">
                <div class="col-sm-6" v-for="(team, index) of modals.pubgTournamentUsers.teams">
                    <div class="team-title d-flex">
                        <div class="d-flex">
                                <span class="font-size-xs text-nowrap"
                                      style="padding: 2px 20px 1px 8px; background: #ffffff0f">{{ `${$t('glossaries.team')} ${index + 1}` }}</span>
                        </div>
                        <div class="w-100 mb-5 ms-5" style="background: #ffffff0f"></div>
                    </div>
                    <div class="row py-10" style="background: #ffffff0f">
                        <div class="col-3 mb-0" v-for="player of team">
                            <div class="overflow-hidden position-relative"
                                 :style="player.image ? 'padding: 1px; background: url(/public/images/public/pubg-default-profile-border.svg) no-repeat; background-size: contain' : ''">
                                <img :src="player.image || '/public/images/public/pubg-default-profile.svg'"
                                     alt=""
                                     class="w-100"/>
                                <span class="position-absolute font-size-xxs"
                                      style="padding: 0 4px; background: #000B; bottom: 1px; left: 1px; right: 1px;">{{ player.name }}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </rs-modal>

    </div>
</template>

<script>
    import moment from 'moment'
    import {tournamentPlayers} from "../../api";
    import i18n from "../../i18n";

    export default {
        name: "MyTournamentItem",

        components: {
            'icon-arrow-left-type-1': () => import('../icons/IconArrowLeftType1.vue'),
            'icon-arrow-right-type-1': () => import('../icons/IconArrowRightType1.vue'),
            'icon-multiple-users': () => import('../icons/IconMultipleUsers.vue'),
            'icon-play': () => import('../icons/IconPlay.vue'),
            'title-span': () => import('../svg/TitleSpan.vue'),
        },

        props: ['data'],

        data: () => ({
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
            isRunning() {
                let now = moment(new Date());
                let duration = moment.duration(now.diff(new moment(this.data.start_date)));

                return !this.data.finished_at && duration.asMilliseconds() >= 0;
            }
        },
        methods: {
            showPlayersModal() {
                this.modals.pubgTournamentUsers.visibility = true;
                this.getPlayers()
            },

            getPlayers() {
                this.loadingPlayers = true;

                tournamentPlayers(this.data.id)
                    .then(response => {
                        this.modals.pubgTournamentUsers.teams = [];
                        response.data.result.forEach(player => {
                            if (!this.modals.pubgTournamentUsers.teams[player.group_number - 1])
                                this.modals.pubgTournamentUsers.teams[player.group_number - 1] = [];
                            this.modals.pubgTournamentUsers.teams[player.group_number - 1].push({
                                name: player.character_name,
                                image: player.profile_image
                            })
                        });
                    })
                    .catch(error => {
                        this.$toast.error({
                            title: i18n.t('glossaries.tournament_players'),
                            message: error.response.data.msg,
                        })
                    })
                    .finally(() => {
                        this.loadingPlayers = false;
                    })
            },
        },

        mounted() {
            // console.log(this.data)
        }
    }
</script>
