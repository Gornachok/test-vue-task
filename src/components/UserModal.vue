<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" max-width="600">
      <v-card>
        <v-toolbar
          color="#2b3245"
          dark
          flat
        >
          <v-toolbar-title>Информация о пользователе</v-toolbar-title>
        </v-toolbar>
        <v-card-text>
          <v-form>
            <v-text-field
              :rules="[value => !!value || 'Required.']"
              :maxlength="25"
              label="Имя"
              v-model="modalUser.firstName"
              ref="firstName"
              type="text"
            ></v-text-field>

            <v-text-field
              :rules="[value => !!value || 'Required.']"
              :maxlength="25"
              label="Фамилия"
              v-model="modalUser.secondName"
              ref="secondName"
              type="text"
            ></v-text-field>

            <v-text-field
              :rules="[value => !!value || 'Required.']"
              :maxlength="25"
              label="Отчество"
              v-model="modalUser.middleName"
              ref="middleName"
              type="text"
            ></v-text-field>
            
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn @click="cancel()">Отменить</v-btn>
          <v-btn @click="save()">Сохранить</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>
<script>
export default {
  props:{
    user: Object,
    index: Number
  },
  computed:{
    dialog: function(){
      return this.$store.getters.MODAL
    }
  },
  data (){
    return {
      modalUser:{}
    }
  },
  created(){
    if(Object.keys(this.user).length != 0)
      {
        this.modalUser = Object.assign({}, this.user)
      }else{
        this.modalUser = {
          firstName: '',
          secondName: '',
          middleName: ''
        }
      }
  },
  methods: {
    save(){
      this.hasErrors = false
      Object.keys(this.modalUser).forEach(f => {
        if (!this.modalUser[f]) {
          this.$refs[f].validate(true)
          this.hasErrors = true
        }
      })
      if(this.hasErrors) return
      if(Object.keys(this.user).length == 0){
        this.$store.commit('ADD_USER', this.modalUser)
      } else {
        this.$store.commit('EDIT_USER', {key: this.index, user: this.modalUser})
      }
      this.$store.commit('OPEN_CLOSE_MODAL')
    },
    cancel(){
      this.$store.commit('OPEN_CLOSE_MODAL')
    }
  }
}
</script>