<template lang="pug">
    div(class="bg-white border-b border-gray-100")
        div(class="container mx-auto px-4")
            div(class="flex items-center")
                nav(class="w-1/5 flex")
                    router-link(to="/" class="bg-white -mb-px") 
                        span(class="top-left-nav-item") Home
                    router-link(to="/" class="bg-white -mb-px") 
                        span(class="top-left-nav-item") About
                div(v-if="ISLOGGEDIN" class="w-4/5")
                    div(class="flex justify-end items-center")
                        div(class="mr-4")
                            router-link(to="/settings")
                                img(:src="avatar" 
                                    alt="avatar" class="h-8 w-8 rounded-full")
                        div(class="")
                            button(type="button" class="bg-pink-700 rounded-full text-white font-bold no-underline px-4 py-2 hover:bg-pink-500" 
                                @click="logout") Logout           
                        
</template> 


<script>
import { mapGetters } from 'vuex'
export default {
    name: 'navbar',
    data() {
        return {
            avatar: ''
        }
    },
    computed: {
        ...mapGetters(['USER','ISLOGGEDIN'])
        },
    mounted() {
        console.log('navbar is ounted')
        const avatar = this.USER.profile_url !== undefined ? 'http://localhost:3000/uploads/' + this.USER._id + '/avatar/' + 
                        this.USER.profile_url : 'http://localhost:3000/uploads/photos_1559126200421.jpeg'
        this.avatar = avatar
    },
    methods: {
        logout () {
            this.$store.dispatch('LOGOUT')
        }
    },
    created: function(){
        console.log('navbar is created')
    }
}
</script>
<style>

</style>


