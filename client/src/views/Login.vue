<template>
<div class="flex-column justify-content-md-center border p-4">
  <form>
    <div v-if="failLogin">
      <h4>invalid email or password</h4>
    </div>
    <div class="form-group">
      <input type="email" class="form-control" id="exampleInputEmail1"
       v-model="inputEmailLogin" aria-describedby="emailHelp"
        placeholder="Enter email">
    </div>
    <div class="form-group">
      <input type="password" class="form-control" id="exampleInputPassword1"
       placeholder="Password" v-model="inputPasswordLogin">
    </div>
  </form>
  <div class="form-group">
    <small id="emailHelp" class="form-text text-muted">Has no account?</small>
    <router-link to="/register">Register Here</router-link>
  </div>
  <button type="submit" class="btn btn-primary" @click="login">Login</button>
</div>
</template>

<script>
import { mapState } from 'vuex';
import { mapActions } from 'vuex';

export default {
    data() {
        return {
            
            inputEmailLogin: '',
            inputPasswordLogin: '',
            failLogin: false,
        };
    },
    computed: {
        ...mapState([
            'isLogin'
        ]),
    },

    methods: {
        ...mapActions([
            'updateLogin', 'updateUserId'
        ]),


        login() {
            this.$server.post('/login', {
                email: this.inputEmailLogin,
                password: this.inputPasswordLogin,
            }).then((result) => {
                localStorage.setItem('access-token', result.data.token);
                this.updateLogin(true);
                this.updateUserId(result.data.id);
                this.$router.push('/');
            }).catch(() => {
                this.failLogin = true;
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
    width: 50%
  }
</style>
