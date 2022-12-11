<template>
  <modal>
    <template v-slot:title>
      <a href="#" @click="fadeCloseModal(spell.id)">{{ spell.name }}</a>
    </template>
    <template v-slot:header>
      <button id="menu-button" aria-expanded="true" aria-haspopup="true"
        class="absolute top-0 right-8 mt-5 mr-4 cursor-pointer" @click="toggleLayoutPopover()">
        <unicon class="w-5 h-5" name="window-grid" fill />
      </button>
      <div v-show="layoutPopoverOn"
        class="origin-top-right absolute right-12 mt-8 w-36 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
        role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabindex="-1">
        <div class="py-1" role="none">
          <!-- Active: "bg-gray-100 text-gray-900", Not Active: "text-gray-700" -->
          <label v-for="(layout, i) in layouts" :key="i" :for="'spellModalLayoutRadio_' + i"
            class="text-gray-700 block text-sm focus:outline-none hover:bg-gray-50 hover:text-gray-800 border-transparent hover:border-gray-500 cursor-pointer py-2 px-2"
            tabindex="-1">
            <input :id="'spellModalLayoutRadio_' + i" type="radio" :value="layout" v-model="activeLayout"
              class="inline-block mr-2" />{{ layout }}</label>
        </div>
      </div>
    </template>
    <div v-if="activeLayout === 'Vertical Split'">
      <VerticalSplitLayout :spell="spell"></VerticalSplitLayout>
    </div>
    <div v-else-if="activeLayout === 'Horizontal Split'">
      <HorizontalSplitLayout :spell="spell"></HorizontalSplitLayout>
    </div>
  </modal>
</template>
<style scoped>

</style>
<script>
import Modal from "@/components/Modal.vue";
import VerticalSplitLayout from "@/components/spell-modal/VerticalSplitLayout.vue";
import HorizontalSplitLayout from "@/components/spell-modal/HorizontalSplitLayout.vue";
export default {
  components: {
    Modal,
    VerticalSplitLayout,
    HorizontalSplitLayout,
  },
  props: {
    show: {
      type: Boolean,
      default: false,
    },
    spell: {
      type: Object,
      default: {},
    },
  },
  data() {
    return {
      activeLayout: "Vertical Split",
      layouts: ["Vertical Split", "Horizontal Split"],
      layoutPopoverOn: false,
    };
  },
  methods: {
    fadeCloseModal(spellId) {
      this.showSpellModal = false;
      let self = this;
      setTimeout(function () {
        self.$router.push("/Spell/" + spellId);
      }, 200);
    },

    toggleLayoutPopover() {
      this.layoutPopoverOn = !this.layoutPopoverOn;
    },
    setLayout(layout) {
      this.activeLayout = layout;
    },
  },
};
</script>
