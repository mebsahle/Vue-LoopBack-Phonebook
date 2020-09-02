<template>
  <header>
    <v-toolbar color="#2c3e50">
        <v-toolbar-title>
          <v-btn target="_blank" color="white" text>
            <v-icon>mdi-contacts-outline</v-icon> 
                {{title}}
          </v-btn>
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items>
          <v-menu offset-y>
            <template v-slot:activator="{ on }">
              <v-btn dark text v-on="on">
                <div v-if="currentUser && token">
                    {{currentUser}}
                  </div>
                  <div v-else>
                    <v-btn dark text><v-icon>{{'mdi-dots-vertical'}}</v-icon></v-btn>
                  </div>
                </v-btn>
            </template>
            <v-list-item class="item" v-for="(nav, name, index) in navs" :key="index" :to="{name:nav.route}">
              <v-list-item-title dark> {{nav.name}}</v-list-item-title>
            </v-list-item>
          </v-menu>
        </v-toolbar-items>
    </v-toolbar>
    <router-view />
  </header>
</template>

<script>
import { mapState } from 'vuex';
export default {
  data() {
    return {
      title: "Phonebook",
      navs: [],
      noAuthNav: [
          {name: 'Login', route: 'Login'},
          {name: 'SignUp', route: 'SignUp'},
      ],
      authNav: [
          { name: 'Change Password', icon: 'mdi-key',route: 'ChangePassword'},
          { name: 'Logout', icon: 'mdi-logout', route: 'Logout'}
      ],
      token: localStorage.getItem('accToken')
    }
  },
  name: 'App',
  computed: {
    ...mapState(['currentUser'])
  },
  methods: {
    onLoggedIn() {
        this.navs=this.authNav;

    data() {
        return {
            title: "Phonebook",
            navs: [],
            noAuthNav: [
                {name: 'login', route: 'Login'},
                {name: 'sign up', route: 'SignUp'},
            ],
            authNav: [
                {name: 'logout', route: 'Logout'}
            ],
        }
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
        this.$store.dispatch('loadCurrentUser');
        this.onLoggedIn();
    } else {
        console.log('loooooooged outtta here')
    }
  }
}
</script>

<style scoped>
    .item {
        background: whitesmoke;
    }
    .item:hover {
        background: #2c3e50c7;
    }
</style>