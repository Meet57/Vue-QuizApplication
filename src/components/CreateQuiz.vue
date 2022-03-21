<template>
    <div class="container">
        <div class="flex justify-between place-items-center mx-5">
            <h1 class="text-4xl mt-5 text-blue-500">
                {{ data.id ? "Edit Quiz" : "Create Quiz" }}
            </h1>
            <button
                type="danger"
                class="mt-3 ml-3 text-white rounded bg-red-500 px-3 py-2 mx-1 hover:bg-red-400"
                @click="$router.push('/')"
            >
                Back
            </button>
        </div>
        <div class="flex justify-center">
            <div v-if="loading">
                <a-spin size="large" />
            </div>
            <div v-else>
                <ValidationObserver v-slot="{ handleSubmit }">
                    <form @submit.prevent="handleSubmit(create)">
                        <ValidationProvider name="Quiz Name" rules="required" v-slot="{ errors }">
                            <a-input
                                size="large"
                                id="quiz"
                                v-model="data.quiz"
                                placeholder="Quiz Title"
                                style="width: 300px"
                            />
                            <div class="error">{{ errors[0] }}</div>
                        </ValidationProvider>
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
                                <QuestionCard
                                    :key="item.id"
                                    :value="item"
                                    :index="index"
                                    :can-add="canAdd"
                                    :can-delete="canDelete"
                                    :disable="false"
                                    @add="
                                        addItem({
                                            options: [{ id: uuidv4 }],
                                        })
                                    "
                                    @update="updateItem($event, item.id)"
                                    @delete="deleteItem(item.id)"
                                >
                                </QuestionCard>
                            </template>
                        </MultipleFormItem>
                        <button
                            type="submit"
                            size="large"
                            class="my-3 text-blue-500 border border-blue-500 py-2 px-3 rounded hover:text-white hover:bg-blue-500"
                        >
                            {{ data.id ? "Update Quiz" : "Create Quiz" }}
                        </button>
                    </form>
                </ValidationObserver>
            </div>
        </div>
    </div>
</template>

<script>
import QuestionCard from "./QuestionCard.vue";
import MultipleFormItem from "./MultipleFormItem.vue";
import { worker } from "@/API/api";
import { v4 as uuidv4 } from "uuid";

export default {
    name: "CreateQuiz",
    components: {
        QuestionCard,
        MultipleFormItem,
    },
    created() {
        if (this.$route.params.id) {
            worker
                .getQuiz(this.$route.params.id)
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
    computed: {
        uuidv4() {
            return uuidv4();
        },
    },
    data() {
        return {
            loading: true,
            data: {
                quiz: "",
                negative: false,
                questions: [{ id: uuidv4(), options: [{ id: uuidv4() }, { id: uuidv4() }] }],
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
            if (this.data.id) {
                worker.editQuiz(this.data).then(() => {
                    this.$router.push("/");
                });
            } else {
                this.openNotification("success", "Quiz Created");
                worker
                    .createQuiz(this.data)
                    .then(() => {
                        this.$router.push("/");
                    })
                    .catch((e) => {
                        console.log(e);
                    });
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
.error {
    color: red;
    font-size: 10px;
}
</style>
