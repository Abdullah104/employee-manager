<template>
  <div id="dashboard">
    <h3>Dashboard</h3>
    <div class="fixed-action-btn">
      <router-link class="btn-floating btn-large red" to="/new">
        <i class="fa fa-plus" />
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "dashboard",
  data() {
    return {
      employees: [],
    };
  },
};
</script>