<template lang="pug">
    div(class="register")
        <Navbar />
          div(class="container max-w-md mx-auto shadow-md rounded border border-pink-300 mt-2")
            div(class="bg-white flex flex-col mx-auto py-2")
                div(class="flex px-8 items-center mb-4")
                    a(v-for="(tab, index) in tabs" 
                    class="flex-1 p-2 mr-2 text-grey-200 font-semibold text-lg" 
                    :class="{'bg-pink-300 text-white': currentTab === index }" 
                    @click="currentTab = index " ) {{ tab }}
                        
                form(v-show="currentTab === 0" class="px-8 pt-6 pb-8 mb-4" v-on:submit.prevent="validateForm('escort')")
                    div(class="mb-4")
                        label(class="block text-grey-700 text-sm font-bold mb-2" for="username") Username
                        input(v-model="escort_username" class="input-field"  type="text" placeholder="Username")
                        span(v-if="escort_username_err" class="error") {{ escort_username_err }}
                    div(class="mb-4")
                        label(class="block text-grey-700 text-sm font-bold mb-2" for="email") Email
                        input(v-model="escort_email" class="input-field" type="text" placeholder="Email")
                        span(v-if="escort_email_err" class="error") {{ escort_email_err }}
                        
                    div(class="mb-4")
                        label(class="block text-grey-7000 text-sm font-bold mb-2" for="password") Password
                        input(v-model="escort_password" class="input-field"  type="password" placeholder="Password")
                        span(v-if="escort_password_err" class="error") {{ escort_password_err }}

                    div(class="flex justify-center mb-6")
                        button(class="flat-button") Next                                
                
                form(v-show="currentTab === 1" class="bg-white px-8 pt-6 pb-8 mb-4" v-on:submit.prevent="validateForm('punter')")
                    div(class="mb-4")
                        label(class="block text-grey-700 text-sm font-bold mb-2" for="username") Username
                        input(v-model="punter_username" class="input-field"  type="text" placeholder="Username")
                        span(v-if="punter_username_err" class="error") {{ punter_username_err }}
                    div(class="mb-4")
                        label(class="block text-grey-700 text-sm font-bold mb-2" for="email") Email
                        input(v-model="punter_email" class="input-field" type="text" placeholder="Email")
                        span(v-if="punter_email_err" class="error") {{ punter_email_err }}
                    div(class="mb-4")
                        label(class="block text-grey-700 text-sm font-bold mb-2" for="password") Password
                        input(v-model="punter_password" class="input-field"  type="password" placeholder="Password")
                        span(v-if="punter_password_err" class="error") {{ punter_password_err }}
                    div(class="flex justify-center mb-6")
                        button(class="flat-button") Next 

            div(class="bg-pink-200 flex px-8 py-4 text-sm justify-center")        
                router-link(to="/login" class="no-underline text-pink-500 hover:underline") Back to login  
                                  
    
</template>

<script>
import Navbar from './reuse/Navbar'
import AuthenticationService  from '../../services/AuthenticationService.js'
import router from '../router'
import {validateField, validateUsername, validatePassword, validateEmail}  
        from '../../utils/clientUtils/utilsValidations.js'
export default {
    name: 'register',
    components:{
        Navbar
    },
  data () {
        return {
            escort_username: '',
            escort_username_err: '',
            escort_email: '',
            escort_email_err: null,
            escort_password: '',
            escort_password_err: null,
            punter_username: '',
            punter_username_err: null,
            punter_email: '',
            punter_email_err: null,
            punter_password: '',
            punter_password_err: null,
            show_f: 'yes',
            tabs: ['Escort','Punter'],
            currentTab: 0
        }
    },
    methods: {
        validateForm: function(user_type) {
            let postData = {}
            if (user_type === 'escort'){
                if (this.escort(this.escort_username,this.escort_email,this.escort_password)) {
                    postData = this.escort(this.escort_username,this.escort_email,this.escort_password)
                    console.log(postData)
                    this.post(postData)
                }
            }else{
                if (this.punter(this.punter_username,this.punter_email,this.punter_password)) {
                    postData = this.punter(this.punter_username,this.punter_email,this.punter_password)
                   
                    this.post(postData)
                }
            }
            
        },
        post: function(data) {
                AuthenticationService.register(data)
                .then( (response) => {
                    if (response) {
                        this.$store.dispatch('SET_USER',response.data.user)
                        this.$store.dispatch('SET_SESSION_TOKEN', response.data.token)
                        router.replace({name: 'Home'})
                    }
                    
                })
                .catch(function (err) {
                    console.log(err)
                })
                
                return true
        },
        escort: function (username,email,password) {

            let data = {}
            data.membership_type = 'escort'
            if(!validateUsername(username)) {
                this.escort_username_err = 'Invalid Length'
            } else {
                this.escort_username_err = null
                data.username = username
            }

            if(!validateEmail(email)){
                this.escort_email_err = 'Invalid Email'
            }else {
                this.escort_email_err = null
                data.email = email
            }

            if(!validatePassword(password)) {
                this.escort_password_err= 'Inavlid Password'
            }else {
                this.escort_password_err= null
                data.password = password
            }

            if (!this.escort_username_err && 
                !this.escort_email_err && 
                !this.escort_password_err) {
                
                return data;
            }
            console.log(this.escort_username_err)
    
            
        },
        punter: function (username,email,password) 
            {

                let data = {}
                data.membership_type = 'punter'
                if(!validateUsername(username)) {
                this.punter_username_err = 'Invalid Length'
                } else {
                    this.punter_username_err = null
                    data.username = username
                }

                if(!validateEmail(email)){
                    this.punter_email_err = 'Invalid Email'
                }else {
                    this.punter_email_err = null
                    data.email = email
                }

                if(!validatePassword(password)) {
                    this.punter_password_err = 'Invalid password'
                }else {
                    this.punter_password_err = null
                    data.password = password
                }

                if  (!this.punter_username_err && 
                    !this.punter_email_err &&  
                    !this.punter_password_err) 
                    {
                
                        return data;
                    }
    
        }
    },
    mounted: function() {
    }


}
</script>

<style>

a {
    cursor: pointer;
}

</style>


