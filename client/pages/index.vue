<template>
  <v-row justify="center" align="center">
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
  </v-row>
</template>
<script>
import usersService from "../api/users";
import authService from "../api/auth";
export default {
  data() {
    return {
      username: "",
      password: "",
      email: "",
    };
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
        this.user = userLogin.data;
      } catch (err) {
        console.log(err);
      }
    },
  },
};
</script>