<template lang="pug">
    div(class="body")
        <Navbar /> 
        div(class="container mx-auto mt-3")
            div(class="w-full flex")
                div(class="w-1/4")
                    <Sidebar />
                div(class="w-1/2 ml-4")
                    div(class="w-full flex-col")
                        h1(class="bg-white text-lg text-black font-semibold px-2 py-4 mb-1") Body
                        form(class="bg-white px-8 pt-6 pb-8 mb-4" v-on:submit.prevent="updateBio")
                            div(class="mb-4")
                                label(class="block text-grey-darker text-sm font-bold mb-2" for="height") Weight {{ selectedWeight }}
                                div(class="relative")
                                    select(v-model="selectedWeight"
                                        v-validate="'required'"
                                        name="weight"
                                        v-bind:class="{'border-red-light': selectedWeightErr}" 
                                        class="input-field" id="weight") {{ selectedWeight }}                                           
                                         option(v-for="weight in weights" :value="weight" 
                                         :selected ="selectedWeight === weight") {{ weight }} kg
                                    span(v-for="error in errors.collect('weight')" class="block error") {{ error }}
                            div(class="mb-4")
                                label(class="block text-grey-darker text-sm font-bold mb-2" for="height") Height 
                                div(class="relative")
                                    select(v-model="selectedHeight"
                                            v-validate="'required'"
                                            name="height"
                                            v-bind:class="{'border-red-light': selectedHeightErr}" 
                                            class="input-field" id="height")                                                                                    
                                            option(value=" ") Choose
                                            option(value="4'3''") 4'3''
                                    span(v-for="error in errors.collect('height')" class="error") {{ error }}
                                        
                            div(class="mb-4")
                                label(class="block text-grey-darker text-sm font-bold mb-2" for="hair color") Hair color
                                div(class="relative")
                                    select(v-model="selectedHairColor" 
                                            v-validate="'required'"
                                            name="hair_color"
                                            v-bind:class="{'border-red-light': selectedHairColorErr}" 
                                            class="input-field" id="hair-color")
                                        option(v-for="hair_color in hair_colors" 
                                            :value="hair_color.value" 
                                            :selected ="selectedHairColor === hair_color") {{ hair_color.option }}
                                    span(v-for="error in errors.collect('hair_color')" class="error") {{ error }}
                            div(class="mb-4")
                                label(class="block text-grey-darker text-sm font-bold mb-2" for="skin color") Skin color
                                div(class="relative")
                                    select(v-model="selectedSkinColor"
                                        v-validate="'required'"
                                        name="skin_color" 
                                        v-bind:class="{'border-red-light': selectedSkinColorErr}" 
                                        class="input-field" id="skin-color")                                            
                                        option(v-for="skin_color in skin_colors" 
                                        :value="skin_color.value" 
                                        :selected ="selectedSkinColor === skin_color") {{ skin_color.option }}
                                    span(v-for="error in errors.collect('skin_color')" class="error") {{ error }}
                            div(class="flex justify-between mb-4")
                                label(class="text-grey-darker text-sm font-bold mb-2" for="piercing") Pierce
                                input(v-model="pierce" class="inline-block border-red-light"  id="piercing" type="checkbox" :checked="pierce")
                            div(class="flex justify-between mb-4")
                                label(class="text-grey-darker text-sm font-bold mb-2" for="tatoo") Tatoo
                                input(v-model="tatoo" class="border-2 border-pink-lighter" id="tatoo" type="checkbox" :checked="tatoo")
                            div(class="flex justify-between mb-4")
                                label(class="text-grey-darker text-sm font-bold mb-2" for="smoking") Smoke
                                input(v-model="smoke" class="" id="smoking" type="checkbox" :checked="smoke")
                            div(class="flex justify-between mb-4")
                                label(class="text-grey-darker text-sm font-bold mb-2" for="drinking") Drink
                                input(v-model="drink" class="" id="drinking" type="checkbox" :checked="drink")
                            div(class="flex justify-center mb-6")
                                button(:disabled="errors.any() || !isValid" 
                                    :class="{'cursor-default opacity-50': errors.any() || !isValid}"
                                    class="text-pink-100 bg-pink-200 font-bold py-2 px-4 rounded border border-pink focus:outline-none") Save changes 



</template>

<script>
import { mapGetters } from 'vuex'
import { Validator } from 'vee-validate'
import Navbar from '../reuse/Navbar.vue'
import Sidebar from './Sidebar.vue'
import router from '../../router'
import UserService from '../../../services/UserService.js'
export default {
    name: 'Body',
    components:{
        Navbar,
        Sidebar
    },
  data (){
        return{
          weights: [],
          heights: [],
          selectedWeight: '',
          selectedWeightErr: false,
          selectedHeight: ' ',
          selectedHeightErr: false,
          selectedHairColor: ' ',
          selectedHairColorErr: false,
          hair_colors: [
              {
                  option: 'Choose',
                  value: ' '
              },
              {
                  option: 'Black',
                  value: 'black'
              },
              {
                  option: 'Brown',
                  value: 'brown'
              },
              {
                  option: 'Tint',
                  value: 'tint'
              }
            ], 
          selectedSkinColor: ' ',
          selectedSkinColorErr: false,
          skin_colors: [
              {
                  option: 'Choose',
                  value: ' '
              },
              {
                  option: 'Black',
                  value: 'black'
              },
              {
                  option: 'Brown',
                  value: 'brown'
              },
              {
                  option: 'Light',
                  value: 'light'
              }
            ],
            pierce: false,
            pierceErr: false,
            tatoo: false,
            tatooErr: false,
            smoke: false,
            smokeErr: false,
            drink: false,
            drinkErr: false
        }
    },
    computed: {
        ...mapGetters(['USER']),
        isValid(){
            if (this.selectedWeight === this.USER.weight
                && this.selectedHeight === this.USER.height &&
                this.selectedHairColor === this.USER.hair_color &&
                this.selectedSkinColor === this.USER.skin_color && 
                this.pierce === this.USER.piercing &&
                this.tatoo === this.USER.tatoo &&
                this.smoke === this.USER.smoke &&
                this.drink === this.USER.drink

                )
            {
                return false
            }
                return true
            }
    
    }, 
    mounted() {
        const selectedWeight = this.USER.weight !== undefined ? this.USER.weight: '40'
        this.selectedWeight = selectedWeight
        const selectedHeight = this.USER.height  !== undefined ? this.USER.height: "4'3''"
        this.selectedHeight = selectedHeight
        const selectedHairColor = this.USER.hair_color  !== undefined ? this.USER.hair_color: 'black'
        this.selectedHairColor = selectedHairColor
        const selectedSkinColor = this.USER.skin_color  !== undefined ? this.USER.skin_color: 'light'
        this.selectedSkinColor = selectedSkinColor
        const pierce = this.USER.piercing !== undefined ? this.USER.piercing: false
        this.pierce = pierce
        const tatoo = this.USER.tatoo !== undefined ? this.USER.tatoo: false
        this.tatoo = tatoo
        const smoke = this.USER.smoke !== undefined ? this.USER.smoke: false
        this.smoke = smoke
        const drink = this.USER.drink !== undefined ? this.USER.drink: false
        this.drink = drink
    },
    methods:{
       weightRange: function(min,max){
           let array = []
           let j = 0
           for(let i = min; i <= max; i++){
               array[j] = i.toString()
               j++
           }
           return array
       },
        updateBio: function(){
               console.log('want to update')
            let data = {}
            if(!this.selectedWeight) {
                this.selectedWeightErr = true
            } else {
                this.selectedWeightErr = false
                data.weight = this.selectedWeight
            }

            if(this.selectedHeight == ' '){
                 this.selectedHeightErr = true
            }else {
                this.selectedHeightErr = false
                data.height = this.selectedHeight
            }

            if(this.selectedHairColor == ' ') {
                this.selectedHairColorErr = true
            }else {
                this.selectedHairColorErr = false
                data.hair_color = this.selectedHairColor
            }
            if(this.selectedSkinColor == ' ') {
                this.selectedSkinColorErr = true
            }else {
                this.selectedSkinColorErr = false
                data.skin_color = this.selectedSkinColor
            }
            data.pierce = this.pierce
            data.tatoo = this.tatoo
            data.smoke = this.smoke
            data.drink = this.drink

            if (this.selectedWeightErr ||
                this.selectedHeightErr || 
                this.selectedHairColorErr ||
                this.selectedSkinColorErr) {
                    console.log("errr de")
                
            }else{
                console.log('no err')
                this.update(data)
            }
           },
           update: function(data) {
            const token =  localStorage.getItem('session_token')
            const id = this.USER._id
                UserService.body(data,id,token)
                .then( (response) => {
                    if (response) {
                        this.$store.dispatch('UPDATE_USER',response.data.user)
                        router.go(0)
                    }
                })
                .catch(function (err) {
                    console.log(err)
                })
                
                return true
        }

    },
    created() {
        this.weights = this.weightRange(40,95)
    }
}
</script>

<style>
   
</style>


