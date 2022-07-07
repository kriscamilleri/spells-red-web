<template>
  <h3 class="text-xl flex flex-col" for="inputs">
    <div class="flex flex-row justify-between tweak-width">
      <span>
        <unicon fill name="sort" class="mt-1 -ml-1" height="1rem" />
        {{ name }}
      </span>
      <span @click="toggleSection" class="cursor-pointer px-4">
        <unicon
          fill
          :name="showSection ? 'angle-up' : 'angle-down'"
          class="mt-1"
          height="1.5rem"
        />
      </span>
    </div>
    <hr class="tweak-width mb-4" />
  </h3>
  <div class="flex flex-row flex-wrap" v-show="showSection">
    <div>
      <div
        v-for="(c, i) in items"
        :key="i"
        class="min-w-[14rem] lg:min-w-[14rem] xl:min-w-[18rem] my-1"
      >
        <input
          v-model="selectedItems"
          :id="`${sectionName}Radio${i}`"
          :name="`${sectionName}Radio`"
          type="radio"
          :value="c"
          class="mr-1 p-1"
        />
        <label :for="`${sectionName}Radio${i}`" class="p-1">{{ c }}</label>
      </div>
      <br />
    </div>
  </div>
</template>
<script>
export default {
  props: {
    name: {
      default: "No Value",
      type: String,
    },
    items: {
      default: [],
      type: Array,
    },
  },
  data() {
    return {
      showSection: false,
      selectedItems: [],
    };
  },
  computed: {
    allSelected: {
      get() {
        return this.selectedItems.length == this.items.length;
      },
      set() {
        if (this.selectedItems.length != this.items.length) {
          this.selectedItems = this.items;
        } else {
          this.selectedItems = [];
        }
      },
    },
    sectionName() {
      var letters = this.name.replace(/[^A-Za-z]+/g, "");
      return letters;
    },
  },
  methods: {
    toggleSection() {
      this.showSection = !this.showSection;
    },
  },
};
</script>
