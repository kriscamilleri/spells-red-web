<template>

    <!-- a dismissable alert informing the user of the title of the page -->
    <div class="mb-4  border-b px-2">
        <div class="container  py-3 mx-auto  " role="alert">
            <div class="flex">
                <div class="py-1 my-auto">
                    <unicon class="w-8 h-8 mr-4" name="clouds" fill />
                </div>
                <div>
                    <h1 class="font-bold text-lg">{{ header }}</h1>
                    <p class="text-sm">{{ description }}</p>
                </div>
            </div>
        </div>
    </div>
    <div class="px-2">
        <div class="container mx-auto ">
            <div class="flex justify-between items-center border-b border-black ">
                <div class="container mx-auto  items-end my-2 ">
                    <div class="border border-gray-300 border-b bg-gray-50 inline-flex min-w-[18.7rem] mr-2 ">
                        <label for="#search" class="my-2.5 px-3 inline font-medium ">Search</label>
                        <input id="search"
                            class="bg-white leading-loose m-0 pl-3 px-2 py-1 min-w-[14rem]   focus:ring-2 focus:ring-gray-300 focus:outline-0"
                            v-model="search" />
                    </div>
                    <!-- <input class="border border-gray-300 bg-gray-50 inline p-2 mr-2 mb-2 md:mb-0 -ml-2" type="text" placeholder="Search" v-model="search" /> -->
                    <!-- 4 buttons: reset selection, add repository, help -->
                    <div class="inline-flex flex-row my-2 space-x-2 " v-if="buttons.length > 0">

                        <button v-for="(button,i ) in buttons" :key="i" @click="$emit(button.action)" class="border  bg-gray-100 text-black font-bold py-2 px-4 ">
                            {{ button.text }}
                        </button>
                        
                    </div>
                </div>
            </div>
            <div class="overflow-x-auto overflow-y-hidden">
                <table class="border-collapse text-left w-full ">
                    <thead>
                        <tr>
                            <th class="border px-4 py-2 ">
                                <input type="checkbox" v-model="checkAllCheckboxes" />
                            </th>
                            <th class="border px-4 py-2 " v-for="key in keys.filter(c => c !== 'isTableChecked')"
                                :key="key" @click="sortBy(key)">
                                <label class="cursor-pointer"
                                    @click="sortOrder === 'asc' ? sortOrder = 'desc' : sortOrder = 'asc'">
                                    {{ toTitleCase(key) }}
                                    <span v-if="sortKey === key">{{ sortOrder === 'asc' ? '▲' : '▼' }}</span></label>
                            </th>
                        </tr>
                    </thead>
                    <tbody>

                        <tr class="border" v-for="(item, i) in filteredData" :key="i">
                            <td class="border px-1 pl-4">
                                <input type="checkbox" v-model="item.isTableChecked" />
                            </td>
                            <td class="border px-4 py-2" v-for="key in keys.filter(c => c !== 'isTableChecked')"
                                :key="key">
                                {{ item[key] }}
                            </td>
                        </tr>
                    </tbody>
                </table>
                <!-- two buttons  -->
                <div class="flex justify-between items-center mt-2 mb-4">
                    <button class="border bg-gray-100  font-bold py-2 px-4" v-if="(currentPage) > 1"
                        @click="currentPage--">
                        Previous
                    </button>
                    <span class="mx-auto">
                        <span>
                            Page
                            {{ currentPage }}
                            of
                            {{ Math.ceil(tableData.length / pageSize) }}
                        </span>
                        <span class="p-2 mx-2 border-r  border-l">
                            Showing
                            {{ (currentPage - 1) * pageSize + 1 }}
                            to
                            {{ Math.min(tableData.length, currentPage * pageSize) }}
                            of
                            {{ tableData.length }}
                        </span>
                        <span>
                            Page size
                            <select v-model="pageSize" class="py-1 bg-gray-200">
                                <option value=10>10</option>
                                <option value=20>20</option>
                                <option value=50>50</option>
                                <option value=100>100</option>
                            </select>
                        </span>

                    </span>
                    <button class="border bg-gray-100 font-bold py-2 px-4"
                        v-if="(tableData.length > pageSize * currentPage)" @click="currentPage++">
                        Next
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>
  
<script>
export default {
    props: {
        tableData: {
            type: Array,
            required: true,
            default: [{
                name: "users",
                path: "./Repositories/users.json",
                source: "FileSystem"
            }],
        },
        header: {
            type: String,
            required: true,
            default: "Hello World"
        },
        description: {
            type: String,
            required: false,
            default: "Hello World"
        },
        buttons: {
            type: Array,
            required: false,
            default: [{
                text: "Add Repository",
                action: "addRepository"
            },{
                text: "Add Repository2",
                action: "addRepository2"
            }]
        }
    },
    data() {
        return {
            search: "",
            sortKey: "",
            sortOrder: "asc",
            currentPage: 1,
            pageSize: 10,

        };
    },
    computed: {
        checkAllCheckboxes: {
            get() {
                return this.tableData.every(item => item.isTableChecked);
            },
            set(value) {
                this.tableData.forEach(item => {
                    item.isTableChecked = value;
                });
            }
        },
        keys() {
            console.log(this.tableData)
            // get keys from first object in data
            if (this.tableData && this.tableData.length > 0) {
                return Object.keys(this.tableData[Object.keys(this.tableData)[0]]);

            }
            return [];
        },
        filteredData() {
            let data = this.tableData;

            // filter by search keyword
            if (this.search) {
                data = data.filter(item => {
                    return Object.values(item).join(" ").toLowerCase().includes(this.search);
                });
            }

            // sort data ascending or descending

            if (this.sortKey) {
                if (this.sortOrder === 'asc') {
                    data = data.slice().sort((a, b) => {
                        a = a[this.sortKey].toLowerCase();
                        b = b[this.sortKey].toLowerCase();
                        return (a === b ? 0 : a > b ? 1 : -1);
                    });
                } else if (this.sortOrder === 'desc') {
                    data = data.slice().sort((a, b) => {
                        a = a[this.sortKey].toLowerCase();
                        b = b[this.sortKey].toLowerCase();
                        return (a === b ? 0 : a < b ? 1 : -1);
                    });
                }

            }

            // paginate data
            const start = (this.currentPage - 1) * this.pageSize;
            const end = start + this.pageSize;
            return data.slice(start, end);

        },

    },
    methods: {
        sortBy(key) {

            this.sortKey = key;
            this.sortOrders[key] = this.sortOrders[key] * -1;
        },
        //take a string and convert to title case
        toTitleCase(str) {
            return str.replace(
                /\w\S*/g,
                function (txt) {
                    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
                }
            );
        }
    },
    created() {
        this.sortKey = "";
        this.sortOrders = {};
    }
};
</script>