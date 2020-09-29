<template>
    <section class="main-side-menu" :class="{'active': model}">

        <a href="javascript:void(0)" class="main-side-menu-close-button" @click="model=false">
            <icon-close/>
        </a>

        <div>
            <div class="text-center mb-55">
                <a href="https://www.karzar.pro/">
                    <img :src="logoUrl" alt="a" style="max-width: 84px; height: auto;">
                </a>
            </div>

            <div class="text-center mb-65">
                <p>{{ $t('public.about_sidebar') }}</p>
            </div>

            <div class="text-center">
                <p :style="{fontSize: '16px'}">© {{ $t('public.copyright_karzar') }}</p>
            </div>
        </div>

        <div class="main-side-menu-social-networks-bottom">
            <div class="mb-45 text-center">
                <a href="https://www.aparat.com/karzar.pro" class="d-inline-flex align-items-center" style="margin: 0 12px;" target="_blank" rel="nofollow" title="Aparat">
                    <icon-aparat size="16px"/>
                </a>
                <a v-for="socialLink of socialLinks" :href="socialLink.to" rel="nofollow" target="_blank" style="font-size: 13px;margin: 0 12px;">
                    <i :class="socialLink.icon"></i>
                </a>
            </div>
        </div>

    </section>
</template>

<script>
    export default {
        name: "MainSideMenu",

        model: {prop: 'active', event: 'status'},

        props: {
            active: {
                default: false,
                type: Boolean
            }
        },

        components: {
            'icon-aparat': () => import('../icons/IconAparat.vue'),
            'icon-close': () => import('../icons/IconClose.vue'),
        },

        data: () => ({
            logoUrl: '/public/images/public/logos/logo.svg',
            socialLinks: [
                // {
                //     icon: 'fab fa-facebook',
                //     label: 'Facebook',
                //     to: 'https://www.facebook.com/karzar_pro',
                // },
                {
                    icon: 'fab fa-instagram',
                    label: 'Instagram',
                    to: 'https://www.instagram.com/karzar.pro/',
                },
                {
                    icon: 'fab fa-telegram',
                    label: 'Telegram',
                    to: 'https://t.me/karzar_pro',
                },
            ]
        }),

        computed: {
            model: {
                get() {
                    return this.active
                },
                set(status) {
                    this.$emit('status', status)
                }
            }
        },
    }
</script>

<style lang="stylus">
    .main-side-menu
        position fixed
        top 0
        width 448px
        height 100%
        min-height 100%
        padding 154px 62px 4.6%
        background-color rgba(0, 0, 0, .9)
        text-align left
        overflow hidden
        visibility hidden
        z-index 9999
        -webkit-backface-visibility hidden
        box-sizing border-box
        box-shadow -3px 0 3px rgba(0, 0, 0, .04)
        -webkit-transition all .6s cubic-bezier(.77, 0, .175, 1)
        -moz-transition all .6s cubic-bezier(.77, 0, .175, 1)
        transition all .6s cubic-bezier(.77, 0, .175, 1)

        / .ltr &
            right -448px

        / .rtl &
            left -448px

        &.active
            visibility visible

            / .ltr &
                right 0

            / .rtl &
                left 0

        &-close-button
            position absolute
            display inline-flex
            top 45px
            z-index 1000
            color #fff

            / .ltr &
                right 63px

            / .rtl &
                left 63px

        &-social-networks-bottom
            position absolute
            bottom 0
            left 50%
            -webkit-transform translateX(-50%)
            -moz-transform translateX(-50%)
            transform translateX(-50%)
</style>
