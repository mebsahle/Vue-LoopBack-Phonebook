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
                                    type="password">
                    </v-text-field>
                  </v-form>
              </v-card-text>
              <v-card-actions>
                  <v-btn @click="Login" dark color="normal">Login</v-btn>
                  <v-spacer></v-spacer>
                  <v-btn @click="reqReset" text light color="normal">Forgot Password</v-btn>
              </v-card-actions>
          </v-card>
      </v-flex>
  </v-layout>
</template>

<script>
export default {
    data() {
        return {
            email: '',
            password: '',
            token: localStorage.getItem('accToken'),
            user: '',
            emailRules: [
                e => !!e || 'Email is required',
                e => /.+@..+/.test(e) || 'Email must be valid'
            ],
        }
    },
    methods: {
        clearInput() {
            this.email = ''
            this.password = ''
        },
        async Login () {
            const credentials = {
                email: this.email,
                password: this.password
            }
            console.log(credentials) 
            this.clearInput()
            
            let usr = await this.$store.dispatch('login', credentials)
            // console.log('ussssssssssssssssssssssr', usr)
            if(usr.error) {
                console.log('usr error in login', usr.error)
                this.$store.dispatch('setSnackbar', {message: usr.error})
            } else {
                this.$store.dispatch('setSnackbar',{
                  message: 'You are successfully logged in',
                  color: 'success'
                })
                this.$bus.$emit('loggedIn')
                this.$router.push('/')
            }
        },
        reqReset() {
            this.$router.push('/password-reset-request')
        },
    }
}
</script>

<style>

</style>