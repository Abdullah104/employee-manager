<template>
  <div id="new-employee">
    <h3>New Employee</h3>
    <div class="row">
      <form class="col1 s12">
        <div class="row">
          <div class="input-field col1 s12">
            <input v-model="employeeId" type="text" required />
            <label>Employee ID#</label>
          </div>
        </div>
        <div class="row">
          <div class="input-field col1 s12">
            <input v-model="name" type="text" required />
            <label>Name</label>
          </div>
        </div>
        <div class="row">
          <div class="input-field col1 s12">
            <input v-model="department" type="text" required />
            <label>Department</label>
          </div>
        </div>
        <div class="row">
          <div class="input-field col1 s12">
            <input v-model="position" type="text" required />
            <label>Position</label>
          </div>
        </div>
      </form>
      <button class="btn" @click="createEmployee">Submit</button>
      <router-link class="btn grey" to="/">Back</router-link>
    </div>
  </div>
</template>

<script>
import firestore from "../firebase_init";
import { collection, addDoc } from "firebase/firestore";

export default {
  name: "new-employee",
  data() {
    return {
      employeeId: null,
      name: null,
      department: null,
      position: null,
    };
  },
  methods: {
    async createEmployee() {
      await addDoc(collection(firestore, "employees"), {
        employee_id: this.employeeId,
        name: this.name,
        department: this.department,
        position: this.position,
      });

      this.$router.push(`/${this.employeeId}`);
    },
  },
};
</script>