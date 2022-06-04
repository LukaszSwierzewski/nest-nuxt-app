<template>
  <v-app dark>
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant="miniVariant"
      :clipped="clipped"
      fixed
      app
    >
      <v-list>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          exact
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar
      :clipped-left="clipped"
      fixed
      app
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title v-text="title" />
      <v-spacer />
      <v-btn
        class="acount__btn"
        @click.stop="rightDrawer = !rightDrawer"
      > 
        <p v-if='user.user.username'>Hi, {{ user.user.username }}</p>
        <v-icon>mdi-account</v-icon>
      </v-btn>
    </v-app-bar>
    <v-main>
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>
    <v-navigation-drawer
      v-model="rightDrawer"
      :right="right"
      temporary
      fixed
    >
      <v-list>
        <v-list-item
          v-if='user.loggedIn'
          exact
          @click="logout"
        >
          <v-list-item-action>
            <v-icon>mdi-logout</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="'logout'" />
          </v-list-item-content>
        </v-list-item>
          <v-list-item
            v-else
            :to="'/login'"
            router
            exact
          >
            <v-list-item-action>
              <v-icon>mdi-account</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title v-text="'Login/Register'" />
            </v-list-item-content>
          </v-list-item>
        <span v-if='user.loggedIn'>
          <v-list-item
            v-for="(item, i) in protectedRoute"
            :key="i"
            :to="item.to"
            router
            exact
          >
            <v-list-item-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title v-text="item.title" />
            </v-list-item-content>
          </v-list-item>
        </span>
        <span v-if='user && user.isAdmin'>
          <v-list-item
            v-for="(item, i) in adminProtectedRoute"
            :key="i"
            :to="item.to"
            router
            exact
          >
            <v-list-item-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title v-text="item.title" />
            </v-list-item-content>
          </v-list-item>
        </span>
      </v-list>
    </v-navigation-drawer>
    <v-footer
      :absolute="!fixed"
      app
    >
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState({
      user: (state) => state.auth
    }),
  },
  data() {
    return {
      clipped: false,
      drawer: false,
      loggedOut: false,
      fixed: false,
      accountItems: [
        {
          icon: "mdi-chart-bubble",
          title: "Login/register",
          to: "/login",
        },
      ],
      items: [
        {
          icon: "mdi-apps",
          title: "Home",
          to: "/",
        },
        {
          icon: "mdi-apps",
          title: "blog",
          to: "/blog/news?page=1",
        },
              {
          icon: "mdi-apps",
          title: "socket-io",
          to: "/socket",
        },
      ],
      protectedRoute: [
        {
          icon: "mdi-apps",
          title: "guard route",
          to: "/account",
        },
        {
          icon: "mdi-apps",
          title: "my goals",
          to: "/account/my_projects"
        }
      ],
      adminProtectedRoute: [
        {
          icon: "mdi-apps",
          title: "Add news",
          to: "/account/add_news",
        },
        {
          icon: "mdi-apps",
          title: "manage news",
          to: '/account/manage_news?page=1&perPage=3'
        }
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: "My app"
    };
  },
  methods: {
    async logout() {
      await this.$auth.logout()
      this.$router.push({ path: "/" });
    },
  },
};
</script>
<style lang='scss'>
.acount__btn {
  display: flex;
  align-items: center;
  justify-content: space-between;
  p {
    margin: 0px;
  }
}
</style>