<template>

   <div class="col-sm-8 d-flex flex-column align-items-center">
     <button class="btn btn-success my-2 my-sm-0 ask"  v-if="isLogin" data-toggle="modal" data-target="#modal-create-question">ask away</button>
      <div class="card article-grid" style="width: 100%;" v-for="(question, index) in questions" :key="index">
        <div class="card-body">
          <h1 class="card-title"><b>{{question.title}}</b></h1>
          <h6 class="card-subtitle mb-2 text-muted"> <i>by: {{question.user.first_name}} {{question.user.last_name}}</i></h6>
             <h6 class="card-subtitle mb-2 text-muted"> <i> {{new Date(question.createdAt).getDate()}}-{{new Date(question.createdAt).getMonth() + 1}}-{{new Date(question.createdAt).getFullYear()}}
                    </i></h6><br>
          <p class="card-text" style="text-align:left">{{question.content}}</p>
          <div v-if="isLogin" class="options">
            <router-link :to="{path: `/question/${question._id}`}">see answers</router-link>
            <a @click="vote(question._id, 'upvote')"><i class="fas fa-arrow-up"></i></a>
            <b>({{question.upvote.length}})</b>
            <a @click="vote(question._id, 'downvote')"><i class="fas fa-arrow-down"></i></a>
            <b>({{question.downvote.length}})</b>
            <button type="submit" class="btn btn-outline-danger" v-if="question.user._id === userId" @click="removeQuestion(question._id)">Remove</button>
            <!-- <a class="card-link" @click="editArticle(article._id)" data-toggle="modal" data-target="#modal-comment-article"><i class="far fa-comment"></i></a>
            <a class="card-link" @click="editArticle(article._id)" data-toggle="modal" data-target="#modal-edit-article" v-if="article.author._id === userId"><i class="far fa-edit"></i></a>
            <a class="card-link" @click="removeArticle(article._id)" v-if="article.author._id === userId"><i class="far fa-trash-alt"></i></a> -->
          </div>
        </div>
      </div>
      

      <create-question-modal></create-question-modal>
      <!-- <comment-modal :article-id="editedArticle" :userId="userId"></comment-modal>
      <edit-article-modal :articleId="editedArticle" @fetchNewArticle="fetchArticle"></edit-article-modal> -->
    </div>
</template>

<script>
/* import EditArticleModal from '@/components/main-content-components/EditArticleModal'
import CommentModal from './commentModal.vue'; */
import { mapState } from 'vuex'
import { mapActions } from 'vuex'
import CreateQuestionModal from './CreateQuestionModal'

export default {
    name: 'Question',
    components: {
      /* EditArticleModal, CommentModal */
      CreateQuestionModal
    },
    props: [],
    data: function() {
        return {
         
        };
    },
    computed: {
      ...mapState([
        'isLogin', 'questions', 'userId'
      ]),


    },
    methods: {
      ...mapActions([
        'getQuestions', 
      ]),

      removeQuestion(id) {
        this.$server({
          method: 'delete',
          url: `/question/${id}`,
          headers: {
            'access-token': localStorage.getItem('access-token')
          }
        }).then((result) => {
          this.getQuestions();
        }).catch((err) => {
          console.log(err);
        });
      },

      vote(id, voteType) {

        this.$server({
          method: 'patch',
          url: `/question/${voteType}/${id}`,
          headers: {
            'access-token': localStorage.getItem('access-token')
          }
        }).then((result) => {
          this.getQuestions();
        }).catch((err) => {
          alert('unable to vote your own post');
        });


      }



      
    },
    watch: {
      
    },
    created() {
      
      this.getQuestions();
     
    },
};
</script>

<style scoped>
    .article-grid {
        margin-top: 8%;
        border-bottom: solid 1px;
    }

    .article-grid:hover {
      background-color: rgba(12, 12, 12, 0.068);
      border: 1px solid;
    }

    a:hover {
      cursor: pointer;
      color: darkblue;
    }

    .options{
      display: flex;
      align-items: center;
      justify-content:center;
    }

    .options .btn, .options a, .options b {
      margin-left: 3%;
    }

    p {
      font-size: 30px;
    }

    .ask {
      width: 100%;
    }
</style>
