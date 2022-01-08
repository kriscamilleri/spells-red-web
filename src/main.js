import { createStore } from "vuex";
import { createApp } from "vue";
import App from "./App.vue";
import "./index.css";
import router from "./router";
import { spellStore } from "./store/spells.js";
import Unicon from "vue-unicons";
import {
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
} from "vue-unicons/dist/icons";

Unicon.add([
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
]);

const store = createStore({
  modules: {
    spellStore,
  },
});

createApp(App).use(Unicon).use(router).use(store).mount("#app");
