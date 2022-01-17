<template>
  <div class="container-form">
    <h2 class="text-h2 green--text darken-3">Login</h2>
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
          v-model="password"
          :rules="passwordRules"
          @input="alert = false"
          label="Password"
          type="password"
          required
      ></v-text-field>
      <v-btn
          :disabled="!valid"
          @input="alert = false"
          @click="submit"
          color="success"
          class="ma-2"
      >
        Submit
      </v-btn>
      <v-btn
          @click="$router.push('/sign-up')"
          color="info"
          class="ma-2"
      >
        to Sign Up
      </v-btn>
    </v-form>
    <v-alert v-if="alert" type="error">Error login! Check your credentials</v-alert>
  </div>
</template>

<script>
import axios from '../utils/axios';

export default {
  name: "Login",
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
      v => !!v || 'Password is required']
  }),
  methods: {
    async submit() {
      try {
        const response = await axios.post('/login', {
            email: this.email,
            password: this.password
        });
        const {token} = response.data;
        localStorage.setItem('token', token);
        this.$router.push('/profile').then();
      } catch (e) {
        console.error('Error login:', e);
        this.alert = true;
      }
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
