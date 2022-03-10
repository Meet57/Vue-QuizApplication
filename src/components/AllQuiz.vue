<template>
    <div class="container">
        <div class="flex justify-between place-items-center mx-5">
            <h1 class="text-4xl mt-5 text-blue-500">All Quiz</h1>
            <a-button type="primary" class="mt-3 ml-3" @click="createForm" ghost> Create Form </a-button>
        </div>
        <div class="flex" v-if="quiz">
            <div class="flex" v-for="qu in quiz" :key="qu.id">
                <a-card :title="qu.quiz" style="width: 300px; margin: 20px">
                    <div slot="extra" class="flex">
                        <a-popconfirm title="Are you sure？" ok-text="Yes" cancel-text="No" @confirm="deletequiz(qu.id)">
                            <img
                                style="width: 20px; height: 20px"
                                class="my-auto mr-3"
                                src="https://img.icons8.com/material-rounded/24/000000/filled-trash.png"
                            />
                        </a-popconfirm>
                        <router-link v-bind:to="'/quiz/' + qu.id">
                            <a-button type="danger" ghost> Take Quiz </a-button>
                        </router-link>
                    </div>
                </a-card>
            </div>
        </div>
        <div class="m-5" v-else>Loading</div>
    </div>
</template>

<script>
import { deleteQuiz, getQuizes } from "../API/api";
export default {
    name: "all-quiz",
    data() {
        return {
            quiz: null,
        };
    },
    methods: {
        createForm() {
            this.$router.push("/create");
        },
        deletequiz(id) {
            deleteQuiz(id).then(() => {
                getQuizes()
                    .then((data) => {
                        this.quiz = data;
                    })
                    .catch(() => {});
            });
        },
    },
    created() {
        getQuizes()
            .then((data) => {
                this.quiz = data;
            })
            .catch(() => {});
    },
};
</script>

<style></style>
