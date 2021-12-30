<template>
  <SlideOverFrame>
    <div class="flex flex-wrap justify-center">
      <SpellCard v-for="spell in spells" :key="spell.id" class="max-w-[24rem] min-w-[24rem]">
        <router-link to="/Spell/1234" class="underline">Read me!</router-link>
      </SpellCard>
    </div>
  </SlideOverFrame>
</template>
<style>
</style>
<script>
import SlideOverFrame from '@/frames/SlideOverFrame.vue';
import SpellCard from '@/components/SpellCard.vue';

export default {
  data() {
    return {
      repetitions: 10
    }
  },
  methods: {
    increment() {
    }
  },
  computed: {
    spells() {
      return this.$store.getters.getSpells
    }
  },
  mounted() {
    this.$store.dispatch('fetchSpells')
  },
  components: {
    SlideOverFrame,
    SpellCard
  }
}
</script>