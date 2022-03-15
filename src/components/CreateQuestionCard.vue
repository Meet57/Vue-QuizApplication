<template>
    <div class="my-3">
        <a-card style="width: 300px">
            <div slot="title">
                <a-input :placeholder="'Question ' + (index + 1)" v-model="text" />
            </div>
            <div slot="extra" class="ml-1" href="#">
                <div class="flex">
                    <img
                        v-if="canDelete"
                        v-on:click="$emit('delete')"
                        :title="'Delete Question'"
                        style="height: 30px; width: 30px"
                        src="https://img.icons8.com/fluency/144/000000/cancel.png"
                    />
                    <img
                        v-if="canAdd"
                        v-on:click="$emit('add')"
                        :title="'Add Question'"
                        style="height: 30px; width: 30px"
                        src="https://img.icons8.com/color/48/000000/add--v1.png"
                    />
                </div>
            </div>
            <MultipleFormItem v-model="options">
                <template v-slot="{ index, item, updateItem, deleteItem, canAdd, addItem, canDelete }">
                    <OptionValues
                        :key="item.id"
                        :value="item"
                        :index="index"
                        :canAdd="canAdd"
                        :canDelete="canDelete"
                        @add="addItem()"
                        @update="updateItem($event, item.id)"
                        @delete="deleteItem(item.id)"
                    />
                </template>
            </MultipleFormItem>
            <br />
            <div class="flex items-center">
                <div class="text-green-600 mr-3 text-xl">Answer</div>
                <a-select style="width: 200px" placeholder="Answer" v-model="answer" :options="answerOptions"> </a-select>
            </div>
        </a-card>
    </div>
</template>

<script>
import MultipleFormItem from "./MultipleFormItem.vue";
import OptionValues from "./OptionValues.vue";
export default {
    name: "CreateQuestionCard",
    components: {
        OptionValues,
        MultipleFormItem,
    },
    props: {
        value: {
            type: Object,
            required: true,
        },
        canAdd: {
            type: Boolean,
            required: true,
        },
        canDelete: {
            type: Boolean,
            required: true,
        },
        index: {
            type: Number,
            required: true,
        },
    },
    computed: {
        answer: {
            get() {
                return (this.value || {}).answer;
            },
            set(value) {
                this.$emit("update", { answer: value });
            },
        },
        text: {
            get() {
                return (this.value || {}).text;
            },
            set(value) {
                this.$emit("update", { text: value });
            },
        },
        options: {
            get() {
                return (this.value || {}).options;
            },
            set(value) {
                this.$emit("update", { options: value });
            },
        },
        answerOptions() {
            return this.options.map((op) => ({ value: op.text, label: op.text }));
        },
    },
};
</script>
