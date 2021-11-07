<template>
    <div>
        <v-row v-if='user && user.isAuth' v justify="center" align="center">
            <h2>From protected route</h2>
        </v-row>
    </div>
</template>

<script>
import userService from "../../api/users";
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters({
      user: "users/user",
    }),
  },
  async created() {
    const routeGuard = await userService.userInfoRoute();
    return routeGuard;
  },
};
</script>

<style lang="scss" scoped>
</style>