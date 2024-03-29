<template>
  <div>
    <SlideOverFrame>
      <div class="flex flex-wrap justify-center">
        <SpellCard
          v-for="spell in renderedSpells"
          :fields="generateFieldsForCard(spell)"
          :title="spell.name"
          :key="spell.id"
          @click="displaySpellModal(spell.id)"
          class="max-w-[22rem] w-[22rem] min-w-[22rem]"
        >
          <!-- <router-link to="/Spell/1234" class="underline">Read me!</router-link> -->
        </SpellCard>
      </div>
      <div id="modals">
        <div>
          <SpellModal
            v-model="showSpellModal"
            :spell="selectedSpell"
            class="mx-auto justify-center"
          />
        </div>
        <FiltersModal :spells="spells" v-model="showFilterModal"></FiltersModal>
      </div>
      <template v-slot:nav>
        <div class="inline-block">
          <div class="border border-gray-300 bg-gray-50 inline py-3">
            <label for="#search" class="my-2.5 px-3 py-8 inline font-medium"
              >Search</label
            >
            <input
              id="search"
              class="bg-white leading-loose m-0 pl-3 px-2 py-1 min-w-[14rem] lg:min-w-[14rem] lg:min-w-[18rem] xl:min-w-[18rem] focus:ring-2 focus:ring-gray-300 focus:outline-0"
              v-model="searchText"
            />
          </div>
          <a
            @click="displayFilterModal()"
            href="#"
            class="inline border hover:bg-gray-50 focus:bg-gray-50 focus:shadow-sm bg-white p-3 bg-gray-50 hover:shadow transition-all text-center border-gray-300 focus:ring-gray-300 focus:ring-2 px-3 mx-1"
          >
            <span class="inline-block">
              <span class="font-medium">Filter</span>
              <span class="align-middle ml-0.5">
                <unicon fill name="filter" height="1rem" />
              </span>
            </span>
          </a>
        </div>
      </template>
      <VueEternalLoading
        v-if="spells.length > 0"
        :load="load"
        v-model:is-initial="loaderIsInitial"
        class="text-center"
      >
      </VueEternalLoading>
    </SlideOverFrame>
  </div>
</template>
<style></style>
<script>
import { VueEternalLoading } from "@ts-pro/vue-eternal-loading";
import SlideOverFrame from "@/frames/SlideOverFrame.vue";
import SpellCard from "@/components/SpellCard.vue";
import Modal from "@/components/Modal.vue";
import SpellSortFilterMixin from "@/mixins/spellSortFilterMixin.js";
import FiltersModal from "@/components/FiltersModal.vue";
import SpellModal from "@/components/SpellModal.vue";

export default {
  data() {
    return {
      loaderIsInitial: true,
      pageSize: 10,
      page: 0,
      searchText: "",
      showSpellModal: false,
      showFilterModal: false,
      spellModalName: "spellModal",
      filterModalName: "filterModal",
    };
  },
  methods: {
    displaySpellModal(spellId) {
      this.showSpellModal = !this.showSpellModal;
      return this.$store.commit("setSelectedSpell", spellId);
    },
    displayFilterModal(spellId) {
      this.showFilterModal = !this.showFilterModal;
    },
    load({ loaded }) {
      //needed for eternal loader
      this.page += 1;
      if (this.renderedSpells.length === this.spells.length) {
        loaded(0); //display no more loader
      } else {
        loaded(this.renderedSpells.length, this.pageSize);
      }
    },
    generateFieldsForCard(item) {
      let level = {
        label: "Level",
        value: this.formatLevel(item.level),
        showLabel: false,
        seperatorAfter: true,
      };
      let range = {
        label: "Range",
        value: `${item.range.distance.amount || ""} ${
          item.range.distance.unit
        }`.trim(),
        showLabel: true,
        newLineAfter: true,
      };
      let duration = {
        label: "Duration",
        value: `${item.duration.amount || ""} ${item.duration.type}`.trim(),
        showLabel: true,
        seperatorAfter: true,
      };
      let casting = {
        label: "Casting",
        value: `${item.casting.amount} ${item.casting.unit}`,
        showLabel: true,
      };
      let result = [level, range, duration, casting];
      return result;
    },
    formatLevel(level) {
      if (level === 0) {
        return "Cantrip";
      }

      let suffix = "";
      switch (level % 10) {
        case 1:
          suffix = "st";
          break;
        case 2:
          suffix = "nd";
          break;
        case 3:
          suffix = "rd";
          break;
        default:
          suffix = "th";
          break;
      }
      return `${level}${suffix} Level`;
    },
    filterSearch(spells, searchText) {
      if (searchText.length > 0) {
        spells = spells.filter(function (spell) {
          let lowerText = searchText.toLowerCase();
          return spell.name.toLowerCase().trim().indexOf(lowerText) > -1;
        });
      }
      return spells;
    },
  },
  computed: {
    classList() {
      return this.$store.getters.getClasses;
    },
    spells() {
      return this.$store.getters.getSpells;
    },
    selectedSpell() {
      return this.$store.getters.getSelectedSpell;
    },
    renderedSpells() {
      const allSpells = this.filteredSpells;
      const results = allSpells.slice(0, this.page * this.pageSize);
      return results;
    },
    filteredSpells() {
      var searchText = this.searchText;
      if (this.spells) {
        let spells = this.spells;
        // spells = this.filterSpellBook(spells);
        spells = this.filterSearch(spells, searchText);
        spells = this.filterClasses(spells);
        // spells = this.filterLevels(spells);
        // spells = this.filterSources(spells);
        // spells = this.filterSchools(spells);
        // spells = this.filterConcentration(spells);
        // spells = this.filterRitual(spells);
        // spells = this.sortSpells(spells);
        return spells;
      }
      return [];
    },
  },
  mounted() {
    const token = this.$keycloak.token;
    this.$store.dispatch("fetchSpells", {token});
  },
  watch: {
    searchText() {
      this.page = 1;
      this.loaderIsInitial = true;
    },
  },
  components: {
    SlideOverFrame,
    SpellCard,
    Modal,
    VueEternalLoading,
    FiltersModal,
    SpellModal,
  },
  mixins: [SpellSortFilterMixin],
};
</script>
