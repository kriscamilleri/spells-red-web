<template>
    <modal>
        <template v-slot:title>
            <a href="#" @click="onCloseModal(spell.id)">{{
                    spell.name
            }}</a>
        </template>
        <div class="grid grid-cols-4 md:grid-cols-6">
            <div>
                <label class="font-bold">Level</label>
                <p>{{ spell.level }}</p>
            </div>
            <div>
                <label class="font-bold">Class</label>
                <p>{{ spell.classes }}</p>
            </div>
            <div>
                <label class="font-bold">Range</label>
                <p>{{ spell.range }}</p>
            </div>
            <div>
                <label class="font-bold">Duration</label>
                <p>{{ spell.duration }}</p>
            </div>
            <div>
                <label class="font-bold">Casting</label>
                <p>{{ spell.casting }}</p>
            </div>
            <div>
                <label class="font-bold">School</label>
                <p>{{ spell.school }}</p>
            </div>
        </div>
        <div class="columns-1 sm:columns-3 min-h-[40rem]">
            <p>{{ spell.description }}</p>
            <!-- ... -->
        </div>
    </modal>
</template>
<script>
import Modal from '@/components/Modal.vue'

export default {
    components: {
        Modal
    },
    props: {
        show: {
            type: Boolean,
            default: false
        },
        spell: {
            type: Object,
            default: {}
        }
    },
    methods: {
        onCloseModal(spellId) {
            this.showSpellModal = false
            let self = this;
            setTimeout(function () {
                self.$router.push('/Spell/' + spellId)
            }, 200);
        }
    }
}
</script>