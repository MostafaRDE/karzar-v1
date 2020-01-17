<template>
    <div ref="progress" class="position-relative">
        <div class="progress">
            <svg class="progress-circle" :width="`${size}px`" :height="`${size}px`" xmlns="http://www.w3.org/2000/svg">
                <circle class="progress-circle-back"
                        :cx="size / 2" :cy="size / 2" :r="size / 2 - strokeWidth"></circle>
                <circle class="progress-circle-progress"
                        :cx="size / 2" :cy="size / 2" :r="size / 2 - strokeWidth"></circle>
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
            fontSize: {
                default: '1em'
            },
            max: {
                default: 100
            },
            progress: {
                default: 0
            },
            strokeColorEmpty: {
                default: '#D2D2D2'
            },
            strokeColorProgress: {
                default: '#7E3451'
            },
            strokeWidth: {
                default: '3'
            },
            size: {
                default: '160'
            },
            textType: {
                default: 'PERCENT' // { PERCENT | DIVIDE }
            },
        },

        watch: {
            progress(progress) {
                this.progressBar(progress, this.max);
            }
        },

        methods: {
            progressBar(progressVal, totalPercentageVal = 100) {
                let strokeVal = ((this.size - (2 * this.strokeWidth)) * Math.PI) / totalPercentageVal;
                this.$refs.progress.style.width = `${this.size}px`;
                this.$refs.progress.style.height = `${this.size}px`;
                this.$refs.progress.style.margin = `-${this.size / 2} 0 0 -${this.size / 2}`;

                let x = this.$refs.progress.getElementsByClassName('progress-circle-back')[0];
                x.style.stroke = this.strokeColorEmpty;
                x.style.strokeWidth = `${this.strokeWidth}px`;

                let y = this.$refs.progress.getElementsByClassName('progress-circle-progress')[0];
                y.style.stroke = this.strokeColorProgress;
                y.style.strokeDasharray = progressVal * (strokeVal) + ' 999';
                y.style.strokeWidth = `${this.strokeWidth}px`;

                this.$refs.progressText.style.fontSize = this.fontSize;
                switch (this.textType) {
                    case 'PERCENT':
                        this.$refs.progressText.textContent = progressVal / totalPercentageVal * 100 + '%';
                        break;

                    case 'DIVIDE':
                        this.$refs.progressText.textContent = `${progressVal} / ${totalPercentageVal}`;
                        break;
                }
            }
        },

        mounted() {
            this.progressBar(this.progress, this.max);
        }
    }
</script>

<style lang="stylus">
    @import '../../assets/styles/modules/restyle/progressbar_circular.styl';
</style>
