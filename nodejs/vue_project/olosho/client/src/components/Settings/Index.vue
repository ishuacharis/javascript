<template lang="pug">
    div(class="settings")
        router-view



</template>

<script>
import Navbar from '../reuse/Navbar'
import Sidebar from './Sidebar.vue'
import Content from './Content.vue'
import router from '../../router'
import axios from 'axios'
export default {
    name: 'profile',
    components:{
        Navbar,
        Sidebar,
        Content
    },
  data (){
        return{
          
        }
    },
    methods:{
       
        },
}
</script>

<style>
   
</style>


