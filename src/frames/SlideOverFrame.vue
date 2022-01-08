<template>
    <nav class="px-5 py-3 flex justify-between max-h-[4.15rem] h-[4.15rem]">
        <a href="#" class="font-bold text-xl leading-loose" @click="toggleSidebar()">Sidebar</a>
        <slot name="nav"></slot>
        <div></div>
        <!-- <router-link to="/" class="font-bold text-xl leading-loose">Spells.Red</router-link> -->
    </nav>
    <hr />
    <div class="p-5">
        <transition name="fade">
            <div class="absolute" v-show="isSidebarShowing === true">
                <div class>
                    <div
                        class="fixed flex flex-col top-0 left-0 max-w-sm w-full bg-white h-full border-r"
                    >
                        <nav
                            class="px-5 py-3 border-b flex justify-between min-h-[4.18rem] max-h-[4.18rem] h-[4.18rem]"
                        >
                            <a
                                href="#"
                                class="font-bold text-xl leading-loose"
                                @click="toggleSidebar()"
                            >Sidebar</a>
                        </nav>
                        <div class="overflow-y-auto overflow-x-hidden flex-grow text-lgs">
                            <ul class="flex flex-col py-3 space-y-1">
                                <li class="px-5">
                                    <div class="flex flex-row items-center h-8">
                                        <div class="tracking-wide text-lg text-gray-500">Spells</div>
                                    </div>
                                </li>
                                <li>
                                    <a
                                        href="#"
                                        class="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-50 hover:text-gray-800 border-l-4 border-transparent hover:border-gray-500 pr-6"
                                    >
                                        <span
                                            class="inline-flex text-lg justify-center items-center ml-4"
                                        >
                                            <unicon class="w-5 h-5" name="print" fill />
                                        </span>
                                        <span class="ml-2 tracking-wide truncate">Print Spells</span>
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#"
                                        class="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-50 hover:text-gray-800 border-l-4 border-transparent hover:border-gray-500 pr-6"
                                    >
                                        <span
                                            class="inline-flex text-lg justify-center items-center ml-4"
                                        >
                                            <unicon class="w-5 h-5" name="book-open" fill />
                                        </span>
                                        <span class="ml-2 tracking-wide truncate">New Spellbook</span>
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#"
                                        class="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-50 hover:text-gray-800 border-l-4 border-transparent hover:border-gray-500 pr-6"
                                    >
                                        <span
                                            class="inline-flex text-lg justify-center items-center ml-4"
                                        >
                                            <unicon class="w-5 h-5" name="books" fill />
                                        </span>
                                        <span class="ml-2 tracking-wide truncate">My Spellbooks</span>
                                    </a>
                                </li>
                                <li class="px-5">
                                    <div class="flex flex-row items-center h-8">
                                        <div
                                            class="tracking-wide text-lg text-gray-500"
                                        >Repositories</div>
                                    </div>
                                </li>
                                <li>
                                    <a
                                        href="#"
                                        class="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-50 hover:text-gray-800 border-l-4 border-transparent hover:border-gray-500 pr-6"
                                    >
                                        <span
                                            class="inline-flex text-lg justify-center items-center ml-4"
                                        >
                                            <unicon class="w-5 h-5" name="cloud" fill />
                                        </span>
                                        <span class="ml-2 tracking-wide truncate">New Repository</span>
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#"
                                        class="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-50 hover:text-gray-800 border-l-4 border-transparent hover:border-gray-500 pr-6"
                                    >
                                        <span
                                            class="inline-flex text-lg justify-center items-center ml-4"
                                        >
                                            <unicon class="w-5 h-5" name="clouds" fill />
                                        </span>
                                        <span class="ml-2 tracking-wide truncate">All Repositories</span>
                                    </a>
                                </li>

                                <li class="px-5">
                                    <div class="flex flex-row items-center h-8">
                                        <div class="tracking-wide text-lg text-gray-500">Account</div>
                                    </div>
                                </li>
                                <li>
                                    <a
                                        href="#"
                                        class="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-50 hover:text-gray-800 border-l-4 border-transparent hover:border-gray-500 pr-6"
                                    >
                                        <span
                                            class="inline-flex text-lg justify-center items-center ml-4"
                                        >
                                            <unicon class="w-5 h-5" name="user" fill />
                                        </span>
                                        <span class="ml-2 tracking-wide truncate">My Profile</span>
                                    </a>
                                </li>

                                <li class="px-5">
                                    <div class="flex flex-row items-center h-8">
                                        <div class="tracking-wide text-lg text-gray-500">Credits</div>
                                    </div>
                                </li>

                                <li>
                                    <a
                                        href="#"
                                        class="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-50 hover:text-gray-800 border-l-4 border-transparent hover:border-gray-500 pr-6"
                                    >
                                        <span
                                            class="inline-flex text-lg justify-center items-center ml-4"
                                        >
                                            <unicon class="w-5 h-5" name="code-branch" fill />
                                        </span>
                                        <span class="ml-2 tracking-wide truncate">Github</span>
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#"
                                        class="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-50 hover:text-gray-800 border-l-4 border-transparent hover:border-gray-500 pr-6"
                                    >
                                        <span
                                            class="inline-flex text-lg justify-center items-center ml-4"
                                        >
                                            <unicon class="w-5 h-5" name="diamond" fill />
                                        </span>
                                        <span class="ml-2 tracking-wide truncate">About</span>
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