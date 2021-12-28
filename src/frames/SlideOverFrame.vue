<template>
    <nav class="p-5 flex justify-between">
        <a href="#" class="font-bold" @click="toggleSidebar()">Sidebar</a>
        <router-link to="/" class="font-bold">Spells.Red</router-link>
    </nav>
    <hr />
    <div class="p-5">
        <transition name="fade">
            <div class="absolute" v-show="isSidebarShowing === true">
                <div class>
                    <div class="fixed flex flex-col top-0 left-0 w-64 bg-white h-full border-r">
                        <div class="flex items-center px-5 p-5 border-b">
                            <a href="#" @click="toggleSidebar()">
                                <strong>Sidebar</strong>
                            </a>
                        </div>
                        <div class="overflow-y-auto overflow-x-hidden flex-grow">
                            <ul class="flex flex-col py-3 space-y-1">
                                <li class="px-5">
                                    <div class="flex flex-row items-center h-8">
                                        <div class="tracking-wide text-sm text-blue-500">Spells</div>
                                    </div>
                                </li>
                                <li>
                                    <a
                                        href="#"
                                        class="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-50 text-gray-600 hover:text-gray-800 border-l-4 border-transparent hover:border-gray-500 pr-6"
                                    >
                                        <span class="inline-flex justify-center items-center ml-4">
                                            <svg
                                                class="w-5 h-5"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path
                                                    stroke-linecap="round"
                                                    stroke-linejoin="round"
                                                    stroke-width="2"
                                                    d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                                                />
                                            </svg>
                                        </span>
                                        <span class="ml-2 tracking-wide truncate">Filter & Sort</span>
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#"
                                        class="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-50 text-gray-600 hover:text-gray-800 border-l-4 border-transparent hover:border-gray-500 pr-6"
                                    >
                                        <span class="inline-flex justify-center items-center ml-4">
                                            <svg
                                                class="w-5 h-5"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path
                                                    stroke-linecap="round"
                                                    stroke-linejoin="round"
                                                    stroke-width="2"
                                                    d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                                                />
                                            </svg>
                                        </span>
                                        <span class="ml-2 tracking-wide truncate">Print</span>
                                        <!-- <span
                                            class="px-2 py-0.5 ml-auto text-xs font-medium tracking-wide text-gray-500 bg-gray-50 rounded-full"
                                        >New</span>-->
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </transition>

        <slot></slot>
    </div>
</template>
<style scoped>
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.1s ease-in-out;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}
</style>
<script>
export default {
    data() {
        return {
            isSidebarShowing: false
        }
    },
    methods: {
        toggleSidebar() {
            this.isSidebarShowing = !this.isSidebarShowing
        }
    }

}
</script>