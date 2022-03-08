<template>
    <a-card style="width: 300px; margin: 0">
        <a slot="title">
            <span class="text-red-500">Question:</span><br />
            <a-input v-model="question" placeholder="Question" />
        </a>
        <div class="flex my-1">
            <span class="mr-2">#1</span>
            <a-input v-model="option1" size="small" placeholder="Option 1" />
        </div>
        <div class="flex my-1">
            <span class="mr-2">#2</span>
            <a-input v-model="option2" size="small" placeholder="Option 2" />
        </div>
        <div class="flex my-1">
            <span class="mr-2">#3</span>
            <a-input v-model="option3" size="small" placeholder="Option 3" />
        </div>
        <div class="flex my-1">
            <span class="mr-2">#4</span>
            <a-input v-model="option4" size="small" placeholder="Option 4" />
        </div>
        <div class="flex my-1">
            <p class="text-green-500">Answer:</p>
            <a-select style="width: 200px" v-model="answer" placeholder="Answer" :options="options"> </a-select>
        </div>
    </a-card>
</template>

<script>
export default {
    model: { event: "change" },
    props: {
        value: {
            type: Object,
            default: undefined,
        },
    },
    computed: {
        options() {
            let a = [];
            a.push({ value: this.value.option1, label: this.value.option1 });
            a.push({ value: this.value.option2, label: this.value.option2 });
            a.push({ value: this.value.option3, label: this.value.option3 });
            a.push({ value: this.value.option4, label: this.value.option4 });
            return a;
        },
        question: {
            get() {
                return (this.value || {}).question;
            },
            set(value) {
                this.$emit("change", { ...(this.value || {}), question: value });
            },
        },
        option1: {
            get() {
                return (this.value || {}).option1;
            },
            set(value) {
                this.$emit("change", { ...(this.value || {}), option1: value });
            },
        },
        option2: {
            get() {
                return (this.value || {}).option2;
            },
            set(value) {
                this.$emit("change", { ...(this.value || {}), option2: value });
            },
        },
        option3: {
            get() {
                return (this.value || {}).option3;
            },
            set(value) {
                this.$emit("change", { ...(this.value || {}), option3: value });
            },
        },
        option4: {
            get() {
                return (this.value || {}).option4;
            },
            set(value) {
                this.$emit("change", { ...(this.value || {}), option4: value });
            },
        },
        answer: {
            get() {
                return (this.value || {}).answer;
            },
            set(value) {
                this.$emit("change", { ...(this.value || {}), answer: value });
            },
        },
    },
};
</script>

<style></style>
