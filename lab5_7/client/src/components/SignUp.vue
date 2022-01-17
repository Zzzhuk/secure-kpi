<template>
  <div class="container-form">
    <h2 class="text-h2 green--text darken-3">Sign up</h2>
    <v-form
        ref="form"
        v-model="valid"
    >
      <v-text-field
          v-model="email"
          :rules="emailRules"
          label="E-mail"
          required
      ></v-text-field>
      <v-text-field
          @input="alert = false"
          v-model="password"
          :rules="passwordRules"
          type="password"
          label="Password"
          required
      ></v-text-field>
      <v-text-field
          @input="alert = false"
          v-model="confirmPassword"
          :rules="[confirmPasswordRules, confirmPasswordIdentical]"
          label="Confirm password"
          type="password"
          required
      ></v-text-field>
      <v-btn
          :disabled="!valid"
          @click="submit"
          color="success"
          class="ma-2"
      >
        Submit
      </v-btn>
      <v-btn
          @click="$router.push('/login')"
          color="info"
          class="ma-2"
      >
        to Login
      </v-btn>
    </v-form>
    <v-alert v-if="alert" type="error">Error sign up!</v-alert>
  </div>
</template>

<script>
import axios from '../utils/axios';

export default {
  name: "SignUp",
  data: () => ({
    valid: true,
    alert: false,
    email: '',
    emailRules: [
      v => !!v || 'E-mail is required',
      v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
    ],
    password: '',
    passwordRules: [
      v => !!v || 'Password is required',
      v => /^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})/.test(v) || 'The string must contain: 1 symbol "a-z", 1 - "A-Z", 1 - "0-9", min length - 6 symbols',
    ],
    confirmPassword: '',
    confirmPasswordRules:
      v => !!v || 'Password is required',
  }),
  computed: {
    confirmPasswordIdentical(){
      return this.password === this.confirmPassword || 'Passwords must be identical'
    }
  },
  methods: {
    async submit() {
      try {
        const response = await axios.post('/sign-up', {
          email: this.email,
          password: this.password
        });

        const {token} = response.data;
        localStorage.setItem('token', token);
        this.$router.push('/profile').then();
      } catch (e) {
        console.error('Error sign up:', e);
        this.alert = true;
      }
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
