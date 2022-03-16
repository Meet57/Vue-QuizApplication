<template>
    <div>
        <div v-for="(currentItem, index) in value" :key="currentItem.key">
            <slot
                :item="currentItem"
                :index="index"
                :size="value.length"
                :addItem="addItem"
                :update-item="(data, id) => updateItem(data, id)"
                :delete-item="(id) => deleteItem(id)"
                :can-add="index == value.length - 1"
                :can-delete="value.length !== 1"
            >
                Nothing There
            </slot>
        </div>
    </div>
</template>

<script>
import _ from "lodash";

export default {
    name: "MultipleFormItem",
    model: {
        event: "change",
    },
    props: {
        value: {
            type: Array,
            default() {
                return [];
            },
            required: true,
        },
    },
    methods: {
        updateItem(data, id) {
            const index = _.findIndex(this.value, { id });
            this.$emit("change", [
                ...this.value.slice(0, index),
                { ...this.value[index], ...data },
                ...this.value.slice(index + 1),
            ]);
        },
        deleteItem(id) {
            const index = _.findIndex(this.value, { id });
            this.$emit("change", [...this.value.slice(0, index), ...this.value.slice(index + 1)]);
        },
        addItem(data = {}) {
            this.$emit("change", [...this.value, { ...data, id: Date.now() }]);
        },
    },
};
</script>

<style></style>
