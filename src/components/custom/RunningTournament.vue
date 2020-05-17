<template>
    <div class="row running-tournament">
        <div class="col d-flex flex-direction-column align-items-center">

            {{ /* Start tournament timer */ }}
            <div class="row">
                <div class="col mb-0 justify-content-center d-flex">
                    <div class="timer w-fit-content position-relative d-flex align-items-center">
                        <span class="bottom-trapeze-sides trapeze-start-side"/>
                        <span :lang="isRunning && $route.params.lang === 'af' ? 'af' : 'en'" class="ltr text-white text-nowrap"
                              :style="{padding: '7px 20px', backgroundColor: '#ff0e1f', fontSize: '1.6em', fontFamily: $route.params.lang === 'en' ? 'Oxanium Medium, Arial Black, serif !important' : '', letterSpacing: $route.params.lang !== 'af' ? '4px' : ''}">
                            {{ isRunning ? $t('glossaries.running') : timer }}
                        </span>
                        <span class="bottom-trapeze-sides trapeze-end-side"/>
                    </div>
                </div>
            </div>
            {{ /* End tournament timer */ }}

            {{ /* Start tournament reservation panel */ }}
            <div class="row running-tournament--panel">
                <div class="col mb-0">
                    <div class="row w-100 h-100 d-flex justify-content-flex-end">

                        {{ /* Start map image */ }}
                        <rs-section :class="[width < 1024 ? 'col-xl' : '']"
                                    class="mb-0 px-10 pe-lg-0 z-index-1 d-flex justify-content-flex-end align-items-center running-tournament--panel--banner">

                            <div class="flex-grow-0 my-10 ms-lg--30 d-flex align-items-center">
                                <img :src="model.map.image.url_static"
                                     alt="" class="w-100"/>
                            </div>

                        </rs-section>
                        {{ /* End map image */ }}

                        <rs-section
                                class="col-xl mb-0 flex-grow-1 d-flex flex-direction-column running-tournament--panel--data">

                            {{ /* Start tournament single data */ }}
                            <div v-if="reservationType === 'SINGLE'" class="flex-grow-1 d-flex py-20" :class="{'position-absolute' : reservationType === 'GROUP'}">

                                <div class="row">

                                    {{ /* Start tournament details */ }}
                                    <div class="col-lg-6 mb-0">
                                        <div class="flex-grow-1 d-flex align-items-center justify-content-space-around pe-lg-10 h-100"
                                             :class="{'border-end': width >= 1024}">

                                            {{ /* Start tournament round data */ }}
                                            <div class="flex-grow-1 h-100 d-flex flex-direction-column justify-content-space-around px-lg-10 px-xl-20 running-tournament--panel--data--description me-10"
                                                 :style="{maxWidth: '200px'}">

                                                {{ /* Map */ }}
                                                <div class="d-flex justify-content-space-between">
                                                    <span>{{ $t('glossaries.map') }}:</span>&nbsp;
                                                    <span class="text-left">{{ model.map.name }}</span>
                                                </div>

                                                {{ /* Input */ }}
                                                <div class="d-flex justify-content-space-between">
                                                    <span>{{ $t('glossaries.fee') }}:</span>&nbsp;
                                                    <span class="text-left text-nowrap">{{ model.fee == 0 ? $t('glossaries.free') : `${model.fee}$` }}</span>
                                                </div>

                                                {{ /* Reward */ }}
                                                <div class="d-flex justify-content-space-between">
                                                    <span>{{ $t('glossaries.reward') }}:</span>&nbsp;
                                                    <span class="text-left text-nowrap">{{ model.reward_value }}{{ rewardValueType(model.reward_value_type) }}</span>
                                                </div>

                                            </div>

                                            {{ /* Start count gamers data */ }}
                                            <rs-progressbar-circular v-if="width >= 1200 || width < 1024"
                                                                     fontSize="12px"
                                                                     :progress="model.players_count || 0"
                                                                     :max="model.capacity"
                                                                     :size="width < 1200 && width >= 1024 ? 60 : 100"
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
                                            <div v-if="!model.is_joined && !isRunning">
                                                <rs-input type="text"
                                                          :label="$t('glossaries.character_name')"
                                                          :source="fields.player1CharactersList"
                                                          :sourceLoading="fields.player1CharactersListLoading"
                                                          @input="getCharacters(1, $event)"
                                                          v-model="fields.player1">
                                                    <template slot="source-item">
                                                        <character-input-adapter v-for="(data, index) of fields.player1CharactersList"
                                                                                 :key="`join-${index}`"
                                                                                 :data="data"
                                                                                 :class="index < fields.player1CharactersList.length - 1 ? 'border-bottom' : ''"
                                                                                 @click.native="updateCharacter(1, data)"/>
                                                    </template>
                                                </rs-input>
                                            </div>
                                            <div class="mt-20 d-flex align-items-center">
                                                <span class="d-inline-flex cursor-pointer pe-10"
                                                      @click="showPlayersModal">
                                                    <icon-multiple-users fill="#BBBBBB" width="35px"/>
                                                </span>
                                                <div v-if="!model.is_joined && !isRunning" class="d-inline-flex flex-direction-column ps-15 border-start">
                                                    <template v-if="$store.state.user_auth">
                                                        <span>{{ $t('glossaries.room') }}: {{ room }}</span>
                                                        <span>{{ $t('glossaries.password') }}: {{ password }}</span>
                                                    </template>
                                                    <template v-else>
                                                        <span>{{ $t('glossaries.room') }}: <router-link :to="{name: 'login', params: {lang: $route.params.lang}}">{{ $t('glossaries.login') }}</router-link></span>
                                                        <span>{{ $t('glossaries.password') }}: <router-link :to="{name: 'login', params: {lang: $route.params.lang}}">{{ $t('glossaries.login') }}</router-link></span>
                                                    </template>
                                                </div>
                                            </div>
                                            <div v-if="model.is_joined || isRunning" class="d-inline-flex flex-direction-column mt-20">
                                                <template v-if="$store.state.user_auth">
                                                    <span>{{ $t('glossaries.room') }}: {{ room }}</span>
                                                    <span>{{ $t('glossaries.password') }}: {{ password }}</span>
                                                </template>
                                                <template v-else>
                                                    <span>{{ $t('glossaries.room') }}: <router-link :to="{name: 'login', params: {lang: $route.params.lang}}">{{ $t('glossaries.login') }}</router-link></span>
                                                    <span>{{ $t('glossaries.password') }}: <router-link :to="{name: 'login', params: {lang: $route.params.lang}}">{{ $t('glossaries.login') }}</router-link></span>
                                                </template>
                                            </div>
                                        </div>
                                    </div>
                                    {{ /* End getting user registration data */ }}
                                </div>

                            </div>
                            {{ /* End tournament single data */ }}

                            {{ /* Start tournament multiple form */ }}
                            <div v-if="reservationType === 'GROUP'" class="flex-grow-1 d-flex py-20" :class="{'position-absolute' : reservationType === 'SINGLE'}" style="min-height: 148px">

                                    <div class="row">
                                        <div class="col-lg-6 mb-0 mt-10 mt-lg-0">
                                            <div class="d-flex align-items-center">
                                                <rs-check-box value="true"/>
                                                <rs-input type="text"
                                                          class="flex-grow-1"
                                                          :label="$t('glossaries.character_name')"
                                                          :source="fields.player1CharactersList"
                                                          :sourceLoading="fields.player1CharactersListLoading"
                                                          @input="getCharacters(1, $event)"
                                                          v-model="fields.player1">
                                                    <template slot="source-item">
                                                        <character-input-adapter v-for="(data, index) of fields.player1CharactersList"
                                                                                 :key="`join-team-1-${index}`"
                                                                                 :data="data"
                                                                                 :class="index < fields.player1CharactersList.length - 1 ? 'border-bottom' : ''"
                                                                                 @click.native="updateCharacter(1, data)"/>
                                                    </template>
                                                </rs-input>
                                            </div>
                                        </div>
                                        <div class="col-lg-6 mb-0 mt-10 mt-lg-0">
                                            <div class="d-flex align-items-center">
                                                <rs-check-box v-model="actives.player2"/>
                                                <rs-input type="text"
                                                          class="flex-grow-1"
                                                          :label="$t('glossaries.character_name')"
                                                          :disabled="!actives.player2"
                                                          :source="fields.player2CharactersList"
                                                          :sourceLoading="fields.player2CharactersListLoading"
                                                          @input="getCharacters(2, $event)"
                                                          v-model="fields.player2">
                                                    <template slot="source-item">
                                                        <character-input-adapter v-for="(data, index) of fields.player2CharactersList"
                                                                                 :key="`join-team-2-${index}`"
                                                                                 :data="data"
                                                                                 :class="index < fields.player2CharactersList.length - 1 ? 'border-bottom' : ''"
                                                                                 @click.native="updateCharacter(2, data)"/>
                                                    </template>
                                                </rs-input>
                                            </div>
                                        </div>
                                        <div class="col-lg-6 mb-0 mt-10">
                                            <div class="d-flex align-items-center">
                                                <rs-check-box v-model="actives.player3"/>
                                                <rs-input type="text"
                                                          class="flex-grow-1"
                                                          :label="$t('glossaries.character_name')"
                                                          :disabled="!actives.player3"
                                                          :source="fields.player3CharactersList"
                                                          :sourceLoading="fields.player3CharactersListLoading"
                                                          @input="getCharacters(3, $event)"
                                                          v-model="fields.player3">
                                                    <template slot="source-item">
                                                        <character-input-adapter v-for="(data, index) of fields.player3CharactersList"
                                                                                 :key="`join-team-3-${index}`"
                                                                                 :data="data"
                                                                                 :class="index < fields.player3CharactersList.length - 1 ? 'border-bottom' : ''"
                                                                                 @click.native="updateCharacter(3, data)"/>
                                                    </template>
                                                </rs-input>
                                            </div>
                                        </div>
                                        <div class="col-lg-6 mb-0 mt-10">
                                            <div class="d-flex align-items-center">
                                                <rs-check-box v-model="actives.player4"/>
                                                <rs-input type="text"
                                                          class="flex-grow-1"
                                                          :label="$t('glossaries.character_name')"
                                                          :disabled="!actives.player4"
                                                          :source="fields.player4CharactersList"
                                                          :sourceLoading="fields.player4CharactersListLoading"
                                                          @input="getCharacters(4, $event)"
                                                          v-model="fields.player4">
                                                    <template slot="source-item">
                                                        <character-input-adapter v-for="(data, index) of fields.player4CharactersList"
                                                                                 :key="`join-team-4-${index}`"
                                                                                 :data="data"
                                                                                 :class="index < fields.player4CharactersList.length - 1 ? 'border-bottom' : ''"
                                                                                 @click.native="updateCharacter(4, data)"/>
                                                    </template>
                                                </rs-input>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            {{ /* End tournament multiple form */ }}

                            <div class="overflow-x-overlay overflow-y-hidden border-top">
                                <div class="flex-grow-1 d-flex ms-auto" :class="[width >= 1024 || (width >= 1024 && (!model.is_joined && !isRunning)) ? 'w-fit-content' : 'w-100', {'flex-direction-column': width <= 425}]">
                                    <rs-button v-if="!model.is_joined && !isRunning"
                                               transparent glow
                                               class="text-nowrap"
                                               :class="{'flex-grow-1': width < 1024}"
                                               @click.native="reservationType === 'SINGLE' && tournament.group_capacity > 1 ? reservationType = 'GROUP' : reservationType = 'SINGLE'">
                                        {{ $t('glossaries.' + (reservationType === 'SINGLE' && tournament.group_capacity > 1 ? 'team_join' : 'information')) }}
                                    </rs-button>
                                    <rs-button v-if="tournament.group_capacity > 1"
                                               :loading="joining"
                                               solid
                                               glow
                                               :trapezeStart="width >= 1024 || (width >= 1024 && (!model.is_joined && !isRunning))"
                                               class="text-white text-nowrap"
                                               :class="[width >= 1024 || (!model.is_joined && !isRunning) ? '' : 'w-100', {'px-80': width >= 1024}, {'flex-grow-1': width < 1024}]"
                                               @click.native="storePlayers">
                                        {{ primaryTextButton }}
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

                <div v-if="!loadingPlayers && !modals.pubgTournamentUsers.teams.length" class="pb-50 pt-40 text-center">
                    <span>{{ $t('glossaries.no_players_found') }}</span>
                </div>

                <div v-if="!loadingPlayers && modals.pubgTournamentUsers.teams.length" class="row mt-20 px-10">
                    <div class="col-sm-6" v-for="(team, index) of modals.pubgTournamentUsers.teams">
                        <div class="team-title d-flex">
                            <div class="d-flex">
                                <span class="font-size-xs text-nowrap"
                                      style="padding: 2px 20px 1px 8px"
                                      :style="{background: isMyTeam(team) ? '#E17F0045' : '#ffffff0f'}">{{ `${$t('glossaries.team')} ${index + 1}` }}</span>
                            </div>
                            <div class="w-100 mb-5 ms-5" style="background: #ffffff0f"></div>
                        </div>
                        <div class="row py-10" :style="{background: isMyTeam(team) ? '#E17F0045' : '#ffffff0f'}">
                            <div class="col-3 mb-0" v-for="player of team">
                                <div class="overflow-hidden position-relative"
                                     :style="player.image ? 'padding: 1px; background: url(/public/images/public/pubg-default-profile-border.svg) no-repeat; background-size: contain' : ''">
                                    <img :src="player.image ? player.image.url_static : '/public/images/public/pubg-default-profile.svg'"
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
            {{ /* End tournament reservation panel */ }}

        </div>
    </div>
</template>

<script>
    import moment from 'moment'
    import {characters, enterToTheTournament, tournamentPlayers} from "../../api";
    import i18n from '../../i18n'

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
            isRunning: false,
            isRunningTextVisibility: false,

            reservationType: 'SINGLE', // SINGLE | GROUP

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


            joining: false,
            actives: {
                player2: false,
                player3: false,
                player4: false,
            },
            characters: [],
            fields: {
                player1: '',
                player1Id: null,
                player1CharactersList: [],
                player1CharactersListLoading: false,
                player1CharactersListVisibility: false,
                player2: '',
                player2Id: null,
                player2CharactersList: [],
                player2CharactersListLoading: false,
                player2CharactersListVisibility: false,
                player3: '',
                player3Id: null,
                player3CharactersList: [],
                player3CharactersListLoading: false,
                player3CharactersListVisibility: false,
                player4: '',
                player4Id: null,
                player4CharactersList: [],
                player4CharactersListLoading: false,
                player4CharactersListVisibility: false,
            }
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
            password() {
                return this.tournament.password || i18n.t('glossaries.not_registered')
            },
            room() {
                return this.tournament.username || i18n.t('glossaries.not_registered')
            },
            usersCount() {
                let count = 1;
                if (this.actives.player2)
                    count++;
                if (this.actives.player3)
                    count++;
                if (this.actives.player4)
                    count++;
                return count;
            },
            primaryTextButton() {
                let text = '';
                if (!this.isRunning) {
                    text += i18n.t(`glossaries.${this.model.is_joined ? 'tournaments' : 'join_now'}`)
                } else {
                    text += i18n.t(`glossaries.watch_now`)
                }
                return text;
            }
        },

        methods: {
            rewardValueType(type) {
                switch (type) {
                    // Dollar currency
                    case 0:
                        return '$';

                    // String
                    case 1:
                        return null;

                    // UC pubg currency
                    case 2:
                        return ' UC';
                }
            },

            isMyTeam(team) {
                if (this.$store.state.profile)
                    for (let i = 0; i < team.length; i++)
                        if (team[i].userId === this.$store.state.profile.id)
                            return true;

                return false;
            },

            updateCharacter(id, data) {
                this.fields[`player${id}`] = data.name;
                this.fields[`player${id}Id`] = data.id;

                this.filterListCharacters();
            },

            filterListCharacters() {
                let vm = this;
                for (let i = 1; i <= 4; i++)
                    this.fields[`player${i}CharactersList`] = this.characters.filter(item => {
                        if (`${vm.fields[`player${i}Id`]}` === `${item.id}`)
                            return true;

                        let result = (
                            (`${vm.fields.player1Id}` !== `${item.id}`) &&
                            (!vm.actives.player2 || (vm.actives.player2 && `${vm.fields.player2Id}` !== `${item.id}`)) &&
                            (!vm.actives.player3 || (vm.actives.player3 && `${vm.fields.player3Id}` !== `${item.id}`)) &&
                            (!vm.actives.player4 || (vm.actives.player4 && `${vm.fields.player4Id}` !== `${item.id}`))
                        );
                        if (result && this.fields[`player${i}`] && this.fields[`player${i}`] !== '')
                            return result && vm.likeSearch(item.name, this.fields[`player${i}`]);
                        else
                            return result;
                    });
            },

            handleResize() {
                this.width = window.innerWidth
            },

            resetTimer() {
                if (this.isRunning) {
                    this.isRunningTextVisibility = !this.isRunningTextVisibility
                } else {
                    let now = moment(new Date());
                    let duration = moment.duration(now.diff(new moment(this.model.start_date)));

                    this.timer = `${Math.abs(duration.days())} : ${Math.abs(duration.hours()).toString().padStart(2, '0')} : ${Math.abs(duration.minutes()).toString().padStart(2, '0')} : ${Math.abs(duration.seconds()).toString().padStart(2, '0')}`;
                    this.isRunning = !this.model.ended_at && duration.asMilliseconds() >= 0;
                }
            },

            showPlayersModal() {
                this.modals.pubgTournamentUsers.visibility = true;
                this.getPlayers()
            },

            getCharacters(id, character) {
                if (this.fields[`player${id}Id`] && this.fields[`player${id}Id`] !== '') {
                    this.fields[`player${id}`] = '';
                    this.fields[`player${id}Id`] = '';
                }
                this.filterListCharacters();

                if (id) {
                    if (isNaN(character)) {

                    } else if (character && character !== '') {
                        if (!this.fields[`player${id}CharactersListLoading`]) {
                            this.fields[`player${id}CharactersListLoading`] = true;
                            characters(character)
                                .then(res => {
                                    this.fields[`player${id}CharactersList`] = res.data.result
                                })
                                .catch(err => {})
                                .finally(() => {
                                    this.fields[`player${id}CharactersListLoading`] = false
                                })
                        }
                    } else {

                    }
                } else {
                    characters(character)
                        .then(res => {
                            let data = JSON.stringify(res.data.result);
                            this.characters = JSON.parse(data);
                            this.fields[`player1CharactersList`] = JSON.parse(data);
                            this.fields[`player2CharactersList`] = JSON.parse(data);
                            this.fields[`player3CharactersList`] = JSON.parse(data);
                            this.fields[`player4CharactersList`] = JSON.parse(data);
                        })
                        .catch(err => {

                        })
                        .finally(() => {
                            this.fields[`player${id}CharactersListLoading`] = false
                        })
                }
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
                                image: player.profile_image,
                                userId: player.user_id,
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

            storePlayers() {
                if (this.isRunning) {
                    // console.log(this.model)
                    window.open(this.model.youtube_link, '_blank');
                    return;
                }

                if (!this.$store.state.user_auth) {
                    this.$router.push({name: 'login', params: {lang: this.$route.params.lang}});
                    return;
                }

                if (this.model.is_joined) {
                    this.$router.push({name: 'dashboardTournaments', params: {lang: this.$route.params.lang}});
                    return;
                }

                if (this.joining)
                    return;

                // Check selected players if exists or not
                let errors = 0,
                    characterNames = '';

                if (!this.fields.player1Id)
                    errors++;
                else
                    characterNames += this.fields.player1Id;

                if (this.actives.player2) {
                    if (!this.fields.player2Id)
                        errors++;
                    else
                        characterNames += `,${this.fields.player2Id}`;
                }

                if (this.actives.player3) {
                    if (!this.fields.player3Id)
                        errors++;
                    else
                        characterNames += `,${this.fields.player3Id}`;
                }

                if (this.actives.player4) {
                    if (!this.fields.player4Id)
                        errors++;
                    else
                        characterNames += `,${this.fields.player4Id}`;
                }

                if (errors > 0) {
                    this.$toast.error({
                        title: i18n.t('glossaries.join_to_tournament'),
                        message: i18n.t(`glossaries.please_enter_the_name_of_your_character${this.reservationType === 'SINGLE' ? '' : 's'}`),
                    });
                } else {
                    let price = this.model.fee * characterNames.split(',').length;

                    if (this.$store.state.balance >= price) {
                        this.joining = true;

                        enterToTheTournament(this.tournament.id, characterNames)
                            .then(response => {
                                this.$toast.success({
                                    title: i18n.t('glossaries.join_to_tournament'),
                                    message: i18n.t('messages.successes.successfully_joined_to_the_tournament')
                                });

                                this.reservationType = 'SINGLE';
                                this.$store.dispatch('getBalance');
                                this.$emit('refresh', true)
                            })
                            .catch(error => {
                                this.$toast.error({
                                    title: i18n.t('glossaries.join_to_tournament'),
                                    message: error.response.data.msg,
                                })
                            })
                            .finally(() => {
                                this.joining = false
                            })
                    } else {

                    }
                }
            }
        },

        mounted() {
            this.handleResize();

            this.resetTimer();

            this.getCharacters();

            window.addEventListener('resize', this.handleResize);

            let vm = this;
            setInterval(function () {
                vm.resetTimer();
            }, 1000)
        },

        watch: {

        },

        beforeDestroy() {
            window.removeEventListener('resize', this.handleResize);
        }
    }
</script>

<style lang="stylus">
    .running-tournament
        &--panel
            &--data
                padding-left 0 !important
                padding-right 0 !important
                &--description
                    span
                        &:nth-child(1)
                            opacity 0.8
                        &:nth-child(2)
                            color white


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
                    width calc(100% - 280px)

                    &--description
                        span
                            font-size 18px

                            /*&:nth-child(1)*/
                            /*    opacity 0.8*/

                            /*&:nth-child(2)*/
                            /*    color white*/
                            /*    font-weight 900*/

                    .content > div:nth-child(1)
                        box-shadow -4px 2px 9px 0 #000
</style>
