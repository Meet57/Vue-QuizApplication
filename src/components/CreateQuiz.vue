<template>
    <div class="container">
        <div class="flex justify-between place-items-center mx-5">
            <h1 class="text-4xl mt-5 text-blue-500">
                {{ data.id == null ? "Create Quiz" : "Edit Quiz" }}
            </h1>
            <a-button type="danger" class="mt-3 ml-3" @click="back" ghost> Back </a-button>
        </div>
        <div class="flex justify-center">
            <div>
                <a-input size="large" id="quiz" v-model="data.quiz" placeholder="Quiz Title" style="width: 300px" />
                <br />
                <br />
                Negative Marking :
                <a-radio-group v-model="data.negative" button-style="solid">
                    <a-radio-button :value="true"> Yes </a-radio-button>
                    <a-radio-button :value="false"> No </a-radio-button>
                </a-radio-group>
                <br />
                <div class="mt-5" v-for="(value, index) in data.questions" :id="index" :key="index">
                    <question-card v-model="data.questions[index]" />
                </div>
                <a-button type="primary" class="mt-3" @click="addQuestion"> Add Question </a-button>
                <a-button type="danger" class="mt-3 ml-3" @click="createForm">
                    {{ data.id == null ? "Create Quiz" : "Update Quiz" }}
                </a-button>
            </div>
        </div>
    </div>
</template>

<script>
import { createQuiz, editQuiz, getQuiz } from "../API/api";

import QuestionCardVue from "./QuestionCard.vue";
export default {
    name: "create-quiz",
    created() {
        if (this.$route.params.id) {
            getQuiz(this.$route.params.id).then((data) => {
                this.data = data;
            });
        }
    },
    components: {
        "question-card": QuestionCardVue,
    },
    data() {
        return {
            data: {
                quiz: "",
                questions: [{}],
                negative: false,
            },
        };
    },
    methods: {
        addQuestion() {
            this.data.questions.push({});
        },
        createForm() {
            if (this.data.quiz == "") {
                let incomplete = document.getElementById("quiz");
                incomplete.classList.add("shake");
                setTimeout(() => {
                    incomplete.classList.remove("shake");
                }, 1000);
            } else {
                if (this.data.id) {
                    editQuiz(this.data).then(() => {
                        this.$router.push("/");
                    });
                } else {
                    createQuiz(this.data).then(() => {
                        this.$router.push("/");
                    });
                }
            }
        },
        back() {
            this.$router.push("/");
        },
    },
};
</script>

<style scoped>
.shake {
    /* Start the shake animation and make the animation last for 0.5 seconds */
    animation: shake 1s;
    background-color: rgba(255, 0, 0, 0.158);
    /* When the animation is finished, start again */
    animation-iteration-count: 1;
}
@keyframes shake {
    0% {
        transform: translate(1px, 1px) rotate(0deg);
    }
    10% {
        transform: translate(-1px, -2px) rotate(-1deg);
    }
    20% {
        transform: translate(-3px, 0px) rotate(1deg);
    }
    30% {
        transform: translate(3px, 2px) rotate(0deg);
    }
    40% {
        transform: translate(1px, -1px) rotate(1deg);
    }
    50% {
        transform: translate(-1px, 2px) rotate(-1deg);
    }
    60% {
        transform: translate(-3px, 1px) rotate(0deg);
    }
    70% {
        transform: translate(3px, 1px) rotate(-1deg);
    }
    80% {
        transform: translate(-1px, -1px) rotate(1deg);
    }
    90% {
        transform: translate(1px, 2px) rotate(0deg);
    }
    100% {
        transform: translate(1px, -2px) rotate(-1deg);
    }
}
</style>
