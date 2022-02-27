export const spellStore = {
    state: () => ({
        dataLoading: false,
        spells: [],
        spellMeta: {
            classes: [],
            subClasses: [],
            variantClasses: [],
        },
        spellBookSpells: [],
        selectedSpell: {},
        spellBookListNames: {},
    }),
    actions: {
        fetchSpells({ commit, state }) {
            commit('setDataLoading', true);
            fetch(`https://localhost:7169/redspell/PHB`)
                .then((response) => {
                    if (!response.ok) {
                        throw new Error("HTTP error " + response.status);
                    }
                    return response.json();
                })
                .then((data) => {
                    console.log(data)
                    const spells = data;
                    commit('setSpells', spells);
                    commit('setClassMeta', spells);
                    commit('setDataLoading', false);
                });
        }
    },
    mutations: {
        setDataLoading(state, isLoading) {
            state.dataLoading = isLoading;
        },
        setSelectedSpell(state, id) {
            state.selectedSpell = state.spells.find(c => c.id === id);
        },
        setSpells(state, spells) {
            state.spells = spells;
        },
        setClassMeta(state, spells) {
            state.spellMeta.classes = [...new Set(spells.flatMap(c => c.classes.map(d => d.baseClass)))];

            const subClassesNotDistinct = [...new Set(spells.flatMap(c => c.classes.map(d => d))
                .filter(c => c.classType === 'Sub')
                .map(c => { return { baseClass: c.baseClass, subClass: c.subClass } }))]
            const distinctSubClasses = Array.from(new Set(subClassesNotDistinct.map(c => JSON.stringify(c)))).map(JSON.parse);
            state.spellMeta.subClasses = distinctSubClasses;

            const variantNotDistinct = [...new Set(spells.flatMap(c => c.classes.map(d => d))
                .filter(c => c.classType === 'Variant')
                .map(c => { return { baseClass: c.baseClass, variantSource: c.variantSource } }))]
            const distinctVariants = Array.from(new Set(variantNotDistinct.map(c => JSON.stringify(c)))).map(JSON.parse);
            state.spellMeta.variantClasses = distinctVariants;

        }
    },
    getters: {
        getSpells(state) {
            return state.spells;
        },
        getSelectedSpell(state) {
            return state.selectedSpell;
        },
        getClasses(state) {
            return state.spellMeta.classes;
        },
        getSubClasses(state) {
            return state.spellMeta.subClasses;
        },
        getVariantClasses(state) {
            return state.spellMeta.variantClasses;
        }
    }
}