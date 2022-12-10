<template>
    <div class="container mx-auto">
        <div class="flex justify-between items-center mb-4">
            <input class="border-2 p-2 " type="text" placeholder="Search" v-model="search" />
        </div>
        <div class="overflow-x-auto">
            <table class="border-collapse text-left w-full">
                <thead>
                    <tr>
                        <th class="border px-4 py-2">Select</th>
                        <th class="border px-4 py-2 " v-for="key in keys.filter(c => c !== 'isTableChecked')" :key="key"
                            @click="sortBy(key)">

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
                        <td class="border px-4 py-2" v-for="key in keys.filter(c => c !== 'isTableChecked')" :key="key">
                            {{ item[key] }}
                        </td>
                    </tr>
                </tbody>
            </table>
            <!-- two buttons  -->
            <div class="flex justify-between items-center mt-4">
                <button class="border bg-gray-100  font-bold py-2 px-4 rounded"
                    v-if="(currentPage) > 1" @click="currentPage--">
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
                        <select v-model="pageSize">
                            <option value=10>10</option>
                            <option value=20>20</option>
                            <option value=50>50</option>
                            <option value=100>100</option>
                        </select>
                    </span>

                </span>
                <button class="border bg-gray-100 font-bold py-2 px-4 rounded"
                    v-if="(tableData.length > pageSize * currentPage)" @click="currentPage++">
                    Next
                </button>
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