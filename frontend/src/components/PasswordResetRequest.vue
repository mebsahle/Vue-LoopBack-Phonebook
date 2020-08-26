<template>
  <v-layout align-center justify-center>
    <v-flex xs12 sm8 md4>
      <v-card class="elevation-12">
        <v-toolbar dark color="normal">
            <v-toolbar-title>Password Reset</v-toolbar-title>
            <v-spacer></v-spacer>
        </v-toolbar>

        <v-form @submit.prevent="onReset" id="check-reset-action">
          <v-card-text>
            <v-text-field prepend-icon="mdi-mail" 
                          v-model="email"
                          name="email"
                          label="Email"
                          type="text"
                          required>
            </v-text-field>

          </v-card-text>
          <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn type="submit" form="check-reset-action" dark color="normal">Send</v-btn>
          </v-card-actions>
        </v-form>
      </v-card>
    </v-flex>
   </v-layout>
</template>

<script>
import axios from 'axios'
  export default {
    data() {
      return {
        user: {
          email: '',
        },
        sent: false,
        
      }
    },
    methods: {
      clearInput() {
        this.email = ''
      },
      onReset() { 
        var email = {email: this.email}
        console.log(email)
        axios.post('http://localhost:3000/api/users/reset', email)
          .then((response) => {
            console.log(response);

            alert('Your request has been sent.Check your email for further instructions.')
            this.$router.push('/login')
          })
          .catch((error) => {
            console.log(error);
          })
      },
    }
  }
</script>

<style>

</style>