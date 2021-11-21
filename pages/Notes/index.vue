<template>
  <div>
    <v-row>
      <v-col cols="12">
        <v-container>
          <v-row>
            <v-col>
              <v-text-field
                flat
                dense
                append-icon="mdi-tune"
                label="Search everything here!"
                prepend-inner-icon="mdi-magnify"
                solo
                color="amber"
                background-color="#F6F6F6"
                v-model="search"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col v-if="search != ''" cols="12" class="text-center">
              <h3>No Results Found.</h3>
              <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit.</p>

              <v-img
                src="https://i.pinimg.com/originals/b0/7c/0f/b07c0fc116d1868db07a8bbc2d79aab9.gif"
              ></v-img>
            </v-col>
            <v-col
              cols="6"
              xl="3"
              v-for="(note, index) in filtered_notes"
              :key="index"
            >
              <v-card
                style="background: #f6f6f6; overflow: hidden"
                class="px-4 py-4"
                @click="$router.push('/Notes/' + note._id)"
                min-height="400"
              >
                <v-list-item two-line style="padding: 0; margin: 0">
                  <v-list-item-content>
                    <v-list-item-title class="font-weight-medium">
                      {{ note.title }}
                    </v-list-item-title>

                    <v-list-item-subtitle class="font-weight-regular">
                      {{ note.createdAt }}
                    </v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>

                <v-chip-group v-model="selection" mandatory>
                  <v-chip
                    small
                    label
                    color="yellow lighten-4"
                    class="yellow--text text--darken-4"
                    v-for="(tag, index) in note.tags"
                    :key="index"
                    >{{ tag }}</v-chip
                  >
                </v-chip-group>

                <div
                  style="font-size: 0.5em; max-height: 300px; overflow: hidden"
                  v-html="note.description"
                ></div>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  async fetch({ store }) {
    await store.dispatch('get_notes')
  },
  data: () => ({
    search: '',
    tab: null,
    test: [1, 2, 3, 4, 5, 6, 7]
  }),
  computed: {
    ...mapState({
      notes: state => {
        return state.notes
      },
      host: state => {
        return state.host
      }
    }),
    filtered_notes() {
      // return this.employees.filter(this.filterByName).filter(this.filterByAge)
      return this.notes.filter(note => {
        return (
          !this.search ||
          note.title.toLowerCase().includes(this.search.toLowerCase()) ||
          note.tags.filter(element =>
            element.toLowerCase().includes(this.search.toLowerCase())
          ).length > 0
          // ||
          // file.description.toLowerCase().includes(this.search.toLowerCase())
          // || file.description.toLowerCase().includes(this.name.toLowerCase()) ||
          // file.tags.filter(element => element.value.includes(this.search))
          //   .length > 0

          // ID
          // &&
          // (!this.department ||
          //   employee.department
          //     .toLowerCase()
          //     .includes(this.department.toLowerCase())) &&
          // (!this.emp_status ||
          //   employee.emp_status
          //     .toLowerCase()
          //     .includes(this.emp_status.toLowerCase())) &&
          // (!this.branch ||
          //   employee.branch
          //     .toLowerCase()
          //     .includes(this.branch.toLowerCase())) &&
          // (!this.job ||
          //   employee.job.toLowerCase().includes(this.job.toLowerCase())) &&
          // (!this.type ||
          //   employee.emp_type.toLowerCase().includes(this.type.toLowerCase()))
          // )
        )
      })
    }
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
