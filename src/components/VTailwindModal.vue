<template>
    <vue-final-modal
        v-slot="{ params, close }"
        v-bind="$attrs"
        class="flex"
        classes="flex items-start mt-8 "
        content-class="w-full relative flex flex-col max-h-full mx-8 p-4  border dark:border-gray-800 rounded bg-white dark:bg-gray-900"
    >
        <span class="mr-8 text-2xl font-bold">
            <slot name="title"></slot>
        </span>
        <hr class="mb-4 mt-4" />
        <div class="flex-grow overflow-y-auto min-h-[18rem]">
            <slot v-bind:params="params"></slot>
        </div>
        <hr class="mb-4 mt-4" />
        <div class="flex-shrink-0 flex justify-end items-center">
            <a
                v-if="showConfirm"
                href="#"
                @click="$emit('confirm', close)"
                class="inline border hover:bg-gray-50 focus:bg-gray-50 focus:shadow-sm bg-white p-2 bg-gray-50 hover:shadow transition-all text-center border-gray-300 focus:ring-gray-300 focus:ring-2 px-3 mx-1"
            >
                <span class="inline-block">
                    <span class="font-medium">Apply</span>
                    <span class="align-middle ml-0.5">
                        <unicon fill name="check-circle" height="1rem" />
                    </span>
                </span>
            </a>
        </div>
        <button class="absolute top-0 right-0 mt-5 mr-4" @click="close">
            <unicon class="w-5 h-5" name="times-circle" fill />
        </button>
    </vue-final-modal>
</template>
<script>
export default {
    name: 'VTailwindModal',
    inheritAttrs: false,
    props: {
        showConfirm: {
            default: true,
            type: Boolean
        }
    }
}
</script>