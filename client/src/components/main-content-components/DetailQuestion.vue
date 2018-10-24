<template>
<div class="col-sm-8 d-flex flex-column align-items-center">
    <div class="card article-grid" style="width: 100%;">
        <div class="card-body">
            <h3 class="card-title"><b>{{question.title}}</b></h3>
            <h6 class="card-subtitle mb-2 text-muted"> <i>by: {{question.user.first_name}}
                    {{question.user.last_name}}</i></h6>
             <h6 class="card-subtitle mb-2 text-muted"> <i> {{new Date(question.createdAt).getDate()}}-{{new Date(question.createdAt).getMonth() + 1}}-{{new Date(question.createdAt).getFullYear()}}
                    </i></h6><br>
            <p class="card-text">{{question.content}}</p>
            <div class="vote">
                <a @click="vote(question._id, 'upvote')"><i class="fas fa-arrow-up"></i></a>
                <b>({{question.upvote.length}})</b>
                <a @click="vote(question._id, 'downvote')"><i class="fas fa-arrow-down"></i></a>
                <b>({{question.downvote.length}})</b>
            </div>
        </div>
        <button type="button" class="btn btn-primary" v-if="this.userId === question.user._id" data-toggle="modal" data-target="#modal-edit-question" @click="getQuestion(question._id)">edit question</button>
        <button type="submit" class="btn btn-outline-danger" v-if="question.user._id === userId" @click="removeQuestion(question._id)">Remove</button>
        <br><br>
        <form>
            <div class="form-group">
                <textarea class="form-control" id="message-text" v-model="inputContent"></textarea>
            </div>
        </form>
        <button type="button" class="btn btn-primary" @click="addAnswer">answer</button>
        
    </div>
    <div class="card answer-grid" style="width: 100%;" v-for="(answer, index) in answers" :key="index">
            <div class="card-body">
                <p class="card-text">{{answer.content}}</p><br>
                <h6 class="card-subtitle mb-2 text-muted"> <i>{{answer.user.first_name}}
                        {{answer.user.last_name}}</i></h6>
                <h6 class="card-subtitle mb-2 text-muted"> <i> {{new Date(answer.createdAt).getDate()}}-{{new
                        Date(answer.createdAt).getMonth() + 1}}-{{new Date(answer.createdAt).getFullYear()}}
                    </i></h6><br>

                <div class="options">
                    <a @click="voteAnswer(answer._id, 'upvote')"><i class="fas fa-arrow-up"></i></a>
                    <b>({{answer.upvote.length}})</b>
                    <a @click="voteAnswer(answer._id, 'downvote')"><i class="fas fa-arrow-down"></i></a>
                    <b>({{answer.downvote.length}})</b>
                    <button type="submit" class="btn btn-outline-danger" v-if="answer.user === userId">Remove</button>
                    <button type="submit" class="btn btn-outline-success" v-if="answer.user === userId" data-toggle="modal" data-target="#modal-edit-answer" @click="getAnswer(answer._id)">Edit</button>

                </div>
            </div>
        </div>
    <edit-question-modal :fetchQuestion="fetchQuestion"></edit-question-modal>
    <edit-answer-modal></edit-answer-modal>
</div>
</template>

<script>
/* import EditArticleModal from '@/components/main-content-components/EditArticleModal' */
import { mapState } from 'vuex';
import { mapActions } from 'vuex';
import EditQuestionModal from './EditQuestionModal';
import EditAnswerModal from './EditAnswerModal';

export default {
    name: 'DetailQuestion',
    props: [],
    components: {
        EditQuestionModal, EditAnswerModal
    },
    data() {
        return {
            question: '',
            inputContent: ''
        }
    },
    mounted() {
        this.questionId = this.$route.params.id
       
        this.fetchQuestion();
        this.getAnswers(this.$route.params.id)
        
    },
    computed: {
        ...mapState([
            'userId', 'answers', 'isLogin'
        ])
    },
    created() {
        if (localStorage.getItem('access-token') === null) {
            this.$router.push('/')
        }
    },
    methods: {
        ...mapActions([
            'getAnswers', 'getQuestion', 'getAnswer'
        ]),

        fetchQuestion: function() {
            this.$server({
                method: 'GET',
                url: `/question/${this.$route.params.id}`
            }).then((result) => {
                
                this.question = result.data;
            }).catch((err) => {
                console.log(err);
            });
        },
        removeArticle(id) {
            this.$server({
                method: 'DELETE',
                url: `/article/${id}`,
                headers: {
                    'access-token': localStorage.getItem('access-token'),
                },
            }).then(() => {
               this.$router.push('/');
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
          this.fetchQuestion();
        }).catch((err) => {
            console.log(err);
          alert('unable to vote your own post');
        });


      },

      addAnswer() {
        this.$server({
                method: 'POST',
                url: `/answer/${this.$route.params.id}`,
                headers: {
                    'access-token': localStorage.getItem('access-token')
                },
                data: {
                    content: this.inputContent
                }
            }).then((result) => {
                //console.log(result);
                this.inputContent = '';
                this.getAnswers(this.$route.params.id)
            }).catch((err) => {
                console.log(err);
            });
      },

      removeQuestion(id) {
        this.$server({
          method: 'delete',
          url: `/question/${id}`,
          headers: {
            'access-token': localStorage.getItem('access-token')
          }
        }).then((result) => {
          this.$router.push('/');
        }).catch((err) => {
          console.log(err);
        });
      },

      voteAnswer(id, voteType) {
          console.log(voteType, 'fuckyou');
        this.$server({
          method: 'patch',
          url: `/answer/${voteType}`,
          data: {
            id: id
          },
          headers: {
            'access-token': localStorage.getItem('access-token')
          }
        }).then((result) => {
          this.getAnswers(this.$route.params.id);
        }).catch((err) => {
            console.log(err);
          alert('unable to vote your own post');
        });


      }
    },
    watch: {
        '$route.params.id'() {  
            this.fetchQuestion();
        }
    }
}
</script>

<style scoped>
    .card {
        height: 500px;
    }
    
    .col-sm-8 {
        justify-content: center;
        align-items: center;
    }
    .answer-grid {
        margin-top: 10%;
        height: 300px;
    }

    a:hover {
        cursor: pointer;
    }
</style>
