<template>
  <v-row style="background: yellow">
    <v-col cols="12" xl="4">
      <v-card class="text-center px-15 py-5" style="height: 88vh">
        <img
          class="VuetifyLogo py-5"
          alt="Vuetify Logo"
          style="width: 100%"
          src="/tala.png"
        />
        <v-text-field label="Username" v-model="email"> </v-text-field>
        <v-text-field label="Password" v-model="password"> </v-text-field>
        <v-btn block @click="login()">Login</v-btn>
        <v-btn class="mt-3" block>Register</v-btn>
      </v-card>

      <!-- <p>
        User: {{ $auth.user }}
        <br />
        <br />
        Logged in:{{ $auth.loggedIn }}
      </p> -->
    </v-col>

    <v-col cols="12" xl="8"></v-col>
  </v-row>
</template>

<script>
import Logo from '~/components/Logo.vue'
import VuetifyLogo from '~/components/VuetifyLogo.vue'

export default {
  components: {
    Logo,
    VuetifyLogo
  },
  data() {
    return {
      email: 'adrianvanladrillano.dev@gmail.com',
      password: 'Ilovesugar17'
    }
  },
  methods: {
    login() {
      let authLogin = {
        email: this.email,
        password: this.password
      }
      console.log(this.email)
      console.log(this.password)
      this.$auth.loginWith('local', { data: authLogin }).then(res => {
        console.log(res)
        // this.$auth.setRefreshToken('local', res.data.data.token.refresh_token)
        this.$auth.setUser(res.data.data)
        this.$auth.$storage.setUniversal('user', res.data.data, true)

        this.$router.push('/notes')
      })
      console.log('login')
    }
  }
}
</script>
