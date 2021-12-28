<template>
  <SlideOverFrame>
    <div class="flex flex-wrap justify-center">
      <SpellCard v-for="number in repetitions" :key="number" class="max-w-[24rem] min-w-[24rem]">
        <div>Content</div>
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
  components: {
    SlideOverFrame,
    SpellCard
  }
}
</script>