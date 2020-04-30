import Vue from 'vue'

Vue.mixin({
    methods: {
        copyText(str) {
            // Create new element
            let el = document.createElement('textarea');
            // Set value (string to be copied)
            el.value = str;
            // Set non-editable to avoid focus and move outside of view
            el.setAttribute('readonly', '');
            el.style = {position: 'absolute', left: '-9999px'};
            document.body.appendChild(el);
            // Select text inside element
            el.select();

            let result;
            try {
                // Copy text to clipboard
                document.execCommand('copy');

                result = true;
            } catch (e) {
                result = false;
            } finally {
                // Remove temporary element
                document.body.removeChild(el);
            }

            return result;
        },

        likeSearch(string, key, ignoreCase = true) {
            let regex = new RegExp(`\.\*${key}\.\*`, `${ignoreCase ? 'i' : ''}`);
            return regex.test(string);
        },

        moneyFormatFast(number, pointsNumber) {
            if (typeof number === 'string')
                number = parseFloat(number);
            if (number % 1 > 0 || pointsNumber > 0) {
                return number.toFixed(pointsNumber).replace(/\d(?=(\d{3})+\.)/g, '$&,')
            } else {
                return Math.floor(number).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            }
        }

    },
});
