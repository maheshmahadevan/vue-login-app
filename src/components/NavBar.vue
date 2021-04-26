<template>
  <header id="header">
    <div>
      <!-- Dropdown Structure -->
      <ul id="dropdown1" class="dropdown-content">
        <li v-if="!$auth.loading.value && !$auth.isAuthenticated.value">
          <a @click="login">Login</a>
        </li>
        <li v-if="!$auth.loading.value && $auth.isAuthenticated.value">
          <a @click="logout">Logout</a>
        </li>
        <li class="divider"></li>
        <li><router-link v-if="$auth.isAuthenticated.value" to="/profile">
            Profile
            </router-link>
        </li>
      </ul>
      <nav>
        <div class="nav-wrapper teal lighten-2">
          <a href="#" class="brand-logo center">App</a>
          <ul id="nav-mobile" class="right hide-on-med-and-down">
            <li>
              <router-link v-if="$auth.isAuthenticated.value" to="/"
                ><i class="material-icons">home</i></router-link
              >
            </li>
            <li>
              <router-link v-if="$auth.isAuthenticated.value" to="/about"
                ><i class="material-icons">view_module</i></router-link
              >
            </li>
            <!-- Dropdown Trigger -->
            <li>
              <a class="dropdown-trigger" href="#!" data-target="dropdown1"
                >Settings<i class="material-icons right">arrow_drop_down</i></a
              >
            </li>
          </ul>
        </div>
      </nav>
    </div>
  </header>
</template>

<script>
export default {
  name: "NavBar",
  methods: {
    login() {
      this.$auth.loginWithRedirect();
    },
    // Log the user out
    logout() {
      this.$auth.logout({
        returnTo: window.location.origin,
      });
    },
  },
};
</script>

<style scoped>
header{
    z-index: 0;
}
</style>