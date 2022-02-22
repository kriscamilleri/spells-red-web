<template>
    <modal
        class="mx-auto justify-center"
        :contentClass="'min-w-[20rem] w-1/2 mx-auto max-w-[40rem]'"
    >
        <template v-slot:title>Filter & Sort</template>
        <!-- CLASS FILTERS -->
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
        <div class="flex flex-row flex-wrap" v-show="showClassSection">
            <div v-for="(c, i) in classes" :key="i" class="min-w-[14rem] my-1">
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
        <br />
        <!-- SUBCLASS FILTERS -->
        <h3 class="text-xl line-behind flex flex-col">
            <div class="flex flex-row justify-between max-w-[80%]">
                <span>
                    <input
                        id="subClassSelectAll"
                        name="subClassCheckbox"
                        type="checkbox"
                        class="mr-1 p-1"
                        v-model="allSubClassesSelected"
                    />
                    <label for="subClassSelectAll" class="p-1">Subclass</label>
                </span>
                <span @click="toggleSubClassesSection" class="cursor-pointer">
                    <unicon
                        fill
                        :name="showSubClassSection ? 'angle-up' : 'angle-down'"
                        class="mt-1"
                        height="1.5rem"
                    />
                </span>
            </div>
            <hr class="max-w-[80%] my-2" />
        </h3>
        <div class="flex flex-row flex-wrap" v-show="showSubClassSection">
            <div class="header" v-for="(h, i) in subClassHeaders" :key="i">
                <h3 class="text-xl line-behind flex flex-col">
                    <div class="flex flex-row justify-between max-w-[80%]">
                        <span>
                            <input
                                id="subClassSelectAll"
                                name="subClassCheckbox"
                                type="checkbox"
                                class="mr-1 p-1"
                            />
                            <!-- v-model="allSubClassesSelected" -->
                            <label for="subClassSelectAll" class="p-1">{{ h }}</label>
                        </span>
                        <span @click="toggleSubClassesSection" class="cursor-pointer">
                            <unicon
                                fill
                                :name="showSubClassSection ? 'angle-up' : 'angle-down'"
                                class="mt-1"
                                height="1.5rem"
                            />
                        </span>
                    </div>
                    <hr class="max-w-[80%] my-2" />
                </h3>
                <div
                    v-for="(c, i) in subClasses.filter(c => c.baseClass == h)"
                    :key="i"
                    class="min-w-[14rem] my-1"
                >
                    <input
                        v-model="selectedSubClasses"
                        :id="`subClassCheckbox${i}`"
                        name="subClassCheckbox"
                        type="checkbox"
                        :value="c.subClass"
                        class="mr-1 p-1"
                    />
                    <label :for="`subClassCheckbox${i}`" class="p-1">{{ c.subClass }}</label>
                </div>
            </div>
        </div>
        <br />
        <!-- VARIANT CLASS FILTERS -->
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
            showSubClassSection: true,
            selectedSubClasses: [],
            showVariantSection: true,
            selectedVariantClasses: []
        }
    },
    computed: {
        classes() {
            return this.$store.getters.getClasses.sort()
        },
        subClasses() {
            return this.$store.getters.getSubClasses.sort()
        },
        subClassHeaders() {
            const allHeaders = this.subClasses.map(c => c.baseClass)
            const distinctHeaders = [...new Set(allHeaders)]
            let classHeadersWithCount = new Array()
            for (let i = 0; i < distinctHeaders.length; i++) {
                const header = distinctHeaders[i]
                const subClasses = this.subClasses.filter(c => c.baseClass === header).sort()
                const subClassCount = subClasses.length
                classHeadersWithCount.push({
                    subClasses: subClasses,
                    count: subClassCount
                })
            }

            const sortedHeaders = classHeadersWithCount.sort((a, b) => { return a.count < b.count }).map(c => c.subClasses.map(d => d.baseClass))
            return sortedHeaders
        },
        variantClasses() {
            return this.$store.getters.getVariantClasses.sort()
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
                    this.selectedClasses = this.classes;
                } else {
                    this.selectedClasses = [];
                }
            }
        },
        allSubClassesSelected: {
            get() {
                return this.selectedSubClasses.length == this.subClasses.length
            },
            set() {
                if (this.selectedSubClasses.length != this.subClasses.length) {
                    this.selectedSubClasses = this.subClasses;
                } else {
                    this.selectedSubClasses = [];
                }
            }
        }
    },
    methods: {
        filterByClass(spells) {
            return spells.flatMap()
        },
        toggleClassesSection() {
            this.showClassSection = !this.showClassSection
        },
        filterBySubClass(spells) {
            return spells.flatMap()
        },
        toggleSubClassesSection() {
            this.showSubClassSection = !this.showSubClassSection
        }
    },
}
</script>