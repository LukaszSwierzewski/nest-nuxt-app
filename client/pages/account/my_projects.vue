<template>
    <div>
        <v-row v justify="center" align="center">
            <h2>From protected routeeeeee</h2>
        </v-row>
    </div>
</template>

<script>
import routeGuard from '@/use/routeGuard.js';
export default {

  setup() {
    const { routeCheck } = routeGuard();
    const routeGuardFetch = async() => {
        await routeCheck()
    }
    routeGuardFetch()
  }
};
</script>

<style lang="scss" scoped>
</style>