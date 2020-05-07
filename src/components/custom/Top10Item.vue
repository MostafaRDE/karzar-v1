<template>
    <div>
        <div class="row" :class="width > 767 ? 'mx-0' : (width > 440 ? 'mx--10' : 'mx--20')" :style="{width: width > 767 ? '' : (width > 440 ? 'calc(100% + 20px)' : 'calc(100% + 40px)')}">
            <div class="col-6 mb-0 d-flex">
                <div class="d-flex align-items-center justify-content-center" :class="width > 767 ? 'me-20 pxw-40' : 'me-10 pxw-30'">
                    <template v-if="rank === 1">
                        <img src="/public/images/public/ranking/cup1.png" alt="" :class="width > 767 ? 'pxw-40' : (width > 440 ? 'pxw-30' : 'pxw-25')"/>
                    </template>
                    <template v-else-if="rank === 2">
                        <img src="/public/images/public/ranking/cup2.png" alt="" :class="width > 767 ? 'pxw-40' : (width > 440 ? 'pxw-30' : 'pxw-25')"/>
                    </template>
                    <template v-else-if="rank === 3">
                        <img src="/public/images/public/ranking/cup3.png" alt="" :class="width > 767 ? 'pxw-40' : (width > 440 ? 'pxw-30' : 'pxw-25')"/>
                    </template>
                    <template v-else>
                        <span lang="en" class="font-weight-900 text-white" v-text="rank"></span>
                    </template>
                </div>
                <div>
                    <div class="overflow-hidden position-relative" :class="width > 767 ? 'pxw-65' : (width > 440 ? 'pxw-40' : 'pxw-35')"
                         :style="data.profile_image ? 'padding: 1px; background: url(/public/images/public/pubg-default-profile-border.svg) no-repeat; background-size: contain' : ''">
                        <img :src="data.profile_image ? data.profile_image.url_static : '/public/images/public/pubg-default-profile.svg'"
                             alt=""
                             class="w-100"/>
                    </div>
                </div>
                <div class="d-flex flex-direction-column justify-content-space-around" :class="width > 767 ? 'ms-20' : 'ms-10'">
                    <span lang="en" class="text-white font-weight-900 d-flex align-items-center" :style="{fontSize: width > 767 ? '14px' : (width > 440 ? '12px' : '11px')}"><img src="/public/images/public/icons/ic-user.png" class="me-5" style="height: 14px" alt=""/>{{ data.name }}</span>
                    <span lang="en" class="text-white d-flex align-items-center" :style="{fontSize: width > 767 ? '14px' : (width > 440 ? '12px' : '11px')}"><img src="/public/images/public/icons/ic-id.png" alt="" class="me-5" style="height: 14px"/>#{{ data.id }}</span>
                </div>
            </div>
            <div class="col-6 mb-0 text-center text-sm-end d-flex align-items-center justify-content-flex-end">
                <span class="font-weight-900 text-white d-flex" :style="{fontSize: width > 767 ? '18px' : '14px'}">{{ data.killed_total }}</span>
                <img src="/public/images/public/icons/ic-head-shot.png" alt="" :class="['ms-10', width > 767 ? 'pxw-30' : 'pxw-25']"/>
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
