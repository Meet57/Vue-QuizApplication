<template>
    <div class="container">
        <div class="flex justify-between place-items-center mx-5">
            <h1 class="text-4xl mt-5 text-blue-500">
                {{ data.id ? "Edit Quiz" : "Create Quiz" }}
            </h1>
            <a-button type="danger" class="mt-3 ml-3" @click="$router.push('/')"> Back </a-button>
        </div>
        <div class="flex justify-center">
            <div v-if="loading">
                <a-spin size="large" />
            </div>
            <div v-else>
                <a-input size="large" id="quiz" v-model="data.quiz" placeholder="Quiz Title" style="width: 300px" />
                <br />
                <br />
                Negative Marking :
                <a-radio-group v-model="data.negative" button-style="solid">
                    <a-radio-button :value="true"> Yes </a-radio-button>
                    <a-radio-button :value="false"> No </a-radio-button>
                </a-radio-group>
                <br />
                <br />
                <MultipleFormItem v-model="data.questions">
                    <template v-slot="{ index, item, updateItem, deleteItem, canAdd, addItem, canDelete }">
                        <QuestionCard
                            :key="item.id"
                            :value="item"
                            :index="index"
                            :canAdd="canAdd"
                            :canDelete="canDelete"
                            :disable="false"
                            @add="addItem({ options: [{ id: Date.now() }] })"
                            @update="updateItem($event, item.id)"
                            @delete="deleteItem(item.id)"
                        >
                        </QuestionCard>
                    </template>
                </MultipleFormItem>
                <a-button type="info" size="large" class="my-3" @click="create()">
                    {{ data.id ? "Update Quiz" : "Create Quiz" }}
                </a-button>
            </div>
        </div>
    </div>
</template>

<script>
import QuestionCard from "./QuestionCard.vue";
import MultipleFormItem from "./MultipleFormItem.vue";
import { createQuiz, editQuiz, getQuiz } from "@/API/api";
export default {
    name: "CreateQuiz",
    components: {
        QuestionCard,
        MultipleFormItem,
    },
    created() {
        if (this.$route.params.id) {
            getQuiz(this.$route.params.id)
                .then((data) => {
                    if (!data.quiz) {
                        this.$router.push("/404/");
                    }
                    this.data = data;
                    this.loading = false;
                })
                .catch(() => {});
        } else {
            this.loading = false;
        }
    },
    data() {
        return {
            loading: true,
            data: {
                quiz: "",
                negative: false,
                questions: [{ id: Date.now(), options: [{ id: Date.now() }] }],
            },
        };
    },
    methods: {
        checkForTextInArray(arr) {
            let returnValue = true;
            arr.forEach((ele) => {
                if (!ele.text || ele.text.length == 0) {
                    returnValue = false;
                }
                if (ele.options) {
                    returnValue = this.checkForTextInArray(ele.options);
                }
            });
            return returnValue;
        },
        create() {
            if (this.data.quiz.length == 0) {
                this.openNotification("error", "Enter title", " ");
            } else if (!this.checkForTextInArray(this.data.questions)) {
                this.openNotification("error", "Invalid Quiz Data", "Please check for empty Field");
            } else {
                if (this.data.id) {
                    editQuiz(this.data).then(() => {
                        this.$router.push("/");
                    });
                } else {
                    this.openNotification("success", "Quiz Created");
                    createQuiz(this.data).then(() => {
                        this.$router.push("/");
                    });
                }
            }
        },
        openNotification(type, title, body = " ") {
            this.$notification[type]({
                message: title,
                description: body,
            });
        },
    },
};
</script>

<style>
.shake {
    /* Start the shake animation and make the animation last for 0.5 seconds */
    animation: shake 1s;
    background-color: rgba(255, 0, 0, 0.158);
    /* When the animation is finished, start again */
    animation-iteration-count: 1;
}
@keyframes shake {
    0% {
        transform: translate(1px, 1px) rotate(0deg);
    }
    10% {
        transform: translate(-1px, -2px) rotate(-1deg);
    }
    20% {
        transform: translate(-3px, 0px) rotate(1deg);
    }
    30% {
        transform: translate(3px, 2px) rotate(0deg);
    }
    40% {
        transform: translate(1px, -1px) rotate(1deg);
    }
    50% {
        transform: translate(-1px, 2px) rotate(-1deg);
    }
    60% {
        transform: translate(-3px, 1px) rotate(0deg);
    }
    70% {
        transform: translate(3px, 1px) rotate(-1deg);
    }
    80% {
        transform: translate(-1px, -1px) rotate(1deg);
    }
    90% {
        transform: translate(1px, 2px) rotate(0deg);
    }
    100% {
        transform: translate(1px, -2px) rotate(-1deg);
    }
}
</style>
