<template>
    <SlideOverFrame>
        <h1>{{ message }}</h1>
        <h3>{{ $route.params.id }}</h3>
    </SlideOverFrame>
</template>
<script>
import SlideOverFrame from '@/frames/SlideOverFrame.vue';
export default {
    components: {
        SlideOverFrame,
    },
    props: {
        // id: kc
    },
    data() {
        return {
            message: 'Single Spell'
        }
    }
}
</script>
