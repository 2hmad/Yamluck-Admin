import Vue from "vue";
import { ToastPlugin, ModalPlugin } from "bootstrap-vue";
import VueCompositionAPI from "@vue/composition-api";
import vSelect from "vue-select";
import router from "./router";
import store from "./store";
import App from "./App.vue";
import VueApexCharts from "vue-apexcharts";
import axios from "axios";

// Global Components
import "./global-components";

// 3rd party plugins
import "@/libs/portal-vue";
import "@/libs/toastification";

// axios conf
axios.defaults.withCredentials = true;
Vue.config.productionTip = false;

// BSV Plugin Registration
Vue.use(ToastPlugin);
Vue.use(ModalPlugin);

// Composition API
Vue.use(VueCompositionAPI);

Vue.use(vSelect);

Vue.use(VueApexCharts);
Vue.component("apexchart", VueApexCharts);

// import core styles
require("@core/scss/core.scss");

// import assets styles
require("@/assets/scss/style.scss");

axios.interceptors.response.use(undefined, function (error) {
    if (error) {
        const originalRequest = error.config;
        if (error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            store.dispatch("LogOut");
            return router.push("/login");
        }
    }
});
Vue.config.productionTip = false;

new Vue({
    router,
    store,
    render: (h) => h(App),
}).$mount("#app");
