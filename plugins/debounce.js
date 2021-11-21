import vueDebounce from 'vue-debounce'

Vue.use(vueDebounce)

// Listening to multiple events
Vue.use(vueDebounce, {
    listenTo: ['input', 'keyup']
})