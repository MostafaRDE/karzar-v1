<template>
    <div>
        <div class="row" :class="width > 767 ? 'mx-0' : (width > 440 ? 'mx--10' : 'mx--20')" :style="{width: width > 767 ? '' : (width > 440 ? 'calc(100% + 20px)' : 'calc(100% + 40px)')}">
            <div class="col-6 my-20 d-flex">
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
            <div class="col-6 text-center text-sm-end d-flex align-items-center justify-content-flex-end my-20">
                <span class="font-weight-900 text-white d-flex" :style="{fontSize: width > 767 ? '18px' : '14px'}">{{ data.killed_total }}</span>
                <a v-if="editAction" href="javascript:void(0)" class="d-flex" @click="editAction(data)">
                    <mdi-lead-pencil fill="#fff" size="18px" :class="[width > 767 ? 'pxw-30 ms-10' : 'pxw-25 ms-5']"/>
                </a>
                <img src="/public/images/public/icons/ic-head-shot.png" alt="" :class="[width > 767 ? 'pxw-30 ms-10' : 'pxw-25 ms-5']"/>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Top10Item",

        components: {
            'mdi-lead-pencil': () => import('../icons/MaterialDesignIcons/MdiLeadPencil.vue'),
        },

        props: ['data', 'editAction'],

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
