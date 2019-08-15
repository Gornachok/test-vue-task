<template>
  <v-container>
    <v-layout row wrap>
      <v-flex md12 xs12 sm12>
        <v-simple-table>
          <thead>
            <tr>
              <th class="text-left">Имя</th>
              <th class="text-left">Фамилия</th>
              <th class="text-left">Отчество</th>
              <th class="text-left">Действия</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(user, i) in users" :key="i">
              <td>{{ user.firstName }}</td>
              <td>{{ user.secondName }}</td>
              <td>{{ user.middleName }}</td>
              <td>
                <v-btn fab small dark color="#ff4874" icon @click="editUser(user, i)">
                  <v-icon dark>mdi-pencil</v-icon>
                </v-btn>
                <v-btn @click="deleteUser(i)" fab small dark color="#ff4874" icon>
                  <v-icon>mdi-delete</v-icon>  
                </v-btn>
                <!-- <UserModal :user="user" :index="i"/> -->
              </td>
            </tr>
          </tbody>
        </v-simple-table>
      </v-flex>
      <v-flex class="text-center mt-5">
        <v-btn class="mx-2" fab dark color="#ff4874" @click="addUser()">
          <v-icon dark>mdi-plus</v-icon>
        </v-btn>
        <!-- <v-btn class="mx-2" fab dark color="indigo" v-on="on">
          <v-icon dark>mdi-plus</v-icon>
        </v-btn> -->
      </v-flex>
    </v-layout>
    <v-snackbar
      color="#2b3245"
      dark
      v-model="snackbar"
    >
      Текущий пользователь не может быть удален
    </v-snackbar>
    <UserModal v-if="dialog" :user="objForModal" :index="indexForModal"/>
  </v-container>
</template>

<script>
import UserModal from '@/components/UserModal.vue'
  export default {
    components: {
      UserModal
    },
    data () {
      return {
        snackbar: false,
        objForModal: {},
        indexForModal: 0,
        desserts: [
          {
            name: 'Frozen Yogurt',
            calories: 159,
          },
          {
            name: 'Ice cream sandwich',
            calories: 237,
          },
          {
            name: 'Eclair',
            calories: 262,
          },
          {
            name: 'Cupcake',
            calories: 305,
          }
        ],
      }
    },
    computed: {
      currentUser: function(){
        if(this.$store.getters.CURRENT_USER)
          return this.$store.getters.CURRENT_USER
          else return {}
      },
      users: function(){
        if(this.$store.getters.USERS)
          return this.$store.getters.USERS
          else return []
      },
    dialog: function(){
      return this.$store.getters.MODAL
    }
    },
    methods: {
      addUser(){
        this.objForModal = {}
        this.indexForModal = 0
        this.$store.commit('OPEN_CLOSE_MODAL')
      },
      editUser(user, index){
        this.objForModal = Object.assign({}, user)
        this.indexForModal = index
        this.$store.commit('OPEN_CLOSE_MODAL')
      },
      deleteUser(index){
        if(JSON.stringify(this.currentUser) === JSON.stringify(this.users[index])){
          this.snackbar = true
          return
        }
        
        this.$store.commit('DELETE_USER', index)
      }
    }
  }
</script>
