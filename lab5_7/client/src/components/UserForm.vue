<template>
  <div>

  </div>
</template>

<script>
import axios from '../utils/axios';

export default {
  name: "UserForm",
  data: () => ({}),
  methods: {
    validToken() {
      const token = localStorage.getItem('token');
      return token;
    },
    async getUser() {
      try {
        const response = await axios.get('/user', {
          headers: {
            'x-access-token': this.validToken()
          }
        });
        console.log('get user response', response)
      } catch (e) {
        console.error('Error get user:', e)
      }
    },
    async updateUser() {
      try {
        const response = await axios.post('/user', {firstName: 'Name'},{
          headers: {
            'x-access-token': this.validToken()
          }
        });
        console.log('get user response', response)
      } catch (e) {
        console.error('Error get user:', e)
      }
    },
    async logOut() {
      try {
        const response = await axios.post('/log-out', null, {
          headers: {
            'x-access-token': this.validToken()
          }
        });

        console.log('response', response)
      } catch (e) {
        console.error("Error log out", e)
      }
      localStorage.removeItem('token');
      this.$router.push('/login').then();
    }
  },
  async created() {
    await this.getUser();
    // await this.updateUser();
  }
}
</script>

<style scoped>

</style>
