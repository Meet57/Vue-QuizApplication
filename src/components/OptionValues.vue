<template>
    <div class="flex items-center">
        <div class="text-blue-500 text-xl mr-2 flex">#{{ index + 1 }}</div>
        <a-input v-model="text" :placeholder="'Option ' + (index + 1)" />
        <div v-if="canDelete" class="mx-1 imageButton" v-on:click="$emit('delete')" :title="'Delete Option'">
            <img src="https://img.icons8.com/ios/50/000000/cancel.png" />
        </div>
        <div v-if="canAdd" v-on:click="$emit('add')" class="mx-1 imageButton" :title="'Add Option'">
            <img
                src="https://img.icons8.com/external-tanah-basah-detailed-outline-tanah-basah/48/000000/external-plus-user-interface-tanah-basah-detailed-outline-tanah-basah.png"
            />
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
