<template>

  <Menu>
    <router-link to="/">Home</router-link> 
    <router-link to="/about">About</router-link>
    <router-link to="/mascota">Mascotas</router-link>
    <router-link to="/hotel">Hoteles</router-link>
    <router-link to="/empleado">Empleados</router-link>
    <router-link to="/habitacion">Habitacion</router-link>
  </Menu>
  <router-view/>
</template>

<script>

import Menu from './components/Menu.vue'

export default {
  name:'App',
  data(){
    return {

    }
  },
  components:{
    Menu
  }
}
</script>

<style lang="scss">

</style>
