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
    </div>
  </div>
</template>
<script>
import usersService from "../api/users";
import { mapState } from "vuex";
export default {
  data() {
    return {};
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