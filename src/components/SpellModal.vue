<template>
    <modal>
        <template v-slot:title>
            <a href="#" @click="fadeCloseModal(spell.id)">{{
                    spell.name
            }}</a>
        </template>
        <div class="grid grid-cols-2">
            <div class="">
                <div class="grid grid-cols-3">
                    <div>
                        <label class="font-bold">Level</label>
                        <p>{{ spell.level }}</p>
                    </div>
                    <div>
                        <label class="font-bold">Range</label>
                        <p>{{ formattedRange }}</p>
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
                    <div>
                        <label class="font-bold">Source</label>
                        <p>{{ spell.source }} {{ spell.page }}</p>
                    </div>
                </div>
                <div class="grid grid-rows-2">
                    <div>
                        <label class="font-bold">Class</label>
                        <p>{{ spell.classes }}</p>
                    </div>
                </div>
            </div>
            <div class="">
                <label class="font-bold">Description</label>

                <p>{{ spell.description }}</p>
            </div>
        </div>

        <!-- <div class="grid grid-cols-4 md:grid-cols-6">
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
        </div> -->
        <!-- <div class="columns-1 sm:columns-3 min-h-[40rem]">
            <p>{{ spell.description }}</p>
        </div> -->
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
    computed: {
        formattedRange() {
            if (this.spell.range) {
                let unit = this.spell.range.distance.unit;
                if (unit === 'miles' || unit === 'feet') {
                    return this.spell.range.type === 'point'
                        ? `${this.spell.range.distance.amount} ${this.spell.range.distance.unit}`
                        : `${this.spell.range.distance.amount} ${this.spell.range.distance.unit} (${this.capitalize(this.spell.range.type)})`;
                }
                return this.capitalize(this.spell.range.distance.unit);
            }
        },
        formattedDuration() {
            if (this.spell.duration) {
                let duration = this.spell.duration;
                if (duration.type === 'minute'
                    || duration.type === 'hour'
                    || duration.type === 'day'
                    || duration.type === 'round') {

                }
            }
        }
    },
    methods: {
        fadeCloseModal(spellId) {
            this.showSpellModal = false
            let self = this;
            setTimeout(function () {
                self.$router.push('/Spell/' + spellId)
            }, 200);
        },
        capitalize(word) {
            console.log(word)
            return [...word].splice(0, 1).toString().toUpperCase() + [...word].splice(1, word.length - 1).join('');
        }
    }
}
</script>