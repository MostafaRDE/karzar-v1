<template>
    <div class="position-relative">
        <div ref="progress" class="progress">
            <svg class="progress-circle" width="200px" height="200px" xmlns="http://www.w3.org/2000/svg">
                <circle class="progress-circle-back"
                        cx="80" cy="80" r="74"></circle>
                <circle class="progress-circle-progress"
                        cx="80" cy="80" r="74"></circle>
            </svg>
            <div class="progress-text" ref="progressText">0%</div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "RSProgressbarCircular",

        props: {
            circularBackColor: {
                default: '#D2D2D2'
            },
            circularProgressColor: {
                default: '#7E3451'
            },
            height: {
                default: '160px'
            },
            strokeWidth: {
                default: '10px'
            },
            width: {
                default: '160px'
            },
        },

        methods: {
            progressBar(progressVal,totalPercentageVal = 100) {
                let strokeVal = (4.64 * 100) /  totalPercentageVal;
                let x = this.$refs.progress.getElementsByClassName('progress-circle-progress')[0];
                x.style.strokeDasharray = progressVal * (strokeVal) + ' 999';
                let el = this.$refs.progressText;
                this.$refs.progressText.textContent = `${progressVal}%`;
                let start = new Date().getTime();

                setTimeout(function() {
                    let now = (new Date().getTime()) - start;
                    let progress = now / 700;
                    el.innerHTML = progressVal / totalPercentageVal * 100 + '%';
                    if (progress < 1) setTimeout(arguments.callee, 10);
                }, 10);
            }
        },

        mounted() {
            this.progressBar(20,200);
        }
    }
</script>

<style lang="stylus">
    @import '../../assets/styles/modules/restyle/progressbar_circular.styl';
</style>
