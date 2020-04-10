<template>
    <svg :style="`width:${size};height:${size}`" viewBox="0 0 1517 1738.11">
        <polygon :fill="fill" points="1282 814.38 959 814.38 959 1635.92 782 1738.11 782 637.38 1282 637.38 1282 814.38"/><polygon :fill="fill" points="1517 437.92 1517 1313.76 1183 1506.59 1006 1608.79 1006 855.38 1282 855.38 1282 1032.38 1183 1032.38 1183 1299.91 1338 1210.42 1338 541.27 758.5 206.69 179 541.27 179 1210.42 334 1299.91 334 1032.38 235 1032.38 235 855.38 511 855.38 511 1608.79 334 1506.59 0 1313.76 0 437.92 758.5 0 1517 437.92"/><polygon :fill="fill" points="735 637.38 735 1738.11 558 1635.92 558 814.38 235 814.38 235 637.38 735 637.38"/>
    </svg>
</template>

<script>
    export default {
        name: "IconGametour",

        props: {
            fill: {
                default: '#fff',
                type: String,
                required: false,
            },
            size: {
                default: '24px',
                type: String,
                required: false,
            },
            title: {
                default: '',
                type: String,
                required: false,
            }
        },
    }
</script>
