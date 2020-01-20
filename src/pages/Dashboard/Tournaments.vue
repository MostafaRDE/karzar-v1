<template>
    <div class="py-20 px-40">
        <my-tournament-item v-if="tournaments.length && !loading"
                            v-for="(item, index) of tournaments"
                            :key="`tournament-${index}`"
                            :class="{'border-bottom': index < tournaments.length - 1}"
                            :data="item"/>

        <div v-if="loading" class="py-50">
            <rs-overlay-loading width="28"/>
        </div>

        <rs-pagination v-if="tournaments.length" class="my-20" v-model="currentPage" :count="totalPages" @change="updateListByPagination"/>
    </div>
</template>

<script>
    const {itemsPerPage, myTournaments} = require("../../api");
    export default {
        name: "Tournaments",

        data: () => ({
            itemsPerPage,
            currentPage: 1,
            totalPages: 0,
            loading: false,
            tournaments: [],
        }),

        methods: {
            updateListByPagination() {
                this.getMyTournaments()
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
            this.getMyTournaments();
        }
    }
</script>
