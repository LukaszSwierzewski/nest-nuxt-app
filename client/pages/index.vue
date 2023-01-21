<template>
  <v-row class="row_column" justify="center" align="center">
      <v-form v-if="user" class='col'
      ref="form"
    >
    <h2 class="mt-5 mb-5">Oto twój Dashboard {{ user.username }}</h2>
      <v-text-field
        v-model="orderID"
        :counter="10"
        label="Numer zamówienia"
        required
      ></v-text-field>

  
      <v-btn
        color="success"
        class="mr-4"
        @click="addOrder"
      >
        Wyślij
      </v-btn>
  
      <v-btn
        color="error"
        class="mr-4"
      >
        Zrestartuj
      </v-btn>
    </v-form>
    <h3 class="mt-4" v-else>Nie jesteś zalogowany, zaloguj się</h3>
  </v-row>
</template>
<script>
import useEvent from "@/composable/events.js";
import workerService from '@/api/worker/worker'
import useRequest from '@/composable/request.js';
import { mapGetters, mapState } from 'vuex'
export default {
  setup() {
    const { capacity, attending, counter, spacesLeft, increaceCapacity, counterInc } = useEvent();
    const { users, fetchUsers } = useRequest()
    const getUsers = async () => {
      users.value = await fetchUsers()
    }
    getUsers()
    
    return { capacity, attending, spacesLeft, increaceCapacity, counter, counterInc, users };
  },
  data () {
    return {
      orderID: ''
    }
  },
  computed: {
    ...mapGetters({
      user: "users/user"
    }),
    ...mapState({
      user: (state) => state.auth.user,
      loggedIn: (state) => state.auth.loggedIn
    }),
  },
  methods: {
    async addOrder () {
      const params = {
      order_id: this.orderID,
      user_id: this.user.id
    }
      workerService.postOrder(params)
    }
  }
};
</script>

<style scoped lang='scss'>
.home--wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.row_column {
  flex-direction: column;
}
</style>