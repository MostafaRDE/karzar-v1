<template>
    <div class="card text-white rounded-8 p-40 text-center">
        <div class="card-header">
            <slot name="header" />
        </div>
        <div class="card-body">
            <slot />
        </div>
        <div class="card-footer">
            <slot name="footer" />
        </div>
    </div>
</template>

<script>
    export default {
        name: "RSCard",

        props: {
            bgColor: {
                default: '#333959',
                type: String,
                required: false
            },
            hasFooter: {
                default: true,
                type: Boolean,
                required: false
            },
            hasHeader: {
                default: true,
                type: Boolean,
                required: false
            }
        },

        mounted() {
            this.$el.style.backgroundColor = this.bgColor
        }
    }
</script>