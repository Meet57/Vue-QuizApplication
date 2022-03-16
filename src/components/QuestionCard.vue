<template>
    <div class="my-3">
        <a-card style="width: 300px" :hoverable="true">
            <div slot="title">
                <ValidationProvider
                    :name="'Question ' + (index + 1)"
                    rules="required"
                    v-slot="{ errors }"
                >
                    <div v-if="disable">{{ value.text }}</div>
                    <a-input v-else :placeholder="'Question ' + (index + 1)" v-model="text" />
                    <div class="error">
                        {{ errors[0] }}
                    </div>
                </ValidationProvider>
            </div>
            <div slot="extra" class="ml-1">
                <div class="flex">
                    <img
                        v-if="canDelete"
                        @click="$emit('delete')"
                        :title="'Delete Question'"
                        style="height: 30px; width: 30px"
                        src="https://img.icons8.com/fluency/144/000000/cancel.png"
                    />
                    <img
                        v-if="canAdd"
                        @click="$emit('add')"
                        :title="'Add Question'"
                        style="height: 30px; width: 30px"
                        src="https://img.icons8.com/color/48/000000/add--v1.png"
                    />
                </div>
            </div>
            <slot name="options">
                <MultipleFormItem v-model="options">
                    <template
                        #default="{
                            index,
                            item,
                            updateItem,
                            deleteItem,
                            canAdd,
                            addItem,
                            canDelete,
                        }"
                    >
                        <QuestionCardOptions
                            :key="item.id"
                            :value="item"
                            :index="index"
                            :can-add="canAdd"
                            :can-delete="canDelete"
                            @add="addItem()"
                            @update="updateItem($event, item.id)"
                            @delete="deleteItem(item.id)"
                        />
                    </template>
                </MultipleFormItem>
                <br />
                <div class="flex items-center">
                    <ValidationProvider name="Answer" rules="required" v-slot="{ errors }">
                        <div class="text-green-600 mr-3 text-xl">Answer</div>
                        <a-select
                            style="width: 200px"
                            placeholder="Answer"
                            v-model="answer"
                            :options="answerOptions"
                        >
                        </a-select>
                        <div class="error">
                            {{ errors[0] }}
                        </div>
                    </ValidationProvider>
                </div>
            </slot>
        </a-card>
    </div>
</template>

<script>
import MultipleFormItem from "./MultipleFormItem.vue";
import QuestionCardOptions from "./QuestionCardOptions.vue";
export default {
    name: "QuestionCard",
    components: {
        QuestionCardOptions,
        MultipleFormItem,
    },
    props: {
        value: {
            type: Object,
            required: true,
        },
        canAdd: {
            type: Boolean,
        },
        canDelete: {
            type: Boolean,
        },
        disable: {
            type: Boolean,
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
