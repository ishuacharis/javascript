<template lang="pug">
    div(class="body")
        <Navbar /> 
        div(class="container mx-auto mt-3")
            div(class="w-full flex")
                div(class="w-1/4")
                    <Sidebar />
                div(class="w-1/2 ml-4")
                    div(class="w-full flex flex-col")
                        h1(class="bg-white text-lg text-black font-semibold px-2 py-4 mb-1") Photos
                        form(enctype="multipart/form-data" class="bg-white px-8 pt-6 pb-8 mb-4")
                            span(v-for="error in errors.collect('photos')" class="error") {{ error }}
                            label(class="label hover:bg-pink-600 hover:text-white mb-4")
                                svg(class="w-8 h-8" fill="currentColor" 
                                xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20")
                                    path(d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z")
                                span(class="mt-2 text-base leading-normal") Upload Photos
                                input(:name="fileName" 
                                v-validate="'image|ext:jpeg,jpg,png'"
                                name='photos'
                                type='file' multiple  accept="image/*" class="hidden" 
                                @change="filesChange($event.target.name,$event.target.files)")
                            
                            div(class="h-1 bg-pink-light mb-2")
                            div(v-if="uploadedFiles.length > 0" class="flex flex-col")
                                p() Uploaded file(s)
                                span(v-for="(file, index) in uploadedFiles" 
                                class="block") {{ file }}

                        div(class="flex flex-wrap")
                                div(v-for="(file, index) in files" class="relative w-64 h-64 m-2")
                                    div(class="absolute min-w-full min-h-full")
                                        img(:src="'http://localhost:3000/uploads/' + file" 
                                            class="w-full h-full")
                                    div(class="absolute flex justify-center items-center bg-black opacity-50 min-w-full min-h-full")
                                        a(href="#" class="font-bold text-white text-lg") set pic

                                    
</template>

<script>
import { Validator } from 'vee-validate'
import { mapGetters } from 'vuex'
import Navbar from '../reuse/Navbar.vue'
import Sidebar from './Sidebar.vue'
import router from '../../router'
// import {oloshoApi}  from '../../../service/api.js'
import UserService from '../../../services/UserService.js'
export default {
    name: 'Photos',
    components:{
        Navbar,
        Sidebar
    },
  data (){
        return{
         photos: [],
         fileName: "photos",
         uploadedFiles: [],
         success: false,
         files: ''
        }
    },
    computed:  {
        ...mapGetters(['USER']),
    },
    mounted() {
        const userFiles = this.USER.photos !== undefined ? this.USER.photos: ''
        this.files = userFiles
        //console.log(this.files)
    },
    created() {
    },
    methods: {
        filesChange: function(fieldName,fileList){
            const formData = new FormData()
            if (!fileList.length) return;
            Array.from(Array(fileList.length).keys())
            .map(x => {
                this.uploadedFiles.push(fileList[x].name)
                formData.append(fieldName, fileList[x], fileList[x].name)
            })

             this.save(formData)
        },
        save: function(formData) {
            const token = localStorage.getItem('session_token')
            const id = this.USER._id
            UserService.upload(id,formData,token)
            .then(response =>{
                if (response) {
                     this.$store.dispatch('UPDATE_USER',response.data.user)
                    // formData.delete('photos')
                }
                router.go(0)
                
            })
            .catch((err) => {
                console.log(err)
            })
        }
    }
}
</script>

<style>
   .upload-section {
        @apply flex flex-wrap border-2 border-pink-900 rounded-sm py-2;
    }
    .label{
        @apply block w-64 flex flex-col items-center mx-auto px-4 py-6 bg-white text-pink-300 rounded-lg shadow-lg tracking-wide uppercase border border-pink-300 cursor-pointer;
    }
</style>


