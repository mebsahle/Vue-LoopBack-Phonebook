<template>
  <v-app>
    <Header></Header>
    <v-snackbar
        v-model="snackbar.showing"
        :color="snackbar.color"
        :timeout="-1">
        {{snackbar.message}}
        <v-btn text color="white" @click="snackbar.showing=false">
            <v-icon>mdi-close</v-icon>
        </v-btn>
    </v-snackbar>
  </v-app>
</template>

<script>
import Header from '@/components/layout/Header'
import { mapState } from 'vuex';
export default {
  name: 'App',
  components: {
    Header
  },
  computed: {
    ...mapState(['snackbar'])
  }
}
</script>

<style>
  #app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  }

  #nav {
    padding: 30px;
  }

  #nav a {
    font-weight: bold;
    color: #2c3e50;
  }

  #nav a.router-link-exact-active {
    color: #42b983;
  }
  .nav-bar {
    background-color: #2c3e50;
    color: #42b983;
  }
</style>