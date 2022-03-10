<template>
    <div class="container">
        <div class="flex justify-between place-items-center mx-5">
            <h1 class="text-4xl mt-5 text-blue-500">Create Quiz</h1>
            <a-button type="danger" class="mt-3 ml-3" @click="back" ghost> Back </a-button>
        </div>
        <div class="flex justify-center">
            <div>
                <a-input size="large" v-model="title" placeholder="Quiz Title" style="width: 300px" />
                <br />
                <div class="mt-5" v-for="(value, index) in questions" :key="index">
                    <question-card v-model="questions[index]" />
                </div>
                <a-button type="primary" class="mt-3" @click="addQuestion"> Add Question </a-button>
                <a-button type="danger" class="mt-3 ml-3" @click="createForm"> Create Form </a-button>
            </div>
        </div>
    </div>
</template>

<script>
import { createQuiz } from "../API/api";

import QuestionCardVue from "./QuestionCard.vue";
export default {
    name: "create-quiz",
    components: {
        "question-card": QuestionCardVue,
    },
    data() {
        return {
            title: "",
            questions: [],
        };
    },
    methods: {
        addQuestion() {
            this.questions.push({});
        },
        createForm() {
            createQuiz({ quiz: this.title, questions: this.questions }).then(() => {
                this.$router.push("/");
            });
        },
        back() {
            this.$router.push("/");
        },
    },
};
</script>

<style></style>
