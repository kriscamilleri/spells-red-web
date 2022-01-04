<template>
  <SlideOverFrame>
    <div class="flex flex-wrap justify-center">
      <SpellCard
        v-for="spell in renderedSpells"
        :fields="generateFieldsForCard(spell)"
        :title="spell.name"
        :key="spell.id"
        class="max-w-[22rem] min-w-[22rem]"
      >
        <!-- <router-link to="/Spell/1234" class="underline">Read me!</router-link> -->
      </SpellCard>
    </div>
    <template v-slot:nav>
      <span class="border border-gray-300 bg-gray-50">
        <label for="#search" class="my-2.5 px-3">Search</label>
        <input id="search" class="bg-white leading-loose m-0 pl-3 px-2 py-1 w-[22rem]" />
      </span>
    </template>
    <VueEternalLoading
      v-if="spells.length > 0"
      :load="load"
      :is-initial="loaderIsInitial"
      class="text-center"
    ></VueEternalLoading>
  </SlideOverFrame>
</template>
<style>
</style>
<script>
import { VueEternalLoading } from '@ts-pro/vue-eternal-loading';
import SlideOverFrame from '@/frames/SlideOverFrame.vue';
import SpellCard from '@/components/SpellCard.vue';

export default {
  data() {
    return {
      loaderIsInitial: false,
      pageSize: 10,
      page: 0
    }
  },
  methods: {
    load({ loaded }) { //needed for eternal loader
      this.page += 1;
      if (this.renderedSpells.length === this.spells.length) {
        loaded(0); //display no more loader
      } else {
        loaded(this.renderedSpells.length, this.pageSize);
      }
    },
    generateFieldsForCard(item) {
      let level = { label: 'Level', value: this.formatLevel(item.level), showLabel: false, seperatorAfter: true };
      let range = { label: 'Range', value: `${item.range.distance.amount || ''} ${item.range.distance.unit}`.trim(), showLabel: true, newLineAfter: true };
      let duration = { label: 'Duration', value: `${item.duration.amount || ''} ${item.duration.type}`.trim(), showLabel: true, seperatorAfter: true };
      let casting = { label: 'Casting', value: `${item.casting.amount} ${item.casting.unit}`, showLabel: true };
      let result = [level, range, duration, casting]
      return result;
    },
    formatLevel(level) {
      if (level === 0) {
        return 'Cantrip'
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
      return `${level}${suffix} Level`
    }

  },
  computed: {
    spells() {
      return this.$store.getters.getSpells
    },
    renderedSpells() {
      const allSpells = this.$store.getters.getSpells;
      const results = allSpells.slice(0, (this.page * this.pageSize));
      return results;
    }
  },
  mounted() {
    this.$store.dispatch('fetchSpells')
  },
  components: {
    SlideOverFrame,
    SpellCard,
    VueEternalLoading,
  }
}
</script>