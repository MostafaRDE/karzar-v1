<template>
    <div class="rs-alert align-items-center" :class="[`rs-alert-${color}`]">
        <span v-if="icon !== ''"
              class="rs-alert--icon me-10">
            <img :src="icon" alt=""/>
        </span>
        <span class="rs-alert--text flex-direction-column w-100">
            <span v-if="false" :class="textClass" class="font-size-xs text-start">{{ `${$t('glossaries.code_with_colons')} ${message.code}` }}</span>
            <hr v-if="false" class="w-100 opacity-4"/>
            <pre v-if="message.message !== null" :class="textClass"
                  class="text-justify font-size-xs">{{ message.message }}</pre>
        </span>
    </div>
</template>

<script>
    export default {
        name: "RSAlert",

        props: {
            color: {
                default: 'primary',
                type: String,
                required: false
            },
            icon: {
                default: '',
                type: String,
                required: false
            },
            message: {
                default: () => ({
                    code: null,
                    message: null,
                }),
                type: Object,
                required: false
            },
            textClass: {
                default: '',
                type: String,
                required: false
            },
        }
    }
</script>

<style lang="stylus">
    @import "../../assets/styles/modules/restyle/alert_server.styl"
</style>