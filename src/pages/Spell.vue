<template>
    <div>
        <SlideOverFrame>
            <template v-slot:nav>
                <router-link to="/">
                    <h4 class="font-medium">Home</h4>
                </router-link>
            </template>
            <h1>{{ message }}</h1>
            <h3>{{ $route.params.id }}</h3>
        </SlideOverFrame>
    </div>
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
