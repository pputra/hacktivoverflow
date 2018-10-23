<template>
<div class="flex-column border p-4">
  <form>
    <div v-if="failInput"><h4>invalid input</h4></div>
    <div class="form-group">
      <input type="email" class="form-control" id="exampleInputEmail1" v-model="inputEmail"
      aria-describedby="emailHelp" placeholder="Enter email">
    </div>
    <div class="form-group">
      <input type="password" class="form-control" id="exampleInputPassword1"
       placeholder="Password" v-model="inputPassword">
    </div>
    <div class="form-group">
      <input type="email" class="form-control" v-model="inputFirstName"
      aria-describedby="emailHelp" placeholder="Enter first name">
    </div>
    <div class="form-group">
      <input type="text" class="form-control" v-model="inputLastName"
      aria-describedby="emailHelp" placeholder="Enter last name">
    </div>
    <div class="form-group">
        <small id="emailHelp" class="form-text text-muted">Has an account?</small>
        <router-link to="/login">Login Here</router-link>
  </div>
  </form>
  <button type="submit" class="btn btn-primary" @click="register">Register</button>
</div>
</template>

<script>
export default {
  name: 'register',
  data() {
    return {
      inputEmail: '',
      inputPassword: '',
      inputFirstName: '',
      inputLastName: '',
      failInput: false,
    };
  },
  props: [],
  methods: {
    register() {
      this.$server.post('/register', {
        email: this.inputEmail,
        password: this.inputPassword,
        first_name: this.inputFirstName,
        last_name: this.inputLastName,
      }).then(() => {
        this.$router.push('/login')
      }).catch(() => {
        this.failInput = true;
      });
    },
  },
};
</script>

<style scoped>
  h4 {
    color: red;
  }
  .btn {
      width: 100%;
      border: none;
  }
  .flex-column {
      width: 50%;
  }
</style>
