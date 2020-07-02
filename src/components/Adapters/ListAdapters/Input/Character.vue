<template>
    <div class="d-flex p-5" :class="{'cursor-pointer linkable': data.status === 1}">
        <div>
            <div class="overflow-hidden position-relative pxw-30"
                 :style="data.profile_image ? 'padding: 1px; background: url(/public/images/public/pubg-default-profile-border.svg) no-repeat; background-size: contain' : ''">
                <img :src="data.profile_image ? data.profile_image.url_static : '/public/images/public/pubg-default-profile.svg'"
                     alt=""
                     class="w-100"/>
            </div>
        </div>
        <div class="d-flex flex-direction-column justify-content-space-around ms-10">
            <span class="text-white font-weight-900 d-flex align-items-center font-size-xs"><img src="/public/images/public/icons/ic-user.png" class="me-5" style="height: 14px" alt=""/>{{ data.name }}</span>
        </div>
        <div class="d-flex flex-direction-column justify-content-space-around align-items-center me-10 ms-auto">
            <span class="text-white font-weight-900 d-flex align-items-center font-size-xxs" :class="statusTextColor()">{{ status() }}</span>
        </div>
    </div>
</template>

<script>
    import i18n from '../../../../i18n'

    export default {
        name: "Character",

        props: ['data'],

        methods: {
            status() {
                switch (this.data.status) {
                    case 0:
                        return i18n.t('statuses.pending2');
                }
            },
            statusTextColor() {
                switch (this.data.status) {
                    case 0:
                        return 'text-warning';
                }
            },
        }
    }
</script>
