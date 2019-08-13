<template lang="pug">
    div(class="login")
        <Navbar />
        div(class="container max-w-md mx-auto shadow-md rounded border border-pink-300 mt-2")
            div(class="bg-white flex flex-col mx-auto px-8 py-2")
                h1(class="font-semibold text-xl") Log in to Escort me
                form(class="pb-8" v-on:submit="loginForm")
                    div(class="mb-4 py-2")
                        label(class="block text-grey-700 text-sm font-bold mb-2" for="username") Username
                        input(
                            v-model ='username',
                            v-validate="'required|min:4'"
                            name="username"
                            class='input-field',
                            id='username', type='text', 
                            placeholder='Username', autocomplete = 'off'
                        )
                        span(v-for="error in errors.collect('username')" class="error") {{ error }}
                        span(v-if="username_err" class="text-xs text-red-light font-semibold pt-2") {{ username_err }}
                    div(class="mb-4")
                        label(class="block text-grey-700 text-sm font-bold mb-2" for="password") Password
                        input(
                            v-model="password"
                            v-validate="'required|min:4'"
                            name="password"
                            class="input-field"
                            id="password" type="password" placeholder="Password"
                        )
                        span(v-for="error in errors.collect('password')" class="error") {{ error }}
                        span(v-if="password_err" class="text-xs text-red-light font-semibold pt-2") {{ password_err }}
                    div(class="text-red-darkest" v-html="error")
                    div(class="flex justify-center mb-6")
                        button(:disabled="errors.any() || !isValid" 
                        :class="{'cursor-default opacity-50': errors.any() || !isValid}"
                        class="flat-button"
                        ) Login
            div(class="bg-pink-200 flex px-8 py-4 text-sm")
                span(class="font-bold text-gray-700 mr-1") Don't have an account?        
                router-link(to="/signup" class="no-underline text-pink-500 hover:underline") Sign up  




</template>

<script>
import { Validator } from 'vee-validate'
import Navbar from './reuse/Navbar.vue'
import router from '../router'
import AuthenticationService  from '../../services/AuthenticationService.js'
import {validateUsername, validatePassword}  
        from '../../utils/clientUtils/utilsValidations.js'
export default {
    name: 'login',
    components:{
        Navbar
    },
  data (){
        return{
            username: '',
            username_err: null,
            password: '',
            password_err: null,
            loading: false,
            error: null
        }
    },
    methods:{
        loginForm(e) {
            e.preventDefault()
             this.loading = true
        let postData = {}
        this.error = []

        if (!validateUsername(this.username)) {
                this.username_err= 'Invalid Length'
        } else {
                this.username_err= null
                postData.username = this.username
            }
        if (!validatePassword(this.password) ) {
                this.password_err = 'password too short'
        } else  {
                this.password_err = null
                postData.password = this.password
        }

        if (!this.username_err && !this.password_err) {
                AuthenticationService.login(postData)
                .then( (response) => {
                    if (response) {
                        if (false === response.data.success) {
                            this.error = response.data.error
                            console.log(this.error)
                        } else {
                            this.$store.dispatch('SET_USER',response.data.user)
                            this.$store.dispatch('SET_SESSION_TOKEN', response.data.token)
                           
                            router.replace({name: 'Home'})
                        }
                    } 
                })
                .catch(function (err) {
                    console.log(err)
                })
                
                return true
        }
        }
        
    },
    computed: {
        isValid() {
            if (this.username.trim().length > 1 && this.password.trim().length > 1) {
                return true
            }
            return false
        }
    }

}
</script>

<style>
  
</style>


