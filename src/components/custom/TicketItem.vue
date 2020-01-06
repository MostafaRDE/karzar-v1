<template>
    <div class="row ticket-item">
        <div class="col-sm-6 mt-20 d-flex flex-direction-column">
            <h6 class="text-white">{{ data.subject }}</h6>
            <span>Ticket Number: <span class="text-white">#{{ data.id }}</span></span>
        </div>
        <div class="col-sm-6 mt-20 d-flex flex-direction-column text-end">
            <span :style="{color: statusColor}">{{ data.status }}</span>
            <span>{{ data.date }}</span>
        </div>
    </div>
</template>

<script>
    export default {
        name: "TicketItem",

        props: ['data'],

        computed: {
            statusColor() {
                switch(this.data.status) {
                    case 'ANSWERED':
                        return '';

                    case 'NEW':
                        return '';
                }
            }
        }
    }
</script>

<style lang="stylus">
    .ticket-item
        cursor pointer
        &:hover
            background-color #fff1
</style>
