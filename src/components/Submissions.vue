<template>
    <div class="container">
        <div class="flex justify-between place-items-center mx-5">
            <h1 class="text-4xl mt-5 text-blue-500">Submissions</h1>
            <button
                class="mt-3 ml-3 text-white rounded bg-red-500 px-3 py-2 mx-1 hover:bg-red-400"
                @click="back"
            >
                Back
            </button>
        </div>
        <div v-if="submissions" class="mx-5">
            <a-table :columns="columns" :data-source="submissions" :rowKey="(t) => t.id">
                <div
                    slot="filterDropdown"
                    slot-scope="{ setSelectedKeys, selectedKeys, confirm, clearFilters, column }"
                    style="padding: 8px"
                >
                    <a-input
                        v-ant-ref="(c) => (searchInput = c)"
                        :placeholder="`Search ${column.dataIndex}`"
                        :value="selectedKeys[0]"
                        style="width: 188px; margin-bottom: 8px; display: block"
                        @change="(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])"
                        @pressEnter="() => handleSearch(selectedKeys, confirm, column.dataIndex)"
                    />
                    <a-button
                        type="primary"
                        icon="search"
                        size="small"
                        style="width: 90px; margin-right: 8px"
                        @click="() => handleSearch(selectedKeys, confirm, column.dataIndex)"
                    >
                        Search
                    </a-button>
                    <a-button
                        size="small"
                        style="width: 90px"
                        @click="() => handleReset(clearFilters)"
                    >
                        Reset
                    </a-button>
                </div>
                <a-icon
                    slot="filterIcon"
                    slot-scope="filtered"
                    type="search"
                    :style="{ color: filtered ? '#108ee9' : undefined }"
                />
            </a-table>
            <!-- {{ submissions }} -->
        </div>
        <div v-else class="flex justify-center">
            <a-spin size="large" />
        </div>
    </div>
</template>

<script>
import _ from "lodash";
import { worker } from "@/API/api";

const getScore = (score) => {
    let scorelist = score.split("/");
    return parseFloat(scorelist[0]);
};

export default {
    name: "QuizSubmissions",
    created() {
        worker.getSubmissions().then((data) => {
            this.submissions = data;
            // let namefilter = [];
            // data.forEach((data) => {
            //     namefilter.push({ name: data.name, value: data.name });
            // });
            // namefilter = _.uniqBy(namefilter, "value");
            // this.columns[0].filters = _.uniq(namefilter);
            let quizfilter = [];
            data.forEach((data) => {
                quizfilter.push({ text: data.quiz, value: data.quiz });
            });
            quizfilter = _.uniqBy(quizfilter, "value");
            this.columns[2].filters = _.uniq(quizfilter);
        });
    },
    data() {
        return {
            submissions: null,
            columns: [
                {
                    title: "Name",
                    dataIndex: "name",
                    key: "name",
                    scopedSlots: {
                        filterDropdown: "filterDropdown",
                        filterIcon: "filterIcon",
                        customRender: "customRender",
                    },
                    onFilter: (value, record) =>
                        record.name.toString().toLowerCase().includes(value.toLowerCase()),
                    onFilterDropdownVisibleChange: (visible) => {
                        if (visible) {
                            setTimeout(() => {
                                this.searchInput.focus();
                            }, 0);
                        }
                    },
                },
                {
                    title: "Score",
                    dataIndex: "score",
                    sorter: (a, b) => getScore(a.score) - getScore(b.score),
                },
                {
                    title: "Quiz",
                    dataIndex: "quiz",
                    filters: [
                        {
                            text: "London",
                            value: "London",
                        },
                        {
                            text: "New York",
                            value: "New York",
                        },
                    ],
                    onFilter: (value, record) => record.quiz.indexOf(value) === 0,
                },
            ],
        };
    },
    methods: {
        handleSearch(selectedKeys, confirm, dataIndex) {
            confirm();
            this.searchText = selectedKeys[0];
            this.searchedColumn = dataIndex;
        },
        handleReset(clearFilters) {
            clearFilters();
            this.searchText = "";
        },
        back() {
            this.$router.push("/");
        },
    },
};
</script>

<style></style>
