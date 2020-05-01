<template>
    <div class="py-20 px-40">
        <template>
            <div v-if="loading" class="py-50">
                <rs-overlay-loading width="28"/>
            </div>

            <transaction v-else-if="transactions.length"
                         v-for="(item, index) of transactions"
                         :key="`transaction-${index}`"
                         :class="{'border-bottom': index < transactions.length - 1}"
                         :data="item"/>

            <div v-else class="py-50 text-center">
                {{ $t('glossaries.nothing_transactions') }}
            </div>
        </template>

        <rs-pagination v-if="transactions.length" class="my-20" v-model="currentPage" :count="totalPages" @change="updateListByPagination"/>
    </div>
</template>

<script>
    import {itemsPerPage, myTransactions} from "../../api"
    import i18n from '../../i18n'

    export default {
        name: "Transactions",

        title: () => i18n.t('glossaries.dashboard') + ' | ' + i18n.t('glossaries.transactions'),

        components: {
            'icon-arrow-left-type-1': () => import('../../components/icons/IconArrowLeftType1.vue'),
            'icon-arrow-right-type-1': () => import('../../components/icons/IconArrowRightType1.vue'),
        },

        data: () => ({
            itemsPerPage,
            currentPage: 1,
            totalPages: 0,
            loading: false,
            transactions: []
        }),

        methods: {
            updateListByPagination() {
                this.getMyTransactions()
            },
            getMyTransactions() {
                if (!this.loading) {
                    this.loading = true;

                    // Loading Games Played
                    myTransactions(this.currentPage, this.itemsPerPage)
                        .then(response => {
                            let totalPages = response.data.total / this.itemsPerPage;
                            this.totalPages = (totalPages % 1 !== 0) ? Math.floor(totalPages) + 1 : totalPages;
                            this.transactions = response.data.result.map(item => ({
                                amount: item.amount,
                                typeShift: item.type, // INPUT | OUTPUT | ABSOLUTE
                                time: item.created_at, // TIME WITH TIMEZONE
                                gateway: item.gateway.name, // PAYPAL | BITCOIN | TOURNAMENT | ACCOUNT
                                gateway_logo_id: item.gateway.image_media_id, // PAYPAL | BITCOIN | TOURNAMENT | ACCOUNT
                                status: this.status_convertCodeToKey(item.status), // AWAITING_REVIEW | SUCCESS | FAILED
                                reason: item.in_order_to, // account_charging | join_to_tournament | withdraw
                                reasonReject: item.status_description, // Reason for rejected action
                            }));
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
            this.getMyTransactions();
        }
    }
</script>
