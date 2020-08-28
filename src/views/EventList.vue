<template>
    <div>
        <h1>Event listing</h1>
        <EventCard v-for="event in events" :key="event.id" :event="event"/>
    
        <!-- Pagination -->
        <template v-if="page != 1">
            <router-link 
            :to="{ name: 'event-list', query: { page: page - 1 }}" 
            rel="prev">Prev Page</router-link> |
        </template>

         <router-link
            v-if="hasNextPage"
            :to="{ name: 'event-list', query: { page: page + 1 }}" 
            rel="next">Next page</router-link>


    </div>
</template>

<script>
import EventCard from '@/components/EventCard.vue';
//import EventService from '@/services/EventService.js';
import { mapState } from 'vuex';

export default {
    name: 'EventList',
    components: {
        EventCard,
    },
    created() {
        // EventService.getEvents()
        //     .then(res => this.events = res.data)
        //     .catch(err => console.log(err))
        this.$store.dispatch('event/fetchEvents', {
            perPage: 3,
            page: this.page
        })
    },
    // data() {
    //     return {
    //         events: []
    //     }
    // },
    computed: {
        ...mapState('event', ['events', 'totalEvents']),
        page() {
            return parseInt(this.$route.query.page) || 1
        },
        hasNextPage() {
            return this.totalEvents > this.page * 3
        }
    } 
}
</script>