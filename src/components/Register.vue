<template>
  <div class="container">
    <div class="row">
      <div class="col s12 m8 offset-m2">
        <div
          class="login card-panel grey lighten-4 black-text white-text center"
        >
          <h3>Register</h3>
          <form>
            <div class="input-field">
              <i class="material-icons prefix">email</i>
              <input id="email" type="email" v-model="email" />
              <label for="email">Email</label>
            </div>
            <div class="input-field">
              <i class="material-icons prefix">password</i>
              <input id="password" type="password" v-model="password" />
              <label for="password">Password</label>
            </div>
            <button
              class="btn-btn-large grey lighten-4 black-text"
              v-on:click="register"
            >
              Register
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import firebase from "../firebase_init";

export default {
  name: "register",
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    register: async function (event) {
      event.preventDefault();
      const auth = getAuth(firebase.app);

      try {
        const user = await createUserWithEmailAndPassword(
          auth,
          this.email,
          this.password
        );

        alert(`Account created for ${user.user.email}`);

        this.$router.go({ path: this.$router.path });
      } catch (exception) {
        alert(exception);
        console.error(exception);
      }
    },
  },
};
</script>

<style scoped>
h3 {
  color: black;
}

i {
  color: black;
}
</style>