<template>
    <modal
        class="mx-auto justify-center"
        :contentClass="'min-w-[2rem] w-1/2 mx-auto max-w-[40rem]'"
    >
        <template v-slot:title>Filter & Sort</template>
        <h2 class="text-xl mb-6 font-bold">Filters</h2>
        <FilterSection :items="sources" name="Source"></FilterSection>
        <FilterSection :items="schools" name="School"></FilterSection>
        <FilterSection :items="classes" name="Class"></FilterSection>
        <!-- SUBCLASS FILTERS -->
        <h3 class="text-xl line-behind flex flex-col">
            <div class="flex flex-row justify-between tweak-width">
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
                <span @click="toggleSubClassesSection" class="cursor-pointer px-4">
                    <unicon
                        fill
                        :name="showSubClassSection ? 'angle-up' : 'angle-down'"
                        class="mt-1"
                        height="1.5rem"
                    />
                </span>
            </div>
            <hr class="tweak-width mb-4" />
        </h3>
        <div class="flex flex-row flex-wrap" v-show="showSubClassSection">
            <div class="header mb-6" v-for="(h, i) in subClassHeaders" :key="i">
                <h3 class="text-lg line-behind flex flex-col">
                    <div class="flex flex-row justify-between tweak-width max-w-[80%]">
                        <span>
                            <input
                                :id="`subClassSelectAll_${h}`"
                                name="subClassCheckbox"
                                type="checkbox"
                                class="mr-1 p-1"
                                v-model="selectedSubClassHeaderState[h]"
                                @click="selectSubClassOfBaseClass(h)"
                            />
                            <label :for="`subClassSelectAll_${h}`" class="p-1">{{ h }}</label>
                        </span>
                    </div>
                    <hr class="max-w-[80%] mb-2" />
                </h3>
                <div
                    v-for="(c, i) in subClasses.filter(c => c.baseClass == h)"
                    :key="i"
                    class="min-w-[14rem] lg:min-w-[14rem] lg:min-w-[18rem] xl:min-w-[18rem] my-1"
                >
                    <input
                        v-model="selectedSubClasses"
                        :id="`subClassCheckbox_${h}_${i}`"
                        name="subClassCheckbox"
                        type="checkbox"
                        :value="{ baseClass: c.baseClass, subClass: c.subClass }"
                        class="mr-1 p-1"
                    />
                    <label :for="`subClassCheckbox_${h}_${i}`" class="p-1">{{ c.subClass }}</label>
                </div>
            </div>
        </div>
        <br />
        <!-- VARIANT CLASS FILTERS -->
        <h3 class="text-xl line-behind flex flex-col">
            <div class="flex flex-row justify-between tweak-width">
                <span>
                    <input
                        id="variantClassSelectAll"
                        name="variantClassCheckbox"
                        type="checkbox"
                        class="mr-1 p-1"
                        v-model="allVariantClassesSelected"
                    />
                    <label for="variantClassSelectAll" class="p-1">Variant</label>
                </span>
                <span @click="toggleVariantClassesSection" class="cursor-pointer px-4">
                    <unicon
                        fill
                        :name="showVariantClassSection ? 'angle-up' : 'angle-down'"
                        class="mt-1"
                        height="1.5rem"
                    />
                </span>
            </div>
            <hr class="tweak-width mb-4" />
        </h3>
        <div class="flex flex-row flex-wrap" v-show="showVariantClassSection">
            <div class="header mb-6" v-for="(h, i) in variantClassHeaders" :key="i">
                <h3 class="text-lg line-behind flex flex-col">
                    <div class="flex flex-row justify-between tweak-width max-w-[80%]">
                        <span>
                            <input
                                :id="`variantClassSelectAll_${h}`"
                                name="variantClassCheckbox"
                                type="checkbox"
                                class="mr-1 p-1"
                                v-model="selectedVariantClassHeaderState[h]"
                                @click="selectVariantClassOfBaseClass(h)"
                            />
                            <label :for="`variantClassSelectAll_${h}`" class="p-1">{{ h }}</label>
                        </span>
                    </div>
                    <hr class="max-w-[80%] mb-2" />
                </h3>
                <div
                    v-for="(c, i) in variantClasses.filter(c => c.baseClass == h)"
                    :key="i"
                    class="min-w-[14rem] lg:min-w-[14rem] lg:min-w-[18rem] xl:min-w-[18rem] my-1"
                >
                    <input
                        v-model="selectedVariantClasses"
                        :id="`variantClassCheckbox_${h}_${i}`"
                        name="variantClassCheckbox"
                        type="checkbox"
                        :value="{ baseClass: c.baseClass, variantSource: c.variantSource }"
                        class="mr-1 p-1"
                    />
                    <label :for="`variantClassCheckbox_${h}_${i}`" class="p-1">{{ c.variantSource }}</label>
                </div>
            </div>
        </div>
        <br />
    </modal>
</template>
<script>
import Modal from '@/components/Modal.vue'
import FilterSection from '@/components/FilterSection.vue'
export default {
    components: {
        Modal, FilterSection
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
            showSubClassSection: false,
            selectedSubClasses: [],
            selectedSubClassHeaderState: {},
            showVariantClassSection: false,
            selectedVariantClasses: [],
            selectedVariantClassHeaderState: {},

        }
    },
    computed: {
        schools() {
            return this.$store.getters.getSchools.sort()
        },
        sources() {
            return this.$store.getters.getSources.sort()
        },
        classes() {
            return this.$store.getters.getClasses.sort()
        },
        subClasses() {
            return this.$store.getters.getSubClasses.sort()
        },
        subClassHeaders() {
            //Sort spells by number of subclasses in descending order for better UI Layout
            const allHeaders = this.subClasses.flatMap(c => c.baseClass)
            const distinctHeaders = [...new Set(allHeaders)]
            let classHeadersWithCount = new Array()
            for (let i = 0; i < distinctHeaders.length; i++) {
                const header = distinctHeaders[i]
                const subClasses = this.subClasses.filter(c => c.baseClass === header).sort()
                const subClassCount = subClasses.length
                classHeadersWithCount.push({
                    baseClass: header,
                    subClasses: subClasses.map(c => c.subClass),
                    count: subClassCount,
                })
            }
            const sortedHeaders = classHeadersWithCount.sort((a, b) => b.count - a.count).map(c => c.baseClass)
            return sortedHeaders
        },
        variantClasses() {
            return this.$store.getters.getVariantClasses.sort()
        },
        variantClassHeaders() {
            //Sort spells by number of subclasses in descending order for better UI Layout
            const allHeaders = this.variantClasses.flatMap(c => c.baseClass)
            const distinctHeaders = [...new Set(allHeaders)]
            let classHeadersWithCount = new Array()
            for (let i = 0; i < distinctHeaders.length; i++) {
                const header = distinctHeaders[i]
                const variantClasses = this.variantClasses.filter(c => c.baseClass === header).sort()
                const variantClassCount = variantClasses.length
                classHeadersWithCount.push({
                    baseClass: header,
                    variantClasses: variantClasses.map(c => c.variantSource),
                    count: variantClassCount,
                })
            }
            const sortedHeaders = classHeadersWithCount.sort((a, b) => b.count - a.count).map(c => c.baseClass)
            return sortedHeaders
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
                    this.selectedClasses = this.classes;
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
                    this.resetSubClassHeaderState()
                }
            }
        },
        allVariantClassesSelected: {
            get() {
                return this.selectedVariantClasses.length == this.variantClasses.length
            },
            set() {
                if (this.selectedVariantClasses.length != this.variantClasses.length) {
                    this.selectedVariantClasses = this.variantClasses;
                } else {
                    this.selectedVariantClasses = [];
                    this.resetVariantClassHeaderState()
                }
            }
        },
        filteredSpellIds() {
            return this.spells;
            let spells = this.spells
            spells = this.filterByClass(spells)
            //TODO CONTINUE HERE
        },

    },
    methods: {
        filterByClass(spells) {
            return spells.flatMap()
        },
        filterBySubClass(spells) {
            return spells.flatMap()
        },
        toggleSubClassesSection() {
            this.showSubClassSection = !this.showSubClassSection
        },
        toggleVariantClassesSection() {
            this.showVariantClassSection = !this.showVariantClassSection
        },
        selectSubClassOfBaseClass(baseClass) {
            let allRelatedSubclasses = this.subClasses.filter(c => c.baseClass === baseClass)
            let allChosenRelatedSubClasses = this.selectedSubClasses.filter(c => c.baseClass === baseClass)
            const areAllSelected = allRelatedSubclasses.length === allChosenRelatedSubClasses.length;
            const areNoneSelected = allChosenRelatedSubClasses.length === 0;
            if (areAllSelected) {
                //if yes, remove all with matching base class from selected list
                this.selectedSubClasses = this.selectedSubClasses.filter(c => c.baseClass !== baseClass)
                this.selectedSubClassHeaderState[baseClass] = false;
            }
            else if (areNoneSelected) {
                //if no, add all with matching base class to selected list
                allRelatedSubclasses.forEach(c => { this.selectedSubClasses.push(c) });
                this.selectedSubClassHeaderState[baseClass] = true;

            } else {
                if (this.selectedSubClassHeaderState[baseClass]) {
                    this.selectedSubClasses = this.selectedSubClasses.filter(c => c.baseClass !== baseClass)
                    this.selectedSubClassHeaderState[baseClass] = false
                } else {
                    this.selectedSubClasses = allRelatedSubclasses;
                    this.selectedSubClassHeaderState[baseClass] = true
                }
                //if no, add all with matching base class to selected list
            }
        },
        selectVariantClassOfBaseClass(baseClass) {
            let allRelatedVariantClasses = this.variantClasses.filter(c => c.baseClass === baseClass)
            let allChosenVariantSubClasses = this.selectedVariantClasses.filter(c => c.baseClass === baseClass)
            const areAllSelected = allRelatedVariantClasses.length === allChosenVariantSubClasses.length;
            const areNoneSelected = allChosenVariantSubClasses.length === 0;
            if (areAllSelected) {
                //if yes, remove all with matching base class from selected list
                this.selectedVariantClasses = this.selectedVariantClasses.filter(c => c.baseClass !== baseClass)
                this.selectedVariantClassHeaderState[baseClass] = false;
            }
            else if (areNoneSelected) {
                //if no, add all with matching base class to selected list
                allRelatedVariantClasses.forEach(c => { this.selectedVariantClasses.push(c) });
                this.selectedVariantClassHeaderState[baseClass] = true;

            } else {
                if (this.selectedVariantClassHeaderState[baseClass]) {
                    this.selectedVariantClasses = this.selectedVariantClasses.filter(c => c.baseClass !== baseClass)
                    this.selectedVariantClassHeaderState[baseClass] = false
                } else {
                    this.selectedVariantClasses = allRelatedVariantClasses;
                    this.selectedVariantClassHeaderState[baseClass] = true
                }
                //if no, add all with matching base class to selected list
            }
        },
        resetSubClassHeaderState() {
            let obj = {}
            this.subClassHeaders.forEach(c => {
                obj[c] = false
            })
            return this.selectedSubClassHeaderState = obj
        },
        resetVariantClassHeaderState() {
            let obj = {}
            this.variantClassHeaders.forEach(c => {
                obj[c] = false
            })
            return this.selectedVariantClassHeaderState = obj
        }
    },
    watch: {
        selectedSubClasses(selectedSubClasses) {
            const baseClasses = [...new Set(selectedSubClasses.map(c => c.baseClass))]
            for (let i = 0; i < baseClasses.length; i++) {
                let selectedCount = selectedSubClasses.filter(c => c.baseClass === baseClasses[i]).length
                let totalCount = this.subClasses.filter(c => c.baseClass === baseClasses[i]).length
                this.selectedSubClassHeaderState[baseClasses[i]] = selectedCount === totalCount
            }
        },
        subClassHeaders() {
            this.resetSubClassHeaderState()
        },
        selectedVariantClasses(selectedVariantClasses) {
            const baseClasses = [...new Set(selectedVariantClasses.map(c => c.baseClass))]
            for (let i = 0; i < baseClasses.length; i++) {
                let selectedCount = selectedVariantClasses.filter(c => c.baseClass === baseClasses[i]).length
                let totalCount = this.variantClasses.filter(c => c.baseClass === baseClasses[i]).length
                this.selectedVariantClassHeaderState[baseClasses[i]] = selectedCount === totalCount
            }
        },
        subClassHeaders() {
            this.resetVariantClassHeaderState()
        }
    },
}
</script>