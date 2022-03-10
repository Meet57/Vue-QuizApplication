import Vue from "vue";
import VueRouter from "vue-router";
import AllQuiz from "../components/AllQuiz";
import CreateQuiz from "../components/CreateQuiz";
import TakeQuiz from "../components/TakeQuiz";

Vue.use(VueRouter);

const routes = [
    {
        path: "/",
        name: "all-quiz",
        component: AllQuiz,
    },
    {
        path: "/create",
        name: "create-quiz",
        component: CreateQuiz,
    },
    {
        path: "/edit/:id",
        name: "edit-quiz",
        component: CreateQuiz,
    },
    {
        path: "/quiz/:id",
        name: "take-quiz",
        component: TakeQuiz,
        props: true,
    },
];

const router = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    routes,
});

export default router;
