import axios from 'axios'
export const state = () => ({
    notes: [],
    folders: [],
    host: 'http://localhost:5000'
})

export const getters = {

}

export const mutations = {
    // Notes
    SET_NOTES(state, notes) {
        state.notes = notes
        console.log(state.notes)
    },
    ADD_NOTES(state, payload) {
        state.notes.push(payload)
        console.log(state.notes)
    },
    DELETE_NOTES(state, id) {
        const index = state.notes.map(el => el._id).indexOf(id)
        state.notes.splice(index, 1)
    },
    UPDATE_NOTES(state, payload) {
        const index = state.notes.map(el => el._id).indexOf(payload._id)
        state.notes[index] = payload
    },

}

export const actions = {
    async get_notes({ commit, state }) {
        axios
            .get(`${state.host}/api/notes`)
            .then((response) => {
                commit('SET_NOTES', response.data)
                console.log(`${state.host}/api/notes`)
            })
            .catch((error) => {
                console.log(error)
            })
            .then(() => {
                // always executed
            })
    },
}