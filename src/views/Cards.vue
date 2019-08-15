<template>
  <v-container fluid grid-list-md>
    <v-layout row wrap v-if="Object.keys(currentUser).length != 0">
      <v-flex xs12 sm6 md4 v-for="(card, i) in currentCards" :key="i">
        <v-card @click="get(card.url, card.name)" min-height="200px" max-height="250px" max-width="300px" class="text-center mt-6">
          <img :src="card.icon" class="pt-6"><img>
          <v-card-title primary class="title justify-center">{{ card.name }}</v-card-title>
          <v-card-text>{{ card.discription }}</v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
    <div v-else>Для отображения карточек выберите пользователя</div>
  </v-container>
</template>
<script>
export default {
  computed: {
    currentUser: function(){
      if(this.$store.getters.CURRENT_USER)
        return this.$store.getters.CURRENT_USER
        else return {}
    },
    currentCards: function(){
      return this.$store.getters.CARDS.slice(0, 4)
    }
  },
  data(){
    return {
      
    }
  },
  methods:{
    async get(url, name){
      this.$store.dispatch('GET_API', {url, name});
      this.$router.push("/result")
    }
  }
}
</script>
<style>
v-layout{
  width: 70%; 
  margin-left: auto; 
  margin-right: auto
}
</style>