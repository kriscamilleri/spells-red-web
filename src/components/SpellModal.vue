<template>
    <modal>
        <template v-slot:title>
            <a href="#" @click="fadeCloseModal(spell.id)">{{
                    spell.name
            }}</a>
        </template>
        <div class="grid sm:grid-cols-1 md:grid-cols-2">
            <div class="">
                <div class="grid grid-cols-3 md:grid-cols-3 lg:grid-cols-4">
                    <div class="mt-2">
                        <label class="font-bold ">Level</label>
                        <p>{{ formattedLevel }}</p>
                    </div>
                    <div class="mt-2">
                        <label class="font-bold ">School</label>
                        <p>{{ spell.school }}</p>
                    </div>
                    <div class="mt-2">
                        <label class="font-bold ">Source</label>
                        <p>{{ spell.source }} {{ spell.page }}</p>
                    </div>
                    <div class="mt-2">
                        <label class="font-bold ">Duration</label>
                        <p>{{ formattedDuration }}</p>
                    </div>
                    <div class="mt-2">
                        <label class="font-bold ">Range</label>
                        <p>{{ formattedRange }}</p>
                    </div>
                    <div class="mt-2">
                        <label class="font-bold ">Casting</label>
                        <p>{{ formattedCasting }}</p>
                    </div>
                    <div class="mt-2" v-if="spell.isRitual">
                        <label class="font-bold ">Ritual</label>
                        <p>{{ capitalize(spell.isRitual.toString()) }}</p>
                    </div>
                    <div class="mt-2" v-if="spell.isConcentration">
                        <label class="font-bold ">Concentration</label>
                        <p>{{ capitalize(spell.isConcentration.toString()) }}</p>
                    </div>

                </div>
                <div class="grid">
                    <div class="">
                        <div class="mt-2">
                            <label class="font-bold ">Components</label>
                            <p>{{ formattedComponents }}</p>
                        </div>
                        <div v-if="formattedBaseClasses && formattedBaseClasses.length > 0" class="mt-2">
                            <label class="font-bold ">Classes</label>
                            <div>
                                <div v-for="(c, i) in formattedBaseClasses" :key="i">
                                    {{ c.source }} - {{ c.classes }}
                                </div>
                            </div>
                        </div>
                        <div v-if="formattedSubClasses && formattedSubClasses.length > 0" class="mt-2">
                            <label class="font-bold ">Sub Classes</label>
                            <div>
                                <div v-for="(c, i) in formattedSubClasses" :key="i">
                                    {{ c.source }} - {{ c.classes }}
                                </div>
                            </div>
                        </div>
                        <div v-if="formattedVariantClasses && formattedVariantClasses.length > 0" class="mt-2">
                            <label class="font-bold ">Variant Classes</label>
                            <div>
                                <div v-for="(c, i) in formattedVariantClasses" :key="i">
                                    {{ c.source }} - {{ c.classes }}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="">
                <div v-if="spell.description && spell.description.paragraph.length > 0">
                    <label class="font-bold">Description</label>
                    <div v-for="(p, i) in spell.description.paragraph" :key="i" class="mb-1 ">{{ p }}</div>
                    <div v-if="spell.description.list !== undefined">
                        <ol v-for="(p, i) in spell.description.list.rows" :key="i" class="mb-1 ">
                            <li>- {{ p }}</li>
                        </ol>
                    </div>
                    <table v-if="spell.description.table !== undefined" class="my-4">
                        <thead>
                            <tr class="mb-1">
                                <th v-for="(h, i) in spell.description.table.headers" :key="i"
                                    class="text-left pr-4 border-b py-2">
                                    {{ h }}
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(r, i) in spell.description.table.rows" :key="i">
                                <td v-for="(h, hi) in spell.description.table.headers" :key="hi" class="py-1">
                                    {{ r[hi] }}
                                </td>
                            </tr>
                        </tbody>
                    </table>

                </div>
                <div v-if="spell.higher && spell.higher.paragraph && spell.higher.paragraph.length > 0">
                    <label class="font-bold">At Higher Levels</label>
                    <div v-for="(h, j) in spell.higher.paragraph" :key="j" class="mb-1">
                        {{ h.replace("At Higher Levels: ", "") }}
                    </div>
                </div>
            </div>
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
    computed: {
        formattedLevel() {
            return this.spell.level === 0 ? 'Cantrip' : this.spell.level;
        },
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
                    return `${duration.amount} ${duration.type}`
                }
                return `${this.capitalize(duration.type)}`
            }
        },
        formattedCasting() {
            if (this.spell.casting) {
                let casting = this.spell.casting;
                if (casting.unit === 'minute' || casting.unit === 'hour' || casting.unit === 'action') {
                    return `${casting.amount} ${casting.unit}`
                }
                if (casting.unit === 'bonus') {
                    return `Bonus action`
                }
                return this.capitalize(casting.unit)
            }
        },
        formattedBaseClasses() {
            if (this.spell.classes) {
                let results = [];
                let sources = [...new Set(this.spell.classes
                    .filter(c => c.classType.toLowerCase() === 'base')
                    .map(c => c.source))];
                console.log(sources.length)
                for (let i = 0; i < sources.length; i++) {
                    let obj = {};
                    obj.source = sources[i];
                    obj.classes = this.spell.classes
                        .filter(c => c.classType.toLowerCase() === 'base' && c.source === sources[i])
                        .map(c => c.displayName).join(', ');
                    results.push(obj)
                }
                return [...new Set(results)]
            }
        },
        formattedSubClasses() {
            if (this.spell.classes) {
                let results = [];
                let obj = {};
                let sources = [...new Set(this.spell.classes
                    .filter(c => c.classType.toLowerCase() === 'sub')
                    .map(c => c.source))];
                for (let i = 0; i < sources.length; i++) {
                    obj.source = sources[i];
                    obj.classes = this.spell.classes
                        .filter(c => c.classType.toLowerCase() === 'sub' && c.source === sources[i])
                        .map(c => c.displayName).join(', ');
                    results.push(obj)
                }
                return [...new Set(results)]
            }
        },
        formattedVariantClasses() {
            if (this.spell.classes) {
                let results = [];
                let obj = {};
                let sources = [...new Set(this.spell.classes
                    .filter(c => c.classType.toLowerCase() === 'variant')
                    .map(c => c.source))];
                for (let i = 0; i < sources.length; i++) {
                    obj.source = sources[i];
                    obj.classes = this.spell.classes
                        .filter(c => c.classType.toLowerCase() === 'variant' && c.source === sources[i])
                        .map(c => c.displayName).join(', ');
                    results.push(obj)
                }
                return [...new Set(results)]
            }
        },
        formattedComponents() {
            if (this.spell.components) {
                const components = this.spell.components;
                const verbalStr = this.spell.components.isVerbal ? 'verbal' : '';
                const somaticStr = this.spell.components.isSomatic ? 'somatic' : '';
                const materialStr = this.spell.components.isMaterial ? `materials (${components.material})` : '';
                const joinedStr = [verbalStr, somaticStr, materialStr].filter(c => c != '').join(', ').trim();
                return this.capitalize(`${joinedStr}.`);
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