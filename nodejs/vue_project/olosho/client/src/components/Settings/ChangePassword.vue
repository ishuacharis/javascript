<template lang="pug">
    div(class="password")
        <Navbar />
        div(class="container mx-auto mt-3")
            div(class="w-full flex")
                div(class="w-1/4")
                    <Sidebar />
                div(class="w-1/2 ml-1")
                    div(class="w-full flex-col")
                        h1(class="bg-white text-lg text-black font-semibold px-2 py-4 mb-1") Password
                        form(class="bg-white px-8 pt-6 pb-8 mb-4" v-on:submit.prevent="updateBio")
                            div(v-if="isPasswordWrong" 
                                class="bg-pink-lightest text-white-darker px-4 py-3 mb-4 relative" 
                                role="alert")
                                span(class="block sm:inline text-xs") The current password you've entered is incorrect. Please enter a different password.
                                span(class="absolute pin-t pin-b pin-r px-4 py-3")
                                    svg(class="fill-current h-3 w-3 text-red" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20")
                                        title() Close
                                        path(d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z")
                            div(class="mb-4")
                                label(class="block text-grey-darker text-sm font-bold mb-2" for="password") Current password
                                input(v-model="oldPassword"
                                    v-validate="'required|min:1'"
                                    name="old_password"
                                    class="input-field" 
                                    id="old_password" type="password" placeholder="Password")
                                a(href="#" class="inline-block mt-2 no-underline text-xs text-pink-300 hover:underline font-bold") Forgot your password?

                            div(class="mb-4")
                                label(class="block text-grey-darker text-sm font-bold mb-2" for="password") Password
                                input(v-model="newPassword"
                                    v-validate="'required'"
                                    name="new_password"
                                    class="input-field" 
                                    id="new_password" type="password" placeholder="New password")
    
                            div(class="mb-4")
                                label(class="block text-grey-800 text-sm font-bold mb-2" for="password") Confirm password
                                span(v-if="!passwordMatch" class="inline-block text-xs text-red-300 font-semibold mt-2 mb-2") Password does not match
                                input(v-model="confirmPassword"
                                    v-validate="'required'"
                                    name="confirm_password"
                                    class="input-field"
                                    id="confirm_password" type="password" placeholder="Confirm password")

                            div(class="flex justify-center mb-6")
                                button(:disabled="errors.any() || !isNotEmpty" 
                                    :class="{'cursor-default opacity-50': errors.any() || !isNotEmpty}"
                                    class="text-pink-300 bg-pink-800 font-bold py-2 px-4 rounded border border-pink focus:outline-none") Save changes 

</template>

<script>
import { mapGetters } from 'vuex'
import { Validator } from 'vee-validate'
import Navbar from '../reuse/Navbar.vue'
import Sidebar from './Sidebar.vue'
import Content from './Content.vue'
import router from '../../router'
import UserService from '../../../services/UserService.js'
import {validatePassword, validateField}  
        from '../../../utils/clientUtils/utilsValidations.js'
export default {
    name: 'Password',
    components:{
        Navbar,
        Sidebar,
        Content
    },
  data (){
        return{
          newPassword: '',
          confirmPassword: '',
          oldPassword: '',
          isPasswordWrong: false,
          passwordMatch: true
            
        }
    },
    computed: {
        ...mapGetters(['USER']),
        isNotEmpty() {
            return validateField(this.oldPassword) 
                || validateField(this.newPassword)
                || validateField(this.confirmPassword)
        }
    },
    mounted() {
       
    },
    methods:{
           handleErr: function() {
               return this.newPassword && this.oldPassword && this.confirmPassword
           },
           comparePassword: function(password1,password2){
              
               if (validatePassword(password1) == validatePassword(password2)){
                   if(password1 === password2){
                        this.passwordMatch = true
                        //console.log('password atch')
                        return true
                   } else{
                        this.passwordMatch = false
                        //console.log('password is bad')
                        return false
                    }
               }else{
                        this.passwordMatch = false
                        console.log('password is invalid')
                        return false
               }
           },
           updateBio: function(){
               let data = {};
               if(validatePassword(this.oldPassword)) {
                   if (this.comparePassword(this.newPassword,this.confirmPassword)){
                       data.oldPassword = this.oldPassword;
                       data.newPassword = this.newPassword
                        const token = localStorage.getItem('session_token')
                        const id = this.USER._id
                        UserService.changePassword(data, id, token)
                        .then((response) =>{
                            if(response){
     
                                if (!response.data.success){
                                    this.isPasswordWrong = true
                                }else{
                                    this.isPasswordWrong = false
                                    this.$store.dispatch('UPDATE_USER',response.data.user)
                                }
                                
                                router.go(0)
                            }
                        })
                        .catch((err) =>{
                            console.log(err)
                        })
                    }else{
                        console.log('he no atch')
                    }
               }else{
                   console.log('hhe no true')
               }
               
           }
        },
}
</script>

<style>
   
</style>


