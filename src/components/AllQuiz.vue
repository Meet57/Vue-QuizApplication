<template>
    <div class="container">
        <div class="flex justify-between place-items-center mx-5">
            <h1 class="text-4xl mt-5 text-blue-500">All Quiz</h1>
            <a-button type="primary" class="mt-3 ml-3" @click="createForm" ghost> Create Form </a-button>
        </div>
        <div class="flex">
            <div class="m-5">
                <a-card title="Vue quiz" style="width: 300px">
                    <a slot="extra" href="#">
                        <a-button type="danger" ghost> Take Quiz </a-button>
                    </a>
                    <p>Description</p>
                </a-card>
            </div>
            <div class="m-5">
                <a-card title="Vue quiz" style="width: 300px">
                    <a slot="extra" href="#">
                        <a-button type="danger" ghost> Take Quiz </a-button>
                    </a>
                    <p>Description</p>
                </a-card>
            </div>
            <div class="m-5">
                <a-card title="Vue quiz" style="width: 300px">
                    <a slot="extra" href="#">
                        <a-button type="danger" ghost> Take Quiz </a-button>
                    </a>
                    <p>Description</p>
                </a-card>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "all-quiz",
    methods: {
        createForm() {
            this.$router.push("/create");
        },
    },
};
</script>

<style></style>
