<template>
    <div id="app">

        <navbar></navbar>
        <div class="container-fluid">
            <div class="main">
                <router-view />
            </div>
        </div>
    </div>
</template>
<script>
import { mapState } from 'vuex'
import { mapActions } from 'vuex'
import navbar from './components/navbar-components/navbar';
export default {
    components: {
        navbar,
    },
    created() {
        this.getQuestions()
        if (localStorage.getItem('access-token')) {
            this.updateLogin(true);
            this.getUserId();
        } else {
            this.updateLogin(false);
        }
    },
    computed: {
        ...mapState([
            'isLogin'
        ])
    },
    methods: {
        ...mapActions([
            'updateLogin', 'getQuestions', 'getUserId'
        ]),
        
    }
}
</script>
<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

.main {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
