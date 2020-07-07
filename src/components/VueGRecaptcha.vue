<template>
    <div
            ref="grecaptcha"
            :data-sitekey="$grecaptcha.siteKey"
            :data-theme="theme"
            :data-size="size"
    ></div>
</template>

<script>
    export default {
        name: 'VueGRecaptcha',

        model: {
            event: 'input',
            prop: 'value',
        },

        data () {
            return {
                widgetId: null,
                isVerified: false,
            };
        },

        props: {
            value: {
                type: String,
            },
            theme: {
                type: String,
                default: 'dark',
            },
            size: {
                type: String,
                default: 'normal',
            },
        },

        mounted () {
            this.$nextTick(() => {
                this.$grecaptcha.load().then((recaptcha) => {
                    this.widgetId = recaptcha.render(this.$refs.grecaptcha, {
                        callback: this.onSuccess,
                        expiredCallback: this.onExpire,
                        errorCallback: this.onError,
                    });
                });
            });
        },

        methods: {
            onSuccess (response) {
                this.$emit('input', response);
            },

            onExpire () {
                this.$emit('expire');

                this.reset();
            },

            onError (error) {
                this.$emit('error', error);

                this.reset();
            },

            /**
             * Reset ReCaptcha programmatically
             *
             * @public
             */
            reset () {
                this.$emit('reset');

                this.$emit('input', undefined);

                this.$grecaptcha.load().then((recaptcha) => {
                    recaptcha.reset(this.widgetId);
                });
            },
        },
    };
</script>
