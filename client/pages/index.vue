<template>
  <v-row class="row_column" justify="center" align="center">
    <h2>Strona głównaaaaa</h2>
    <h1>test</h1>
    <v-btn @click='counterInc'>composition test
    </v-btn>
    {{ counter }}
  </v-row>
</template>
<script>
import useEvent from "@/composable/events.js";
import useRequest from '@/composable/request.js';
import { mapGetters } from 'vuex'
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
    }
  },
  computed: {
    ...mapGetters({
      user: "users/user"
    }),
  },
  methods: {
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