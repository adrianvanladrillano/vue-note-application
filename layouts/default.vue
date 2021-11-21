<template>
  <v-app dark>
    <v-main>
      <v-app-bar app elevate-on-scroll color="white">
        <v-app-bar-nav-icon
          v-if="$route.name != 'index'"
          color="amber"
          @click="drawer = !drawer"
        ></v-app-bar-nav-icon>
        <v-spacer></v-spacer>
        <h1 class="font-weight-medium">Notes</h1>
        <v-spacer></v-spacer>

        <v-menu
          v-if="$auth.loggedIn == true"
          v-model="menu"
          :close-on-content-click="false"
          :nudge-width="200"
          offset-x
        >
          <template v-slot:activator="{ on, attrs }">
            <v-avatar v-bind="attrs" v-on="on">
              <img src="https://cdn.vuetifyjs.com/images/john.jpg" alt="John" />
            </v-avatar>
          </template>

          <v-card>
            <v-list>
              <v-list-item>
                <v-list-item-avatar>
                  <img
                    src="https://cdn.vuetifyjs.com/images/john.jpg"
                    alt="John"
                  />
                </v-list-item-avatar>

                <v-list-item-content>
                  <v-list-item-title>{{ $auth.user.name }}</v-list-item-title>
                  <v-list-item-subtitle>
                    {{ $auth.user.email }}
                  </v-list-item-subtitle>

                  <v-list-item-subtitle>
                    {{ $auth.strategy.token.get() }}
                  </v-list-item-subtitle>
                </v-list-item-content>

                <v-list-item-action>
                  <v-btn
                    :class="fav ? 'red--text' : ''"
                    icon
                    @click="fav = !fav"
                  >
                    <v-icon>mdi-heart</v-icon>
                  </v-btn>
                </v-list-item-action>
              </v-list-item>
            </v-list>

            <v-divider></v-divider>

            <v-list>
              <v-list-item link>
                <v-list-item-title>Settings</v-list-item-title>

                <v-list-item-action>
                  <v-switch v-model="message" color="purple"></v-switch>
                </v-list-item-action>
              </v-list-item>

              <v-list-item link @click="logout()">
                <v-list-item-title>Logout</v-list-item-title>

                <v-list-item-action>
                  <v-switch v-model="message" color="purple"></v-switch>
                </v-list-item-action>
              </v-list-item>
            </v-list>
          </v-card>
        </v-menu>
      </v-app-bar>

      <v-navigation-drawer
        v-if="$route.name != 'index'"
        app
        width="350"
        v-model="drawer"
        class="d-flex flex-column"
      >
        <div>
          <v-list-item>
            <img
              class="VuetifyLogo py-5"
              alt="Vuetify Logo"
              style="width: 100%"
              src="/tala.png"
            />
          </v-list-item>

          <v-subheader>Notes</v-subheader>

          <v-list-item
            two-line
            v-for="(note, index) in notes"
            :key="index"
            @click="$router.push('/Notes/' + note._id)"
          >
            <v-list-item-content>
              <v-list-item-title class="black--text font-weight-medium">
                {{ note.title }}
              </v-list-item-title>
              <v-list-item-subtitle>
                <v-chip-group readonly>
                  <v-chip
                    v-for="tag in note.tags"
                    :key="tag"
                    small
                    label
                    color="yellow lighten-3"
                    class="amber--text text--darken-2"
                  >
                    {{ tag }}
                  </v-chip>
                </v-chip-group>
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>

          <v-btn
            class="py-5 my-2 amber--text text--darken-2"
            block
            @click="onCreate()"
            color="white"
            depressed
          >
            <span style="text-transform: none"> Create New Note </span>
            <v-icon right>mdi-plus</v-icon></v-btn
          >

          <v-subheader>Quick Actions</v-subheader>

          <v-list-item link>
            <v-list-item-icon>
              <v-icon>mdi-tune</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>Settings</v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-list-item link @click="logout()">
            <v-list-item-icon>
              <v-icon>mdi-logout</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>Logout</v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-spacer></v-spacer>
          <v-img
            src="https://i.pinimg.com/originals/b0/7c/0f/b07c0fc116d1868db07a8bbc2d79aab9.gif"
          ></v-img>
        </div>
      </v-navigation-drawer>
      <nuxt />
    </v-main>

    <v-footer fixed color="white">
      <v-speed-dial
        v-model="fab"
        :top="top"
        :bottom="bottom"
        :right="right"
        :left="left"
        :direction="direction"
        :open-on-hover="hover"
        class="mb-15"
        style="z-index: 99; margin-top: -100px"
      >
        <template v-slot:activator>
          <v-btn v-model="fab" color="amber" dark fab>
            <v-icon v-if="fab"> mdi-close </v-icon>
            <v-icon v-else> mdi-plus </v-icon>
          </v-btn>
        </template>
        <v-btn fab dark small color="amber" @click="$route.push('/Notes/New')">
          <v-icon>mdi-notebook-edit</v-icon>
        </v-btn>
        <v-btn
          fab
          dark
          small
          color="amber"
          @click="$route.push('/Folders/New')"
        >
          <v-icon>mdi-folder</v-icon>
        </v-btn>
      </v-speed-dial>
      <v-bottom-navigation
        app
        grow
        elevation="0"
        shift
        background-color="white"
        dark
      >
        <v-btn value="recent" @click="$router.push('/Notes')">
          <v-icon color="amber">mdi-notebook-edit</v-icon>
        </v-btn>

        <v-btn value="favorites" @click="$router.push('/Dashboard')">
          <v-icon color="amber">mdi-home</v-icon>
        </v-btn>

        <v-btn value="nearby" @click="$router.push('/Folders')">
          <v-icon color="amber">mdi-folder</v-icon>
        </v-btn>
      </v-bottom-navigation>
    </v-footer>
  </v-app>
</template>

<script>
import { mapState } from 'vuex'
import axios from 'axios'

export default {
  async fetch({ store }) {
    await store.dispatch('get_notes')
  },
  data() {
    return {
      drawer: false,
      direction: 'top',
      fab: false,
      fling: false,
      hover: false,
      tabs: null,
      top: false,
      right: true,
      bottom: true,
      left: false,
      items: [
        {
          icon: 'mdi-notebook-edit',
          title: 'New Note',
          to: '/'
        },
        {
          icon: 'mdi-folder',
          title: 'New Group',
          to: '/inspire'
        }
      ]
    }
  },
  computed: {
    ...mapState({
      notes: state => {
        return state.notes
      },
      host: state => {
        return state.host
      }
    })
  },
  methods: {
    logout() {
      this.$router.push('/')
      this.$auth.logout().then(res => {
        console.log(res)
        // this.$auth.setRefreshToken('local', res.data.data.token.refresh_token)
        this.$auth.setUser('')
        this.$auth.$storage.removeUniversal('user')

        this.$router.push('/')
      })
    },
    onCreate() {
      axios
        .post(
          this.host + '/api/notes',
          {
            title: 'My First Note',
            description: 'asdasda',
            tags: ['My first tag'],
            avatar: 'asda',
            user: this.$auth.user.id
          },
          {
            headers: {
              authorization: {
                token: this.$auth.strategy.token.get()
              }
            }
          }
        )
        .then(res => {
          this.$store.commit('ADD_NOTES', res.data)
          this.$router.push('/Notes/' + res.data._id)
        })
        .catch(err => {
          console.error(err)
        })
    }
  }
}
</script>
<style>
.v-speed-dial {
  position: absolute;
}
.v-btn--floating {
  position: relative;
}
</style>