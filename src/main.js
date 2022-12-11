import { createStore } from "vuex";
import { createApp } from "vue";
import App from "./App.vue";
import "./index.css";
import router from "./router";
import { spellStore } from "./store/spells.js";
import Unicon from "vue-unicons";
import { $vfm, VueFinalModal, ModalsContainer } from 'vue-final-modal'
import VueKeycloak from '@dsb-norge/vue-keycloak-js'

import {
  uniSquint,
  uniJackhammer,
  uniAngleDown,
  uniAngleUp,
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
  uniMultiply,
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
  uniSort,
  uniWindowGrid
} from "vue-unicons/dist/icons";

Unicon.add([
  uniWindowGrid,
  uniSquint,
  uniJackhammer,
  uniAngleDown,
  uniAngleUp,
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
  uniMultiply,
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
  uniSort
]);

const store = createStore({
  modules: {
    spellStore
  },
});

const app = createApp(App);

function setupAuthRouter(router) {
  router.beforeEach((to, from, next) => {
    if (to.meta.isAuthenticated) {
      // Get the actual url of the app, it's needed for Keycloak
      const basePath = window.location.toString()
      if (!app.config.globalProperties.$keycloak.authenticated) {
        // The page is protected and the user is not authenticated. Force a login.
        app.config.globalProperties.$keycloak.login({ redirectUri: basePath.slice(0, -1) + to.path })
      } else if (app.config.globalProperties.$keycloak.hasResourceRole('spells-red-base-role')) {
        // The user was authenticated, and has the app role
        next()
        app.config.globalProperties.$keycloak.updateToken(70)
          .then(() => {
            // next()
          })
          .catch(err => {
            console.error(err)
          })
      } else {
        // The user was authenticated, but did not have the correct role
        // Redirect to an error page
        next({ name: 'Unauthorized' })
      }
    } else {
      // This page did not require authentication
      next()
    }
  })
}

app.use(VueKeycloak, {
  init: {
    // Use 'login-required' to always require authentication
    // If using 'login-required', there is no need for the router guards in router.js
    onLoad: 'check-sso',
    // silentCheckSsoRedirectUri: window.location.origin 
  },
  config: {
    url: 'http://localhost:8080/',
    clientId: 'spells-red-local',
    realm: 'SpellsRed'
  },
  onReady(keycloak) {
    console.log('Keycloak ready', keycloak)
    app.config.globalProperties.$keycloak = keycloak
    app.use(Unicon).use(router).use(store).mount("#app");
    setupAuthRouter(router)
  }
})

app.component('VueFinalModal', VueFinalModal)
app.component('ModalsContainer', ModalsContainer)
