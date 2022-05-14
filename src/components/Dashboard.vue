<template>
  <div id="dashboard">
    <ul class="collection with-header">
      <li class="collection-header"><h4>Employees</h4></li>
      <li
        class="collection-item"
        v-for="employee in employees"
        v-bind:key="employee.id"
      >
        <div class="chip">{{ employee.department }}</div>
        {{ employee.employee_id }}: {{ employee.name }}
        <router-link class="secondary-content"
          v-bind:to="{
            name: 'view-employee',
            params: { employeeId: employee.employee_id },
          }"
          ><i class="fa fa-eye"></i
        ></router-link>
      </li>
    </ul>
    <div class="fixed-action-btn">
      <router-link class="btn-floating btn-large red" to="/new">
        <i class="fa fa-plus" />
      </router-link>
    </div>
  </div>
</template>

<script>
import firestore from "../firebase_init";
import { collection, getDocs, orderBy, query } from "firebase/firestore";

export default {
  name: "dashboard",
  data() {
    return {
      employees: [],
    };
  },
  async created() {
    const employeesCollection = collection(firestore, "employees");
    const employeesQuery = query(employeesCollection, orderBy("department"));
    const querySnapshot = await getDocs(employeesQuery);

    querySnapshot.forEach((document) => {
      const data = document.data();
      const { employee_id, name, department, position } = data;

      const object = {
        id: document.id,
        employee_id,
        name,
        department,
        position,
      };

      this.employees.push(object);
    });
  },
};
</script>