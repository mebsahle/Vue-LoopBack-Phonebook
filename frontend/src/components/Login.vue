<template>
  <v-layout align-center justify-center>
      <v-flex xs12 sm8 md4>
          <v-card class="elevation-12">
              <v-toolbar dark color="normal">
                  <v-toolbar-title>Login</v-toolbar-title>
                  <v-spacer></v-spacer>
              </v-toolbar>
              <v-card-text>
                  <v-form>
                      <v-text-field prepend-icon="mdi-mail"
                                    v-model="email"
                                    label="Email"
                                    type="text"></v-text-field>
                      <v-text-field prepend-icon="mdi-lock"
                                    v-model="password"
                                    label="Password"
                                    type="password"></v-text-field>
                  </v-form>
              </v-card-text>
              <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn @click="login" dark color="normal">Login</v-btn>
              </v-card-actions>
          </v-card>
      </v-flex>
  </v-layout>
</template>

<script>
// import axios from 'axios'
export default {
    data() {
        return {
            email: '',
            password: '',
            token: localStorage.getItem('accToken')
        }
    },
    methods: {
        clearInput() {
            this.email = ''
            this.password = ''
        },
        login () {
            const credentials = {
                email: this.email,
                password: this.password
            }
            console.log(credentials)
            this.clearInput()
        }
    }
}
</script>

<style>

</style>