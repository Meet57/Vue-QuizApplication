<template>
    <div class="container">
        <div class="flex justify-between place-items-center mx-5">
            <h1 class="text-4xl mt-5 text-blue-500">Take Quiz</h1>
            <a-button type="danger" class="mt-3 ml-3" @click="back"> Back </a-button>
        </div>
        <div>
            <div v-if="data == null" class="flex justify-center">
                <a-spin size="large" />
            </div>
            <div v-else class="mx-5">
                {{ data }}
            </div>
        </div>
    </div>
</template>

<script>
import { getQuiz } from "../API/api";
export default {
    name: "take-quiz",
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
