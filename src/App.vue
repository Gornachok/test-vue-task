<template>
      <v-app>
        <v-app-bar
          app
          color="#2b3245"
          dark
          v-if="this.$route.path != '/login'"
        >
          <v-spacer/>
          <div class="pr-2">
            <span v-if="Object.keys(currentUser).length != 0">{{ currentUser.firstName }} {{ currentUser.secondName }}</span>
          </div>
          <div class="text-center">
            <v-menu offset-y min-width="200px">
              <template v-slot:activator="{ on }">
                <v-btn
                  dark
                  small
                  icon
                  v-on="on"
                >
                  <v-icon>
                    mdi-arrow-down
                  </v-icon>
                </v-btn>
              </template>
              <v-list class="pl-3 pr-3">
              <span v-if="users.length == 0">Пользователи еще не добавлены</span>
                <v-list-item 
                  v-for="(user, index) in users"
                  :key="index"  
                >
                  <v-chip color="#ff4874" dark @click="changeUser(index)">{{ user.firstName }} {{ user.secondName }}</v-chip>
                </v-list-item>
              </v-list>
            </v-menu>
          </div>
        </v-app-bar>
        <div>
          <v-tabs
              style="margin-top: 65px;"
              color="#ff4874"
            v-if="this.$route.path != '/login'"
          >
            <v-tab to="/">Настройки</v-tab>
            <v-tab to="/cards">Карточки</v-tab>
            <v-tab to="/result">Вывод</v-tab>
          </v-tabs>
        </div>
        
        <v-content class="pt-5">
          <router-view/>  
        </v-content>
      </v-app>
</template>
<script>
export default {
  data: () => ({

  }),
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
    }
  },
  methods: {
    redirect(){
      this.$router.push("/login")
    },
    changeUser(index){
      this.$store.commit('CHANGE_USER', index)
      this.$router.push("/cards")
    }
  }
}
</script>
