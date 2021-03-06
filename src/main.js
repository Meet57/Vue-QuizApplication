import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import "./tailwind.css";
import "ant-design-vue/dist/antd.css";
import Antd from "ant-design-vue";
import { ValidationObserver, ValidationProvider, extend, localize } from "vee-validate";
import en from "vee-validate/dist/locale/en.json";
import * as rules from "vee-validate/dist/rules";

Object.keys(rules).forEach((rule) => {
    extend(rule, rules[rule]);
});

localize("en", en);

extend("checkOption", {
    params: ["array"],
    validate: (value, { array }) => {
        return array.filter((t) => t.text == value).length <= 1;
    },
    message: "Option Repeated",
});

// Install components globally
Vue.component("ValidationObserver", ValidationObserver);
Vue.component("ValidationProvider", ValidationProvider);

Vue.config.productionTip = false;

Vue.use(Antd);

new Vue({
    router,
    render: (h) => h(App),
}).$mount("#app");
