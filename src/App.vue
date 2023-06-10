<script setup>
import Header from './components/Header.vue'
import Home from './views/Home.vue'
import { RouterView } from 'vue-router'

</script>

<template>
  <div>
     <Header v-if="!$route.meta.hideNavigation" ></Header>
     <RouterView></RouterView>
 
  </div>
</template>
<style scoped>
   body{
    padding: 0!important;
    margin:0!important 
   }
</style>


