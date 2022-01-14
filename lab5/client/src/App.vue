<template>
  <v-app>
    <v-main>
      <Login v-if="route === 'login'" @onSubmit="onSubmit" @onRedirect="route = $event"/>
      <SignUp v-else-if="route === 'sign-up'" @onSubmit="onSubmit" @onRedirect="route = $event"/>
      <Success v-else-if="route === 'success'" @onRedirect="route = $event"/>
    </v-main>
  </v-app>
</template>

<script>

import Login from './components/Login';
import SignUp from './components/SignUp';
import Success from './components/Success';

export default {
  name: 'App',

  components: {
    Success,
    SignUp,
    Login
  },

  data: () => ({
    route: 'login'
  }),

  methods: {
    onSubmit(bool) {
      if (bool){
        this.route = 'success';
      }
    }
  }
};
</script>

<style lang="scss">
.v-main__wrap {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
}

.container-form {
  max-width: 400px;
  width: 100%;
  padding: 24px;
  border-radius: 30px;
  box-shadow: 0 10px 10px rgba(0,0,0,.2);
}
</style>
