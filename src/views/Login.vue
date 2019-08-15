<template>
    <v-content>
      <v-container
        fluid
        fill-height
      >
        <v-layout
          align-center
          justify-center
        >
          <v-flex
            xs12
            sm8
            md4
          >
            <v-card class="elevation-12">
              <v-toolbar
                color="#2b3245"
                dark
                flat
              >
                <v-toolbar-title>Login form</v-toolbar-title>
              </v-toolbar>
              <v-card-text>
                <v-form>
                  <v-text-field
                    prepend-icon="mdi-account"
                    :rules="[value => !!value || 'Required.']"
                    v-model="login"
                    ref="login"
                    type="text"
                  ></v-text-field>

                  <v-text-field
                    prepend-icon="mdi-lock"
                    :rules="[value => !!value || 'Required.']"
                    v-model="password"
                    ref="password"
                    type="password"
                  ></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn v-on:click="getToken()">Login</v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
</template>

<script>
  export default {
    props: {
      source: String,
    },
    data: () => ({
      drawer: null,
      login: null,
      password: null

    }),
    methods: {
      getToken(){
        if(!this.login || !this.password){
          this.$refs.login.validate(true)
          this.$refs.password.validate(true)
          return
        }
        let exampleToken = `Bearer ${this.login}${this.password}`
        localStorage.setItem('token', exampleToken);
        this.$router.push("/")
      }
    }
  }
</script>