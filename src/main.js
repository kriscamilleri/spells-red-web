import { createStore } from 'vuex'
import { createApp } from "vue";
import App from "./App.vue";
import "./index.css";
import router from "./router";
import { spellStore } from './store/spells.js'

const store = createStore({
    modules: {
        spellStore
    }
})


createApp(App).use(router).use(store).mount("#app");
