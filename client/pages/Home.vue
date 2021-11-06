<template>
  <div>
    <div class="home--wrapper">
      <h1>Home</h1>
      <div>
        <ul>
          <li v-for="user in users" :key='user.id'>
            {{ user.username }}
          </li>
        </ul>
      </div>
      <p>{{ user }}</p>
      <button @click="loginCheck">Register</button>
    </div>
    <button @click="privateRoute">isAuth</button>
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
      users: (state) => state.users.user,
    }),
  },
  async asyncData({ store }) {
    const users = await usersService.getAll();
    store.dispatch("users/add", users.data);
  },
  async created() {
    const privateRoute = await usersService.getUserInfo();
    this.user = privateRoute.data;
  },
  methods: {
    async register() {
      try {
        await authService.register(user);
        const userLogin = await authService.login(user);
        await authService.setupSession(userLogin);
        this.user = userLogin.data;
      } catch (err) {
        console.log(err);
      }
    },
    async privateRoute() {
      const privateRoute = await usersService.getUserInfo();
      this.user = privateRoute;
    },
    async loginCheck() {
      try {
        const user = {
          username: "lukasz",
          password: "12345",
        };
        const userLogin = await authService.login(user);
        console.log(userLogin);
        const userData = await authService.sessionAfterLogin(userLogin);
        console.log(userData);
      } catch (err) {
        console.log(err);
      }
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