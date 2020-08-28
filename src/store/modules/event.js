import EventService from '@/services/EventService.js'

export const namespaced = true

export const state = {
    events: [],
    totalEvents: 0,
    event: {}
}

export const getters = {
    // returns objet if found, otherwise undefined
    getEventById: state => id => 
        state.events.find(event => event.id === id)
}

export const mutations = {
    ADD_EVENT(state, event) {
        state.events.push(event)
    },
    SET_EVENTS(state, events) {
        state.events = events
    },
    SET_TOTAL_EVENTS(state, total) {
        state.totalEvents = total
    },
    SET_EVENT(state, event) {
        state.event = event
    }
}

export const actions = {
    createEvent({ commit }, event) {
        // les deux traitements sont parallèles, risque d'incohérencxe
        // EventService.postEvent(event).then(res => {})
        // commit('ADD_EVENT', event)
  
        // Meilleure solution: on commit qu'en cas de succès
        return EventService.postEvent(event).then(() => {
          commit('ADD_EVENT', event)
        })
        
      },
    fetchEvents({ commit }, { perPage, page }) {
    EventService.getEvents(perPage, page)
        .then(res => {
        //console.log('Total events: ' + res.headers['x-total-count'])
        commit('SET_EVENTS', res.data)
        commit('SET_TOTAL_EVENTS', parseInt(res.headers['x-total-count']))
        })
        .catch(err => {
        console.log('Error', err.response)
        })
    },
    fetchEvent({ commit, getters }, id) {
    // Caching
    // Before fetching one this event (id), check if alreay in state
    var event = getters.getEventById(id)

    if (event) {
        commit('SET_EVENT', event)
    } else {
        return EventService.getEvent(id)
            .then(res => {
                commit('SET_EVENT', res.data)
            })
            .catch(err => {
                console.log('Error: ' + err.response)
            })
    }
    }
}