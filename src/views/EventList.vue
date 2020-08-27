<template>
    <div>
        <h1>Event listing</h1>
        <EventCard v-for="event in events" :key="event.id" :event="event"/>
    </div>
</template>

<script>
import EventCard from '@/components/EventCard.vue';
import EventService from '@/services/EventService.js';

export default {
    name: 'EventList',
    components: {
        EventCard,
    },
    created() {
        EventService.getEvents()
            .then(res => this.events = res.data)
            .catch(err => console.log(err))
    },
    data() {
        return {
            events: []
        }
    },
}
</script>