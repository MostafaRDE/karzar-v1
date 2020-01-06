<template>
    <a href="javascript:void(0)" class="rs-button-icon">
        <span>
            <slot />
        </span>
    </a>
</template>

<script>
    export default {
        name: "RSButtonIcon"
    }
</script>

<style lang="stylus">
    @import '../../assets/styles/modules/restyle/button_icon.styl'
</style>