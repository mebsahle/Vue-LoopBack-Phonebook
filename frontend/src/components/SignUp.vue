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
                     <v-text-field id="email" 
                                   prepend-icon="mdi-mail"
                                   v-model="email"
                                   label="Email"
                                   type="email">
                     </v-text-field>
                     <v-text-field id="password"
                                    prepend-icon="mdi-lock"
                                    v-model="password"
                                    label="Password"
                                    type="password">
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
    data() {
        return {
            email: '',
            password: '',
            token: localStorage.getItem('accToken')
        }
    },
    methods: {
        register() {
            const user = {
                email: this.email,
                password: this.password
            }

            axios.post('http://localhost:3000/api/Users?access_token=' + this.token, user)
            .then((response) => {
                console.log(response);

                this.$router.push('/login')
            })
            .catch((error) => {
                console.log(error);
            })
        }
    }
}
</script>

<style>
    .layout {
        margin-top: 75px;
    }
</style>