<template>
  <div id="edit-employee">
    <h3>Edit Employee</h3>
    <div class="row">
      <form class="col1 s12">
        <div class="row">
          <div class="input-field col1 s12">
            <input v-model="employeeId" type="text" required disabled />
          </div>
        </div>
        <div class="row">
          <div class="input-field col1 s12">
            <input v-model="name" type="text" required />
          </div>
        </div>
        <div class="row">
          <div class="input-field col1 s12">
            <input v-model="department" type="text" required />
          </div>
        </div>
        <div class="row">
          <div class="input-field col1 s12">
            <input v-model="position" type="text" required />
          </div>
        </div>
      </form>
      <button class="btn" @click="updateEmployee">Submit</button>
      <router-link class="btn grey" to="/">Back</router-link>
    </div>
  </div>
</template>

<script>
import firestore from "../firebase_init";
import {
  collection,
  query,
  where,
  limit,
  getDocs,
  updateDoc,
} from "firebase/firestore";

async function getEmployee(employeeId) {
  const employeesCollection = collection(firestore, "employees");

  const employeesQuery = query(
    employeesCollection,
    where("employee_id", "==", employeeId),
    limit(1)
  );

  const snapshot = await getDocs(employeesQuery);
  const document = snapshot.docs[0];

  return document;
}

export default {
  name: "edit-employee",
  data() {
    return { employeeId: null, name: null, department: null, position: null };
  },
  async beforeRouteEnter(to, _, next) {
    const employeeId = to.params.employeeId;

    if (employeeId != null) {
      const document = await getEmployee(employeeId);
      const { name, department, position } = document.data();

      next((vm) => {
        vm.employeeId = employeeId;
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
      const employeeId = this.$route.params.employeeId;

      if (employeeId != null) {
        const document = await getEmployee(employeeId);
        const { name, department, position } = document.data();

        this.employeeId = this.$route.params.employeeId;
        this.name = name;
        this.department = department;
        this.position = position;
        this.documentReference = document.ref;
      }
    },
    async updateEmployee() {
      if (confirm("Are you Sure?")) {
        await updateDoc(this.documentReference, {
          employee_id: this.employeeId,
          name: this.name,
          department: this.department,
          position: this.position,
        });

        this.$router.push(`/${this.employeeId}`);
      }
    },
  },
};
</script>