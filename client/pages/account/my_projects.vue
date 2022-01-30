<template>
    <div v-if="isLoggedIn">
        <v-row v justify="center" align="center">
            <h2>From protected routeeeeee</h2>
        </v-row>
    </div>
</template>

<script>
import routeGuard from '@/use/routeGuard.js';
import UsersService from '@/api/users.js'
export default {

  setup() {
    const { routeCheck, isLoggedIn } = routeGuard();
    const routeGuardFetch = async() => {
        await routeCheck(UsersService.userInfoRoute())
    }
    routeGuardFetch()
    return { isLoggedIn }
  }
};
</script>

<style lang="scss" scoped>
</style>