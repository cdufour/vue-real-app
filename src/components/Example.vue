<template>
    <div>
        <!-- filter demo -->

        <p>{{ comment | shout  | reply('William') | exclaim }}</p>

        <input 
            type="email" 
            v-model="email"
            @blur="$v.email.$touch()">
        <input 
            type="text" 
            v-model="name"
            @blur="$v.name.$touch()">
        <button type="submit" :disabled="$v.$invalid">Submit</button>

        <p class="errorMessage" v-if="!$v.email.email">Please enter a valid email address</p>
        
        <div v-if="$v.email.$dirty">
            <p v-if="!$v.email.required">Email is required</p>
        </div>
        
    </div>
</template>
<script>
import { required, email } from 'vuelidate/lib/validators'
export default {
    data() {
        return {
            email: null,
            name: '',
            comment: 'Bravo pour la certif'
        }
    },
    filters: {
        shout(comment) {
            return comment.toUpperCase()
        },
        exclaim(comment) {
            return comment + '!!!'
        },
        reply(comment, name) {
            return comment + ', ' + name
        }
    },
    validations: {
        email: {
            required,
            email
        },
        name: {
            required
        }
    }
}
</script>

<style scoped>
.errorMessage { color: red }
</style>