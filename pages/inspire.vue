
<template>
  <div
    class="quill-editor container"
    :content="content"
    @change="onEditorChange($event)"
    @blur="onEditorBlur($event)"
    @focus="onEditorFocus($event)"
    @ready="onEditorReady($event)"
    v-quill:myQuillEditor="editorOption"
  ></div>
</template>
 
<script>
export default {
  data() {
    return {
      content: '<p>I am Example</p>',
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
    }
  },
  mounted() {
    // console.log('app init, my quill insrance object is:', this.myQuillEditor)
    // setTimeout(() => {
    //   this.content = 'i am changed'
    // }, 3000)
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
  width: 60%;
  margin: 0 auto;
  padding: 50px 0;
  .quill-editor {
    min-height: 200px;
    max-height: 400px;
    overflow-y: auto;
  }
}
