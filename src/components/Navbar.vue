<template>
  <nav>
    <div class="nav-wrapper green">
      <div class="container">
        <router-link to="/" class="brand-logo">Employee Manager</router-link>
        <ul class="right">
          <li v-if="isSignedIn">
            <span class="email black-text">{{ currentUser }}</span>
          </li>
          <li v-if="isSignedIn">
            <router-link to="/">Dashboard</router-link>
          </li>
          <li v-if="!isSignedIn">
            <router-link to="/login">Login</router-link>
          </li>
          <li v-if="!isSignedIn">
            <router-link to="/register">Register</router-link>
          </li>
          <li v-if="isSignedIn">
            <button class="btn black" v-on:click="signOut">Logout</button>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
import { getAuth, signOut } from "firebase/auth";
import firebase from "../firebase_init";

const auth = getAuth(firebase.app);

export default {
  data() {
    return {
      isSignedIn: false,
      currentUser: false,
    };
  },
  created() {
    const user = auth.currentUser;

    if (user) {
      this.isSignedIn = true;
      this.currentUser = user.email;
    }
  },
  methods: {
    signOut: async function () {
      try {
        await signOut(auth);

        this.$router.go({ path: this.$router.path });
      } catch (exception) {
        alert(exception);
      }
    },
  },
};
</script>