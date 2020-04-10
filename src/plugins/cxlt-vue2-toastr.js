import Vue from 'vue'
import CxltToastr from 'cxlt-vue2-toastr'

// Add plugin to vue
Vue.use(CxltToastr, {
    position: 'top right',
    showDuration: 1000,
    timeOut: 2000,
});
