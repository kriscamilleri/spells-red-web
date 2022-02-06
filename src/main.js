import { createStore } from "vuex";
import { createApp } from "vue";
import App from "./App.vue";
import "./index.css";
import router from "./router";
import { spellStore } from "./store/spells.js";
import Unicon from "vue-unicons";
import { $vfm, VueFinalModal, ModalsContainer } from 'vue-final-modal'


import {

  uniCheck,
  uniArrowUp,
  uniArrowUpLeft,
  uniArrowUpRight,
  uniArrowDownLeft,
  uniArrowDown,
  uniArrowDownRight,
  uniArrowRight,
  uniArrowLeft,
  uniAwardAlt,
  uniBagAlt,
  uniCloud,
  uniCodeBranch,
  uniCoffee,
  uniCog,
  uniCommentAlt,
  uniCommentAltCheck,
  uniCommentAltDots,
  uniCopy,
  uniConstructor,
  uniDiamond,
  uniEuro,
  uniEqualCircle,
  uniExclamationCircle,
  uniExternalLinkAlt,
  uniEye,
  uniEyeSlash,
  uniFavorite,
  uniFire,
  uniFlaskPotion,
  uniKeySkeleton,
  uniMessage,
  uniMonitor,
  uniPrint,
  uniRedo,
  uniSetting,
  uniSitemap,
  uniTrowel,
  uniSignout,
  uniTimesCircle,
  uniMinusSquareFull,
  uniBookOpen,
  uniBookAlt,
  uniBooks,
  uniBookMedical,
  uniNotebooks,
  uniCloudHeart,
  uniClouds,
  uniUser,
  uniFilter,
  uniFilterSlash,
  uniCheckCircle,
} from "vue-unicons/dist/icons";

Unicon.add([
  uniCheck,
  uniArrowUp,
  uniArrowUpLeft,
  uniArrowUpRight,
  uniArrowDownLeft,
  uniArrowDown,
  uniArrowDownRight,
  uniArrowRight,
  uniArrowLeft,
  uniAwardAlt,
  uniBagAlt,
  uniCloud,
  uniCodeBranch,
  uniCoffee,
  uniCog,
  uniCommentAlt,
  uniCommentAltCheck,
  uniCommentAltDots,
  uniCopy,
  uniConstructor,
  uniDiamond,
  uniEuro,
  uniEqualCircle,
  uniExclamationCircle,
  uniExternalLinkAlt,
  uniEye,
  uniEyeSlash,
  uniFavorite,
  uniFire,
  uniFlaskPotion,
  uniKeySkeleton,
  uniMessage,
  uniMonitor,
  uniPrint,
  uniRedo,
  uniSetting,
  uniSitemap,
  uniTrowel,
  uniSignout,
  uniTimesCircle,
  uniMinusSquareFull,
  uniBookOpen,
  uniBookAlt,
  uniBooks,
  uniBookMedical,
  uniNotebooks,
  uniCloudHeart,
  uniClouds,
  uniUser,
  uniFilter,
  uniFilterSlash,
  uniCheckCircle,
]);

const store = createStore({
  modules: {
    spellStore,
  },
});

const app = createApp(App);

app.use(Unicon).use(router).use(store).mount("#app");

app.component('VueFinalModal', VueFinalModal)
app.component('ModalsContainer', ModalsContainer)
