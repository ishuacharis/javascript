<template lang="pug">
    div(class="account")
        <Navbar />
        div(class="container mx-auto mt-2 sm:bg-red-800")
            div(class="w-full flex")
                div(class="w-1/4")
                    <Sidebar />
                div(class="flex-grow flex")
                    div(class="w-full flex-col")
                        h1(class="bg-white text-lg text-black font-semibold px-2 py-4 mb-1") Account
                        form(class="bg-white px-8 pt-6 pb-8 mb-4" v-on:submit.prevent="updateBio")
                            div(class="mb-4")
                                label(class="block text-gray-700 text-sm font-bold mb-2" for="username") Username
                                input(v-model="username" 
                                v-validate="'required'"
                                name="username"
                                class="input-field" 
                                id="username" 
                                type="text" 
                                placeholder="Username")
                                span(v-for="error in errors.collect('username')" class="error") {{ error }}
                            div(class="mb-4")
                                label(class="block text-gray-700 text-sm font-bold mb-2" for="email") Email
                                input(v-model="email" 
                                v-validate="'required|email'"
                                name="email"
                                class="input-field" 
                                id="email" 
                                type="email"
                                placeholder="Email")
                                span(v-for="error in errors.collect('email')" class="error") {{ error }}
                            div(class="mb-4")
                                label(class="block text-gray-900 text-sm font-bold mb-2" for="ethinicity") Ethnicity
                                div(class="relative")
                                    select(v-model="selectedEthnic"
                                    v-validate="'required'"
                                    name="ethnic"
                                    class="input-field" id="ethnic")
                                        option(v-for="ethnic in ethnics" 
                                        :value="ethnic.value" 
                                        :selected ="selectedEthnic === ethnic") {{ ethnic.option }}
                                span(v-for="error in errors.collect('ethnic')" class="error") {{ error }}
                            div(class="mb-4")
                                label(class="block text-grey-darker text-sm font-bold mb-2" for="ethinicity") Orientation
                                div(class="relative")
                                    select(v-model="selectedOrientation"
                                    v-validate="'required'"
                                    name="orientation"
                                    class="input-field" id="orientation")
                                        option(v-for="orientation in orientations" 
                                        :value="orientation.value" 
                                        :selected ="selectedOrientation === orientation") {{ orientation.option }}
                                span(v-for="error in errors.collect('orientation')" class="error") {{ error }}
                            div(class="mb-4")
                                label(class="block text-grey-600 text-sm font-bold mb-2" 
                                for="bio") Bio
                                textarea(v-model="bio"
                                v-validate="'required|min:5'"
                                name="bio"
                                class="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker leading-tight \
                                focus:outline-none focus:border-pink-200 w-full shadow-inner p-4 border-0" 
                                rows="6")
                                span(v-for="error in errors.collect('bio')" class="error") {{ error }}
                            div(class="flex justify-center mb-6")
                                button(:disabled="errors.any() || !isValid" 
                                    :class="{'cursor-default opacity-50': errors.any() || !isValid}"
                                    class="text-pink-300 bg-pink-600 font-bold py-2 px-4 rounded border border-pink focus:outline-none") Save changes 



</template>

<script>
import { mapGetters } from 'vuex'
import { Validator } from 'vee-validate'
import Navbar from '../reuse/Navbar.vue'
import Sidebar from './Sidebar.vue'
import Content from './Content.vue'
import router from '../../router'
import UserService from '../../../services/UserService.js'
import {
    validateField,
    validateUsername, 
    validatePassword, 
    validateEmail,
    validateEthnicSelection,
    validateOrientationSelection,
    validateBio
    }  
        from '../../../utils/clientUtils/utilsValidations.js'
export default {
    name: 'account',
    components:{
        Navbar,
        Sidebar,
        Content
    },
  data (){
        return{
          username: '',
          email: '',
          bio: '',
          selectedEthnic: 'hausa',
          selectedOrientation: 'straight',
          ethnics : [
              {
                  option: 'Choose',
                  value: ' '
              },
              {
                  option: 'Hausa',
                  value: 'hausa'
              },
              {
                  option: 'Igbo',
                  value: 'igbo'
              },
              {
                  option: 'Yoruba',
                  value: 'yoruba'
              }
            ],
            orientations : [
              {
                  option: 'Choose',
                  value: ' '
              },
              {
                  option: 'Straight',
                  value: 'straight'
              },
              {
                  option: 'Bisexual',
                  value: 'bisexual'
              }
            ],
            username_err: null,
            email_err: null,
            ethnic_err: null,
            orientation_err: null,
            bio_err: null,
            disabled: true
            
        }
    },
    computed: {
        ...mapGetters(['USER']),
        isValid(){
            if (this.username === this.USER.username
                && this.email === this.USER.email &&
                this.bio === this.USER.about &&
                this.selectedEthnic === this.USER.ethnicity &&
                this.selectedOrientation === this.USER.orientation)
            {
                return false
            }
            return true
        }
    },
    mounted() {
        const username = this.USER.username
        this.username = username
        const email =  this.USER.email
        this.email = email
        const bio =  this.USER.about !== undefined ? this.USER.about: ''
        this.bio = bio
        const selected_ethnic = this.USER.ethnicity !== undefined ? this.USER.ethnicity: ' '
        this.selectedEthnic = selected_ethnic
        const selected_orientation = this.USER.orientation  !== undefined ? this.USER.orientation: ' '
        this.selectedOrientation = selected_orientation
    },
    methods:{
           updateBio: function(){
            let data = {}
            if(!validateUsername(this.username)) {
                
                this.username_err = 'Invalid Length'
            } else {
                this.username_err = null
                data.username = this.username
            }

            if(!validateEmail(this.email)){
                this.email_err = 'Invalid Email'
                
            }else {
                this.email_err = null
                data.email = this.email
            }

            if(!validateEthnicSelection(this.selectedEthnic)) {
                this.ethnic_err = 'Not Selected'
            }else {
                this.ethnic_err = null
                data.ethnicity = this.selectedEthnic
            }
            if(!validateOrientationSelection(this.selectedOrientation)) {
                this.orientation_err = 'Not Selected'
            }else {
                this.orientation_err = null
                data.orientation = this.selectedOrientation
            }
            if(!validateBio(this.bio)) {
                this.bio_err = 'Too Short'
            } else {
                this.bio_err = null
                data.bio = this.bio
            }

            if (!this.username_err && !this.email_err && 
                !this.ethnic_err && !this.orientation_err 
                && !this.bio_err) {
                 this.update(data)
            }else{
                console.log('errors de')
            }
           },
           update: function(data) {
              const token =  localStorage.getItem('session_token')
              const id = this.USER._id
            UserService.bio(data,id,token)
            .then( (response) => {
                if (response) {
                    this.$store.dispatch('UPDATE_USER',response.data.user)
                    router.go(0)
                }
            })
            .catch((err) =>{
                console.log(err)
            })
                
                return true
        },
        
        },

}
</script>

<style>
   
</style>


