<template>
  <v-layout align-center justify-center>
      <v-flex xs12 sm8 md4>
          <v-card class="elevation-12">
              <v-toolbar dark color="normal">
                  <v-toolbar-title>Password Reset</v-toolbar-title>
                  <v-spacer></v-spacer>
              </v-toolbar>
              <v-card-text>
                  <v-form>
                      <v-text-field name="newPassword" prepend-icon="mdi-lock" v-model="newPassword" label="New Password" type="password"></v-text-field>
                      <v-text-field name="confirmPassword" 
                                    prepend-icon="mdi-lock"
                                    v-model="confirmPassword"
                                    label="Confirm Password"
                                    type="password"
                                    :rules="[(newPassword === confirmPassword) || 'Password must match', rules.min, rules.required]"
                                    hint="At least 10 charcters use !@#$* and numbers.">
                      </v-text-field>
                  </v-form>
              </v-card-text>
              <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn @click="resetPassword" dark color="normal">Change</v-btn>
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
      newPassword: '',
      confirmPassword: '',
      rules: {
        required: value => !!value || 'required',
        min: ch => ch.length >=10 || 'Min 10 characters.'
      }
    }
  },
  methods: {
    clearInput() {
      this.newPassword = ''
      this.confirmPassword = ''
     },
    resetPassword() {
      const newPassword = {newPassword:this.newPassword}
      const link = window.location.href
      const token = link.split('=')[1]
      // console.log('the current url',token)
           
      axios.post('http://localhost:3000/api/users/reset-password?access_token='+token, 
       newPassword)
        .then(response => {
          this.$store.dispatch('setSnackbar',{
            message : 'Password reset successfull.',
            color: 'success'
          });
          //  console.log('Woo Hoooo',response)
           this.clearInput()
           this.$router.push('/login')
        })
        .catch((error) => {
          this.$store.dispatch('setSnackbar',{
            message : "Your passwords didn't match.",
            color: 'error'
          });
          console.log(error)
        })
     }
  }
 
}
</script>

<style>

</style>