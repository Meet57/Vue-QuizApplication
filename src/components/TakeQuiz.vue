<template>
    <div class="container">
        <div class="flex justify-between place-items-center mx-5">
            <h1 class="text-4xl mt-5 text-blue-500">Take Quiz</h1>
            <a-button type="danger" class="mt-3 ml-3" @click="back" ghost> Back </a-button>
        </div>
        <div class="mx-5" v-if="result.length > 0">
            <div class="text-3xl text-teal-700">You scored {{ result }}</div>
        </div>
        <div v-else>
            <div v-if="data == null" class="flex justify-center">
                <a-spin size="large" />
            </div>
            <div v-else class="mx-5">
                <h1 class="text-3xl mt-5 text-green-800">{{ data.quiz }}</h1>
                <div class="mt-4" v-for="(value, index) in data.questions" :key="index" :id="index">
                    <div class="text-xl">{{ index + 1 }} : {{ value.question }} <span class="text-red-700">*</span></div>
                    <div class="options ml-8">
                        <a-radio-group
                            :options="getOptions(value)"
                            @change="
                                (e) => {
                                    onChange(e.target.value, index, value.answer);
                                }
                            "
                        />
                    </div>
                </div>
                <button
                    class="mt-3 ml-3 text-xl border border-green-400 hover:bg-green-500 hover:text-white px-2 py-1 rounded-md"
                    v-on:click="submit"
                    ghost
                >
                    Submit
                </button>
            </div>
        </div>
    </div>
</template>

<script>
import { getQuiz, submitSubmission } from "../API/api";
export default {
    name: "take-quiz",
    created() {
        getQuiz(this.id).then((data) => {
            this.data = data;
            this.marks = Array(data.questions.length).fill(null);
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
        onChange(value, index, answer) {
            this.marks.splice(index, 1, value == answer);
        },
        getOptions(value) {
            let a = [];
            a.push({ value: value.option1, label: value.option1 });
            a.push({ value: value.option2, label: value.option2 });
            a.push({ value: value.option3, label: value.option3 });
            a.push({ value: value.option4, label: value.option4 });
            return a;
        },
        canSubmit() {
            if (this.marks.filter((value) => value == null).length) {
                return false;
            }
            return true;
        },
        vibrateQuestion(id) {
            let incomplete = document.getElementById(id);
            incomplete.classList.add("shake");
            setTimeout(() => {
                incomplete.classList.remove("shake");
            }, 1000);
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
                console.log(localStorage.getItem("name"));
                submitSubmission(localStorage.getItem("name"), this.data.quiz, this.result);
            } else {
                let incomplete = [];
                this.marks.map((value, id) => {
                    if (value == null) {
                        incomplete.push(id);
                    }
                });
                incomplete.forEach((id) => {
                    this.vibrateQuestion(id);
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
    color: red;
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
