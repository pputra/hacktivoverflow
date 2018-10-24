<template>
<div class="home">
  <div class="row d-flex justify-content-center">
   
    <router-view></router-view>
    <question  v-if="!this.$route.params.id"></question>
  </div>
</div>
</template>

<script>
// @ is an alias to /src
import { mapState } from 'vuex';
import { mapActions } from 'vuex';
/* import Profile from '@/components/main-content-components/Profile.vue' */
import Question from '@/components/main-content-components/question.vue';

export default {
  name: 'home',
  components: {
    Question,
  },
  props: [],
  data() {
    return {
      
    };
  },
  mounted() {
    if (localStorage.getItem('access-token') === null) {
      this.$router.push('/')
    }
  },
  computed: {
    ...mapState([
      
    ]),

  },
  methods: {
    ...mapActions([

    ]),


    
  }
};
</script>
<style >
  .home {
    width: 100%
  }
</style>

