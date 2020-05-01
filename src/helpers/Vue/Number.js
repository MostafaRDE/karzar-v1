import Vue from 'vue'

Vue.mixin({
    methods: {
        fixedDigitPoints(number, fixed) {
            let split = number.toString().split('.');
            let response = split[0];
            if (fixed > 0) {
                if (split[1] && split[1].length > 0) {
                    response += ".";
                    response += split[1].substr(0, fixed);
                }
            }

            return response;
        },

        onlyNumber ($event) {
            let keyCode = ($event.keyCode ? $event.keyCode : $event.which);
            if ((keyCode < 48 || keyCode > 57) && keyCode !== 46) { // 46 is dot
                $event.preventDefault();
            }
        },
        onlyIntNumber ($event) {
            let keyCode = ($event.keyCode ? $event.keyCode : $event.which);
            if (keyCode < 48 || keyCode > 57) { // 46 is dot
                $event.preventDefault();
            }
        },
    }
});
