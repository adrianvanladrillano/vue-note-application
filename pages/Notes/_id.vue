<template>
  <v-container v-if="notes.length != 0">
    <v-row justify="center">
      <v-col cols="12" xl="9">
        <v-card flat height="100vh">
          {{ loadNote }}
          <v-row no-gutters>
            <v-col>
              <v-text-field
                style="font-size: 2.2em; font-weight: 500"
                solo
                flat
                placeholder="Enter title here.."
                v-model="title"
                @input="onUpdate()"
              ></v-text-field>
            </v-col>

            <v-col cols="2">
              <v-menu
                v-model="menu"
                :close-on-content-click="false"
                :nudge-width="200"
                offset-y
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    icon
                    class="float-right"
                    color="amber"
                    dark
                    v-bind="attrs"
                    v-on="on"
                  >
                    <v-icon>mdi-dots-vertical</v-icon>
                  </v-btn>
                </template>

                <v-card>
                  <v-list>
                    <v-list-item>
                      <v-list-item-avatar>
                        <v-icon>mdi-tune</v-icon>
                      </v-list-item-avatar>

                      <v-list-item-content>
                        <v-list-item-title>Options</v-list-item-title>
                        <v-list-item-subtitle
                          >Something here.</v-list-item-subtitle
                        >
                      </v-list-item-content>
                    </v-list-item>
                  </v-list>

                  <v-divider></v-divider>

                  <v-list>
                    <v-list-item @click="share_mode = true">
                      <v-list-item-avatar>
                        <v-icon>mdi-share-variant-outline</v-icon>
                      </v-list-item-avatar>
                      <v-list-item-title>Share note</v-list-item-title>
                    </v-list-item>

                    <v-list-item v-if="share_mode == true">
                      <v-row no-gutters class="mt-2">
                        <v-col cols="9">
                          <v-text-field
                            solo
                            dense
                            flat
                            background-color="#E5E5E5"
                            v-model="share"
                          ></v-text-field>
                        </v-col>

                        <v-col cols="3">
                          <v-btn
                            text
                            color="primary"
                            style="text-transform: none"
                            >Copy</v-btn
                          >
                        </v-col>
                      </v-row>
                    </v-list-item>

                    <v-list-item link @click="dialogDelete = true">
                      <v-list-item-avatar>
                        <v-icon>mdi-trash-can-outline</v-icon>
                      </v-list-item-avatar>
                      <v-list-item-title>Remove note</v-list-item-title>
                    </v-list-item>
                  </v-list>
                </v-card>
              </v-menu>
            </v-col>
          </v-row>

          <v-row no-gutters>
            <v-col cols="12" xl="6">
              <v-row no-gutters>
                <v-col cols="12" xl="4">
                  <v-list-item class="px-0">
                    <v-list-item-content>
                      <v-list-item-title class="font-weight-medium"
                        >Created by</v-list-item-title
                      >
                    </v-list-item-content>
                  </v-list-item>
                </v-col>
                <v-col cols="12" xl="8">
                  <v-list-item class="px-0">
                    <v-list-item-avatar>
                      <v-img
                        src="https://66.media.tumblr.com/416e3f2f9b8332a7c05fbcee73e02cf5/51fcaac23a8352c7-47/s500x750/c83731b94eadb4968864f595b282cd87c717e517.png"
                      ></v-img>
                    </v-list-item-avatar>
                    <v-list-item-content>
                      <v-list-item-title
                        >Adrian Van Ladrillano</v-list-item-title
                      >
                    </v-list-item-content>
                  </v-list-item>
                </v-col>
              </v-row>
            </v-col>

            <v-col cols="12" xl="6">
              <v-row no-gutters>
                <v-col cols="12" xl="4">
                  <v-list-item class="px-0">
                    <v-list-item-content>
                      <v-list-item-title class="font-weight-medium"
                        >Tags</v-list-item-title
                      >
                    </v-list-item-content>
                  </v-list-item>
                </v-col>
                <v-col cols="12" xl="8">
                  <v-combobox
                    solo
                    flat
                    small-chips
                    v-model="tags"
                    multiple
                    @input="onUpdate()"
                  >
                  </v-combobox>
                </v-col>
              </v-row>
            </v-col>
          </v-row>

          <v-row dense>
            <v-col cols="12" xl="6">
              <v-row no-gutters>
                <v-col cols="12" xl="4">
                  <v-list-item class="px-0">
                    <v-list-item-content>
                      <v-list-item-title class="font-weight-medium"
                        >Created at</v-list-item-title
                      >
                    </v-list-item-content>
                  </v-list-item>
                </v-col>
                <v-col cols="12" xl="8">
                  <v-list-item class="px-0">
                    <v-list-item-content>
                      <v-list-item-title class="font-weight-medium">
                        {{ parseDate(created) }}
                      </v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                </v-col>
              </v-row>
            </v-col>

            <v-col cols="12" xl="6">
              <v-row no-gutters>
                <v-col cols="12" xl="4">
                  <v-list-item class="px-0">
                    <v-list-item-content>
                      <v-list-item-title class="font-weight-medium"
                        >Last mofidied</v-list-item-title
                      >
                    </v-list-item-content>
                  </v-list-item>
                </v-col>
                <v-col cols="12" xl="8">
                  <v-list-item class="px-0">
                    <v-list-item-content>
                      <v-list-item-title class="font-weight-medium">
                        {{ parseDate(updated) }}
                      </v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                </v-col>
              </v-row>
            </v-col>
          </v-row>

          <v-divider class="mb-10 mt-7"></v-divider>

          <!-- <div v-html="content" style="position: relative"></div> -->

          <div>
            <div
              class="quill-editor container"
              :content="content"
              @change="onEditorChange($event)"
              @blur="onEditorBlur($event)"
              @focus="onEditorFocus($event)"
              @ready="onEditorReady($event)"
              v-quill:myQuillEditor="editorOption"
            ></div>
          </div>
        </v-card>
      </v-col>
    </v-row>

    <v-snackbar v-model="snackbar" color="white" top right elevation="0">
      <v-img
        width="100"
        height="100"
        src="https://i.pinimg.com/originals/68/8e/9e/688e9eb45c2f5cc82361d5c305ccc0ca.gif"
      ></v-img>

      <h3 class="yellow--text text--darken-1">
        {{ snackbar_text }}
      </h3>
      <p class="yellow--text text--darken-1">
        {{ snackbar_desc }}
      </p>

      <template v-slot:action="{ attrs }">
        <v-btn color="white" text v-bind="attrs" @click="snackbar = false">
          Close
        </v-btn>
      </template>
    </v-snackbar>

    <v-dialog v-model="dialogDelete" width="500">
      <v-card>
        <v-card-title>Are you sure you want to delete?</v-card-title>
        <v-card-text>
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="error" text @click="dialogDelete = false">Cancel</v-btn>
          <v-btn color="error" depressed @click="onDelete()">Delete</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import { mapState } from 'vuex'
import axios from 'axios'
import moment from 'moment'
import { debounce } from 'vue-debounce'

export default {
  async fetch({ store }) {
    await store.dispatch('get_notes')
  },
  data: () => ({
    snackbar: false,
    snackbar_text: '',
    snackbar_desc: '',
    dialogDelete: false,
    title: null,
    edit_mode: true,
    share_mode: false,
    share:
      'https://drive.google.com/drive/folders/14Qd496QCK0NTh61KsJSJHA3NqAC3F5PW?usp=sharing',
    tags: [],
    content: '',
    editorOption: {
      // some quill options
      theme: 'bubble',

      modules: {
        toolbar: [
          [
            {
              header: [1, 2, 3, 4, 5, 6, false]
            }
          ],
          ['bold', 'italic', 'underline', 'strike', 'code'], // toggled buttons
          ['blockquote', 'code-block'],

          [
            {
              header: 1
            },
            {
              header: 2
            }
          ], // custom button values
          [
            {
              list: 'ordered'
            },
            {
              list: 'bullet'
            }
          ],
          [
            {
              script: 'sub'
            },
            {
              script: 'super'
            }
          ], // superscript/subscript
          [
            {
              indent: '-1'
            },
            {
              indent: '+1'
            }
          ], // outdent/indent
          [
            {
              direction: 'rtl'
            }
          ], // text direction

          [
            {
              size: ['small', false, 'large', 'huge']
            }
          ], // custom dropdown

          [
            {
              color: []
            },
            {
              background: []
            }
          ], // dropdown with defaults from theme
          [
            {
              font: []
            }
          ],
          [
            {
              align: []
            }
          ],
          ['link', 'image'],

          ['clean'] // remove formatting button
        ]
      }
    }
  }),
  computed: {
    ...mapState({
      notes: state => {
        return state.notes
      },
      host: state => {
        return state.host
      },
      loadNote() {
        const index = this.notes
          .map(el => el._id)
          .indexOf(this.$route.params.id)
        this.title = this.notes[index].title
        this.tags = this.notes[index].tags
        this.content = this.notes[index].description

        this.updated = this.notes[index].updatedAt
        this.created = this.notes[index].createdAt
      }
    })
  },
  mounted() {},
  methods: {
    parseDate(date) {
      return moment(date).format('MMMM Do YYYY, h:mm:ss a') // June 19th 2021, 6:24:48 pm
    },
    test() {
      alert('wew')
    },
    onDelete() {
      axios
        .delete(this.host + '/api/notes/' + this.$route.params.id)
        .then(res => {
          console.log(res)
          this.$router.push('/Notes')
          this.$store.commit('DELETE_NOTES', this.$route.params.id)
        })
        .catch(err => {
          console.error(err)
        })
    },
    onUpdate() {
      return debounce(
        val =>
          axios
            .put(this.host + '/api/notes/' + this.$route.params.id, {
              title: this.title,
              description: this.content,
              tags: this.tags,
              avatar: 'asda',
              user: 'asda'
            })
            .then(res => {
              this.$store.commit('UPDATE_NOTES', res.data.payload)
            })
            .catch(err => {
              console.error(err)
            }),
        2000
      )('updated')
    },
    onEditorBlur(editor) {
      console.log('editor blur!', editor)
    },
    onEditorFocus(editor) {
      console.log('editor focus!', editor)
    },
    onEditorReady(editor) {
      console.log('editor ready!', editor)
    },
    onEditorChange({ editor, html, text }) {
      console.log('editor change!', editor, html, text)
      this.content = html

      return debounce(
        val =>
          axios
            .put(this.host + '/api/notes/' + this.$route.params.id, {
              title: this.title,
              description: this.content,
              tags: ['My first tag'],
              avatar: 'asda',
              user: 'asda'
            })
            .then(res => {
              this.$store.commit('UPDATE_NOTES', res.data.payload)
              this.snackbar = true
              this.snackbar_text = 'Changes successfully saved!'
              this.snackbar_desc = `I'm listening from your inputs!`
            })
            .catch(err => {
              this.snackbar = true
              this.snackbar_text = 'Cannot update note!'
              this.snackbar_desc = `I'm listening from your inputs!`
              console.error(err)
            }),
        2000
      )('updated')
    }
  }
}
</script>


<style lang="scss" scoped>
.container {
  width: 100%;
  margin: 0 auto;
  .quill-editor {
    min-height: 800px;
    max-height: 400px;
  }
}
