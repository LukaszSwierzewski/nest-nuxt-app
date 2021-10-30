<template>
  <v-row justify="center" align="center">
    <h1>Home</h1>
    {{ users }}
  </v-row>
</template>
<script>
import usersService from "../api/users";
export default {
  data() {
    return {
      users: [],
    };
  },
  async created() {
    const users = await usersService.getAll();
    this.users = users.data;
  },
};
</script>
