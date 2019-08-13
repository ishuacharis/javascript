<template lang="pug">
    div(class="body")
        <Navbar />
        div(class="container mx-auto mt-3")
            div(class="w-full flex")
                div(class="w-1/4")
                    <Sidebar />
                div(class="w-1/2 ml-1")
                    div(class="w-full flex-col")
                        h1(class="bg-white text-lg text-black font-semibold px-2 py-4 mb-1") Rates
                        form(class="bg-white px-8 pt-6 pb-8 mb-4" v-on:submit.prevent="updateBio")
                            h5(class="mb-4 border text-sm font-hairline px-2 py-4 mb-1") Incalls
                            div(class="flex mb-4 justify-center" v-for="(incall, index) in incalls" v-bind:key="'A'+index")
                                label(class="w-1/6 text-center text-grey-darker text-base mr-2 py-2") {{ incall.duration  }}
                                input(v-model="incall.price" class="shadow appearance-none border rounded py-2 px-3 text-grey-darker leading-tight focus:outline-none focus:shadow-outline"  type="text" placeholder="Price")
                            h5(class="mb-4 border text-sm text-black font-hairline px-2 py-4 mb-1") Outcalls
                            div(class="flex mb-4 justify-center" v-for="(outcall, index) in outcalls" v-bind:key="'B'+index")
                                label(class="w-1/6 text-center text-grey-darker text-base mr-2 mr-2 py-2") {{ outcall.duration  }}
                                input(v-model="outcall.price" class="shadow appearance-none border rounded py-2 px-3 text-grey-darker leading-tight focus:outline-none focus:shadow-outline"  type="text" placeholder="Price")
                            div(class="flex justify-center mb-6")
                                button(class="bg-transparent text-pink font-bold py-2 px-4 rounded border border-pink focus:outline-none focus:shadow-outline") Save changes 


</template>

<script>
    import { mapGetters } from 'vuex'
    import Navbar from '../reuse/Navbar.vue'
    import Sidebar from './Sidebar.vue'
    import router from '../../router'
    import UserService from '../../../services/UserService.js'
    export default {
        name: 'rates',
        components:{
            Navbar,
            Sidebar
        },
    data (){
            return{
            incalls: [
                {
                    duration: '30mins',
                    price: ''
                },
                {
                    duration: '1hr',
                    price: ''
                },
                {
                    duration: '2hr',
                    price: ''
                },
                {
                    duration: '6hr',
                    price: ''
                },
                {
                    duration: '1day',
                    price: ''
                }
                ],
            outcalls: [
                {
                    duration: '30mins',
                    price: ''
                },
                {
                    duration: '1hr',
                    price: ''
                },
                {
                    duration: '2hr',
                    price: ''
                },
                {
                    duration: '6hr',
                    price: ''
                },
                {
                    duration: '1day',
                    price: ''
                }
                ]
            }
        },
        computed:  mapGetters(['USER']),
        methods: {
                updateBio: function() {
                    let data = {}
                    data.incalls = JSON.stringify(this.incalls)
                    data.outcalls = JSON.stringify(this.outcalls)
                    const token = localStorage.getItem('session_token')
                    const id = this.USER._id
                 
                    UserService.rates(data, id, token)
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
            },
        
        mounted() {
            const incalls = this.USER.incall.length !== 0 ? JSON.parse(this.USER.incall): this.incalls
            this.incalls = incalls
            const outcalls = this.USER.outcall.length !== 0 ? JSON.parse(this.USER.outcall)  : this.outcalls
            this.outcalls = outcalls
            

           
        }
    }
</script>

<style>
   
</style>


