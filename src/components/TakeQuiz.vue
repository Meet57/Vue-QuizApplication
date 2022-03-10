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
            <div v-if="data == null" class="mx-5">Loading</div>
            <div v-else class="mx-5">
                <h1 class="text-3xl mt-5 text-green-800">{{ data.quiz }}</h1>
                <div class="mt-4" v-for="(value, index) in data.questions" :key="value.question">
                    <div class="text-xl">{{ index + 1 }} : {{ value.question }}</div>
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
                <button class="mt-3 ml-3 border border-green-400 hover:bg-green-500 hover:text-white px-2 py-1 rounded-md" v-on:click="submit" ghost>
                    Submit
                </button>
            </div>
        </div>
    </div>
</template>

<script>
import { getQuiz } from "../API/api";
export default {
    name: "take-quiz",
    created() {
        getQuiz(this.id).then((data) => {
            this.data = data;
            this.marks = Array(data.questions.length).fill(false);
        });
    },
    computed: {},
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
        submit() {
            let score = this.marks.filter((value) => value == true).length;
            this.result = `${score}/${this.marks.length}`;
        },
        back() {
            this.$router.push("/");
        },
    },
};
</script>

<style></style>
