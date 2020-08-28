<template>
<div>

    <Example />

    <h1>Create Event</h1>

    <form @submit.prevent="createEvent">
        <BaseSelect 
            label="Select a category"
            :options="categories"
            v-model="event.category"
        />

        <h3>Name & describe your event</h3>

        <BaseInput
            type="text"
            placeholder="Add an event title"
            class="field" 
            label="Title" 
            v-model="event.title" />
        
        <BaseInput
            type="text"
            placeholder="Add a description"
            class="field" 
            label="Description" 
            v-model="event.description" />

        <h3>Where is your event?</h3>
        <BaseInput
            type="text"
            placeholder="Add a location"
            class="field" 
            label="Location" 
            v-model="event.location" />

        <h3>When is your event?</h3>
        <div class="field"> 
        <label>Date</label>
            <datepicker v-model="event.date" placeholder="Select a date" />
        </div>
 
        <BaseSelect 
            label="Select a time"
            :options="times"
            v-model="event.time"
        />

        <input type="submit" class="button -fill-gradient" 
        value="Submit" />
    </form>

</div>
</template>

<script>
import { mapState} from 'vuex';
import Datepicker from 'vuejs-datepicker';
import Example from '@/components/Example.vue';

export default {
    components: {
        Datepicker, Example
    },
    name: 'EventCreate',
    data() {
        const times = [];
        for (let i = 1; i <= 24; i++) {
            times.push(i + ':00')
        }
        return {
            event: this.createFreshEvent(),
            times
        }
    },
    methods: {
        createFreshEvent() {
            const id = Math.floor(Math.random() * 10000000)
            const user = this.$store.state.user
            return {
                id,
                category: '',
                organizer: user,
                title: '',
                description: '',
                location: '',
                date: '',
                time: '',
                attendees: []
            }
        },
        createEvent() {
            this.$store.dispatch('event/createEvent', this.event)
                .then(() => {
                    // redirection vers la page event-show
                    this.$router.push({
                        name: 'event-show',
                        params: { id: this.event.id }
                    })

                    this.event = this.createFreshEvent()
                })
                .catch(() => {
                    console.log('Cannot create event')
                })
            
        }
    },
    computed: mapState(['categories'])
}
</script>
