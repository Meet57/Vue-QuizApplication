<template>
    <div class="container">
        <div class="flex justify-between place-items-center mx-5">
            <h1 class="text-4xl mt-5 text-blue-500">Take Quiz</h1>
            <a-button type="danger" class="mt-3 ml-3" @click="back"> Back </a-button>
        </div>
        <div class="flex justify-center">
            <div v-if="data == null" class="">
                <a-spin size="large" />
            </div>
            <div v-else class="mx-5">
                <MultipleFormItem v-model="data.questions">
                    <template v-slot="{ item, index }">
                        <QuestionCard :id="'question' + index" :value="item" :disable="true" :index="index">
                            <template #options>
                                <a-radio-group :options="getOptions(item.options)" @change="onChange($event.target.value, index, item.answer)" />
                            </template>
                        </QuestionCard>
                    </template>
                </MultipleFormItem>
                <a-button type="info" size="large" class="mt-3" @click="submit"> Submit </a-button>
            </div>
        </div>
    </div>
</template>

<script>
import { getQuiz, submitSubmission } from "../API/api";
import MultipleFormItem from "./MultipleFormItem.vue";
import QuestionCard from "./QuestionCard.vue";
export default {
    name: "TakeQuiz",
    components: {
        MultipleFormItem,
        QuestionCard,
    },
    created() {
        getQuiz(this.id)
            .then((data) => {
                this.data = data;
                this.marks = Array(data.questions.length).fill(null);
            })
            .catch(() => {
                this.$router.push("/404/");
            });
    },
    data() {
        return {
            id: this.$route.params.id,
            data: null,
            marks: [],
            result: "",
        };
    },
    methods: {
        canSubmit() {
            if (this.marks.filter((value) => value == null).length) {
                return false;
            }
            return true;
        },
        getOptions(list) {
            return list.map((op) => ({ label: op.text, value: op.text }));
        },
        onChange(value, index, answer) {
            this.marks.splice(index, 1, value == answer);
        },
        vibrateQuestion(id) {
            let incomplete = document.getElementById(id);
            incomplete.classList.add("shake");
            setTimeout(() => {
                incomplete.classList.remove("shake");
            }, 1000);
        },
        openNotification(type, title, body) {
            this.$notification[type]({
                message: title,
                description: body,
            });
        },
        submit() {
            if (this.canSubmit()) {
                let score = 0;
                if (this.data.negative) {
                    this.marks.map((value) => {
                        if (value == 1) {
                            score += 1;
                        } else {
                            score -= 0.25;
                        }
                    });
                } else {
                    score = this.marks.filter((value) => value == true).length;
                }
                this.result = `${score}/${this.marks.length}`;
                submitSubmission(localStorage.getItem("name"), this.data.quiz, this.result).then(() => {
                    this.$router.push("/");
                    this.openNotification("success", "Your Score", this.result);
                });
            } else {
                let incomplete = [];
                this.openNotification("error", "Complete All Questions", "It is compulsory to attempt all questions");
                this.marks.map((value, id) => {
                    if (value == null) {
                        incomplete.push(id);
                    }
                });
                incomplete.forEach((id) => {
                    this.vibrateQuestion("question" + id);
                });
            }
        },
        back() {
            this.$router.push("/");
        },
    },
};
</script>

<style scoped>
.ant-radio-wrapper {
    display: block !important;
}

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
