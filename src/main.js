import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import "./tailwind.css";
import "ant-design-vue/dist/antd.css";
import Antd from "ant-design-vue";
import { ValidationProvider } from "vee-validate/dist/vee-validate.full.esm";
import { ValidationObserver } from "vee-validate";

Vue.component("ValidationProvider", ValidationProvider);
Vue.component("ValidationObserver", ValidationObserver);

Vue.config.productionTip = false;

Vue.use(Antd);

new Vue({
    router,
    render: (h) => h(App),
}).$mount("#app");
