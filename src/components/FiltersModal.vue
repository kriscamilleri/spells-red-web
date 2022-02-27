<template>
    <modal
        class="mx-auto justify-center"
        :contentClass="'min-w-[2rem] w-1/2 mx-auto max-w-[40rem]'"
    >
        <template v-slot:title>Filter & Sort</template>
        <!-- CLASS FILTERS -->
        <h2 class="text-2xl mb-4">Filters</h2>
        <h3 class="text-xl line-behind flex flex-col">
            <div class="flex flex-row justify-between tweak-width">
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
            <hr class="tweak-width mb-4" />
        </h3>
        <div class="flex flex-row flex-wrap" v-show="showClassSection">
            <div
                v-for="(c, i) in classes"
                :key="i"
                class="min-w-[14rem] lg:min-w-[14rem] lg:min-w-[18rem] xl:min-w-[18rem] my-1"
            >
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
                <span @click="toggleSubClassesSection" class="cursor-pointer">
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
                                id="subClassSelectAll"
                                name="subClassCheckbox"
                                type="checkbox"
                                class="mr-1 p-1"
                                v-model="selectedSubClassHeaderState[h]"
                                @click="selectSubClassOfBaseClass(h)"
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
            selectedSubClassHeaderState: {},
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
        },
        selectSubClassOfBaseClass(baseClass) {
            let allRelatedSubclasses = this.subClasses.filter(c => c.baseClass === baseClass)
            let allChosenRelatedSubClasses = this.selectedSubClasses.filter(c => c.baseClass === baseClass)
            const areAllSelected = allRelatedSubclasses.length === allChosenRelatedSubClasses.length;
            const areNoneSelected = allChosenRelatedSubClasses.length === 0;
            const areSomeSelected = allChosenRelatedSubClasses.length > 0 && allChosenRelatedSubClasses.length < allRelatedSubclasses.length;
            console.log('areAllSelected', 'areNoneSelected', 'areSomeSelected')
            console.log(areAllSelected, areNoneSelected, areSomeSelected, baseClass)
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
                console.log(this.selectedSubClassHeaderState[baseClass])
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
        resetSubClassHeaderState() {
            let obj = {}
            this.subClassHeaders.forEach(c => {
                obj[c] = false
            })
            return this.selectedSubClassHeaderState = obj

        }
    },
    watch: {
        selectedSubClasses(selectedSubClasses) {
            const baseClasses = [...new Set(selectedSubClasses.map(c => c.baseClass))]
            for (let i = 0; i < baseClasses.length; i++) {
                let selectedCount = selectedSubClasses.filter(c => c.baseClass === baseClasses[i]).length
                let totalCount = this.subClasses.filter(c => c.baseClass === baseClasses[i]).length
                console.log(selectedCount, totalCount)
                this.selectedSubClassHeaderState[baseClasses[i]] = selectedCount === totalCount
            }
        },
        subClassHeaders() {
            this.resetSubClassHeaderState()
        }
    },
}
</script>