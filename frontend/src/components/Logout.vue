<template>
  <v-layout>
      <v-flex xs12 sm8 md4>
          <h3>you are logged out</h3>
      </v-flex>
  </v-layout>
</template>

<script>
export default {
    methods: {
        created() {
            localStorage.removeItem('accToken');
        },
        mounted() {
            
        }
    }
}
</script>

<style>

</style>