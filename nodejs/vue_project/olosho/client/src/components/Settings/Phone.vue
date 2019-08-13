<template lang="pug">
    div(class="phone")
        <Navbar />
        div(class="container mx-auto mt-3")
            div(class="w-full flex")
                div(class="w-1/4")
                    <Sidebar />
                div(class="w-1/2 ml-1")
                    div(class="w-full flex-col")
                        h1(class="bg-white text-lg text-black font-semibold px-2 py-4 mb-1") Phone 
                        form(class="bg-white px-8 pt-6 pb-8 mb-4" v-on:submit.prevent="updateBio")
                            div(class="mb-4")
                                label(class="block text-grey-900 text-sm font-bold mb-2" for="phone") Phone
                                input(v-model="phone"
                                    v-validate="'required'"
                                    name="phone"
                                    class="input-field" 
                                    id="new_password" type="text" placeholder="Phone")
                                span(v-for="error in errors.collect('phone')" class="error") {{ error }}
                            div(class="flex justify-center mb-6")
                                button(:disabled="errors.any() || !isValid" 
                                    :class="{'cursor-default opacity-50': errors.any() || !isValid}"
                                    class="text-pink-300 bg-pink-700 font-bold py-2 px-4 rounded border border-pink focus:outline-none") Save changes 

</template>

<script>
import { mapGetters } from 'vuex'
import { Validator } from 'vee-validate'
import Navbar from '../reuse/Navbar.vue'
import Sidebar from './Sidebar.vue'
import Content from './Content.vue'
import router from '../../router'
import UserService from '../../../services/UserService.js'
import {validatePhone, validateField}  
        from '../../../utils/clientUtils/utilsValidations.js'
export default {
    name: 'Phone',
    components:{
        Navbar,
        Sidebar,
        Content
    },
  data (){
        return{
          phone: undefined
            
        }
    },
    computed: {
        ...mapGetters(['USER']),
        isValid() {
            if (this.phone === this.USER.phone) {
                return false
            }
            return true
        }
    },
    mounted() {
       const phone =  this.USER.phone !== undefined ? this.USER.phone : this.phone
       this.phone = phone
    },
    methods:{
           updateBio: function(){
               const data = {}

               const token = localStorage.getItem('session_token');
               const id = this.USER._id
               data.phone = this.phone
               UserService.changePhone(data, id, token)
               .then((response) =>{
                   if (response){
                       this.$store.dispatch('UPDATE_USER',response.data.user)
                        router.go(0)
                   }
               })
               .catch((err) =>{
                   console.log('these error is fro the server ${err.message}')
               })
               return true

           }
        },
}
</script>

<style>
   
</style>


