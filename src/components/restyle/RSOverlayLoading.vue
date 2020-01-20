<template>
    <div class="rs-overlay-loading">
        <div v-if="type === 'default'" class="rs-overlay-loading--default mx-auto">
            <div class="rs-overlay-loading--default-item">
                <div></div>
            </div>
            <div class="rs-overlay-loading--default-item">
                <div></div>
            </div>
            <div class="rs-overlay-loading--default-item">
                <div></div>
            </div>
            <div class="rs-overlay-loading--default-item">
                <div></div>
            </div>
            <div class="rs-overlay-loading--default-item">
                <div></div>
            </div>
            <div class="rs-overlay-loading--default-item">
                <div></div>
            </div>
            <div class="rs-overlay-loading--default-item">
                <div></div>
            </div>
            <div class="rs-overlay-loading--default-item">
                <div></div>
            </div>
            <div class="rs-overlay-loading--default-item">
                <div></div>
            </div>
            <div class="rs-overlay-loading--default-item">
                <div></div>
            </div>
            <div class="rs-overlay-loading--default-item">
                <div></div>
            </div>
            <div class="rs-overlay-loading--default-item">
                <div></div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "RSOverlayLoading",
        props: {
            type: {
                default: 'default',
                type: String,
                required: false
            },
            width: {
                default: -1,
                type:[Number, String],
                required: false
            }
        },

        mounted() {
            switch (this.type) {
                case 'default':
                    let parent = document.getElementsByClassName('rs-overlay-loading--default')[0];
                    parent.style.width = parent.style.height = (this.width === -1) ? '20px' : `${this.width}px`;
                    let items = document.getElementsByClassName('rs-overlay-loading--default-item');
                    if (this.width === -1)
                        for (let i = 0; i < items.length; i++) {
                            items[i].style.transformOrigin = '10px 10px';
                            items[i].children[0].style.height = '4.375px';
                            items[i].children[0].style.left = '9.0625px';
                            items[i].children[0].style.top = '0.9375px';
                            items[i].children[0].style.width = '1px';
                        }
                    else
                        for (let i = 0; i < items.length; i++) {
                            items[i].style.transformOrigin = `${this.width / 2}px ${this.width / 2}px`;
                            items[i].children[0].style.height = `${Math.floor(this.width / 4.6)}px`;
                            items[i].children[0].style.left = `${this.width / 2}px`;
                            items[i].children[0].style.top = `${this.width / 20}px`;
                            items[i].children[0].style.width = `${this.width / 20}px`;
                        }
            }
        }
    }
</script>

<style lang="stylus">
    @import "../../assets/styles/modules/restyle/overlay_loading.styl"
</style>
