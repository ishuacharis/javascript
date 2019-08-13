<template lang="pug">
    div(class="sidebar")
        div(class="flex-col items-center text-sm")
            div(class="profile-container bg-white h-48 mb-4")
                div(class="relative flex justify-center bg-pink-600 w-full h-32")
                    <Modal v-bind:isOpen="isOpen" :closeModal="closeModal" @close="close" :userid="userid" :avatar="avatar" @finished="finished"/>
                    button(@click="isOpen = !isOpen" class="modal-open inline-block focus:outline-none")
                        div(class="w-24 h-24 bg-white")
            
                            img(:src="avatar" 
                                    alt="avatar" class="w-full h-full rounded-full")
                div(class="w-full flex flex-col items-center py-2")
                    p(class="font-bold text-black text-lg") {{ username }}
                    p(class="font-bold text-black text-sm") @ibreaktherules

            div(class="bg-white mb-4")
                router-link(v-for="(link, index) in links" :to="link.url" :key="index" 
                    class="block flex justify-between border-b no-underline text-grey-600 font-thin hover:bg-pink-500 \
                            hover:text-grey-900 mb-1 px-3 py-2")
                    p {{ link.name }}
                    <font-awesome-icon icon="angle-right" />
            div(class="bg-white flex flex-wrap text-sm justify-between px-4 py-2")
                span(class="text-gray-600") &copy; 2019 Olosho
                a(href="#" class="no-underline font-serif font-semibold text-gray-600 hover:text-pink-light hover:underline") About  
              
                        
</template>


<script>
import { mapGetters } from 'vuex'
import router from '../../router'
import UserService from '../../../services/UserService.js'
import Modal from '../reuse/modal'

export default {
    name: 'sidebar',
    components:{
        Modal
    },
    data(){
        return {
            isOpen: false,
            avatar: '',
            username: '',
            userid: '',
            links: [
                {
                    name: 'Account',
                    url: '/settings/account'
                },
                
                {
                    name: 'Body',
                    url: '/settings/body'
                },
                {
                    name: 'Photos',
                    url: '/settings/photos'
                },
                {
                    name: 'Password',
                    url: '/settings/change_password'
                },
                {
                    name: 'Phone',
                    url: '/settings/phone'
                },
                {
                    name: 'Rates',
                    url: '/settings/rates'
                },
                {
                    name: 'Services',
                    url: '/settings/services'
                },
                {
                    name: 'Safety and privacy',
                    url: '/privacy'
                },
            ]
        }
       
    },
    computed: {
        ...mapGetters(['USER']),
    }, 
    created: function() {
        const username = this.USER.username !== undefined ? this.USER.username: ''
        this.username = username
        const avatar = this.USER.profile_url !== undefined ? 'http://localhost:3000/uploads/' + this.USER._id + '/avatar/' + 
                        this.USER.profile_url : 'http://localhost:3000/uploads/photos_1559126200421.jpeg'
        this.avatar = avatar
        
        const userid = this.USER._id !== undefined ? this.USER._id : ''
        this.userid = userid
    },
    methods: {
        close(){
            this.isOpen = false
        },
        closeModal() {
            console.log('wale')
            this.close()
        },
        transfer(){
            console.log('upload...')
        },
        upload() {
            this.transfer()
        },
        finished(){
             //router.go(0)
            console.log('finished')
        },
        
    }
    
}
</script>
<style>

</style>

