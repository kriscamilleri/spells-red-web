export const spellStore = {
    state: () => ({
        dataLoading: false,
        spells: [],
        spellMeta: {
            classes: [],
            subClasses: [],
            variantClasses: [],
            schools: [],
            sources: [],
        },
        spellBookSpells: [],
        selectedSpell: {},
        spellBookListNames: {},
        repositories: [],
    }),
    actions: {
        fetchRepositories({ commit, state }, { token }){
            fetch(`https://localhost:7169/repository`,
                {
                    mode: "cors",
                    headers: {
                      'Authorization': `Bearer ${token}`
                    }
                })
                .then((response) => {
                    if (!response.ok) {
                        throw new Error("HTTP error " + response.status);
                    }
                    return response.json();
                })
                .then((data) => {
                    console.log(data)
                    const repos = data;
                    commit('setRepositories', repos);
                });
        },
        fetchSpells({ commit, state }, { token }) {
            console.log(token);
            commit('setDataLoading', true);
            fetch(`https://localhost:7169/redspell/PHB`,
                {
                    mode: "cors",
                    headers: {
                      'Authorization': `Bearer ${token}`
                    }
                })
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
        },
        fetchSpell({ commit, state }, spellObj) {
            commit('setDataLoading', true);
            fetch(`https://localhost:7169/redspell/${spellObj.repo}/${spellObj.id}`)
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
            console.log(spellIdObj.spellId);
        }
    },
    mutations: {
        setRepositories(state, repos) {
            state.repositories = repos;
        },
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

            state.spellMeta.schools = [...new Set(spells.map(c => c.school))];
            state.spellMeta.sources = [...new Set(spells.map(c => c.source))];

        },
    },
    getters: {

        getRepositories(state) {
            return state.repositories;
        },
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
        },
        getSchools(state) {
            return state.spellMeta.schools;
        },
        getSources(state) {
            return state.spellMeta.sources;
        }
    }
}