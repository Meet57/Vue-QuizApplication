<template>
    <div class="container">
        <a-modal
            title="Your Name"
            :visible="visible"
            :centered="false"
            :closable="false"
            @ok="saveName"
            @keyup.enter.native="saveName"
            okText="Save"
            :cancel-button-props="{ style: { display: 'none' } }"
        >
            <a-input v-model="name" placeholder="Name" />
        </a-modal>
        <div class="flex justify-between place-items-center mx-5">
            <h1 class="text-4xl mt-5 text-blue-500">All Quiz</h1>
            <div>
                <a-button type="primary" class="mt-3 ml-3" @click="submissions">
                    Submissions
                </a-button>
                <a-button type="primary" class="mt-3 ml-3" @click="createForm">
                    Create Quiz
                </a-button>
            </div>
        </div>
        <div class="flex" v-if="quiz">
            <div class="flex" v-for="qu in quiz" :key="qu.id">
                <a-card :title="qu.quiz" style="width: 400px; margin: 20px">
                    <div slot="extra" class="flex">
                        <a-popconfirm
                            title="Are you sure？"
                            ok-text="Yes"
                            cancel-text="No"
                            @confirm="deletequiz(qu.id)"
                        >
                            <img
                                style="width: 20px; height: 20px"
                                class="my-auto mr-3"
                                src="https://img.icons8.com/material-rounded/24/000000/filled-trash.png"
                            />
                        </a-popconfirm>
                        <router-link :to="'/edit/' + qu.id" class="my-auto mr-3">
                            <img
                                style="width: 20px; height: 20px"
                                src="https://img.icons8.com/ios-glyphs/30/000000/edit--v1.png"
                            />
                        </router-link>
                        <router-link :to="'/quiz/' + qu.id">
                            <a-button type="danger"> Take Quiz </a-button>
                        </router-link>
                    </div>
                </a-card>
            </div>
        </div>
        <div class="m-5 flex justify-center" v-else>
            <a-spin size="large" />
        </div>
    </div>
</template>

<script>
import { deleteQuiz, getQuizes } from "../API/api";
export default {
    name: "BaseDashboard",
    data() {
        return {
            quiz: null,
            visible: false,
            name: "",
        };
    },
    methods: {
        submissions() {
            this.$router.push("/submissions");
        },
        createForm() {
            this.$router.push("/create");
        },
        deletequiz(id) {
            deleteQuiz(id).then(() => {
                getQuizes()
                    .then((data) => {
                        this.quiz = data;
                    })
                    .catch(() => {});
            });
        },
        saveName() {
            if (this.name.length > 0) {
                localStorage.setItem("name", this.name);
                this.visible = false;
            }
        },
    },
    created() {
        if (!localStorage.getItem("name")) {
            this.visible = true;
        }
        getQuizes().then((data) => {
            this.quiz = data;
        });
    },
};
</script>

<style></style>
