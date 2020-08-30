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
                      <v-text-field name="newPassword" 
                                    prepend-icon="mdi-lock" 
                                    :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                                    v-model="newPassword" 
                                    label="New Password" 
                                    @click:append="() => (show1 = !show1)"
                                    :type="show1 ? 'text' :'password' "
                                    :rules="[rules.required, rules.min]"
                                    hint="At least 10 charcters use !@#$* and numbers.">
                      </v-text-field>
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
        rules: {
          required: value => !!value || 'required',
          min: ch => ch.length >=10 || 'Min 10 characters.'
        },
        show1: String
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
       axios.post('http://localhost:3000/api/users/change-password?access_token='+this.token, data)
         .then(response => {
            this.$store.dispatch('setSnackbar',{
              message: 'Your password have been changed successfully.',
              color: 'success'
            });
             
            console.log('Woo Hoooo',response)
            this.clearInput()
            this.$router.push('/')
         })
         .catch(error => {
           const err_message = error.response.data.error.message;
            // console.log(typeof(error.response.data.error.message))
            this.$store.dispatch('setSnackbar',{
              // message : 'Please, check your email or password.',
              message: err_message.toUpperCase(),
              color: 'error'
            });
            this.$router.push('/change-password');
         });
     }
  }
 
}
</script>

<style>

</style>