<template>
    <modal
        class="mx-auto justify-center"
        :contentClass="'min-w-[20rem] w-1/2 mx-auto max-w-[40rem]'"
    >
        <template v-slot:title>Filter & Sort</template>
        <h3 class="text-xl line-behind flex flex-col">
            <div class="flex flex-row justify-between max-w-[80%]">
                <span>
                    <input
                        id="classSelectAll"
                        name="classCheckbox"
                        type="checkbox"
                        class="mr-1 p-1"
                        v-model="allClassesSelected"
                    />
                    <label for="classSelectAll" class="p-1">Class</label>
                </span>
                <span @click="toggleClassesSection" class="cursor-pointer">
                    <unicon
                        fill
                        :name="showClassSection ? 'angle-up' : 'angle-down'"
                        class="mt-1"
                        height="1.5rem"
                    />
                </span>
            </div>
            <hr class="max-w-[80%] my-2" />
        </h3>
        <div class="flex flex-col flex-wrap max-h-[16rem]" v-show="showClassSection">
            <div v-for="(c, i) in classes" :key="i" class="my-1">
                <input
                    v-model="selectedClasses"
                    :id="`classCheckbox${i}`"
                    name="classCheckbox"
                    type="checkbox"
                    :value="c"
                    class="mr-1 p-1"
                />
                <label :for="`classCheckbox${i}`" class="p-1">{{ c }}</label>
            </div>
        </div>
        <div>{{ subClasses }}</div>
        <div>{{ variantClasses }}</div>
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
        spells: {
            type: Array,
            default: []
        }
    },
    data() {
        return {
            showClassSection: true,
            selectedClasses: [],
            selectedSubClasses: [],
            selectedVariantClasses: []
        }
    },
    computed: {
        classes() {
            return this.$store.getters.getClasses
        },
        subClasses() {
            return this.$store.getters.getSubClasses
        },
        variantClasses() {
            return this.$store.getters.getVariantClasses
        },
        filteredSpellIds() {
            return this.spells;
            let spells = this.spells
            spells = this.filterByClass(spells)
            //TODO CONTINUE HERE
        },
        allClassesSelected: {
            get() {
                return this.selectedClasses.length == this.classes.length
            },
            set() {

                if (this.selectedClasses.length != this.classes.length) {
                    this.selectAllClasses();

                } else {
                    this.selectedClasses = [];
                }

                console.log(this.selectedClasses, this.classes)
            }
        }
    },
    methods: {
        selectAllClasses() {
            this.selectedClasses = this.classes;
        },
        filterByClass(spells) {

            return spells.flatMap()
        },
        toggleClassesSection() {
            this.showClassSection = !this.showClassSection
        }
    },
    mounted() {
        this.isOpen = this.show;
        let self = this;
    },
    watch: {

    }
}
</script>