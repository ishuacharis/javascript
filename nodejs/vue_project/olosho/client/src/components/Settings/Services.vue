<template lang="pug">
    div(class="services")
        <Navbar />
        div(class="container w-full mx-auto mt-3")
            div(class="w-full flex")
                div(class="w-1/4")
                    <Sidebar />
                div(class="w-1/2 ml-1")
                    div(class="w-full flex-col")
                        h1(class="bg-white text-lg text-black font-semibold px-2 py-4 mb-1") Services
                        form(class="bg-white px-8 pt-6 pb-8 mb-4" v-on:submit.prevent="updateBio")
                            div(v-for="service in services_array" class="div")
                                label(class="" :for="service") {{ service | capitalize }}
                                input(v-model="services" class="" 
                                v-validate="'required'"
                                name="services"
                                :value="service" type="checkbox" 
                                :checked="inArray(service)")
                            span(v-for="error in errors.collect('services')" class="error") {{ error }}
                             
                            div(class="flex justify-center mb-6")
                                button(:disabled="errors.any() || !isValid" 
                                :class="{'cursor-default opacity-50': errors.any() || !isValid}"
                                class="text-pink-100 bg-pink-200 font-bold py-2 px-4 rounded border border-pink  focus:outline-none") Save changes 


</template>

<script>
import { mapGetters } from 'vuex'
import { Validator } from 'vee-validate'
import Navbar from '../reuse/Navbar.vue'
import Sidebar from './Sidebar.vue'
import router from '../../router'
import UserService from '../../../services/UserService.js'
export default {
    name: 'services',
    components:{
        Navbar,
        Sidebar
    },
  data (){
        return{
          selectedServices: [],
          services: [],
          services_array: [
            '69','Anal giving',
            'CIM (Cum in me)',
            'COB (Cum on body)',
            'Couples',
            'Cunnilingus',
            'Deepthroat',
            'Fingering',
            'Handjob'
            ]
        }
    },
    computed: {
        ... mapGetters(['USER']),
        isValid() {
            if (this.services.toString() === this.USER.services.toString()) {
                return false
            }
            return true
        }
    },
    methods:{
            updateBio: function(){
                    let data = {}
                    data.services = this.services
                    const token = localStorage.getItem('session_token')
                    const id = this.USER._id
                    UserService.services(data, id, token)
                    .then((response) =>{
                        if (response) {
                            this.$store.dispatch('UPDATE_USER',response.data.user)
                        }
                    })
                    .catch((err) => {
                        console.log(err)
                    })
                router.go(0)
            },
            inArray: function(needle){
                return this.services.includes(needle)
            }
        },
    mounted() {
            const selectedServices = this.USER.services !== undefined ? this.USER.services: ['69']
            this.services = selectedServices
    },
    filters: {
        capitalize: function(value){
            return value.charAt(0).toUpperCase() + value.slice(1)
        }
    }
}
</script>

<style>
/*    .label {
        @apply text-grey-700 text-sm font-bold mb-2;
    }
    .div{
        @apply flex justify-between shadow mb-4 border px-2 py-3;
    } */
</style>


