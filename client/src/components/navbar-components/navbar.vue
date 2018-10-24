<template>
<div class="flex-column">
  <nav class="navbar navbar-expand-lg navbar-light bg-light fixed-top">
    <a class="navbar-brand"><router-link to="/"><i class="fab fa-stack-overflow"></i>  not stackoverflow</router-link></a>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
      aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav mr-auto">
        <li class="nav-item active">
          <a class="nav-link">
            <router-link to="/">Home</router-link>
            <span class="sr-only">(current)</span>
          </a>
        </li>
        <li class="nav-item active">
          <a class="nav-link" v-if="!isLogin">
            <router-link to="/login">Join here</router-link>
            <span class="sr-only">(current)</span>
          </a>
        </li>
      </ul>
      <form class="form-inline my-2 my-lg-0">
        <input class="form-control mr-sm-2" type="search" placeholder="Search by keyword" aria-label="Search">
      </form>
      <button class="btn btn-outline-danger my-2 my-sm-0" type="submit" v-if="isLogin" @click="logOut">log out</button>
    </div>
  </nav>
</div>
</template>

<script>
import { mapState } from 'vuex';
import { mapActions } from 'vuex';

export default {
  name: 'navbar',
  data() {
    return {
       
    }
  },
  computed: {
    ...mapState([
        'isLogin'
    ])
  },
  methods: {
    
    ...mapActions([
        'updateLogin', 'updateUserId'
    ]),

    logOut() {
        localStorage.clear();

        var auth2 = gapi.auth2.getAuthInstance();
        auth2.signOut().then(function () {
          localStorage.clear();
          this.updateLogin(false);
          this.updateUserId(undefined);
          this.updateLogin(false);
          this.$router.push('/');
        });



        localStorage.clear();
        this.updateLogin(false);
        this.updateUserId(undefined);
        this.updateLogin(false);
        this.$router.push('/');
        
    }

  },
  watch: {
    
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .flex-column {
    margin-bottom: 10%;
    
  }

  .navbar, a {
    color: white !important;
    background-color: rgb(212, 125, 24) !important;
  }

  

</style>
