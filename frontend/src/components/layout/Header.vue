<template>
  <header>
      <v-toolbar color="#2c3e50">
          <v-toolbar-title>
              <v-btn target="_blank" color="white" text :to="{name: 'Home'}">
                  <v-icon>mdi-contacts-outline</v-icon> 
                  {{title}}
              </v-btn>
          </v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items class="hidden-lw-and-down">
              <v-btn dark text v-for="(nav, index) in noAuthNav" :key="index" :to="{name:nav.route}">
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
                // {name: 'login', route: 'Login'},
                {name: 'sign up', route: 'SignUp'},
            ],
            authNav: [
                {name: 'logout', route: 'Logout'}
            ],
        }
    },
    name: 'App',
    methods: {

    },
    mounted() {
        
    }
}
</script>

<style>

</style>