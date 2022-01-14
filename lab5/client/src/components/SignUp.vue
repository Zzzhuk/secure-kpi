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
          v-model="password"
          :rules="passwordRules"
          label="Password"
          required
      ></v-text-field>
      <v-text-field
          v-model="confirmPassword"
          :rules="confirmPasswordRules"
          label="Confirm password"
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
          @click="$emit('onRedirect', 'login')"
          color="info"
          class="ma-2"
      >
        to Login
      </v-btn>
    </v-form>
  </div>
</template>

<script>
export default {
  name: "SignUp",
  data: () => ({
    valid: true,
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
    confirmPasswordRules: [
      v => !!v || 'Password is required',
      v => this.password === v || 'Passwords must be identical'
    ]
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
