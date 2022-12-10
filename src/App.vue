<script setup>
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
</script>

<template>
  <router-view v-slot="{ Component }">
    <transition name="scale-slide">
      <component :is="Component" />
    </transition>
  </router-view>
</template>

<style>
.scale-slide-enter-active,
.scale-slide-leave-active {
  position: absolute;
  transition: all 0.5s cubic-bezier(0.19, 1, 0.22, 1);
  width: 100%;
  height: 100%;
  background:white;
  box-shadow: 0 0 0 1px black; /* 'border-style' not available (dashed, solid, etc) */
  }

.scale-slide-enter-from {
  left: -100%;
}

.scale-slide-enter-to {
  left: 0%;
}

.scale-slide-leave-from {
  /* transform: scale(1); */
}

.scale-slide-leave-to {
  /* transform: scale(0.8); */
}
</style>
