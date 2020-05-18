<template>
    <div>
        <div class="py-20 px-40">
            <div v-if="loadingRunningTournaments" class="py-50">
                <rs-overlay-loading width="28"/>
            </div>

            <running-tournament v-else-if="runningTournaments.length && !runningTournaments.is_joined"
                                v-for="(runningTournament, index) of runningTournaments"
                                :key="`running-tournament-${index}`"
                                class="mx--40 mx--lg-20 mt-30"
                                :style="{width: width < 1024 ? 'calc(100% + 80px)' : 'calc(100% + 40px)'}"
                                :tournament="runningTournament"
                                @refresh="refresh"/>

            <div v-else-if="!runningTournaments.length" class="py-50 text-center">
                {{ $t('glossaries.nothing_tournaments') }}
            </div>
        </div>

        <hr style="border: none; border-top: solid 1px #fff3">

        <div class="py-20 px-40">
            <template>
                <div v-if="loading" class="py-50">
                    <rs-overlay-loading width="28"/>
                </div>

                <my-tournament-item v-else-if="tournaments.length"
                                    v-for="(item, index) of tournaments"
                                    :key="`tournament-${index}`"
                                    :class="{'border-bottom': index < tournaments.length - 1}"
                                    :data="item"/>

                <div v-else class="py-50 text-center">
                    {{ $t('glossaries.nothing_tournaments') }}
                </div>
            </template>

            <rs-pagination v-if="!loading && tournaments.length" class="my-20" v-model="currentPage" :count="totalPages" @change="updateListByPagination"/>
        </div>
    </div>
</template>

<script>
    import {runningTournaments} from "../../api";

    const {itemsPerPage, myTournaments} = require("../../api");
    import i18n from '../../i18n'

    export default {
        name: "Tournaments",

        title: () => i18n.t('glossaries.dashboard') + ' | ' + i18n.t('glossaries.tournaments'),

        data: () => ({
            width: 0,

            itemsPerPage,
            currentPage: 1,
            totalPages: 0,
            loading: false,
            tournaments: [],

            loadingRunningTournaments: false,
            runningTournaments: [],
        }),

        methods: {
            handleResize() {
                this.width = window.innerWidth
            },

            updateListByPagination() {
                this.getMyTournaments()
            },

            refresh() {
                this.getRunningTournaments();
                this.getMyTournaments()
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

            getMyTournaments() {
                if (!this.loading) {
                    this.loading = true;

                    // Loading Games Played
                    myTournaments(this.currentPage, this.itemsPerPage)
                        .then(response => {
                            let totalPages = response.data.total / this.itemsPerPage;
                            this.totalPages = (totalPages % 1 !== 0) ? Math.floor(totalPages) + 1 : totalPages;
                            this.tournaments = response.data.result;
                        })
                        .catch(error => {

                        })
                        .finally(() => {
                            this.loading = false;
                        });
                }
            },
        },

        mounted() {
            this.handleResize();

            window.addEventListener('resize', this.handleResize);

            this.getRunningTournaments();
            this.getMyTournaments();
        },

        beforeDestroy() {
            window.removeEventListener('resize', this.handleResize);
        },
    }
</script>
