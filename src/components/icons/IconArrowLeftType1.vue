<template>
    <svg :style="`width:${width ? width : size};height:${height ? height : size}`" viewBox="0 0 10.799 18.77">
        <g transform="translate(-980.654 -2456.936)">
            <path d="M984.89,2514.341l-8.68,8.678,8.68,8.677"
                  transform="translate(5.151 -56.698)"
                  fill="none"
                  :stroke="fill"
                  stroke-width="2"/>
        </g>
    </svg>
</template>

<script>
    export default {
        name: "IconArrowLeftType1",

        props: {
            fill: {
                default: '#00FF00',
                type: String,
                required: false,
            },
            height: {
                type: String,
                required: false,
            },
            width: {
                type: String,
                required: false,
            },
            size: {
                default: '24px',
                type: String,
                required: false,
            }
        },
    }
</script>