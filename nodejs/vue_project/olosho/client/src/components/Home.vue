<template lang="pug">
  div(class="home")
    <Navbar />
    div()
      div(v-for="user in users" class="bg-white mx-auto mb-1 max-w-sm shadow-lg rounded-lg overflow-hidden")
        div(class="sm:flex sm:items-center px-6 py-4")
          div(class="inline w-8 h-8 rounded-full mx-auto mb-4 sm:mb-0 sm:mr-4 sm:ml-0 bg-black")
              img(:src="'http://localhost:3000/uploads/' + user._id + '/avatar/' + user.profile_url" alt="avatar" class="w-full h-full rounded-full")
          div(class="text-center sm:text-left sm:flex-grow")
            div(class="mb-4")
              p(class="text-xl leading-tight") {{ user.username }}
              p(class="text-sm leading-tight text-grey-dark") {{ user.about }}
              div()
                button(class="text-xs font-semibold rounded-full px-4 py-1 leading-normal bg-white border border-purple text-purple hover:bg-purple hover:text-white") Message
                button(class="text-xs font-semibold rounded-full px-4 py-1 leading-normal bg-white border border-purple text-purple hover:bg-purple hover:text-white") Save
                button(class="text-xs font-semibold rounded-full px-4 py-1 leading-normal bg-white border border-purple text-purple hover:bg-purple hover:text-white") Hangout

</template>

<script>
  import { mapGetters } from 'vuex'
  import Navbar from './reuse/Navbar.vue'
  import HomeServices from '../../services/HomeServices.js'
    export default {
      name: 'Home',
      components:{
            Navbar
        },
      data () {
        return {
          users: [],
          switchOn: "yes"
        }
      },
      methods: {
          fetchAllUsers: function() {
            console.log("This will fetch all users")
          }
      },
      computed:  {
        ...mapGetters(['USER'])
        },
      mounted() {
        const token =  localStorage.getItem('session_token')
        HomeServices.allUsers().then((response) => {
          this.users = response.data.users
        })
        .catch((err) => {
          console.log(err)
        })
      },
      created: function(){
        console.log("this vue is created")
      }
    }
</script>

<style scoped>

</style>
