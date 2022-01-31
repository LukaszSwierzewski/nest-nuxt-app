<template>
    <div v-if="isLoggedIn">
        <v-row v justify="center" align="center" class='flex-column'>
            <h2>My project</h2>
            <div>
              <ul>
                <li v-for="(item, i) in arrayFromLocal" :key='i'>{{ item }}</li>
              </ul>
            </div>
            <div>
              <v-text-field 
              label="add new project"
              v-model='valueToSave' />
              <v-btn @click="arrayPusher(arrayFromLocal)">Add to project</v-btn>
            </div>
        </v-row>
    </div>
</template>

<script>
import routeGuard from '@/use/routeGuard.js';
import localStorageSaving from '@/use/localStorage.js';
import UsersService from '@/api/users.js'
export default {
  setup() {
    const { routeCheck, isLoggedIn } = routeGuard();
    const { arrayFromLocal, arrayPusher, saveToLocalStorage, getFromLocalStorage, valueToSave } = localStorageSaving()
    const routeGuardFetch = async() => {
        await routeCheck(UsersService.userInfoRoute())
    }
    if(process.client) {
      const localStorageList = getFromLocalStorage('projects')
      arrayFromLocal.value = localStorageList
    }
    routeGuardFetch()
    return { isLoggedIn, arrayFromLocal, arrayPusher, valueToSave, saveToLocalStorage }
  },
  beforeRouteLeave (to, from, next) {
    this.saveToLocalStorage('projects', this.arrayFromLocal)
    next()
  }
};
</script>

<style lang="scss" scoped>
</style>