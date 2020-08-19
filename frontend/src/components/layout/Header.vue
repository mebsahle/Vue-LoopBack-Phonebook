<template>
  <header>
      <v-toolbar color="#2c3e50">
          <v-toolbar-title>
              <v-btn v-if="this.token" target="_blank" color="white" text :to="{name: 'Home'}">
                  <v-icon>mdi-contacts-outline</v-icon> 
                  {{title}}
              </v-btn>
          </v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items class="hidden-lw-and-down">
              <v-btn dark text v-for="(nav, index) in navs" :key="index" :to="{name:nav.route}">
                  {{nav.name}}
              </v-btn>
          </v-toolbar-items>
      </v-toolbar>
      <router-view />
  </header>
</template>

<script>
export default {
  data() {
    return {
      title: "Phonebook",
      navs: [],
      noAuthNav: [
          {name: 'login', route: 'Login'},
          {name: 'sign up', route: 'SignUp'},
      ],
      authNav: [
          {name: 'key-change',route: 'ChangePassword'},
          {name: 'logout', route: 'Logout'}
      ],
      token: localStorage.getItem('accToken')
    }
  },
  name: 'App',
  methods: {
    onLoggedIn() {
        this.navs=this.authNav;
    },
    onLogout() {
        this.navs=this.noAuthNav;
    }
  },
  created() {
     this.navs=this.noAuthNav;
     this.$bus.$on('loggedIn', ()=> {
         this.onLoggedIn();
     });

     this.$bus.$on('logOut', ()=> {
         this.onLogout();
     });
  },
  mounted() {
    console.log('logged', this.token)
    if(this.token) {
        this.onLoggedIn();
    }
  }
}
</script>

<style>

</style>