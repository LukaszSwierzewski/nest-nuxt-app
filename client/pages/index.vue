<template>
  <v-row class="row_column" justify="center" align="center">
    <h2>Strona głównaaaaa</h2>
    <h1>test</h1>
    {{ user }}
    <br>
    {{ person }}
    <v-btn @click="isReferenceOrCopy">Click</v-btn>
  </v-row>
</template>
<script>
import { deepClone } from 'lodash'
import { mapGetters } from 'vuex'
export default {
  data () {
    return {
      person: {
        name: "lukasz",
      }
    }
  },
  computed: {
    ...mapGetters({
      user: "users/user"
    }),
  },
  methods: {
    makeReferer () {
      this.person = this.user
    },
    isReferenceOrCopy() {
      this.$store.dispatch('users/me', {
        name: 'lukasz',
        isAuth: false,
        isAdmin: true
      })
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