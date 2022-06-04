<template>
  <v-row justify="center" align="center" class="flex-column">
    <div class="user--forms" v-if='!user'>
      <form v-if="currentFormRegister" id='register' class='register'>
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
          type="password"
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
      <form v-else id='login' class='login'>
        <h2>Login</h2>
        <v-text-field
          v-model="username"
          label="Username"
          required
        ></v-text-field>
        <v-text-field
          v-model="password"
          type="password"
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
    <div class="login_form--select">
      <p v-if="currentFormRegister">I already have an account. <strong class="change--form" @click='changeToLogin'>Login form.</strong></p>
      <p v-else>I want to create new account. <strong class="change--form" @click="changeToRegister"> Register form.</strong></p>
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
import { mapState } from "vuex";
export default {
  data() {
    return {
      username: "",
      password: "",
      email: "",
      errors: [],
      currentFormRegister: false
    };
  },
  computed: {
    ...mapState({
      user: (state) => state.auth.loggedIn
    }),
  },
  methods: {
    changeToLogin () {
      this.currentFormRegister = false
    },
    changeToRegister () {
      this.currentFormRegister = true
    },
    async register () {
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
        await this.$auth.loginWith('cookie', { data: user }).then(async () => {
          console.log(this.$auth.fetchUser())
          const data = await this.$auth.fetchUser()
          console.log(data)
        })
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
.errors_login {
  margin-top: 20px;
}
.register, .login {
  max-width: 550px;
  padding: 1rem;
  width: 100%;
}
.change--form {
  cursor: pointer;
  transition: border-color 0.2s linear;
  border: 1px solid transparent;
  &:hover {
    border-bottom-color: #000;
  }
}
.login_form--select {
  padding: 1rem;
  max-width: 550px;
  width: 100%;
}
</style>