<template>
  <div>
    <div class="home--wrapper">
      <h1>Home</h1>
      <div>
        <ul>
          <li v-for="user in users" :key='user.id'>
            {{ user.name }}
          </li>
        </ul>
      </div>
      <p>{{ user }}</p>
      <button @click="login">Login</button>
    </div>
  </div>
</template>
<script>
import usersService from "../api/users";
import authService from "../api/auth";
import { mapState } from "vuex";
export default {
  data() {
    return {
      user: null,
    };
  },
  computed: {
    ...mapState({
      users: (state) => state.users.users,
    }),
  },
  async asyncData({ store }) {
    const users = await usersService.getAll();
    store.dispatch("users/add", users.data);
  },
  methods: {
    async login() {
      const user = await authService.login();
      this.user = user.data;
      return user;
    },
  },
};
</script>

<style scoped lang='scss'>
.home--wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
</style>