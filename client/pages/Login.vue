<template>
  <v-row justify="center" align="center">
    <div class="user--forms" v-if='user && user.length === 0'>
      <form id='register' class='register'>
        <h2>Register</h2>
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
      <form id='login' class='login'>
        <h2>Login</h2>
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
    <div class="errors_login" v-if='errors.length > 0'>
      <v-alert
        v-for='(error, index) in errors'
        :key='index'
        dense
        outlined
        type="error"
      >
        {{ error }}
      </v-alert>
    </div>
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
      errors: [],
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
        this.errors = [];
        const registerService = await authService.register(user);
        if (registerService.data.length === 0) {
          const userLogin = await authService.login(user);
          await authService.setupSession(userLogin);
          this.$store.dispatch("users/me", userLogin.data);
        } else {
          this.errors = registerService.data;
        }
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
        this.errors = [];
        const userLogin = await authService.login(user);
        await authService.sessionAfterLogin(userLogin);
        this.$store.dispatch("users/me", userLogin.data);
        this.$router.push({ path: "/" });
      } catch (err) {
        this.errors.push("Invalid login or password");
      }
    },
  },
};
</script>
<style lang='scss'>
.user--forms {
  display: flex;
  width: 100%;
  margin-top: 100px;
  justify-content: center;
}
.register {
  margin-right: 20px;
}
.errors_login {
  margin-top: 20px;
}
</style>