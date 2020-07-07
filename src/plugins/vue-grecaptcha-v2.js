import Vue from 'vue'

let VueGRecaptcha = {
    install (Vue, { siteKey, lang, }) {
        Vue.prototype.$grecaptcha = {
            siteKey,
            lang,
            load () {
                return new Promise((resolve, reject) => {
                    if (typeof window.grecaptcha === 'undefined') {
                        const script = document.createElement('script');

                        script.src = `https://www.google.com/recaptcha/api.js?render=explicit&hl=${lang}`;
                        script.async = true;
                        script.defer = true;

                        script.onload = () => {
                            window.grecaptcha.ready(() => {
                                resolve(window.grecaptcha);
                            });
                        };

                        script.onerror = reject;
                        script.onabort = reject;

                        document.head.appendChild(script);
                    } else {
                        window.grecaptcha.ready(() => {
                            resolve(window.grecaptcha);
                        });
                    }
                });
            },
        };

        Vue.component('vue-grecaptcha', () => import('../components/VueGRecaptcha.vue'));
    },
};

Vue.use(VueGRecaptcha, {
    siteKey: process.env.RECAPTCHA_V2_SITE_KEY,
    lang: 'fa',
});
