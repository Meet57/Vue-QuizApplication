import Vue from "vue";
import VueRouter from "vue-router";
import AllQuiz from "../components/AllQuiz";
import CreateQuiz from "../components/CreateQuiz";
import TakeQuiz from "../components/TakeQuiz";
import Submissions from "../components/Submissions";
import ErrorPage from "../components/ErrorPage";

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
        path: "/submissions",
        name: "submissions",
        component: Submissions,
    },
    {
        path: "/quiz/:id",
        name: "take-quiz",
        component: TakeQuiz,
    },
    {
        path: "/404/",
        name: "error-page",
        component: ErrorPage,
    },
];

const router = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    routes,
});

export default router;
