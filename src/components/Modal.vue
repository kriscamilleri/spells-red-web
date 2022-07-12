<template>
  <vue-final-modal
    v-slot="{ params, close }"
    v-bind="$attrs"
    class="flex"
    classes="flex  justify-items-center items-center items-stretch max-w-screen-xl mx-auto mt-8 mb-8 "
    :content-class="
      contentClass +
      ' relative flex flex-col content-start max-h-full mx-8 p-4 rounded bg-white mx-auto'
    "
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
        class="inline border hover:bg-gray-50 focus:bg-gray-50 focus:shadow-sm bg-white p-2 hover:shadow transition-all text-center border-gray-300 focus:ring-gray-300 focus:ring-2 px-3 mx-1"
      >
        <span class="inline-block">
          <span class="font-medium">Apply</span>
          <span class="align-middle ml-0.5 cursor-pointer">
            <unicon fill name="check-circle" height="1rem" />
          </span>
        </span>
      </a>
    </div>
    <slot name="header"></slot>
    <button
      class="absolute top-0 right-0 mt-5 mr-4 cursor-pointer"
      @click="closeDialog(close)"
    >
      <unicon class="w-5 h-5" name="multiply" fill />
    </button>
  </vue-final-modal>
</template>
<script>
export default {
  name: "Modal",
  inheritAttrs: false,
  props: {
    showConfirm: {
      type: Boolean,
      default: true,
    },
    contentClass: {
      type: String,
      default: "w-full",
    },
  },
  methods: {
    closeDialog(close) {
      console.log(close);
      close();
    },
  },
};
</script>
