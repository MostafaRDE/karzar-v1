import Vue from 'vue'

Vue.mixin({
    methods: {
        extNameFromMimeType(mimeType) {
            switch (mimeType) {
                case 'image/png':
                    return '.png';

                case 'image/gif':
                    return '.gif';

                case 'image/jpeg':
                    return '.jpg';
            }
        }
    }
});
