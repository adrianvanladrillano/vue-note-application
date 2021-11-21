<template>
  <v-container v-if="notes.length != 0">
    <v-row justify="center">
      <v-col cols="12" xl="9">
        <v-card flat>
          <v-text-field
            style="font-size: 2.2em; font-weight: 500"
            solo
            flat
            placeholder="Enter title here.."
            v-model="title"
          ></v-text-field>

          <v-row dense>
            <v-col cols="5" xl="2">
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title>Created by</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-col>
            <v-col cols="6" xl="10">
              <v-list-item class="px-0">
                <v-list-item-avatar>
                  <v-img
                    src="https://66.media.tumblr.com/416e3f2f9b8332a7c05fbcee73e02cf5/51fcaac23a8352c7-47/s500x750/c83731b94eadb4968864f595b282cd87c717e517.png"
                  ></v-img>
                </v-list-item-avatar>
                <v-list-item-content>
                  <v-list-item-title>Adrian Van Ladrillano</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-col>
          </v-row>

          <v-row dense>
            <v-col cols="5" xl="2">
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title>Tags</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-col>
            <v-col cols="6" xl="10">
              <v-combobox
                v-model="model"
                :items="items"
                :search-input.sync="search"
                hide-selected
                solo
                flat
                label="Add some tags"
                multiple
                persistent-hint
                small-chips
              >
                <template v-slot:no-data>
                  <v-list-item>
                    <v-list-item-content>
                      <v-list-item-title>
                        No results matching "<strong>{{ search }}</strong
                        >". Press <kbd>enter</kbd> to create a new one
                      </v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                </template>
              </v-combobox>
            </v-col>
          </v-row>

          <v-divider class="mb-10 mt-7"></v-divider>
          <div
            v-html="content"
            @click="edit_mode = true"
            v-if="edit_mode == false"
          ></div>
          <div v-if="edit_mode == true">
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
  </v-container>
</template>

<script>
import { mapState } from 'vuex'
export default {
  async fetch({ store }) {
    await store.dispatch('get_notes')
  },
  data: () => ({
    title: 'My First Note',
    edit_mode: false,
    tags: [],
    content: `<h1>Let's get started!</h1><p><br></p><p><code>Description</code></p><p><strong class="ql-size-large">Vue.js</strong><span class="ql-size-large"> is an open-source model–view–viewmodel front-end JavaScript framework for building user interfaces and single-page applications. It was created by </span><strong class="ql-size-large">Evan You</strong><span class="ql-size-large"> and is maintained by him and the rest of the active core team members.</span></p><pre class="ql-syntax" spellcheck="false">Stable release: 3.0.11 / 1 April 2021; 2 months ago Initial release: February 2014; 7 years ago Original author(s): Evan You Size: 33.30KB min+gzip Written in: TypeScript License: MIT License </pre><p><code>The 7 Best VS Code&nbsp;Extensions For Vue&nbsp;Developers</code></p><ul><li>Vetur. If you download one VS Code&nbsp;<strong>extension</strong>&nbsp;from this list, it has to be Vetur. ...</li><li>ESLint Plugin VueJS.</li><li><strong>Vue</strong>&nbsp;VSCode Snippets.</li><li>Bookmarks.</li><li>Bracket Pair Colorizer.</li><li>Auto Rename Tag.</li><li>NPM Intellisense.</li></ul><p><br></p><blockquote><strong style="color: rgb(32, 33, 36);">Vue</strong><span style="color: rgb(32, 33, 36);">. js (pronounced /vjuː/, like view) is a library for building interactive web interfaces. The&nbsp;</span><strong style="color: rgb(32, 33, 36);">goal of Vue</strong><span style="color: rgb(32, 33, 36);">. js is to provide the benefits of reactive data binding and composable view components with an API that is as simple as possible.</span></blockquote><p><br></p>`,
    editorOption: {
      // some quill options
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
      }
    })
  },
  mounted() {
    const vm = this
    import('@ckeditor/ckeditor5-build-classic').then(editor => {
      vm.editor = editor.default
    })
  },
  methods: {
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
    }
  }
}
</script>


<style lang="scss" scoped>
.container {
  width: 100%;
  margin: 0 auto;
  padding: 50px 0;
  .quill-editor {
    min-height: 800px;
    max-height: 400px;
    overflow-y: auto;
  }
}
