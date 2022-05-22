import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import firebase from './firebase_init'

let app;

onAuthStateChanged(getAuth(firebase.app), user => {
  if (!app) {
    app = createApp(App).use(router).mount('#app')
  }
});


