<template>
  <NavBar></NavBar>

  <main>
    <SideNav/>
    <router-view />
  </main>
  <Footer></Footer>
</template>

<script>
import M from "materialize-css";
import NavBar from "@/components/NavBar.vue";
import Footer from "@/components/Footer.vue";
import SideNav from '@/components/SideNav'

export default {
  name: "App",
  components: {
    NavBar,
    Footer,
    SideNav
  },
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
  mounted() {
    M.AutoInit();
  },
};
</script>

<style>


/** This is required to keep footer down */
#app {
  display: flex;
  min-height: 100vh;
  flex-direction: column;
}

main {
  flex: 1 0 auto;
}
/** This is required to keep footer down */
</style>
