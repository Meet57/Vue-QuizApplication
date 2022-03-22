import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
    {
        path: "/",
        name: "all-quiz",
        component: () => import("../components/Dashboard"),
    },
    {
        path: "/create",
        name: "create-quiz",
        component: () => import("../components/CreateQuiz"),
    },
    {
        path: "/edit/:id",
        name: "edit-quiz",
        component: () => import("../components/CreateQuiz"),
    },
    {
        path: "/submissions",
        name: "submissions",
        component: () => import("../components/Submissions"),
    },
    {
        path: "/quiz/:id",
        name: "take-quiz",
        component: () => import("../components/TakeQuiz"),
    },
    {
        path: "/404/",
        name: "error-page",
        component: () => import("../components/ErrorPage"),
    },
];

const router = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    routes,
});

export default router;
