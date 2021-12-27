<template>
  <SlideOverFrame>
    <SpellCard>
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
  components: {
    SlideOverFrame,
    SpellCard
  }
}
</script>