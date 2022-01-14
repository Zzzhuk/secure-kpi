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
          label="Password"
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
          @click="$emit('onRedirect', 'sign-up')"
          color="info"
          class="ma-2"
      >
        to Sign Up
      </v-btn>
    </v-form>
  </div>
</template>

<script>
export default {
  name: "Login",
  data: () => ({
    valid: true,
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
      this.$emit('onSubmit', {})
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
