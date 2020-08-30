<template>
  <v-layout>
      <v-flex xs12 sm8 md4>
          <h3>you are logged out</h3>
      </v-flex>
  </v-layout>
</template>

<script>
export default {
    data() {
        return {
            login: null,
            password: null
        }
    },
    computed:{
      isLoggedIn: function(){
        return this.$store.getters.isLoggedIn
      }
    },
    mounted() {
      this.$store.dispatch('logout')
      .then(() => {
        this.$store.dispatch('setSnackbar',{
            message: 'Logged out successfully.',
            color: 'green'
        });
        
      })
      this.$bus.$emit('logOut')
      this.$router.push('/login');
    }
}
</script>

<style>

</style>