<template>
  <v-layout align-center justify-center>
      <v-flex xs12 sm8 md4>
          <v-card class="elevation-12">
              <v-toolbar dark color="normal">
                  <v-toolbar-title>Change Password</v-toolbar-title>
                  <v-spacer></v-spacer>
              </v-toolbar>
              <v-card-text>
                  <v-form>
                      <v-text-field name="oldPassword" prepend-icon="mdi-lock" v-model="oldPassword" label="Old Password" type="password"></v-text-field>
                      <v-text-field name="newPassword" prepend-icon="mdi-lock" v-model="newPassword" label="New Password" type="password"></v-text-field>
                  </v-form>
              </v-card-text>
              <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn @click="changePassword" dark color="normal">Change</v-btn>
              </v-card-actions>
          </v-card>
      </v-flex>
  </v-layout>
</template>

<script>
import axios from 'axios'
export default {
  data() {
      return {
        oldPassword: '',
        newPassword: '',
        token: localStorage.getItem('accToken'),
    }
  },
  methods: {
    clearInput() {
       this.oldPassword = ''
       this.newPassword = ''
     },
     changePassword() {
       const data = {
           oldPassword: this.oldPassword,
           newPassword: this.newPassword
       } 
     //   console.log(data)
     //   this.clearInput()
       axios.post('http://localhost:3000/api/Users/change-password?access_token='+this.token, data)
         .then(response => {
             console.log('Woo Hoooo',response)
             this.clearInput()
             this.$router.push('/contactsorDesserts')
         });
     }
  }
 
}
</script>

<style>

</style>