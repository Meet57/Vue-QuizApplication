<template>
    <div class="container">
        <div class="flex justify-between place-items-center mx-5">
            <h1 class="text-4xl mt-5 text-cyan-500">
                {{ data ? "Quiz : " + data.quiz : "Quiz Assesment" }}
            </h1>
            <button
                class="mt-3 ml-3 text-white rounded bg-red-500 px-3 py-2 mx-1 hover:bg-red-400"
                @click="back"
            >
                Back
            </button>
        </div>
        <div class="flex justify-center">
            <div v-if="data == null">
                <a-spin size="large" />
            </div>
            <div v-else>
                <MultipleFormItem v-model="data.questions">
                    <template #default="{ item, index }">
                        <QuestionCard
                            :id="'question' + index"
                            :value="item"
                            :disable="true"
                            :index="index"
                        >
                            <template #options>
                                <a-radio-group
                                    :options="getOptions(item.options)"
                                    @change="onChange($event.target.value, index, item.answer)"
                                />
                            </template>
                        </QuestionCard>
                    </template>
                </MultipleFormItem>
                <button
                    type="info"
                    size="large"
                    class="my-3 text-blue-500 border border-blue-500 py-2 px-3 rounded hover:text-white hover:bg-blue-500"
                    @click="submit"
                >
                    Submit
                </button>
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
                submitSubmission(localStorage.getItem("name"), this.data.quiz, this.result).then(
                    () => {
                        this.$router.push("/");
                        this.openNotification("success", "Your Score", this.result);
                    }
                );
            } else {
                let incomplete = [];
                this.openNotification(
                    "error",
                    "Complete All Questions",
                    "It is compulsory to attempt all questions"
                );
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
