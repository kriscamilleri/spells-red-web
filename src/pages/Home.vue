<template>
  <SlideOverFrame>
    <SpellCard v-for="number in repetitions" :key="number" class="m-2">
      <div>Content</div>
      <router-link to="/Spell/1234" class="underline">Read me!</router-link>
    </SpellCard>
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
  components: {
    SlideOverFrame,
    SpellCard
  }
}
</script>