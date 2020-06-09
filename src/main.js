import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import DateFilter from '@/filters/date-filter'
import tooltipDerective from '@/directives/tooltip'
import Paginate from 'vuejs-paginate'
import Vuelidate from 'vuelidate'
import Toast from '@/common/message.plugin'
import Preloader from '@/layouts/Preloader'

import firebase from "firebase/app";
import "firebase/database";
import "firebase/auth";


Vue.config.productionTip = false

Vue.filter('datefilter',DateFilter);
Vue.directive('tooltip',tooltipDerective)
Vue.use(Vuelidate, firebase);
Vue.use(Toast)
Vue.component('Loader', Preloader)
Vue.component('Paginate', Paginate)

firebase.initializeApp({
  apiKey: "AIzaSyBnvC4nLCINB4ImQeyYLe-GDMBq5ykjPHo",
  authDomain: "finance-manager-hard.firebaseapp.com",
  databaseURL: "https://finance-manager-hard.firebaseio.com",
  projectId: "finance-manager-hard",
  storageBucket: "finance-manager-hard.appspot.com",
  messagingSenderId: "520888991336",
  appId: "1:520888991336:web:a9b92b0dbf5756ee9cc5dd",
  measurementId: "G-K8B2TEV3NC"
});

let app 
firebase.auth().onAuthStateChanged(() => {
  if(!app){
    app = new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount('#app')
  }
})

