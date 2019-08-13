<template lang="pug">
    transition(name="modal")
        div(v-if="isOpen")
            div(class="modal-overlay" style="background-color: rgba(0, 0, 0, .5);")
                div(class="modal bg-white w-11/12 md:max-w-md mx-auto")
                    div(class="modal-header")
                        h2(class="font-extrabold text-lg text-pink-600 py-2") Upload photo
                        button(@click="closeModal" 
                        class="absolute right-0 px-2 align-top text-2xl text-grey-700 focus:outline-none" 
                        aria-label="close-modal") x
                    div(class="modal-body")
                        img(:src="imagePreview" v-show ="showPreview" 
                            class="block w-40 h-40 bg-pink-600 rounded-full mb-4")
                        input(type='file' accept="image/*" class="hidden" id="file" ref="file" @change="fileChange($event)")
                        button(class="btn-apply focus:outline-none" @click="upload") Upload
                    div(class="modal-footer flex justify-end px-4 py-4")
                        button(class="btn-cancel focus:outline-none" @click="closeModal") Cancel 
                        button(class="btn-apply focus:outline-none" @click="ok") Apply
</template> 
<script>
import { mapGetters } from 'vuex'
import router from '../../router'
import UserService from '../../../services/UserService.js'
export default {
    name: 'modal',
    props: {
        isOpen: Boolean,
        closeModal: Function,
        avatar: String,
        userid: String
    },
    data() {
        return {
            file: '',
            showPreview: true,
            imagePreview: ''
        }
    },
    computed: {
        ...mapGetters(['USER']),
    },
    
    created: function(){
         console.log(this.avatar)
        this.imagePreview = this.avatar
    },

    methods: {
        fileChange(e) {
            this.file = this.$refs.file.files[0]
            
            let reader = new FileReader()

            reader.addEventListener('load', function() {
                this.showPreview = true
                this.imagePreview = reader.result

            }.bind(this), false)
            if (this.file) {
                if(/\.(jpe?g|png|gif)$/i.test(this.file.name)) {
                    reader.readAsDataURL(this.file);
                }
            }
            
        },
        upload() {
            this.$refs.file.click()
        },
        ok() {
            const token = localStorage.getItem('session_token')
            let formData = new FormData()
            formData.append('avatar',this.file)

            UserService.uploadAvatar(this.userid, formData , token)
            .then((response) => {
                if (response) {
                    console.log('successfully uploaded')
                    this.$store.dispatch('UPDATE_USER',response.data.user)
                    router.go(0)
                }
            })
            .catch((err) => {
                console.error('failure')
                console.log(err)
            }) 
            this.$emit('finished')
        }
    }
    
}
</script>
<style>


    
</style>
