<template>
    <div>
        <div class="row">
            <div class="col-sm-6 d-flex" :class="width <= 679 ? 'justify-content-center' : ''">
                <div class="pxw-40 d-flex align-items-center justify-content-center me-20">
                    <template v-if="rank === 1">
                        <img src="/public/images/public/ranking/1.png" alt="" class="w-100"/>
                    </template>
                    <template v-else-if="rank === 2">
                        <img src="/public/images/public/ranking/1.png" alt="" class="w-100"/>
                    </template>
                    <template v-else-if="rank === 3">
                        <img src="/public/images/public/ranking/1.png" alt="" class="w-100"/>
                    </template>
                    <template v-else>{{ rank }}</template>
                </div>
                <div>
                    <div class="overflow-hidden position-relative pxw-65"
                         :style="data.image ? 'padding: 1px; background: url(/public/images/public/pubg-default-profile-border.svg) no-repeat; background-size: contain' : ''">
                        <img :src="data.image || '/public/images/public/pubg-default-profile.svg'"
                             alt=""
                             class="w-100"/>
                    </div>
                </div>
                <div class="d-flex flex-direction-column justify-content-space-around ms-20">
                    <span class="text-white font-weight-900 d-flex align-items-center"><img src="/public/images/public/icons/ic-user.png" class="me-5" style="height: 14px" alt=""/>{{ data.name }}</span>
                    <span class="text-white d-flex align-items-center"><img src="/public/images/public/icons/ic-id.png" alt="" class="me-5" style="height: 14px"/>#{{ data.id }}</span>
                </div>
            </div>
            <div class="col-sm-6 text-center text-sm-end d-flex align-items-center" :class="width <= 679 ? 'justify-content-center' : 'justify-content-flex-end'">
                <img src="/public/images/public/icons/ic-head-shot.png" alt="" class="me-10"/>
                <span class="font-size-lg font-weight-900 text-white d-flex">{{ data.killed_total }}</span>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Top10Item",

        props: ['data', 'rank'],

        data: () => ({
            width: 0,
        }),

        methods: {
            handleResize() {
                this.width = window.innerWidth
            },
        },

        mounted() {
            this.handleResize();

            window.addEventListener('resize', this.handleResize);
        },

        beforeDestroy() {
            window.removeEventListener('resize', this.handleResize);
        }
    }
</script>
