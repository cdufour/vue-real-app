<template>
    <div>
        <h1>Create Event, {{ user.name }}</h1>
        <p>Event created by {{ user.name }}</p>
        <ul>
            <li 
                v-for="category in categories" 
                :key="category">{{ category }}</li>
        </ul>
        <div>Cat length {{ catLength }}</div>
        <div>{{ sCat(5) }}</div>
        <button @click="incrementCount">Increment</button>
    </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'

export default {
    // computed: {
    //     userName() {
    //         return this.$store.state.user.name
    //     }
    // },
    // computed: mapState({
    //     userName: state => state.user.name,
    //     categories: state => state.categories
    // })
    //computed: mapState(['categories', 'user']),
    computed: {
        localComputed() { return 'localComputed' },
        ...mapState(['categories', 'user']),
        catLength() { return this.$store.getters.catLength },
        //shortCat() { return this.$store.getters.shortCat }
        ...mapGetters({
            sCat: 'shortCat'
        })
    },
    methods: {
        incrementCount() {
           //this.$store.commit('INCREMENT_COUNT', 4)
           // Best Practive, éxécuter le commit depuis une action et non directement
           this.$store.dispatch('updateCount', 3)
        }
    },

}
</script>