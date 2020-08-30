<template>
  <v-layout class="layout" align-center justify-center>
      <v-flex xs12 sm8 md4>
          <v-card class="elevation-12">
             <v-toolbar dark color="normal">
                 <v-toolbar-title>SignUp</v-toolbar-title>
                 <v-spacer></v-spacer>
             </v-toolbar> 
             <v-card-text>
               <v-form>
                  <v-text-field prepend-icon="mdi-account"
                                v-model="username"
                                label="Username"
                                type="text"></v-text-field>

                  <v-text-field id="email" 
                                prepend-icon="mdi-mail"
                                v-model="email"
                                label="Email"
                                type="email"
                                required
                                :rules="emailRules">
                  </v-text-field>
                  <v-text-field prepend-icon="mdi-lock"
                                v-model="password"
                                label="Password"
                                type="password"
                                required>
                  </v-text-field>
                  <v-text-field prepend-icon="mdi-lock"
                                v-model="confirm_password"
                                label="Confirm Password"
                                type="password"
                                required
                                :rules="[(password === confirm_password) || 'Password must match']">
                  </v-text-field>
               </v-form>
             </v-card-text>
             <v-card-actions>
                 <v-spacer></v-spacer>
                 <v-btn dark color="normal" @click="register">SignUp</v-btn>
             </v-card-actions>
          </v-card>
      </v-flex>
  </v-layout>
</template>

<script>
import axios from 'axios'
export default {
    data: () => ({
      username:'',
      email: '',
      password: '',
      token: localStorage.getItem('accToken'),
      emailRules: [
          e => !!e || 'Email is required',
          e => /.+@..+/.test(e) || 'Email must be valid'
      ],
    }),
    methods: {
        register() {
            const user = {
                username: this.username,
                email: this.email,
                password: this.password
            }

            axios.post('http://localhost:3000/api/users?access_token=' + this.token, user)
            .then((response) => {
                console.log(response);
                this.$store.dispatch('setSnackbar',{
                  message : 'You are registered, check your email and verify.',
                  color: 'success'
                });
                // redirect to login
                this.$router.push('/login')
            })
            .catch((error) => {
                console.log(error);
                const err_message = error.response.data.error.message;
                if(error == 'Error: Network Error'){
                  this.$store.dispatch('setSnackbar',{
                    message : error,
                    color: 'error'
                  });} else if (err_message){
                    this.$store.dispatch('setSnackbar',{
                    message : err_message,
                    color: 'error'
                  });
                } else {
                  this.$store.dispatch('setSnackbar',{
                    message : 'Check your email and verify.',
                    color: 'info'
                  });
                }
            });
        }
    }
}
</script>

<style>
    .layout {
        margin-top: 75px;
    }
</style>