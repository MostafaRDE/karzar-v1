<template>
    <svg :style="`width:${width ? width : size};height:${height ? height : size}`" viewBox="0 0 13.802 17.874">
        <path id="invoice" d="M.48,17.558l.906-.836a1.5,1.5,0,0,1,2.029-.017L4.564,17.73a.5.5,0,0,0,.672,0l1.131-1.02a1.506,1.506,0,0,1,2.023,0l1.131,1.02a.5.5,0,0,0,.672,0l1.148-1.024a1.5,1.5,0,0,1,2.029.017l.906.836V1.384A1.916,1.916,0,0,0,14.049.268a1.206,1.206,0,0,0-.935-.273H2.233A2.115,2.115,0,0,0,.921.268,1.783,1.783,0,0,0,.48,1.454ZM4.014,5.821h6.459a.5.5,0,1,1,0,1.007H4.014a.5.5,0,1,1,0-1.007Zm0,3.5h6.459a.5.5,0,1,1,0,1.007H4.014a.5.5,0,1,1,0-1.007Zm0,0" transform="translate(-0.48 0.016)" :fill="fill"/>
    </svg>
</template>

<script>
    export default {
        name: "IconInvoice",

        props: {
            fill: {
                default: '#fff',
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
