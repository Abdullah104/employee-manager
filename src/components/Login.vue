<template>
  <div class="container">
    <div class="row">
      <div class="col s12 m8 offset-m2">
        <div class="login card-panel green white-text center">
          <h3>Login</h3>
          <form>
            <div class="input-field">
              <i class="material-icons prefix">email</i>
              <input id="email" type="email" v-model="email" />
              <label class="white-text" for="email">Email</label>
            </div>
            <div class="input-field">
              <i class="material-icons prefix">password</i>
              <input id="password" type="password" v-model="password" />
              <label class="white-text" for="password">Password</label>
            </div>
            <button
              class="btn-btn-large grey lighten-4 black-text"
              v-on:click="login"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import firebase from "../firebase_init";

export default {
  name: "Login",
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    login: async function (event) {
      event.preventDefault();

      const auth = getAuth(firebase.app);

      try {
        const user = await signInWithEmailAndPassword(
          auth,
          this.email,
          this.password
        );

        this.$router.go({ path: this.$router.path });
      } catch (exception) {
        alert(exception);
      }
    },
  },
};
</script>