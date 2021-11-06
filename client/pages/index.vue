<template>
  <v-row justify="center" align="center">
    <div v-if='user && user.length === 0'>
      <form>
        <v-text-field
          v-model="username"
          label="Username"
          required
        ></v-text-field>
        <v-text-field
          v-model="email"
          label="E-mail"
          required
        ></v-text-field>
        <v-text-field
          v-model="password"
          label="Password"
          required
        ></v-text-field>
        <v-btn
          class="mr-4"
          @click="register"
        >
          submit
        </v-btn>
      </form>
              <form>
        <v-text-field
          v-model="username"
          label="Username"
          required
        ></v-text-field>
        <v-text-field
          v-model="password"
          label="Password"
          required
        ></v-text-field>
        <v-btn
          class="mr-4"
          @click="login"
        >
          submit
        </v-btn>
      </form>
    </div>
    <div v-if='user && user.isAuth'>
      <v-btn @click='logout'>Logout</v-btn>
    </div>
    {{ user }}
  </v-row>
</template>
<script>
import authService from "../api/auth";
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      username: "",
      password: "",
      email: "",
    };
  },
  computed: {
    ...mapGetters({
      user: "users/user",
    }),
  },
  methods: {
    async register() {
      try {
        const user = {
          username: this.username,
          password: this.password,
          email: this.email,
        };
        await authService.register(user);
        const userLogin = await authService.login(user);
        await authService.setupSession(userLogin);
        this.$store.dispatch("users/me", userLogin.data);
      } catch (err) {
        console.log(err);
      }
    },
    async login() {
      try {
        const user = {
          username: this.username,
          password: this.password,
        };
        const userLogin = await authService.login(user);
        const userData = await authService.sessionAfterLogin(userLogin);
        this.$store.dispatch("users/me", userLogin.data);
      } catch (err) {
        console.log(err);
      }
    },
    async logout() {
      await authService.logout();
      this.$store.dispatch("users/logout", []);
    },
  },
};
</script>