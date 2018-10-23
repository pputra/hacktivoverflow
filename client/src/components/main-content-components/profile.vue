<template>
<div class="col-sm-4 d-flex flex-column align-items-center profile-grid">
  <div class="card sticky-top" style="width: 18rem;">
    <img class="card-img-top" src="https://www.thehindu.com/sci-tech/technology/internet/article17759222.ece/alternates/FREE_660/02th-egg-person"
      alt="Card image cap">
    <div class="card-body">
      <h2 class="card-title">{{firstName}} {{lastName}}</h2>
      
    </div>
    <ul class="list-group list-group-flush">
      <li class="list-group-item">My articles: {{userArticles.length}}</li>
    </ul>
    <ul class="list-group list-group-flush option">
      <button class="btn btn-outline-success" data-toggle="modal" data-target="#modal-create-article">write an article</button>
    </ul>

    <ul class="list-group list-group-flush option">
      <button class="btn btn-outline-success">
        <router-link to="/" id="link">show all article</router-link>
      </button>
    </ul>



    <button class="btn btn-outline-success" data-toggle="collapse" href="#collapseExample" role="button" aria-expanded="false"
      aria-controls="collapseExample">
      browse all articles
    </button>


    <div class="collapse" id="collapseExample">
      <div class="card-body" id="nested-routes">
        <ul class="list-group list-group-flush" v-for="(article, index) in allArticle" :key="index">
          <!-- <router-link :to="{name: 'articleDetail', params: {id: article.author._id}}"> {{article.title}} {{article.author._id}}</router-link> -->
          <router-link :to="{path: `/article/${article._id}`}">{{article.title}}</router-link>

        </ul>
      </div>
    </div>
  </div>
  <!-- modal test -->
 <!--  <create-article-modal @updateArticle="updateArticle"></create-article-modal> -->
</div>
</template>

<script>
import { mapState } from 'vuex'
import { mapActions } from 'vuex'
/* import CreateArticleModal from '@/components/main-content-components/CreateArticleModal.vue' */

export default {
    name: 'Profile',
    components: {
      CreateArticleModal
    },
    props: ['isLogin', 'updateProfile'],
    data: function() {
      return {
        firstName: '',
        lastName: '',
        id: '',
        userArticles: [],
        allArticle: []
      };
    },
    computed: {
        ...mapState([

        ])
    },
    methods: {
        ...mapActions([

        ]),

      fetchProfile() {

              this.$server({
                  method: 'GET',
                  url: '/profile',
                  headers: {
                      'access-token': localStorage.getItem('access-token')
                  }
              }).then((result) => {
                  this.firstName = result.data.first_name;
                  this.lastName = result.data.last_name;
                  this.id = result.data._id
                  this.userArticles = result.data.filter((article) => {
                      return article.author._id == this.id;
                  })


              }).catch((err) => {
                  console.log(err);
              });
          },

          updateArticle(val) {
              this.fetchProfile();
              this.$emit('updateArticle', val);
          }
    },
    mounted() {

      if (localStorage.getItem('access-token')) {
        
        this.fetchProfile();
      }
      
    },
    created() {
      if (localStorage.getItem('access-token')) {
        
        this.fetchProfile();
      }
    },
    watch: {
      updateProfile() {
        this.fetchProfile();
      }
    },
    computed: {
      
    }
};
</script>

<style scoped>
    .profile-grid {
        margin-top: 5%;
        margin-bottom: 5%;
    }

    a:hover {
      cursor: pointer;
    }

    #nested-routes {
      height: 172px;
      overflow-y: scroll;
      overflow-x: hidden;
    }

    .option {
      margin-bottom: 3%;

    }

    #link {
      color: green;
    }

    .btn:hover #link{
      color: white;
    }

    .btn {
      width: 100%;
    }

    .btn:hover {
       background-color: #22939A;
    }
</style>
