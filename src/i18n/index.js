/**
 * Vue index
 *
 * @library
 *
 * http://kazupon.github.io/vue-i18n/en/
 */

// Lib imports
import Vue from "vue";
import VueI18n from "vue-i18n";
import messages from "./locales";

Vue.use(VueI18n);

const dateTimeFormats = {
    en: {
        short: {
            year: "numeric",
            month: "short",
            day: "numeric"
        },
        long: {
            year: "numeric",
            month: "short",
            day: "numeric",
            weekday: "short",
            hour: "numeric",
            minute: "numeric"
        },
        shortMonth: {
            month: "short"
        },
        monthDay: {
            weekday: "short",
            day: "numeric",
            month: "long"
        },
        day: {
            day: "numeric"
        },
        dayName: {
            weekday: "short"
        },
        dayNameLong: {
            weekday: "long"
        },
        hourMinute: {
            hour: "numeric",
            minute: "numeric"
        }
    },
    fa: {
        short: {
            year: "numeric",
            month: "numeric",
            day: "numeric"
        },
        long: {
            year: "numeric",
            month: "long",
            day: "numeric",
            weekday: "short"
        },
        shortMonth: {
            month: "short"
        },
        monthDay: {
            weekday: "short",
            day: "numeric",
            month: "long"
        },
        day: {
            day: "numeric"
        },
        dayName: {
            weekday: "short"
        },
        dayNameLong: {
            weekday: "long"
        },
        hourMinute: {
            hour: "numeric",
            minute: "numeric"
        }
    }
};

const numberFormats = {
    en: {
        currency: {
            style: "currency",
            currency: "USD"
        }
    },
    fa: {
        currency: {
            style: "currency",
            currency: "IRR"
        }
    }
};

const index = new VueI18n({
    locale: "fa",
    fallbackLocale: "fa",
    messages,
    dateTimeFormats,
    numberFormats
});

export default index;
