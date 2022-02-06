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
            // return state.spells.map(c => c.)
        }
    }
}