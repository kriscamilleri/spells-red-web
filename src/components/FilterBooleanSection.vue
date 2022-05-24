<template>
    <div class>
        <h3 class="text-xl flex flex-col" for="inputs">
            <div class="flex flex-row justify-between tweak-width">
                <span>
                    <unicon fill :name="icon" class="mt-1 -ml-1" height="1rem" />
                    {{ name }}
                </span>
                <span @click="toggleSection" class="cursor-pointer px-4">
                    <unicon
                        fill
                        :name="showSection ? 'angle-up' : 'angle-down'"
                        class="mt-1"
                        height="1.5rem"
                    />
                </span>
            </div>
            <hr class="tweak-width mb-4" />
        </h3>
        <div v-show="showSection">
            <label class="block my-1">
                <input type="radio" value="true" class="border" :name="`${name}-inputs`" />
                Yes
            </label>
            <label class="block my-1">
                <input type="radio" value="both" class="border" :name="`${name}-inputs`" />
                No
            </label>
            <label class="block my-1">
                <input type="radio" value="false" class="border" :name="`${name}-inputs`" />
                Both
            </label>
            <br />
        </div>
    </div>
</template>
<script>
export default {
    props: {
        name: {
            default: 'No Value',
            type: String
        },
        item: {
            default: "Item",
            type: String
        },
        icon: {
            default: 'No Icon',
            type: String
        }
    },
    data() {
        return {
            showSection: false,
            selectedItems: [],
        }
    },
    computed: {
        allSelected: {
            get() {
                return this.selectedItems.length == this.items.length
            },
            set() {
                if (this.selectedItems.length != this.items.length) {
                    this.selectedItems = this.items;
                } else {
                    this.selectedItems = [];
                }
            }
        },
        sectionName() {
            var letters = this.name.replace(/[^A-Za-z]+/g, '');
            return letters;
        }
    },
    methods: {
        toggleSection() {
            this.showSection = !this.showSection
        }
    }
}
</script>