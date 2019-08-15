<template>
  <v-container>
    <div v-if="cardName == 'rickandmortyapi.com'">
      <v-layout row wrap>
        <v-flex xs12 sm6 md4 v-for="char in apiMessage" :key="char._id" class='pr-5 pb-5'>
          <v-card>
            <v-img :src="char.image"/>
            <v-car-title>{{ char.name }}</v-car-title>
          </v-card>
        </v-flex>
      </v-layout>
    </div>
    <div v-else-if="cardName == 'coindesk.com'">
      <v-simple-table>
        <thead>
          <tr>
            <th class="text-left">Валюта</th>
            <th class="text-left">Цена</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{{ apiMessage.bpi.USD.code }}</td>
            <td>{{ apiMessage.bpi.USD.rate }}</td>
          </tr>
          <tr>
            <td>{{ apiMessage.bpi.EUR.code }}</td>
            <td>{{ apiMessage.bpi.EUR.rate }}</td>
          </tr>
          <tr>
            <td>{{ apiMessage.bpi.GBP.code }}</td>
            <td>{{ apiMessage.bpi.GBP.rate }}</td>
          </tr>
        </tbody>
      </v-simple-table>
    </div>
    <div v-else-if="cardName == 'randomuser.me'">
      <v-card max-width="300px" class="mrg">
        <v-img :src="apiMessage.results[0].picture.large"/>
        <v-card-text>
          name: {{ apiMessage.results[0].name.title }}.{{ apiMessage.results[0].name.first }} {{ apiMessage.results[0].name.last }}
          <br>
          email: {{ apiMessage.results[0].email }}
        </v-card-text>
      </v-card>
    </div>
    <div v-else-if="cardName == 'dog.ceo'">
      <v-img :src="apiMessage.message" max-width="300px" class="mrg"/>
    </div>
    <div v-else-if="cardName == 'api.chucknorris.io'">
      <v-card max-width="300px" class="mrg">
        <v-card-text>
          {{ apiMessage.value }}
        </v-card-text>
      </v-card>
    </div>
    <div v-else-if="cardName == 'breaking-bad-quotes'">
      <v-card v-for=" quote in apiMessage" :key="quote.quote" class="mt-2">
        <v-card-title> {{ quote.author }} </v-card-title>
        <v-card-text> {{ quote.quote }} </v-card-text>
      </v-card>
    </div>
  </v-container>
</template>
<script>
export default {
  computed: {
    apiMessage: function(){
      return this.$store.getters.API
    },
    cardName: function(){
      return this.$store.getters.CURRENT_CARD
    }

  }
}
</script>
<style>
.mrg{
  margin-left: auto; 
  margin-right: auto
}
</style>