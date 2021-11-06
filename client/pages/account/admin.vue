<template>
    <div>
        <v-row justify="center" align="center">
            <h2>From protected admin route</h2>
        </v-row>
    </div>
</template>

<script>
import userService from "../../api/users";
export default {
  async beforeRouteEnter(to, from, next) {
    const routeGuard = await userService.adminInfoRoute();
    next();
  },
};
</script>

<style lang="scss" scoped>
</style>