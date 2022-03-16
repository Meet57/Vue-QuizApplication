<template>
    <div class="flex items-center">
        <div class="text-blue-500 text-xl mr-2 flex">#{{ index + 1 }}</div>
        <ValidationProvider
            :name="'Option' + (index + 1)"
            :rules="{ required: true, checkOption: { array: options } }"
            v-slot="{ errors }"
        >
            <a-input v-model.lazy="text" :placeholder="'Option ' + (index + 1)" />
            <div class="error">
                {{ errors[0] }}
            </div>
        </ValidationProvider>
        <div
            v-if="canDelete"
            class="mx-1 imageButton"
            @click="$emit('delete')"
            :title="'Delete Option'"
            style="height: 20px; width: 20px"
        >
            <img src="https://img.icons8.com/ios/50/000000/cancel.png" />
        </div>
        <div
            v-if="canAdd"
            @click="$emit('add')"
            class="mx-1 imageButton"
            :title="'Add Option'"
            style="height: 20px; width: 20px"
        >
            <img src="https://img.icons8.com/ios/50/000000/add.png" />
        </div>
    </div>
</template>

<script>
export default {
    name: "OptionValues",
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
        options: {
            type: Array,
            default() {
                return [];
            },
        },
        index: {
            type: Number,
            required: true,
        },
    },
    computed: {
        text: {
            get() {
                return (this.value || {}).text;
            },
            set(value) {
                this.$emit("update", { text: value });
            },
        },
    },
};
</script>

<style scoped>
.imageButton {
    width: 35px;
    height: 35px;
    display: flex;
    align-items: center;
}
</style>
