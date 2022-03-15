<template>
    <div>
        <a-card style="width: 500px; margin-top: 20px" :id="'question' + index">
            <div slot="title">
                {{ value.text }}
            </div>
            <div class="options ml-8">
                <a-radio-group :options="getOptions()" @change="select" />
            </div>
        </a-card>
    </div>
</template>

<script>
export default {
    name: "TakeQuestionCard",
    props: {
        value: {
            type: Object,
            required: true,
        },
        index: {
            type: Number,
            required: true,
        },
    },
    methods: {
        getOptions() {
            return this.value.options.map((op) => ({ label: op.text, value: op.text }));
        },
        select(event) {
            this.$emit("select", event.target.value);
        },
    },
};
</script>

<style></style>
