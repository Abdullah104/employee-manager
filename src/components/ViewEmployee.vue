<template>
  <div id="view-employee">
    <ul class="collection with-header">
      <li class="collection-header">
        <h4>{{ name }}</h4>
      </li>
      <li class="collection-item">Employee ID#: {{ employeeId }}</li>
      <li class="collection-item">Department: {{ department }}</li>
      <li class="collection-item">Position: {{ position }}</li>
    </ul>
    <router-link class="btn grey" to="/">Back</router-link>
    <button class="btn red" @click="deleteEmployee">Delete</button>
    <div class="fixed-action-btn">
      <router-link
        class="btn-floating btn-large red"
        v-bind:to="{ name: 'edit-employee' }"
      >
        <i class="fa fa-pen"></i>
      </router-link>
    </div>
  </div>
</template>

<script>
import firestore from "../firebase_init";
import {
  collection,
  getDocs,
  where,
  query,
  limit,
  deleteDoc,
} from "firebase/firestore";

export default {
  name: "view-employee",
  data() {
    return {
      employeeId: null,
      name: null,
      department: null,
      position: null,
      documentReference: null,
    };
  },
  async beforeRouteEnter(to, _, next) {
    if (to.params.employeeId != null) {
      const employeesCollection = collection(firestore, "employees");

      const employeesQuery = query(
        employeesCollection,
        where("employee_id", "==", to.params.employeeId),
        limit(1)
      );

      const snapshot = await getDocs(employeesQuery);
      const document = snapshot.docs[0];
      const { name, department, position } = document.data();

      next((vm) => {
        vm.employeeId = to.params.employeeId;
        vm.name = name;
        vm.department = department;
        vm.position = position;
        vm.documentReference = document.ref;
      });
    }
  },
  watch: {
    $route: "fetchData",
  },
  methods: {
    async fetchData() {
      if (this.$route.params.employeeId != null) {
        const employeesCollection = collection(firestore, "employees");

        const employeesQuery = query(
          employeesCollection,
          where("employee_id", "==", this.$route.params.employeeId),
          limit(1)
        );

        const snapshot = await getDocs(employeesQuery);
        const document = snapshot.docs[0];
        const { name, department, position } = document.data();

        this.employeeId = this.$route.params.employeeId;
        this.name = name;
        this.department = department;
        this.position = position;
        this.documentReference = document.ref;
      }
    },
    async deleteEmployee() {
      if (confirm("Are you Sure?")) {
        await deleteDoc(this.documentReference);

        this.$router.push("/");
      }
    },
  },
};
</script>