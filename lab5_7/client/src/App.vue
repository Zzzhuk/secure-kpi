<template>
  <v-app>
    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>


export default {
  name: 'App',

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
