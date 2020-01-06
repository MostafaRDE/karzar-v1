<template>
    <img class="rs-image-svg"
         :src="src"
         :alt="alt"/>
</template>

<script>
    export default {
        name: "RSImageSVG",

        props: {
            alt: {
                default: '',
                type: String,
                required: false
            },
            src: {
                default: '',
                type: String,
                required: true
            }
        },

        created() {
            const img = this;
            const imgID = img.getAttribute('id');
            const imgClass = img.getAttribute('class');
            const imgURL = img.getAttribute('src');

            jQuery.get(imgURL, function(data) {
                // Get the SVG tag, ignore the rest
                var $svg = jQuery(data).find('svg');

                // Add replaced image's ID to the new SVG
                if(typeof imgID !== 'undefined') {
                    $svg = $svg.attr('id', imgID);
                }
                // Add replaced image's classes to the new SVG
                if(typeof imgClass !== 'undefined') {
                    $svg = $svg.attr('class', imgClass + ' replaced-svg');
                }

                // Remove any invalid XML tags as per http://validator.w3.org
                $svg = $svg.removeAttr('xmlns:a');

                // Check if the viewport is set, if the viewport is not set the SVG wont't scale.
                if(!$svg.attr('viewBox') && $svg.attr('height') && $svg.attr('width')) {
                    $svg.attr('viewBox', '0 0 ' + $svg.attr('height') + ' ' + $svg.attr('width'))
                }

                // Replace image with new SVG
                img.replaceWith($svg);

            }, 'xml');
        }
    }
</script>

<style>

</style>